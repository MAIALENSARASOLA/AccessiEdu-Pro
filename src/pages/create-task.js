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

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Crear tarea</h1>

        <label>Título</label>
        <input
          type="text"
          placeholder="Título de la tarea"
          value={this.state.title}
          onChange={(event) =>
            this.setState({ title: event.target.value })
          }
        />

        <label>Asignatura</label>
        <input
          type="text"
          placeholder="Asignatura"
          value={this.state.subject}
          onChange={(event) =>
            this.setState({ subject: event.target.value })
          }
        />

        <label>Curso</label>
        <input
          type="text"
          placeholder="Ej. 4º Primaria"
          value={this.state.course}
          onChange={(event) =>
            this.setState({ course: event.target.value })
          }
        />

        <label>Dificultad</label>
        <select
          value={this.state.difficulty}
          onChange={(event) =>
            this.setState({ difficulty: event.target.value })
          }
        >
          <option>Fácil</option>
          <option>Media</option>
          <option>Difícil</option>
        </select>

        <label>Instrucciones</label>
        <textarea
          placeholder="Escribe las instrucciones de la tarea"
          value={this.state.instructions}
          onChange={(event) =>
            this.setState({ instructions: event.target.value })
          }
        ></textarea>

        <button type="submit">Crear tarea</button>
      </form>
    );
  }
}