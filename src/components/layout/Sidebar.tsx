
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Users, 
  Server, 
  Network, 
  ShieldCheck, 
  Key, 
  UserCog, 
  FileText, 
  ChevronRight, 
  Home,
  MenuIcon,
  X
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  exact?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, exact = false, onClick }) => {
  const location = useLocation();
  const isActive = exact 
    ? location.pathname === to 
    : location.pathname.startsWith(to);

  return (
    <NavLink 
      to={to} 
      onClick={onClick}
      className={({ isActive }) => cn(
        "sidebar-item group relative overflow-hidden",
        isActive && "active"
      )}
    >
      <span className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300"></span>
      {icon}
      <span className="text-sm">{label}</span>
      <ChevronRight className={cn(
        "h-4 w-4 ml-auto opacity-0 transform -translate-x-1 transition-all",
        isActive && "opacity-60 translate-x-0"
      )} />
    </NavLink>
  );
};

const Sidebar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);
  
  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => isMobile && setIsOpen(false);
  
  return (
    <>
      {isMobile && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="fixed top-3 left-3 z-50 bg-white shadow-sm"
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
      )}
      
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-100 transition-all duration-300 ease-in-out",
        isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0",
        "w-64 flex flex-col h-screen"
      )}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
          <div className="flex items-center">
            <div className="bg-primary/10 text-primary p-1.5 rounded mr-2">
              <Server className="h-5 w-5" />
            </div>
            <h1 className="text-lg font-semibold text-gray-900">Tech Manager</h1>
          </div>
          
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 space-y-1 px-3">
          <div className="pb-1">
            <NavItem 
              to="/" 
              icon={<Home className="h-5 w-5" />} 
              label="Dashboard" 
              exact 
              onClick={closeSidebar}
            />
          </div>
          
          <Separator className="my-2" />
          
          <div className="space-y-1">
            <p className="text-xs uppercase font-medium text-gray-500 px-3 pb-1">
              Gestión de Clientes
            </p>
            <NavItem 
              to="/clients" 
              icon={<Users className="h-5 w-5" />} 
              label="Clientes" 
              onClick={closeSidebar}
            />
          </div>
          
          <div className="space-y-1 pt-2">
            <p className="text-xs uppercase font-medium text-gray-500 px-3 pb-1">
              Información Técnica
            </p>
            <NavItem 
              to="/servers" 
              icon={<Server className="h-5 w-5" />} 
              label="Servidores" 
              onClick={closeSidebar}
            />
            <NavItem 
              to="/networks" 
              icon={<Network className="h-5 w-5" />} 
              label="Redes" 
              onClick={closeSidebar}
            />
          </div>
          
          <div className="space-y-1 pt-2">
            <p className="text-xs uppercase font-medium text-gray-500 px-3 pb-1">
              Seguridad
            </p>
            <NavItem 
              to="/credentials" 
              icon={<Key className="h-5 w-5" />} 
              label="Credenciales" 
              onClick={closeSidebar}
            />
            <NavItem 
              to="/access-requests" 
              icon={<ShieldCheck className="h-5 w-5" />} 
              label="Solicitudes de Acceso" 
              onClick={closeSidebar}
            />
          </div>
          
          <div className="space-y-1 pt-2">
            <p className="text-xs uppercase font-medium text-gray-500 px-3 pb-1">
              Administración
            </p>
            <NavItem 
              to="/users" 
              icon={<UserCog className="h-5 w-5" />} 
              label="Usuarios y Roles" 
              onClick={closeSidebar}
            />
            <NavItem 
              to="/audit" 
              icon={<FileText className="h-5 w-5" />} 
              label="Auditoría" 
              onClick={closeSidebar}
            />
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            <p>Tech Manager v1.0</p>
            <p>© 2023 All rights reserved</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
