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

const addRoutesToDriver = async (routesToAdd) => {
    try {
        sql.connect(config.sql)
            .then(() => {
                const table = new sql.Table(config.sql.routesDriverTableName); //Configurable table name for enabling bulk insert
                table.create = false;
                table.columns.add('codigo_ruta', sql.NVarChar, { nullable: false, primary: true });
                table.columns.add('cedula', sql.Numeric, { nullable: false, primary: true  });

                routesToAdd.forEach(element => {
                    table.rows.add(element.codigo_ruta, element.cedula)
                });
                const request = new sql.Request();
                return request.bulk(table)
            })
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    createRoute, deleteRoute, 
    editRoute, getRouteByCode, 
    getAllRoutes, addRoutesToDriver
}