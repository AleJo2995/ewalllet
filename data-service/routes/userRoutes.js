'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const paymentsController = require('../controllers/paymentsController');


const {getUsers, getUserById, createUser, validateUserExists} = userController
const {executePayment} = paymentsController

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users/create', createUser);
router.get('/users/validateUser', validateUserExists);
router.post('/payments/payRoute', executePayment);

module.exports = {
    routes: router
}