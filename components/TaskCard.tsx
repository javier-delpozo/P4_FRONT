import { Task, User } from "../types.ts";
import { formatDate } from "../utils.ts";

interface TaskCardProps {
  task: Task;
  user?: User;
  onEdit?: () => void;
  onDelete?: () => void;
  onStatusChange?: () => void;
}

export function TaskCard({ task, user, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  return (
    <div class="task-card">
      <div class="flex justify-between">
        <h3 class="task-card-title">{task.title}</h3>
        <div class="flex gap-2">
          {onStatusChange && (
            <button
             type="button"
              onClick={onStatusChange}
              class="btn btn-sm btn-primary"
              title="Change status"
            >
              Move
            </button>
          )}
          {onEdit && (
            <button
             type="button"
              onClick={onEdit}
              class="btn btn-sm btn-secondary"
              title="Edit task"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
             type="button"
              onClick={onDelete}
              class="btn btn-sm btn-danger"
              title="Delete task"
            >
              Delete
            </button>
          )}
        </div>
      </div>
      
      {task.description && (
        <p class="task-card-description">{task.description}</p>
      )}
      
      <div class="task-card-meta">
        <div>
          <div><span>Created: </span>{formatDate(task.created_at)}</div>
          <div><span>Updated: </span>{formatDate(task.updated_at)}</div>
        </div>
        <div>
          <div class="task-card-user">
          <span>{user?.name || task.user || "Unknown user"}</span>

            
          </div>
        </div>
      </div>
    </div>
  );
}
//user no se garantiza que esté definido en task
//muestra task.userId en caso de que user no exista