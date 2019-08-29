import React from 'react';
import './App.css';
import Ninjas from './components/Ninjas'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Profile from './components/Profile'
import Login from './components/Login'
import withAuth from "./hoc/WithAuth"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Ninjas} />
          <Route path="/me" component={withAuth(Profile)} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
      
  
  );
}

export default App;
