import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, Search, Filter, Package, Eye, Edit, Trash2, Tag, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/contexts/DataContext';

const Productos = () => {
  const { toast } = useToast();
  const { productos, deleteData } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const handleFeatureClick = (feature) => {
    toast({
      title: `📦 ${feature}`,
      description: "🚧 Esta función no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀"
    });
  };

  const handleDelete = (id) => {
    deleteData('productos', id);
    toast({
      title: "🗑️ Producto Eliminado",
      description: "El producto ha sido eliminado exitosamente."
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const getEstadoColor = (stock) => {
    if (stock === 0) return 'bg-red-500/20 text-red-400 border-red-500/30';
    if (stock < 10) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-green-500/20 text-green-400 border-green-500/30';
  };
  
  const getEstadoLabel = (stock) => {
    if (stock === 0) return 'Sin Stock';
    if (stock < 10) return 'Bajo Stock';
    return 'Activo';
  };

  const filteredProductos = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.marca.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Productos - Sistema de Gestión Empresarial</title>
        <meta name="description" content="Gestión completa de inventario con control de stock, categorías, marcas y ubicaciones." />
      </Helmet>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold gradient-text">Productos</h1>
            <p className="text-slate-400 mt-2">Gestiona tu inventario y catálogo de productos</p>
          </div>
          <Button 
            onClick={() => handleFeatureClick('Nuevo Producto')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Producto
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Productos', value: productos.length, color: 'from-blue-500 to-cyan-600', icon: Package },
            { label: 'Categorías', value: [...new Set(productos.map(p => p.categoria))].length, color: 'from-green-500 to-emerald-600', icon: Tag },
            { label: 'Bajo Stock', value: productos.filter(p => p.stock < 10 && p.stock > 0).length, color: 'from-yellow-500 to-orange-600', icon: Package },
            { label: 'Ubicaciones', value: [...new Set(productos.map(p => p.ubicacion))].length, color: 'from-purple-500 to-violet-600', icon: MapPin }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
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
                      </div>
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-effect border-slate-700">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleFeatureClick('Filtro por Marca')}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Por Marca
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleFeatureClick('Filtro por Categoría')}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Por Categoría
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleFeatureClick('Filtro por Presentación')}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Por Presentación
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleFeatureClick('Filtro por Ubicación')}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Por Ubicación
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

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
                    placeholder="Buscar productos por nombre, código, categoría o marca..."
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
                  Filtros Avanzados
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
                <Package className="w-5 h-5 mr-2" />
                Catálogo de Productos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">Código</TableHead>
                      <TableHead className="text-slate-300">Producto</TableHead>
                      <TableHead className="text-slate-300">Categoría</TableHead>
                      <TableHead className="text-slate-300">Marca</TableHead>
                      <TableHead className="text-slate-300">Stock</TableHead>
                      <TableHead className="text-slate-300">Precio</TableHead>
                      <TableHead className="text-slate-300">Estado</TableHead>
                      <TableHead className="text-slate-300">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProductos.map((producto, index) => (
                      <motion.tr
                        key={producto.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="border-slate-700 hover:bg-slate-800/50"
                      >
                        <TableCell className="font-medium text-blue-400">{producto.id}</TableCell>
                        <TableCell className="text-white font-medium">{producto.nombre}</TableCell>
                        <TableCell className="text-slate-300">{producto.categoria}</TableCell>
                        <TableCell className="text-slate-300">{producto.marca}</TableCell>
                        <TableCell className={`font-bold ${
                          producto.stock === 0 ? 'text-red-400' : 
                          producto.stock < 10 ? 'text-yellow-400' : 'text-green-400'
                        }`}>
                          {producto.stock}
                        </TableCell>
                        <TableCell className="font-bold text-green-400">{formatCurrency(producto.precio)}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs border ${getEstadoColor(producto.stock)}`}>
                            {getEstadoLabel(producto.stock)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFeatureClick('Ver Producto')}
                              className="text-blue-400 hover:bg-blue-500/20"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFeatureClick('Editar Producto')}
                              className="text-yellow-400 hover:bg-yellow-500/20"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(producto.id)}
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

export default Productos;