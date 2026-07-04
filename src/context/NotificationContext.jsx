import { createContext, useState } from 'react';
import Swal from 'sweetalert2';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showSuccess = (message, title = 'Éxito') => {
    Swal.fire({
      title,
      text: message,
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#10b981',
    });
  };

  const showError = (message, title = 'Error') => {
    Swal.fire({
      title,
      text: message,
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#ef4444',
    });
  };

  const showWarning = (message, title = 'Advertencia') => {
    Swal.fire({
      title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'OK',
      confirmButtonColor: '#f59e0b',
    });
  };

  const showConfirm = (message, title = 'Confirmar') => {
    return Swal.fire({
      title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#ef4444',
    });
  };

  const value = {
    notifications,
    showSuccess,
    showError,
    showWarning,
    showConfirm,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};