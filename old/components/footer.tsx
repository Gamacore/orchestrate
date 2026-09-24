'use client';

import { useEffect, useState } from 'react';
import { Squircle } from '@squircle-js/react';

function SunIcon(props: React.ComponentProps<'svg'>) {
	return (
		<svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...props}>
			<circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
			<path
				d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
}

function MoonIcon(props: React.ComponentProps<'svg'>) {
	return (
		<svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...props}>
			<path
				d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function MonitorIcon(props: React.ComponentProps<'svg'>) {
	return (
		<svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...props}>
			<rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
			<path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
		</svg>
	);
}

interface FooterProps {
	contentWidth: number;
}

const THEME_KEY = 'arcten-theme';

export function Footer({ contentWidth }: FooterProps) {
	const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
	const [mounted, setMounted] = useState(false);
	const [isInitialized, setIsInitialized] = useState(false);

	// Load persisted theme on mount - single effect to avoid race conditions
	useEffect(() => {
		const stored = localStorage.getItem(THEME_KEY) as 'light' | 'dark' | 'system' | null;
		if (stored) {
			setTheme(stored);
		}
		setMounted(true);
		setIsInitialized(true);
	}, []);

	// Apply theme only on user-initiated changes (not on initial mount)
	useEffect(() => {
		if (!isInitialized) return;

		const root = document.documentElement;

		// Remove existing theme classes
		root.classList.remove('light', 'dark');

		// Add the appropriate class
		if (theme === 'light') {
			root.classList.add('light');
		} else if (theme === 'dark') {
			root.classList.add('dark');
		}
		// "system" = no class, let media query handle it

		// Persist to localStorage
		localStorage.setItem(THEME_KEY, theme);
	}, [theme]); // Only depend on theme, not on isInitialized

	const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
		setTheme(newTheme);
	};

	if (!mounted) {
		return (
			<footer className="px-8 py-8">
				<div
					className="mx-auto flex items-center justify-center text-xs text-muted"
					style={{ width: contentWidth, maxWidth: '100%' }}
				>
					<div className="flex items-center gap-0.5">&nbsp;</div>
				</div>
			</footer>
		);
	}

	return (
		<footer className="px-8 py-8">
			<div
				className="mx-auto flex items-center justify-center text-xs text-muted"
				style={{ width: contentWidth, maxWidth: '100%' }}
			>
				<div className="flex items-center gap-0.5">
					<Squircle asChild cornerRadius={8} cornerSmoothing={1}>
						<button
							onClick={() => handleThemeChange('light')}
							className={`p-1.5 transition-all hover:bg-foreground/10 ${theme === 'light' ? 'bg-foreground/10 text-foreground' : ''}`}
							aria-label="Light mode"
						>
							<SunIcon />
						</button>
					</Squircle>
					<Squircle asChild cornerRadius={8} cornerSmoothing={1}>
						<button
							onClick={() => handleThemeChange('dark')}
							className={`p-1.5 transition-all hover:bg-foreground/10 ${theme === 'dark' ? 'bg-foreground/10 text-foreground' : ''}`}
							aria-label="Dark mode"
						>
							<MoonIcon />
						</button>
					</Squircle>
					<Squircle asChild cornerRadius={8} cornerSmoothing={1}>
						<button
							onClick={() => handleThemeChange('system')}
							className={`p-1.5 transition-all hover:bg-foreground/10 ${theme === 'system' ? 'bg-foreground/10 text-foreground' : ''}`}
							aria-label="System preference"
						>
							<MonitorIcon />
						</button>
					</Squircle>
				</div>
			</div>
		</footer>
	);
}
