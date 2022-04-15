module.exports = ( sequelize, DataTypes ) => {
    const Users = sequelize.define("users", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        zipCode: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
        },

    })

    return Users
}