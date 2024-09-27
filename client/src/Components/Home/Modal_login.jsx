import React, { useState } from 'react';
import './LoginForm.scss';
import "../../App.css";
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de envío
    console.log('Login intentado con:', username, password);
  };

  return (
    <div className="modal">
    <div className="container">
      <div className="form-container">
        <div className="form-header">
          <h2 className="title">Te damos la bienvenida a Unitutor</h2>
          <p className="error-message">Acceso inválido. Por favor, inténtelo otra vez.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="input-field"
              placeholder="USUARIO"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              className="input-field"
              placeholder="CONTRASEÑA"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="forgot-password">
            <a href="#">¿Has olvidado tu contraseña?</a>
          </div>
          <button type="submit" className="submit-btn">
            INICIAR SESIÓN
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default LoginForm;