import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { 
  LayoutDashboard, 
  Store, 
  Users, 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  Settings, 
  LogOut,
  Building2
} from "lucide-react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardContent } from "./DashboardContent";

type ViewType = 'overview' | 'stores' | 'employees' | 'inventory' | 'reports' | 'alerts' | 'settings';

export const DashboardLayout = () => {
  const [currentView, setCurrentView] = useState<ViewType>('overview');
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select(`
            *,
            stores (
              id,
              name,
              code
            )
          `)
          .eq('id', user.id)
          .single();

        setUserProfile(profile);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast({
        title: "Profile Error",
        description: "Failed to load user profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out",
      });
    } catch (error) {
      toast({
        title: "Sign Out Failed",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'stores', label: 'Stores', icon: Store },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'reports', label: 'Reports', icon: TrendingUp },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar
        items={sidebarItems}
        currentView={currentView}
        onViewChange={setCurrentView}
        userProfile={userProfile}
        onSignOut={handleSignOut}
      />
      
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <DashboardContent currentView={currentView} userProfile={userProfile} />
        </div>
      </main>
    </div>
  );
};