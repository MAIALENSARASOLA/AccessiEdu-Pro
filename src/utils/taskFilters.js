// Funciones puras para buscar, filtrar y ordenar tareas.
// Al no depender de React, se pueden probar con tests sencillos.

export const DIFFICULTIES = ['Fácil', 'Media', 'Difícil'];

// Quita tildes y mayúsculas para que "matematicas" encuentre "Matemáticas"
export function normalize(text) {
  return (text || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}

export function getSubjects(tasks) {
  const subjects = [];
  tasks.forEach((task) => {
    const subject = (task.subject || '').trim();
    if (subject && subjects.indexOf(subject) === -1) {
      subjects.push(subject);
    }
  });
  return subjects.sort((a, b) => a.localeCompare(b, 'es'));
}

export function filterTasks(tasks, { search = '', subject = '', difficulty = '', sort = 'newest' } = {}) {
  const query = normalize(search);

  const result = tasks.filter((task) => {
    if (subject && (task.subject || '').trim() !== subject) return false;
    if (difficulty && task.difficulty !== difficulty) return false;
    if (!query) return true;

    const text = normalize([task.title, task.subject, task.course, task.instructions].join(' '));
    return text.indexOf(query) !== -1;
  });

  if (sort === 'title') {
    result.sort((a, b) => (a.title || '').localeCompare(b.title || '', 'es'));
  } else if (sort === 'oldest') {
    result.sort((a, b) => a.id - b.id);
  } else {
    result.sort((a, b) => b.id - a.id);
  }

  return result;
}
