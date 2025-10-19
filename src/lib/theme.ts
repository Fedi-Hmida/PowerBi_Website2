import { useEffect } from 'react';

export type Theme = 'dark';

export function useTheme() {
  const theme: Theme = 'dark';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add('dark');
  }, []);

  // Keep toggleTheme for compatibility but it does nothing
  const toggleTheme = () => {
    // Always dark mode - no toggle functionality
  };

  return { theme, toggleTheme };
}
