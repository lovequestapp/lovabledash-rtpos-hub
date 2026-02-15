import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  LogOut, 
  Plus, 
  Upload, 
  Settings,
  Star,
  X,
  CreditCard
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
      case 'owner': return 'default';
      case 'manager': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className={cn(
      "sidebar-ultra-professional flex flex-col h-screen",
      isCollapsed ? 'w-16' : 'w-72',
      "transition-all duration-300 ease-in-out",
      "bg-[hsl(220,20%,10%)] border-r border-[hsl(220,16%,16%)]",
      "shadow-2xl"
    )}>
      {/* Mobile Close */}
      {isMobile && onClose && (
        <div className="absolute top-4 right-4 z-10">
          <Button variant="ghost" size="sm" onClick={onClose}
            className="w-10 h-10 rounded-full text-white/60 hover:text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Header */}
      <div className="p-6 border-b border-[hsl(220,16%,16%)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-red-900/30">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-display font-bold text-white tracking-tight">Cardinal POS</h1>
              <p className="text-xs text-white/40 tracking-wide">Point of Sale Platform</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {items.map(({ id, label, icon: Icon, isNew }) => (
          <div key={id} className="relative group">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 h-11 text-left transition-all duration-200 rounded-lg",
                "border border-transparent",
                currentView === id 
                  ? "bg-primary text-white shadow-md shadow-red-900/30 border-primary/50" 
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
              onClick={() => onViewChange(id as ViewType)}
              onMouseEnter={() => setHoveredItem(id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Icon className={cn("w-4 h-4", currentView === id ? "text-white" : "text-white/50")} />
              {!isCollapsed && (
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-sm font-medium">{label}</span>
                  {isNew && (
                    <Badge className="text-[10px] px-1.5 py-0 h-4 bg-primary/20 text-primary-foreground border-0">
                      NEW
                    </Badge>
                  )}
                </div>
              )}
            </Button>
            
            {/* Collapsed tooltip */}
            {isCollapsed && hoveredItem === id && (
              <div className="absolute left-16 top-1/2 -translate-y-1/2 z-50">
                <div className="bg-foreground text-background text-xs px-2.5 py-1.5 rounded-md shadow-lg whitespace-nowrap font-medium">
                  {label}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      <Separator className="mx-3 bg-[hsl(220,16%,16%)]" />

      {/* Quick Actions */}
      {!isCollapsed && (
        <div className="p-3">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent border-white/10 text-white/60 hover:text-white hover:bg-white/5">
              <Plus className="w-3 h-3 mr-1" />
              New Sale
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent border-white/10 text-white/60 hover:text-white hover:bg-white/5">
              <Upload className="w-3 h-3 mr-1" />
              Import
            </Button>
          </div>
        </div>
      )}

      <Separator className="mx-3 bg-[hsl(220,16%,16%)]" />

      {/* User Profile */}
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="w-9 h-9 border border-white/10">
            <AvatarFallback className="bg-primary/20 text-primary text-sm font-bold">
              {userProfile?.full_name?.charAt(0) || userProfile?.email?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{userProfile?.full_name || userProfile?.email}</p>
              <div className="flex items-center gap-1.5">
                <Badge variant={getRoleBadgeVariant(userProfile?.role)} className="text-[10px] px-1.5 py-0 h-4">
                  {userProfile?.role || 'User'}
                </Badge>
              </div>
            </div>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="w-full gap-2 text-white/50 hover:text-white hover:bg-white/5 h-9"
          onClick={onSignOut}
        >
          <LogOut className="w-4 h-4" />
          {!isCollapsed && "Sign Out"}
        </Button>
      </div>
    </div>
  );
};