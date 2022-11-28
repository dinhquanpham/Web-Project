const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const Author = require('../models/Authors');

let getAuthorById = async (authorId) => {
    try {
        let result = await Author.findOne({
            where: {
                id: authorId,
            }
        });
        return result;
    } catch (e) {
        console.log("Can't find author");
        return "Error";
    }
}

let getAllAuthor = async () => {
    try {
        let result = await Author.findAll();
        return result;
    } catch (e) {
        return "Error";
    }
}

let addAuthor = async (data) => {
    try {
        let result = await Author.create({
            id: data.id,
            name: data.name,
        })
        return result;
    }
    catch (e) {
        return "Error";
    }
}

let updateAuthor = async (data) => {
    try {
        let author = await Author.findOne({
            where:
                { id: data.id }
        });

        user.set({
            id: data.id,
            name: data.name,
        })
        await author.save();
        return author;
    }
    catch (e) {
        return "Error";
    }
}

let deleteAuthor = async (authorId) => {
    try {
        let author = await Author.findOne({
            where: {
                id: authorId,
            }
        });
        await author.destroy();
        let message = "Deleted";
        return message;
    }
    catch (e) {
        return "Error";
    }
}

module.exports = {
    getAuthorById: getAuthorById,
    getAllAuthor: getAllAuthor,
    addAuthor: addAuthor,
    updateAuthor: updateAuthor,
    deleteAuthor: deleteAuthor,
}