import axios from 'axios';

// Dirección del backend en Render. Está en un solo sitio para no repetirla.
export const API_URL = 'https://accessiedu-pro-backend.onrender.com';

// Saca un mensaje de error legible de la respuesta de Flask
export function getErrorMessage(error, fallback) {
  if (error && error.response && error.response.data && error.response.data.error) {
    return error.response.data.error;
  }
  return fallback;
}

export const tasksApi = {
  getAll: () => axios.get(`${API_URL}/tasks`),
  getOne: (id) => axios.get(`${API_URL}/tasks/${id}`),
  create: (task) => axios.post(`${API_URL}/tasks`, task),
  update: (id, task) => axios.put(`${API_URL}/tasks/${id}`, task),
  remove: (id) => axios.delete(`${API_URL}/tasks/${id}`)
};

export const adaptationsApi = {
  getForTask: (taskId) => axios.get(`${API_URL}/tasks/${taskId}/adaptations`),
  create: (taskId, adaptation) => axios.post(`${API_URL}/tasks/${taskId}/adaptations`, adaptation),
  update: (id, adaptation) => axios.put(`${API_URL}/adaptations/${id}`, adaptation),
  remove: (id) => axios.delete(`${API_URL}/adaptations/${id}`)
};

export const ADAPTATION_TYPES = [
  'Lectura simplificada',
  'Instrucciones paso a paso',
  'Menos ejercicios',
  'Apoyo visual'
];
