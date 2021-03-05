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

module.exports = {
    getUsers,
    getUserById,
    createUser
}