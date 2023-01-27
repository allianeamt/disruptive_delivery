import React from 'react';
import { useHistory } from 'react-router-dom';
import backIcon from '../pictures/back.png';
import editIcon from '../pictures/edit.png';
import deleteIcon from '../pictures/delete.png';
import addIcon from '../pictures/add.png';
import axios from 'axios';

function ShowWarehouses (warehouses) {
    return (
        <div>
                {warehouses.error ? <h1>{warehouses.error}</h1> : <></>}
                <div>
                {warehouses.warehouses.map((warehouse) => (
                    <div key={warehouse.mail}>
                        <li className="textDriver" key={warehouse.id}> Warehouse {warehouse.name} <br></br> DIMENSIONS {warehouse.length} x {warehouse.width} x {warehouse.height} <br></br> ADDRESS: {warehouse.address} <br></br> CITY: {warehouse.city} <br></br> COUNTRY: {warehouse.country}
                        <br></br></li>
                    <img style={{width: 50}} src={deleteIcon} onClick={
                        () => {
                            axios.delete('http://localhost:3000/warehouses/' + warehouse.mail)
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

function getWarehouses (setWarehouses) {
    axios.get('http://localhost:3000/warehouses')
    .then((response) => {
        setWarehouses(response.data);
    }).catch((error) => {
        setWarehouses(error.response.data);
    });
}

function Warehouses () {
    const history = useHistory();
    const [warehouses, setWarehouses] = React.useState([]);

    return (
        <>
        <img src = {backIcon} onClick={ () => {
            history.push('/manager');
        }}></img>
        <center>
        <button className="Button" onClick={
            () => {
                getWarehouses(setWarehouses);
            }}>Get all warehouses</button>
            <button className="Button" onClick={
            () => {
            }}>Add warehouse</button>
        
        <ShowWarehouses warehouses={warehouses}></ShowWarehouses>
        </center>
        </>
    );
}

export default Warehouses;