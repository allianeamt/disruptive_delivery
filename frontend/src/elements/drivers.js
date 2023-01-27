import axios from 'axios';
const React = require('react');
const { useHistory } = require('react-router-dom');
const backIcon = require('../pictures/back.png');
const editIcon = require('../pictures/edit.png');
const deleteIcon = require('../pictures/delete.png');
const addIcon = require('../pictures/add.png');

function ShowDrivers (drivers) {
    return (
    <div>
            {drivers.error ? <h1>{drivers.error}</h1> : <></>}
            <div>
            {drivers.drivers.map((driver) => (
                <div key={driver.mail}>
                    <li className="textDriver" >{driver.name} <br></br> MAIL: {driver.mail} <br></br> PASSWORD: {driver.password} <br></br> COMPANY: {driver.company} <br></br> CITY: {driver.city} <br></br> COUNTRY: {driver.country} 
                    <br></br></li>
                    <img style={{width: 50}} src={deleteIcon} onClick={
                        () => {
                            axios.delete('http://localhost:3000/drivers/' + driver.mail)
                            .then(() => {
                                window.location.reload(false);
                            }).catch((error) => {
                                console.log(error.response.data);
                            });
                            
                        }}></img>
                    <img style={{width: 50}} src={editIcon} onClick={
                        () => {
                    }}></img>

                </div>
            )
            )}
            </div>
    </div>
    );
}

function getDrivers (setDrivers) {
    axios.get('http://localhost:3000/drivers')
    .then((response) => {
        setDrivers(response.data);
    }).catch((error) => {
        setDrivers(error.response.data);
    });
}



function Drivers () {
    const history = useHistory();
    const [drivers, setDrivers] = React.useState([]);


    return (
        <>
        <img src = {backIcon} onClick={ () => {
            history.push('/manager');
        }}></img>
        <center>
        <button className="Button" onClick={
            () => {
                getDrivers(setDrivers);
            }}>Get all drivers</button>
        <button className="Button" onClick={
            () => {
                history.push('/createDriver');
            }}>Add driver</button>
        
        <ShowDrivers drivers={drivers}></ShowDrivers>
        </center>
        </>
    );
}

export default Drivers;