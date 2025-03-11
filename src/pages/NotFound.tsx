
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { FileWarning } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md space-y-6 text-center animate-fade-in">
        <div className="flex justify-center">
          <div className="bg-red-50 p-4 rounded-full">
            <FileWarning className="h-12 w-12 text-red-500" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900">404</h1>
        <p className="text-xl text-gray-600 mt-2">Página no encontrada</p>
        <p className="text-gray-500 mt-2">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        
        <div className="mt-8">
          <Link to="/">
            <Button size="lg" className="mx-auto">
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
