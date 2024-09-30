import React, { useState } from 'react';
import axios from 'axios';
import "../../App.css";

const LoginForm = ({ onLoginFailure }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
      console.log('Login exitoso', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('Error de inicio de sesión', err);
      if (err.response) {
        console.log(err.response);
        setError(err.response.data.message || 'Error en el servidor, intenta nuevamente más tarde.');
      } else {
        setError('Error de conexión, verifica tu conexión a internet.');
      }
      // Llama a la función de callback para mostrar el formulario de inicio de sesión
      onLoginFailure();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='loginformpage flex'>
      <div className="container">
        <div className="form-container">
          <div className="form-header">
            <h2 className="title">Te damos la bienvenida a Unitutor</h2>
            {error && <p className="error-message">{error}</p>}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                className="input-field"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                className="input-field"
                placeholder="CONTRASEÑA"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="forgot-password">
              <a href="#">¿Has olvidado tu contraseña?</a>
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Cargando...' : 'INICIAR SESIÓN'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
