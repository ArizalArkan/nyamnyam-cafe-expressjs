const express = require('express');
const Route = express.Router();
const cartController = require('../controllers/cart')
const Auth = require('../helpers/auth')

Route
    .all('/*', Auth.authInfo)
    .get('/', cartController.getCart)
    .get('/:id_cart', cartController.cartDetail)
    .get('/byuser/:id_user', cartController.getByUser)
    .get('/checkout/:id_user', cartController.checkoutUser)
    .patch('/quantityplus/:id_cart', cartController.quantityPlus)
    .patch('/quantityminus/:id_cart', cartController.quantityMinus)
    .post('/', cartController.insertCart)
    .patch('/:id_cart', cartController.updateCart)
    .delete('/:id_cart', cartController.deleteCart)

module.exports = Route