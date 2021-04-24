'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

const {getUsers, getUserById, createUser, validateUserExists, createRole,
    changeRoleName, addRolesToUser, usersDrivers} = userController


router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users/create', createUser);
// router.get('/users/routes', getConsumedRoutesByUser);
router.post('/users/validateUser', validateUserExists);
router.post('/users/createRole', createRole);
router.patch('/users/changeRoleName', changeRoleName);
router.post('/users/addRolesPerUser', addRolesToUser);
router.get('/drivers', usersDrivers);

module.exports = {
    routes: router
}