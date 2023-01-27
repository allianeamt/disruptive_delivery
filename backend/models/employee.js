const Sequelize = require('sequelize');
const sequelize = require('../database');

const Employee = sequelize.define('employees', {
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
    type: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

module.exports = Employee;