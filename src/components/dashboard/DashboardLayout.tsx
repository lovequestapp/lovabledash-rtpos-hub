import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  LayoutDashboard, 
  Store, 
  Users, 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  Settings, 
  LogOut,
  Menu,
  X,
  Brain,
  Eye,
  Zap,
  CreditCard
} from "lucide-react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardContent } from "./DashboardContent";
import { CardinalPOSAssistant } from "../ai/StoreManagerAI";

type ViewType = 'overview' | 'stores' | 'employees' | 'inventory' | 'reports' | 'alerts' | 'settings' | 'ai-insights' | 'customer-360' | 'automation' | 'transactions' | 'anomaly-detector';

export const DashboardLayout = () => {
  const [currentView, setCurrentView] = useState<ViewType>('overview');
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useIsMobile();

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

        if (profile) {
          setUserProfile(profile);
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-background">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'stores', label: 'Stores', icon: Store },
    { id: 'transactions', label: 'Transactions', icon: CreditCard, isNew: true },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'reports', label: 'Reports', icon: TrendingUp },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'ai-insights', label: 'AI Insights', icon: Brain, isNew: true },
    { id: 'customer-360', label: 'Customer 360°', icon: Eye, isNew: true },
    { id: 'automation', label: 'Automation', icon: Zap, isNew: true },
  ];

  return (
    <div className="flex h-screen bg-background overflow-x-hidden w-full max-w-full">
      {/* Mobile Header */}
      {isMobile && (
        <div 
          className="fixed top-0 left-0 right-0 z-50 bg-[hsl(220,20%,10%)] text-white border-b border-[hsl(220,16%,16%)] shadow-lg"
          style={{ 
            paddingTop: 'calc(env(safe-area-inset-top, 0px) + 1rem)',
            paddingBottom: '1rem',
            paddingLeft: 'calc(env(safe-area-inset-left, 0px) + 1rem)',
            paddingRight: 'calc(env(safe-area-inset-right, 0px) + 1rem)',
            minHeight: 'calc(env(safe-area-inset-top, 0px) + 5rem)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-display font-bold text-white tracking-tight">
                  Cardinal POS
                </h1>
                <p className="text-xs text-white/50 capitalize flex items-center gap-1 leading-tight">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  {currentView.replace('-', ' ')}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-white hover:bg-white/10 rounded-lg p-2 min-h-[44px] min-w-[44px]"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      )}

      {/* Sidebar Overlay for Mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${
        isMobile 
          ? `fixed left-0 top-0 bottom-0 z-50 transform transition-transform duration-300 ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`
          : 'relative'
      }`}>
        <DashboardSidebar
          items={sidebarItems}
          currentView={currentView}
          onViewChange={handleViewChange}
          userProfile={userProfile}
          onSignOut={handleSignOut}
          isCollapsed={isCollapsed}
          onToggle={handleToggleSidebar}
          isMobile={isMobile}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
      
      {/* Main Content */}
      <main 
        className={`flex-1 overflow-hidden ${
          isCollapsed ? 'ml-16' : ''
        } transition-all duration-300 w-full max-w-full`}
        style={isMobile ? {
          paddingTop: 'calc(env(safe-area-inset-top, 0px) + 6rem)'
        } : undefined}
      >
        <div className="h-full overflow-y-auto overflow-x-hidden w-full max-w-full">
          <DashboardContent currentView={currentView} userProfile={userProfile} onViewChange={handleViewChange} />
        </div>
      </main>
      
      {/* Cardinal POS Assistant */}
      <CardinalPOSAssistant />
    </div>
  );
};