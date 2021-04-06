'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql/msnodesqlv8');

const createRoute = async (routeData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('routes');
        const route = await pool.request()
                        .input('code', sql.NVarChar, routeData.code)
                        .input('cost', sql.Numeric, routeData.cost)
                        .input('description', sql.NVarChar, routeData.description)
                        .input('name', sql.NVarChar, routeData.name)
                        .input('company', sql.NVarChar, routeData.company)
                        .input('province', sql.NVarChar, routeData.province)
                        .query(sqlQueries.insertRoute);
        return route.recordset;
    } catch (error) {
        return error.message;
    }
}

const editRoute = async (routeCode, routeData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('routes');
        const editedRoute = await pool.request()
                        .input('code', sql.NVarChar, routeCode)
                        .input('columnName', sql.NVarChar, routeData.columnName)
                        .input('columnValue', sql.NVarChar, routeData.columnValue)
                        .query(sqlQueries.updateRoute);
        return editedRoute.recordset;
    } catch (error) {
        return error.message;
    }
}

const getRouteByCode = async (routeCode) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('routes');
        const route = await pool.request()
                    .input('routeCode', sql.NVarChar, routeCode)
                    .query(sqlQueries.retrieveRoute);
        return route.recordset;
    } catch (error) {
        return error.message;
    }
}

const getAllRoutes = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('routes');
        const routes = await pool.request().query(sqlQueries.retrieveAllRoutes);
        return routes.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteRoute = async (code, cost, description, name, company, province) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('routes');
        const route = await pool.request()
                        .input('code', sql.NVarChar, code)
                        .input('cost', sql.Numeric, cost)
                        .input('description', sql.NVarChar, description)
                        .input('name', sql.NVarChar, name)
                        .input('company', sql.NVarChar, company)
                        .input('province', sql.NVarChar, province)
                        .query(sqlQueries.inserRoute);
        return route.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    createRoute, deleteRoute, editRoute, getRouteByCode, getAllRoutes
}