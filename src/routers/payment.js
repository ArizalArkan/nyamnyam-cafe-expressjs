const express = require('express');
const Route = express.Router();
const paymentController = require('../controllers/payment')
const Auth = require('../helpers/auth')

Route
    .all('/*', Auth.authInfo)
    .get('/', paymentController.geAlltPayment)
    .get('/:id_payment', paymentController.paymentDetail)
    .get('/byuser/:id_user', paymentController.getByUser)
    .get('/getpayment/:id_user', paymentController.getPayment)
    .get('/bystatus/:status', paymentController.getByStatus)
    .post('/', paymentController.insertPayment)
    .post('/start/:id_user', paymentController.startPayment)
    .patch('/:id_payment', paymentController.updatePayment)
    .patch('/updatestatus/:id_payment', paymentController.updateStatus)
    .patch('/checkoutpayment/:id_payment', paymentController.checkoutPayment)
    .delete('/:id_payment', paymentController.deletePayment)

module.exports = Route