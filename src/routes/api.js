const express = require('express')
const UserController = require("../controllers/UserController")
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware")
const router = express.Router();


//API

router.post("/registrations", UserController.registration)
router.post("/login", UserController.Login)
// AuthVerifyMiddleware
router.post("/profileUpdate", AuthVerifyMiddleware, UserController.ProfileUpdate)


module.exports = router;