const express = require("express")
const router = express.Router()
const controller = require("../Controller/usercontroller")

router.post("/signUp",controller.signUp)
router.post("/login",controller.logIn)

module.exports = router