require('dotenv').config()
const connection = require('../configs/db')

module.exports = {
    // getPayment: () => {
    //     return new Promise((resolve, reject) => {
    //         connection.query("SELECT * FROM payment", (err, result) => {
    //             if (!err) {
    //                 resolve(result)
    //             } else {
    //                 reject(new Error(err))
    //             }
    //         })
    //     })
    // },
    paymentDetail: (id_payment) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM payment WHERE id_payment =?", id_payment, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deliveryDetail: (id_delivery) => {
        console.log(id_delivery)
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM delivery WHERE id_delivery =?", id_delivery, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getByUser: (id_user) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM payment WHERE status = 0 AND id_user =?", id_user, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getPayment: (id_user) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM payment WHERE id_user =? ORDER BY id_payment DESC", id_user, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updateStatus: (id_payment, data) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE payment SET ? WHERE id_payment = ?", [data, id_payment], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    geAlltPayment: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT payment.*, user.name FROM payment INNER JOIN user ON payment.id_user = user.id_user ORDER BY id_payment DESC", (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    checkoutPayment: (id_payment, data) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE payment SET ? WHERE id_payment = ?", [data, id_payment], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    nullCart: (id_user, dataup) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE cart SET ? WHERE id_user = ?", [dataup, id_user], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getCartByUser: (id_user) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT cart.*, item.name_item, item.price FROM cart INNER JOIN item ON cart.id_item = item.id_item WHERE status = 1 AND id_user =?", id_user, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getByStatus: (status) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT payment.*, user.email, user.name, delivery.name_delivery FROM payment INNER JOIN user ON payment.id_user = user.id_user INNER JOIN delivery ON payment.id_delivery = delivery.id_delivery WHERE payment.status = ?", status, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    insertPayment: (data) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO payment SET ?", data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deletePayment: (id_payment) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM payment WHERE id_payment = ?", id_payment, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updatePayment: (id_payment, data) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE payment SET ? WHERE id_payment = ?", [data, id_payment], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    checkoutUser: (id_user) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE cart SET status = 0 WHERE id_user = ?", id_user, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },


}