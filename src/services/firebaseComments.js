import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from './firebaseConfig';

export const addComment = async (userId, taskId, comment) => {
  try {
    const docRef = await addDoc(
      collection(db, 'users', userId, 'tasks', taskId, 'comments'),
      {
        text: comment,
        createdAt: new Date(),
      }
    );
    return { id: docRef.id, text: comment, createdAt: new Date() };
  } catch (error) {
    throw new Error(`Error al agregar comentario: ${error.message}`);
  }
};

export const getComments = async (userId, taskId) => {
  try {
    const q = query(
      collection(db, 'users', userId, 'tasks', taskId, 'comments'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error(`Error al obtener comentarios: ${error.message}`);
  }
};

export const deleteComment = async (userId, taskId, commentId) => {
  try {
    await deleteDoc(
      doc(db, 'users', userId, 'tasks', taskId, 'comments', commentId)
    );
  } catch (error) {
    throw new Error(`Error al eliminar comentario: ${error.message}`);
  }
};