import React, { useState } from 'react';
import axios from 'axios';




const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Inicia el loading
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
      console.log('Login exitoso', response.data);
      // Almacena el token o la información del usuario aquí
    } catch (err) {

          console.error('Error de inicio de sesión', err);
          console.log(err.response);
      // Mejora el manejo de errores

      if (err.response && err.response.status === 400) {
        setError('Email o contraseña incorrecta');
      } else {
        setError('Error en el servidor, intenta nuevamente más tarde.');
      }
      console.error('Error de inicio de sesión', err);
    } finally {
      setLoading(false); // Termina el loading
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
