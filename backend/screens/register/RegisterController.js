const userService = require('../../services/UserService');
const jwt = require('jsonwebtoken');

const checkRegister = async (req, res, next) => {
    let data = req.body;
    let result = await userService.addUser(data);
    if (result.message !== "Error" && result != null) {
        req.checkRegister = {
            userId: result.id,
            roleId: result.roleId
        };
        next();
    }
    else {
        res.status(400).send(data = {
            message: "Error"
        });
    }
}

const checkUserRole = async (req, res, next) => {
    let data = req.checkRegister;
    res.send(data);
}

module.exports = {
    checkRegister: checkRegister,
    checkUserRole: checkUserRole
}