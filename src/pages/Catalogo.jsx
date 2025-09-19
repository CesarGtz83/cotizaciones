import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Search, Filter, ShoppingCart, Plus, Minus, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/contexts/DataContext';

const Catalogo = () => {
  const { toast } = useToast();
  const { productos, cart, addToCart, removeFromCart, clearCart } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const handleFeatureClick = (feature) => {
    toast({
      title: `🛍️ ${feature}`,
      description: "🚧 Esta función no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀"
    });
  };

  const handleAddToCart = (productId) => {
    addToCart(productId);
    toast({ title: "✅ Producto añadido al carrito" });
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    toast({ title: "🗑️ Producto eliminado del carrito" });
  };

  const filteredProductos = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cartItemCount = Object.values(cart).reduce((sum, count) => sum + count, 0);

  return (
    <>
      <Helmet>
        <title>Catálogo de Productos - Sistema de Gestión Empresarial</title>
        <meta name="description" content="Catálogo de productos interactivo con carrito de compras para la creación de pedidos rápidos." />
      </Helmet>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold gradient-text">Catálogo de Productos</h1>
            <p className="text-slate-400 mt-2">Explora nuestros productos y crea tu pedido</p>
          </div>
          <Button 
            onClick={() => handleFeatureClick('Ver Carrito')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 relative"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Ver Carrito
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                {cartItemCount}
              </span>
            )}
          </Button>
        </motion.div>

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
                    placeholder="Buscar productos por nombre o categoría..."
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProductos.map((producto, index) => (
            <motion.div
              key={producto.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card className="glass-effect border-slate-700 card-hover overflow-hidden">
                <div className="h-48 bg-slate-800 flex items-center justify-center">
                  <img alt={producto.nombre} src="https://images.unsplash.com/photo-1648476029943-301781dd76d4" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      <Tag className="w-3 h-3 mr-1" />
                      {producto.categoria}
                    </span>
                    <span className={`text-xs font-bold ${
                      producto.stock > 10 ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      Stock: {producto.stock}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{producto.nombre}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold gradient-text">${producto.precio}</p>
                    {cart[producto.id] > 0 ? (
                      <div className="flex items-center gap-2">
                        <Button size="icon" variant="outline" onClick={() => handleRemoveFromCart(producto.id)} className="w-8 h-8">
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-bold text-lg">{cart[producto.id]}</span>
                        <Button size="icon" variant="outline" onClick={() => handleAddToCart(producto.id)} className="w-8 h-8">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={() => handleAddToCart(producto.id)}>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Añadir
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Catalogo;