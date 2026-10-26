import React from 'react';
import { Link } from 'react-router-dom';

const STEPS = [
  { title: 'Crea la tarea', text: 'Escribe la actividad una sola vez: asignatura, curso, dificultad e instrucciones.' },
  { title: 'Añade adaptaciones', text: 'Lectura simplificada, apoyo visual, instrucciones paso a paso o menos ejercicios.' },
  { title: 'Imprime la ficha', text: 'Elige la versión que necesita cada alumno y descárgala en PDF o imprímela.' }
];

const FEATURES = [
  { title: 'Todo en un sitio', text: 'Cada tarea guarda todas sus versiones adaptadas. Se acabó tener la misma ficha en cuatro archivos.' },
  { title: 'Pensado para la inclusión', text: 'Para alumnado con dislexia, TDAH, TEA, altas capacidades u otras necesidades.' },
  { title: 'Accesible de verdad', text: 'Letra para dislexia, texto grande y alto contraste. Funciona con teclado y lector de pantalla.' },
  { title: 'Encuentra rápido', text: 'Busca y filtra por asignatura o dificultad cuando tengas muchas tareas.' }
];

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <p className="hero__eyebrow">Para docentes de Primaria y Secundaria</p>
        <h1>Una tarea, todas las versiones que tu alumnado necesita</h1>
        <p className="hero__lead">
          AccessiEdu Pro te ayuda a crear actividades, adaptarlas a diferentes necesidades
          de aprendizaje e imprimir la ficha adecuada para cada alumno.
        </p>
        <div className="hero__actions">
          <Link to="/create" className="btn btn--primary btn--large">Crear una tarea</Link>
          <Link to="/dashboard" className="btn btn--outline btn--large">Ver mis tareas</Link>
        </div>
      </section>

      <section className="steps" aria-labelledby="steps-title">
        <h2 id="steps-title">Cómo funciona</h2>
        <ol className="steps__list">
          {STEPS.map((step, index) => (
            <li key={step.title} className="steps__item">
              <span className="steps__number" aria-hidden="true">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="features-title">
        <h2 id="features-title">Por qué AccessiEdu Pro</h2>
        <div className="home-features">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        Creado por Maialen Sarasola, maestra de Pedagogía Terapéutica ·{' '}
        <a href="https://github.com/MAIALENSARASOLA/AccessiEdu-Pro">Código en GitHub</a>
      </footer>
    </div>
  );
}
