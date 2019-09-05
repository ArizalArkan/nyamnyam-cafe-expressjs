const userModels = require('../models/user')
const MiscHelper = require('../helpers/helpers')
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary')

module.exports = {
    getUser: (req, res) => {
        const search = req.query.search;
        userModels.getUser(search)
            .then((resultUser) => {
                const result = resultUser
                MiscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    userDetail: (req, res) => {
        const id_user = req.params.id_user
        userModels.userDetail(id_user)
            .then((resultUser) => {
                const result = resultUser[0]
                MiscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    updateUser: async (req, res) => {
        let path = req.file.path
        console.log(req.body)
        const id_user = req.params.id_user

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

        const data = {
            name: req.body.name,
            photo: await geturl(),
            updated_at: new Date()
        }
        console.log(data)
        userModels.updateUser(id_user, data)
            .then((resultRegister) => {
                MiscHelper.response(res, resultRegister, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    register: (req, res) => {
        const salt = MiscHelper.generateSalt(18)
        const passwordHash = MiscHelper.setPassword(req.body.password, salt)
        const data = {
            email: req.body.email,
            password: passwordHash.passwordHash,
            name: req.body.name,
            photo: "https://res.cloudinary.com/dfezrynjl/image/upload/v1566978174/profile_ibj8zy.png",
            salt: passwordHash.salt,
            token: "",
            status: 1,
            created_at: new Date(),
            updated_at: new Date()
        }
        console.log(data)
        userModels.register(data)
            .then((resultRegister) => {
                MiscHelper.response(res, resultRegister, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    login: (req, res) => {
        const email = req.body.email
        const password = req.body.password
        userModels.getByEmail(email)
            .then((result) => {
                const dataUser = result[0]
                console.log(dataUser)
                const usePassword = MiscHelper.setPassword(password, dataUser.salt).passwordHash
                if (usePassword === dataUser.password) {
                    dataUser.token = jwt.sign({
                        userid: dataUser.id_user
                    }, process.env.SECRET_KEY, { expiresIn: '48h' });
                    delete dataUser.salt
                    delete dataUser.password
                    return MiscHelper.response(res, dataUser, 200)
                } else {
                    return MiscHelper.response(res, null, 403, 'Wrong passwrod !')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    },
    deleteUser: (req, res) => {
        const id_user = req.params.id_user
        userModels.deleteUser(id_user)
            .then((resultUser) => {
                const result = resultUser
                MiscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    }

}