import { createContext, useState } from 'react';

export const TasksContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('pending');

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const updateTaskInContext = (taskId, updates) => {
    setTasks(tasks.map(t => (t.id === taskId ? { ...t, ...updates } : t)));
  };

  const value = {
    tasks,
    setTasks,
    addTask,
    removeTask,
    updateTaskInContext,
    filter,
    setFilter,
  };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};