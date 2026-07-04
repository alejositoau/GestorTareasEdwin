import { useTasks } from '../hooks/useTasks';
import { TaskForm } from '../components/tasks/TaskForm';
import { TaskList } from '../components/tasks/TaskList';
import { ReportExport } from '../components/tasks/ReportExport';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const {
    tasks,
    addTask,
    updateTask,
    archiveTask,
    deleteTask,
    addAttachment,
    addComment,
  } = useTasks();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Mis Tareas</h1>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </header>

      <TaskForm onAddTask={addTask} />
      <ReportExport tasks={tasks} />
      <TaskList
        tasks={tasks}
        onUpdate={updateTask}
        onArchive={archiveTask}
        onDelete={deleteTask}
        onAddAttachment={addAttachment}
        onAddComment={addComment}
      />
    </div>
  );
};