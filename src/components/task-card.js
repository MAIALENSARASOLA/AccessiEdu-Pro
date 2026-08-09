import React, { Component } from 'react';

export default class TaskCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDetails: false
    };
  }

  render() {
    return (
      <div className="task-card">
        <h3>{this.props.title}</h3>

        <p>
          {this.props.subject} · {this.props.course}
        </p>

        <p>
          Dificultad: {this.props.difficulty}
        </p>

        {this.state.showDetails && (
          <p>
            Instrucciones: {this.props.instructions}
          </p>
        )}

        <button
          onClick={() =>
            this.setState({
              showDetails: !this.state.showDetails
            })
          }
        >
          Ver
        </button>

        <button>Editar</button>
        <button>Adaptar</button>
      </div>
    );
  }
}
