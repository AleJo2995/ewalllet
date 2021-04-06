'use strict';

const express = require('express');
const router = express.Router();
const routesController = require('../controllers/routesController');


const {createRoute, getRouteByCode, getAllRoutes, editRoute} = routesController


router.post('/routes/create', createRoute);
router.get('/routes/get/:code', getRouteByCode);
router.get('/routes/getAll', getAllRoutes);
router.patch('/routes/edit/:code', editRoute);


module.exports = {
    routes: router
}