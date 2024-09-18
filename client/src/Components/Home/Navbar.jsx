import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (isOpen && navRef.current && !navRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', closeMenu);
    return () => document.removeEventListener('mousedown', closeMenu);
  }, [isOpen]);

  return (
    <nav className="navbar" ref={navRef}>
      <div className='menu-icon' onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul className='nav-links'>
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>INICIO</Link>
          </li>
          <li>
            <Link to="/asignaturas" onClick={() => setIsOpen(false)}>ASIGNATURAS</Link>
          </li>
          <li>
            <Link to="/profesores" onClick={() => setIsOpen(false)}>PROFESORES</Link>
          </li>
          <li>
            <Link to="/web" onClick={() => setIsOpen(false)}>WEB OFICIAL</Link>
          </li>
          <li>
            <Link to="#" onClick={() => setIsOpen(false)}>IDIOMA</Link>
          </li>
        </ul>
      </div>
      <div className="login-container">
        <button className="login-button" onClick={toggleVisibility}>
          <span className="login-text">INICIAR SESION</span>
          <FaUser className='fauser' />
        </button>
        <div className={`login-form ${isVisible ? 'visible' : ''}`}>
          <h2>Login</h2>
          <input type="text" placeholder="Usuario"/>
          <input type="password" placeholder="Contraseña" />
          <button type="submit">Entrar</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;