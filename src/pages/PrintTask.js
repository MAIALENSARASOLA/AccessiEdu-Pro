import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { tasksApi, adaptationsApi } from '../api';

// Ficha lista para imprimir (o guardar como PDF) y dar al alumnado.
// Con ?adaptation=ID se imprime esa adaptación en lugar de la tarea original.
export default class PrintTask extends Component {
  state = {
    task: null,
    adaptations: [],
    loading: true,
    error: '',
    showAnswerLines: true
  };

  componentDidMount() {
    const taskId = this.props.match.params.id;
    Promise.all([tasksApi.getOne(taskId), adaptationsApi.getForTask(taskId)])
      .then(([taskResponse, adaptationsResponse]) => {
        this.setState({ task: taskResponse.data, adaptations: adaptationsResponse.data, loading: false });
      })
      .catch(() => {
        this.setState({ loading: false, error: 'No se ha podido cargar la ficha.' });
      });
  }

  getSelectedAdaptationId() {
    const params = new URLSearchParams(this.props.location.search);
    return params.get('adaptation') || '';
  }

  handleVersionChange = (event) => {
    const value = event.target.value;
    const { match, history } = this.props;
    history.replace(value ? `${match.url}?adaptation=${value}` : match.url);
  };

  render() {
    const { task, adaptations, loading, error, showAnswerLines } = this.state;

    if (loading) {
      return <div className="page"><p className="status-message" role="status">Preparando la ficha…</p></div>;
    }
    if (error) {
      return (
        <div className="page">
          <p className="form-error" role="alert">{error}</p>
          <Link to="/dashboard" className="btn btn--outline">Volver a mis tareas</Link>
        </div>
      );
    }

    const selectedId = this.getSelectedAdaptationId();
    const adaptation = adaptations.find((a) => String(a.id) === selectedId);
    const content = adaptation ? adaptation.content : task.instructions;

    return (
      <div className="page print-page">
        <div className="print-toolbar no-print">
          <Link to={`/tasks/${task.id}`} className="back-link">← Volver a la tarea</Link>

          <div className="print-toolbar__controls">
            <div className="print-toolbar__field">
              <label htmlFor="print-version">Versión</label>
              <select id="print-version" value={adaptation ? selectedId : ''} onChange={this.handleVersionChange}>
                <option value="">Original</option>
                {adaptations.map((a) => (
                  <option key={a.id} value={a.id}>{a.type}</option>
                ))}
              </select>
            </div>

            <label className="print-toolbar__check">
              <input
                type="checkbox"
                checked={showAnswerLines}
                onChange={() => this.setState({ showAnswerLines: !showAnswerLines })}
              />
              Líneas para responder
            </label>

            <button type="button" className="btn btn--primary" onClick={() => window.print()}>
              Imprimir / Guardar PDF
            </button>
          </div>
          <p className="print-toolbar__hint">
            Consejo: activa «Letra para dislexia» o «Texto más grande» en el menú Accesibilidad y la ficha se imprimirá así.
          </p>
        </div>

        <article className="worksheet">
          <header className="worksheet__header">
            <div className="worksheet__student">
              <span>Nombre: <span className="worksheet__blank" /></span>
              <span>Fecha: <span className="worksheet__blank worksheet__blank--short" /></span>
            </div>
            <p className="worksheet__meta">
              {[task.subject, task.course].filter(Boolean).join(' · ')}
            </p>
          </header>

          <h1 className="worksheet__title">{task.title}</h1>
          {adaptation && <p className="worksheet__version">{adaptation.type}</p>}

          <div className="worksheet__content">{content || 'Sin instrucciones.'}</div>

          {showAnswerLines && (
            <div className="worksheet__lines" aria-hidden="true">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <div key={n} className="worksheet__line" />)}
            </div>
          )}

          <footer className="worksheet__footer">AccessiEdu Pro</footer>
        </article>
      </div>
    );
  }
}
