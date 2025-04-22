# 🧩 App de Gestión de Tareas

Esta es una aplicación web desarrollada con [Fresh](https://fresh.deno.dev) y Deno que sirve como cliente para una API REST. Su objetivo es permitir la **gestión de tareas y usuarios** de forma visual, en un estilo similar a un tablero tipo Trello.

---

## 🚀 Funcionalidad esperada

La aplicación permite:

### ✅ Tareas
- Ver todas las tareas clasificadas por estado:  
  - **PENDING**  
  - **IN_PROGRESS**  
  - **COMPLETED**
- Crear una nueva tarea con título, descripción y usuario asignado.
- Editar los datos de una tarea.
- Eliminar una tarea.
- Mover una tarea de un estado a otro (una vez completada, no se puede volver a mover).

### 👤 Usuarios
- Ver una lista de usuarios registrados.
- Crear nuevos usuarios.
- Editar usuarios existentes.
- Eliminar usuarios.

---

## 🧱 Estructura básica

- `/routes` – Contiene las vistas principales de la aplicación.
- `/islands` – Componentes interactivos que manejan el estado del cliente.
- `/components` – Componentes reutilizables de UI como tarjetas o formularios.
- `/utils` – Funciones auxiliares (fetch, validaciones, etc.).
- `/types.ts` – Interfaces para tipos de datos como `User` y `Task`.

---

## 🛠️ Cómo ejecutar el proyecto

Requisitos:
- Tener instalado [Deno](https://deno.land/) (v1.36 o superior)

### Paso 1: Clona el repositorio
```bash
git clone <url-del-repo>
cd <nombre-del-proyecto>
```
Paso 2: Ejecuta la app
```bash
deno task start
```
Esto levantará la aplicación en http://localhost:8000

## 📎 Consideraciones
La app ya está conectada a una API REST documentada en OpenAPI.

No se requiere configurar una base de datos, ya que el backend está expuesto como servicio.

