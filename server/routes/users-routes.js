const express = require("express")
const userController = require("../controllers/users-controllers")
const router = express.Router()
const checkAuth = require("../middleware/check-auth")

router.post('/register',userController.register)

router.post('/login',userController.login)



router.use(checkAuth)

module.exports = router