const express = require('express');
const UserController = require("../controllers/UserController");
const TaskController = require("../controllers/TaskController");
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");
const {request} = require("express");
const router = express.Router();


//API

router.post("/registrations", UserController.registration)
router.post("/login", UserController.Login)
// AuthVerifyMiddleware needed
router.post("/profileUpdate", AuthVerifyMiddleware, UserController.ProfileUpdate)
// Task API
router.post("/taskCreate", AuthVerifyMiddleware, TaskController.createTask)
router.get("/updateTask/:id/:status", AuthVerifyMiddleware, TaskController.taskUpdate)
router.get("/deleteTask/:id", AuthVerifyMiddleware, TaskController.deleteTask)
router.get("/ListByStatus/:status", AuthVerifyMiddleware, TaskController.listTaskByStatus)
router.get("/statusCount",AuthVerifyMiddleware,TaskController.taskStatusByCount)

module.exports = router;