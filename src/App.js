import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';  // ← import from sonner
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout/Layout';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import CommandPalette from './components/CommandPalette';
import './styles/global.css';

const Home = lazy(() => import('./pages/Home/Home'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy/PrivacyPolicy'));

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <ScrollProgress />
          <CustomCursor />
          <CommandPalette />
          <Layout>
            <Suspense fallback={<div className="loading-screen">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
              </Routes>
            </Suspense>
          </Layout>
          <Toaster
            position="top-right"
            richColors
            closeButton
            theme={document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'}
          />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
