import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  UserCheck, 
  Truck, 
  Package, 
  ShoppingCart, 
  ShoppingBag, 
  FileText, 
  ClipboardList, 
  Store,
  Calculator,
  Building
} from 'lucide-react';
import { useCompany } from '@/contexts/CompanyContext';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Calculator, label: 'Cotizaciones', path: '/cotizaciones' },
  { icon: ShoppingCart, label: 'Ventas', path: '/ventas' },
  { icon: ShoppingBag, label: 'Compras', path: '/compras' },
  { icon: Package, label: 'Productos', path: '/productos' },
  { icon: UserCheck, label: 'Clientes', path: '/clientes' },
  { icon: Truck, label: 'Proveedores', path: '/proveedores' },
  { icon: ClipboardList, label: 'Pedidos', path: '/pedidos' },
  { icon: Store, label: 'Catálogo', path: '/catalogo' },
  { icon: FileText, label: 'Documentos', path: '/documentos' },
  { icon: Users, label: 'Usuarios', path: '/usuarios' },
  { icon: Settings, label: 'Configuración', path: '/configuracion' },
];

const Sidebar = () => {
  const location = useLocation();
  const { activeCompany } = useCompany();

  return (
    <div className="h-full sidebar-gradient border-r flex flex-col">
      <div className="p-6 border-b">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Building className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold gradient-text truncate">{activeCompany?.name || 'SistemaCRM'}</h1>
            <p className="text-xs text-muted-foreground">Gestión Empresarial</p>
          </div>
        </motion.div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-muted-foreground group-hover:text-accent-foreground'}`} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-2 h-2 bg-white rounded-full"
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="glass-effect rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">A</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Admin</p>
              <p className="text-xs text-muted-foreground">Administrador</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;