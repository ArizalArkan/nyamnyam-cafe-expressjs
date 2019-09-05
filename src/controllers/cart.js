const cartModels = require('../models/cart')
const MiscHelper = require('../helpers/helpers')

module.exports = {
    getCart: (req, res) => {
        cartModels.getCart()
            .then((resultcart) => {
                const result = resultcart
                MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    cartDetail: (req, res) => {
        const id_cart = req.params.id_cart
        cartModels.cartDetail(id_cart)
            .then((resultcart) => {
                const result = resultcart[0]
                MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    getByUser: (req, res) => {
        const id_user = req.params.id_user
        cartModels.getByUser(id_user)
            .then((resultcart) => {
                const result = resultcart
                MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    checkoutUser: (req, res) => {
        const id_user = req.params.id_user
        cartModels.checkoutUser(id_user)
            .then((resultcart) => {
                const result = resultcart
                MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    quantityPlus: (req, res) => {
        const id_cart = req.params.id_cart
        cartModels.quantityPlus(id_cart)
            .then((resultcart) => {
                const result = resultcart
                MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    quantityMinus: (req, res) => {
        const id_cart = req.params.id_cart
        cartModels.quantityMinus(id_cart)
            .then((resultcart) => {
                const result = resultcart
                MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    insertCart: (req, res) => {
        const { id_item, id_user } = req.body

        const data = {
            id_item,
            quantity: 1,
            id_user,
            status: 1,
            created_at: new Date(),
            updated_at: new Date()
        }
        console.log(data)
        cartModels.checkCart(id_item, id_user)
            .then((resultcart) => {
                const result = resultcart
                if (result.length < 1) {
                    cartModels.insertCart(data)
                        .then((resultcart) => {
                            const result = resultcart
                            MiscHelper.response(res, result, 200)
                        })
                        .catch((err) => {
                            console.log(err)
                        })

                } else {
                    MiscHelper.response(res, null, 403, "data sudah ada")
                }
            })
            .catch((err) => {
                console.log(err)
            })


    },
    updateCart: (req, res) => {
        const id_cart = req.params.id_cart
        const { id_item, quantity, id_user, ket, status } = req.body
        const data = {
            id_item,
            quantity,
            id_user,
            ket,
            status,
            updated_at: new Date()
        }
        cartModels.updateCart(id_cart, data)
            .then((resultcart) => {
                const result = resultcart
                MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    deleteCart: (req, res) => {
        const id_cart = req.params.id_cart
        cartModels.deleteCart(id_cart)
            .then((resultcart) => {
                const result = resultcart
                MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}