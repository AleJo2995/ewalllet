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
    createUser
}