pragma solidity ^0.4.21;

contract IterableMap {
    
    struct Key {
        bool deleted;
        bytes32 value;
    }
    
    struct Value {
        uint256 index;
        bytes32 value;
    }

    Key[] keys;
    uint256 keys_length;
    mapping (bytes32 => Value) map;
    address owner;
    
    constructor() public {
        owner = msg.sender;
        keys_length = 0;
    }
    
    modifier contains(bytes32 _key) {
        require(map[_key].index != 0);
        _;
    }
    
    function get(bytes32 _key) public view contains(_key) returns (bytes32) {
        return map[_key].value;
    }
    
    function add(bytes32 _key, bytes32 _value) public returns (bool) {
        if (map[_key].index != 0) {
            map[_key].value = _value;
            return false;
        }
        else {
            keys.push(Key({deleted: false, value: _value}));
            map[_key].value = _value;
            map[_key].index = ++keys_length;
            return true;
    
        }
    }
    
    function remove(bytes32 _key) public {
        uint256 index = map[_key].index;
        keys[index].deleted = true;
        delete map[_key];
    }
    
    function iterate_next(uint256 index) public view returns (uint256) {
        if (iterate_end(index))
            return index;
        uint256 i = index+1;
        while (!iterate_end(i) && keys[i].deleted)
            i += 1;
        return i;
    }
    
    function iterate_begin() public view returns (uint256) {
        uint256 i = 0;
        while (!iterate_end(i) && keys[i].deleted)
            i += 1;
        return i;
    }
    
    function iterate_end(uint256 index) public view returns (bool) {
        
        return index < 0 || index >= keys_length;
    }

}