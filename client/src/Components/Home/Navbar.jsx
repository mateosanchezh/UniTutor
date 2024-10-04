import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaBars, FaTimes, FaEye, FaEyeSlash, FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from 'axios';
import * as jwtDecode from 'jwt-decode';
import LoginForm from './LoginForm';  // Importar el componente del segundo formulario

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);  // Nuevo estado para el modal
  const navRef = useRef(null);
  const loginContainerRef = useRef(null);
  const navigate = useNavigate();

  // Alternar el menú
  const toggleMenu = () => setIsOpen(!isOpen);

  // Alternar el formulario de inicio de sesión
  const toggleLoginForm = () => setShowLoginForm(!showLoginForm);

  // Alternar visibilidad de contraseña
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Manejar el envío del formulario de inicio de sesión
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos
    setLoading(true); // Iniciar el cargando

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { user, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setIsAuthenticated(true); // Autenticación exitosa
      setShowLoginForm(false);  // Cerrar el formulario de inicio de sesión
      navigate('/user');        // Navegar a la página de usuario
    } catch (err) {
      setError('Error de inicio de sesión. Verifica tus credenciales.');
      setShowModal(true);       // Mostrar el modal en caso de error
    } finally {
      setLoading(false);        // Detener el estado de cargando
    }
  };

  // Cerrar sesión y limpiar el almacenamiento local
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);  // Cambiar el estado de autenticación
  };

  // Verificar si el token es válido al montar el componente
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode.default(token);  // Decodificar el token
        const currentTime = Date.now() / 1000;     // Obtener el tiempo actual
        if (decoded.exp > currentTime) {
          setIsAuthenticated(true);  // Si el token no ha expirado, el usuario está autenticado
        } else {
          localStorage.removeItem('token');  // Si ha expirado, eliminar el token
        }
      } catch (error) {
        localStorage.removeItem('token');    // Si el token no es válido, eliminarlo
      }
    }
  }, []);

  // Cerrar el menú cuando se hace clic fuera de él
  useEffect(() => {
    const closeMenu = (e) => {
      if (isOpen && navRef.current && !navRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    // Cerrar el formulario de login si se hace clic fuera de él
    const closeLoginForm = (e) => {
      if (showLoginForm && loginContainerRef.current && !loginContainerRef.current.contains(e.target)) {
        setShowLoginForm(false);
      }
    };

    // Añadir event listeners
    document.addEventListener('mousedown', closeMenu);
    document.addEventListener('mousedown', closeLoginForm);

    // Limpiar event listeners al desmontar
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
                      type="text"
                      placeholder="USUARIO"
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
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

      {/* Modal flotante para error de login */}
      {showModal && (
        <div className="modal">
          <div className="container">
            <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            <LoginForm onLoginFailure={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
