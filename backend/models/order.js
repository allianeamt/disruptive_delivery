const Sequelize = require('sequelize');
const sequelize = require('../database');

const Order = sequelize.define('orders', {
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    send_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    delivery_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    length: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    width: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    height: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    fragility: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    sender_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sender_address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sender_zipcode: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sender_city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sender_country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    receiver_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    receiver_address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    receiver_zipcode: {
        type: Sequelize.STRING,
        allowNull: false
    },
    receiver_city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    receiver_country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    original_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    state: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
});

module.exports = Order;