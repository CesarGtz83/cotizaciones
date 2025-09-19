import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, Search, Filter, Truck, Eye, Edit, Trash2, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/contexts/DataContext';

const Proveedores = () => {
  const { toast } = useToast();
  const { proveedores, deleteData } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const handleFeatureClick = (feature) => {
    toast({
      title: `🚚 ${feature}`,
      description: "🚧 Esta función no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀"
    });
  };

  const handleDelete = (id) => {
    deleteData('proveedores', id);
    toast({
      title: "🗑️ Proveedor Eliminado",
      description: "El proveedor ha sido eliminado exitosamente."
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

  const getCategoriaColor = (categoria) => {
    switch (categoria) {
      case 'Electrónicos':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Oficina':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Importación':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Industrial':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'Tecnología':
        return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const filteredProveedores = proveedores.filter(proveedor =>
    proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proveedor.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proveedor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proveedor.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proveedor.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Proveedores - Sistema de Gestión Empresarial</title>
        <meta name="description" content="Gestión completa de proveedores con historial de compras, tiempos de entrega y evaluación de desempeño." />
      </Helmet>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold gradient-text">Proveedores</h1>
            <p className="text-slate-400 mt-2">Gestiona tu red de proveedores y cadena de suministro</p>
          </div>
          <Button 
            onClick={() => handleFeatureClick('Nuevo Proveedor')}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Proveedor
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Proveedores', value: proveedores.length, color: 'from-orange-500 to-red-600', change: '+8.3%' },
            { label: 'Proveedores Activos', value: proveedores.filter(p => p.estado === 'Activo').length, color: 'from-green-500 to-emerald-600', change: '+5.2%' },
            { label: 'Nuevos este Mes', value: '2', color: 'from-blue-500 to-cyan-600', change: '+12.5%' },
            { label: 'Compras del Mes', value: '$89,340', color: 'from-purple-500 to-violet-600', change: '+15.7%' }
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
                    placeholder="Buscar por nombre, contacto, email o categoría..."
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
                  onClick={() => handleFeatureClick('Reporte Compras Excel')}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Reporte Excel
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
                <Truck className="w-5 h-5 mr-2" />
                Directorio de Proveedores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">Código</TableHead>
                      <TableHead className="text-slate-300">Proveedor</TableHead>
                      <TableHead className="text-slate-300">Contacto</TableHead>
                      <TableHead className="text-slate-300">Email</TableHead>
                      <TableHead className="text-slate-300">Categoría</TableHead>
                      <TableHead className="text-slate-300">Estado</TableHead>
                      <TableHead className="text-slate-300">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProveedores.map((proveedor, index) => (
                      <motion.tr
                        key={proveedor.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="border-slate-700 hover:bg-slate-800/50"
                      >
                        <TableCell className="font-medium text-blue-400">{proveedor.id}</TableCell>
                        <TableCell className="text-white font-medium">{proveedor.nombre}</TableCell>
                        <TableCell className="text-slate-300">{proveedor.contacto}</TableCell>
                        <TableCell className="text-slate-300">{proveedor.email}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs border ${getCategoriaColor(proveedor.categoria)}`}>
                            {proveedor.categoria}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs border ${getEstadoColor(proveedor.estado)}`}>
                            {proveedor.estado}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFeatureClick('Ver Proveedor')}
                              className="text-blue-400 hover:bg-blue-500/20"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFeatureClick('Editar Proveedor')}
                              className="text-yellow-400 hover:bg-yellow-500/20"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(proveedor.id)}
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

export default Proveedores;