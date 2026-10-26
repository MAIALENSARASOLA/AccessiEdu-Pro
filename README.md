# AccessiEdu Pro

Es mi proyecto final del bootcamp de Full Stack. Es una aplicación web para que el profesorado pueda crear sus tareas y guardar versiones adaptadas para el alumnado que lo necesite (dislexia, TDAH, TEA, altas capacidades...).

Demo: https://accessiedu-pro.netlify.app
API: https://accessiedu-pro-backend.onrender.com

Aviso: el backend está en el plan gratis de Render y se duerme si nadie lo usa, así que la primera vez puede tardar casi un minuto en cargar.

## Por qué lo hice

Soy maestra, y sé lo que cuesta adaptar una misma ficha para varios alumnos. Muchas veces se hace a mano, tarea por tarea. Con AccessiEdu Pro creas la tarea una vez y le vas añadiendo las adaptaciones: lectura más fácil, apoyo visual, menos ejercicios, etc.

## Qué se puede hacer

- Crear, ver, editar y borrar tareas (título, asignatura, curso, dificultad e instrucciones).
- Añadir adaptaciones a cada tarea. Es la parte que más me interesaba del proyecto.
- Ver cada tarea en su propia página (`/tasks/:id`) con todas sus adaptaciones, y desde ahí añadirlas, editarlas y borrarlas.
- Antes de borrar una tarea o una adaptación, la app pide confirmación.
- Al crear o editar una tarea, vuelve sola al panel y muestra un aviso («Tarea creada»).
- No deja guardar una tarea sin título.
- Se ve bien en el móvil.
- Accesibilidad: cada campo tiene su label, se puede usar con el teclado y los colores tienen buen contraste.

## Con qué está hecho

- Frontend: React, React Router, Axios y SCSS.
- Backend: Python con Flask, Flask-SQLAlchemy y Flask-CORS.
- Base de datos: PostgreSQL en Neon cuando está publicado, y SQLite cuando lo arranco en mi ordenador.
- Despliegue: Netlify para el frontend y Render para el backend.
- Git y GitHub.

## Cómo funciona por dentro

React (Netlify) → Axios → API de Flask (Render) → SQLAlchemy → PostgreSQL (Neon)

Hay dos tablas:
- `Task`: id, title, subject, course, difficulty, instructions
- `Adaptation`: id, task_id (clave foránea a Task), type, content

Las separé porque una tarea puede tener varias adaptaciones.

## Lo que aprendí por mi cuenta

En el curso desplegamos en Heroku y trabajamos con SQLite y MySQL. Aquí tuve que aprender a desplegar en Netlify y Render, a usar PostgreSQL en Neon y a pasar la conexión con una variable de entorno (`DATABASE_URL`), para no dejar la contraseña en el código.

No lo tenía planeado. Lo cambié cuando vi que en Render las tareas se borraban, porque el disco del plan gratis no guarda los datos. Con SQLite, cada vez que el servidor se reiniciaba, la base de datos volvía a estar vacía.

## Para arrancarlo en local

Frontend:
```
git clone https://github.com/MAIALENSARASOLA/AccessiEdu-Pro.git
cd AccessiEdu-Pro
npm install
npm start
```
Se abre en http://localhost:3000

El backend está en otro repositorio, con sus propias instrucciones:
https://github.com/MAIALENSARASOLA/AccessiEdu-Pro-backend

## Mejoras después de la evaluación

Después de la nota final, Mark me propuso cinco mejoras de experiencia de usuario. Están todas hechas:

1. **Página de detalle de cada tarea**, donde se ven sus adaptaciones (antes solo se veían al editar).
2. **CRUD completo de adaptaciones**: ahora también se pueden editar y borrar una a una.
3. **Confirmación antes de borrar** tareas y adaptaciones.
4. **Redirección automática al panel** después de crear o editar una tarea.
5. **Barra de navegación más grande y visible**, con los colores de la app y marcando la página en la que estás.

Además: los mensajes de error se muestran en la página (no solo en la consola), hay un aviso de carga mientras Render se despierta, una página 404, y la tarjeta de tarea es ahora un componente propio (`TaskCard`).

## Lo que me gustaría añadir más adelante

- Login, para que cada profesor vea solo sus tareas.
- Exportar una tarea adaptada a PDF para imprimirla.

Maialen Sarasola — Capstone, Full Stack Development with JavaScript, Python, React.
