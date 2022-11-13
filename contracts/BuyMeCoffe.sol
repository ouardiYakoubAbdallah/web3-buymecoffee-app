// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BuyMeACoffee {
    // Event to emit when a Memo is created.
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    // Memo struct.
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    // List of all memos received from freinds.
    Memo[] memos;

    // Address of the contract deployer
    address payable owner;

    // Deploy logic.
    constructor() {
        owner = payable(msg.sender);
    }

    /**
     * @dev buy a coffee for the contract owner
     * @param _name name of the coffee buyer
     * @param _message message from the coffee buyer
     *
     */
    function buyCoffee(string memory _name, string memory _message)
        public
        payable
    {
        // The sent amount must be > O ETH
        require(msg.value > 0, "Can't buy coffee with 0 ETH :( ");

        // Save the memo
        memos.push(Memo(msg.sender, block.timestamp, _name, _message));

        // Emit a log event when a new memo is created!
        emit NewMemo(msg.sender, block.timestamp, _name, _message);
    }

    /**
     * @dev send the entire balance stored in this contract to the contract owner
     *
     */
    function withdraw() public {
        // revert if anything goes wrong.
        require(owner.send(address(this).balance));
    }

    /**
     * @dev retrieve all the memos stored on the blockchain
     *
     * @return - Memo's List
     */
    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
