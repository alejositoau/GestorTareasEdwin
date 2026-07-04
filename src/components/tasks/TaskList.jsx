import { TaskCard } from './TaskCard';

export const TaskList = ({ tasks, onUpdate, onArchive, onDelete, onAddAttachment, onAddComment }) => (
  <div className="task-list">
    {tasks
      .filter((t) => !t.archived)
      .map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onArchive={onArchive}
          onDelete={onDelete}
          onAddAttachment={onAddAttachment}
          onAddComment={onAddComment}
        />
      ))}
  </div>
);