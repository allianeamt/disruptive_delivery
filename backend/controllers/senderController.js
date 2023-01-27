const Sender = require('../models/sender');

const getSenders = async (req, res) => {
    try {
        await Sender.findAll().then(senders => {
            if (senders.length === 0) {
                return res.status(404).send({ error: 'No senders found' });
            }
            return res.status(200).json(senders);
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getSender = async (req, res) => {
    try {
        await Sender.findOne({
            where: { id: req.params.id }
        }).then(sender => {
            if (!sender) {
                return res.status(404).send({ error: 'Sender with the given id does not exist' });
            }
            return res.status(200).json(sender);
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

function validateSenderDataExists(body) {
    if (!body.name) {
        return 'The name is required';
    } else if (!body.orders_api) {
        return 'The orders_api is required';
    } else if (!body.access_key) {
        return 'The access key is required';
    }
    return '';
};

const createSender = async (req, res) => {
    try {
        let dataExists = validateSenderDataExists(req.body);
        if (dataExists !== '') {
            return res.status(400).send({ error: dataExists });
        }
        await Sender.create({
            name: req.body.name,
            orders_api: req.body.orders_api,
            access_key: req.body.access_key
        }).then(sender => {
            return res.status(201).json(sender);
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const updateSender = async (req, res) => {
    try {
        let dataExists = validateSenderDataExists(req.body);
        if (dataExists !== '') {
            return res.status(400).send({ error: dataExists });
        }
        const senderExists = await Sender.findOne({
            where: { id: req.params.id }
        });
        if (!senderExists) {
            return res.status(404).send({ error: 'Sender with the given id does not exist' });
        }
        await Sender.update({
            name: req.body.name,
            orders_api: req.body.orders_api,
            access_key: req.body.access_key
        }, {
            where: { id: req.params.id }
        }).then(() => {
            return res.status(200).json({ message: 'Sender updated successfully' });
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const deleteSender = async (req, res) => {
    try {
        const senderExists = await Sender.findOne({
            where: { id: req.params.id }
        });
        if (!senderExists) {
            return res.status(404).send({ error: 'Sender with the given id does not exist' });
        }
        await Sender.destroy({
            where: { id: req.params.id }
        }).then(() => {
            return res.status(200).json({ message: 'Sender deleted successfully' });
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = { getSenders, getSender, createSender, updateSender, deleteSender };