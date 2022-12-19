const express = require('express');
const router = express.Router();
const userController = require("./controllers/userController")
const dataController = require("./controllers/dataController")


router.post("/createUser", userController.createUser)

router.post("/enterDashboard", userController.findUser)

router.get("/getData/:userName", dataController.getData)

router.post("/createContent", dataController.calPercentage)










module.exports = router;