import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState('');  // Cambiado de email a user
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { user, password });  // Cambiado de email a user
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
          <label htmlFor="user">Usuario:</label>  {/* Cambiado de Email a Usuario */}
          <input
            type="text"  // Cambiado de type="email" a type="text"
            id="user"  // Cambiado de email a user
            value={user}  // Cambiado de email a user
            onChange={(e) => setUser(e.target.value)}  // Cambiado de email a user
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
