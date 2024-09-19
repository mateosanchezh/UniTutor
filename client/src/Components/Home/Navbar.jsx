import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBars, FaTimes, FaEye, FaEyeSlash, FaChevronDown, FaChevronUp } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navRef = useRef(null);
  const loginContainerRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
        <button
          className={`login-button ${showLoginForm ? 'active' : ''}`}
          onClick={toggleLoginForm}
        >
          <span className="login-text">INICIAR SESION</span>
          <FaUser className='fauser' />
          {showLoginForm ? <FaChevronUp className="chevron" /> : <FaChevronDown className="chevron" />}
        </button>
        <div className="login-form-container">
          <form className="login-form">
            <div className="input-group">
              <FaUser />
              <input type="text" placeholder="USUARIO" />
            </div>
            <div className="input-group">
              {showPassword ? (
                <FaEye onClick={togglePasswordVisibility} />
              ) : (
                <FaEyeSlash onClick={togglePasswordVisibility} />
              )}
              <input type={showPassword ? "text" : "password"} placeholder="CONTRASEÑA" />
            </div>
            <button type="submit">ENTRAR</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;