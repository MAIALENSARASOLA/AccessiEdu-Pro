// Preferencias de accesibilidad: se guardan en el navegador (localStorage)
// y se aplican como clases en <html>, así afectan a toda la app.

const STORAGE_KEY = 'accessiedu-a11y';

export const A11Y_OPTIONS = [
  { key: 'dyslexia', className: 'a11y-dyslexia', label: 'Letra para dislexia' },
  { key: 'largeText', className: 'a11y-large-text', label: 'Texto más grande' },
  { key: 'highContrast', className: 'a11y-high-contrast', label: 'Alto contraste' }
];

export function loadPreferences() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return saved && typeof saved === 'object' ? saved : {};
  } catch (error) {
    return {};
  }
}

export function savePreferences(preferences) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    // Si el navegador no deja guardar (modo privado), simplemente no se recuerda
  }
}

export function applyPreferences(preferences) {
  const root = document.documentElement;
  A11Y_OPTIONS.forEach((option) => {
    if (preferences[option.key]) {
      root.classList.add(option.className);
    } else {
      root.classList.remove(option.className);
    }
  });
}
