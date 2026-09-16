import React, { Component } from 'react';

export default class Dashboard extends Component {
  render() {
    const tasks = this.props.tasks || [];

    return (
      <div className="dashboard">
        <h1>Mis tareas</h1>

        <button onClick={() => this.props.history.push('/create')}>
          Nueva tarea
        </button>

        {tasks.map((task) => (
          <div className="task-card" key={task.id}>
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
          </div>
        ))}
      </div>
    );
  }
}