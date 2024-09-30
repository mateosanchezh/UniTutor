import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
      console.log('Login exitoso', response.data);
      // Almacena el token en localStorage
      localStorage.setItem('token', response.data.token);
      // Almacena la información del usuario en localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      // Redirige al usuario a la página principal o dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Error de inicio de sesión', err);
      if (err.response) {
        console.log(err.response);
        if (err.response.status === 400) {
          setError(err.response.data);
        } else {
          setError('Error en el servidor, intenta nuevamente más tarde.');
        }
      } else {
        setError('Error de conexión, verifica tu conexión a internet.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  );
};

export default Login;