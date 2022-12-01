// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract NoFake {
    struct User {
        address uuid;
        string name;
        string type_of;
        string phone_number;
        address account_address;
    }

    struct Products {
        string uuid;
        string name;
        address owner;//will be the customer id who has bought it
        string manufacturer;//will be the custormer Id who has created that product
        address[] previous_owners;
        string lister_name;
        string lister_country;
        address listed_by;//first time address
        string type_of;//Either Mobile , TV or Laptop
        string[] product_images;
        bool isVerified;
    }

    mapping(address => User) user_db;
    mapping(string => Products) product_db;
    Products[] AllProducts;

    function createUser(
        string memory _name, 
        string memory _type_of, 
        string memory _phone_no, 
        address _account_address
        ) 
        public payable returns(uint) {
            User memory newUser;
            newUser.name = _name;
            newUser.type_of = _type_of;
            newUser.phone_number = _phone_no;
            newUser.account_address = _account_address;
            user_db[_account_address] = newUser;
            return 1;
    }

    function getUser(
        address _address
    ) view public returns(string memory, string memory, string memory, address){
        return(
            user_db[_address].name, 
            user_db[_address]. type_of, 
            user_db[_address].phone_number, 
            user_db[_address].account_address
        );
    }

    function registerProduct(
        string memory _uuid,
        string memory _name,
        address _owner,
        string memory _manufacturer,
        address _lister_addresss,
        string memory _type_of,
        string memory _lister_name,
        string memory _lister_country
    ) public payable returns(uint) {
        Products memory newProduct;
        newProduct.uuid = _uuid;
        newProduct.name = _name;
        newProduct.owner = _owner;
        newProduct.manufacturer = _manufacturer;
        newProduct.type_of = _type_of;
        newProduct.listed_by= _lister_addresss;
        newProduct.lister_name=_lister_name;
        newProduct.lister_country=_lister_country;
        newProduct.isVerified = false;
        product_db[_uuid] = newProduct;
        AllProducts.push(newProduct);
        return 1;
    }

    function getProduct(string memory _uuid) public view returns (
      string memory,
      address,
      string memory,
      address[] memory,
      string memory,
      string memory,
      address,
      string memory,
      string[] memory,
      bool
    ){
        Products memory prod = product_db[_uuid];
        return(
            prod.name,
            prod.owner,
            prod.manufacturer,
            prod.previous_owners,
            prod.lister_name,
            prod.lister_country,
            prod.listed_by,
            prod.type_of,
            prod.product_images,
            prod.isVerified
        );
    }

    function getAllProducts()public view returns(Products[] memory){
        return AllProducts;
    }

    function transferOwnerShip(string memory _product_uuid , address _newOwner )public payable returns(Products memory){
        Products memory prod = product_db[_product_uuid];
        require(msg.sender == prod.owner, "Only Owner can change this!");
        prod.isVerified = false;
        prod.owner= _newOwner;
        Products memory newProduct = prod;
        delete prod;
        product_db[_product_uuid] = newProduct;
        return (
            prod
        );
    }

    function validateProduct(string memory _product_uuid , string memory _manufacturer_id)public payable returns(string memory){
        Products memory prod = product_db[_product_uuid];
        require(keccak256(abi.encodePacked(prod.manufacturer)) == keccak256(abi.encodePacked(_manufacturer_id)), "Incorrect Manufacturer");
        require(prod.isVerified == false , "Product is already Verified");
        prod.isVerified = true;
        prod.owner = msg.sender;
        product_db[_product_uuid] = prod;
        return "done";
    }
}