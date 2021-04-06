'use strict';

const routesData = require('../data/routes');

const createRoute = async(req, res, next) => {
    try {
        const newRoute = req.body;
        const routeCreated = await routesData.createRoute(newRoute);
        res.send(routeCreated);
    } catch(error) {
        res.status(400).send(error.message);
    }
}

const getRouteByCode = async(req, res, next) => {
    try {
        const routeCode = req.params.code;
        const route = await routesData.getRouteByCode(routeCode);
        res.send(route);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

const getAllRoutes = async(req, res, next) => {
    try {
        const routes = await routesData.getAllRoutes();
        res.send(routes);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    createRoute,
    getRouteByCode,
    getAllRoutes
}