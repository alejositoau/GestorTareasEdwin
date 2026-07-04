// src/services/reportService.js
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Calcular métricas
export const calculateMetrics = (tasks) => {
  const completed = tasks.filter(t => t.status === 'completed').length;
  const pending = tasks.filter(t => t.status === 'pending').length;
  const totalTime = tasks.reduce((sum, t) => sum + (t.actualTime || 0), 0);
  const avgTime = tasks.length > 0 ? totalTime / tasks.length : 0;

  return {
    total: tasks.length,
    completed,
    pending,
    completionRate: tasks.length > 0 ? (completed / tasks.length) * 100 : 0,
    totalTime,
    avgTime,
  };
};

export const generatePDF = (tasks, userName) => {
  const doc = new jsPDF();
  const metrics = calculateMetrics(tasks);

  doc.setFontSize(16);
  doc.text('Reporte de Tareas', 14, 22);

  doc.setFontSize(10);
  doc.text(`Usuario: ${userName}`, 14, 32);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 40);

  doc.setFontSize(12);
  doc.text('Métricas', 14, 52);
  doc.setFontSize(10);
  doc.text(`Total de tareas: ${metrics.total}`, 14, 60);
  doc.text(`Completadas: ${metrics.completed}`, 14, 68);
  doc.text(`Pendientes: ${metrics.pending}`, 14, 76);
  doc.text(`Tasa de completación: ${metrics.completionRate.toFixed(2)}%`, 14, 84);
  doc.text(`Tiempo total invertido: ${secondsToTime(metrics.totalTime)}`, 14, 92);

  const tableData = tasks.map(t => [
    t.name,
    t.status,
    secondsToTime(t.actualTime || 0),
    new Date(t.createdAt.toDate()).toLocaleDateString(),
  ]);

  doc.autoTable({
    head: [['Tarea', 'Estado', 'Tiempo', 'Fecha']],
    body: tableData,
    startY: 102,
  });

  doc.save('reporte_tareas.pdf');
};

export const generateExcel = (tasks, userName) => {
  const metrics = calculateMetrics(tasks);

  const metricsData = [
    ['Métrica', 'Valor'],
    ['Usuario', userName],
    ['Fecha', new Date().toLocaleDateString()],
    ['Total de tareas', metrics.total],
    ['Completadas', metrics.completed],
    ['Pendientes', metrics.pending],
    ['Tasa de completación (%)', metrics.completionRate.toFixed(2)],
    ['Tiempo total (HH:MM:SS)', secondsToTime(metrics.totalTime)],
  ];

  const tasksData = [
    ['Nombre', 'Estado', 'Descripción', 'Tiempo estimado', 'Tiempo real', 'Fecha'],
    ...tasks.map(t => [
      t.name,
      t.status,
      t.description,
      secondsToTime(t.estimatedTime || 0),
      secondsToTime(t.actualTime || 0),
      new Date(t.createdAt.toDate()).toLocaleDateString(),
    ]),
  ];

  const wb = XLSX.utils.book_new();
  const ws1 = XLSX.utils.aoa_to_sheet(metricsData);
  const ws2 = XLSX.utils.aoa_to_sheet(tasksData);

  XLSX.utils.book_append_sheet(wb, ws1, 'Métricas');
  XLSX.utils.book_append_sheet(wb, ws2, 'Tareas');

  XLSX.writeFile(wb, 'reporte_tareas.xlsx');
};

export const generateCSV = (tasks, userName) => {
  let csv = 'Nombre,Estado,Descripción,Tiempo Estimado,Tiempo Real,Fecha\n';

  tasks.forEach(t => {
    csv += `"${t.name}","${t.status}","${t.description}","${secondsToTime(t.estimatedTime || 0)}","${secondsToTime(t.actualTime || 0)}","${new Date(t.createdAt.toDate()).toLocaleDateString()}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'reporte_tareas.csv';
  link.click();
};

const secondsToTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};