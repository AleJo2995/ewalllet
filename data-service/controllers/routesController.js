'use strict';

const routesData = require('../data/routes');

const createRoute = async(req, res, next) => {
    try {
        const newRoute = req.body;
        const routeCreated = await routesData.createRoute(newRoute);
        if(typeof routeCreated === 'string'){
            res.status(500).send("Error al crear la ruta: " + routeCreated);
        } else {
            res.send(routeCreated);
        }
    } catch(error) {
        res.status(500).send(error.message);
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

const editRoute = async(req, res, next) => {
    try {
        const routeCode = req.params.code;
        const routeBody = req.body;
        const editedRoute = await routesData.editRoute(routeCode, routeBody);
        res.send(editedRoute);
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


const addRoutesToDriver = async(req, res, next) => {
    try {
        const routesInfo = req.body;
        let rowsToAdd = []; 
        routesInfo.rutas.forEach(element => {
            rowsToAdd.push({ cedula: routesInfo.cedula, codigo_ruta: element})
        });
        const rolesAdded = await routesData.addRoutesToDriver(rowsToAdd);
        res.send(rolesAdded);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    createRoute,
    getRouteByCode,
    getAllRoutes,
    editRoute,
    addRoutesToDriver
}