const React = require('react');
const { useHistory } = require('react-router-dom');
const backIcon = require('../pictures/back.png');
const driverIcon = require('../pictures/driver.png');
const warehouseIcon = require('../pictures/warehouse.png');
const employeeIcon = require('../pictures/employee.png');

function ManagerPage () {
    const history = useHistory(); 
    return (
        <>
        <div>
            <img src={backIcon}
                onClick={ () => {
                    history.push('/');
                }}></img>
        </div>
        <center>
            <img src={driverIcon} className="pictureColumn"
                onClick={ () => {
                    history.push('/drivers');
                }}
            ></img>
            <img src={warehouseIcon} className="pictureColumn"
            onClick={ () => {
                history.push('/warehouses');
            }}
            ></img>
            <img src={employeeIcon} className="pictureColumn"
            onClick={ () => {
                history.push('/employees');
            }}
            ></img>
        </center>
        </>
    );
}

export default ManagerPage;