import {
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
  listAll,
} from 'firebase/storage';
import { storage } from './firebaseConfig';

export const uploadFile = async (userId, taskId, file) => {
  try {
    const fileRef = ref(storage, `users/${userId}/tasks/${taskId}/${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return {
      name: file.name,
      url: downloadURL,
      path: snapshot.ref.fullPath,
    };
  } catch (error) {
    throw new Error(`Error al subir archivo: ${error.message}`);
  }
};

export const getFileURL = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath);
    return await getDownloadURL(fileRef);
  } catch (error) {
    throw new Error(`Error al obtener URL: ${error.message}`);
  }
};

export const deleteFile = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
  } catch (error) {
    throw new Error(`Error al eliminar archivo: ${error.message}`);
  }
};

export const listTaskFiles = async (userId, taskId) => {
  try {
    const dirRef = ref(storage, `users/${userId}/tasks/${taskId}`);
    const result = await listAll(dirRef);
    const files = [];
    for (const file of result.items) {
      const url = await getDownloadURL(file);
      files.push({
        name: file.name,
        url: url,
        path: file.fullPath,
      });
    }
    return files;
  } catch (error) {
    throw new Error(`Error al listar archivos: ${error.message}`);
  }
};