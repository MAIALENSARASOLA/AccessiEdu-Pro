import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div className='home'>
        <h1>AccessiEdu Pro</h1>
        <h2>Tareas accesibles para todos</h2>

        <p>
          Crea, organiza y adapta actividades educativas de forma sencilla.
        </p>

        <button>Entrar</button>
        <button>Crear cuenta</button>

        <div className='home-features'>
          <div className='feature-card'>
            <h3>Crear tareas</h3>
            <p>Organiza tus actividades educativas.</p>
          </div>

          <div className='feature-card'>
            <h3>Adaptar tareas</h3>
            <p>Crea versiones adaptadas para diferentes necesidades.</p>
          </div>

          <div className='feature-card'>
            <h3>Compartir</h3>
            <p>Presenta las tareas al alumnado de forma clara y accesible.</p>
          </div>
        </div>
      </div>
    );
  }
}