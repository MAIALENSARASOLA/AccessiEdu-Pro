import React from 'react';
import { Link, NavLink } from 'react-router-dom';

// Barra de navegación: más grande, con los colores de la app
// y marcando la página en la que estás (aria-current para lectores de pantalla).
export default function NavBar() {
  return (
    <header className="navbar">
      <nav className="navbar__inner" aria-label="Navegación principal">
        <Link to="/" className="navbar__brand">AccessiEdu Pro</Link>

        <ul className="navbar__links">
          <li>
            <NavLink exact to="/" className="navbar__link" activeClassName="navbar__link--active">
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" className="navbar__link" activeClassName="navbar__link--active">
              Mis tareas
            </NavLink>
          </li>
          <li>
            <NavLink to="/create" className="navbar__link navbar__link--cta" activeClassName="navbar__link--active">
              + Crear tarea
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
