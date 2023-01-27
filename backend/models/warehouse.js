const Sequelize = require('sequelize');
const sequelize = require('../database');

const Warehouse = sequelize.define('warehouses', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    height : {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    length : {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    width : {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    occupied_capacity : {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    address : {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    zipcode: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = Warehouse;