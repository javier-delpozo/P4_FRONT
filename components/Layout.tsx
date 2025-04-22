import { ComponentChildren } from "preact";
import { Head } from "$fresh/runtime.ts";

interface LayoutProps {
  children: ComponentChildren;
  title?: string;
  activeRoute?: string;
}

export function Layout({ children, title = "Task Management System", activeRoute = "/" }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Task Management System built with Fresh and Deno" />
      </Head>
      <div class="min-h-screen flex flex-col">
        <header class="header">
          <div class="container">
            <div class="flex justify-between items-center">
              <a href="/" class="text-xl font-bold">Task Manager</a>
              <nav>
                <ul class="flex gap-4">
                  <li>
                    <a href="/" class={`nav-link ${activeRoute === "/" ? "active" : ""}`}>Tasks</a>
                  </li>
                  <li>
                    <a href="/users" class={`nav-link ${activeRoute === "/users" ? "active" : ""}`}>Users</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <main class="flex-grow py-8">
          {children}
        </main>
        <footer class="py-4 border-t">
          <div class="container">
            <p class="text-center text-sm text-gray-500">
              Task Management System - Built with Fresh and Deno - Universidad Antonio de Nebrija - Fernando Murua Alcazar
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
