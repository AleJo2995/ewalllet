'use strict';



const userData = require('../data/user');

const getUsers = async(req, res, next) => {
    try {
        const users = await userData.getUsers();
        res.send(users);
    } catch(error) {
        res.status(400).send(error.message);
    }
}

const getUserById = async(req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await userData.getUserById(userId);
        res.send(user);
    } catch(error) {
        res.status(400).send(error.message);
    }
}

function validateUserCredentials(user, userId, pwd ) {
    return user.cedula === userId && user.password === pwd;
}

const validateUserExists = async(req, res, next) => {
    try {
        const userId = req.params.id;
        const pwd = req.params.password;
        const user = await userData.getUserById(userId);
        const valid = validateUserCredentials(user, userId, pwd);
        console.log(valid);
        res.send(valid);
    } catch(error) {
        res.status(400).send(error.message);
    }
}

const createUser = async(req, res, next) => {
    try {
        const newUserData = req.body;
        const userCreated = await userData.createUser(newUserData);
        res.send(userCreated);
    } catch(error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    validateUserExists
}