const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');
const employeeController = require('../controllers/employeeController');
const warehouseController = require('../controllers/warehouseController');
const vehicleController = require('../controllers/vehicleController');
const orderController = require('../controllers/orderController');
const scheduleController = require('../controllers/scheduleController');
const shiftController = require('../controllers/shiftController');
const senderController = require('../controllers/senderController');

router.route("/drivers")
    .get((req, res) => {
        driverController.getDrivers(req, res);  
    })
    .post((req, res) => {
        driverController.createDriver(req, res);
    });


router.route("/drivers/:mail")
    .get((req, res) => {
        driverController.getDriver(req, res);
    })
    .put((req, res) => {
        driverController.updateDriver(req, res);
    })
    .delete((req, res) => {
        driverController.deleteDriver(req, res);
    });

router.route("/employees")
    .get((req, res) => {
        employeeController.getEmployees(req, res);
    })
    .post((req, res) => {
        employeeController.createEmployee(req, res);
    });

router.route("/employees/:mail")
    .get((req, res) => {
        employeeController.getEmployee(req, res);
    })
    .put((req, res) => {
        employeeController.updateEmployee(req, res);
    })
    .delete((req, res) => {
        employeeController.deleteEmployee(req, res);
    });

router.route("/warehouses")
    .get((req, res) => {
        warehouseController.getWarehouses(req, res);
    })
    .post((req, res) => {
        warehouseController.createWarehouse(req, res);
    });

router.route("/warehouses/:id")
    .get((req, res) => {
        warehouseController.getWarehouse(req, res);
    })
    .put((req, res) => {
        warehouseController.updateWarehouse(req, res);
    })
    .delete((req, res) => {
        warehouseController.deleteWarehouse(req, res);
    });

router.route("/vehicles")
    .get((req, res) => {
        vehicleController.getVehicles(req, res);
    })
    .post((req, res) => {
        vehicleController.createVehicle(req, res);
    });

router.route("/vehicles/:id")
    .get((req, res) => {
        vehicleController.getVehicle(req, res);
    })
    .put((req, res) => {
        vehicleController.updateVehicle(req, res);
    })
    .delete((req, res) => {
        vehicleController.deleteVehicle(req, res);
    });

router.route("/orders")
    .get((req, res) => {
        orderController.getOrders(req, res);
    })
    .post((req, res) => {
        orderController.createOrder(req, res);
    });

router.route("/orders/:code")
    .get((req, res) => {
        orderController.getOrder(req, res);
    })
    .put((req, res) => {
        orderController.updateOrder(req, res);
    })
    .delete((req, res) => {
        orderController.deleteOrder(req, res);
    });

router.route("/schedules")
    .get((req, res) => {
        scheduleController.getSchedules(req, res);
    })
    .post((req, res) => {
        scheduleController.createSchedule(req, res);
    });

router.route("/schedules/:id")
    .get((req, res) => {
        scheduleController.getSchedule(req, res);
    })
    .put((req, res) => {
        scheduleController.updateSchedule(req, res);
    })
    .delete((req, res) => {
        scheduleController.deleteSchedule(req, res);
    });

router.route("/shifts")
    .get((req, res) => {
        shiftController.getShifts(req, res);
    });

router.route("/shifts/:id")
    .get((req, res) => {
        shiftController.getShift(req, res);
    });

router.route("/senders")
    .get((req, res) => {
        senderController.getSenders(req, res);
    })
    .post((req, res) => {
        senderController.createSender(req, res);
    });

router.route("/senders/:id")
    .get((req, res) => {
        senderController.getSender(req, res);
    })
    .put((req, res) => {
        senderController.updateSender(req, res);
    })
    .delete((req, res) => {
        senderController.deleteSender(req, res);
    });

module.exports = router;