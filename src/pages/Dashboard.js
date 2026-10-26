import React from 'react';
import { Link } from 'react-router-dom';

import TaskCard from '../components/TaskCard';

export default function Dashboard({ tasks, loading, loadError, onRetry, onDeleteTask, history, location }) {
  // Mensaje que llega al volver de crear/editar/borrar (ej. "Tarea creada.")
  const message = location && location.state && location.state.message;

  return (
    <div className="page dashboard">
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

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={(id) => history.push(`/tasks/${id}/edit`)}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
}
