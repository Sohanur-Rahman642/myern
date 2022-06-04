const cartController = require('../controllers/cartController')

const router = require('express').Router()

router.post('/addToCart', cartController.addToCart)
router.get('/getAllCartsOfUser/:user_id', cartController.getAllCartsOfUser)

module.exports = router