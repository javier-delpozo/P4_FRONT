import { Layout } from "../components/Layout.tsx";
import UserManagement from "../islands/UserManagement.tsx";

export default function Users() {
  return (
    <Layout title="Task Management System - Users" activeRoute="/users">
      <div class="container">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold mb-2">User Management</h1>
          <p class="text-gray-500">
            Create, edit, and manage users for your tasks
          </p>
        </div>
        <UserManagement />
      </div>
    </Layout>
  );
}
