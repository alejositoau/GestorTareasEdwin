import { useState } from 'react';
import Swal from 'sweetalert2';
import { useTimer } from '../../hooks/useTimer';
import { uploadFile } from '../../services/cloudinaryService';

export const TaskCard = ({ task, onUpdate, onArchive, onDelete, onAddAttachment, onAddComment }) => {
  const [expanded, setExpanded] = useState(false);
  const [commentText, setCommentText] = useState('');
  const { seconds, isRunning, start, pause } = useTimer(task.timeSpent || 0);

  const handleDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) onDelete(task.id);
    });
  };

  const handleTimerToggle = () => {
    if (isRunning) {
      pause();
      onUpdate(task.id, { timeSpent: seconds });
    } else {
      start();
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await uploadFile(file);
      onAddAttachment(task.id, url);
    } catch {
      Swal.fire('Error', 'No se pudo subir el archivo.', 'error');
    }
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    onAddComment(task.id, commentText);
    setCommentText('');
  };

  return (
    <div className="glass-container task-card">
      <div className="task-header" onClick={() => setExpanded(!expanded)}>
        <h3>{task.title}</h3>
        <span>{expanded ? '▲' : '▼'}</span>
      </div>

      {expanded && (
        <div className="task-details">
          <p>{task.description}</p>
          <p>Tiempo estimado: {task.estimatedTime} min</p>
          <p>Tiempo invertido: {Math.floor(seconds / 60)} min {seconds % 60} seg</p>

          <button onClick={handleTimerToggle}>
            {isRunning ? 'Pausar' : 'Iniciar'} cronómetro
          </button>

          <div>
            <input type="file" onChange={handleFileUpload} accept="image/*,.pdf" />
            <ul>
              {(task.attachments || []).map((url, i) => (
                <li key={i}><a href={url} target="_blank" rel="noreferrer">Adjunto {i + 1}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <input
              type="text"
              placeholder="Agregar comentario"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button onClick={handleAddComment}>Comentar</button>
            <ul>
              {(task.comments || []).map((c, i) => (
                <li key={i}>{c.text}</li>
              ))}
            </ul>
          </div>

          <button onClick={() => onArchive(task.id)}>Archivar</button>
          <button onClick={handleDelete}>Eliminar</button>
        </div>
      )}
    </div>
  );
};