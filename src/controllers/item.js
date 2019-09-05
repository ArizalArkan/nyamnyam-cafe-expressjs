const itemModels = require('../models/item')
const MiscHelper = require('../helpers/helpers')
const cloudinary = require('cloudinary')

module.exports = {
    getItem: (req, res) => {
        itemModels.getItem()
            .then((resultitem) => {
                const result = resultitem
                MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    itemDetail: (req, res) => {
        const id_item = req.params.id_item
        itemModels.itemDetail(id_item)
            .then((resultitem) => {
                const result = resultitem[0]
                MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    getByStore: (req, res) => {
        const id_store = req.params.id_store
        itemModels.getByStore(id_store)
            .then((resultitem) => {
                const result = resultitem
                MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    getByCategory: (req, res) => {
        const id_category = req.params.id_category
        itemModels.getByCategory(id_category)
            .then((resultitem) => {
                const result = resultitem
                MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    insertItem: async (req, res) => {
        let path = req.file.path
        let geturl = async (req) => {
            cloudinary.config({
                cloud_name: process.env.CLOUD_NAME,
                api_key: process.env.API_KEY,
                api_secret: process.env.API_SECRET
            })

            let dataCloudinary
            await cloudinary.uploader.upload(path, (result) => {
                const fs = require('fs')
                fs.unlinkSync(path)
                dataCloudinary = result.url
            })

            return dataCloudinary
        }
        const { name_item, price, id_category, } = req.body
        const data = {
            name_item,
            image: await geturl(),
            price,
            id_category,
        }
        itemModels.insertItem(data)
            .then((resultitem) => {
                const result = resultitem
                MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    updateItem: (req, res) => {
        const id_item = req.params.id_item
        const { name_item, image, price, id_category } = req.body
        const data = {
            name_item,
            image,
            price,
            id_category,
        }
        itemModels.updateItem(id_item, data)
            .then((resultitem) => {
                const result = resultitem
                MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    deleteItem: (req, res) => {
        const id_item = req.params.id_item
        itemModels.deleteItem(id_item)
            .then((resultitem) => {
                const result = resultitem
                MiscHelper.response(res, result, 200)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}