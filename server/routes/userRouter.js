const userController = require('../controllers/userController')

const router = require('express').Router()

router.post('/signUp', userController.signUp)

router.post('/logIn', userController.logIn)

router.get('/getCartItemsByUser/:user_id', userController.getCartItemsByUser)

module.exports = router