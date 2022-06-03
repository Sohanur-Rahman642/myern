const cartController = require('../controllers/cartController')

const router = require('express').Router()

router.post('/addToCart', cartController.addToCart)
router.get('/getAllProductsOfUser/:user_id', cartController.getAllProductsOfUser)

module.exports = router