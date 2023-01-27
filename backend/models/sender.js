const Sequelize = require('sequelize');
const sequelize = require('../database');

const Sender = sequelize.define('senders', {
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
    orders_api: {
        type: Sequelize.STRING,
        allowNull: false
    },
    access_key: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = Sender;