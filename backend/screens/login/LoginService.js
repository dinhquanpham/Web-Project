const { QueryTypes, Model } = require('sequelize');
const User = require('../../models/Users');
const userService = require('../../services/UserService');

//Chưa dùng đc set cookie do chưa có đối tượng document ở frontend
let setCookie = async(cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

let getCookie = async (cname) =>{
    return new Promise (async (resolve, reject) => {
        try {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for(let i = 0; i < ca.length; i++) {
              let c = ca[i];
              while (c.charAt(0) == ' ') {
                c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                resolve(c.substring(name.length, c.length));
              }
            }
            resolve("");
        }catch (e) {
            res.sendStatus(500);
        }
    });
}

module.exports = {
   setCookie: setCookie,
   getCookie: getCookie,
}