const express = require('express');
const Route = express.Router();
const userController = require('../controllers/user')
const Auth = require('../helpers/auth')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        // console.log(file)
        // cb(null, new Date().toISOString() + file.originalname);
        cb(null, file.originalname)
    }
})
console.log(storage)
const upload = multer({ storage: storage })

Route
    .all('/*', Auth.authInfo)
    .get('/', userController.getUser)
    .get('/:id_user', userController.userDetail)
    .post('/register', userController.register)
    .post('/login', userController.login)
    .patch('/:id_user', upload.single('photo'), userController.updateUser)
    .delete('/:id_user', userController.deleteUser)

module.exports = Route;