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
  ArrowRight,
  Activity,
  Target,
  Zap,
  BarChart3,
  Eye,
  Settings,
  Star,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Shield,
  Brain,
  Rocket
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface OverviewDashboardProps {
  userProfile: any;
  onViewChange: (view: 'overview' | 'stores' | 'employees' | 'inventory' | 'reports' | 'alerts' | 'settings' | 'transactions') => void;
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

  // Enhanced demo data for realistic dashboard
  const demoMetrics = {
    todayRevenue: 2847.50,
    monthlyRevenue: 45620.30,
    activeEmployees: 8,
    lowStockItems: 12,
    activeAlerts: 3,
    totalTransactions: 47,
    todayTransactions: 23,
    pendingTransactions: 3,
    failedTransactions: 1,
    averageTransactionValue: 60.58,
    avgTicket: 60.58,
    weeklyGrowth: 12.5,
    monthlyGrowth: 8.3,
    inventoryValue: 125430.00,
    topSellingCategory: "Electronics",
    customerSatisfaction: 4.8,
    conversionRate: 68.5,
    returnRate: 2.1,
    profitMargin: 28.4,
    newCustomers: 45,
    repeatCustomers: 32,
    onlineOrders: 23,
    inStoreOrders: 24,
    peakHour: "2-4 PM",
    bestPerformer: "Sarah Johnson",
    systemUptime: 99.8,
    dataSyncStatus: "Real-time"
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
    clickable = false,
    gradient = false,
    sparkle = false
  }: {
    title: string;
    value: string | number;
    description: string;
    icon: React.ComponentType<any>;
    trend?: "up" | "down";
    trendValue?: string;
    variant?: "default" | "warning" | "danger" | "success";
    onClick?: () => void;
    clickable?: boolean;
    gradient?: boolean;
    sparkle?: boolean;
  }) => (
    <Card 
      className={cn(
        "transition-all duration-300 group",
        clickable && "cursor-pointer hover:shadow-xl hover:scale-[1.02] hover:border-primary/20",
        variant === 'warning' ? 'border-yellow-200 bg-yellow-50/50' : 
        variant === 'danger' ? 'border-red-200 bg-red-50/50' : 
        variant === 'success' ? 'border-green-200 bg-green-50/50' : '',
        gradient && "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200",
        sparkle && "relative overflow-hidden"
      )}
      onClick={onClick}
    >
      {sparkle && (
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full -translate-y-10 translate-x-10" />
      )}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn(
          "text-sm font-medium",
          variant === 'warning' ? 'text-yellow-700' : 
          variant === 'danger' ? 'text-red-700' : 
          variant === 'success' ? 'text-green-700' : 'text-foreground'
        )}>
          {title}
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className={cn(
            "p-2 rounded-lg",
            variant === 'warning' ? 'bg-yellow-100 text-yellow-600' : 
            variant === 'danger' ? 'bg-red-100 text-red-600' : 
            variant === 'success' ? 'bg-green-100 text-green-600' : 
            'bg-muted text-muted-foreground'
          )}>
            <Icon className="h-4 w-4" />
          </div>
          {clickable && <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:translate-x-1 transition-transform" />}
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn(
          "text-2xl font-bold mb-1",
          variant === 'warning' ? 'text-yellow-800' : 
          variant === 'danger' ? 'text-red-800' : 
          variant === 'success' ? 'text-green-800' : 'text-foreground'
        )}>
          {value}
        </div>
        <div className="flex items-center gap-2">
          <p className={cn(
            "text-xs",
            variant === 'warning' ? 'text-yellow-600' : 
            variant === 'danger' ? 'text-red-600' : 
            variant === 'success' ? 'text-green-600' : 'text-muted-foreground'
          )}>
            {description}
          </p>
          {trend && trendValue && (
            <Badge 
              variant={trend === "up" ? "default" : "secondary"} 
              className={cn(
                "text-xs",
                trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              )}
            >
              {trend === "up" ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
              {trendValue}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="p-4 lg:p-6 card-premium">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {userProfile?.full_name || userProfile?.email}
            </p>
          </div>
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        </div>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
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
    <div className="p-4 lg:p-6 space-y-6">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Dashboard</h1>
            <Badge variant="outline" className="gap-1">
              <Activity className="w-3 h-3" />
              Live
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Welcome back, {userProfile?.full_name || userProfile?.email}
          </p>
          {userProfile?.stores && (
            <p className="text-sm text-muted-foreground mt-1">
              {userProfile.stores.name} • {userProfile.role}
            </p>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={loadDashboardMetrics} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          <Badge variant="outline" className="gap-2">
            <Calendar className="w-3 h-3" />
            {new Date().toLocaleDateString()}
          </Badge>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Today's Revenue"
          value={formatCurrency(demoMetrics.todayRevenue)}
          description={`${demoMetrics.totalTransactions} transactions`}
          icon={DollarSign}
          trend="up"
          trendValue={`+${demoMetrics.weeklyGrowth}%`}
          onClick={() => onViewChange('reports')}
          clickable={true}
          gradient={true}
          sparkle={true}
        />
        
        <MetricCard
          title="Monthly Revenue"
          value={formatCurrency(demoMetrics.monthlyRevenue)}
          description="This month"
          icon={TrendingUp}
          trend="up"
          trendValue={`+${demoMetrics.monthlyGrowth}%`}
          onClick={() => onViewChange('reports')}
          clickable={true}
          variant="success"
        />
        
        <MetricCard
          title="Active Employees"
          value={demoMetrics.activeEmployees}
          description="With sales today"
          icon={Users}
          onClick={() => onViewChange('employees')}
          clickable={true}
        />
        
        <MetricCard
          title="Low Stock Items"
          value={demoMetrics.lowStockItems}
          description="Items ≤5 in stock"
          icon={Package}
          variant={demoMetrics.lowStockItems > 0 ? "warning" : "default"}
          onClick={() => onViewChange('inventory')}
          clickable={true}
        />
      </div>

      {/* Secondary Metrics Grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
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
          description="Per transaction"
          icon={Target}
          trend="up"
          trendValue="+5.2%"
          onClick={() => onViewChange('reports')}
          clickable={true}
        />
        
        <MetricCard
          title="Customer Rating"
          value={`${demoMetrics.customerSatisfaction}/5`}
          description="Satisfaction score"
          icon={Star}
          trend="up"
          trendValue="+0.2"
          onClick={() => onViewChange('reports')}
          clickable={true}
          variant="success"
        />
        
        <MetricCard
          title="Conversion Rate"
          value={`${demoMetrics.conversionRate}%`}
          description="Visitor to customer"
          icon={TrendingUp}
          trend="up"
          trendValue="+3.1%"
          onClick={() => onViewChange('reports')}
          clickable={true}
        />
      </div>

      {/* Performance Insights */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Performance Insights
            </CardTitle>
            <CardDescription>Key performance indicators and trends</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Best Performer</span>
                </div>
                <div className="text-lg font-bold text-green-900">{demoMetrics.bestPerformer}</div>
                <div className="text-xs text-green-600">Top sales this month</div>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Peak Hour</span>
                </div>
                <div className="text-lg font-bold text-blue-900">{demoMetrics.peakHour}</div>
                <div className="text-xs text-blue-600">Highest sales volume</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">System Uptime</span>
                </div>
                <div className="text-lg font-bold text-purple-900">{demoMetrics.systemUptime}%</div>
                <div className="text-xs text-purple-600">Last 30 days</div>
              </div>
              
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">Data Sync</span>
                </div>
                <div className="text-lg font-bold text-orange-900">{demoMetrics.dataSyncStatus}</div>
                <div className="text-xs text-orange-600">Real-time updates</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-indigo-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start gap-2"
              onClick={() => onViewChange('reports')}
            >
              <BarChart3 className="w-4 h-4" />
              View Today's Sales
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start gap-2"
              onClick={() => onViewChange('inventory')}
            >
              <Package className="w-4 h-4" />
              Check Inventory
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start gap-2"
              onClick={() => onViewChange('reports')}
            >
              <TrendingUp className="w-4 h-4" />
              Generate Report
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start gap-2"
              onClick={() => onViewChange('employees')}
            >
              <Users className="w-4 h-4" />
              Employee Performance
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Status & Analytics */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              System Status
            </CardTitle>
            <CardDescription>
              RT-POS integration and data sync status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">RT-POS Connection</span>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800">Online</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Last Data Sync</span>
              </div>
              <Badge variant="outline">2 minutes ago</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium">Automated Reports</span>
              </div>
              <Badge variant="default" className="bg-purple-100 text-purple-800">Active</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              Today's Highlights
            </CardTitle>
            <CardDescription>
              Key achievements and milestones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">New Customers</span>
              </div>
              <div className="text-lg font-bold text-yellow-900">{demoMetrics.newCustomers}</div>
              <div className="text-xs text-yellow-600">First-time buyers today</div>
            </div>
            
            <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Profit Margin</span>
              </div>
              <div className="text-lg font-bold text-green-900">{demoMetrics.profitMargin}%</div>
              <div className="text-xs text-green-600">Above industry average</div>
            </div>
            
            <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Return Rate</span>
              </div>
              <div className="text-lg font-bold text-blue-900">{demoMetrics.returnRate}%</div>
              <div className="text-xs text-blue-600">Below 3% target</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
