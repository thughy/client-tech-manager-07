
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import PageTransition from '../ui/PageTransition';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const title = pathSegments.length > 0 
    ? pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1) 
    : 'Dashboard';
  
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
