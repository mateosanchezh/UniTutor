import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaBars, FaTimes, FaEye, FaEyeSlash, FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from 'axios';
import * as jwtDecode from 'jwt-decode';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState('');  // Cambiado de email a user
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navRef = useRef(null);
  const loginContainerRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleLoginForm = () => setShowLoginForm(!showLoginForm);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { user, password });  // Cambiado de email a user
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setIsAuthenticated(true);
      setShowLoginForm(false);
      navigate('/');
    } catch (err) {
      setError('Error de inicio de sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token desde localStorage:", token); // Para debug
    if (token) {
      try {
        const decoded = jwtDecode.default(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp > currentTime) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token'); // Eliminar si el token ha expirado
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        localStorage.removeItem('token'); // Eliminar si hay un error al decodificar
      }
    }
  }, []);

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
        {isAuthenticated ? (
          <button onClick={handleLogout} className="logout-button">CERRAR SESIÓN</button>
        ) : (
          <>
            <button
              className={`login-button ${showLoginForm ? 'active' : ''}`}
              onClick={toggleLoginForm}
            >
              <span className="login-text">INICIAR SESION</span>
              <FaUser className='fauser' />
              {showLoginForm ? <FaChevronUp className="chevron" /> : <FaChevronDown className="chevron" />}
            </button>
            {showLoginForm && (
              <div className="login-form-container">
                <form className="login-form" onSubmit={handleSubmit}>
                  {error && <p className="error">{error}</p>}
                  <div className="input-group">
                    <FaUser />
                    <input
                      type="text"  // Cambiado de type="email" a type="text"
                      placeholder="USUARIO"  // Cambiado de EMAIL a USUARIO
                      value={user}  // Cambiado de email a user
                      onChange={(e) => setUser(e.target.value)}  // Cambiado de email a user
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
                      placeholder="CONTRASEÑA"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : 'ENTRAR'}
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
