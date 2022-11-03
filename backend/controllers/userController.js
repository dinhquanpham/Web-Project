const user = require('../services/user');
const userService = require('../services/user');

const getAllUser = async (req, res) => {
    const result = await userService.getAllUser();
    console.log(result);
}

const addUser = async (req, res) => {
    const result = await userService.addUser();
    console.log(result);
}

const deleteUser = async (req, res) => {
    const result = await userService.deleteUser();
    console.log(result);
}

module.exports = {
    getAllUser: getAllUser,
    addUser: addUser,
    deleteUser: deleteUser,
}