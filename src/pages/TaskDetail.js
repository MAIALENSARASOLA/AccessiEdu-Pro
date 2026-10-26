import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { tasksApi, adaptationsApi, getErrorMessage, ADAPTATION_TYPES } from '../api';
import AdaptationItem from '../components/AdaptationItem';

// Página de detalle de una tarea: se ve la tarea y todas sus adaptaciones,
// y desde aquí se pueden añadir, editar y borrar adaptaciones.
export default class TaskDetail extends Component {
  state = {
    task: null,
    adaptations: [],
    loading: true,
    loadError: '',
    newType: '',
    newContent: '',
    formError: '',
    message: ''
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadData();
    }
  }

  getTaskId() {
    return this.props.match.params.id;
  }

  loadData = () => {
    const taskId = this.getTaskId();
    this.setState({ loading: true, loadError: '' });

    Promise.all([tasksApi.getOne(taskId), adaptationsApi.getForTask(taskId)])
      .then(([taskResponse, adaptationsResponse]) => {
        this.setState({
          task: taskResponse.data,
          adaptations: adaptationsResponse.data,
          loading: false
        });
      })
      .catch((error) => {
        const notFound = error.response && error.response.status === 404;
        this.setState({
          loading: false,
          loadError: notFound
            ? 'Esta tarea no existe o ya se ha eliminado.'
            : 'No se ha podido cargar la tarea. Inténtalo de nuevo en unos segundos.'
        });
      });
  };

  handleAddAdaptation = (event) => {
    event.preventDefault();
    const type = this.state.newType.trim();
    const content = this.state.newContent.trim();

    if (!type || !content) {
      this.setState({ formError: 'Rellena el tipo y el contenido de la adaptación.' });
      return;
    }

    adaptationsApi.create(this.getTaskId(), { type, content })
      .then((response) => {
        this.setState((prevState) => ({
          adaptations: [...prevState.adaptations, response.data],
          newType: '',
          newContent: '',
          formError: '',
          message: 'Adaptación añadida.'
        }));
      })
      .catch((error) => {
        this.setState({ formError: getErrorMessage(error, 'No se ha podido guardar la adaptación.') });
      });
  };

  // Devuelve una promesa para que AdaptationItem sepa si ha ido bien
  handleUpdateAdaptation = (id, changes) => {
    return adaptationsApi.update(id, changes)
      .then((response) => {
        this.setState((prevState) => ({
          adaptations: prevState.adaptations.map((adapt) => (adapt.id === id ? response.data : adapt)),
          message: 'Adaptación actualizada.'
        }));
      })
      .catch((error) => {
        throw getErrorMessage(error, 'No se ha podido actualizar la adaptación.');
      });
  };

  handleDeleteAdaptation = (adaptation) => {
    if (!window.confirm(`¿Seguro que quieres eliminar la adaptación "${adaptation.type}"?`)) {
      return;
    }

    adaptationsApi.remove(adaptation.id)
      .then(() => {
        this.setState((prevState) => ({
          adaptations: prevState.adaptations.filter((adapt) => adapt.id !== adaptation.id),
          message: 'Adaptación eliminada.'
        }));
      })
      .catch(() => {
        this.setState({ message: 'No se ha podido eliminar la adaptación.' });
      });
  };

  handleDeleteTask = () => {
    this.props.onDeleteTask(this.state.task)
      .then((deleted) => {
        if (deleted) {
          this.props.history.push({ pathname: '/dashboard', state: { message: 'Tarea eliminada.' } });
        }
      });
  };

  render() {
    const { task, adaptations, loading, loadError, newType, newContent, formError, message } = this.state;

    if (loading) {
      return (
        <div className="page task-detail">
          <p className="status-message" role="status">
            Cargando la tarea… (si el servidor estaba dormido, puede tardar hasta un minuto)
          </p>
        </div>
      );
    }

    if (loadError) {
      return (
        <div className="page task-detail">
          <p className="form-error" role="alert">{loadError}</p>
          <Link to="/dashboard" className="btn btn--outline">Volver a mis tareas</Link>
        </div>
      );
    }

    return (
      <div className="page task-detail">
        <Link to="/dashboard" className="back-link">← Volver a mis tareas</Link>

        <article className="task-detail__card">
          <h1>{task.title}</h1>

          <dl className="task-detail__info">
            <div><dt>Asignatura</dt><dd>{task.subject || '—'}</dd></div>
            <div><dt>Curso</dt><dd>{task.course || '—'}</dd></div>
            <div><dt>Dificultad</dt><dd>{task.difficulty || '—'}</dd></div>
          </dl>

          <h2 className="task-detail__subtitle">Instrucciones</h2>
          <p className="task-detail__instructions">{task.instructions || 'Sin instrucciones.'}</p>

          <div className="button-row">
            <button
              type="button"
              className="btn btn--outline"
              onClick={() => this.props.history.push(`/tasks/${task.id}/edit`)}
            >
              Editar tarea
            </button>
            <Link to={`/tasks/${task.id}/print`} className="btn btn--outline">
              Imprimir ficha
            </Link>
            <button type="button" className="btn btn--danger" onClick={this.handleDeleteTask}>
              Eliminar tarea
            </button>
          </div>
        </article>

        <section className="adaptations" aria-labelledby="adaptations-title">
          <h2 id="adaptations-title">Adaptaciones ({adaptations.length})</h2>

          {message && <p className="status-message" role="status">{message}</p>}

          {adaptations.length === 0 ? (
            <p className="empty-message">Esta tarea todavía no tiene adaptaciones. Añade la primera abajo.</p>
          ) : (
            <ul className="adaptation-list">
              {adaptations.map((adapt) => (
                <AdaptationItem
                  key={adapt.id}
                  adaptation={adapt}
                  onUpdate={this.handleUpdateAdaptation}
                  onDelete={this.handleDeleteAdaptation}
                  printUrl={`/tasks/${task.id}/print?adaptation=${adapt.id}`}
                />
              ))}
            </ul>
          )}

          <form className="adaptation-form adaptation-form--new" onSubmit={this.handleAddAdaptation}>
            <h3>Nueva adaptación</h3>

            <label htmlFor="new-adaptation-type">Tipo de adaptación</label>
            <select
              id="new-adaptation-type"
              value={newType}
              onChange={(e) => this.setState({ newType: e.target.value })}
            >
              <option value="">Selecciona un tipo</option>
              {ADAPTATION_TYPES.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            <label htmlFor="new-adaptation-content">Contenido de la adaptación</label>
            <textarea
              id="new-adaptation-content"
              placeholder="Escribe aquí la versión adaptada"
              value={newContent}
              onChange={(e) => this.setState({ newContent: e.target.value })}
            />

            {formError && <p className="form-error" role="alert">{formError}</p>}

            <button type="submit" className="btn btn--primary">Guardar adaptación</button>
          </form>
        </section>
      </div>
    );
  }
}
