import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Configuracion from '@/pages/Configuracion';
import Usuarios from '@/pages/Usuarios';
import Clientes from '@/pages/Clientes';
import Proveedores from '@/pages/Proveedores';
import Productos from '@/pages/Productos';
import Ventas from '@/pages/Ventas';
import Compras from '@/pages/Compras';
import Documentos from '@/pages/Documentos';
import Pedidos from '@/pages/Pedidos';
import Catalogo from '@/pages/Catalogo';
import Cotizaciones from '@/pages/Cotizaciones';
import { DataProvider } from '@/contexts/DataContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { CompanyProvider } from '@/contexts/CompanyContext';

function App() {
  return (
    <>
      <Helmet>
        <title>Sistema de Gestión Empresarial - Cotizaciones y Ventas</title>
        <meta name="description" content="Sistema completo de gestión empresarial con módulos de cotizaciones, ventas, inventario, clientes y reportes avanzados." />
      </Helmet>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <CompanyProvider>
          <DataProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/configuracion" element={<Configuracion />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/proveedores" element={<Proveedores />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/ventas" element={<Ventas />} />
                <Route path="/compras" element={<Compras />} />
                <Route path="/documentos" element={<Documentos />} />
                <Route path="/pedidos" element={<Pedidos />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/cotizaciones" element={<Cotizaciones />} />
              </Routes>
            </Layout>
          </DataProvider>
        </CompanyProvider>
      </ThemeProvider>
    </>
  );
}

export default App;