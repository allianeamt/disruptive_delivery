const Employee = require('../models/employee');

const getEmployees = async (req, res) => {
    try {
        await Employee.findAll().then(employees => {
            if (employees.length === 0) {
                return res.status(404).send({ error: 'No employees found.' });
            }
            return res.status(200).json(employees);
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getEmployee = async (req, res) => {
    try {
        await Employee.findOne({
            where: { mail: req.params.mail }
        }).then(employee => {
            if (!employee) {
                return res.status(404).send({ error: 'Employee with the given mail address does not exist' });
            }
            return res.status(200).json(employee);
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

function validateEmployeeDataExists(body) {
    if (!body.mail) {
        return 'The mail address is required';
    } else if (!body.password) {
        return 'The password is required';
    } else if (!body.name) {
        return 'The name is required';
    } else if (!body.type) {
        return 'The type is required';
    } else {
        return '';
    }
}

function validateEmployeeData (body) {
    if (body.mail && (body.mail.length == 0 || body.mail.length > 100)) {
        return 'The mail address must be between 1 and 100 characters';
    } else if (body.password && (body.password.length < 4 || body.password.length > 25)) {
        return 'The password must be between 4 and 25 characters';
    } else if (body.name && (body.name.length == 0 || body.name.length > 50)) {
        return 'The name must be between 1 and 50 characters';
    } else if (body.type && body.type !== 1 && body.type !== 2) {
        return 'The type must be between 1 or 2';
    } else {
        return '';
    }
}

const createEmployee = async (req, res) => {
    try {
        let dataExists = validateEmployeeDataExists(req.body);
        if (dataExists != '') {
            return res.status(400).send({error: dataExists});
        }
        let dataCorrect = validateEmployeeData(req.body);
        if (dataCorrect != '') {
            return res.status(400).send({error: dataCorrect});
        }
        const employeeExists = await Employee.findOne({
            where: { mail: req.body.mail }
        });
        if (employeeExists) {
            return res.status(400).send({ error: 'Mail address already in use' });
        }
        await Employee.create({
            mail: req.body.mail,
            password: req.body.password,
            name: req.body.name,
            type: req.body.type
        }).then(employee => {
            return res.status(201).json(employee);
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const updateEmployee = async (req, res) => {
    try {
        let dataCorrect = validateEmployeeData(req.body);
        if (dataCorrect != '') {
            return res.status(400).send({error: dataCorrect});
        }
        const employeeExists = await Employee.findOne({
            where: { mail: req.params.mail }
        });
        if (!employeeExists) {
            return res.status(404).send({ error: 'Employee with the given mail address does not exist' });
        }
        await Employee.update({
            password: req.body.password ?? employeeExists.password,
            name: req.body.name ?? employeeExists.name,
            type: req.body.type ?? employeeExists.type
        }, {
            where: { mail: req.params.mail }
        }).then (() =>{
            return res.status(200).json({ message: 'Employee updated succesfully' });
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const employeeExists = await Employee.findOne({
            where: { mail: req.params.mail }
        });
        if (!employeeExists) {
            return res.status(404).send({ error: 'Employee with the given mail address does not exist' });
        }
        await Employee.destroy({
            where: { mail: req.params.mail }
        }).then (() => {
            return res.status(200).json({ message: 'Employee deleted succesfully' });
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee };