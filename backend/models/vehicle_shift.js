const Sequelize = require('sequelize');
const sequelize = require('../database');
const Vehicle = require('./vehicle');
const Shift = require('./shift');

const VehicleShift = sequelize.define('vehicle_shifts', {
    id_vehicle: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    id_shift: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
});

Vehicle.belongsToMany(Shift, { through: VehicleShift, foreignKey: 'id_vehicle' });
Shift.belongsToMany(Vehicle, { through: VehicleShift, foreignKey: 'id_shift' });

module.exports = VehicleShift;