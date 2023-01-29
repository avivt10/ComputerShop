const express = require("express")
const productsController = require("../controllers/products-controller")
const router = express.Router()


router.post('/addProduct',productsController.addProduct)

router.get('/getProducts',productsController.getProducts)

router.delete('/deleteProduct',productsController.deleteProduct)

router.put('/editProduct',productsController.editProduct)


module.exports = router