'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql/msnodesqlv8');

const getUsers = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('user');
        const users = await pool.request().query(sqlQueries.retrieveUsers);
        return users.recordset;
    } catch (error){
        return error.message;
    }
}

const getUserDrivers = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('user');
        const users = await pool.request().query(sqlQueries.retrieveUsersDrivers);
        return users.recordset;
    } catch (error){
        return error.message;
    }
}

const getUserById = async (userId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('user');
        const user = await pool.request()
                    .input('userId', sql.Numeric, userId)
                    .query(sqlQueries.retrieveUserById);
        return user.recordset;
    } catch (error) {
        return error.message;
    }
}

const getRolesByUserId = async (userId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('user');
        const user = await pool.request()
                    .input('cedula', sql.Numeric, userId)
                    .query(sqlQueries.getRolesByUserId);
        return user.recordset;
    } catch (error) {
        return error.message;
    }
}

const getConsumedRoutesByUser = async (cedula) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('user');
        const user = await pool.request()
                    .input('cedula', sql.Int, cedula)
                    .query(sqlQueries.getUserRoutes);
        return user.recordset;
    } catch (error) {
        return error.message;
    }
}

const createUser = async (userData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('user');
        const newUser = await pool.request()
                    .input('cedula', sql.Numeric, userData.cedula)
                    .input('password', sql.NVarChar, userData.password)
                    .input('nombre', sql.NVarChar, userData.nombre)
                    .input('primerApellido', sql.NVarChar, userData.primerApellido)
                    .input('segundoApellido', sql.NVarChar, userData.segundoApellido)
                    .input('correo', sql.NVarChar, userData.correo)
                    .input('fechaNacimiento', sql.DateTime2, userData.fechaNacimiento)
                    .input('activo', sql.Bit, userData.activo)
                    .query(sqlQueries.insertUser);
        return newUser.recordset;
    } catch (error) {
        return error.message;
    }
}

const createRole = async (userData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('user');
        const newUser = await pool.request()
                    .input('nombre', sql.NVarChar, userData.nombre)
                    .query(sqlQueries.insertRol);
        return newUser.recordset;
    } catch (error) {
        return error.message;
    }
}

const logConsumedRoutesByUser = async (userData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('user');
        const newUser = await pool.request()
                    .input('codigoRuta', sql.NVarChar, userData.codigoRuta)
                    .input('cedula', sql.NVarChar, userData.cedula)
                    .input('fechaDeUso', sql.DateTime, new Date())
                    .query(sqlQueries.logConsumedRoute);
        return newUser.recordset;
    } catch (error) {
        return error.message;
    }
}

const changeRoleName = async (userData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('user');
        const newUser = await pool.request()
                    .input('lastName', sql.NVarChar, userData.lastName)
                    .input('nombre', sql.NVarChar, userData.newName)
                    .query(sqlQueries.changeRoleName);
        return newUser.recordset;
    } catch (error) {
        return error.message;
    }
}

const retrieveRoleIdByName = async (roleName) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('user');
        const newUser = await pool.request()
                    .input('roleName', sql.NVarChar, roleName)
                    .query(sqlQueries.getRoleIdByName);
        return newUser.recordset;
    } catch (error) {
        return error.message;
    }
}

const addRolesToUser = async (rolesToAdd) => {
    try {
        sql.connect(config.sql)
            .then(() => {

                const table = new sql.Table(config.sql.rolesUserTableName); //Configurable table name for enabling bulk insert
                table.create = false;
                table.columns.add('id_rol', sql.Int, { nullable: false, primary: true });
                table.columns.add('cedula', sql.Numeric, { nullable: false, primary: true  });

                rolesToAdd.forEach(element => {
                    table.rows.add(element.id_rol, element.cedula)
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
    getUsers,
    getUserById,
    createUser,
    createRole,
    changeRoleName,
    addRolesToUser,
    retrieveRoleIdByName,
    getRolesByUserId,
    getUserDrivers,
    logConsumedRoutesByUser,
    getConsumedRoutesByUser
}