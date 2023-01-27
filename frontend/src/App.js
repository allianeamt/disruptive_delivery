import React from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';
import './App.css';
import Home from './elements/home';
import TrackOrder from './elements/trackOrder';
import SignIn from './elements/signIn';
import EmployeePage from './elements/employeePage';
import ManagerPage from './elements/managerPage';
import Drivers from './elements/drivers';
import Warehouses from './elements/warehouses';
import Employees from './elements/employees';
import CreateDriver from './elements/createDriver';

function App() {
  const history = useHistory();
  return (
    <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/trackOrder" component={TrackOrder} />
      <Route exact path="/signIn" component={SignIn} />
      <Route exact path="/employee" component={EmployeePage} />
      <Route exact path="/manager" component={ManagerPage} />
      <Route exact path="/drivers" component={Drivers} />
      <Route exact path="/warehouses" component={Warehouses} />
      <Route exact path="/employees" component={Employees} />
      <Route exact path="/createDriver" component={CreateDriver} />
    </Switch>
    </>
  );
};

export default App;
