const express = require('express');
const Route = express.Router();
const itemController = require('../controllers/item')
const Auth = require('../helpers/auth')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        // cb(null, new Date().toISOString() + file.originalname);
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

Route
    .all('/*', Auth.authInfo)
    .get('/', itemController.getItem)
    .get('/:id_item', itemController.itemDetail)
    .get('/bycategory/:id_subcategory', itemController.getByCategory)
    .post('/', upload.single('image'), itemController.insertItem)
    .patch('/:id_item', itemController.updateItem)
    .delete('/:id_item', itemController.deleteItem)

module.exports = Route