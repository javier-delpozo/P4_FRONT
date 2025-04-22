import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { TaskColumn } from "../components/TaskColumn.tsx";
import { Task, TaskStatus, User } from "../types.ts";
import { deleteTask, fetchTasks, fetchUsers, updateTaskStatus } from "../utils.ts";
import TaskForm from "./TaskForm.tsx";

export default function TaskBoard() {
  const tasks = useSignal<Task[]>([]);
  const users = useSignal<User[]>([]); // añadimos los usuarios
  const isLoading = useSignal<boolean>(true);
  const error = useSignal<string | null>(null);

  const showTaskForm = useSignal<boolean>(false);
  const editingTaskId = useSignal<string | null>(null);
  const taskToEdit = useSignal<Task | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const [tasksData, usersData] = await Promise.all([
        fetchTasks(),
        fetchUsers(),
      ]);
      tasks.value = tasksData;
      users.value = usersData;
    } catch (err) {
      console.error("Failed to load data:", err);
      error.value = err instanceof Error ? err.message : "Failed to load data";
    } finally {
      isLoading.value = false;
    }
  };

  const getTasksByStatus = (status: TaskStatus): Task[] => {
    return tasks.value.filter((task) => task.status === status);
  };

  const handleTaskSaved = () => {
    loadData();
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      isLoading.value = true;
      error.value = null;

      await deleteTask(taskId);
      tasks.value = tasks.value.filter((task) => task._id !== taskId);
    } catch (err) {
      console.error("Failed to delete task:", err);
      error.value = err instanceof Error
        ? err.message
        : "Failed to delete task";
    } finally {
      isLoading.value = false;
    }
  };

  const handleMoveTask = async (taskId: string) => {
    try {
      isLoading.value = true;
      error.value = null;

      const updatedTask = await updateTaskStatus(taskId, {
        status: TaskStatus.IN_PROGRESS,
      });
      tasks.value = tasks.value.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      );
    } catch (err) {
      console.error("Failed to update task status:", err);
      error.value = err instanceof Error
        ? err.message
        : "Failed to update task status";
    } finally {
      isLoading.value = false;
    }
  };

  const handleEditTask = (taskId: string) => {
    const task = tasks.value.find((task) => task._id === taskId);
    if (!task) return;

    editingTaskId.value = taskId;
    taskToEdit.value = task;
    showTaskForm.value = true;
  };

  const resetForm = () => {
    editingTaskId.value = null;
    taskToEdit.value = null;
    showTaskForm.value = false;
  };

  return (
    <div class="container">
      <h1 class="text-2xl font-bold mb-6">Task Management Board</h1>

      {error.value && (
        <div class="alert alert-error">
          <p>{error.value}</p>
        </div>
      )}

      <div class="mb-6">
        <button
        type="button"
          onClick={() => {
            showTaskForm.value = !showTaskForm.value;
            if (!showTaskForm.value) resetForm();
          }}
          class="btn btn-primary"
        >
          {showTaskForm.value
            ? "Cancel"
            : (editingTaskId.value ? "Edit Task" : "Create New Task")}
        </button>
      </div>

      {showTaskForm.value && (
        <TaskForm
          editingTaskId={editingTaskId.value}
          taskToEdit={taskToEdit.value}
          onTaskSaved={handleTaskSaved}
          onCancel={resetForm}
        />
      )}

      {isLoading.value && !tasks.value.length
        ? (
          <div class="text-center py-8">
            <p class="text-gray-500">Loading tasks...</p>
          </div>
        )
        : (
          <div class="task-board">
            <TaskColumn
              title="Pending"
              status={TaskStatus.TODO}
              tasks={getTasksByStatus(TaskStatus.TODO)}
              users={users.value}  // añadimos los usuarios
              columnClass="pending-column"
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onMoveTask={handleMoveTask}
            />

            <TaskColumn
              title="In Progress"
              status={TaskStatus.IN_PROGRESS}
              tasks={getTasksByStatus(TaskStatus.IN_PROGRESS)}
              users={users.value}
              columnClass="in-progress-column"
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onMoveTask={handleMoveTask}
            />

            <TaskColumn
              title="Completed"
              status={TaskStatus.DONE}
              tasks={getTasksByStatus(TaskStatus.DONE)}
              users={users.value}
              columnClass="completed-column"
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onMoveTask={handleMoveTask}
            />
          </div>
        )}
    </div>
  );
}
