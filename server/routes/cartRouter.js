const cartController = require('../controllers/cartController')

const router = require('express').Router()

router.post('/addToCart', cartController.addToCart)
router.get('/getAllProductsFromCart/:product_id', cartController.getAllProductsFromCart)

module.exports = router