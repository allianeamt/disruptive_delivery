import React from 'react';
import { useHistory } from 'react-router-dom';
import backIcon from '../pictures/back.png';
import editIcon from '../pictures/edit.png';
import deleteIcon from '../pictures/delete.png';
import addIcon from '../pictures/add.png';
import axios from 'axios';

function ShowEmployees (employees) {
    return (
        <div>
                {employees.error ? <h1>{employees.error}</h1> : <></>}
                <div>
                {employees.employees.map((employee) => (
                    <div key={employee.mail}>
                        <li className="textDriver"> {employee.name} <br></br> MAIL: {employee.mail} <br></br> PASSWORD: {employee.password}
                        <br></br></li>
                    <img style={{width: 50}} src={deleteIcon} onClick={
                        () => {
                            axios.delete('http://localhost:3000/employees/' + employee.mail)
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

function getEmployees (setEmployees) {
    axios.get('http://localhost:3000/employees')
    .then((response) => {
        setEmployees(response.data);
    }).catch((error) => {
        setEmployees(error.response.data);
    });
}

function Employees () {
    const history = useHistory();
    const [employees, setEmployees] = React.useState([]);

    return (
        <>
        <img src = {backIcon} onClick={ () => {
            history.push('/manager');
        }
        }></img>
        <center>
        <button className="Button" onClick={
            () => {
                getEmployees(setEmployees);
            }}>Get all employees</button>
            <button className="Button" onClick={
            () => {
            }}>Add employee</button>

        <ShowEmployees employees={employees}></ShowEmployees>
        </center>
        </>
    );
}

export default Employees;

