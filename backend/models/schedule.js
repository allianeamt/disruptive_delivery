const Sequelize = require('sequelize');
const sequelize = require('../database');
const Driver = require('./driver');
const Order = require('./order');
const Shift = require('./shift');

const Schedule = sequelize.define('schedules', {
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
    order_code: {
        type: Sequelize.STRING,
        allowNull: false
    },
    shift_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    pickup_city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    delivery_city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

Schedule.belongsTo(Driver, {foreignKey: 'driver_mail'});
Schedule.belongsTo(Order, {foreignKey: 'order_code'});
Schedule.belongsTo(Shift, {foreignKey: 'shift_id'});

module.exports = Schedule;