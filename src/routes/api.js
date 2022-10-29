const express = require('express')
const UserController = require("../controllers/UserController")
const router = express.Router();


//API

router.post("/registrations", UserController.registration)
router.post("/profileUpdate",UserController.ProfileUpdate)
router.post("/login",UserController.Login)

module.exports = router;