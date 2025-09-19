import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, Search, Filter, FileText, Eye, Download, Trash2, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';

const Documentos = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const handleFeatureClick = (feature) => {
    toast({
      title: `📄 ${feature}`,
      description: "🚧 Esta función no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀"
    });
  };

  const documentos = [
    {
      id: 'DOC-001',
      nombre: 'Factura V-001.pdf',
      tipo: 'Factura de Venta',
      fecha: '2024-01-15',
      tamaño: '128 KB',
      asociado: 'V-001',
      creadoPor: 'Admin'
    },
    {
      id: 'DOC-002',
      nombre: 'Contrato Cliente ABC.docx',
      tipo: 'Contrato',
      fecha: '2024-01-14',
      tamaño: '2.3 MB',
      asociado: 'CLI-001',
      creadoPor: 'Admin'
    },
    {
      id: 'DOC-003',
      nombre: 'Orden de Compra C-001.pdf',
      tipo: 'Orden de Compra',
      fecha: '2024-01-15',
      tamaño: '98 KB',
      asociado: 'C-001',
      creadoPor: 'Admin'
    },
    {
      id: 'DOC-004',
      nombre: 'Reporte Ventas Enero.xlsx',
      tipo: 'Reporte',
      fecha: '2024-02-01',
      tamaño: '1.1 MB',
      asociado: 'N/A',
      creadoPor: 'Sistema'
    },
    {
      id: 'DOC-005',
      nombre: 'Cotización COT-002.pdf',
      tipo: 'Cotización',
      fecha: '2024-01-14',
      tamaño: '150 KB',
      asociado: 'COT-002',
      creadoPor: 'Admin'
    }
  ];

  const getTipoColor = (tipo) => {
    if (tipo.includes('Factura')) return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (tipo.includes('Contrato')) return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    if (tipo.includes('Orden')) return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    if (tipo.includes('Reporte')) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    if (tipo.includes('Cotización')) return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
    return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const filteredDocumentos = documentos.filter(doc =>
    doc.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.asociado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Documentos - Sistema de Gestión Empresarial</title>
        <meta name="description" content="Gestión centralizada de todos los documentos empresariales, incluyendo facturas, contratos y reportes." />
      </Helmet>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold gradient-text">Gestor de Documentos</h1>
            <p className="text-slate-400 mt-2">Centraliza y organiza todos tus archivos importantes</p>
          </div>
          <Button 
            onClick={() => handleFeatureClick('Subir Documento')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Upload className="w-4 h-4 mr-2" />
            Subir Documento
          </Button>
        </motion.div>

        {/* Estadísticas de Documentos */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Documentos', value: '1,452', color: 'from-blue-500 to-cyan-600' },
            { label: 'Facturas', value: '567', color: 'from-green-500 to-emerald-600' },
            { label: 'Contratos', value: '123', color: 'from-purple-500 to-violet-600' },
            { label: 'Espacio Usado', value: '2.5 GB', color: 'from-orange-500 to-red-600' }
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
                    </div>
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color}`}></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filtros y Búsqueda */}
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
                    placeholder="Buscar por nombre, tipo o elemento asociado..."
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

        {/* Tabla de Documentos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass-effect border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <FileText className="w-5 h-5 mr-2" />
                Repositorio de Documentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">Nombre</TableHead>
                      <TableHead className="text-slate-300">Tipo</TableHead>
                      <TableHead className="text-slate-300">Fecha</TableHead>
                      <TableHead className="text-slate-300">Tamaño</TableHead>
                      <TableHead className="text-slate-300">Asociado a</TableHead>
                      <TableHead className="text-slate-300">Creado por</TableHead>
                      <TableHead className="text-slate-300">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocumentos.map((doc, index) => (
                      <motion.tr
                        key={doc.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="border-slate-700 hover:bg-slate-800/50"
                      >
                        <TableCell className="font-medium text-white">{doc.nombre}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs border ${getTipoColor(doc.tipo)}`}>
                            {doc.tipo}
                          </span>
                        </TableCell>
                        <TableCell className="text-slate-300">{doc.fecha}</TableCell>
                        <TableCell className="text-slate-300">{doc.tamaño}</TableCell>
                        <TableCell className="font-medium text-blue-400">{doc.asociado}</TableCell>
                        <TableCell className="text-slate-300">{doc.creadoPor}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFeatureClick('Ver Documento')}
                              className="text-blue-400 hover:bg-blue-500/20"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFeatureClick('Descargar Documento')}
                              className="text-green-400 hover:bg-green-500/20"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFeatureClick('Eliminar Documento')}
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

export default Documentos;