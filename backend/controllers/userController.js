const userService = require('../services/UserService');

const getAllUser = async (req, res) => {
    const result = await userService.getAllUser();
    res.send(result);
}

const getUserById = async (req, res) => {
    let userId = req.params.userId;
    const result = await userService.getUserById(userId);
    res.send(result);
}

const addUser = async (req, res) => {
    let data = req.body;
    const result = await userService.addUser(data);
    res.send(result);
}

const updateUser = async (req, res) => {
    let data = req.body;
    const result = await userService.updateUser(data);
    res.send(result);
}

const deleteUser = async (req, res) => {
    let userId = req.params.userId;
    const result = await userService.deleteUser(userId);
    res.send("Deleted!");
}

module.exports = {
    getAllUser: getAllUser,
    getUserById: getUserById,
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
}