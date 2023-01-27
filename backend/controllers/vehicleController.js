const Vehicle = require('../models/vehicle');
const Driver = require('../models/driver');
const VehicleShift = require('../models/vehicle_shift');

const getVehicles = async (req, res) => {
    try {
        await Vehicle.findAll().then(vehicles => {
            if (vehicles.length === 0) {
                return res.status(404).send({ error: 'No vehicles found' });
            }
            return res.status(200).json(vehicles);
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getVehicle = async (req, res) => {
    try {
        await Vehicle.findOne({
            where: { id: req.params.id }
        }).then(async vehicle => {
            if (!vehicle) {
                return res.status(404).send({ error: 'Vehicle with the given id does not exist' });
            }
            vehicle.shifts = [];
            await VehicleShift.findAll({
                where: { id_vehicle: vehicle.id }
            }).then(shifts => {
                shifts.forEach(shift => {
                    vehicle.shifts.push(shift);
                });
            });
            return res.status(200).json(vehicle);
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

function validateVehicleDataExists(body) {
    if (!body.driver_mail) {
        return 'The mail address of the driver is required';
    } else if (!body.type) {
        return 'The type is required';
    } else if (body.type !== 1 && !body.height) {
        return 'The height is required for this type of vehicle';
    } else if (body.type !== 1 && !body.length) { 
        return 'The length is required for this type of vehicle';
    } else if (body.type !== 1 && !body.width) {
        return 'The width is required for this type of vehicle';
    } else if (!body.capacity) {
        return 'The capacity is required';
    } else {
        return '';
    }
}

function validateVehicleData (body) {
    if (body.driver_mail && (body.driver_mail.length == 0 || body.driver_mail.length > 100)) {
        return 'The mail address of the driver must be between 1 and 100 characters';
    } else if (body.type && (body.type < 1 || body.type > 4)) {
        return 'The type can be 1 - bike, 2 - car, 3 - van or 4 - truck';
    } else if (body.height && (body.height < 0 || body.height > 100)) {
        return 'The height must be between 0 and 100';
    } else if (body.length && (body.length < 0 || body.length > 100)) {
        return 'The length must be between 0 and 100';
    } else if (body.width && (body.width < 0 || body.width > 100)) {
        return 'The width must be between 0 and 100';
    } else if (body.capacity && (body.capacity < 0 || body.capacity > 5000)) {
        return 'The capacity must be between 0 and 100';
    } else if (body.shifts && body.shifts.length > 0){
        body.shifts.forEach (shift => {
            if (shift.id && (shift.id < 1 || shift.id > 21)) {
                return 'All of the IDs of the shifts must be between 1 and 21';
            }
        });
    }
    return '';
};

const createVehicle = async (req, res) => {
    try {
        let dataExists = validateVehicleDataExists(req.body);
        let dataCorrect = validateVehicleData(req.body);
        console.log(dataExists);
        console.log(dataCorrect);
        if (dataExists !== '') {
            return res.status(400).send({ error: dataExists });
        }
        if (dataCorrect !== '') {
            return res.status(400).send({ error: dataCorrect });
        }
        const driverExists = await Driver.findOne({
            where: { mail: req.body.driver_mail }
        });
        if (!driverExists) {
            return res.status(404).send({ error: 'The vehicle must belong to an existing driver' });
        }
        await Vehicle.create({
            driver_mail: req.body.driver_mail,
            type: req.body.type,
            height: req.body.height,
            length: req.body.length,
            width: req.body.width,
            capacity: req.body.capacity,
        }).then(vehicle => {
            if (req.body.shifts && req.body.shifts.length > 0) {
                req.body.shifts.forEach(shift => {
                    VehicleShift.create({
                        id_vehicle: vehicle.id,
                        id_shift: shift
                    });
                });
            }
            return res.status(201).json(vehicle);
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const updateVehicle = async (req, res) => {
    try {
        let dataCorrect = validateVehicleData(req.body);
        if (dataCorrect !== '') {
            return res.status(400).send({ error: dataCorrect });
        }
        const vehicleExists = await Vehicle.findOne({
            where: { id: req.params.id }
        });
        if (!vehicleExists) {
            return res.status(404).send({ error: 'Vehicle with the given id does not exist' });
        }
        if (req.body.driver_mail) {
            const driverExists = await Driver.findOne({
                where: { mail: req.body.driver_mail }
            });
            if (!driverExists) {
                return res.status(404).send({ error: 'The vehicle must belong to an existing driver' });
            }
        }
        await Vehicle.update({
            driver_mail: req.body.driver_mail ?? vehicleExists.driver_mail,
            type: req.body.type ?? vehicleExists.type,
            height: req.body.height ?? vehicleExists.height,
            length: req.body.length ?? vehicleExists.length,
            width: req.body.width ?? vehicleExists.width,
            capacity: req.body.capacity ?? vehicleExists.capacity
        }, {
            where: { id: req.params.id }
        }).then(() => {
            if (req.body.shifts && req.body.shifts.length > 0) {
                VehicleShift.destroy({
                    where: { id_vehicle: req.params.id }
                });
                req.body.shifts.forEach(shift => {
                    VehicleShift.create({
                        id_vehicle: req.params.id,
                        id_shift: shift
                    });
                });
            }
            return res.status(200).json({ message: 'Vehicle updated successfully' });
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const deleteVehicle = async (req, res) => {
    try {
        const vehicleExists = await Vehicle.findOne({
            where: { id: req.params.id }
        });
        if (!vehicleExists) {
            return res.status(404).send({ error: 'Vehicle with the given id does not exist' });
        }
        await Vehicle.destroy({
            where: { id: req.params.id }
        }).then(() => {
            return res.status(200).json({ message: 'Vehicle deleted successfully' });
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = { getVehicles, getVehicle, createVehicle, updateVehicle, deleteVehicle };