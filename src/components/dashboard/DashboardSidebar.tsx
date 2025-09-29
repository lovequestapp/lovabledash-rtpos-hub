import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LogOut, Building2 } from "lucide-react";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface DashboardSidebarProps {
  items: SidebarItem[];
  currentView: string;
  onViewChange: (view: string) => void;
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
    <div className="w-64 bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">RT-POS Hub</h1>
            <p className="text-xs text-muted-foreground">Store Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {items.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={currentView === id ? "secondary" : "ghost"}
            className="w-full justify-start gap-3 h-11"
            onClick={() => onViewChange(id)}
          >
            <Icon className="w-5 h-5" />
            {label}
          </Button>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
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
                className="text-xs"
              >
                {userProfile?.role}
              </Badge>
            </div>
            {userProfile?.stores && (
              <p className="text-xs text-muted-foreground truncate">
                {userProfile.stores.name}
              </p>
            )}
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2"
          onClick={onSignOut}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};