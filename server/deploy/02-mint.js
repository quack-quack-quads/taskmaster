const { network, ethers } = require("hardhat")
const {developmentChains} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if(process.env.MINT_NFT == "true") {
        const jobPlatform = await ethers.getContract("JobPlatform", deployer)
        console.log(`Executing InvoicePlatform.registerPerson() on ${chainId}`)
        await jobPlatform.registerPerson(
            "Rohit PAN", "Rohit Shah"
        );            
        console.log(`InvoicePlatform.registerPerson() executed successfully on ${chainId}`)
        console.log(`Minted 1 NFT for sellerPAN and sellerName: ${
            await jobPlatform.tokenURI(1)
        }`);
    }
    else{
        console.log(`Minting NFT skipped on ${chainId}`)
    }


}
module.exports.tags = ["mint", "all"]

