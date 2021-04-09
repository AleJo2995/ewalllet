'use strict';

const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/paymentsController');


const {executePayment, increaseWalletBalance,
       getWalletByUserId} = paymentsController;


router.post('/payments/payRoute', executePayment);
router.post('/payments/increaseWalletBalance/:walletId', increaseWalletBalance);
router.get('/payments/wallet/get/:cedula', getWalletByUserId);



module.exports = {
    routes: router
}