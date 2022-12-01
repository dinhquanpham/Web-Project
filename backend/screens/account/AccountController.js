const userService = require('../../services/UserService');
const jwt = require('jsonwebtoken');

const checkCookie = async (req, res) => {
    let token = await req.cookies.token;
    if (token) {
        res.send(data = {
            message: "Logined in"
        });
    }
    else {
        res.send(data = {
            message: "Error"
        });
    }
}

const signOut = async (req, res) => {
    let token = await req.cookies.token;
    if (token) {
        res.send(data = {
            message: "Logined out"
        });
    }
    else {
        res.send(data = {
            message: "Error"
        });
    }
}

const updatePassword = async (req, res) => {
    let data = req.body;
    let result = await userService.updateUser(data);
    if (result != "Error") {
        res.send(data = {
            message: "Updated"
        });
    }
    else {
        res.send(data = {
            message: "Error"
        });
    }
}

module.exports = {
    checkCookie: checkCookie,
    signOut: signOut,
    updatePassword: updatePassword
}