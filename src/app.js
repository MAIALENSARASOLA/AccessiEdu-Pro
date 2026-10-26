import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { tasksApi, getErrorMessage } from './api';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateTask from './pages/CreateTask';
import TaskDetail from './pages/TaskDetail';
import PrintTask from './pages/PrintTask';

export default class App extends Component {
  state = {
    tasks: [],
    loading: true,
    loadError: ''
  };

  componentDidMount() {
    this.loadTasks();
  }

  loadTasks = () => {
    this.setState({ loading: true, loadError: '' });
    tasksApi.getAll()
      .then((response) => {
        this.setState({ tasks: response.data, loading: false });
      })
      .catch((error) => {
        console.error('Error al cargar las tareas:', error);
        this.setState({
          loading: false,
          loadError: 'No se han podido cargar las tareas. Comprueba tu conexión y vuelve a intentarlo.'
        });
      });
  };

  // Crear: devuelve una promesa para que el formulario sepa si ha ido bien
  handleCreateTask = (newTask) => {
    return tasksApi.create(newTask)
      .then((response) => {
        this.setState((prevState) => ({ tasks: [...prevState.tasks, response.data] }));
        return response.data;
      })
      .catch((error) => {
        throw getErrorMessage(error, 'No se ha podido crear la tarea.');
      });
  };

  handleUpdateTask = (id, changes) => {
    return tasksApi.update(id, changes)
      .then((response) => {
        this.setState((prevState) => ({
          tasks: prevState.tasks.map((task) => (task.id === id ? response.data : task))
        }));
        return response.data;
      })
      .catch((error) => {
        throw getErrorMessage(error, 'No se han podido guardar los cambios.');
      });
  };

  // Borrar: pide confirmación antes. Devuelve una promesa con true si se ha borrado.
  handleDeleteTask = (task) => {
    const confirmed = window.confirm(
      `¿Seguro que quieres eliminar la tarea "${task.title}"? También se eliminarán sus adaptaciones.`
    );
    if (!confirmed) {
      return Promise.resolve(false);
    }

    return tasksApi.remove(task.id)
      .then(() => {
        this.setState((prevState) => ({
          tasks: prevState.tasks.filter((t) => t.id !== task.id)
        }));
        return true;
      })
      .catch((error) => {
        console.error('Error al eliminar la tarea:', error);
        window.alert('No se ha podido eliminar la tarea. Inténtalo de nuevo.');
        return false;
      });
  };

  render() {
    const { tasks, loading, loadError } = this.state;

    return (
      <Router>
        <NavBar />

        <main className="app" id="main" tabIndex="-1">
          <Switch>
            <Route exact path="/" component={Home} />

            <Route
              path="/dashboard"
              render={(routeProps) => (
                <Dashboard
                  {...routeProps}
                  tasks={tasks}
                  loading={loading}
                  loadError={loadError}
                  onRetry={this.loadTasks}
                  onDeleteTask={this.handleDeleteTask}
                />
              )}
            />

            <Route
              path="/create"
              render={(routeProps) => (
                <CreateTask
                  {...routeProps}
                  onSubmit={this.handleCreateTask}
                  isEditing={false}
                />
              )}
            />

            <Route
              path="/tasks/:id/edit"
              render={(routeProps) => {
                const id = Number(routeProps.match.params.id);
                const taskToEdit = tasks.find((task) => task.id === id);

                if (!taskToEdit) {
                  return (
                    <div className="page">
                      {loading
                        ? <p className="status-message" role="status">Cargando la tarea…</p>
                        : <p className="form-error" role="alert">Esta tarea no existe.</p>}
                    </div>
                  );
                }

                return (
                  <CreateTask
                    {...routeProps}
                    taskToEdit={taskToEdit}
                    isEditing={true}
                    onSubmit={(changes) => this.handleUpdateTask(id, changes)}
                  />
                );
              }}
            />

            <Route path="/tasks/:id/print" component={PrintTask} />

            <Route
              path="/tasks/:id"
              render={(routeProps) => (
                <TaskDetail {...routeProps} onDeleteTask={this.handleDeleteTask} />
              )}
            />

            <Route
              render={() => (
                <div className="page">
                  <h1>Página no encontrada</h1>
                  <Link to="/" className="btn btn--primary">Ir al inicio</Link>
                </div>
              )}
            />
          </Switch>
        </main>
      </Router>
    );
  }
}
