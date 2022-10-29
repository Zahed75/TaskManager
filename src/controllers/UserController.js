const UserModel = require("../models/UserModel")
const jwt = require("jsonwebtoken");


//Registrations
exports.registration = (req, res) => {
    let reqBody = req.body
    UserModel.create(reqBody, (err, data) => {
        if (err) {
            res.status(400).json({status: "failed", data: err})
        } else {
            res.status(200).json({status: "success", data: data})
        }
    })
}


//Login

exports.Login = (req, res) => {
    let reqBody = req.body
    UserModel.aggregate([
        {$match: reqBody},
        {$project: {_id: 0, email: 1, firstName: 1, lastName: 1, mobile: 1,photo:1}}
    ], (err, data) => {
        if (err) {
            res.status(400).json({status: "Failed", data: err})
        } else {
            if (data.length > 0) {
                let Payload = {exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), data: data[0]['email']}
                let token = jwt.sign(Payload, 'SecretKey123456789')
                res.status(200).json({status: "Login Success", token: token, data: data[0]})
            } else {
                res.status(401).json({status: "Unauthorized!"})
            }
        }
    })
}


//Profile Update

exports.ProfileUpdate = (req, res) => {

}