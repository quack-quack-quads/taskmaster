const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const fs = require("fs")
const { Console } = require("console")

const URI_LOCATION = "./images/uris.json"

!developmentChains.includes(network.name)
? describe.skip 
: describe("JobPlatform", () => {
    let jobPlatform, jobPlatformContract;

    beforeEach(async () => {
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        user =  accounts[1];
        deployerAddress = await deployer.getAddress();
        userAddress = await user.getAddress();

        // deploy all contract - using scripts in the deploy folder
        await deployments.fixture("all")

        // get the deployed contract
        jobPlatformContract = await ethers.getContract("JobPlatform")

        // connect to the deployed contract
        jobPlatform = jobPlatformContract.connect(deployer)
    })

    describe("createJob", () => {
        it("should create an job", async () => {
            let jobIdCountBefore = await jobPlatform.getJobIdCount();
            assert.equal(jobIdCountBefore, 0, "jobIdCount should be 0")

            // should fail if the worker is not registered or workerAddress is not valid
            let args = [
                userAddress, // workerAddress
                "category", 
                "location",
                "date",
                "url",
                ethers.utils.parseEther("1000"), // amount
            ]
            await expect(jobPlatform.addJob(...args)).to.be.revertedWith("InvalidTx")

            // first register worker
            const userConnectedJobPortal = jobPlatform.connect(user)
            args = [
                "Rohit Shah", // name
            ]
            await userConnectedJobPortal.registerPerson(...args);

            args = [
                userAddress, // workerAddress
                "category", 
                "location",
                "date",
                "url",
                ethers.utils.parseEther("1000"), // amount
            ]
            await jobPlatform.addJob(...args);
            let jobIdCountAfter = await jobPlatform.getJobIdCount();
            assert.equal(jobIdCountAfter, 1, "jobIdCount should be 1")

            // check if the job is created properly for the worker
            args = [
                userAddress, // workerAddress
            ]
            const workerJobs = await jobPlatform.getJobs(...args);
            const workerJob = workerJobs[0]
            assert.equal(workerJob.from, deployerAddress, "from should be deployerAddress")
            assert.equal(workerJob.to, userAddress, "to should be userAddress")
            assert.equal(workerJob.category, "category", "category should be category")
            assert.equal(workerJob.location, "location", "location should be location")
            assert.equal(workerJob.date, "date", "date should be date")
            assert.equal(workerJob.url, "url", "url should be url")
            assert.equal(workerJob.amount.toString(), (ethers.utils.parseEther("1000")).toString(), "amount should be 1000")
        })
    })

    describe("registerPerson", () => {
        it("should register a worker", async() => {
            let args = [
                "Rohit Shah", // name
            ]
            await jobPlatform.registerPerson(...args);

            // check if the worker is registered properly
            const worker = await jobPlatform.getPerson(deployerAddress);
            assert.equal(worker.name, "Rohit Shah", "name should be Rohit Shah")
            assert.equal(worker.addr, deployerAddress, "addr should be deployerAddress")
            assert.equal((worker.rating).toString(), "0", "rating should be 0")
        })

        it("should not register a worker if already registered", async() => {
            let args = [
                "Rohit Shah", // name
            ]
            await jobPlatform.registerPerson(...args);

            // try to register again
            await expect(jobPlatform.registerPerson(...args)).to.be.revertedWith("PersonAlreadyExists")
        })
        it("should emit RegisterPerson event", async() => {
            let args = [
                "Rohit Shah", // name
            ]
            const registerPersonTx = await jobPlatform.registerPerson(...args);
            const registerPersonReceipt = await registerPersonTx.wait();
            expect(registerPersonReceipt.events[1].event).to.equal("RegisterPerson")
            expect(registerPersonReceipt.events[1].args._addr).to.equal(deployerAddress)
        })
    })

    describe("addRating", () => {
        it("should give rating to worker", async() => {
            // shoud fail if the worker is not registered
            let args = [
                userAddress, // workerAddress
                7, // rating
            ]
            await expect(jobPlatform.addRating(...args)).to.be.revertedWith("InvalidTx")

            // first register worker
            const userConnectedJobPortal = jobPlatform.connect(user)
            args = [
                "Rohit Shah", // name
            ]
            await userConnectedJobPortal.registerPerson(...args);
            let worker = await jobPlatform.getPerson(userAddress);
            assert.equal((worker.rating).toString(), "0", "rating should be 0")

            // give rating
            args = [
                userAddress, // workerAddress
                7, // rating
            ]
            await jobPlatform.addRating(...args);

            // check if the rating is given properly
            worker = await jobPlatform.getPerson(userAddress);
            assert.equal((worker.rating).toString(), "7", "rating should be 7")
        })

        it("should emit AddRating event", async() => {
            // first register worker
            const userConnectedJobPortal = jobPlatform.connect(user)
            args = [
                "Rohit Shah", // name
            ]
            await userConnectedJobPortal.registerPerson(...args);

            // give rating
            args = [
                userAddress, // workerAddress
                7, // rating
            ]
            const addRatingTx = await jobPlatform.addRating(...args);
            const addRatingReceipt = await addRatingTx.wait();
            expect(addRatingReceipt.events[0].event).to.equal("AddRating")
        })
    })

    describe("getImageURI", () => {
        it("should get the image URI", async() => {
            const imageURIS = JSON.parse(fs.readFileSync(URI_LOCATION, "utf8")) 
            await expect(jobPlatform._getImageURI(11)).to.be.revertedWith("InvalidRating")
            
            // check if the image URI is returned properly
            for (let i = 0; i <= 5; i++) {
                const imageURI = await jobPlatform._getImageURI(i);
                assert.equal(imageURI, imageURIS[0], "imageURI should be imageURIS[i]")
            }
            for (let i = 6; i <= 8; i++) {
                const imageURI = await jobPlatform._getImageURI(i);
                assert.equal(imageURI, imageURIS[1], "imageURI should be imageURIS[i]")
            }
            for (let i = 9; i <= 10; i++) {
                const imageURI = await jobPlatform._getImageURI(i);
                assert.equal(imageURI, imageURIS[2], "imageURI should be imageURIS[i]")
            }
        })
    })

    describe("mintNft", () => {
        it("should mint an NFT when a person registers", async() => {
            await jobPlatform.registerPerson("Rohit Shah");
            let tokendatabase64 = await jobPlatform.tokenURI(1); 
            let token = Buffer.from(tokendatabase64.split(",")[1], 'base64').toString();
            token = JSON.parse(token);
            // should fail if asked a NFT that is not minted
            await expect(jobPlatform.tokenURI(0)).to.be.revertedWith("NftNotExist")

            // check if the NFT is minted properly by getting the tokenURI
            assert.equal(token.name, "JobNFT", "name should be JobNFT")
            assert.equal(token.description, "An NFT that changes based on the rating that a worker has.", "description should be correct")
            assert.equal((token.attributes.at(0)).value, "0", "rating should be 0")
        })

        it("should change it's imageURI when rating is changed", async() => {
            await jobPlatform.registerPerson("Rohit Shah");
            // initial rating is 5
            let tokendatabase64 = await jobPlatform.tokenURI(1);
            let token = Buffer.from(tokendatabase64.split(",")[1], 'base64').toString();
            token = JSON.parse(token);
            assert.equal((token.attributes.at(0)).value, "0", "rating should be 0")

            await jobPlatform.addRating(deployerAddress, 7);

            // check if the NFT is minted properly by getting the tokenURI
            tokendatabase64 = await jobPlatform.tokenURI(1); 
            token = Buffer.from(tokendatabase64.split(",")[1], 'base64').toString();
            token = JSON.parse(token);
            assert.equal((token.attributes.at(0)).value, "7", "rating should be 7")
        })
    })
})