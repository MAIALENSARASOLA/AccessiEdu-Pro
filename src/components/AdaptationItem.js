import React, { Component } from 'react';
import { ADAPTATION_TYPES } from '../api';

// Una adaptación: se puede ver, editar y borrar
export default class AdaptationItem extends Component {
  state = {
    isEditing: false,
    type: this.props.adaptation.type || '',
    content: this.props.adaptation.content || '',
    error: ''
  };

  startEditing = () => {
    this.setState({
      isEditing: true,
      type: this.props.adaptation.type || '',
      content: this.props.adaptation.content || '',
      error: ''
    });
  };

  cancelEditing = () => {
    this.setState({ isEditing: false, error: '' });
  };

  handleSave = (event) => {
    event.preventDefault();
    const type = this.state.type.trim();
    const content = this.state.content.trim();

    if (!type || !content) {
      this.setState({ error: 'Rellena el tipo y el contenido de la adaptación.' });
      return;
    }

    this.props.onUpdate(this.props.adaptation.id, { type, content })
      .then(() => this.setState({ isEditing: false, error: '' }))
      .catch((message) => this.setState({ error: message }));
  };

  render() {
    const { adaptation, onDelete } = this.props;
    const { isEditing, type, content, error } = this.state;
    const idPrefix = `adaptation-${adaptation.id}`;

    if (isEditing) {
      return (
        <li className="adaptation-item adaptation-item--editing">
          <form onSubmit={this.handleSave} className="adaptation-form">
            <label htmlFor={`${idPrefix}-type`}>Tipo de adaptación</label>
            <select
              id={`${idPrefix}-type`}
              value={type}
              onChange={(e) => this.setState({ type: e.target.value })}
            >
              {ADAPTATION_TYPES.indexOf(type) === -1 && type && <option value={type}>{type}</option>}
              {ADAPTATION_TYPES.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            <label htmlFor={`${idPrefix}-content`}>Contenido</label>
            <textarea
              id={`${idPrefix}-content`}
              value={content}
              onChange={(e) => this.setState({ content: e.target.value })}
            />

            {error && <p className="form-error" role="alert">{error}</p>}

            <div className="button-row">
              <button type="submit" className="btn btn--primary">Guardar</button>
              <button type="button" className="btn btn--outline" onClick={this.cancelEditing}>Cancelar</button>
            </div>
          </form>
        </li>
      );
    }

    return (
      <li className="adaptation-item">
        <h3 className="adaptation-item__type">{adaptation.type}</h3>
        <p className="adaptation-item__content">{adaptation.content}</p>

        <div className="button-row">
          <button
            type="button"
            className="btn btn--outline btn--small"
            aria-label={`Editar adaptación ${adaptation.type}`}
            onClick={this.startEditing}
          >
            Editar
          </button>
          <button
            type="button"
            className="btn btn--danger btn--small"
            aria-label={`Eliminar adaptación ${adaptation.type}`}
            onClick={() => onDelete(adaptation)}
          >
            Eliminar
          </button>
        </div>
      </li>
    );
  }
}
