import {
  CreateTaskRequest,
  CreateUserRequest,
  MoveTaskRequest,
  Task,
  TaskStatus,
  UpdateTaskRequest,
  UpdateTaskStatusRequest,
  UpdateUserRequest,
  User,
} from "./types.ts";
import { API_URL } from "./config.ts";

export async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error (${response.status}): ${errorText}`);
  }
  return await response.json() as T;
}

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(`${API_URL}/api/users/`);
  return handleResponse<User[]>(response);
}

export async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`${API_URL}/api/users/${id}`);
  return handleResponse<User>(response);
}

export async function createUser(userData: CreateUserRequest): Promise<User> {
  const response = await fetch(`${API_URL}/api/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return handleResponse<User>(response);
}

export async function updateUser(
  id: string,
  userData: UpdateUserRequest,
): Promise<User> {
  const response = await fetch(`${API_URL}/api/users/${id}`, {
    method: "PUT", //el metodo tiene que ser put no delete
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return handleResponse<User>(response);
}

export async function deleteUser(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/users/${id}`, {
    method: "DELETE", //TIENE QUE SER DELETE NO PUT
  });
  await handleResponse<void>(response);
}

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(`${API_URL}/api/tasks/`);
  return handleResponse<Task[]>(response);
}

export async function fetchTask(id: string): Promise<Task> {
  const response = await fetch(`${API_URL}/api/tasks/${id}`);
  return handleResponse<Task>(response);
}

export async function createTask(taskData: CreateTaskRequest): Promise<Task> {
  const response = await fetch(`${API_URL}/api/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  return handleResponse<Task>(response);
}

export async function updateTask(
  id: string,
  taskData: UpdateTaskRequest,
): Promise<Task> {
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: "PUT", // es put no delete  
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  return handleResponse<Task>(response);
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: "DELETE",
  });
  await handleResponse<void>(response);
}

export async function updateTaskStatus(
  id: string,
  status: UpdateTaskStatusRequest,
): Promise<Task> {
  const response = await fetch(`${API_URL}/api/tasks/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(status),
  });
  return handleResponse<Task>(response);
}

export async function moveTask(id: string, userId: string): Promise<Task> {
  const response = await fetch(`${API_URL}/api/tasks/${id}/move`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  return handleResponse<Task>(response);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString();
}

export function groupTasksByStatus(tasks: Task[]): Record<TaskStatus, Task[]> {
  const grouped: Record<TaskStatus, Task[]> = {
    [TaskStatus.TODO]: [], //No existe pending
    [TaskStatus.IN_PROGRESS]: [],
    [TaskStatus.DONE]: [], // no existe cmpleted
  };

  for (const task of tasks) {
    grouped[task.status].push(task);
  }

  return grouped;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateUserForm(data: CreateUserRequest): string | null {
  if (!data.name || data.name.trim() === "") {
    return "Name is required";
  }

  if (!data.email || data.email.trim() === "") {
    return "Email is required";
  }

  if (!isValidEmail(data.email)) {
    return "Email format is invalid";
  }

  return null;
}

export function validateTaskForm(data: CreateTaskRequest): string | null {
  if (!data.title || data.title.trim() === "") {
    return "Title is required";
  }

  if (!data.user) {
    return "User assignment is required";
  }

  return null;
}
