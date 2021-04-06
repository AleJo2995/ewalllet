'use strict';

const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/paymentsController');


const {executePayment, increaseWalletBalance} = paymentsController


router.post('/payments/payRoute', executePayment);
router.post('/payments/increaseWalletBalance/:walletId', increaseWalletBalance);



module.exports = {
    routes: router
}