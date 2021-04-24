'use strict';

const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/paymentsController');


const {executePayment, increaseWalletBalance,
       getWalletByUserId, createWallet} = paymentsController;


router.post('/payments/payRoute', executePayment);
router.post('/payments/increaseWalletBalance/:walletId', increaseWalletBalance);
router.get('/payments/wallet/get/:cedula', getWalletByUserId);
router.post('/payments/create', createWallet);



module.exports = {
    routes: router
}