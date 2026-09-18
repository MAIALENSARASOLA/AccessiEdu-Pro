import React, { Component } from 'react';
import axios from 'axios';

const API_URL = 'https://accessiedu-pro-backend.onrender.com';

export default class Dashboard extends Component {
  state = {
    adaptingTaskId: null,
    adaptationType: '',
    adaptationContent: '',
    adaptationsByTask: {}
  };

  toggleAdaptForm = (taskId) => {
    if (this.state.adaptingTaskId === taskId) {
      this.setState({ adaptingTaskId: null, adaptationType: '', adaptationContent: '' });
    } else {
      this.setState({ adaptingTaskId: taskId, adaptationType: '', adaptationContent: '' });
      this.loadAdaptations(taskId);
    }
  };

  loadAdaptations = (taskId) => {
    axios.get(`${API_URL}/tasks/${taskId}/adaptations`)
      .then((response) => {
        this.setState((prevState) => ({
          adaptationsByTask: {
            ...prevState.adaptationsByTask,
            [taskId]: response.data
          }
        }));
      })
      .catch((error) => {
        console.log('Error cargando adaptaciones:', error);
      });
  };

  handleSaveAdaptation = (taskId) => {
    const { adaptationType, adaptationContent } = this.state;

    if (!adaptationType || !adaptationContent) {
      alert('Rellena el tipo y el contenido de la adaptación.');
      return;
    }

    axios.post(`${API_URL}/tasks/${taskId}/adaptations`, {
      type: adaptationType,
      content: adaptationContent
    })
      .then(() => {
        this.setState({ adaptationType: '', adaptationContent: '' });
        this.loadAdaptations(taskId);
      })
      .catch((error) => {
        console.log('Error guardando adaptación:', error);
      });
  };

  render() {
    const tasks = this.props.tasks || [];
    const { adaptingTaskId, adaptationType, adaptationContent, adaptationsByTask } = this.state;

    return (
      <div className="dashboard">
        <h1>Mis tareas</h1>

        <button onClick={() => this.props.history.push('/create')}>
          Nueva tarea
        </button>

        {tasks.map((task) => (
          <div className="task-card" key={task.id}>
            <h2>{task.title}</h2>

            <p><strong>Asignatura:</strong> {task.subject}</p>
            <p><strong>Curso:</strong> {task.course}</p>
            <p><strong>Dificultad:</strong> {task.difficulty}</p>
            <p><strong>Instrucciones:</strong> {task.instructions}</p>

            <button
              aria-label={`Editar ${task.title}`}
              onClick={() => {
                if (this.props.onEditTask) {
                  this.props.onEditTask(task.id);
                }
                this.props.history.push('/create');
              }}
            >
              Editar
            </button>

            <button
              aria-label={`Eliminar ${task.title}`}
              onClick={() => {
                if (this.props.onDeleteTask) {
                  this.props.onDeleteTask(task.id);
                }
              }}
            >
              Eliminar
            </button>

            <button
              aria-label={`Adaptar ${task.title}`}
              onClick={() => this.toggleAdaptForm(task.id)}
            >
              Adaptar
            </button>

            {adaptingTaskId === task.id && (
              <div className="adapt-form">
                <h3>Adaptaciones de esta tarea</h3>

                {(adaptationsByTask[task.id] || []).map((adapt) => (
                  <div key={adapt.id} className="adaptation-item">
                    <strong>{adapt.type}:</strong> {adapt.content}
                  </div>
                ))}

                <label htmlFor={`type-${task.id}`}>Tipo de adaptación</label>
                <select
                  id={`type-${task.id}`}
                  value={adaptationType}
                  onChange={(e) => this.setState({ adaptationType: e.target.value })}
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="Lectura simplificada">Lectura simplificada</option>
                  <option value="Instrucciones paso a paso">Instrucciones paso a paso</option>
                  <option value="Menos ejercicios">Menos ejercicios</option>
                  <option value="Apoyo visual">Apoyo visual</option>
                </select>

                <label htmlFor={`content-${task.id}`}>Contenido de la adaptación</label>
                <textarea
                  id={`content-${task.id}`}
                  placeholder="Escribe aquí la versión adaptada"
                  value={adaptationContent}
                  onChange={(e) => this.setState({ adaptationContent: e.target.value })}
                />

                <button onClick={() => this.handleSaveAdaptation(task.id)}>
                  Guardar adaptación
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}