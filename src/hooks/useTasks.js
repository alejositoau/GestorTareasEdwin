import { useState, useEffect, useCallback, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NotificationContext } from '../context/NotificationContext';
import * as firebaseTasks from '../services/firebaseTasks';

export const useTasks = () => {
  const { user } = useContext(AuthContext);
  const { showError, showSuccess } = useContext(NotificationContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await firebaseTasks.getTasks(user.uid);
      setTasks(data);
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  }, [user, showError]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = useCallback(
    async (taskData) => {
      if (!user) return;
      try {
        const newTask = await firebaseTasks.createTask(user.uid, taskData);
        setTasks([...tasks, newTask]);
        showSuccess('Tarea creada exitosamente');
        return newTask;
      } catch (error) {
        showError(error.message);
        throw error;
      }
    },
    [tasks, user, showError, showSuccess]
  );

  const removeTask = useCallback(
    async (taskId) => {
      if (!user) return;
      try {
        await firebaseTasks.deleteTask(user.uid, taskId);
        setTasks(tasks.filter(t => t.id !== taskId));
        showSuccess('Tarea eliminada');
      } catch (error) {
        showError(error.message);
        throw error;
      }
    },
    [tasks, user, showError, showSuccess]
  );

  const updateTaskData = useCallback(
    async (taskId, updates) => {
      if (!user) return;
      try {
        await firebaseTasks.updateTask(user.uid, taskId, updates);
        setTasks(tasks.map(t => (t.id === taskId ? { ...t, ...updates } : t)));
        showSuccess('Tarea actualizada');
      } catch (error) {
        showError(error.message);
        throw error;
      }
    },
    [tasks, user, showError, showSuccess]
  );

  const archiveTaskLocal = useCallback(
    async (taskId) => {
      if (!user) return;
      try {
        await firebaseTasks.archiveTask(user.uid, taskId);
        setTasks(tasks.map(t => (t.id === taskId ? { ...t, status: 'archived' } : t)));
        showSuccess('Tarea archivada');
      } catch (error) {
        showError(error.message);
        throw error;
      }
    },
    [tasks, user, showError, showSuccess]
  );

  return {
    tasks,
    loading,
    addTask,
    removeTask,
    updateTaskData,
    archiveTaskLocal,
    fetchTasks,
  };
};