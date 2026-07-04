import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { registerWithEmail } from '../services/authService';
import { validateEmail, validatePassword } from '../utils/validations';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return Swal.fire('Error', 'El formato del correo no es válido.', 'error');
    }
    if (!validatePassword(password)) {
      return Swal.fire(
        'Contraseña débil',
        'Debe tener mínimo 8 caracteres, incluir letras y números.',
        'error'
      );
    }

    try {
      await registerWithEmail(email, password);
      Swal.fire('¡Listo!', 'Cuenta creada correctamente.', 'success');
      navigate('/dashboard');
    } catch (error) {
      Swal.fire('Error', 'No se pudo crear la cuenta. ¿Ya existe ese correo?', 'error');
    }
  };

  return (
    <div className="glass-container auth-form">
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña (mín. 8 caracteres, letras y números)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrarme</button>
      </form>
    </div>
  );
};