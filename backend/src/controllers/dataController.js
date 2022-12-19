const userModel = require('../models/dataModel')

const getData = async function (req, res) {
    try {
        let name = req.params.userName.toLowerCase()
        let findData = await dataModel.find({ user: name })
        if (!findData) return res.status(400).send({ status: false, message: "You have no data created. Please create content" })
        return res.status(200).send({ status: true, message: 'data found successfull', data: findData })
    } 
    
    catch (error) {
        return res.status(500).send({ status: false, message: 'Server Side Error. Please try later', info: error })
    }
    
}

const calPercentage = async function(req,res){
    try {
        let data = req.body
        let name = data.user.toLowerCase()
        data.user = name

        let points = Object.values(data.understanding).map(Number)
        let sumPoints = 0
        for (let num of points) {
            sumPoints += num
        }
        let totalBlocks = points.length

        let percent = ((sumPoints * 100) / (totalBlocks * 4))
        percent = Math.round((percent * 100) / 100)
        if (points.length === 0) data.percentage = `N/A`
        else data.percentage = `${percent} %`

        let saveData = await dataModel.create(data)
        return res.status(201).send({ status: true, message: 'Data saved Successfully', data: saveData })
    } 
    
    catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: 'Server Side Error. Please try later', info: error })

    }
    
}

module.exports = {getData, calPercentage};