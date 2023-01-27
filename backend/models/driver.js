const Sequelize = require('sequelize');
const sequelize = require('../database');

const Driver = sequelize.define('drivers', {
    mail: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    company: {
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
});

module.exports = Driver;