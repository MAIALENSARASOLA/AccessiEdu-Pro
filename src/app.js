import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateTask from './pages/CreateTask';

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
    ],
    editingIndex: null
  };

  handleCreateTask = (newTask) => {
    if (this.state.editingIndex !== null) {
      const updatedTasks = [...this.state.tasks];
      updatedTasks[this.state.editingIndex] = newTask;

      this.setState({
        tasks: updatedTasks,
        editingIndex: null
      });
    } else {
      this.setState({
        tasks: [...this.state.tasks, newTask]
      });
    }
  };

  handleEditTask = (index) => {
    this.setState({
      editingIndex: index
    });
  };

  onDeleteTask = (indexToDelete) => {
    const updatedTasks = this.state.tasks.filter((task, index) => index !== indexToDelete);
    this.setState({ tasks: updatedTasks });
  };

  render() {
    const taskToEdit = this.state.editingIndex !== null
      ? this.state.tasks[this.state.editingIndex]
      : null;

    return (
      <Router>
        <div className='app'>
          <nav style={{ padding: '1rem', background: '#f4f4f4', marginBottom: '1rem' }}>
            <Link to='/' style={{ marginRight: '15px' }}>Inicio</Link>
            <Link to='/dashboard' style={{ marginRight: '15px' }}>Panel (Dashboard)</Link>
            <Link to='/create'>Crear Tarea</Link>
          </nav>

          <Switch>
            <Route
              exact
              path='/'
              render={() => <Home />}
            />
            <Route
              path='/dashboard'
              render={() => (
                <Dashboard
                  tasks={this.state.tasks}
                  onEditTask={this.handleEditTask}
                  onDeleteTask={this.onDeleteTask}
                />
              )}
            />
            <Route
              path='/create'
              render={() => (
                <CreateTask
                  onCreateTask={this.handleCreateTask}
                  taskToEdit={taskToEdit}
                  isEditing={this.state.editingIndex !== null}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}