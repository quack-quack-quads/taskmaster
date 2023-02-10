// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// imports
import "./JobNFT.sol";
import "./JobPlatformHelper.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "base64-sol/base64.sol";

// errors
error JobNotExist();
error WrongBuyer();
error PersonAlreadyExists();
error NftNotExist();

contract JobPlatform is JobNFT, JobPlatformHelper, ReentrancyGuard {
    // events
    event RegisterPerson(address _addr);
    event Paid(string sellerPan, string buyerPan);

    mapping(address => uint256) public addressToTokenId;

    constructor(
        string memory _commonURI,
        string memory _mediumURI,
        string memory _rareURI
    ) JobNFT(_commonURI, _mediumURI, _rareURI) {
        jobIdCount = 0;
    }

    // ! overriding the tokenURI function of ERC721 to return the metadata URI

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        if (!_exists(tokenId)) {
            revert NftNotExist();
        }
        // since we're using dynamic metadata, we need to return the tokenURI based on the rating of the worker
        Person storage worker = persons[tokenIdToAddress[tokenId]];
        uint8 rating = worker.rating;
        string memory imageURI = _getImageURI(rating);
        return
            string(
                abi.encodePacked(
                    _baseURI(),
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                name(),
                                '", "description":"An NFT that changes based on the rating that a worker has.", ',
                                '"attributes": [{"trait_type": "rating", "value":"',
                                Strings.toString(rating),
                                '"}],',
                                '"image":"',
                                imageURI,
                                '"}'
                            )
                        )
                    )
                )
            );
    }

    // ! register a worker on the platform
    function registerPerson(string memory _name) public {
        if (persons[msg.sender].addr != address(0)) {
            revert PersonAlreadyExists();
        }
        persons[msg.sender] = Person({
            name: _name,
            addr: msg.sender,
            rating: 0
        });
        // mint the NFT for him
        s_tokenCounter++;
        tokenIdToAddress[s_tokenCounter] = msg.sender;
        addressToTokenId[msg.sender] = s_tokenCounter;
        _safeMint(msg.sender, s_tokenCounter);
        emit RegisterPerson(msg.sender);
    }

    // getters
    function getTokenId(address _addr) public view returns (uint256) {
        return addressToTokenId[_addr];
    }
}
