import React, { Component } from 'react';
import Home from '../pages/home';
import Dashboard from '../pages/dashboard';
import CreateTask from '../pages/create-task';

export default class App extends Component {
  state = {
    tasks: [
      {
        title: 'Comprensión lectora',
        subject: 'Lengua',
        course: '4º Primaria',
        difficulty: 'Media',
        instructions: 'Lee el texto y responde a las preguntas de comprensión.'
      },
      {
        title: 'Problemas de matemáticas',
        subject: 'Matemáticas',
        course: '4º Primaria',
        difficulty: 'Fácil',
        instructions: 'Resuelve los problemas mostrando los pasos utilizados.'
      }
    ]
  };

  handleCreateTask = (newTask) => {
    this.setState({
      tasks: [...this.state.tasks, newTask]
    });
  };

  render() {
    return (
      <div className='app'>
        <Home />
        <Dashboard tasks={this.state.tasks} />
        <CreateTask onCreateTask={this.handleCreateTask} />
      </div>
    );
  }
}