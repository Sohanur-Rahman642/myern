const productController = require('../controllers/productController')

const router = require('express').Router()

router.post('/addProduct', productController.addProduct)

router.get('/allProducts', productController.getAllProducts)

router.get('/published', productController.getPublishedProducts)

router.get('/:product_id', productController.getOneProduct)

router.put('/update/:product_id', productController.updateProduct)

router.delete('/delete/:product_id', productController.deleteProduct)

module.exports = router