import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
      <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/asignaturas">Asignaturas</Link>
        </li>
        <li>
          <Link to="/profesores">Profesores</Link>
        </li>
        <li>
          <Link to="/web">Web Oficial</Link>
        </li>
        <li>
          <Link to="#">Idioma</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;