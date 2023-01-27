import React from 'react';
import { useHistory } from 'react-router-dom';
import backIcon from '../pictures/back.png';
import axios from 'axios';

function handleClick (userName, password, history, setStatus) {
    if (userName == null || password == null) {
        setStatus("Please enter a username and password");
        return;
    }
    axios.get('http://localhost:3000/employees/' + userName)
    .then((response) => {
        if (response.data.password === password) {
            if (response.data.type === 1) {
                history.push('/manager');
            } else {
                history.push('/employee');
            }
        } else {
            setStatus("Incorrect password");
        }
    }).catch((error) => {
        setStatus("Incorrect username");
    });
}

const SignIn = () => {
    const history = useHistory();
    const [userName, setUserName] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [status, setStatus] = React.useState(null);
    return (
        <div>
        <img src={backIcon} onClick={ () => {
        history.push('/');
      }}></img>
        <center>
        <h1 className='Title'>Welcome back!</h1>
        <h2>Log into your account here</h2>
        <br></br><br></br>
        <div><input type="text" placeholder="Username" className="field"
            onChange={(e) => {
                setUserName(e.target.value);
            }}
        ></input></div>
        <br></br>
        <div><input type="password" placeholder="Password" className="field" 
            onChange={(e) => {
                setPassword(e.target.value);
            }}
        ></input></div>
        <br></br><br></br>
        <button className="Button" onClick={ () => {
            handleClick(userName, password, history, setStatus);
        }}>Done</button>
        <h2>{status}</h2>

        </center>
        </div>
    );
}

export default SignIn;
