
import React from 'react';
import { Bell, Search, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'Dashboard' }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    toast({
      title: "Sesión cerrada",
      description: "Ha cerrado sesión correctamente",
    });
    navigate('/login');
  };
  
  const userRole = localStorage.getItem('userRole') || 'usuario';
  const displayName = userRole.charAt(0).toUpperCase() + userRole.slice(1);
  const initials = displayName.substring(0, 2).toUpperCase();
  
  return (
    <header className="w-full bg-white/70 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 flex h-16 items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-medium text-gray-800">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative w-64 hidden md:block">
          <Input 
            type="text"
            placeholder="Buscar..."
            className="pl-10 h-9 bg-gray-50 border-gray-100 focus:border-primary/30"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-gray-700">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 text-gray-600">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">{initials}</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline font-medium">{displayName}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2" align="end">
              <div className="flex flex-col space-y-1">
                <Button variant="ghost" size="sm" className="justify-start font-normal">
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </Button>
                <Button variant="ghost" size="sm" className="justify-start font-normal">
                  Configuración
                </Button>
                <Separator className="my-1" />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="justify-start font-normal text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Header;
