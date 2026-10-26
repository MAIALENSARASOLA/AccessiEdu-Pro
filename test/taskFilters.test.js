// Tests de las funciones de búsqueda y filtros.
// Se ejecutan con: npm test
require('babel-register');
const test = require('node:test');
const assert = require('node:assert');
const { filterTasks, getSubjects, normalize } = require('../src/utils/taskFilters');

const tasks = [
  { id: 1, title: 'El faro', subject: 'Lengua', course: '4º Primaria', difficulty: 'Media', instructions: 'Lee el texto' },
  { id: 2, title: 'Fracciones', subject: 'Matemáticas', course: '5º Primaria', difficulty: 'Difícil', instructions: 'Resuelve' },
  { id: 3, title: 'Animales', subject: 'Ciencias', course: '3º Primaria', difficulty: 'Fácil', instructions: 'Dibuja un animal' },
  { id: 4, title: 'Sumas', subject: 'Matemáticas', course: '1º Primaria', difficulty: 'Fácil', instructions: null }
];

test('normalize quita tildes y mayúsculas', () => {
  assert.strictEqual(normalize('  Matemáticas '), 'matematicas');
  assert.strictEqual(normalize(null), '');
});

test('sin filtros devuelve todas, las más recientes primero', () => {
  assert.deepStrictEqual(filterTasks(tasks).map((t) => t.id), [4, 3, 2, 1]);
});

test('busca sin importar tildes', () => {
  assert.deepStrictEqual(filterTasks(tasks, { search: 'matematicas' }).map((t) => t.id), [4, 2]);
});

test('busca en las instrucciones', () => {
  assert.deepStrictEqual(filterTasks(tasks, { search: 'dibuja' }).map((t) => t.id), [3]);
});

test('filtra por asignatura y dificultad a la vez', () => {
  const result = filterTasks(tasks, { subject: 'Matemáticas', difficulty: 'Fácil' });
  assert.deepStrictEqual(result.map((t) => t.id), [4]);
});

test('ordena por título', () => {
  assert.deepStrictEqual(
    filterTasks(tasks, { sort: 'title' }).map((t) => t.title),
    ['Animales', 'El faro', 'Fracciones', 'Sumas']
  );
});

test('no modifica la lista original', () => {
  filterTasks(tasks, { sort: 'title' });
  assert.deepStrictEqual(tasks.map((t) => t.id), [1, 2, 3, 4]);
});

test('getSubjects devuelve asignaturas únicas y ordenadas', () => {
  assert.deepStrictEqual(getSubjects(tasks), ['Ciencias', 'Lengua', 'Matemáticas']);
});
