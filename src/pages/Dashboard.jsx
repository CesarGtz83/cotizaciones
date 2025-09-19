import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package, 
  FileText,
  BarChart3,
  PieChart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/contexts/DataContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { toast } = useToast();
  const { ventas, cotizaciones, productos, clientes } = useData();
  const navigate = useNavigate();

  const handleFeatureClick = (feature) => {
    toast({
      title: `📊 ${feature}`,
      description: "🚧 Esta función no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀"
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const totalVentasMes = ventas.reduce((acc, venta) => acc + parseFloat(venta.total), 0);

  const metrics = [
    {
      title: 'Ventas del Mes',
      value: formatCurrency(totalVentasMes),
      change: '+12.5%',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Cotizaciones Activas',
      value: cotizaciones.filter(c => c.estado === 'Pendiente' || c.estado === 'Enviada').length,
      change: '+8.2%',
      icon: FileText,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Productos en Stock',
      value: productos.length,
      change: '-2.1%',
      icon: Package,
      color: 'from-purple-500 to-violet-600'
    },
    {
      title: 'Clientes Activos',
      value: clientes.filter(c => c.estado === 'Activo').length,
      change: '+15.3%',
      icon: Users,
      color: 'from-orange-500 to-red-600'
    }
  ];

  const recentSales = [...ventas].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 4);
  const recentQuotes = [...cotizaciones].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>Dashboard - Sistema de Gestión Empresarial</title>
        <meta name="description" content="Panel de control principal con métricas de ventas, cotizaciones y gestión empresarial en tiempo real." />
      </Helmet>
      
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
            <p className="text-slate-400 mt-2">Resumen general de tu negocio</p>
          </div>
          <Button 
            onClick={() => handleFeatureClick('Generar Reporte')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Generar Reporte
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-effect border-slate-700 card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400 mb-1">{metric.title}</p>
                        <p className="text-2xl font-bold text-white">{metric.value}</p>
                        <p className={`text-sm mt-1 ${
                          metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {metric.change} vs mes anterior
                        </p>
                      </div>
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-effect border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Ventas Recientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSales.map((sale, index) => (
                    <motion.div
                      key={sale.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors cursor-pointer"
                      onClick={() => navigate('/ventas')}
                    >
                      <div>
                        <p className="font-medium text-white">{sale.id}</p>
                        <p className="text-sm text-slate-400">{sale.cliente}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-400">{formatCurrency(sale.total)}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          sale.estado === 'Completada' ? 'bg-green-500/20 text-green-400' :
                          sale.estado === 'Pendiente' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {sale.estado}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-effect border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <FileText className="w-5 h-5 mr-2" />
                  Cotizaciones Activas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentQuotes.map((quote, index) => (
                    <motion.div
                      key={quote.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors cursor-pointer"
                      onClick={() => navigate('/cotizaciones')}
                    >
                      <div>
                        <p className="font-medium text-white">{quote.id}</p>
                        <p className="text-sm text-slate-400">{quote.cliente}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-400">{formatCurrency(quote.total)}</p>
                        <p className="text-xs text-slate-400">Válida hasta {quote.validez}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="glass-effect border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Tendencias de Ventas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-slate-800/30 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400">Gráfico de tendencias</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => handleFeatureClick('Gráfico de Tendencias')}
                    >
                      Ver Análisis Completo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="glass-effect border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <PieChart className="w-5 h-5 mr-2" />
                  Distribución por Categorías
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-slate-800/30 rounded-lg">
                  <div className="text-center">
                    <PieChart className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400">Distribución de productos</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => handleFeatureClick('Gráfico de Distribución')}
                    >
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;