import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Search, Download, Sun, Moon, ChevronsUpDown, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/contexts/ThemeContext';
import { useCompany } from '@/contexts/CompanyContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const { companies, activeCompany, setActiveCompany } = useCompany();

  const handleNotifications = () => {
    toast({
      title: "🔔 Notificaciones",
      description: "🚧 Esta función no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀"
    });
  };

  const handleSearch = () => {
    toast({
      title: "🔍 Búsqueda",
      description: "🚧 Esta función no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀"
    });
  };

  const handleExport = () => {
    toast({
      title: "📊 Exportar Datos",
      description: "🚧 Esta función no está implementada aún—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀"
    });
  };

  return (
    <header className="h-16 bg-card/80 backdrop-blur-sm border-b flex items-center justify-between px-4 sm:px-6 flex-shrink-0">
      <div className="flex items-center space-x-2 sm:space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-foreground/70 hover:text-foreground hover:bg-accent"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <div className="hidden md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[220px] justify-between">
                <div className="flex items-center truncate">
                  <Building className="w-4 h-4 mr-2" />
                  <span className="truncate">{activeCompany?.name}</span>
                </div>
                <ChevronsUpDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[220px]">
              {companies.map((company) => (
                <DropdownMenuItem key={company.id} onSelect={() => setActiveCompany(company.id)}>
                  {company.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center space-x-1 sm:space-x-2">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar..." className="pl-9 w-40 lg:w-64" onFocus={handleSearch} />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="text-foreground/70 hover:text-foreground hover:bg-accent"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleExport}
          className="text-foreground/70 hover:text-foreground hover:bg-accent hidden sm:inline-flex"
        >
          <Download className="w-5 h-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNotifications}
          className="text-foreground/70 hover:text-foreground hover:bg-accent relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        <div className="flex items-center space-x-3 pl-2 border-l">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">A</span>
          </div>
          <div className="text-right hidden lg:block">
            <p className="text-sm font-medium text-foreground">Admin</p>
            <p className="text-xs text-muted-foreground">En línea</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;