
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft,
  Building, 
  Users, 
  Server, 
  Network, 
  Key, 
  Edit, 
  Trash2, 
  FileText,
  ClipboardCheck, 
  Phone,
  Mail,
  MapPin,
  Globe,
  Info,
  Shield
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock client data
const getClientDetails = (id: string) => {
  return {
    id: parseInt(id),
    name: 'Acme Corporation',
    nit: '900.123.456-7',
    contactName: 'John Smith',
    contactEmail: 'john.smith@acmecorp.com',
    contactPhone: '(601) 555-1234',
    address: 'Calle 123 #45-67, Bogotá',
    website: 'www.acmecorp.com',
    status: 'active',
    createdAt: '2023-01-15',
    createdBy: 'Admin User',
    description: 'Empresa líder en soluciones tecnológicas para el sector financiero.',
  };
};

// Mock servers data
const servers = [
  { 
    id: 1, 
    name: 'SRV-PROD-01', 
    ip: '192.168.1.10', 
    os: 'Windows Server 2019', 
    role: 'Production', 
    location: 'Datacenter 1',
    isSensitive: false
  },
  { 
    id: 2, 
    name: 'SRV-DB-01', 
    ip: '192.168.1.11', 
    os: 'Ubuntu Server 20.04', 
    role: 'Database', 
    location: 'Datacenter 1',
    isSensitive: true
  },
  { 
    id: 3, 
    name: 'SRV-APP-01', 
    ip: '192.168.1.12', 
    os: 'CentOS 8', 
    role: 'Application', 
    location: 'Datacenter 2',
    isSensitive: false
  },
];

// Mock networks data
const networks = [
  { 
    id: 1, 
    name: 'Red Principal', 
    subnet: '192.168.1.0/24', 
    gateway: '192.168.1.1', 
    vlan: '10', 
    type: 'LAN',
    isSensitive: false
  },
  { 
    id: 2, 
    name: 'Red Wifi', 
    subnet: '192.168.2.0/24', 
    gateway: '192.168.2.1', 
    vlan: '20', 
    type: 'WLAN',
    isSensitive: true
  },
  { 
    id:
3, 
    name: 'Red DMZ', 
    subnet: '192.168.3.0/24', 
    gateway: '192.168.3.1', 
    vlan: '30', 
    type: 'DMZ',
    isSensitive: true
  },
];

// Mock credentials data
const credentials = [
  { 
    id: 1, 
    name: 'Admin Portal', 
    username: 'admin', 
    password: '********', 
    type: 'Web Access', 
    lastUpdated: '2023-05-10',
    isSensitive: true
  },
  { 
    id: 2, 
    name: 'SSH Server', 
    username: 'root', 
    password: '********', 
    type: 'Server Access', 
    lastUpdated: '2023-04-22',
    isSensitive: true
  },
  { 
    id: 3, 
    name: 'Database User', 
    username: 'dbuser', 
    password: 'dbpass123', 
    type: 'Database', 
    lastUpdated: '2023-06-01',
    isSensitive: false
  },
];

const ClientDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('info');
  
  // Fallback for no ID parameter
  if (!id) {
    return <div>Client ID not provided</div>;
  }
  
  const client = getClientDetails(id);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/clients">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-gray-900">{client.name}</h1>
            <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
              {client.status === 'active' ? 'Activo' : 'Inactivo'}
            </Badge>
          </div>
          <p className="text-gray-500 mt-1">NIT: {client.nit}</p>
        </div>
        
        <div className="flex space-x-2 ml-auto">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200">
            <Trash2 className="h-4 w-4 mr-2" />
            Eliminar
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="info" className="data-[state=active]:bg-white">
            <Info className="h-4 w-4 mr-2" />
            Información
          </TabsTrigger>
          <TabsTrigger value="servers" className="data-[state=active]:bg-white">
            <Server className="h-4 w-4 mr-2" />
            Servidores
          </TabsTrigger>
          <TabsTrigger value="networks" className="data-[state=active]:bg-white">
            <Network className="h-4 w-4 mr-2" />
            Redes
          </TabsTrigger>
          <TabsTrigger value="credentials" className="data-[state=active]:bg-white">
            <Key className="h-4 w-4 mr-2" />
            Credenciales
          </TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-white">
            <FileText className="h-4 w-4 mr-2" />
            Documentos
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2 text-primary" />
                  Información general
                </CardTitle>
                <CardDescription>Datos básicos del cliente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Nombre</h3>
                      <p className="mt-1">{client.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">NIT</h3>
                      <p className="mt-1">{client.nit}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Dirección</h3>
                      <p className="mt-1 flex items-start">
                        <MapPin className="h-4 w-4 text-gray-400 mr-1 mt-0.5" />
                        {client.address}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Sitio web</h3>
                      <p className="mt-1 flex items-center">
                        <Globe className="h-4 w-4 text-gray-400 mr-1" />
                        <a href={`https://${client.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {client.website}
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Contacto principal</h3>
                      <p className="mt-1">{client.contactName}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Correo electrónico</h3>
                      <p className="mt-1 flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-1" />
                        <a href={`mailto:${client.contactEmail}`} className="text-primary hover:underline">
                          {client.contactEmail}
                        </a>
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Teléfono</h3>
                      <p className="mt-1 flex items-center">
                        <Phone className="h-4 w-4 text-gray-400 mr-1" />
                        {client.contactPhone}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Fecha de registro</h3>
                      <p className="mt-1">{client.createdAt}</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Descripción</h3>
                  <p className="mt-1 text-gray-700">{client.description}</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <DashboardCard title="Resumen" hover="glow">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Server className="h-4 w-4 text-indigo-500 mr-2" />
                      <span className="text-sm">Servidores</span>
                    </div>
                    <span className="font-medium">{servers.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Network className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-sm">Redes</span>
                    </div>
                    <span className="font-medium">{networks.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Key className="h-4 w-4 text-amber-500 mr-2" />
                      <span className="text-sm">Credenciales</span>
                    </div>
                    <span className="font-medium">{credentials.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Usuarios asignados</span>
                    </div>
                    <span className="font-medium">4</span>
                  </div>
                </div>
              </DashboardCard>
              
              <DashboardCard
                title="Información sensible"
                subtitle="Datos protegidos"
                hover="glow"
                className="bg-gray-50"
              >
                <div className="space-y-2 text-sm">
                  <div className="flex items-start">
                    <Shield className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Información protegida</p>
                      <p className="text-gray-500">Este cliente tiene datos sensibles que requieren aprobación para su acceso.</p>
                    </div>
                  </div>
                  
                  <div className="pl-6 space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Servidores sensibles:</span>
                      <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                        {servers.filter(s => s.isSensitive).length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Redes sensibles:</span>
                      <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                        {networks.filter(n => n.isSensitive).length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Credenciales sensibles:</span>
                      <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                        {credentials.filter(c => c.isSensitive).length}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button size="sm" className="w-full">
                    <ClipboardCheck className="h-4 w-4 mr-2" />
                    Políticas de acceso
                  </Button>
                </div>
              </DashboardCard>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="servers" className="animate-fade-in space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Servidores</h2>
            <Button>
              <Server className="h-4 w-4 mr-2" />
              Agregar servidor
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Sistema Operativo</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Sensible</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {servers.map((server) => (
                    <TableRow key={server.id}>
                      <TableCell className="font-medium">{server.name}</TableCell>
                      <TableCell>{server.ip}</TableCell>
                      <TableCell>{server.os}</TableCell>
                      <TableCell>{server.role}</TableCell>
                      <TableCell>{server.location}</TableCell>
                      <TableCell>
                        {server.isSensitive ? (
                          <Badge variant="outline" className="border-red-200 bg-red-50 text-red-500">Sí</Badge>
                        ) : (
                          <Badge variant="outline" className="border-green-200 bg-green-50 text-green-600">No</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="networks" className="animate-fade-in space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Redes</h2>
            <Button>
              <Network className="h-4 w-4 mr-2" />
              Agregar red
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Subred</TableHead>
                    <TableHead>Gateway</TableHead>
                    <TableHead>VLAN</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Sensible</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {networks.map((network) => (
                    <TableRow key={network.id}>
                      <TableCell className="font-medium">{network.name}</TableCell>
                      <TableCell>{network.subnet}</TableCell>
                      <TableCell>{network.gateway}</TableCell>
                      <TableCell>{network.vlan}</TableCell>
                      <TableCell>{network.type}</TableCell>
                      <TableCell>
                        {network.isSensitive ? (
                          <Badge variant="outline" className="border-red-200 bg-red-50 text-red-500">Sí</Badge>
                        ) : (
                          <Badge variant="outline" className="border-green-200 bg-green-50 text-green-600">No</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="credentials" className="animate-fade-in space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Credenciales</h2>
            <Button>
              <Key className="h-4 w-4 mr-2" />
              Agregar credencial
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Contraseña</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Última actualización</TableHead>
                    <TableHead>Sensible</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {credentials.map((credential) => (
                    <TableRow key={credential.id}>
                      <TableCell className="font-medium">{credential.name}</TableCell>
                      <TableCell>{credential.username}</TableCell>
                      <TableCell>
                        {credential.isSensitive ? (
                          <span className="flex items-center">
                            <span className="text-gray-400">********</span>
                            <Button variant="ghost" size="sm" className="ml-2 h-6 px-2">
                              Ver
                            </Button>
                          </span>
                        ) : (
                          credential.password
                        )}
                      </TableCell>
                      <TableCell>{credential.type}</TableCell>
                      <TableCell>{credential.lastUpdated}</TableCell>
                      <TableCell>
                        {credential.isSensitive ? (
                          <Badge variant="outline" className="border-red-200 bg-red-50 text-red-500">Sí</Badge>
                        ) : (
                          <Badge variant="outline" className="border-green-200 bg-green-50 text-green-600">No</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="animate-fade-in space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Documentos</h2>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Agregar documento
            </Button>
          </div>
          
          <div className="flex items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center">
              <FileText className="h-10 w-10 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">No hay documentos</h3>
              <p className="text-gray-500 mt-1">Comience por agregar un documento</p>
              <Button className="mt-4">Subir documento</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDetails;
