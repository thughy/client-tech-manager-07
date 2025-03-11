
import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const prevPathRef = useRef<string>(location.pathname);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      if (containerRef.current) {
        containerRef.current.classList.remove('animate-fade-in');
        void containerRef.current.offsetWidth; // Trigger reflow
        containerRef.current.classList.add('animate-fade-in');
      }
      prevPathRef.current = location.pathname;
    }
  }, [location.pathname]);
  
  return (
    <div 
      ref={containerRef} 
      className="animate-fade-in"
      style={{ animationDuration: '300ms' }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
