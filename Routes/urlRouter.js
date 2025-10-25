const express = require("express")
const router = express.Router()
const controller = require("../Controller/urlcontroller")
const {validateJWTToken} = require("../Middleware/authMiddleware")

router.post("/shorten",validateJWTToken,controller.saveUrlToDB)
router.get("/:shortCode",controller.redirectToTargetUrl)
module.exports = router