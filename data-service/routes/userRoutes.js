'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

const {getUsers, getUserById, createUser} = userController

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users/create', createUser);

module.exports = {
    routes: router
}