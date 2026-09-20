import React, { Component } from 'react';

export default class CreateTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      subject: '',
      course: '',
      difficulty: 'Fácil',
      instructions: '',
      loadedTaskId: null
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.taskToEdit && props.taskToEdit.id !== state.loadedTaskId) {
      return {
        title: props.taskToEdit.title,
        subject: props.taskToEdit.subject,
        course: props.taskToEdit.course,
        difficulty: props.taskToEdit.difficulty,
        instructions: props.taskToEdit.instructions,
        loadedTaskId: props.taskToEdit.id
      };
    }
    return null;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.props.onCreateTask) {
      this.props.onCreateTask(this.state);
    }

    this.setState({
      title: '',
      subject: '',
      course: '',
      difficulty: 'Fácil',
      instructions: '',
      loadedTaskId: null
    });
  };

  render() {
    return (
      <div className="create-task">
        <h1>{this.props.isEditing ? 'Editar tarea' : 'Crear tarea'}</h1>

        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="task-title">Título</label>
            <input
              id="task-title"
              type="text"
              placeholder="Título de la tarea"
              value={this.state.title}
              onChange={(event) =>
                this.setState({ title: event.target.value })
              }
              required
            />
          </div>

          <div>
            <label htmlFor="task-subject">Asignatura</label>
            <input
              id="task-subject"
              type="text"
              placeholder="Asignatura"
              value={this.state.subject}
              onChange={(event) =>
                this.setState({ subject: event.target.value })
              }
              required
            />
          </div>

          <div>
            <label htmlFor="task-course">Curso</label>
            <input
              id="task-course"
              type="text"
              placeholder="Ej. 4º Primaria"
              value={this.state.course}
              onChange={(event) =>
                this.setState({ course: event.target.value })
              }
              required
            />
          </div>

          <div>
            <label htmlFor="task-difficulty">Dificultad</label>
            <select
              id="task-difficulty"
              value={this.state.difficulty}
              onChange={(event) =>
                this.setState({ difficulty: event.target.value })
              }
            >
              <option value="Fácil">Fácil</option>
              <option value="Media">Media</option>
              <option value="Difícil">Difícil</option>
            </select>
          </div>

          <div>
            <label htmlFor="task-instructions">Instrucciones</label>
            <textarea
              id="task-instructions"
              placeholder="Escribe las instrucciones de la tarea"
              value={this.state.instructions}
              onChange={(event) =>
                this.setState({ instructions: event.target.value })
              }
              required
            />
          </div>

          <button type="submit">
            {this.props.isEditing ? 'Guardar cambios' : 'Crear tarea'}
          </button>
        </form>
      </div>
    );
  }
}