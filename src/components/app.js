import React, { Component } from 'react';
import Home from '../pages/home';
import Dashboard from '../pages/dashboard';

export default class App extends Component {
  render() {
    return (
     <div className='app'>
  <Home />
  <Dashboard />
</div>
    );
  }
}