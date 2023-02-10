const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

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
})