const db = require('../models')

/// create main Model
const Product = db.products
const Review = db.reviews

//Write apis for products
// 1. create product

const addProduct = async (req, res) => {
    let info = {
        product_id: req.body.productId,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,    
    }

    const product = await Product.create(info)
    res.status(200).send(product)
    console.log(product)
}


// 2. get all products
const getAllProducts = async (req, res) => {
    let products = await Product.findAll({
        attributes: [
            'title',
            'price',
            'description',
        ]
    })
    res.status(200).send(products)
}

// 3. get a product by product id
const getOneProduct = async (req, res) => {
    let id = req.params.productId
    let product = await Product.findOne({where: { product_id: productId}})
    res.status(200).send(product)
}


//4. update product by product id
const updateProduct = async (req, res) => {
    let id = req.params.productId
    const product = await Product.update(req.body, {where: { product_id: productId}})
    res.status(200).send(product)
}

// 5. delete product by product id
const deleteProduct = async (req, res) => {
    let id = req.params.productId
    await Product.destroy({ where: { product_id: productId}})
    res.status(200).send('Product is deleted !')
}

//6. published product by product id
const getPublishedProduct = async (req, res) => {
    const product = await Product.findAll({where: { published: true}})
    res.status(200).send(product)
}

module.exports = {
    addProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getPublishedProduct
}