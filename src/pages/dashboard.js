import React, { Component } from 'react';
import TaskCard from '../components/task-card';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <h1>Mis tareas</h1>

        <button>Nueva tarea</button>

        {this.props.tasks.map((task, index) => (
          <TaskCard
            key={index}
            title={task.title}
            subject={task.subject}
            course={task.course}
            difficulty={task.difficulty}
            instructions={task.instructions}
          />
        ))}
      </div>
    );
  }
}