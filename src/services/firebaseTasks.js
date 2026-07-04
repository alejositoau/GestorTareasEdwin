import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from './firebaseConfig';

export const createTask = async (userId, taskData) => {
  try {
    const docRef = await addDoc(collection(db, 'users', userId, 'tasks'), {
      name: taskData.name,
      description: taskData.description || '',
      estimatedTime: taskData.estimatedTime || 0,
      actualTime: 0,
      status: 'pending', 
      createdAt: new Date(),
      updatedAt: new Date(),
      comments: [],
      attachments: [],
    });
    return { id: docRef.id, ...taskData };
  } catch (error) {
    throw new Error(`Error al crear tarea: ${error.message}`);
  }
};

export const getTasks = async (userId) => {
  try {
    const q = query(
      collection(db, 'users', userId, 'tasks'),
      where('status', '!=', 'archived'),
      orderBy('status'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error(`Error al obtener tareas: ${error.message}`);
  }
};

export const getTaskById = async (userId, taskId) => {
  try {
    const docRef = doc(db, 'users', userId, 'tasks', taskId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Tarea no encontrada');
    }
  } catch (error) {
    throw new Error(`Error al obtener tarea: ${error.message}`);
  }
};

export const updateTask = async (userId, taskId, updates) => {
  try {
    const taskRef = doc(db, 'users', userId, 'tasks', taskId);
    await updateDoc(taskRef, { ...updates, updatedAt: new Date() });
  } catch (error) {
    throw new Error(`Error al actualizar tarea: ${error.message}`);
  }
};

export const archiveTask = async (userId, taskId) => {
  return updateTask(userId, taskId, { status: 'archived' });
};

export const deleteTask = async (userId, taskId) => {
  try {
    await deleteDoc(doc(db, 'users', userId, 'tasks', taskId));
  } catch (error) {
    throw new Error(`Error al eliminar tarea: ${error.message}`);
  }
};

export const getArchivedTasks = async (userId) => {
  try {
    const q = query(
      collection(db, 'users', userId, 'tasks'),
      where('status', '==', 'archived'),
      orderBy('updatedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error(`Error al obtener tareas archivadas: ${error.message}`);
  }
};

export const getCompletedTasks = async (userId) => {
  try {
    const q = query(
      collection(db, 'users', userId, 'tasks'),
      where('status', '==', 'completed'),
      orderBy('updatedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error(`Error al obtener tareas completadas: ${error.message}`);
  }
};