import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TaskCard from '../components/TaskCard';
import { filterTasks, getSubjects, DIFFICULTIES } from '../utils/taskFilters';

const EMPTY_FILTERS = { search: '', subject: '', difficulty: '', sort: 'newest' };

export default class Dashboard extends Component {
  state = { ...EMPTY_FILTERS };

  clearFilters = () => {
    this.setState({ ...EMPTY_FILTERS });
  };

  render() {
    const { tasks, loading, loadError, onRetry, onDeleteTask, history, location } = this.props;
    const { search, subject, difficulty, sort } = this.state;

    // Mensaje que llega al volver de crear/editar/borrar (ej. "Tarea creada.")
    const message = location && location.state && location.state.message;

    const subjects = getSubjects(tasks);
    const visibleTasks = filterTasks(tasks, this.state);
    const hasFilters = search !== '' || subject !== '' || difficulty !== '';

    return (
      <div className="page page--wide dashboard">
        <div className="page-header">
          <h1>Mis tareas</h1>
          <Link to="/create" className="btn btn--primary">Nueva tarea</Link>
        </div>

        {message && <p className="status-message status-message--success" role="status">{message}</p>}

        {loading && (
          <p className="status-message" role="status">
            Cargando tareas… (si el servidor estaba dormido, puede tardar hasta un minuto)
          </p>
        )}

        {loadError && (
          <div className="form-error" role="alert">
            <p>{loadError}</p>
            <button type="button" className="btn btn--outline" onClick={onRetry}>Reintentar</button>
          </div>
        )}

        {!loading && !loadError && tasks.length === 0 && (
          <p className="empty-message">Todavía no tienes tareas. Crea la primera con el botón «Nueva tarea».</p>
        )}

        {tasks.length > 0 && (
          <form className="filters" role="search" onSubmit={(e) => e.preventDefault()}>
            <div className="filters__field filters__field--search">
              <label htmlFor="filter-search">Buscar</label>
              <input
                id="filter-search"
                type="search"
                placeholder="Título, curso o instrucciones…"
                value={search}
                onChange={(e) => this.setState({ search: e.target.value })}
              />
            </div>

            <div className="filters__field">
              <label htmlFor="filter-subject">Asignatura</label>
              <select
                id="filter-subject"
                value={subject}
                onChange={(e) => this.setState({ subject: e.target.value })}
              >
                <option value="">Todas</option>
                {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="filters__field">
              <label htmlFor="filter-difficulty">Dificultad</label>
              <select
                id="filter-difficulty"
                value={difficulty}
                onChange={(e) => this.setState({ difficulty: e.target.value })}
              >
                <option value="">Todas</option>
                {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="filters__field">
              <label htmlFor="filter-sort">Ordenar</label>
              <select
                id="filter-sort"
                value={sort}
                onChange={(e) => this.setState({ sort: e.target.value })}
              >
                <option value="newest">Más recientes</option>
                <option value="oldest">Más antiguas</option>
                <option value="title">Título (A-Z)</option>
              </select>
            </div>
          </form>
        )}

        {tasks.length > 0 && (
          <p className="results-count" aria-live="polite">
            Mostrando {visibleTasks.length} de {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'}
            {hasFilters && (
              <button type="button" className="link-button" onClick={this.clearFilters}>
                Quitar filtros
              </button>
            )}
          </p>
        )}

        {tasks.length > 0 && visibleTasks.length === 0 && (
          <p className="empty-message">Ninguna tarea coincide con la búsqueda.</p>
        )}

        <div className="task-grid">
          {visibleTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={(id) => history.push(`/tasks/${id}/edit`)}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      </div>
    );
  }
}
