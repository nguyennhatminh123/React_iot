import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Devices from './pages/devices';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div class='content'>
      {/* <Route render={(props) =>
        <Devices {...props} />  
      }>


      </Route> */}
        <Devices />
      </div>
    );
  }
}

export default App;
