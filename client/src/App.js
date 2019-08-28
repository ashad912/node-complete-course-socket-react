import React from 'react';
import logo from './logo.svg';
import './App.css';
import Ninjas from './components/Ninjas'
import {BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Ninjas} />
        </Switch>
      </div>
    </BrowserRouter>
      
  
  );
}

export default App;

{/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/}