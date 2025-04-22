import { Task, TaskStatus, User } from "../types.ts";
import { TaskCard } from "./TaskCard.tsx";

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  columnClass: string;
  onEditTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onMoveTask: (taskId: string, status: TaskStatus) => void;
  users: User[]; // añadimos el user
}


export function TaskColumn({
  title,
  status,
  tasks,
  columnClass,
  onEditTask,
  onDeleteTask,
  onMoveTask,
  users,
}: TaskColumnProps) {
  const getNextStatus = (currentStatus: TaskStatus): TaskStatus => {
    switch (currentStatus) {
      case TaskStatus.IN_PROGRESS: //no exisitia pending y completed es in_progress y done
        return TaskStatus.IN_PROGRESS;
        case TaskStatus.DONE:
          return TaskStatus.DONE; //si esta completada debe devolver que la tarea esta completada 
      default:
        return TaskStatus.IN_PROGRESS;
    }
  };

  return (
    <div class={`task-column ${columnClass}`}>
      <h2 class="column-header">{title}</h2>
      <div class="task-list">
        {tasks.length === 0
          ? (
            <p class="text-sm text-gray-500 text-center p-4">
              No tasks in this column
            </p>
          )
          : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                user={users.find(u => u._id === task.user._id)} //fallaba si task no incluia user
                onEdit={() => onEditTask(task._id)}
                onDelete={() => onDeleteTask(task._id)}
                onStatusChange={() =>
                  onMoveTask(task._id, getNextStatus(task.status))}
              />
            ))
          )}
      </div>
    </div>
  );
}
