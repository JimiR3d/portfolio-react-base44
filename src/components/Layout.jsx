import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CursorOrb from './CursorOrb';
import ThemeWipe from './ThemeWipe';
import ScrollProgress from './ScrollProgress';
import ViewportBorder from './ViewportBorder';
import { useTheme } from '@/lib/ThemeContext';

export default function Layout() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: isLight ? '#F9F9F6' : '#0A0A0A',
        color: isLight ? '#0A0A0A' : '#F5F5F5',
        transition: 'background-color 0.1s ease, color 0.1s ease',
      }}
    >
      <ScrollProgress />
      <ViewportBorder />
      <CursorOrb />
      <ThemeWipe />
      <Navbar />
      <main style={{ paddingTop: '60px' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}