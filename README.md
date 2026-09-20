# AccessiEdu Pro

Aplicación web para que docentes creen, organicen y gestionen tareas escolares accesibles y adaptadas a distintas necesidades educativas (dislexia, TDAH, TEA, altas capacidades, etc.).

🔗 **Demo en vivo:** https://eloquent-semolina-ae9f0d.netlify.app
🔗 **API Backend:** https://accessiedu-pro-backend.onrender.com

## ¿Qué problema resuelve?

Adaptar una misma tarea a diferentes necesidades del alumnado suele llevar mucho tiempo manual al profesorado. AccessiEdu Pro permite crear una tarea una vez y guardar distintas versiones adaptadas de ella (lectura simplificada, apoyo visual, menos ejercicios, etc.), todo desde un panel sencillo y accesible.

## Funcionalidades

- Registro de tareas (título, asignatura, curso, dificultad, instrucciones)
- CRUD completo de tareas: crear, ver, editar y eliminar
- Sistema de Adaptaciones: cada tarea puede tener varias versiones adaptadas (funcionalidad distintiva del proyecto)
- Diseño responsive (móvil, tablet, ordenador)
- Accesibilidad: labels asociadas, navegación por teclado, contraste WCAG AA

## Tecnologías utilizadas

**Frontend:** React, React Router, Axios, SCSS
**Backend:** Python, Flask, Flask-SQLAlchemy, Flask-CORS
**Base de datos:** SQLite
**Despliegue:** Netlify (frontend) + Render (backend)
**Control de versiones:** Git / GitHub

## Arquitectura

React (Netlify) → HTTP/Axios → Flask API (Render) → SQLAlchemy → SQLite

Tablas principales:
- `Task` (id, title, subject, course, difficulty, instructions)
- `Adaptation` (id, task_id → FK a Task, type, content)

## Instalación local

### Backend
​```
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
​```
El servidor arranca en `http://localhost:5000`

### Frontend
​```
cd frontend/accessiedu
npm install
npm start
​```
La app arranca en `http://localhost:3000`

## Repositorios

- Frontend: https://github.com/MAIALENSARASOLA/AccessiEdu-Pro
- Backend: https://github.com/MAIALENSARASOLA/AccessiEdu-Pro-backend

## Autora

Maialen Sarasola — Proyecto Final (Capstone), Full Stack Development with JavaScript, Python, React.
