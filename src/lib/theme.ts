export type ThemeMode = 'light' | 'dark' | 'system';

export const THEME_KEY = 'arcten-theme';

export function isThemeMode(value: string | null): value is ThemeMode {
	return value === 'light' || value === 'dark' || value === 'system';
}

export function getStoredTheme(): ThemeMode {
	if (typeof window === 'undefined') {
		return 'system';
	}

	const storedTheme = window.localStorage.getItem(THEME_KEY);
	return isThemeMode(storedTheme) ? storedTheme : 'system';
}

export function applyTheme(theme: ThemeMode) {
	if (typeof document === 'undefined') {
		return;
	}

	const root = document.documentElement;
	root.classList.remove('light', 'dark');

	if (theme === 'light' || theme === 'dark') {
		root.classList.add(theme);
	}
}
