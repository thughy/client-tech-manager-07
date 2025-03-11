
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown, 
  Search, 
  Plus, 
  MoreHorizontal, 
  FileEdit, 
  Server, 
  Network, 
  Trash2, 
  Users 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for clients
const CLIENTS = [
  { 
    id: 1, 
    name: 'Acme Corp', 
    nit: '900.123.456-7', 
    contact: 'John Smith', 
    phone: '(601) 555-1234', 
    address: 'Calle 123 #45-67, Bogotá', 
    status: 'active' 
  },
  { 
    id: 2, 
    name: 'Tech Solutions', 
    nit: '800.987.654-3', 
    contact: 'Maria Rodriguez', 
    phone: '(601) 555-5678', 
    address: 'Carrera 78 #32-10, Medellín', 
    status: 'active' 
  },
  { 
    id: 3, 
    name: 'Global Industries', 
    nit: '901.333.222-1', 
    contact: 'Carlos Ruiz', 
    phone: '(601) 555-9876', 
    address: 'Avenida 5 #23-45, Cali', 
    status: 'inactive' 
  },
  { 
    id: 4, 
    name: 'Digital Services', 
    nit: '805.444.777-8', 
    contact: 'Ana Martinez', 
    phone: '(601) 555-4321', 
    address: 'Calle 67 #12-34, Barranquilla', 
    status: 'active' 
  },
  { 
    id: 5, 
    name: 'Inventure Inc', 
    nit: '830.555.666-9', 
    contact: 'Pedro Gomez', 
    phone: '(601) 555-8765', 
    address: 'Carrera 45 #67-89, Bogotá', 
    status: 'active' 
  },
];

const ClientList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredClients = CLIENTS.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.nit.includes(searchTerm) ||
    client.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Clientes</h1>
          <p className="text-gray-500 mt-1">Gestión de clientes de la empresa</p>
        </div>
        <div className="flex space-x-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Buscar cliente..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo cliente
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border shadow-subtle overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <h2 className="text-lg font-medium">Lista de clientes</h2>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Filtrar
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Todos</DropdownMenuItem>
                  <DropdownMenuItem>Activos</DropdownMenuItem>
                  <DropdownMenuItem>Inactivos</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" size="sm">
                Exportar
              </Button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>NIT</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">
                      <Link 
                        to={`/clients/${client.id}`}
                        className="hover:text-primary transition-colors"
                      >
                        {client.name}
                      </Link>
                    </TableCell>
                    <TableCell>{client.nit}</TableCell>
                    <TableCell>{client.contact}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>
                      <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                        {client.status === 'active' ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <FileEdit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Server className="h-4 w-4 mr-2" />
                            Servidores
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Network className="h-4 w-4 mr-2" />
                            Redes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="h-4 w-4 mr-2" />
                            Contactos
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500 hover:text-red-600 hover:bg-red-50 focus:bg-red-50">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    {searchTerm ? 'No se encontraron clientes con ese término de búsqueda' : 'No hay clientes registrados'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-gray-500">
            Mostrando <span className="font-medium">{filteredClients.length}</span> de{" "}
            <span className="font-medium">{CLIENTS.length}</span> clientes
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm" disabled>
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientList;
