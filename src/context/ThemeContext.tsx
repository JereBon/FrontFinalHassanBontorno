'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    resolvedTheme: 'light' | 'dark'; // The actual theme being applied
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('system');
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
    const [mounted, setMounted] = useState(false);

    // Initialize from localStorage on mount
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') as Theme | null;
        if (storedTheme) {
            setTheme(storedTheme);
        }
        setMounted(true);
    }, []);

    // Update localStorage when theme changes
    useEffect(() => {
        if (mounted) {
            if (theme === 'system') {
                localStorage.removeItem('theme');
            } else {
                localStorage.setItem('theme', theme);
            }
        }
    }, [theme, mounted]);

    // Apply theme class to html element
    useEffect(() => {
        if (!mounted) return;

        const root = window.document.documentElement;
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const applyTheme = () => {
            const isSystemDark = mediaQuery.matches;
            const shouldUseDark = theme === 'dark' || (theme === 'system' && isSystemDark);

            if (shouldUseDark) {
                root.classList.add('dark');
                setResolvedTheme('dark');
            } else {
                root.classList.remove('dark');
                setResolvedTheme('light');
            }
        };

        applyTheme();

        const handleChange = () => {
            if (theme === 'system') applyTheme();
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme, mounted]);

    // Prevent flash of incorrect theme
    return (
        <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
