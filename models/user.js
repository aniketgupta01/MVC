const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('customer',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:Sequelize.STRING,
    email:Sequelize.STRING
})

module.exports = User;