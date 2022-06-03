const dbConfig = require('../config/dbConfig.js')

const {Sequelize, DataTypes} = require('sequelize')


const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool:{
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected ...')
})
.catch(err => {
    console.log("Error in seq auth => ", err)
})


const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require('./productModel.js')(sequelize, DataTypes)
db.reviews = require('./reviewModel.js')(sequelize, DataTypes)
db.users = require('./userModel.js')(sequelize, DataTypes)
db.carts = require('./cartModel.js')(sequelize, DataTypes)



db.sequelize.sync({force: false})
.then(() => {
    console.log("yes re-sync done");
})

// Relationship

// 1 to many between users a& carts
// db.users.hasMany(db.carts, {
//     foreignKey: 'user_id',
//     as: 'carts'
// })

db.users.hasOne(db.carts, {
    foreignKey:'user_id',
    as:'carts'
})

db.carts.belongsTo(db.users, {
    foreignKey: 'user_id',
    as: 'cartOwners'
})

// db.carts.hasMany(db.products, {
//     foreignKey: 'product_id',
//     as: 'products'
// })

// db.products.belongsTo(db.carts)

// db.users.belongsToMany(db.products, {
//     through: 
// })

module.exports = db

