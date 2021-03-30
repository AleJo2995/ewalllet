'use strict';

const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/paymentsController');


const {executePayment} = paymentsController


router.post('/payments/payRoute', executePayment);



module.exports = {
    routes: router
}