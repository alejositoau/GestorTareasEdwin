export const handleFirebaseError = (error) => {
  const errorCode = error.code;
  const errorMessages = {
    'auth/email-already-in-use': 'Este correo ya está registrado',
    'auth/weak-password': 'La contraseña es muy débil',
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/invalid-email': 'Email inválido',
    'auth/user-disabled': 'Usuario deshabilitado',
    'permission-denied': 'No tienes permisos para realizar esta acción',
    'not-found': 'Recurso no encontrado',
  };

  return errorMessages[errorCode] || error.message || 'Ocurrió un error desconocido';
};

export const logError = (error, context = '') => {
  console.error(`[ERROR${context ? ` - ${context}` : ''}]:`, error);
};