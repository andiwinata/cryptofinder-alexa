pragma solidity ^0.4.18;

contract PairWise {

    address public owner = msg.sender;
    mapping (bytes32 => bytes32) userData;
    mapping (address => uint256) balanceOf;

    uint256 public totalTokenExistence;

    modifier onlyBy(address _account)
    {
        require(msg.sender == _account);
        _;
    }

    function transfer(address _to, uint256 _value) public {
        require(balanceOf[msg.sender] >= _value);           
        require(balanceOf[_to] + _value >= balanceOf[_to]); 
        balanceOf[msg.sender] -= _value;                    
        balanceOf[_to] += _value;                           
    }

    // send token reward to address, only accessible by owner of the contract
    function sendReward(address recepient, uint256 value) onlyBy(owner) public {
        balanceOf[recepient] += value;
        totalTokenExistence += value;
    }

    // store hash of userReview in blockchain so we can validate
    function setData(bytes32 reviewId, bytes32 reviewHash) public {
        userData[reviewId] = reviewHash;
    }

    // get hash of userReview
    function getData(bytes32 reviewId) public constant returns (bytes32) {
        return userData[reviewId];
    }

    function () public payable {
    }
}