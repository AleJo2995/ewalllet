'use strict';

const express = require('express');
const router = express.Router();
const routesController = require('../controllers/routesController');


const {createRoute, getRouteByCode, getAllRoutes} = routesController


router.post('/routes/create', createRoute);
router.get('/routes/get/:code', getRouteByCode);
router.get('/routes/getAll', getAllRoutes);


module.exports = {
    routes: router
}