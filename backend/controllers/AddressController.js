const addressService = require('../services/AddressService');

const getAllAddress = async (req, res) => {
    const result = await addressService.getAllAddress();
    res.send(result);
}

const getAddressById = async (req, res) => {
    let addressId = req.params.addressId;
    const result = await addressService.getAddressById(addressId);
    res.send(result);
}

const addAddress = async (req, res) => {
    let data = req.body;
    const result = await addressService.addAddress(data);
    res.send(result);
}

const updateAddress = async (req, res) => {
    let data = req.body;
    const result = await addressService.updateAddress(data);
    res.send(result);
}

const deleteAddress = async (req, res) => {
    let addressId = req.params.addressId;
    const result = await addressService.deleteAddress(addressId);
    res.send("Deleted!");
}

module.exports = {
    getAllAddress: getAllAddress,
    getAddressById: getAddressById,
    addAddress: addAddress,
    updateAddress: updateAddress,
    deleteAddress: deleteAddress,
}