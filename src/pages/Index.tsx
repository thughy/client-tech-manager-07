
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Users, Server, Network, ShieldCheck, Clock, ArrowUpRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const activityData = [
  { name: 'Lun', value: 12 },
  { name: 'Mar', value: 19 },
  { name: 'Mié', value: 10 },
  { name: 'Jue', value: 22 },
  { name: 'Vie', value: 15 },
  { name: 'Sáb', value: 8 },
  { name: 'Dom', value: 5 },
];

const credentialRequests = [
  { name: 'Aprobadas', value: 65 },
  { name: 'Pendientes', value: 15 },
  { name: 'Rechazadas', value: 20 },
];

const recentActivity = [
  { 
    id: 1, 
    action: 'Nuevo cliente creado', 
    user: 'Juan Perez', 
    time: '10:30 AM', 
    client: 'Acme Corp' 
  },
  { 
    id: 2, 
    action: 'Solicitud de credencial aprobada', 
    user: 'María López', 
    time: '09:15 AM', 
    client: 'Tech Solutions' 
  },
  { 
    id: 3, 
    action: 'Servidor actualizado', 
    user: 'Carlos Ramos', 
    time: 'Ayer', 
    client: 'Inventure Inc' 
  },
  { 
    id: 4, 
    action: 'Nuevo técnico asignado', 
    user: 'Admin', 
    time: 'Ayer', 
    client: 'Digital Services' 
  },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-100 shadow-sm rounded-md text-xs">
        <p>{`${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const Index = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Vista general del sistema de gestión</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">Exportar datos</Button>
          <Button>Nuevo cliente</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          hover="lift"
          title="Clientes"
          subtitle="Total activos"
          icon={<Users className="h-5 w-5 text-primary" />}
        >
          <div className="flex items-end justify-between">
            <div className="text-3xl font-semibold">24</div>
            <div className="text-green-500 flex items-center text-sm font-medium">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              8%
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard
          hover="lift"
          title="Servidores"
          subtitle="Monitoreados"
          icon={<Server className="h-5 w-5 text-indigo-500" />}
        >
          <div className="flex items-end justify-between">
            <div className="text-3xl font-semibold">47</div>
            <div className="text-green-500 flex items-center text-sm font-medium">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              12%
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard
          hover="lift"
          title="Redes"
          subtitle="Configuradas"
          icon={<Network className="h-5 w-5 text-blue-500" />}
        >
          <div className="flex items-end justify-between">
            <div className="text-3xl font-semibold">35</div>
            <div className="text-green-500 flex items-center text-sm font-medium">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              5%
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard
          hover="lift"
          title="Solicitudes"
          subtitle="Pendientes"
          icon={<ShieldCheck className="h-5 w-5 text-amber-500" />}
        >
          <div className="flex items-end justify-between">
            <div className="text-3xl font-semibold">7</div>
            <div className="text-red-500 flex items-center text-sm font-medium">
              <ArrowUpRight className="h-4 w-4 mr-1 transform rotate-45" />
              3%
            </div>
          </div>
        </DashboardCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardCard
          className="lg:col-span-2"
          title="Actividad del sistema"
          subtitle="Últimos 7 días"
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
        
        <DashboardCard
          title="Solicitudes de credenciales"
          subtitle="Distribución actual"
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={credentialRequests}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="value" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardCard
          className="lg:col-span-2"
          title="Actividad reciente"
          subtitle="Últimas acciones en el sistema"
        >
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="bg-blue-50 p-2 rounded-full">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium">{activity.action}</h4>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {activity.user} • Cliente: {activity.client}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5">
              Ver toda la actividad
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </DashboardCard>
        
        <DashboardCard
          title="Acceso rápido"
          subtitle="Acciones frecuentes"
        >
          <div className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Gestionar clientes
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Revisar solicitudes
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Server className="mr-2 h-4 w-4" />
              Estado de servidores
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Network className="mr-2 h-4 w-4" />
              Estado de redes
            </Button>
          </div>
          <Separator className="my-4" />
          <div className="text-sm text-gray-500">
            <h4 className="font-medium text-gray-900 mb-1">Soporte técnico</h4>
            <p>¿Necesita ayuda con el sistema?</p>
            <Button className="mt-2 w-full">Contactar soporte</Button>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Index;
