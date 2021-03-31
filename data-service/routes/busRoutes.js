'use strict';

const express = require('express');
const router = express.Router();
const routesController = require('../controllers/routesController');


const {createRoute} = routesController


router.post('/routes/create', createRoute);

module.exports = {
    routes: router
}