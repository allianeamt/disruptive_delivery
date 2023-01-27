const Order = require('../models/order');

const getOrders = async (req, res) => {
    try {
        await Order.findAll().then(orders => {
            if (orders.length === 0) {
                return res.status(404).send({ error: 'No orders found' });
            }
            return res.status(200).json(orders);
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getOrder = async (req, res) => {
    try {
        await Order.findOne({
            where: { code: req.params.code }
        }).then(order => {
            if (!order) {
                return res.status(404).send({ error: 'Order with the given code does not exist' });
            }
            return res.status(200).json(order);
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

function validateOrderDataExists(body) {
    if (!body.send_date) {
        return 'The send date is required';
    } else if (!body.delivery_date) {
        return 'The delivery date is required';
    } else if (!body.length) { 
        return 'The length is required';
    } else if (!body.width) {
        return 'The width is required';
    } else if (!body.height) {
        return 'The height is required';
    } else if (!body.sender_name) {
        return 'The sender name is required';
    } else if (!body.sender_address) {
        return 'The sender address is required';
    } else if (!body.sender_zipcode) {
        return 'The sender zipcode is required';
    } else if (!body.sender_city) {
        return 'The sender city is required';
    } else if (!body.sender_country) {
        return 'The sender country is required';
    } else if (!body.receiver_name) {
        return 'The receiver name is required';
    } else if (!body.receiver_address) {
        return 'The receiver address is required';
    } else if (!body.receiver_zipcode) {
        return 'The receiver zipcode is required';
    } else if (!body.receiver_city) {
        return 'The receiver city is required';
    } else if (!body.receiver_country) {
        return 'The receiver country is required';
    } else if (!body.original_id) {
        return 'The original id is required';
    } else if (!body.state) {
        return 'The state is required';
    } else if (!body.price) {
        return 'The price is required';
    }
    return '';
}

function validateOrderData (body) {
    if (body.length && (body.length < 0 || body.length > 100)) {
        return 'The length must be between 0 and 100';
    } else if (body.width && (body.width < 0 || body.width > 100)) {
        return 'The width must be between 0 and 100';
    } else if (body.height && (body.height < 0 || body.height > 100)) {
        return 'The height must be between 0 and 100';
    } else if (body.fragility && (body.fragility != 0 && body.fragility != 1)) {
        return 'The fragility must be 0 or 1';
    } else if (body.sender_name && (body.sender_name.length == 0 || body.sender_name.length > 50)) {
        return 'The sender name must be between 1 and 50 characters';
    } else if (body.sender_address && (body.sender_address.length == 0 || body.sender_address.length > 100)) {
        return 'The sender address must be between 1 and 100 characters';
    } else if (body.sender_zipcode && (body.sender_zipcode.length == 0 || body.sender_zipcode.length > 50)) {
        return 'The sender zipcode must be between 1 and 50 characters';
    } else if (body.sender_city && (body.sender_city.length == 0 || body.sender_city.length > 50)) {
        return 'The sender city must be between 1 and 50 characters';
    } else if (body.sender_country && (body.sender_country.length == 0 || body.sender_country.length > 50)) {
        return 'The sender country must be between 1 and 50 characters';
    } else if (body.receiver_name && (body.receiver_name.length == 0 || body.receiver_name.length > 50)) {
        return 'The receiver name must be between 1 and 50 characters';
    } else if (body.receiver_address && (body.receiver_address.length == 0 || body.receiver_address.length > 100)) {
        return 'The receiver address must be between 1 and 100 characters';
    } else if (body.receiver_zipcode && (body.receiver_zipcode.length == 0 || body.receiver_zipcode.length > 50)) {
        return 'The receiver zipcode must be between 1 and 50 characters';
    } else if (body.receiver_city && (body.receiver_city.length == 0 || body.receiver_city.length > 50)) {
        return 'The receiver city must be between 1 and 50 characters';
    } else if (body.receiver_country && (body.receiver_country.length == 0 || body.receiver_country.length > 50)) {
        return 'The receiver country must be between 1 and 50 characters';
    } else if (body.state && (body.state.length < 0 || body.state.length > 4)) {
        return 'The state must be 0 - in the system, 1 - picked up, 2 - in waiting, 3 - on the way, 4 - delivered';
    }
    return '';
};

function createRandomCode () {
    let x = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    let y = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    let z = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return ((x + y + z).substring(0, 12));
}

const createOrder = async (req, res) => {
    try {
        let dataExists = validateOrderDataExists(req.body);
        let dataCorrect = validateOrderData(req.body);
        if (dataExists != '') {
            return res.status(400).send({ error: dataExists });
        }
        if (dataCorrect != '') {
            return res.status(400).send({ error: dataCorrect });
        }
        let newCode = '';
        while (true) {
            newCode = createRandomCode();
            let orderExists = await Order.findOne({
                where: {
                    code: newCode
                }
            });
            if (!orderExists) {
                break;
            }
        }
        await Order.create({
            code: newCode,
            send_date: req.body.send_date,
            delivery_date: req.body.delivery_date,
            length: req.body.length,
            width: req.body.width,
            height: req.body.height,
            fragility: req.body.fragility ?? 0,
            sender_name: req.body.sender_name,
            sender_address: req.body.sender_address,
            sender_zipcode: req.body.sender_zipcode,
            sender_city: req.body.sender_city,
            sender_country: req.body.sender_country,
            receiver_name: req.body.receiver_name,
            receiver_address: req.body.receiver_address,
            receiver_zipcode: req.body.receiver_zipcode,
            receiver_city: req.body.receiver_city,
            receiver_country: req.body.receiver_country,
            original_id: req.body.original_id,
            state: req.body.state,
            price: req.body.price
        }).then (order => {
            return res.status(200).send(order);
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const updateOrder = async (req, res) => {
    try {
        let dataCorrect = validateOrderData(req.body);
        if (dataCorrect != '') {
            return res.status(400).send({ error: dataCorrect });
        }
        let orderExists = await Order.findOne({
            where: { code: req.params.code }
        });
        if (!orderExists) {
            return res.status(404).send({ error: 'Order with the given code not found' });
        }
        await Order.update({
            code: orderExists.code,
            send_date: req.body.send_date ?? orderExists.send_date,
            delivery_date: req.body.delivery_date ?? orderExists.delivery_date,
            length: req.body.length ?? orderExists.length,
            width: req.body.width ?? orderExists.width,
            height: req.body.height ?? orderExists.height,
            fragility: req.body.fragility ?? orderExists.fragility,
            sender_name: req.body.sender_name ?? orderExists.sender_name,
            sender_address: req.body.sender_address ?? orderExists.sender_address,
            sender_zipcode: req.body.sender_zipcode ?? orderExists.sender_zipcode,
            sender_city: req.body.sender_city ?? orderExists.sender_city,
            sender_country: req.body.sender_country ?? orderExists.sender_country,
            receiver_name: req.body.receiver_name ?? orderExists.receiver_name,
            receiver_address: req.body.receiver_address ?? orderExists.receiver_address,
            receiver_zipcode: req.body.receiver_zipcode ?? orderExists.receiver_zipcode,
            receiver_city: req.body.receiver_city ?? orderExists.receiver_city,
            receiver_country: req.body.receiver_country ?? orderExists.receiver_country,
            original_id: req.body.original_id ?? orderExists.original_id,
            state: req.body.state ?? orderExists.state,
            price: req.body.price ?? orderExists.price
        }, {
            where: {
                code: req.params.code
            }
        }).then (() => {
            return res.status(200).json({ message: 'Order updated succesfully' });
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const deleteOrder = async (req, res) => {
    try {
        console.log(req.params.code);
        const orderExists = await Order.findOne({
            where: { code: req.params.code }
        });
        if (!orderExists) {
            return res.status(404).send({ error: 'Order with the given code not found' });
        }
        await Order.destroy({
            where: { code: req.params.code }
        }).then (() => {
            return res.status(200).send({ message: 'Order deleted succesfully' });
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = { getOrders, getOrder, createOrder, updateOrder, deleteOrder };