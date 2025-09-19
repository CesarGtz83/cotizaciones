import React, { createContext, useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCompany } from '@/contexts/CompanyContext';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

const initialData = {
  'comp-1': {
    clientes: [
      { id: 'CLI-001', nombre: 'Empresa ABC S.A.', contacto: 'Juan Pérez', email: 'juan.perez@empresaabc.com', telefono: '+1 234-567-8900', direccion: 'Av. Principal 123, Ciudad', tipo: 'Corporativo', estado: 'Activo', ultimaCompra: '2024-01-15', totalCompras: '$45,230.00' },
    ],
    productos: [
      { id: 'PROD-001', nombre: 'Laptop Dell Inspiron 15', categoria: 'Electrónicos', marca: 'Dell', presentacion: 'Unidad', ubicacion: 'A-01-15', stock: 25, precio: '850.00', costo: '650.00', estado: 'Activo' },
    ],
    cotizaciones: [
      { id: 'COT-001', cliente: 'Empresa ABC S.A.', fecha: '2025-09-15', validez: '2025-09-30', total: '15420.00', estado: 'Pendiente', productos: 5 },
    ],
    ventas: [
      { id: 'V-001', cliente: 'Empresa ABC S.A.', fecha: '2025-09-15', productos: 5, subtotal: '13500.00', impuestos: '1920.00', total: '15420.00', estado: 'Completada', metodoPago: 'Transferencia' },
    ],
    proveedores: [
      { id: 'PROV-001', nombre: 'Distribuidora Tech Global', contacto: 'Luis Fernández', email: 'luis.fernandez@techglobal.com', telefono: '+1 555-123-4567', categoria: 'Electrónicos', estado: 'Activo', tiempoEntrega: '3-5 días' },
    ],
    compras: [
      { id: 'C-001', proveedor: 'Distribuidora Tech Global', fecha: '2025-09-15', fechaEntrega: '2025-09-18', productos: 12, total: '21090.00', estado: 'Entregada' },
    ],
    pedidos: [
      { id: 'PED-001', cliente: 'Empresa ABC S.A.', fecha: '2025-09-15', fechaEntrega: '2025-09-20', total: '15420.00', estado: 'En Preparación', origen: 'Catálogo Online' },
    ],
    usuarios: [
      { id: 'USR-001', nombre: 'Admin', email: 'admin@miempresa.com', rol: 'Administrador', estado: 'Activo', ultimoAcceso: '2025-09-18 10:30 AM' },
    ],
    documentos: [
      { id: 'DOC-001', nombre: 'Factura V-001.pdf', tipo: 'Factura de Venta', fecha: '2025-09-15', tamaño: '128 KB', asociado: 'V-001', creadoPor: 'Admin' },
    ],
    cart: {},
  },
  'comp-2': {
    clientes: [
      { id: 'CLI-002', nombre: 'Corporación XYZ', contacto: 'María González', email: 'maria.gonzalez@corpxyz.com', telefono: '+1 234-567-8901', direccion: 'Calle Comercial 456, Ciudad', tipo: 'Corporativo', estado: 'Activo', ultimaCompra: '2024-01-14', totalCompras: '$78,450.00' },
    ],
    productos: [
      { id: 'PROD-002', nombre: 'Mouse Logitech MX Master', categoria: 'Accesorios', marca: 'Logitech', presentacion: 'Unidad', ubicacion: 'B-02-08', stock: 150, precio: '89.99', costo: '65.00', estado: 'Activo' },
    ],
    cotizaciones: [
      { id: 'COT-002', cliente: 'Corporación XYZ', fecha: '2025-09-14', validez: '2025-09-29', total: '28750.00', estado: 'Aprobada', productos: 8 },
    ],
    ventas: [
      { id: 'V-002', cliente: 'Corporación XYZ', fecha: '2025-09-14', productos: 8, subtotal: '25200.00', impuestos: '3550.00', total: '28750.00', estado: 'Pendiente', metodoPago: 'Crédito' },
    ],
    proveedores: [
      { id: 'PROV-002', nombre: 'Suministros Oficina Plus', contacto: 'Carmen López', email: 'carmen.lopez@oficinaplus.com', telefono: '+1 555-234-5678', categoria: 'Oficina', estado: 'Activo', tiempoEntrega: '1-2 días' },
    ],
    compras: [
      { id: 'C-002', proveedor: 'Suministros Oficina Plus', fecha: '2025-09-14', fechaEntrega: '2025-09-16', productos: 8, total: '5928.00', estado: 'En Tránsito' },
    ],
    pedidos: [
      { id: 'PED-002', cliente: 'Corporación XYZ', fecha: '2025-09-14', fechaEntrega: '2025-09-19', total: '28750.00', estado: 'Enviado', origen: 'Venta Directa' },
    ],
    usuarios: [
      { id: 'USR-002', nombre: 'Vendedor 1', email: 'vendedor1@miempresa.com', rol: 'Ventas', estado: 'Activo', ultimoAcceso: '2025-09-18 09:45 AM' },
    ],
    documentos: [
      { id: 'DOC-002', nombre: 'Contrato Cliente ABC.docx', tipo: 'Contrato', fecha: '2025-09-14', tamaño: '2.3 MB', asociado: 'CLI-001', creadoPor: 'Admin' },
    ],
    cart: {},
  }
};

const emptyCompanyData = {
  clientes: [], productos: [], cotizaciones: [], ventas: [], proveedores: [], compras: [], pedidos: [], usuarios: [], documentos: [], cart: {}
};

export const DataProvider = ({ children }) => {
  const { activeCompanyId } = useCompany();
  const [allData, setAllData] = useState(() => {
    const localData = localStorage.getItem('crmData');
    return localData ? JSON.parse(localData) : initialData;
  });

  useEffect(() => {
    localStorage.setItem('crmData', JSON.stringify(allData));
  }, [allData]);

  const companyData = allData[activeCompanyId] || emptyCompanyData;

  const getNewId = (prefix, currentIds) => {
    const maxId = currentIds.reduce((max, item) => {
      const num = parseInt(item.id.split('-')[1], 10);
      return num > max ? num : max;
    }, 0);
    return `${prefix}-${String(maxId + 1).padStart(3, '0')}`;
  };

  const updateCompanyData = (updatedData) => {
    setAllData(prevAllData => ({
      ...prevAllData,
      [activeCompanyId]: updatedData,
    }));
  };

  const addData = (type, newItem) => {
    const newId = getNewId(type.slice(0, 3).toUpperCase(), companyData[type]);
    const itemWithId = { ...newItem, id: newId, fecha: new Date().toISOString().split('T')[0] };
    const updatedData = {
      ...companyData,
      [type]: [...companyData[type], itemWithId],
    };
    updateCompanyData(updatedData);
  };

  const updateData = (type, updatedItem) => {
    const updatedData = {
      ...companyData,
      [type]: companyData[type].map(item =>
        item.id === updatedItem.id ? updatedItem : item
      ),
    };
    updateCompanyData(updatedData);
  };

  const deleteData = (type, itemId) => {
    const updatedData = {
      ...companyData,
      [type]: companyData[type].filter(item => item.id !== itemId),
    };
    updateCompanyData(updatedData);
  };

  const addToCart = (productId) => {
    const newCart = { ...companyData.cart };
    newCart[productId] = (newCart[productId] || 0) + 1;
    updateCompanyData({ ...companyData, cart: newCart });
  };

  const removeFromCart = (productId) => {
    const newCart = { ...companyData.cart };
    if (newCart[productId] > 1) {
      newCart[productId] -= 1;
    } else {
      delete newCart[productId];
    }
    updateCompanyData({ ...companyData, cart: newCart });
  };

  const clearCart = () => {
    updateCompanyData({ ...companyData, cart: {} });
  };

  const value = {
    ...companyData,
    addData,
    updateData,
    deleteData,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};