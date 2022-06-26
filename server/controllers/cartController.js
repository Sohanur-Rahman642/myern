const { carts } = require('../models')
const db = require('../models')
const { use } = require('../routes/cartRouter')

const Cart = db.carts
const Product = db.products
const User = db.users

//add to cart
const addToCart = async (req, res) => {
    const {product_id, price, quantity, user_id} = req.body;

    let info = {
        product_id: product_id,
        price: price,
        quantity: quantity,
        user_id: user_id
    }

    let apiName = 'addToCart'
    let suceess, status, message, data, result;

    if(!product_id || !price || !user_id){
        suceess = false;
        status = 0;
        data = {};
        message = 'required information is missing';
    }else{
        const cartInfo = await Cart.create(info)
        suceess = true;
        status = 1;
        data = cartInfo;
        message = 'item added to cart successfully'
    }

    result = {
        apiName: apiName,
        success: suceess,
        satus: status,
        data: data,
        message: message
    }

    res.status(200).send(result)
}

const findDetailsOfCart = async (value) => {
        let product = await Product.findOne({where: { product_id: value.product_id}})
        let user = await User.findOne({where: { id: value.user_id}})

        let info = {
            product_id: product.product_id,
            description: product.description,
            price: product.price,
            email: user.email
        }
       
        return info;
}

//get all from carts
const getAllCartsOfUser = async (req, res) => {
    let id = req.params.user_id
    
    let apiName = "getAllCartsOfUser"
    let suceess, status, message, data, result;


    const info = await Cart.findAll({
        where: { user_id: id }
    })

    const n = info.map(async item => {
         let unresolvedInfo = await Product.findOne({where:{product_id: item.product_id}})
         return {...item.dataValues, productInfo: unresolvedInfo.dataValues}
    })

    const p = await Promise.all(n);
    
    result = {
        apiName: apiName,
        suceess: true,
        status: 1,
        data: p,
        message: "All cart products fetched successfully"
    } 
    res.status(200).send(result)
}

module.exports = {
   addToCart,
   getAllCartsOfUser
 }