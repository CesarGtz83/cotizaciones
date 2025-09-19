import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Settings, Building, Percent, CreditCard, Users, Bell, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useCompany } from '@/contexts/CompanyContext';

const Configuracion = () => {
  const { toast } = useToast();
  const { activeCompany } = useCompany();

  const handleSave = (section) => {
    toast({
      title: `💾 ${section} Guardada`,
      description: "🚧 Esta función no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀"
    });
  };

  return (
    <>
      <Helmet>
        <title>Configuración - Sistema de Gestión Empresarial</title>
        <meta name="description" content="Configuración general del sistema, incluyendo datos de la empresa, impuestos, formas de pago y gestión de usuarios." />
      </Helmet>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold gradient-text">Configuración del Sistema</h1>
          <p className="text-muted-foreground mt-2">Ajusta los parámetros para <span className="font-bold text-foreground">{activeCompany?.name}</span></p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="empresa" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 bg-card/80 border">
              <TabsTrigger value="empresa"><Building className="w-4 h-4 mr-2" />Empresa</TabsTrigger>
              <TabsTrigger value="impuestos"><Percent className="w-4 h-4 mr-2" />Impuestos</TabsTrigger>
              <TabsTrigger value="pagos"><CreditCard className="w-4 h-4 mr-2" />Formas de Pago</TabsTrigger>
              <TabsTrigger value="usuarios" className="hidden sm:flex"><Users className="w-4 h-4 mr-2" />Usuarios</TabsTrigger>
              <TabsTrigger value="notificaciones" className="hidden md:flex"><Bell className="w-4 h-4 mr-2" />Notificaciones</TabsTrigger>
            </TabsList>

            <TabsContent value="empresa">
              <Card className="glass-effect mt-4">
                <CardHeader>
                  <CardTitle>Configuración Empresarial</CardTitle>
                  <CardDescription>Información general de tu negocio.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre-empresa">Nombre de la Empresa</Label>
                      <Input id="nombre-empresa" defaultValue={activeCompany?.name} className="bg-background/70" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ruc-empresa">RUC / ID Fiscal</Label>
                      <Input id="ruc-empresa" defaultValue="123456789-0" className="bg-background/70" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="direccion-empresa">Dirección</Label>
                    <Input id="direccion-empresa" defaultValue="Av. Principal 123, Ciudad, País" className="bg-background/70" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-empresa">Email de Contacto</Label>
                      <Input id="email-empresa" type="email" defaultValue="contacto@miempresa.com" className="bg-background/70" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono-empresa">Teléfono</Label>
                      <Input id="telefono-empresa" defaultValue="+1 234 567 890" className="bg-background/70" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={() => handleSave('Configuración Empresarial')}><Save className="w-4 h-4 mr-2" />Guardar Cambios</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="impuestos">
              <Card className="glass-effect mt-4">
                <CardHeader>
                  <CardTitle>Módulo de Impuestos</CardTitle>
                  <CardDescription>Gestiona los tipos de impuestos aplicables.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">IVA (Impuesto al Valor Agregado)</p>
                      <p className="text-sm text-muted-foreground">Impuesto general sobre las ventas</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="16" className="w-20 bg-background/70" />
                      <span className="text-foreground font-bold">%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">ISR (Impuesto Sobre la Renta)</p>
                      <p className="text-sm text-muted-foreground">Retención sobre servicios profesionales</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="10" className="w-20 bg-background/70" />
                      <span className="text-foreground font-bold">%</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={() => handleSave('Impuestos')}><Save className="w-4 h-4 mr-2" />Guardar Cambios</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pagos">
              <Card className="glass-effect mt-4">
                <CardHeader>
                  <CardTitle>Módulo Formas de Pago</CardTitle>
                  <CardDescription>Configura los métodos de pago aceptados.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-background/50 rounded-lg">
                    <p className="font-medium text-foreground">Transferencia Bancaria</p>
                    <p className="text-sm text-muted-foreground">Activo</p>
                  </div>
                  <div className="p-3 bg-background/50 rounded-lg">
                    <p className="font-medium text-foreground">Tarjeta de Crédito/Débito</p>
                    <p className="text-sm text-muted-foreground">Activo</p>
                  </div>
                  <div className="p-3 bg-background/50 rounded-lg">
                    <p className="font-medium text-foreground">Efectivo</p>
                    <p className="text-sm text-muted-foreground">Activo</p>
                  </div>
                  <div className="p-3 bg-background/50 rounded-lg">
                    <p className="font-medium text-foreground">Cheque</p>
                    <p className="text-sm text-muted-foreground">Inactivo</p>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={() => handleSave('Formas de Pago')}><Save className="w-4 h-4 mr-2" />Guardar Cambios</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="usuarios">
              <Card className="glass-effect mt-4">
                <CardHeader>
                  <CardTitle>Usuarios y Roles</CardTitle>
                  <CardDescription>Gestiona el acceso y permisos de tu equipo.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8">
                    <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">La gestión de usuarios y roles se encuentra en su propio módulo.</p>
                    <Button variant="link" className="text-primary" onClick={() => window.location.href = '/usuarios'}>
                      Ir al Módulo de Usuarios
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notificaciones">
              <Card className="glass-effect mt-4">
                <CardHeader>
                  <CardTitle>Notificaciones</CardTitle>
                  <CardDescription>Configura las alertas y notificaciones del sistema.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8">
                    <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Configuración de notificaciones no implementada.</p>
                    <Button variant="outline" className="mt-4" onClick={() => handleSave('Notificaciones')}>
                      Solicitar esta función
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </motion.div>
      </div>
    </>
  );
};

export default Configuracion;