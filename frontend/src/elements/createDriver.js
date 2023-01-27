import { useHistory } from 'react-router-dom';
import axios from 'axios';
import backIcon from '../pictures/back.png';
const React = require('react');

function CreateDriver () {
    const history = useHistory();
    const [name, setName] = React.useState('');
    const [mail, setMail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [city, setCity] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [error, setError] = React.useState('');

    return (
        <>
        <img src = {backIcon} onClick={ () => {
            history.push('/manager');
        }}></img>
        <center>
        <div className="form">
            <h1>CREATE DRIVER</h1>
            <div><input type="text" className="field" placeholder="Name" onChange={(event) => {
                setName(event.target.value);
            }}></input></div>
            <div><input type="text" className="field" placeholder="Mail" onChange={(event) => {
                setMail(event.target.value);
            }}></input></div>
            <div><input type="text" className="field" placeholder="Password" onChange={(event) => {
                setPassword(event.target.value);
            }}></input></div>
            <div><input type="text" className="field" placeholder="Company" onChange={(event) => {
                setCompany(event.target.value);
            }}></input></div>
            <div><input type="text" className="field" placeholder="City" onChange={(event) => {
                setCity(event.target.value);
            }}></input></div>
            <div><input type="text" className="field" placeholder="Country" onChange={(event) => {
                setCountry(event.target.value);
            }}></input></div><br></br><br></br>
            <button className="Button" onClick={
                () => {
                    axios.post('http://localhost:3000/drivers', {
                        name: name,
                        mail: mail,
                        password: password,
                        company: company,
                        city: city,
                        country: country
                    }).then(() => {
                        history.push('/drivers');
                    }).catch((error) => {
                        setError(error.response.data.error);
                    });
                }
            }>CREATE</button>
        <h3>{error}</h3>
        </div>
        </center>
        </>
    );
}

export default CreateDriver;