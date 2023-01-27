const Shift = require('../models/shift');

const getShifts = async (req, res) => {
    try {
        await Shift.findAll().then(shifts => {
            if (shifts.length === 0) {
                return res.status(404).send({ error: 'No shifts found' });
            }
            return res.status(200).json(shifts);
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getShift = async (req, res) => {
    try {
        await Shift.findOne({
            where: { id: req.params.id }
        }).then(shift => {
            if (!shift) {
                return res.status(404).send({ error: 'Shift with the given id does not exist' });
            }
            return res.status(200).json(shift);
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = { getShifts, getShift };