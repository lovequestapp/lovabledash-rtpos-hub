import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Package, 
  AlertTriangle,
  RefreshCw,
  Calendar,
  ArrowRight
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface OverviewDashboardProps {
  userProfile: any;
  onViewChange: (view: 'overview' | 'stores' | 'employees' | 'inventory' | 'reports' | 'alerts' | 'settings') => void;
}

export const OverviewDashboard = ({ userProfile, onViewChange }: OverviewDashboardProps) => {
  const [metrics, setMetrics] = useState({
    todayRevenue: 0,
    monthlyRevenue: 0,
    activeEmployees: 0,
    lowStockItems: 0,
    activeAlerts: 0,
    totalTransactions: 0,
  });
  const [loading, setLoading] = useState(true);

  // Demo data for realistic dashboard
  const demoMetrics = {
    todayRevenue: 2847.50,
    monthlyRevenue: 45620.30,
    activeEmployees: 8,
    lowStockItems: 12,
    activeAlerts: 3,
    totalTransactions: 47,
    avgTicket: 60.58,
    weeklyGrowth: 12.5,
    monthlyGrowth: 8.3,
    inventoryValue: 125430.00,
    topSellingCategory: "Electronics",
    customerSatisfaction: 4.8
  };

  useEffect(() => {
    loadDashboardMetrics();
  }, [userProfile]);

  const loadDashboardMetrics = async () => {
    try {
      setLoading(true);
      
      // For demo purposes, use demo data
      setMetrics(demoMetrics);

    } catch (error) {
      console.error('Error loading dashboard metrics:', error);
      toast({
        title: "Dashboard Error",
        description: "Failed to load dashboard metrics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const MetricCard = ({ 
    title, 
    value, 
    description, 
    icon: Icon, 
    trend, 
    trendValue,
    variant = "default",
    onClick,
    clickable = false
  }: {
    title: string;
    value: string | number;
    description: string;
    icon: React.ComponentType<any>;
    trend?: "up" | "down";
    trendValue?: string;
    variant?: "default" | "warning" | "danger";
    onClick?: () => void;
    clickable?: boolean;
  }) => (
    <Card 
      className={cn(
        "transition-all duration-200",
        clickable && "cursor-pointer hover:shadow-lg hover:scale-[1.02] hover:border-primary/20",
        variant === 'warning' ? 'border-yellow-200' : variant === 'danger' ? 'border-red-200' : ''
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${
            variant === 'warning' ? 'text-yellow-600' : 
            variant === 'danger' ? 'text-red-600' : 
            'text-muted-foreground'
          }`} />
          {clickable && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-2">
          <p className="text-xs text-muted-foreground">{description}</p>
          {trend && trendValue && (
            <Badge variant={trend === "up" ? "default" : "secondary"} className="text-xs">
              {trend === "up" ? "↑" : "↓"} {trendValue}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {userProfile?.full_name || userProfile?.email}
            </p>
          </div>
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="space-y-0 pb-2">
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {userProfile?.full_name || userProfile?.email}
          </p>
          {userProfile?.stores && (
            <p className="text-sm text-muted-foreground mt-1">
              {userProfile.stores.name} • {userProfile.role}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={loadDashboardMetrics}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Badge variant="outline" className="gap-2">
            <Calendar className="w-3 h-3" />
            {new Date().toLocaleDateString()}
          </Badge>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Today's Revenue"
          value={formatCurrency(demoMetrics.todayRevenue)}
          description={`${demoMetrics.totalTransactions} transactions today`}
          icon={DollarSign}
          trend="up"
          trendValue={`+${demoMetrics.weeklyGrowth}%`}
          onClick={() => onViewChange('reports')}
          clickable={true}
        />
        
        <MetricCard
          title="Monthly Revenue"
          value={formatCurrency(demoMetrics.monthlyRevenue)}
          description="Revenue this month"
          icon={TrendingUp}
          trend="up"
          trendValue={`+${demoMetrics.monthlyGrowth}%`}
          onClick={() => onViewChange('reports')}
          clickable={true}
        />
        
        <MetricCard
          title="Active Employees"
          value={demoMetrics.activeEmployees}
          description="Employees with sales today"
          icon={Users}
          onClick={() => onViewChange('employees')}
          clickable={true}
        />
        
        <MetricCard
          title="Low Stock Items"
          value={demoMetrics.lowStockItems}
          description="Items with ≤5 in stock"
          icon={Package}
          variant={demoMetrics.lowStockItems > 0 ? "warning" : "default"}
          onClick={() => onViewChange('inventory')}
          clickable={true}
        />
        
        <MetricCard
          title="Active Alerts"
          value={demoMetrics.activeAlerts}
          description="Unresolved alerts"
          icon={AlertTriangle}
          variant={demoMetrics.activeAlerts > 0 ? "danger" : "default"}
          onClick={() => onViewChange('alerts')}
          clickable={true}
        />
        
        <MetricCard
          title="Avg Ticket"
          value={formatCurrency(demoMetrics.avgTicket)}
          description="Average transaction value"
          icon={DollarSign}
          onClick={() => onViewChange('reports')}
          clickable={true}
        />
      </div>

      {/* Additional Demo Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Inventory Value"
          value={formatCurrency(demoMetrics.inventoryValue)}
          description="Total inventory worth"
          icon={Package}
          onClick={() => onViewChange('inventory')}
          clickable={true}
        />
        
        <MetricCard
          title="Top Category"
          value={demoMetrics.topSellingCategory}
          description="Best performing category"
          icon={TrendingUp}
          onClick={() => onViewChange('reports')}
          clickable={true}
        />
        
        <MetricCard
          title="Customer Rating"
          value={`${demoMetrics.customerSatisfaction}/5`}
          description="Average customer satisfaction"
          icon={Users}
          trend="up"
          trendValue="+0.2"
          onClick={() => onViewChange('reports')}
          clickable={true}
        />
        
        <MetricCard
          title="Total Stores"
          value="3"
          description="Active store locations"
          icon={Users}
          onClick={() => onViewChange('stores')}
          clickable={true}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <CardHeader className="p-0 mb-3">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => onViewChange('reports')}
            >
              View Today's Sales
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => onViewChange('inventory')}
            >
              Check Inventory
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => onViewChange('reports')}
            >
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card className="p-4 md:col-span-3">
          <CardHeader className="p-0 mb-3">
            <CardTitle className="text-lg">System Status</CardTitle>
            <CardDescription>
              RT-POS integration and data sync status
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Last Data Sync</span>
              <Badge variant="outline">2 minutes ago</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">RT-POS Connection</span>
              <Badge variant="default" className="bg-green-100 text-green-800">Online</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Automated Reports</span>
              <Badge variant="default" className="bg-blue-100 text-blue-800">Active</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};