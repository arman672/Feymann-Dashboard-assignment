const userModel = require('../models/userModel')

const createUser = async function (req, res) {
    try {
        let data = req.body
        username = data.username.toLowerCase()
        let findUser = await userModel.findOne({ username: username })
        if (findUser) return res.status(400).send({ status: false, message: "This username already exists. Please enter another name" })
        let createData = await userModel.create({ username: username })
        return res.status(201).send({ status: true, message: 'User Created Successfully', data: createData })
    } 
    
    catch (error) {
        return res.status(500).send({ status: false, message: 'Server Error', info: error})
    }
    
}

const findUser = async function(req, res){
    try {
        let name = req.body.username.toLowerCase()
        let findUser = await userModel.findOne({ username: name })
        if (!findUser) return res.status(400).send({ status: false, message: "User doesnot exist. Please create username" })
        return res.status(200).send({ status: true, message: 'User found', data: findUser })
    } 
    
    catch (error) {
        return res.status(500).send({ status: false, message: 'Server Error', info: error })
    }
    
}

module.exports = {createUser, findUser};