const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const Author = require('../models/Authors');

let getAuthorById = async (authorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await Author.findOne({
                where: {
                    id: authorId,
                }
            });
            resolve(result);
        } catch (e) {
            console.log("Can't find author");
            reject(e);
        }
    });
}

let getAllAuthor = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await Author.findAll();
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
}

let addAuthor = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await Author.create({
                id: data.id,
                name: data.name,
            })
            resolve(result);
        }
        catch (e) {
            reject(e);
        }
    });
}

let updateAuthor = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let author = await Author.findOne({
                where:
                    { id: data.id }
            });

            user.set({
                id: data.id,
                name: data.name,
            })
            await Author.save();
            resolve(author);
        }
        catch (e) {
            reject(e);
        }
    });
}

let deleteAuthor = async (authorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let author = await Author.findOne({
                where: {
                    id: authorId,
                }
            });
            await author.destroy();
            let message = "Deleted";
            resolve(message);
        }
        catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    getAuthorById: getAuthorById,
    getAllAuthor: getAllAuthor,
    addAuthor: addAuthor,
    updateAuthor: updateAuthor,
    deleteAuthor: deleteAuthor,
}