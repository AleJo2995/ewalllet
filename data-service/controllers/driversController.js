'use strict';

const paymentsData = require('../data/payments');

const executePayment = async(req, res, next) => {
    try {
        const walletId = req.body.walletId;
        const amount = req.body.amount;
        const wallet = await paymentsData.retrieveWallet(walletId);
        //Logic to validate if wallet has balance
        const balance = wallet[0].saldo - amount;
        if (balance <= 0){
            res.status(500).send(error.message);
        }
        const payment = await paymentsData.executePayment(balance, walletId);
        res.send(payment);
    } catch(error) {
        res.status(500).send(error.message);
    }
}




module.exports = {
    executePayment
}