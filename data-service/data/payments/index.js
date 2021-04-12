'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql/msnodesqlv8');

const retrieveWallet = async (walletId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('payments');
        const wallet = await pool.request()
                        .input('walletId', sql.Int, walletId)
                        .query(sqlQueries.retrieveWallet);
        return wallet.recordset;
    } catch (error) {
        return error.message;
    }
}

const retrieveWalletByUserId = async (cedula) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('payments');
        const wallet = await pool.request()
                        .input('cedula', sql.Int, cedula)
                        .query(sqlQueries.retrieveWalletByCedula);
        return wallet.recordset;
    } catch (error) {
        return error.message;
    }
}

const executePayment = async (balance, walletId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('payments');
        const wallet = await pool.request()
                        .input('walletId', sql.Int, walletId)
                        .input('balance', sql.Int, balance)
                        .query(sqlQueries.updateTotal);
        return wallet.recordset;
    } catch (error) {
        return error.message;
    }
}

const increaseWalletBalance = async (balance, walletId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('payments');
        const wallet = await pool.request()
                        .input('walletId', sql.Int, walletId)
                        .input('balance', sql.Int, balance)
                        .query(sqlQueries.updateTotal);
        return wallet.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    retrieveWallet,
    executePayment, 
    increaseWalletBalance,
    retrieveWalletByUserId
}