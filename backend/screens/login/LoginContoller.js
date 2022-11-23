const userService = require('../../services/UserService');
const loginService = require('./LoginService');
const jwt = require('jsonwebtoken');

const checkUserLogin = async (req, res, next) => {
    let user = req.body;
    let result = await userService.getUserByUsernameAndPassword(user);
    if (result) {
        let token = jwt.sign({
            data: result,
        }, "user");
        req.checkUserLogin = token;
        next();
    }
    else {
        res.status(401).send("Sai tài khoản hoặc mật khẩu");
    }
}

const checkUserRole = async (req, res, next) => {
    let data = req.checkUserLogin;
    let result = jwt.verify(data, "user");
    res.send(result);
}

module.exports = {
    checkUserLogin: checkUserLogin,
    checkUserRole: checkUserRole,
}