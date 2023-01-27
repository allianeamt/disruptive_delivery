const Sequelize = require('sequelize');
const sequelize = require('../database');

const Shift = sequelize.define('shifts', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    day: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    period: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

module.exports = Shift;