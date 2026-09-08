import React, { Component } from 'react';

export default class CreateTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      subject: '',
      course: '',
      difficulty: 'Fácil',
      instructions: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.taskToEdit && this.props.taskToEdit !== prevProps.taskToEdit) {
      this.setState({
        title: this.props.taskToEdit.title,
        subject: this.props.taskToEdit.subject,
        course: this.props.taskToEdit.course,
        difficulty: this.props.taskToEdit.difficulty,
        instructions: this.props.taskToEdit.instructions
      });
    }
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
      instructions: ''
    });
  };

  render() {
    return (
      <div className="create-task">
        <h1>{this.props.isEditing ? 'Editar tarea' : 'Crear tarea'}</h1>

        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Título</label>
            <input
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
            <label>Asignatura</label>
            <input
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
            <label>Curso</label>
            <input
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
            <label>Dificultad</label>
            <select
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
            <label>Instrucciones</label>
            <textarea
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