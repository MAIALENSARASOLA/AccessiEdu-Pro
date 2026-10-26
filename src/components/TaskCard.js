import React from 'react';
import { Link } from 'react-router-dom';

// Tarjeta de una tarea en el Dashboard
export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <article className="task-card">
      <h2>
        <Link to={`/tasks/${task.id}`} className="task-card__title">{task.title}</Link>
      </h2>

      <p><strong>Asignatura:</strong> {task.subject}</p>
      <p><strong>Curso:</strong> {task.course}</p>
      <p><strong>Dificultad:</strong> {task.difficulty}</p>
      <p className="task-card__instructions"><strong>Instrucciones:</strong> {task.instructions}</p>

      <div className="button-row">
        <Link to={`/tasks/${task.id}`} className="btn btn--primary" aria-label={`Ver ${task.title} y sus adaptaciones`}>
          Ver y adaptar
        </Link>
        <button type="button" className="btn btn--outline" aria-label={`Editar ${task.title}`} onClick={() => onEdit(task.id)}>
          Editar
        </button>
        <button type="button" className="btn btn--danger" aria-label={`Eliminar ${task.title}`} onClick={() => onDelete(task)}>
          Eliminar
        </button>
      </div>
    </article>
  );
}
