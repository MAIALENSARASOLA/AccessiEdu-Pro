import React, { Component } from 'react';
import TaskCard from '../components/task-card';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Mis tareas</h1>

        <TaskCard
          title="Comprensión lectora"
          subject="Lengua"
          course="4º Primaria"
          difficulty="Media"
        />

        <TaskCard
          title="Problemas de matemáticas"
          subject="Matemáticas"
          course="4º Primaria"
          difficulty="Fácil"
        />
      </div>
    );
  }
}