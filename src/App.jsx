import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState, useCallback } from 'react';
import Header from "./components/Header";
import CustomCursor from "./components/CustomCursor";
import LoadingCounter from './LoadingCounter';
import ErrorBoundary from './components/ErrorBoundary';

// 💡 NEW: Import the Footer component
import Footer from "./components/Footer";

import "./App.css";

// Lazy load page components for better performance
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Work = lazy(() => import("./pages/Work"));
const Process = lazy(() => import("./pages/Process"));
const Contact = lazy(() => import("./pages/Contact"));

// Lazy load showcase components (these are heavy)
const ProjectShowcaseKOA = lazy(() => import("./components/ProjectShowcaseKOA"));
const ProjectShowcaseZENFLOW = lazy(() => import("./components/ProjectShowcaseZENFLOW"));
const ProjectShowcaseEVENTLY = lazy(() => import("./components/ProjectShowcaseEVENTLY"));
const ProjectShowcaseFOODLOG = lazy(() => import("./components/ProjectShowcaseFOODLOG"));

const App = () => {
  // Check if this is the first load in this session
  const [isFirstLoad, setIsFirstLoad] = useState(() => {
    const hasLoaded = sessionStorage.getItem('hasInitiallyLoaded');
    return !hasLoaded;
  });

  const [isLoading, setIsLoading] = useState(isFirstLoad);

  const handleLoadingFinish = useCallback(() => {
    setIsLoading(false);
    // Mark that we've shown the initial loading counter
    sessionStorage.setItem('hasInitiallyLoaded', 'true');
  }, []);

  // Simple loading fallback
  const LoadingFallback = () => (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f4efe3',
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: '3px solid #f4efe3',
        borderTop: '3px solid #1d2342',
        animation: 'spin 1s linear infinite'
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  return (
    <>
      {isLoading && isFirstLoad ? (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999
        }}>
          <LoadingCounter onFinish={handleLoadingFinish} />
        </div>
      ) : (
        <ErrorBoundary>
          <CustomCursor />
          <Header />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/work" element={<Work />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/process" element={<Process />} />

              {/* Showcase routes */}
              <Route path="/showcase/koa" element={<ProjectShowcaseKOA />} />
              <Route path="/showcase/zenflow" element={<ProjectShowcaseZENFLOW />} />
              <Route path="/showcase/evently" element={<ProjectShowcaseEVENTLY />} />
              <Route path="/showcase/foodlog" element={<ProjectShowcaseFOODLOG />} />
            </Routes>
          </Suspense>

          {/* 💡 FOOTER: Placed outside the Routes/Suspense to be always visible */}
          <Footer />
        </ErrorBoundary>
      )}
    </>
  );
};

export default App;