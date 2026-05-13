export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'countries-explorer-theme';

export function getStoredTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light';
  }
  try {
    return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
}

export function persistTheme(theme: Theme): void {
  applyTheme(theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* Will handle errors later */
  }
}
