const { network } = require("hardhat")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
const {storeImages} = require("../utils/uploadToPinata")
const fs = require("fs")

const IMAGES_LOCATION = "./images"
const URI_LOCATION = "./images/uris.json"

module.exports = async({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts();

    let tokenUris = [
        'ipfs://QmVHqZRsprS43jqXzQxBY515J7XK9HdhEWyK4rvrMSkurU',
        'ipfs://QmXRpgnpZRZeMv86eqy8r2SXbXVhULLK5KWJgpZB5cfdEi',
        'ipfs://QmfNHNoDzfNXDhJVHsPPCfjrRuMYKB268nh7TC7JB8g9hB'
    ];

    // upload images to pinata if not already uploaded
    if(process.env.UPLOAD_TO_PINATA == "true"){
        tokenUris = await handleImageUris();
    }

    const args = [
        ...tokenUris
    ];
    const waitBlockConfirmations = developmentChains.includes(network.name) ? 1 : VERIFICATION_BLOCK_CONFIRMATIONS;
    log("-----------------------------------------------------------------")

    const jobPlatform = await deploy("JobPlatform", {
        from: deployer,
        args: args,
        log : true,
        waitConfirmations: waitBlockConfirmations,
    })

    saveImageUris(tokenUris)

    // verify contracts on etherscan if not on development chain
    // if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
    // }
    await verify(jobPlatform.address, args)
    log("-----------------------------------------------------------------")
}

const handleImageUris = async() => {
    imageUris = []
    const {responses, files} = await storeImages(IMAGES_LOCATION)
    for(const fileIndex in files){
        imageUris.push(`ipfs://${responses[fileIndex].IpfsHash}`)
    }
    console.log("Image URIs: ", imageUris)
    return imageUris;

} 

const saveImageUris = (imageUris) => {
    const data = JSON.stringify(imageUris);
    fs.writeFileSync(URI_LOCATION, data);
}

module.exports.tags = ["all", "platform", "main"]