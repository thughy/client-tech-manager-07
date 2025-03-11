
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
  Shield,
  Database,
  Router,
  Wifi,
  Monitor
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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
    id: 3, 
    name: 'Red DMZ', 
    subnet: '192.168.3.0/24', 
    gateway: '192.168.3.1', 
    vlan: '30', 
    type: 'DMZ',
    isSensitive: true
  },
];

// Mock switches data
const switches = [
  { 
    id: 1, 
    name: 'SW-CORE-01', 
    ip: '192.168.1.254', 
    brand: 'Cisco', 
    model: 'Catalyst 3850', 
    ports: 48, 
    location: 'Datacenter 1',
    isSensitive: false
  },
  { 
    id: 2, 
    name: 'SW-ACCESS-01', 
    ip: '192.168.1.253', 
    brand: 'HP', 
    model: 'Aruba 2930F', 
    ports: 24, 
    location: 'Oficina principal',
    isSensitive: true
  },
];

// Mock wifi data
const wifiNetworks = [
  { 
    id: 1, 
    name: 'ACME-CORP', 
    ssid: 'ACME-CORP', 
    security: 'WPA2-Enterprise', 
    bandWidth: '5GHz', 
    coverage: 'Oficina principal',
    isSensitive: true
  },
  { 
    id: 2, 
    name: 'ACME-GUEST', 
    ssid: 'ACME-GUEST', 
    security: 'WPA2-PSK', 
    bandWidth: '2.4GHz', 
    coverage: 'Toda la empresa',
    isSensitive: false
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
  const [activeTechnicalTab, setActiveTechnicalTab] = useState('servers');
  
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
        <TabsList className="bg-muted/50 p-1 w-full sm:w-auto flex flex-wrap gap-1">
          <TabsTrigger value="info" className="data-[state=active]:bg-white">
            <Info className="h-4 w-4 mr-2" />
            Información
          </TabsTrigger>
          <TabsTrigger value="technical" className="data-[state=active]:bg-white">
            <Database className="h-4 w-4 mr-2" />
            Información Técnica
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
        
        {/* Tab de Información General */}
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
                      <Router className="h-4 w-4 text-purple-500 mr-2" />
                      <span className="text-sm">Switches</span>
                    </div>
                    <span className="font-medium">{switches.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Wifi className="h-4 w-4 text-teal-500 mr-2" />
                      <span className="text-sm">Redes WiFi</span>
                    </div>
                    <span className="font-medium">{wifiNetworks.length}</span>
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
                      <span>Switches sensibles:</span>
                      <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                        {switches.filter(s => s.isSensitive).length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Redes WiFi sensibles:</span>
                      <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                        {wifiNetworks.filter(w => w.isSensitive).length}
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
        
        {/* Nuevo Tab de Información Técnica con subtabs */}
        <TabsContent value="technical" className="animate-fade-in space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-primary" />
                  Información Técnica
                </CardTitle>
                <Tabs 
                  value={activeTechnicalTab} 
                  onValueChange={setActiveTechnicalTab}
                  className="mt-4 sm:mt-0"
                >
                  <TabsList className="bg-muted/40 p-1">
                    <TabsTrigger value="servers" className="text-xs py-1.5 px-2">
                      <Server className="h-3.5 w-3.5 mr-1" />
                      Servidores
                    </TabsTrigger>
                    <TabsTrigger value="networks" className="text-xs py-1.5 px-2">
                      <Network className="h-3.5 w-3.5 mr-1" />
                      Redes
                    </TabsTrigger>
                    <TabsTrigger value="switches" className="text-xs py-1.5 px-2">
                      <Router className="h-3.5 w-3.5 mr-1" />
                      Switches
                    </TabsTrigger>
                    <TabsTrigger value="wifi" className="text-xs py-1.5 px-2">
                      <Wifi className="h-3.5 w-3.5 mr-1" />
                      WiFi
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <TabsContent value="servers" className="mt-0 p-0">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                  <h3 className="font-medium">Servidores</h3>
                  <Button size="sm">
                    <Server className="h-4 w-4 mr-2" />
                    Agregar servidor
                  </Button>
                </div>
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
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge variant="outline" className="border-red-200 bg-red-50 text-red-500">Sí</Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">Requiere autorización para acceder</p>
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            <Badge variant="outline" className="border-green-200 bg-green-50 text-green-600">No</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="networks" className="mt-0 p-0">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                  <h3 className="font-medium">Redes</h3>
                  <Button size="sm">
                    <Network className="h-4 w-4 mr-2" />
                    Agregar red
                  </Button>
                </div>
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
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge variant="outline" className="border-red-200 bg-red-50 text-red-500">Sí</Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">Requiere autorización para acceder</p>
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            <Badge variant="outline" className="border-green-200 bg-green-50 text-green-600">No</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="switches" className="mt-0 p-0">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                  <h3 className="font-medium">Switches</h3>
                  <Button size="sm">
                    <Router className="h-4 w-4 mr-2" />
                    Agregar switch
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>IP</TableHead>
                      <TableHead>Marca</TableHead>
                      <TableHead>Modelo</TableHead>
                      <TableHead>Puertos</TableHead>
                      <TableHead>Ubicación</TableHead>
                      <TableHead>Sensible</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {switches.map((sw) => (
                      <TableRow key={sw.id}>
                        <TableCell className="font-medium">{sw.name}</TableCell>
                        <TableCell>{sw.ip}</TableCell>
                        <TableCell>{sw.brand}</TableCell>
                        <TableCell>{sw.model}</TableCell>
                        <TableCell>{sw.ports}</TableCell>
                        <TableCell>{sw.location}</TableCell>
                        <TableCell>
                          {sw.isSensitive ? (
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge variant="outline" className="border-red-200 bg-red-50 text-red-500">Sí</Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">Requiere autorización para acceder</p>
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            <Badge variant="outline" className="border-green-200 bg-green-50 text-green-600">No</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="wifi" className="mt-0 p-0">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                  <h3 className="font-medium">Redes WiFi</h3>
                  <Button size="sm">
                    <Wifi className="h-4 w-4 mr-2" />
                    Agregar red WiFi
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>SSID</TableHead>
                      <TableHead>Seguridad</TableHead>
                      <TableHead>Banda</TableHead>
                      <TableHead>Cobertura</TableHead>
                      <TableHead>Sensible</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {wifiNetworks.map((wifi) => (
                      <TableRow key={wifi.id}>
                        <TableCell className="font-medium">{wifi.name}</TableCell>
                        <TableCell>{wifi.ssid}</TableCell>
                        <TableCell>{wifi.security}</TableCell>
                        <TableCell>{wifi.bandWidth}</TableCell>
                        <TableCell>{wifi.coverage}</TableCell>
                        <TableCell>
                          {wifi.isSensitive ? (
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge variant="outline" className="border-red-200 bg-red-50 text-red-500">Sí</Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">Requiere autorización para acceder</p>
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            <Badge variant="outline" className="border-green-200 bg-green-50 text-green-600">No</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tab de Credenciales */}
        <TabsContent value="credentials" className="animate-fade-in space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Credenciales</h2>
            <Button>
              <Key className="h-4 w-4 mr-2" />
              Agregar credencial
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Credenciales de acceso</CardTitle>
              <CardDescription>Información de acceso a sistemas y servicios</CardDescription>
            </CardHeader>
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
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="flex items-center">
                                <span className="text-gray-400">********</span>
                                <Button variant="ghost" size="sm" className="ml-2 h-6 px-2">
                                  Solicitar acceso
                                </Button>
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Esta credencial requiere aprobación para su visualización</p>
                            </TooltipContent>
                          </Tooltip>
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
        
        {/* Tab de Documentos */}
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
