const Schedule = require('../models/schedule');
const Driver = require('../models/driver');
const Shift = require('../models/shift');
const Order = require('../models/order');

const getSchedules = async (req, res) => {
    try {
        await Schedule.findAll().then(schedules => {
            if (schedules.length === 0) {
                return res.status(404).send({ error: 'No schedules found' });
            }
            return res.status(200).json(schedules);
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getSchedule = async (req, res) => {
    try {
        await Schedule.findOne({
            where: { id: req.params.id }
        }).then(schedule => {
            if (!schedule) {
                return res.status(404).send({ error: 'Schedule with the given id does not exist' });
            }
            return res.status(200).json(schedule);
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

function validateScheduleDataExists (body) {
    if (!body.driver_mail) {
        return 'The mail address of the driver is required';
    } else if (!body.order_code) {
        return 'The order code is required';
    } else if (!body.shift_id) {
        return 'The shift id is required';
    } else if (!body.date) {
        return 'The date is required';
    } else if (!body.pickup_city) {
        return 'The pickup city is required';
    } else if (!body.delivery_city) {
        return 'The delivery city is required';
    } else if (!body.type) {
        return 'The type is required';
    }
    return '';
}

function validateScheduleData (body) {
    if (body.pickup_city && (body.pickup_city.length < 0 || body.pickup_city.length > 50)) {
        return 'The pickup city must be between 0 and 50 characters';
    } else if (body.delivery_city && (body.delivery_city.length < 0 || body.delivery_city.length > 50)) {
        return 'The delivery city must be between 0 and 50 characters';
    } else if (body.type && (body.type.length < 1 || body.type.length > 3)) {     
        return 'The type must be 1 - direct delivery, 2 to the warehouse or 3 - from the warehouse';
    }
    return '';
}

const createSchedule = async (req, res) => {
    try {
        let dataExists = validateScheduleDataExists(req.body);
        let dataCorrect = validateScheduleData(req.body);
        if (dataExists != '') {
            return res.status(400).send({ error: dataExists });
        }
        if (dataCorrect != '') {
            return res.status(400).send({ error: dataCorrect });
        }
        const driverExists = await Driver.findOne({
            where: { mail: req.body.driver_mail }
        });
        if (!driverExists) {
            return res.status(404).send({ error: 'Driver with the given mail address does not exist' });
        }
        const orderExists = await Order.findOne({
            where: { code: req.body.order_code }
        });
        if (!orderExists) {
            return res.status(404).send({ error: 'Order with the given code does not exist' });
        }
        const shiftExists = await Shift.findOne({
            where: { id: req.body.shift_id }
        });
        if (!shiftExists) {
            return res.status(404).send({ error: 'Shift with the given id does not exist' });
        }
        await Schedule.create({
            driver_mail: req.body.driver_mail,
            order_code: req.body.order_code,
            shift_id: req.body.shift_id,
            date: req.body.date,
            pickup_city: req.body.pickup_city,
            delivery_city: req.body.delivery_city,
            type: req.body.type,
        }).then (schedule => {
            return res.status(201).json({ schedule });
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateSchedule = async (req, res) => {
    try {
        let dataCorrect = validateScheduleData(req.body);
        if (dataCorrect != '') {
            return res.status(400).send({ error: dataCorrect });
        }
        const scheduleExists = await Schedule.findOne({
            where: { id: req.params.id }
        });
        if (!scheduleExists) {
            return res.status(404).send({ error: 'Schedule with the given id does not exist' });
        }
        const driverExists = await Driver.findOne({
            where: { mail: req.body.driver_mail }
        });
        if (!driverExists) {
            return res.status(404).send({ error: 'Driver with the given mail address does not exist' });
        }
        const orderExists = await Order.findOne({
            where: { code: req.body.order_code }
        });
        if (!orderExists) {
            return res.status(404).send({ error: 'Order with the given code does not exist' });
        }
        const shiftExists = await Shift.findOne({
            where: { id: req.body.shift_id }
        });
        if (!shiftExists) {
            return res.status(404).send({ error: 'Shift with the given id does not exist' });
        }
        await Schedule.update({
            driver_mail: req.body.driver_mail ?? scheduleExists.driver_mail,
            order_code: req.body.order_code ?? scheduleExists.order_code,
            shift_id: req.body.shift_id ?? scheduleExists.shift_id,
            date: req.body.date ?? scheduleExists.date,
            pickup_city: req.body.pickup_city ?? scheduleExists.pickup_city,
            delivery_city: req.body.delivery_city ?? scheduleExists.delivery_city,
            type: req.body.type ?? scheduleExists.type,
        }, {
            where: { id: req.params.id }
        }).then (() => {
            return res.status(200).json({ message: 'Schedule updated succesfully' });
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteSchedule = async (req, res) => {
    try {
        const scheduleExists = await Schedule.findOne({
            where: { id: req.params.id }
        });
        if (!scheduleExists) {
            return res.status(404).send({ error: 'Schedule with the given id does not exist' });
        }
        await Schedule.destroy({
            where: { id: req.params.id }
        }).then (() => {
            return res.status(200).json({ message: 'Schedule deleted succesfully' });
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { getSchedules, getSchedule, createSchedule, updateSchedule, deleteSchedule };

