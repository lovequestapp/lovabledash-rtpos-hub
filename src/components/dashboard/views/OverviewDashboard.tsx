import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Rocket,
  LineChart,
  Flame,
  Trophy
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface OverviewDashboardProps {
  userProfile: any;
  onViewChange: (view: 'overview' | 'stores' | 'employees' | 'inventory' | 'reports' | 'alerts' | 'settings' | 'transactions') => void;
}

export const OverviewDashboard = ({ userProfile, onViewChange }: OverviewDashboardProps) => {
  const [selectedAddress, setSelectedAddress] = useState("5424 Hwy 6 N Houston, TX 77084");
  const [metrics, setMetrics] = useState({
    todayRevenue: 0,
    monthlyRevenue: 0,
    activeEmployees: 0,
    lowStockItems: 0,
    activeAlerts: 0,
    totalTransactions: 0,
  });

  const [selectedInsight, setSelectedInsight] = useState<'performer' | 'peak' | 'uptime' | 'sync' | null>(null);
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
          <h2 className="text-xl lg:text-2xl font-semibold text-primary mb-2">Houston Phone Bill Pay - All Carriers</h2>
          <div className="mb-3">
            <Select value={selectedAddress} onValueChange={setSelectedAddress}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5424 Hwy 6 N Houston, TX 77084">5424 Hwy 6 N Houston, TX 77084</SelectItem>
                <SelectItem value="10806 S Post Oak Rd Houston, TX 77035">10806 S Post Oak Rd Houston, TX 77035</SelectItem>
                <SelectItem value="306 N Mechanic St, El Campo TX 77437">306 N Mechanic St, El Campo TX 77437</SelectItem>
              </SelectContent>
            </Select>
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

      {/* Performance Insights - Enhanced & Animated */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-card/70 backdrop-blur-lg border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Performance Insights
                </span>
              </CardTitle>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 animate-pulse">
                <Activity className="w-3 h-3 mr-1" />
                Live
              </Badge>
            </div>
            <CardDescription>Real-time performance metrics and analytics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Top Row - Animated Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Best Performer Card */}
              <div 
                onClick={() => setSelectedInsight('performer')}
                className="group relative p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:border-green-400 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-green-500 rounded-lg shadow-lg">
                        <Trophy className="w-4 h-4 text-white animate-bounce" />
                      </div>
                      <span className="text-sm font-semibold text-green-800">Best Performer</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-green-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <div className="text-2xl font-bold text-green-900 mb-1">{demoMetrics.bestPerformer}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-500 text-white text-xs">+24% vs last month</Badge>
                  </div>
                  <Progress value={92} className="h-2 bg-green-200" />
                  <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Top sales performer this month
                  </div>
                </div>
              </div>

              {/* Peak Hour Card */}
              <div 
                onClick={() => setSelectedInsight('peak')}
                className="group relative p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 hover:border-blue-400 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-500 rounded-lg shadow-lg">
                        <Flame className="w-4 h-4 text-white animate-pulse" />
                      </div>
                      <span className="text-sm font-semibold text-blue-800">Peak Hour</span>
                    </div>
                    <LineChart className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-2xl font-bold text-blue-900 mb-1">{demoMetrics.peakHour}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-500 text-white text-xs">347 transactions</Badge>
                  </div>
                  <Progress value={78} className="h-2 bg-blue-200" />
                  <div className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Highest sales volume today
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row - System Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* System Uptime Card */}
              <div 
                onClick={() => setSelectedInsight('uptime')}
                className="group relative p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:border-purple-400 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-purple-500 rounded-lg shadow-lg">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-purple-800">System Uptime</span>
                    </div>
                    <CheckCircle className="w-4 h-4 text-purple-600 group-hover:rotate-12 transition-transform" />
                  </div>
                  <div className="text-2xl font-bold text-purple-900 mb-1">{demoMetrics.systemUptime}%</div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-purple-500 text-white text-xs">30 days stable</Badge>
                  </div>
                  <Progress value={99.9} className="h-2 bg-purple-200" />
                  <div className="text-xs text-purple-600 mt-1">Exceptional reliability</div>
                </div>
              </div>

              {/* Data Sync Card */}
              <div 
                onClick={() => setSelectedInsight('sync')}
                className="group relative p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200 hover:border-orange-400 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-orange-500 rounded-lg shadow-lg">
                        <Zap className="w-4 h-4 text-white group-hover:animate-ping" />
                      </div>
                      <span className="text-sm font-semibold text-orange-800">Data Sync</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600 font-medium">Active</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-orange-900 mb-1">{demoMetrics.dataSyncStatus}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-orange-500 text-white text-xs">Real-time</Badge>
                  </div>
                  <Progress value={100} className="h-2 bg-orange-200 animate-pulse" />
                  <div className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    Syncing across all locations
                  </div>
                </div>
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

      {/* Performance Insight Detail Dialogs */}
      <Dialog open={selectedInsight !== null} onOpenChange={() => setSelectedInsight(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedInsight === 'performer' && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-green-500 rounded-xl shadow-lg">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl">Best Performer Details</DialogTitle>
                    <DialogDescription>In-depth performance analysis</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="pt-6">
                      <div className="text-sm text-green-600 mb-1">Employee Name</div>
                      <div className="text-2xl font-bold text-green-900">{demoMetrics.bestPerformer}</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="pt-6">
                      <div className="text-sm text-green-600 mb-1">Total Sales</div>
                      <div className="text-2xl font-bold text-green-900">$127,500</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Devices Sold</span>
                      <span className="font-bold">347 units</span>
                    </div>
                    <Progress value={92} className="h-2" />
                    
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm">Accessories Sold</span>
                      <span className="font-bold">892 items</span>
                    </div>
                    <Progress value={88} className="h-2" />
                    
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm">Plan Activations</span>
                      <span className="font-bold">234 plans</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-3xl font-bold text-green-600">+24%</div>
                        <div className="text-xs text-green-700 mt-1">vs Last Month</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-green-600">4.9</div>
                        <div className="text-xs text-green-700 mt-1">Customer Rating</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-green-600">#1</div>
                        <div className="text-xs text-green-700 mt-1">Store Ranking</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {selectedInsight === 'peak' && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl">Peak Hour Analysis</DialogTitle>
                    <DialogDescription>Traffic and sales patterns</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <div className="text-4xl font-bold text-blue-900">{demoMetrics.peakHour}</div>
                      <div className="text-sm text-blue-600 mt-1">Highest Sales Volume</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">347</div>
                        <div className="text-xs text-blue-700">Transactions</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">$42.3K</div>
                        <div className="text-xs text-blue-700">Revenue</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">890</div>
                        <div className="text-xs text-blue-700">Customers</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Hourly Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { hour: '10:00 AM - 11:00 AM', transactions: 45, revenue: '$5,200' },
                      { hour: '11:00 AM - 12:00 PM', transactions: 62, revenue: '$7,800' },
                      { hour: '12:00 PM - 1:00 PM', transactions: 89, revenue: '$12,400' },
                      { hour: '1:00 PM - 2:00 PM', transactions: 151, revenue: '$17,100', peak: true },
                    ].map((slot, idx) => (
                      <div key={idx} className={`p-3 rounded-lg ${slot.peak ? 'bg-blue-100 border-2 border-blue-400' : 'bg-gray-50'}`}>
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <div className="font-semibold">{slot.hour}</div>
                            <div className="text-sm text-gray-600">{slot.transactions} transactions</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">{slot.revenue}</div>
                            {slot.peak && <Badge className="mt-1 bg-blue-500">Peak</Badge>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {selectedInsight === 'uptime' && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-purple-500 rounded-xl shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl">System Uptime Report</DialogTitle>
                    <DialogDescription>Reliability and performance metrics</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <div className="text-5xl font-bold text-purple-900">{demoMetrics.systemUptime}%</div>
                      <div className="text-sm text-purple-600 mt-1">30-Day Average</div>
                      <Badge className="mt-3 bg-purple-500 text-white">Exceptional</Badge>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold">720</div>
                        <div className="text-sm text-gray-600">Hours Online</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold">0.7</div>
                        <div className="text-sm text-gray-600">Hours Downtime</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>System Health</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Database Performance</span>
                        <span className="text-sm font-bold">98.5%</span>
                      </div>
                      <Progress value={98.5} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">API Response Time</span>
                        <span className="text-sm font-bold">45ms avg</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Server Load</span>
                        <span className="text-sm font-bold">34%</span>
                      </div>
                      <Progress value={34} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {selectedInsight === 'sync' && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-orange-500 rounded-xl shadow-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl">Data Synchronization</DialogTitle>
                    <DialogDescription>Real-time sync status across all locations</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                <Card className="bg-gradient-to-br from-orange-50 to-amber-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-3xl font-bold text-orange-900">{demoMetrics.dataSyncStatus}</div>
                        <div className="text-sm text-orange-600 mt-1">All Systems Synchronized</div>
                      </div>
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <Progress value={100} className="h-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Store Sync Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { store: 'Post Oak Store', status: 'Synced', lastSync: '2 sec ago', icon: CheckCircle, color: 'text-green-500' },
                      { store: 'Fondren Store', status: 'Synced', lastSync: '5 sec ago', icon: CheckCircle, color: 'text-green-500' },
                      { store: 'West Bellfort Store', status: 'Synced', lastSync: '3 sec ago', icon: CheckCircle, color: 'text-green-500' },
                      { store: 'El Campo Store', status: 'Synced', lastSync: '8 sec ago', icon: CheckCircle, color: 'text-green-500' },
                    ].map((store, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <store.icon className={`w-5 h-5 ${store.color}`} />
                          <div>
                            <div className="font-semibold">{store.store}</div>
                            <div className="text-xs text-gray-600">{store.lastSync}</div>
                          </div>
                        </div>
                        <Badge className="bg-green-500 text-white">{store.status}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold text-orange-600">2.3s</div>
                      <div className="text-xs text-gray-600 mt-1">Avg Sync Time</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold text-orange-600">12.5K</div>
                      <div className="text-xs text-gray-600 mt-1">Records Today</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold text-orange-600">0</div>
                      <div className="text-xs text-gray-600 mt-1">Sync Errors</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
