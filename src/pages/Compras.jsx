import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, Search, Filter, ShoppingBag, Eye, Edit, FileText, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/contexts/DataContext';

const Compras = () => {
  const { toast } = useToast();
  const { compras } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const handleFeatureClick = (feature) => {
    toast({
      title: `🛍️ ${feature}`,
      description: "🚧 Esta función no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀"
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Entregada':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'En Tránsito':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Pendiente':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Cancelada':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const filteredCompras = compras.filter(compra =>
    compra.proveedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    compra.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Compras - Sistema de Gestión Empresarial</title>
        <meta name="description" content="Gestión completa de compras con seguimiento de proveedores, entregas y control de inventario." />
      </Helmet>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold gradient-text">Compras</h1>
            <p className="text-slate-400 mt-2">Gestiona tus órdenes de compra y recepción de mercancía</p>
          </div>
          <Button 
            onClick={() => handleFeatureClick('Nueva Compra')}
            className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Compra
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Compras del Mes', value: formatCurrency(compras.reduce((acc, c) => acc + parseFloat(c.total), 0)), color: 'from-pink-500 to-rose-600', change: '+15.7%' },
            { label: 'Órdenes Entregadas', value: compras.filter(c => c.estado === 'Entregada').length, color: 'from-green-500 to-emerald-600', change: '+10.2%' },
            { label: 'Órdenes Pendientes', value: compras.filter(c => c.estado === 'Pendiente').length, color: 'from-yellow-500 to-orange-600', change: '-5.1%' },
            { label: 'Costo Promedio', value: formatCurrency(compras.length > 0 ? compras.reduce((acc, c) => acc + parseFloat(c.total), 0) / compras.length : 0), color: 'from-purple-500 to-violet-600', change: '+3.4%' }
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
                    placeholder="Buscar por proveedor o número de compra..."
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
                  <Download className="w-4 h-4 mr-2" />
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
                <ShoppingBag className="w-5 h-5 mr-2" />
                Registro de Compras
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">Número</TableHead>
                      <TableHead className="text-slate-300">Proveedor</TableHead>
                      <TableHead className="text-slate-300">Fecha</TableHead>
                      <TableHead className="text-slate-300">Fecha Entrega</TableHead>
                      <TableHead className="text-slate-300">Productos</TableHead>
                      <TableHead className="text-slate-300">Total</TableHead>
                      <TableHead className="text-slate-300">Estado</TableHead>
                      <TableHead className="text-slate-300">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompras.map((compra, index) => (
                      <motion.tr
                        key={compra.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="border-slate-700 hover:bg-slate-800/50"
                      >
                        <TableCell className="font-medium text-blue-400">{compra.id}</TableCell>
                        <TableCell className="text-white">{compra.proveedor}</TableCell>
                        <TableCell className="text-slate-300">{compra.fecha}</TableCell>
                        <TableCell className="text-slate-300">{compra.fechaEntrega}</TableCell>
                        <TableCell className="text-slate-300">{compra.productos}</TableCell>
                        <TableCell className="font-bold text-green-400">{formatCurrency(compra.total)}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs border ${getEstadoColor(compra.estado)}`}>
                            {compra.estado}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFeatureClick('Ver Compra')}
                              className="text-blue-400 hover:bg-blue-500/20"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFeatureClick('Editar Compra')}
                              className="text-yellow-400 hover:bg-yellow-500/20"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFeatureClick('Ver Documento')}
                              className="text-green-400 hover:bg-green-500/20"
                            >
                              <FileText className="w-4 h-4" />
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

export default Compras;