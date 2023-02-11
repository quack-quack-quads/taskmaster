// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface JobInterface {
    struct Job {
        address from;
        address to;
        string category;
        string location;
        string date;
        string url;
        uint256 id;
        uint256 amount;
    }
    enum PersonType {
        SELLER,
        BUYER
    }
    struct Person {
        string name;
        address addr;
        uint8 rating;
    }
}
