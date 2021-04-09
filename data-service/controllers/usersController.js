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

const createRole = async(req, res, next) => {
    try {
        const newRoleData = req.body;
        const roleCreated = await userData.createRole(newRoleData);
        res.send(roleCreated);
    } catch(error) {
        res.status(400).send(error.message);
    }
}

const changeRoleName = async(req, res, next) => {
    try {
        const newRoleData = req.body;
        const roleUpdated = await userData.changeRoleName(newRoleData);
        res.send(roleUpdated);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

const resolveRoleIdsByName = async (roleNames) => {
    try {
        let rolesIds = [];
        await Promise.all( roleNames.map(async element => {
            const roleId = await userData.retrieveRoleIdByName(element);
            rolesIds.push(roleId[0].id);
        }));
        return rolesIds;
    } catch(error) {
        res.status(500).send(error.message);
    }
}

const addRolesToUser = async(req, res, next) => {
    try {
        const userInfo = req.body;
        let rowsToAdd = [];
        const rolesIds = await resolveRoleIdsByName(userInfo.roles) 
        rolesIds.forEach(element => {
            rowsToAdd.push({ cedula: userInfo.cedula, id_rol: element})
        });
        const rolesAdded = await userData.addRolesToUser(rowsToAdd);
        res.send(rolesAdded);
    } catch(error) {
        res.status(500).send(error.message);
    }
}



module.exports = {
    getUsers,
    getUserById,
    createUser,
    validateUserExists,
    createRole,
    changeRoleName,
    addRolesToUser
}