module.exports = ( sequelize, DataTypes ) => {
    const Product = sequelize.define("product", {
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price:{
            type: DataTypes.FLOAT,
        },
        description: {
            type: DataTypes.TEXT
        },
        published: {
            type: DataTypes.BOOLEAN,
        }
    })

    return Product
}