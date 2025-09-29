import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LogOut, Building2 } from "lucide-react";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

type ViewType = 'overview' | 'stores' | 'employees' | 'inventory' | 'reports' | 'alerts' | 'settings';

interface DashboardSidebarProps {
  items: SidebarItem[];
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  userProfile: any;
  onSignOut: () => void;
}

export const DashboardSidebar = ({
  items,
  currentView,
  onViewChange,
  userProfile,
  onSignOut,
}: DashboardSidebarProps) => {
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

  return (
    <div className="w-64 bg-gradient-to-b from-primary to-navy-800 flex flex-col shadow-luxury">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-accent to-gold-600 rounded-2xl flex items-center justify-center shadow-elegant">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="font-serif font-semibold text-lg text-sidebar-foreground">S & S Wireless</h1>
            <p className="text-xs text-sidebar-foreground/70 font-light">Management Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        {items.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={currentView === id ? "secondary" : "ghost"}
            className={`w-full justify-start gap-3 h-12 text-left transition-all duration-300 ${
              currentView === id 
                ? "bg-accent text-primary shadow-elegant hover:shadow-luxury" 
                : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/10"
            }`}
            onClick={() => onViewChange(id as ViewType)}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
          </Button>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-6 border-t border-sidebar-border/20">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-12 h-12 ring-2 ring-accent/20">
            <AvatarFallback className="bg-gradient-to-br from-accent to-gold-600 text-primary font-semibold">
              {userProfile?.full_name?.split(' ').map(n => n[0]).join('') || 
               userProfile?.email?.substring(0, 2).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium truncate">
                {userProfile?.full_name || userProfile?.email}
              </p>
              <Badge 
                variant={getRoleBadgeVariant(userProfile?.role)} 
                className="text-xs bg-accent/20 text-accent border-accent/30"
              >
                {userProfile?.role}
              </Badge>
            </div>
            {userProfile?.stores && (
              <p className="text-xs text-sidebar-foreground/60 truncate">
                {userProfile.stores.name}
              </p>
            )}
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2 bg-sidebar-accent/10 border-sidebar-border/30 text-sidebar-foreground hover:bg-sidebar-accent/20 hover:text-sidebar-foreground transition-all duration-300"
          onClick={onSignOut}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};