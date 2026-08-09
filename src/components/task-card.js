import React, { Component } from 'react';

export default class TaskCard extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <p>{this.props.subject} · {this.props.course}</p>
        <p>Dificultad: {this.props.difficulty}</p>

        <button>Ver</button>
        <button>Editar</button>
        <button>Adaptar</button>
      </div>
    );
  }
}