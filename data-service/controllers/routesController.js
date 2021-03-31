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

module.exports = {
    createRoute
}