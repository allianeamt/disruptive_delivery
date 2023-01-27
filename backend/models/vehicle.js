const Sequelize = require('sequelize');
const sequelize = require('../database');
const Driver = require('./driver');

const Vehicle = sequelize.define('vehicles', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    driver_mail: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    height: {
        type: Sequelize.FLOAT
    },
    length: {
        type: Sequelize.FLOAT
    },
    width: {
        type: Sequelize.FLOAT
    },
    capacity: {
        type: Sequelize.FLOAT,
        allowNull: false
    },

});

Vehicle.belongsTo(Driver, { foreignKey: 'driver_mail', targetKey: 'mail' });

module.exports = Vehicle;