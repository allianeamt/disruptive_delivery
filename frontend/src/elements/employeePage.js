const React = require('react');
const { useHistory } = require('react-router-dom');
const backIcon = require('../pictures/back.png');

function EmployeePage () {
    const history = useHistory(); 
    return (
        <div>
            <h1>Employee Page</h1>
            <img src={backIcon} onClick={ () => {
                history.push('/');
            }}></img>
        </div>
    );
}

export default EmployeePage;