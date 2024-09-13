import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";


const Navbar = () => {
  return (
   
    <nav className="navbar">

      <div className='icono'>
        <FaUser className='user' />
        </div>
      <ul>
      
     
      <li>
          <Link to="/">INICIO</Link>
        </li>
        <li>
          <Link to="/asignaturas">ASIGNATURAS</Link>
        </li>
        <li>
          <Link to="/profesores">PROFESORES</Link>
        </li>
        <li>
          <Link to="/web">WEB OFICIAL</Link>
        </li>
        <li>
          <Link to="#">IDIOMA</Link>
        </li>
      </ul>
        
     
    </nav>
  );
};

export default Navbar;