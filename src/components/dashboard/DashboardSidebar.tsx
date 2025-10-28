import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  LogOut, 
  Building2, 
  Home, 
  Store, 
  Package, 
  BarChart3, 
  AlertTriangle, 
  Users, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Truck,
  Warehouse,
  Shield,
  Zap,
  Star,
  Target,
  Globe,
  Database,
  FileText,
  PieChart,
  LineChart,
  TrendingDown,
  AlertCircle,
  Info,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  MoreHorizontal,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  status?: 'success' | 'warning' | 'error' | 'info';
  badge?: string;
  count?: number;
  isNew?: boolean;
}

type ViewType = 'overview' | 'stores' | 'employees' | 'inventory' | 'reports' | 'alerts' | 'settings' | 'ai-insights' | 'customer-360' | 'automation' | 'transactions' | 'anomaly-detector';

interface DashboardSidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
  items: SidebarItem[];
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  userProfile: any;
  onSignOut: () => void;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export const DashboardSidebar = ({
  isMobile = false,
  onClose,
  items,
  currentView,
  onViewChange,
  userProfile,
  onSignOut,
  isCollapsed = false,
  onToggle,
}: DashboardSidebarProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'owner':
        return 'default';
      case 'manager':
        return 'secondary';
      case 'employee':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusGlow = (status?: string) => {
    switch (status) {
      case 'success':
        return 'shadow-green-500/50';
      case 'warning':
        return 'shadow-yellow-500/50';
      case 'error':
        return 'shadow-red-500/50';
      case 'info':
        return 'shadow-blue-500/50';
      default:
        return 'shadow-gray-500/50';
    }
  };

  return (
    <div className={cn(
      "sidebar-ultra-professional bg-white",
      isCollapsed ? 'w-16' : 'w-72',
      "transition-all duration-500 ease-in-out",
      "bg-white border-r border-gray-200/60",
      "shadow-2xl shadow-gray-900/5"
    )}>
      {/* Ultra Professional Header */}
      {/* Mobile Close Button */}
      {isMobile && onClose && (
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg hover:bg-gray-100 hover:scale-110 transition-all duration-200"
          >
            <X className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      )}
      <div className="p-6 border-b border-gray-200/60 bg-gradient-to-r from-white to-gray-50/30">
        <div className="flex items-center gap-4">
          {isMobile && onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="ml-auto w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg hover:bg-gray-100 hover:scale-110 transition-all duration-200"
            >
              <X className="w-5 h-5 text-gray-600" />
            </Button>
          )}
          <div className="relative py-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
              StoreManagerAI
            </h1>
            <p className="text-xs text-muted-foreground mt-1 tracking-wide">Retail Intelligence</p>
          </div>
        </div>
      </div>

      {/* Advanced Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {items.map(({ id, label, icon: Icon, status, badge, count, isNew }) => (
          <div key={id} className="relative group">
            <Button
              variant="ghost"
              className={cn("nav-item-glass", 
                "w-full justify-start gap-4 h-14 text-left transition-all duration-300 group-hover:scale-[1.02]",
                "rounded-xl border border-transparent",
                "hover:border-gray-200 hover:shadow-lg hover:shadow-gray-900/5",
                currentView === id 
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25 border-green-200" 
                  : "text-gray-700 hover:bg-gray-50/80 hover:text-gray-900"
              )}
              onClick={() => onViewChange(id as ViewType)}
              onMouseEnter={() => setHoveredItem(id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative">
                <Icon className={cn("nav-item-glass", 
                  "w-5 h-5 transition-all duration-300",
                  currentView === id ? "text-white" : "text-gray-600 group-hover:text-gray-900"
                )} />
                {status && (
                  <div className={cn("nav-item-glass", 
                    "absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white shadow-lg",
                    getStatusColor(status),
                    getStatusGlow(status)
                  )}></div>
                )}
              </div>
              
              {!isCollapsed && (
                <div className="flex-1 flex items-center justify-between">
                  <span className="font-semibold text-sm">{label}</span>
                  <div className="flex items-center gap-2">
                    {isNew && (
                      <Badge variant="destructive" className="text-xs px-2 py-0.5 animate-pulse">
                        NEW
                      </Badge>
                    )}
                    {badge && (
                      <Badge variant="outline" className="text-xs px-2 py-0.5">
                        {badge}
                      </Badge>
                    )}
                    {count !== undefined && (
                      <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600">
                        {count}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </Button>
            
            {/* Hover Tooltip for Collapsed State */}
            {isCollapsed && hoveredItem === id && (
              <div className="absolute left-16 top-1/2 -translate-y-1/2 z-50">
                <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">
                  {label}
                  {status && (
                    <div className={cn("nav-item-glass", 
                      "w-2 h-2 rounded-full ml-2 inline-block",
                      getStatusColor(status)
                    )}></div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      <Separator className="mx-4 bg-gray-200/60" />

      {/* Quick Actions */}
      {!isCollapsed && (
        <div className="p-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="h-8 text-xs">
              <Plus className="w-3 h-3 mr-1" />
              Add Store
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              <Upload className="w-3 h-3 mr-1" />
              Import
            </Button>
          </div>
        </div>
      )}

      <Separator className="mx-4 bg-gray-200/60" />

      {/* Ultra Professional User Profile */}
      <div className="p-4 bg-gradient-to-r from-gray-50/50 to-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <Avatar className="w-12 h-12 border-2 border-gray-200 shadow-lg">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-lg">
                {userProfile?.full_name?.charAt(0) || userProfile?.email?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">{userProfile?.full_name || userProfile?.email}</p>
              <div className="flex items-center gap-2">
                <Badge variant={getRoleBadgeVariant(userProfile?.role)} className="text-xs px-2 py-0.5">
                  {userProfile?.role || 'User'}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs text-gray-600 font-medium">4.8</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          {isMobile && onClose && (
            <Button
              variant="default"
              size="sm"
              onClick={onClose}
              className="w-full gap-2 bg-red-500 hover:bg-red-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-12 font-semibold"
            >
              <X className="w-5 h-5" />
              Close Menu
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-2 bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300 h-10"
            onClick={onSignOut}
          >
            <LogOut className="w-4 h-4" />
            {!isCollapsed && "Sign Out"}
          </Button>
          
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300 h-8"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
 