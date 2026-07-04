import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  arrayUnion,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../services/firebaseConfig';
import { useAuth } from '../context/AuthContext';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const tasksRef = collection(db, `users/${currentUser.uid}/tasks`);

    const unsubscribe = onSnapshot(tasksRef, (snapshot) => {
      const tasksData = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const addTask = async (task) => {
    const tasksRef = collection(db, `users/${currentUser.uid}/tasks`);
    await addDoc(tasksRef, {
      uuid: uuidv4(),
      title: task.title,
      description: task.description || '',
      estimatedTime: task.estimatedTime || 0,
      timeSpent: 0,
      status: 'pending',
      archived: false,
      attachments: [],
      comments: [],
      createdAt: new Date(),
    });
  };

  const updateTask = async (taskId, updatedData) => {
    const taskRef = doc(db, `users/${currentUser.uid}/tasks`, taskId);
    await updateDoc(taskRef, updatedData);
  };

  const archiveTask = async (taskId) => {
    const taskRef = doc(db, `users/${currentUser.uid}/tasks`, taskId);
    await updateDoc(taskRef, { archived: true });
  };

  const deleteTask = async (taskId) => {
    const taskRef = doc(db, `users/${currentUser.uid}/tasks`, taskId);
    await deleteDoc(taskRef);
  };

  const addAttachment = async (taskId, fileUrl) => {
    const taskRef = doc(db, `users/${currentUser.uid}/tasks`, taskId);
    await updateDoc(taskRef, { attachments: arrayUnion(fileUrl) });
  };

  const addComment = async (taskId, text) => {
    const taskRef = doc(db, `users/${currentUser.uid}/tasks`, taskId);
    await updateDoc(taskRef, {
      comments: arrayUnion({ text, date: new Date().toISOString() }),
    });
  };

  return {
    tasks,
    addTask,
    updateTask,
    archiveTask,
    deleteTask,
    addAttachment,
    addComment,
  };
};