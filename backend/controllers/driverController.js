const Driver = require('../models/driver');

const getDrivers = async (req, res) => {
    try {
        await Driver.findAll().then(drivers => {
            if (drivers.length === 0) {
                return res.status(404).send({ error: 'No drivers found' });
            }
            return res.status(200).json(drivers);
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getDriver = async (req, res) => {
    try {
        await Driver.findOne({
            where: { mail: req.params.mail }
        }).then(driver => {
            if (!driver) {
                return res.status(404).send({ error: 'Driver with the given mail address does not exist' });
            }
            return res.status(200).json(driver);
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

function validateDriverDataExists(body) {
    if (!body.mail) {
        return 'The mail address is required';
    } else if (!body.password) {
        return 'The password is required';
    } else if (!body.name) {
        return 'The name is required';
    } else if (!body.company) {
        return 'The company is required';
    } else if (!body.city) {
        return 'The city is required';
    } else if (!body.country) {
        return 'The country is required';
    } else {
        return '';
    }
}

function validateDriverData (body) {
    if (body.mail && (body.mail.length == 0 || body.mail.length > 100)) {
        return 'The mail address must be between 1 and 100 characters';
    } else if (body.password && (body.password.length < 4 || body.password.length > 25)) {
        return 'The password must be between 4 and 25 characters';
    } else if (body.name && (body.name.length == 0 || body.name.length > 100)) {
        return 'The name must be between 1 and 100 characters';
    }  else if (body.company && (body.company.length == 0 || body.company.length > 50)) {
        return 'The company must be between 1 and 50 characters';
    } else if (body.city && (body.city.length == 0 || body.city.length > 50)) {
        return 'The city must be between 1 and 50 characters';
    } else if (body.country && (body.country.length == 0 || body.country.length > 50)) {
        return 'The country must be between 1 and 50 characters';
    } else {
        return '';
    }
}

const createDriver = async (req, res) => {
    try {
        let dataExists = validateDriverDataExists(req.body);
        let dataCorrect = validateDriverData(req.body);
        if (dataExists != '') {
            return res.status(400).json({ error: dataExists });
        }
        if (dataCorrect != '') {
            return res.status(400).json({ error: dataCorrect });
        }
        const driverExists = await Driver.findOne({
            where: { mail: req.body.mail }
        });
        if (driverExists) {
            return res.status(400).json({ error: 'Email address already in use' });
        }
        await Driver.create({
            mail: req.body.mail,
            password: req.body.password,
            name: req.body.name,
            company: req.body.company,
            city: req.body.city,
            country: req.body.country,
        }).then (driver => {
            return res.status(201).json(driver);
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateDriver = async (req, res) => {
    try {
        let dataCorrect = validateDriverData(req.body);
        if (dataCorrect != '') {
            return res.status(400).json({ error: dataCorrect });
        }
        const driverExists = await Driver.findOne({
            where: { mail: req.params.mail }
        });
        if (!driverExists) {
            return res.status(404).json({ error: 'Driver with the given mail address does not exist' });
        }
        await Driver.update({
            password: req.body.password ?? driverExists.password,
            name: req.body.name ?? driverExists.name,
            company: req.body.company ?? driverExists.company,
            city: req.body.city ?? driverExists.city,
            country: req.body.country ?? driverExists.country,
        }, {
            where: { mail: req.params.mail }
        }).then (() => {
            return res.status(200).json({ message: 'Driver updated successfully' });
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteDriver = async (req, res) => {
    try {
        const driverExists = await Driver.findOne({
            where: { mail: req.params.mail }
        });
        if (!driverExists) {
            return res.status(404).json({ error: 'Driver with the given mail address does not exist' });
        }
        await Driver.destroy({
            where: { mail: req.params.mail }
        }).then (() => {
            return res.status(200).json({ message: 'Driver deleted successfully' });
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { getDrivers, getDriver, createDriver, updateDriver, deleteDriver };
