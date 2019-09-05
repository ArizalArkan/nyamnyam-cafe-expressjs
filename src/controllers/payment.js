const paymentModels = require('../models/payment')
const MiscHelper = require('../helpers/helpers')

module.exports = {
    getPayment: (req, res) => {
        paymentModels.getPayment()
            .then((resultpayment) => {
                const result = resultpayment
                MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    paymentDetail: (req, res) => {
        const id_payment = req.params.id_payment
        paymentModels.paymentDetail(id_payment)
            .then((resultpayment) => {
                const result = resultpayment[0]
                MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    insertPayment: (req, res) => {
        const { id_cart, total_price, name_item, id_delivery, payment_method, id_user } = req.body
        const data = {
            id_cart,
            total_price,
            name_item,
            id_delivery,
            payment_method,
            id_user,
            status: 0,
            created_at: new Date(),
            updated_at: new Date()
        }
        paymentModels.insertPayment(data)
            .then((resultpayment) => {
                const result = resultpayment
                MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    getPayment: (req, res) => {
        const id_user = req.params.id_user
        paymentModels.getPayment(id_user)
            .then((resultpayment) => {
                const result = resultpayment[0]
                MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    checkoutPayment: (req, res) => {
        const id_payment = req.params.id_payment
        const { id_delivery, payment_method } = req.body
        const data = {
            id_delivery,
            payment_method,
            status: 0
        }
        paymentModels.paymentDetail(id_payment)
            .then((resultpayment) => {
                const result = resultpayment[0]
                let total_price = result.total_price
                let id_user = result.id_user
                console.log(result)
                if (result.status === 9) {
                    paymentModels.deliveryDetail(id_delivery)
                        .then((resultpayment) => {
                            const result = resultpayment[0]
                            const cost = result.cost
                            data.total_payment = cost + total_price
                            console.log(data)
                            paymentModels.checkoutPayment(id_payment, data)
                                .then((resultpayment) => {
                                    dataup = {
                                        status: 0
                                    }
                                    paymentModels.nullCart(id_user, dataup)
                                        .then((resultpayment) => {
                                            const result = resultpayment
                                            MiscHelper.response(res, result, 200)
                                        })
                                        .catch((err) => {
                                            console.log(err)
                                        })
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        })
                        .catch((err) => {
                            console.log(err)

                        })
                } else {
                    console.log("data udah di cekout ")
                    MiscHelper.response(res, null, 403, "Error data sudah di Checkout")
                }


                // MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    updateStatus: (req, res) => {
        const id_payment = req.params.id_payment
        const data = {
            status: req.body.status
        }
        paymentModels.updateStatus(id_payment, data)
            .then((resultpayment) => {
                const result = resultpayment
                MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    getByUser: (req, res) => {
        const id_user = req.params.id_user
        paymentModels.getByUser(id_user)
            .then((resultpayment) => {
                const result = resultpayment
                MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    startPayment: (req, res) => {
        const id_user = req.params.id_user
        paymentModels.getCartByUser(id_user)
            .then((resultpayment) => {
                const result = resultpayment
                let harga = 0
                let id_cart = []
                let name_item = []
                let quantity = []
                result.map((item) => {
                    id_cart.push(item.id_cart)
                    name_item.push(item.quantity + 'x ' + item.name_item + '(' + item.price + ')')
                    harga += item.quantity * item.price
                })
                let ppn = harga * 10 / 100
                let total_payment = harga + ppn

                const data = {
                    id_cart: id_cart.join(" "),
                    name_item: name_item.join(", "),
                    total_price: harga,
                    id_user: id_user,
                    status: 1,
                    ppn: ppn,
                    total_payment: total_payment,
                    created_at: new Date(),
                    updated_at: new Date()
                }
                console.log(data)
                paymentModels.insertPayment(data)
                    .then((resultpayment) => {
                        const result = resultpayment
                        paymentModels.checkoutUser(id_user)
                        paymentModels.getPayment(id_user)
                            .then((resultpayment) => {
                                const resultdata = resultpayment[0]
                                MiscHelper.response(res, resultdata, 200)
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    },
    getByStatus: (req, res) => {
        const status = req.params.status
        paymentModels.getByStatus(status)
            .then((resultpayment) => {
                const result = resultpayment
                MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    geAlltPayment: (req, res) => {

        paymentModels.geAlltPayment()
            .then((resultpayment) => {
                const result = resultpayment
                MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    updatePayment: (req, res) => {
        const id_payment = req.params.id_payment
        const { id_cart, name_item, total_price, id_delivery, payment_method, id_user, status } = req.body
        const data = {
            id_cart,
            name_item,
            total_price,
            id_delivery,
            payment_method,
            id_user,
            status,
            updated_at: new Date()
        }
        paymentModels.updatePayment(id_payment, data)
            .then((resultpayment) => {
                const result = resultpayment
                MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    deletePayment: (req, res) => {
        const id_payment = req.params.id_payment
        paymentModels.deletePayment(id_payment)
            .then((resultpayment) => {
                const result = resultpayment
                MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}