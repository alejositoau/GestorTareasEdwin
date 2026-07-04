import { useState } from 'react';
import Swal from 'sweetalert2';
import { resetPassword } from '../services/authService';
import { validateEmail } from '../utils/validations';

export const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      return Swal.fire('Error', 'Ingresa un correo válido.', 'error');
    }
    try {
      await resetPassword(email);
      Swal.fire('Enviado', 'Revisa tu correo para restablecer la contraseña.', 'success');
    } catch (error) {
      Swal.fire('Error', 'No se pudo enviar el correo de recuperación.', 'error');
    }
  };

  return (
    <div className="glass-container auth-form">
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Enviar enlace</button>
      </form>
    </div>
  );
};