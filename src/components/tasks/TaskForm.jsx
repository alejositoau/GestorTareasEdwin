import { useState } from 'react';
import Swal from 'sweetalert2';
import { validateTaskName } from '../../utils/validations';

export const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateTaskName(title)) {
      return Swal.fire('Error', 'El nombre de la tarea es obligatorio.', 'error');
    }
    onAddTask({ title, description, estimatedTime: Number(estimatedTime) || 0 });
    setTitle('');
    setDescription('');
    setEstimatedTime('');
  };

  return (
    <form className="glass-container" onSubmit={handleSubmit}>
      <input
        placeholder="Nombre de la tarea *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Tiempo estimado (min)"
        value={estimatedTime}
        onChange={(e) => setEstimatedTime(e.target.value)}
      />
      <button type="submit">Crear tarea</button>
    </form>
  );
};