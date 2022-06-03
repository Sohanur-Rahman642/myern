const db = require('../models')

// image Upload
const multer = require('multer')
const path = require('path')

/// create main Model
const Product = db.products
const Review = db.reviews

//Write apis for products
// 1. create product

const addProduct = async (req, res) => {
    let info = {
        product_id: req.body.product_id,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,  
        images: req.file.path,  
    }
    let apiName = 'addProducts'
    let suceess, status, message, data, result;
    if(!info.product_id || !info.title){
        suceess = false;
        status = 0,
        data = {};
        message = 'required information is missing';
        result = {
            apiName: apiName,
            suceess: suceess,
            status: status,
            data: data,
            message: message
        }
    }else{
        const product = await Product.create(info)
        suceess = true;
        status = 1,
        data = product;
        message = 'Product has been added successfully';
        result = {
            apiName: apiName,
            suceess: suceess,
            status: status,
            data: data,
            message: message
        }
    }
    
     res.status(200).send(result)
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

    let result;
    if(products){
        result = {
            apiName: 'getAllProducts',
            suceess: true,
            status: 1,
            data: products,
            message: ' All products has been fetched successfully'
        }
    }

    res.status(200).send(result)
}

// 3. get a product by product id
const getOneProduct = async (req, res) => {
    let product_id = req.params.product_id
    let product = await Product.findOne({where: { product_id: product_id}})

    let result;
    if(product){
        result = {
            apiName: 'getOneProduct',
            suceess: true,
            status: 1,
            data: product,
            message: ' Product has been fetched successfully'
        }
    }

    res.status(200).send(result)
}


//4. update product by product id
const updateProduct = async (req, res) => {
    let product_id = req.params.product_id
    const product = await Product.update(req.body, {where: { product_id: product_id}})
    let result;
    if(product){
        result = {
            apiName: 'updateProduct',
            suceess: true,
            status: 1,
            data: product,
            message: 'This product has been updated successfully'
        }
    }
    res.status(200).send(product)
}

// 5. delete product by product id
const deleteProduct = async (req, res) => {
    let product_id = req.params.product_id
    await Product.destroy({ where: { product_id: product_id}})
    res.status(200).send({
        apiName: 'deleteProduct',
        suceess: true,
        status: 1,
        data: {},
        message: 'This product has been deleted successfully'
    })
}

//6. published product by product id
const getPublishedProducts = async (req, res) => {
    const products = await Product.findAll({where: { published: true}})

    let result;
    if(products){
        result = {
            apiName: 'getPublishedProduct',
            suceess: true,
            status: 1,
            data: products,
            message: 'All published products has been fetched successfully'
        }
    }
    
    res.status(200).send(result)
}


// 8. Upload Image Controller

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('images')

module.exports = {
    addProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getPublishedProducts,
    upload
}