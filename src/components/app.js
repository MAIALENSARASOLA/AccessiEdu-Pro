import React, { Component } from 'react';
import Home from '../pages/home';
import Dashboard from '../pages/dashboard';
import CreateTask from '../pages/create-task';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Home />
        <Dashboard />
        <CreateTask />
      </div>
    );
  }
}
