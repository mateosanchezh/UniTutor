import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBars, FaTimes, FaEye, FaEyeSlash, FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from 'axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navRef = useRef(null);
  const loginContainerRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleLoginForm = () => setShowLoginForm(!showLoginForm);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  useEffect(() => {
    const closeMenu = (e) => {
      if (isOpen && navRef.current && !navRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const closeLoginForm = (e) => {
      if (showLoginForm && loginContainerRef.current && !loginContainerRef.current.contains(e.target)) {
        setShowLoginForm(false);
      }
    };

    document.addEventListener('mousedown', closeMenu);
    document.addEventListener('mousedown', closeLoginForm);
    return () => {
      document.removeEventListener('mousedown', closeMenu);
      document.removeEventListener('mousedown', closeLoginForm);
    };
  }, [isOpen, showLoginForm]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });

      if (response.status === 200 && response.data) {
        setIsLoggedIn(true);
        setUser(response.data);
        setShowLoginForm(false);
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
      <div className={`login-container ${showLoginForm ? 'expanded' : ''}`} ref={loginContainerRef}>
        {isLoggedIn ? (
          <button className="login-button" onClick={handleLogout}>
            <span className="login-text">CERRAR SESIÓN</span>
            <FaUser className='fauser' />
          </button>
        ) : (
          <button className={`login-button ${showLoginForm ? 'active' : ''}`} onClick={toggleLoginForm}>
            <span className="login-text">INICIAR SESIÓN</span>
            <FaUser className='fauser' />
            {showLoginForm ? <FaChevronUp className="chevron" /> : <FaChevronDown className="chevron" />}
          </button>
        )}
        {!isLoggedIn && showLoginForm && (
          <div className="login-form-container">
            <form className="login-form" onSubmit={handleLogin}>
              <div className="input-group">
                <FaUser />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                {showPassword ? (
                  <FaEye onClick={togglePasswordVisibility} />
                ) : (
                  <FaEyeSlash onClick={togglePasswordVisibility} />
                )}
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">ENTRAR</button>
            </form>
            <div className="login-alerts">
              {successMessage && <p className="success">{successMessage}</p>}
              {error && <p className="error">{error}</p>}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;