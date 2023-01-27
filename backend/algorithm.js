const request = require('request');
const { Op } = require('sequelize');
const Vehicle = require('./models/vehicle');
const Warehouse = require('./models/warehouse');
const Driver = require('./models/driver');

function startOrderSelecetion () {
    request({
        url: 'https://pasd-webshop-api.onrender.com/api/order/',
        headers: {
            'x-api-key': '6AfqjvbgGpQmvffEeNHU'
        },
        method: 'GET',
        json: true
    } , (error, response, body) => {
        if (error) {
            console.log(error);
        } else {
            body.orders.forEach(element => {
                orderCheck(element);
            });
        }
    });

};

async function orderCheck (order) {
    if (order.sender_info.city === order.receiver_info.city) {
        console.log('if');
        const possibleVehiclesDimensions = await Vehicle.findAll({
            where: {
                height: { [Op.gte]: order.z_in_mm/1000 },
                length: { [Op.gte]: order.x_in_mm/1000 },
                width: { [Op.gte]: order.y_in_mm/1000 },
            }
        })
        if (possibleVehiclesDimensions.length === 0) {
            console.log('No appropriate vehicles found');
            return 'No appropriate vehicles found';
        }
        let possibleVehicles = [];
        possibleVehiclesDimensions.forEach(async vehicle => {
            const possibleDrivers = await Driver.findAll({
                where: {
                    mail: vehicle.driver_mail,
                    city: order.receiver_info.city
                }
            });
            if (possibleDrivers.length !== 0) {
                possibleVehicles.push(vehicle);
            }
        });

        if (possibleVehicles.length === 0) {
            console.log('No appropriate vehicles found');
            return 'No appropriate vehicles found';
        } else {
            oneDayDelivery(order, possibleVehicles);
        }
    } else {
        const possibleVehiclesSenderCityDimensions = await Vehicle.findAll({
            where: {
                height: { [Op.gte]: order.z_in_mm/1000 },
                length: { [Op.gte]: order.x_in_mm/1000 },
                width: { [Op.gte]: order.y_in_mm/1000 }
            }
        });
        const possibleVehiclesReceiverCityDimensions = await Vehicle.findAll({
            where: {
                height: { [Op.gte]: order.z_in_mm/1000 },
                length: { [Op.gte]: order.x_in_mm/1000 },
                width: { [Op.gte]: order.y_in_mm/1000 }
            }
        });
        if (possibleVehiclesSenderCityDimensions.length === 0 && possibleVehiclesReceiverCity.lengthDimensions === 0) {
            console.log('No appropriate vehicles found in neither sender nor receiver city');
            return 'No appropriate vehicles found in neither sender nor receiver city';
        }
        let possibleVehiclesReceiverCity = [];
        possibleVehiclesReceiverCityDimensions.forEach(async vehicle => {
            const possibleDrivers = await Driver.findAll({
                where: {
                    mail: vehicle.driver_mail,
                    city: order.receiver_info.city
                }
            });
            if (possibleDrivers.length !== 0) {
                possibleVehiclesReceiverCity.push(vehicle);
            }
        });

        let possibleVehiclesSenderCity = [];
        possibleVehiclesSenderCityDimensions.forEach(async vehicle => {
            const possibleDrivers = await Driver.findAll({
                where: {
                    mail: vehicle.driver_mail,
                    city: order.sender_info.city
                }
            });
            if (possibleDrivers.length !== 0) {
                possibleVehiclesSenderCity.push(vehicle);
            }
        });
        console.log(possibleVehiclesReceiverCity.length, possibleVehiclesSenderCity.length);
        if (possibleVehiclesReceiverCity.length === 0 && possibleVehiclesSenderCity.length === 0) {
            console.log('No appropriate vehicles found in neither sender nor receiver city');
            return 'No appropriate vehicles found in neither sender nor receiver city';
        } else {
            const possibleWarehouses = await Warehouse.findAll({
                where: {
                    height: { [Op.gte]: order.z_in_mm/1000 },
                    length: { [Op.gte]: order.x_in_mm/1000 },
                    width: { [Op.gte]: order.y_in_mm/1000 },
                    city: order.receiver_info.city
                }
            });
            if (possibleWarehouses.length === 0) {
                console.log('No appropriate warehouses found in receiver city');
                return 'No appropriate warehouses found in receiver city';
            } else {
                const possibleVehicles = possibleVehiclesSenderCity.concat(possibleVehiclesReceiverCity);
                multipleDayDelivery(order, possibleVehicles, possibleWarehouses);
            }

        }
    }
}

async function oneDayDelivery (order, possibleVehicles) {
    console.log("hello one day delivery");
}

async function multipleDayDelivery (order, possibleVehicles, possibleWarehouses) {
    console.log("hello multiple day delivery");
}

startOrderSelecetion();