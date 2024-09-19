import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import axios from 'axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Estado para mensaje de éxito
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    const closeMenu = (e) => {
      if (isOpen && navRef.current && !navRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', closeMenu);
    return () => document.removeEventListener('mousedown', closeMenu);
  }, [isOpen]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage(''); // Limpiar el mensaje de éxito previo
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });

      if (response.status === 200 && response.data) {
        setIsLoggedIn(true);
        setUser(response.data);
        setSuccessMessage('Login exitoso'); // Mensaje de éxito
        setIsVisible(false);
      } else {
        setError('Respuesta del servidor inválida');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data || 'Error durante el inicio de sesión');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setEmail('');
    setPassword('');
  };

  return (
    <nav className="navbar" ref={navRef}>
      <div className='menu-icon' onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul className='nav-links'>
          <li><Link to="/" onClick={() => setIsOpen(false)}>INICIO</Link></li>
          <li><Link to="/asignaturas" onClick={() => setIsOpen(false)}>ASIGNATURAS</Link></li>
          <li><Link to="/profesores" onClick={() => setIsOpen(false)}>PROFESORES</Link></li>
          <li><Link to="/web" onClick={() => setIsOpen(false)}>WEB OFICIAL</Link></li>
          <li><Link to="#" onClick={() => setIsOpen(false)}>IDIOMA</Link></li>
        </ul>
      </div>
      <div className="login-container">
        {isLoggedIn ? (
          <button className="login-button" onClick={handleLogout}>
            <span className="login-text">CERRAR SESIÓN</span>
            <FaUser className='fauser' />
          </button>
        ) : (
          <button className="login-button" onClick={toggleVisibility}>
            <span className="login-text">INICIAR SESIÓN</span>
            <FaUser className='fauser' />
          </button>
        )}
        {!isLoggedIn && (
          <div className={`login-form ${isVisible ? 'visible' : ''}`}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Entrar</button>
            </form>
            {successMessage && <p className="success">{successMessage}</p>}
            {error && <p className="error">{error}</p>}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
