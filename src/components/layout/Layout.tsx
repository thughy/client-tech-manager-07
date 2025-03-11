
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import PageTransition from '../ui/PageTransition';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const title = pathSegments.length > 0 
    ? pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1) 
    : 'Dashboard';
  
  // Check if user is logged in (for demo purposes)
  useEffect(() => {
    // This is a simple check for demo purposes
    // In a real app, you would check for a valid JWT token or similar
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);
  
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <Header title={title} />
        
        <main className="p-6">
          <PageTransition>
            {children || <Outlet />}
          </PageTransition>
        </main>
      </div>
    </div>
  );
};

export default Layout;
