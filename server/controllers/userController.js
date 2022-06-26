const fetch = require('node-fetch');

const db = require('../models')
const bcrypt = require('bcrypt')

const Users = db.users
const Cart = db.carts
const Product = db.products

//Write apis for users
// 1. create users

const signUp = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    var value = req.body.password ? await bcrypt.hash(req.body.password, salt) : '';

    let info = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: value,
        address: req.body.address,    
        zipCode: req.body.zipCode, 
        isAdmin: false,
    }
    let apiName = 'signUp'
    let suceess, status, message, data, result;
    if(!info.firstName ||
         !info.lastName ||
         !info.email ||
         !info.password ||
         !info.address ||
         !info.zipCode 
         ){

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
        const users = await Users.create(info)
        suceess = true;
        status = 1,
        data = users;
        message = 'User has been added successfully';
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


//log in
const logIn = async (req, res) => {
    const {email, password} = req.body;

    let apiName = 'logIn'
    let suceess, status, message, data, result;

    if(!email ||
        !password){
            suceess = false;
            status = 0,
            data = {};
            message = 'required information is missing';
        }else{
            const user = await Users.findOne({ where: { email } });
            if (!user || !(await bcrypt.compare(password, user.password))){
                suceess = false;
                status = 0,
                data = {};
                message = 'Email or Password is incorrect';  
            }else{
                let info = {
                    user_id : user.id,
                    email: user.email,
                    isAdmin: user.isAdmin,
                }

                suceess = true;
                status = 1,
                data = info;
                message = 'Login Successful';
            }
        }

        result = {
            apiName: apiName,
            suceess: suceess,
            status: status,
            data: data,
            message: message
        } 

    res.status(200).send(result)
}



//getCartItemsByUser


module.exports = {
   signUp,
   logIn
}