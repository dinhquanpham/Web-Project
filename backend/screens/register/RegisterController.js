const userService = require('../../services/UserService');
const jwt = require('jsonwebtoken');

const checkRegister = async (req, res, next) => {
    let data = req.body;
    let result = await userService.addUser(data);
    if (result !== "Error" && result != null) {
        let token = jwt.sign({
            data: result,
        }, "user");
        req.checkRegister = {
            token: token,
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