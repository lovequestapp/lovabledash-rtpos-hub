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
  Calendar
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface OverviewDashboardProps {
  userProfile: any;
}

export const OverviewDashboard = ({ userProfile }: OverviewDashboardProps) => {
  const [metrics, setMetrics] = useState({
    todayRevenue: 0,
    monthlyRevenue: 0,
    activeEmployees: 0,
    lowStockItems: 0,
    activeAlerts: 0,
    totalTransactions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardMetrics();
  }, [userProfile]);

  const loadDashboardMetrics = async () => {
    try {
      setLoading(true);
      
      const today = new Date();
      const startOfToday = new Date(today.setHours(0, 0, 0, 0)).toISOString();
      const endOfToday = new Date(today.setHours(23, 59, 59, 999)).toISOString();
      
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();

      // Build query based on user role
      let storeFilter = {};
      if (userProfile?.role !== 'owner' && userProfile?.store_id) {
        storeFilter = { store_id: userProfile.store_id };
      }

      // Today's revenue
      const { data: todayTransactions } = await supabase
        .from('transactions')
        .select('total_amount')
        .match({ ...storeFilter, transaction_type: 'sale' })
        .gte('transaction_date', startOfToday)
        .lte('transaction_date', endOfToday);

      const todayRevenue = todayTransactions?.reduce((sum, t) => sum + parseFloat(t.total_amount), 0) || 0;

      // Monthly revenue
      const { data: monthlyTransactions } = await supabase
        .from('transactions')
        .select('total_amount')
        .match({ ...storeFilter, transaction_type: 'sale' })
        .gte('transaction_date', startOfMonth);

      const monthlyRevenue = monthlyTransactions?.reduce((sum, t) => sum + parseFloat(t.total_amount), 0) || 0;

      // Total transactions today
      const totalTransactions = todayTransactions?.length || 0;

      // Active employees (who made transactions today)
      const { data: activeEmployeeData } = await supabase
        .from('transactions')
        .select('employee_id')
        .match(storeFilter)
        .gte('transaction_date', startOfToday)
        .lte('transaction_date', endOfToday)
        .not('employee_id', 'is', null);

      const activeEmployees = new Set(activeEmployeeData?.map(t => t.employee_id)).size;

      // Low stock items
      const { data: lowStockData } = await supabase
        .from('inventory_snapshots')
        .select('id')
        .match(storeFilter)
        .lte('quantity_on_hand', 5);

      const lowStockItems = lowStockData?.length || 0;

      // Active alerts
      const { data: alertsData } = await supabase
        .from('alerts')
        .select('id')
        .match({ ...storeFilter, is_resolved: false });

      const activeAlerts = alertsData?.length || 0;

      setMetrics({
        todayRevenue,
        monthlyRevenue,
        activeEmployees,
        lowStockItems,
        activeAlerts,
        totalTransactions,
      });

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
    variant = "default" 
  }: {
    title: string;
    value: string | number;
    description: string;
    icon: React.ComponentType<any>;
    trend?: "up" | "down";
    trendValue?: string;
    variant?: "default" | "warning" | "danger";
  }) => (
    <Card className={`${variant === 'warning' ? 'border-yellow-200' : variant === 'danger' ? 'border-red-200' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${
          variant === 'warning' ? 'text-yellow-600' : 
          variant === 'danger' ? 'text-red-600' : 
          'text-muted-foreground'
        }`} />
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
          value={formatCurrency(metrics.todayRevenue)}
          description={`${metrics.totalTransactions} transactions today`}
          icon={DollarSign}
        />
        
        <MetricCard
          title="Monthly Revenue"
          value={formatCurrency(metrics.monthlyRevenue)}
          description="Revenue this month"
          icon={TrendingUp}
        />
        
        <MetricCard
          title="Active Employees"
          value={metrics.activeEmployees}
          description="Employees with sales today"
          icon={Users}
        />
        
        <MetricCard
          title="Low Stock Items"
          value={metrics.lowStockItems}
          description="Items with ≤5 in stock"
          icon={Package}
          variant={metrics.lowStockItems > 0 ? "warning" : "default"}
        />
        
        <MetricCard
          title="Active Alerts"
          value={metrics.activeAlerts}
          description="Unresolved alerts"
          icon={AlertTriangle}
          variant={metrics.activeAlerts > 0 ? "danger" : "default"}
        />
        
        <MetricCard
          title="Avg Ticket"
          value={formatCurrency(metrics.totalTransactions > 0 ? metrics.todayRevenue / metrics.totalTransactions : 0)}
          description="Average transaction value"
          icon={DollarSign}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <CardHeader className="p-0 mb-3">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              View Today's Sales
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              Check Inventory
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
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
              <Badge variant="outline">Not configured</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">RT-POS Connection</span>
              <Badge variant="secondary">Offline</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Automated Reports</span>
              <Badge variant="outline">Pending setup</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};