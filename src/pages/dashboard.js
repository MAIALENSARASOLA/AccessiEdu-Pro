import React, { Component } from 'react';

export default class Dashboard extends Component {
  render() {
    const tasks = this.props.tasks || [];

    return (
      <div className="dashboard">
        <h1>Mis tareas</h1>

        <button>Nueva tarea</button>

        {tasks.map((task, index) => (
          <div className="task-card" key={index}>
            <h2>{task.title}</h2>

            <p>
              <strong>Asignatura:</strong> {task.subject}
            </p>

            <p>
              <strong>Curso:</strong> {task.course}
            </p>

            <p>
              <strong>Dificultad:</strong> {task.difficulty}
            </p>

            <p>
              <strong>Instrucciones:</strong> {task.instructions}
            </p>

            <button
              onClick={() => {
                if (this.props.onEditTask) {
                  this.props.onEditTask(index);   // ← CORREGIDO
                }
              }}
            >
              Editar
            </button>

            <button
              onClick={() => {
                if (this.props.onDeleteTask) {
                  this.props.onDeleteTask(index);
                }
              }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    );
  }
}
