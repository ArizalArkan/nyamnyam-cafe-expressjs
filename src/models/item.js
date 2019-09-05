require('dotenv').config()
const connection = require('../configs/db')

module.exports = {
    getItem: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT item.*, category.name_category FROM item INNER JOIN category ON item.id_category = category.id_category", (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    itemDetail: (id_item) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT item.*, category.name_category FROM item INNER JOIN category ON item.id_category = category.id_category WHERE id_item = ?", id_item, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    insertItem: (data) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO item SET ?", data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    getByCategory: (id_subcategory) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT item.*, category.name_category FROM item INNER JOIN category ON item.id_category = category.id_category WHERE item.id_category = ?", id_subcategory, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deleteItem: (id_item) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM item WHERE id_item = ?", id_item, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updateItem: (id_item, data) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE item SET ? WHERE id_item = ?", [data, id_item], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }


}