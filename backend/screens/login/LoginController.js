const userService = require('../../services/UserService');
const loginService = require('./LoginService');
const jwt = require('jsonwebtoken');

const checkUserLogin = async (req, res, next) => {
    let user = req.body;
    let result = await userService.getUserByUsernameAndPassword(user);
    if (result.message !== "Error") {
            req.checkUserLogin = {
                userId: result.id,
                roleId: result.roleId
            };
            next();
    }
    else {
        res.status(401).send(data = {
            message: "Error"
        });
    }
}

const checkUserRole = async (req, res, next) => {
    let data = req.checkUserLogin;
    res.send(data);
}

module.exports = {
    checkUserLogin: checkUserLogin,
    checkUserRole: checkUserRole,
}