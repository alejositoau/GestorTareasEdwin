import { CSVLink } from 'react-csv';

export const ReportExport = ({ tasks }) => {
  const reportData = tasks.map((task) => ({
    'ID de Tarea': task.id,
    Nombre: task.title,
    Estado: task.status,
    'Tiempo Invertido (seg)': task.timeSpent,
    'Fecha de Creación': task.createdAt?.toDate
      ? task.createdAt.toDate().toLocaleDateString()
      : '',
  }));

  return (
    <div className="glass-container">
      <h3>Reporte de Productividad</h3>
      {tasks.length > 0 ? (
        <CSVLink data={reportData} filename="mis-tareas-reporte.csv">
          Descargar Reporte en Excel/CSV
        </CSVLink>
      ) : (
        <p>No hay tareas para exportar.</p>
      )}
    </div>
  );
};