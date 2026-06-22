import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  // wipeState: { x, y, progress 0-1, expanding: bool } — driven by hover
  const [wipeState, setWipeState] = useState(null);
  const rafRef = useRef(null);
  const progressRef = useRef(0);
  const expandingRef = useRef(false);

  const startExpanding = useCallback((x, y) => {
    expandingRef.current = true;

    // If no wipe in progress, initialise one
    setWipeState(prev => prev ? { ...prev, x, y, expanding: true } : { x, y, progress: 0, expanding: true });

    const tick = () => {
      if (!expandingRef.current) return;
      // 15 seconds to go 0 → 1  (1/900 per frame at 60fps ≈ 15s)
      progressRef.current = Math.min(1, progressRef.current + 1 / 900);
      setWipeState(prev => prev ? { ...prev, progress: progressRef.current } : null);

      if (progressRef.current >= 1) {
        // Fully expanded — commit the theme switch
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(nextTheme);
        document.body.classList.remove('dark', 'light');
        document.body.classList.add(nextTheme);
        setWipeState(null);
        progressRef.current = 0;
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, [theme]);

  const stopExpanding = useCallback(() => {
    expandingRef.current = false;
    cancelAnimationFrame(rafRef.current);

    // Retract back to 0 at same speed
    const retract = () => {
      progressRef.current = Math.max(0, progressRef.current - 1 / 900);
      setWipeState(prev => prev ? { ...prev, progress: progressRef.current, expanding: false } : null);

      if (progressRef.current <= 0) {
        setWipeState(null);
        progressRef.current = 0;
        return;
      }
      rafRef.current = requestAnimationFrame(retract);
    };
    rafRef.current = requestAnimationFrame(retract);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, wipeState, startExpanding, stopExpanding }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
