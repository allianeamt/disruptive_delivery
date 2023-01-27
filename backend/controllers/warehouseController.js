const Warehouse = require('../models/warehouse');

const getWarehouses = async (req, res) => {
    try {
        await Warehouse.findAll().then(warehouses => {
            if (warehouses.length === 0) {
                return res.status(404).send({ error: 'No warehouses found' });
            }
            return res.status(200).json(warehouses);
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getWarehouse = async (req, res) => {
    try {
        await Warehouse.findOne({
            where: { id: req.params.id }
        }).then(warehouse => {
            if (!warehouse) {
                return res.status(404).send({ error: 'Warehouse with the given id does not exist' });
            }
            return res.status(200).json(warehouse);
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

function validateWarehouseDataExists(body) {
    if (!body.name) {
        return 'The name is required';
    } else if (!body.height) {
        return 'The height is required';
    } else if (!body.length) {
        return 'The length is required';
    } else if (!body.width) {
        return 'The width is required';
    } else if (!body.address) {
        return 'The address is required';
    } else if (!body.city) {
        return 'The city is required';
    } else if (!body.country) {
        return 'The country is required';
    } else if (!body.zipcode) {
        return 'The zipcode is required';
    } else {
        return '';
    }
}

function validateWarehouseData (body) {
    if (body.name && (body.name.length == 0 || body.name.length > 100)) {
        return 'The name must be between 1 and 100 characters';
    } else if (body.height && (body.height < 0 || body.height > 100)) {
        return 'The height must be between 0 and 100';
    } else if (body.length && (body.length < 0 || body.length > 100)) {
        return 'The length must be between 0 and 100';
    } else if (body.width && (body.width < 0 || body.width > 100)) {
        return 'The width must be between 0 and 100';
    }  else if (body.address && (body.address.length == 0 || body.address.length > 100)) {
        return 'The address must be between 1 and 100 characters';
    } else if (body.city && (body.city.length == 0 || body.city.length > 50)) {
        return 'The city name must be between 1 and 50 characters';
    } else if (body.country && (body.country.length == 0 || body.country.length > 50)) {
        return 'The country name must be between 1 and 50 characters';
    } else if (body.zipcode && (body.zipcode.length == 0 || body.zipcode.length > 50)) {
        return 'The zipcode must be between 1 and 50 characters';
    } else {
        return '';
    }
}

const createWarehouse = async (req, res) => {
    try {
        let dataExists = validateWarehouseDataExists(req.body);
        let dataCorrect = validateWarehouseData(req.body);
        if (dataExists !== '') {
            return res.status(400).send({ error: dataExists });
        }
        if (dataCorrect !== '') {
            return res.status(400).send({ error: dataCorrect });
        }
        await Warehouse.create({
            name: req.body.name,
            height: req.body.height,
            length: req.body.length,
            width: req.body.width,
            occupied_capacity: 0,
            address: req.body.address,
            city: req.body.city,
            country: req.body.country,
            zipcode: req.body.zipcode
        }).then(warehouse => {
            return res.status(201).json(warehouse);
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const updateWarehouse = async (req, res) => {
    try {
        let dataCorrect = validateWarehouseData(req.body);
        if (dataCorrect !== '') {
            return res.status(400).send({ error: dataCorrect });
        }
        const warehouseExists = await Warehouse.findOne({
            where: { id: req.params.id }
        });
        if (!warehouseExists) {
            return res.status(404).send('Warehouse with the given id does not exist');
        }
        await Warehouse.update({
            name: req.body.name ?? warehouseExists.name,
            height: req.body.height ?? warehouseExists.height,
            length: req.body.length ?? warehouseExists.length,
            width: req.body.width ?? warehouseExists.width,
            occupied_capacity: req.body.occupied_capacity ?? warehouseExists.occupied_capacity,
            address: req.body.address ?? warehouseExists.address,
            city: req.body.city ?? warehouseExists.city,
            country: req.body.country ?? warehouseExists.country,
            zipcode: req.body.zipcode ?? warehouseExists.zipcode
        }, {
            where: { id: req.params.id }
        }).then(() => {
            return res.status(200).json({ message: 'Warehouse updated successfully' });
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const deleteWarehouse = async (req, res) => {
    try {
        const warehouseExists = await Warehouse.findOne({
            where: { id: req.params.id }
        });
        if (!warehouseExists) {
            return res.status(404).send('Warehouse with the given id does not exist');
        }
        await Warehouse.destroy({
            where: { id: req.params.id }
        }).then(() => {
            return res.status(200).json({ message: 'Warehouse deleted successfully' });
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = { getWarehouses, getWarehouse, createWarehouse, updateWarehouse, deleteWarehouse };