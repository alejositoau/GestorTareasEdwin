import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loginWithEmail, loginWithGoogle } from '../services/authService';
import { validateEmail } from '../utils/validations';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return Swal.fire('Error', 'El formato del correo no es válido.', 'error');
    }x
    if (!password) {
      return Swal.fire('Error', 'Debes ingresar tu contraseña.', 'error');
    }

    try {
      await loginWithEmail(email, password);
      navigate('/dashboard');
    } catch (error) {
      Swal.fire('Error', 'Credenciales incorrectas. Intenta de nuevo.', 'error');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      Swal.fire('Error', 'No se pudo iniciar sesión con Google.', 'error');
    }
  };

  return (
    <div className="glass-container auth-form">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
      <button onClick={handleGoogleLogin}>Continuar con Google</button>
      <Link to="/reset-password">¿Olvidaste tu contraseña?</Link>
      <Link to="/register">Crear una cuenta</Link>
    </div>
  );
};