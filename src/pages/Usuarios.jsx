import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, Search, Filter, Users, Eye, Edit, Trash2, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';

const Usuarios = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const handleFeatureClick = (feature) => {
    toast({
      title: `👤 ${feature}`,
      description: "🚧 Esta función no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀"
    });
  };

  const usuarios = [
    {
      id: 'USR-001',
      nombre: 'Admin',
      email: 'admin@miempresa.com',
      rol: 'Administrador',
      estado: 'Activo',
      ultimoAcceso: '2024-01-18 10:30 AM'
    },
    {
      id: 'USR-002',
      nombre: 'Vendedor 1',
      email: 'vendedor1@miempresa.com',
      rol: 'Ventas',
      estado: 'Activo',
      ultimoAcceso: '2024-01-18 09:45 AM'
    },
    {
      id: 'USR-003',
      nombre: 'Almacenista',
      email: 'almacen@miempresa.com',
      rol: 'Almacén',
      estado: 'Activo',
      ultimoAcceso: '2024-01-17 05:15 PM'
    },
    {
      id: 'USR-004',
      nombre: 'Contador',
      email: 'contador@miempresa.com',
      rol: 'Contabilidad',
      estado: 'Inactivo',
      ultimoAcceso: '2023-12-20 11:00 AM'
    },
    {
      id: 'USR-005',
      nombre: 'Gerente de Ventas',
      email: 'gerente.ventas@miempresa.com',
      rol: 'Gerencia',
      estado: 'Activo',
      ultimoAcceso: '2024-01-18 10:00 AM'
    }
  ];

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Activo':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Inactivo':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getRolColor = (rol) => {
    switch (rol) {
      case 'Administrador':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Ventas':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Almacén':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Contabilidad':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Gerencia':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.rol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Usuarios - Sistema de Gestión Empresarial</title>
        <meta name="description" content="Gestión de usuarios y roles del sistema, con control de acceso y permisos." />
      </Helmet>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold gradient-text">Módulo de Usuarios</h1>
            <p className="text-slate-400 mt-2">Gestiona los accesos y permisos de tu equipo</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => handleFeatureClick('Gestionar Roles')}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Shield className="w-4 h-4 mr-2" />
              Gestionar Roles
            </Button>
            <Button 
              onClick={() => handleFeatureClick('Nuevo Usuario')}
              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Usuario
            </Button>
          </div>
        </motion.div>

        {/* Filtros y Búsqueda */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-effect border-slate-700">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar por nombre, email o rol..."
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
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabla de Usuarios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-effect border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Users className="w-5 h-5 mr-2" />
                Lista de Usuarios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">Nombre</TableHead>
                      <TableHead className="text-slate-300">Email</TableHead>
                      <TableHead className="text-slate-300">Rol</TableHead>
                      <TableHead className="text-slate-300">Estado</TableHead>
                      <TableHead className="text-slate-300">Último Acceso</TableHead>
                      <TableHead className="text-slate-300">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsuarios.map((usuario, index) => (
                      <motion.tr
                        key={usuario.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="border-slate-700 hover:bg-slate-800/50"
                      >
                        <TableCell className="font-medium text-white">{usuario.nombre}</TableCell>
                        <TableCell className="text-slate-300">{usuario.email}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs border ${getRolColor(usuario.rol)}`}>
                            {usuario.rol}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs border ${getEstadoColor(usuario.estado)}`}>
                            {usuario.estado}
                          </span>
                        </TableCell>
                        <TableCell className="text-slate-300">{usuario.ultimoAcceso}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFeatureClick('Ver Usuario')}
                              className="text-blue-400 hover:bg-blue-500/20"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFeatureClick('Editar Usuario')}
                              className="text-yellow-400 hover:bg-yellow-500/20"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFeatureClick('Eliminar Usuario')}
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

export default Usuarios;