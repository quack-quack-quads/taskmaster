// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

error InvalidRating();

contract JobNFT is ERC721 {
    uint256 internal s_tokenCounter;
    string private s_commonImageURI;
    string private s_mediumImageURI;
    string private s_rareImageURI;

    // events

    constructor(
        string memory _commonURI,
        string memory _mediumURI,
        string memory _rareURI
    ) ERC721("JobNFT", "JOB") {
        s_tokenCounter = 0;
        s_commonImageURI = _commonURI;
        s_mediumImageURI = _mediumURI;
        s_rareImageURI = _rareURI;
    }

    function mintNFT(address personAddr, uint256 _invoiceId) internal {
        _safeMint(personAddr, _invoiceId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64,";
    }

    function _getImageURI(uint8 rating) public view returns (string memory) {
        if (rating > 10 || rating < 0) {
            revert InvalidRating();
        }
        if (rating >= 9) {
            return s_rareImageURI;
        } else if (rating >= 6) {
            return s_mediumImageURI;
        }
        return s_commonImageURI;
    }
}
