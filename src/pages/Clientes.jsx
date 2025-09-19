import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, Search, Filter, UserCheck, Eye, Edit, Trash2, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/contexts/DataContext';

const Clientes = () => {
  const { toast } = useToast();
  const { clientes, deleteData } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const handleFeatureClick = (feature) => {
    toast({
      title: `👥 ${feature}`,
      description: "🚧 Esta función no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀"
    });
  };

  const handleDelete = (id) => {
    deleteData('clientes', id);
    toast({
      title: "🗑️ Cliente Eliminado",
      description: "El cliente ha sido eliminado exitosamente."
    });
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Activo':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Inactivo':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Suspendido':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'Corporativo':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Industrial':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Comercial':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Tecnología':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const filteredClientes = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Clientes - Sistema de Gestión Empresarial</title>
        <meta name="description" content="Gestión completa de clientes con historial de compras, contactos y seguimiento comercial." />
      </Helmet>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold gradient-text">Clientes</h1>
            <p className="text-slate-400 mt-2">Gestiona tu cartera de clientes y relaciones comerciales</p>
          </div>
          <Button 
            onClick={() => handleFeatureClick('Nuevo Cliente')}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Cliente
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Clientes', value: clientes.length, color: 'from-blue-500 to-cyan-600', change: '+15.3%' },
            { label: 'Clientes Activos', value: clientes.filter(c => c.estado === 'Activo').length, color: 'from-green-500 to-emerald-600', change: '+8.2%' },
            { label: 'Nuevos este Mes', value: '2', color: 'from-purple-500 to-violet-600', change: '+12.5%' },
            { label: 'Valor Promedio', value: '$2,340', color: 'from-orange-500 to-red-600', change: '+5.7%' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-effect border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">{stat.label}</p>
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                      <p className={`text-xs mt-1 ${
                        stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {stat.change} vs mes anterior
                      </p>
                    </div>
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color}`}></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-effect border-slate-700">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar por nombre, contacto, email o código..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-800/50 border-slate-600 text-white"
                  />
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => handleFeatureClick('Filtros Avanzados')}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleFeatureClick('Exportar Clientes')}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Exportar
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass-effect border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <UserCheck className="w-5 h-5 mr-2" />
                Directorio de Clientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">Código</TableHead>
                      <TableHead className="text-slate-300">Empresa</TableHead>
                      <TableHead className="text-slate-300">Contacto</TableHead>
                      <TableHead className="text-slate-300">Email</TableHead>
                      <TableHead className="text-slate-300">Teléfono</TableHead>
                      <TableHead className="text-slate-300">Tipo</TableHead>
                      <TableHead className="text-slate-300">Estado</TableHead>
                      <TableHead className="text-slate-300">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClientes.map((cliente, index) => (
                      <motion.tr
                        key={cliente.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="border-slate-700 hover:bg-slate-800/50"
                      >
                        <TableCell className="font-medium text-blue-400">{cliente.id}</TableCell>
                        <TableCell className="text-white font-medium">{cliente.nombre}</TableCell>
                        <TableCell className="text-slate-300">{cliente.contacto}</TableCell>
                        <TableCell className="text-slate-300">{cliente.email}</TableCell>
                        <TableCell className="text-slate-300">{cliente.telefono}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs border ${getTipoColor(cliente.tipo)}`}>
                            {cliente.tipo}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs border ${getEstadoColor(cliente.estado)}`}>
                            {cliente.estado}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFeatureClick('Ver Cliente')}
                              className="text-blue-400 hover:bg-blue-500/20"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFeatureClick('Editar Cliente')}
                              className="text-yellow-400 hover:bg-yellow-500/20"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(cliente.id)}
                              className="text-red-400 hover:bg-red-500/20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default Clientes;