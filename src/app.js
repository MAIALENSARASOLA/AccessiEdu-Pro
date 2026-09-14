import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateTask from './pages/CreateTask';

const API_URL = 'https://accessiedu-pro-backend.onrender.com/tasks';

export default class App extends Component {
  state = {
    tasks: [],
    editingId: null
  };

  componentDidMount() {
    axios.get(API_URL)
      .then(response => {
        this.setState({ tasks: response.data });
      })
      .catch(error => {
        console.error('Error al cargar las tareas:', error);
      });
  }

  handleCreateTask = (newTask) => {
    if (this.state.editingId !== null) {
      axios.put(`${API_URL}/${this.state.editingId}`, newTask)
        .then(response => {
          const updatedTasks = this.state.tasks.map(task =>
            task.id === this.state.editingId ? response.data : task
          );
          this.setState({ tasks: updatedTasks, editingId: null });
        })
        .catch(error => {
          console.error('Error al actualizar la tarea:', error);
        });
    } else {
      axios.post(API_URL, newTask)
        .then(response => {
          this.setState({ tasks: [...this.state.tasks, response.data] });
        })
        .catch(error => {
          console.error('Error al crear la tarea:', error);
        });
    }
  };

  handleEditTask = (id) => {
    this.setState({ editingId: id });
  };

  onDeleteTask = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        const updatedTasks = this.state.tasks.filter(task => task.id !== id);
        this.setState({ tasks: updatedTasks });
      })
      .catch(error => {
        console.error('Error al eliminar la tarea:', error);
      });
  };

  render() {
    const taskToEdit = this.state.editingId !== null
      ? this.state.tasks.find(task => task.id === this.state.editingId)
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
              render={(routeProps) => (
                <Dashboard
                  {...routeProps}
                  tasks={this.state.tasks}
                  onEditTask={this.handleEditTask}
                  onDeleteTask={this.onDeleteTask}
                />
              )}
            />
            <Route
              path='/create'
              render={(routeProps) => (
                <CreateTask
                  {...routeProps}
                  onCreateTask={this.handleCreateTask}
                  taskToEdit={taskToEdit}
                  isEditing={this.state.editingId !== null}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}