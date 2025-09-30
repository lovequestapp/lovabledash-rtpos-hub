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
  Building2,
  Menu,
  X,
  Brain,
  Eye,
  Zap,
  CreditCard
} from "lucide-react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardContent } from "./DashboardContent";
import { WaveLengthAI } from "../ai/WaveLengthAI";

type ViewType = 'overview' | 'stores' | 'employees' | 'inventory' | 'reports' | 'alerts' | 'settings' | 'ai-insights' | 'customer-360' | 'automation' | 'transactions';

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
      {/* Mobile Header - Safe Area Support */}
      {isMobile && (
        <div 
          className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-xl text-black border-b border-gray-200 shadow-lg mobile-header-safe"
          style={{ 
            paddingTop: 'calc(env(safe-area-inset-top, 0px) + 1rem)',
            paddingBottom: '1rem',
            paddingLeft: 'calc(env(safe-area-inset-left, 0px) + 1rem)',
            paddingRight: 'calc(env(safe-area-inset-right, 0px) + 1rem)',
            backgroundColor: '#ffffff',
            minHeight: 'calc(env(safe-area-inset-top, 0px) + 5rem)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-base leading-tight">WaveLength Communications</h1>
                <p className="text-xs text-gray-600 capitalize flex items-center gap-1 leading-tight mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  {currentView.replace('-', ' ')}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-black hover:bg-gray-100 rounded-lg p-2 transition-all duration-200 min-h-[44px] min-w-[44px]"
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
      
      {/* WaveLength AI Assistant */}
      <WaveLengthAI />
    </div>
  );
};