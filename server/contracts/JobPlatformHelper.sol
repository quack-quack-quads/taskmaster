// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./JobInterface.sol";

error InvalidTx();
error RefundFailed();
error NotEnoughETH();

contract JobPlatformHelper is JobInterface {
    // State variables
    uint256 internal jobIdCount;

    // events
    event AddJob();
    event AddRating();

    mapping(address => Job[]) internal workerJobs; // workerAddress -> Job[]
    mapping(address => Person) internal persons; // workerAddress => worker details
    mapping(uint256 => address) internal tokenIdToAddress; // tokenId => address

    function addJob(
        address to,
        string memory category,
        string memory location,
        string memory date,
        string memory url,
        uint256 amount
    ) public {
        if (persons[to].addr == address(0) || to == address(0)) {
            revert InvalidTx();
        }

        Job memory job = Job(
            msg.sender,
            to,
            category,
            location,
            date,
            url,
            jobIdCount,
            amount
        );
        workerJobs[to].push(job);
        jobIdCount++;
        emit AddJob();
    }

    // TODO - only allow valid buyer to call this function
    function addRating(address to, uint8 _rating) public {
        if (persons[to].addr == address(0)) {
            revert InvalidTx();
        }
        persons[to].rating = (_rating + persons[to].rating) / 2;
        emit AddRating();
    }

    // getters
    function getJobIdCount() public view returns (uint256) {
        return jobIdCount;
    }

    // returns a list of jobs - given the worker address
    function getJobs(address _workerAddr) public view returns (Job[] memory) {
        return workerJobs[_workerAddr];
    }

    function getPerson(
        address _workerAddr
    ) public view returns (Person memory) {
        if (persons[_workerAddr].addr == address(0)) {
            revert InvalidTx();
        }
        return persons[_workerAddr];
    }
}
