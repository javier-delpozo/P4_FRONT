
import { Layout } from "../components/Layout.tsx";
import TaskBoard from "../islands/TaskBoard.tsx";

export default function Home() {
  return (
    <Layout title="Task Management System - Tasks" activeRoute="/">
      <div class="container">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold mb-2">Task Management System</h1>
          <p class="text-gray-500">
            Manage your tasks and users efficiently
          </p>
        </div>
        <TaskBoard />
      </div>
    </Layout>
  );
}
