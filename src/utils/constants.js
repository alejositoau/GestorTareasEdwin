export const TASK_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
};

export const ERROR_MESSAGES = {
  GENERIC: 'Ocurrió un error inesperado',
  NETWORK: 'Error de conexión',
  VALIDATION: 'Por favor verifica los datos ingresados',
  UNAUTHORIZED: 'No autorizado',
  NOT_FOUND: 'Recurso no encontrado',
};

export const SUCCESS_MESSAGES = {
  TASK_CREATED: 'Tarea creada exitosamente',
  TASK_UPDATED: 'Tarea actualizada',
  TASK_DELETED: 'Tarea eliminada',
  TASK_ARCHIVED: 'Tarea archivada',
  LOGIN_SUCCESS: 'Sesión iniciada',
  LOGOUT_SUCCESS: 'Sesión cerrada',
  REGISTER_SUCCESS: 'Registro exitoso',
};

export const TIME_LIMITS = {
  MAX_TASK_TIME: 999 * 3600, 
  MIN_TASK_TIME: 0,
  DEFAULT_TASK_TIME: 3600,
};

export const API_ENDPOINTS = {
};

export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_TASK_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_FILE_SIZE_MB: 5,
};

export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];