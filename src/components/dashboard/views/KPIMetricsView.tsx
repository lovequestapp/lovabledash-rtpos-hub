import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown,
  Target,
  Award,
  Users,
  Store,
  DollarSign,
  Clock,
  Activity,
  Zap,
  Star,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Settings,
  Trophy,
  Medal,
  Crown,
  Flame,
  Rocket,
  Brain,
  Shield,
  Target as TargetIcon
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface KPIMetricsViewProps {
  onViewChange: (view: 'overview' | 'stores' | 'employees' | 'inventory' | 'reports' | 'alerts' | 'settings') => void;
}

// Enhanced KPI data
const storeKPIData = [
  {
    storeId: "DT001",
    storeName: "Downtown",
    manager: "Sarah Johnson",
    revenue: 125000,
    target: 100000,
    transactions: 1850,
    avgTicket: 67.57,
    conversionRate: 72.5,
    customerSatisfaction: 4.8,
    employeeCount: 8,
    efficiency: 15625,
    growth: 15.2,
    profitMargin: 32.1,
    returnRate: 1.8,
    inventoryTurnover: 4.2,
    peakHour: "2-4 PM",
    status: "excellent",
    rank: 1
  },
  {
    storeId: "AP003",
    storeName: "Airport",
    manager: "Mike Chen",
    revenue: 98000,
    target: 90000,
    transactions: 1420,
    avgTicket: 69.01,
    conversionRate: 68.3,
    customerSatisfaction: 4.6,
    employeeCount: 6,
    efficiency: 16333,
    growth: 8.7,
    profitMargin: 29.8,
    returnRate: 2.1,
    inventoryTurnover: 3.8,
    peakHour: "10-12 PM",
    status: "good",
    rank: 2
  },
  {
    storeId: "MK002",
    storeName: "Mall",
    manager: "Jessica Rodriguez",
    revenue: 75000,
    target: 80000,
    transactions: 1120,
    avgTicket: 66.96,
    conversionRate: 65.1,
    customerSatisfaction: 4.4,
    employeeCount: 4,
    efficiency: 18750,
    growth: -3.2,
    profitMargin: 28.5,
    returnRate: 2.8,
    inventoryTurnover: 3.2,
    peakHour: "1-3 PM",
    status: "needs_improvement",
    rank: 3
  },
  {
    storeId: "SP004",
    storeName: "Suburban",
    manager: "David Kim",
    revenue: 68000,
    target: 70000,
    transactions: 980,
    avgTicket: 69.39,
    conversionRate: 63.8,
    customerSatisfaction: 4.3,
    employeeCount: 5,
    efficiency: 13600,
    growth: 5.1,
    profitMargin: 27.2,
    returnRate: 3.1,
    inventoryTurnover: 2.9,
    peakHour: "3-5 PM",
    status: "good",
    rank: 4
  }
];

const employeeKPIData = [
  {
    id: "emp_001",
    name: "Sarah Johnson",
    store: "Downtown",
    position: "Store Manager",
    sales: 45000,
    target: 40000,
    transactions: 320,
    avgTicket: 140.63,
    conversionRate: 78.5,
    customerRating: 4.9,
    attendance: 98.5,
    trainingHours: 24,
    efficiency: 112.5,
    growth: 18.2,
    rank: 1,
    status: "top_performer",
    achievements: ["Top Sales", "Customer Excellence", "Team Leader"]
  },
  {
    id: "emp_002",
    name: "Mike Chen",
    store: "Airport",
    position: "Senior Sales",
    sales: 38000,
    target: 35000,
    transactions: 280,
    avgTicket: 135.71,
    conversionRate: 72.3,
    customerRating: 4.7,
    attendance: 96.8,
    trainingHours: 18,
    efficiency: 108.6,
    growth: 12.5,
    rank: 2,
    status: "high_performer",
    achievements: ["Sales Excellence", "Customer Service"]
  },
  {
    id: "emp_003",
    name: "Jessica Rodriguez",
    store: "Mall",
    position: "Sales Associate",
    sales: 32000,
    target: 30000,
    transactions: 240,
    avgTicket: 133.33,
    conversionRate: 68.9,
    customerRating: 4.5,
    attendance: 94.2,
    trainingHours: 12,
    efficiency: 106.7,
    growth: 8.3,
    rank: 3,
    status: "performer",
    achievements: ["Sales Growth"]
  },
  {
    id: "emp_004",
    name: "David Kim",
    store: "Suburban",
    position: "Sales Associate",
    sales: 28000,
    target: 30000,
    transactions: 210,
    avgTicket: 133.33,
    conversionRate: 65.2,
    customerRating: 4.3,
    attendance: 92.1,
    trainingHours: 8,
    efficiency: 93.3,
    growth: -2.1,
    rank: 4,
    status: "needs_improvement",
    achievements: []
  },
  {
    id: "emp_005",
    name: "Emily Davis",
    store: "Downtown",
    position: "Sales Associate",
    sales: 25000,
    target: 28000,
    transactions: 190,
    avgTicket: 131.58,
    conversionRate: 62.8,
    customerRating: 4.2,
    attendance: 89.5,
    trainingHours: 6,
    efficiency: 89.3,
    growth: -5.7,
    rank: 5,
    status: "underperforming",
    achievements: []
  }
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num);
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'excellent':
    case 'top_performer':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'good':
    case 'high_performer':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'performer':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'needs_improvement':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'underperforming':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'excellent':
    case 'top_performer':
      return <Crown className="w-4 h-4" />;
    case 'good':
    case 'high_performer':
      return <Trophy className="w-4 h-4" />;
    case 'performer':
      return <Medal className="w-4 h-4" />;
    case 'needs_improvement':
      return <AlertTriangle className="w-4 h-4" />;
    case 'underperforming':
      return <XCircle className="w-4 h-4" />;
    default:
      return <Target className="w-4 h-4" />;
  }
};

const KPICard = ({ 
  title, 
  value, 
  target, 
  trend, 
  trendValue,
  icon: Icon,
  color = "blue",
  onClick,
  clickable = false
}: {
  title: string;
  value: string | number;
  target?: string | number;
  trend?: "up" | "down";
  trendValue?: string;
  icon: React.ComponentType<any>;
  color?: string;
  onClick?: () => void;
  clickable?: boolean;
}) => (
  <Card 
    className={cn(
      "transition-all duration-200",
      clickable && "cursor-pointer hover:shadow-lg hover:scale-[1.02] hover:border-primary/20"
    )}
    onClick={onClick}
  >
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className={cn(
        "p-2 rounded-lg",
        color === 'green' ? 'bg-green-100 text-green-600' :
        color === 'red' ? 'bg-red-100 text-red-600' :
        color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
        'bg-blue-100 text-blue-600'
      )}>
        <Icon className="h-4 w-4" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold mb-1">{value}</div>
      {target && (
        <div className="text-sm text-muted-foreground mb-2">
          Target: {target}
        </div>
      )}
      <div className="flex items-center gap-2">
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

export const KPIMetricsView = ({ onViewChange }: KPIMetricsViewProps) => {
  const [selectedStore, setSelectedStore] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleExport = () => {
    toast({
      title: "KPI Report Export",
      description: "Your KPI metrics report is being prepared for download.",
    });
  };

  const handleRefresh = () => {
    toast({
      title: "Data Refreshed",
      description: "KPI metrics have been updated with latest data.",
    });
  };

  // Calculate overall KPIs
  const overallKPIs = {
    totalRevenue: storeKPIData.reduce((sum, store) => sum + store.revenue, 0),
    totalTarget: storeKPIData.reduce((sum, store) => sum + store.target, 0),
    avgConversionRate: storeKPIData.reduce((sum, store) => sum + store.conversionRate, 0) / storeKPIData.length,
    avgCustomerSatisfaction: storeKPIData.reduce((sum, store) => sum + store.customerSatisfaction, 0) / storeKPIData.length,
    totalEmployees: employeeKPIData.length,
    topPerformers: employeeKPIData.filter(emp => emp.status === 'top_performer' || emp.status === 'high_performer').length,
    avgGrowth: storeKPIData.reduce((sum, store) => sum + store.growth, 0) / storeKPIData.length
  };

  // Mobile-friendly tab navigation
  const MobileTabNavigation = () => (
    <div className="lg:hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">KPI Metrics</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? 'Close' : 'Menu'}
        </Button>
      </div>
      
      {isMobileMenuOpen && (
        <div className="space-y-2 mb-6">
          <Button
            variant={activeTab === "overview" ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => {
              setActiveTab("overview");
              setIsMobileMenuOpen(false);
            }}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={activeTab === "stores" ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => {
              setActiveTab("stores");
              setIsMobileMenuOpen(false);
            }}
          >
            <Store className="w-4 h-4 mr-2" />
            Store KPIs
          </Button>
          <Button
            variant={activeTab === "employees" ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => {
              setActiveTab("employees");
              setIsMobileMenuOpen(false);
            }}
          >
            <Users className="w-4 h-4 mr-2" />
            Employee KPIs
          </Button>
          <Button
            variant={activeTab === "analytics" ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => {
              setActiveTab("analytics");
              setIsMobileMenuOpen(false);
            }}
          >
            <Activity className="w-4 h-4 mr-2" />
            Analytics
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600" />
            KPI Metrics & Performance
          </h1>
          <p className="text-muted-foreground">
            Comprehensive performance tracking for stores and employees
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileTabNavigation />

      {/* Desktop Tabs */}
      <div className="hidden lg:block">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stores">Store KPIs</TabsTrigger>
            <TabsTrigger value="employees">Employee KPIs</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Overall KPI Cards */}
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
              <KPICard
                title="Total Revenue"
                value={formatCurrency(overallKPIs.totalRevenue)}
                target={formatCurrency(overallKPIs.totalTarget)}
                icon={DollarSign}
                color="green"
                trend="up"
                trendValue="+12.5%"
                onClick={() => setActiveTab("stores")}
                clickable={true}
              />
              
              <KPICard
                title="Avg Conversion Rate"
                value={`${overallKPIs.avgConversionRate.toFixed(1)}%`}
                target="70%"
                icon={Target}
                color="blue"
                trend="up"
                trendValue="+2.3%"
                onClick={() => setActiveTab("stores")}
                clickable={true}
              />
              
              <KPICard
                title="Customer Satisfaction"
                value={`${overallKPIs.avgCustomerSatisfaction.toFixed(1)}/5`}
                target="4.5/5"
                icon={Star}
                color="yellow"
                trend="up"
                trendValue="+0.2"
                onClick={() => setActiveTab("stores")}
                clickable={true}
              />
              
              <KPICard
                title="Top Performers"
                value={`${overallKPIs.topPerformers}/${overallKPIs.totalEmployees}`}
                target="60%"
                icon={Trophy}
                color="green"
                trend="up"
                trendValue="+2"
                onClick={() => setActiveTab("employees")}
                clickable={true}
              />
            </div>

            {/* Store Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Store Performance Comparison
                </CardTitle>
                <CardDescription>Revenue vs Target by Store</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={storeKPIData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="storeName" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
                    <Bar dataKey="target" fill="#3b82f6" name="Target" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-600" />
                    Top Performing Stores
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {storeKPIData.slice(0, 3).map((store, index) => (
                      <div key={store.storeId} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold",
                            index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-500"
                          )}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{store.storeName}</div>
                            <div className="text-sm text-muted-foreground">{store.manager}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{formatCurrency(store.revenue)}</div>
                          <div className="text-sm text-muted-foreground">{store.growth}% growth</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-green-600" />
                    Top Performing Employees
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {employeeKPIData.slice(0, 3).map((employee, index) => (
                      <div key={employee.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold",
                            index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-500"
                          )}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-muted-foreground">{employee.store}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{formatCurrency(employee.sales)}</div>
                          <div className="text-sm text-muted-foreground">{employee.growth}% growth</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stores" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="w-5 h-5 text-blue-600" />
                  Store KPI Dashboard
                </CardTitle>
                <CardDescription>Comprehensive store performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Store</TableHead>
                      <TableHead>Manager</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Growth</TableHead>
                      <TableHead>Conversion</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Rank</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {storeKPIData.map((store) => (
                      <TableRow key={store.storeId}>
                        <TableCell className="font-medium">{store.storeName}</TableCell>
                        <TableCell>{store.manager}</TableCell>
                        <TableCell>{formatCurrency(store.revenue)}</TableCell>
                        <TableCell>{formatCurrency(store.target)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {store.growth > 0 ? (
                              <ArrowUpRight className="w-3 h-3 text-green-600" />
                            ) : (
                              <ArrowDownRight className="w-3 h-3 text-red-600" />
                            )}
                            <span className={store.growth > 0 ? "text-green-600" : "text-red-600"}>
                              {store.growth}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{store.conversionRate}%</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            {store.customerSatisfaction}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(store.status)}>
                            {getStatusIcon(store.status)}
                            <span className="ml-1 capitalize">{store.status.replace('_', ' ')}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {store.rank === 1 && <Crown className="w-4 h-4 text-yellow-500" />}
                            {store.rank === 2 && <Trophy className="w-4 h-4 text-gray-500" />}
                            {store.rank === 3 && <Medal className="w-4 h-4 text-orange-500" />}
                            <span className="font-bold">#{store.rank}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employees" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  Employee KPI Dashboard
                </CardTitle>
                <CardDescription>Individual employee performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Store</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Growth</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Rank</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employeeKPIData.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.store}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>{formatCurrency(employee.sales)}</TableCell>
                        <TableCell>{formatCurrency(employee.target)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {employee.growth > 0 ? (
                              <ArrowUpRight className="w-3 h-3 text-green-600" />
                            ) : (
                              <ArrowDownRight className="w-3 h-3 text-red-600" />
                            )}
                            <span className={employee.growth > 0 ? "text-green-600" : "text-red-600"}>
                              {employee.growth}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            {employee.customerRating}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(employee.status)}>
                            {getStatusIcon(employee.status)}
                            <span className="ml-1 capitalize">{employee.status.replace('_', ' ')}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {employee.rank === 1 && <Crown className="w-4 h-4 text-yellow-500" />}
                            {employee.rank === 2 && <Trophy className="w-4 h-4 text-gray-500" />}
                            {employee.rank === 3 && <Medal className="w-4 h-4 text-orange-500" />}
                            <span className="font-bold">#{employee.rank}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Distribution</CardTitle>
                  <CardDescription>Store performance across key metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={storeKPIData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="storeName" />
                      <PolarRadiusAxis />
                      <Radar
                        name="Revenue"
                        dataKey="revenue"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.3}
                      />
                      <Radar
                        name="Conversion Rate"
                        dataKey="conversionRate"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.3}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Growth Trends</CardTitle>
                  <CardDescription>Month-over-month growth by store</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={storeKPIData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="storeName" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="growth"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="Growth %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Mobile Content */}
      <div className="lg:hidden">
        {activeTab === "overview" && (
          <div className="space-y-4">
            {/* Overall KPI Cards */}
            <div className="grid gap-4 grid-cols-2">
              <KPICard
                title="Total Revenue"
                value={formatCurrency(overallKPIs.totalRevenue)}
                icon={DollarSign}
                color="green"
                trend="up"
                trendValue="+12.5%"
              />
              
              <KPICard
                title="Conversion Rate"
                value={`${overallKPIs.avgConversionRate.toFixed(1)}%`}
                icon={Target}
                color="blue"
                trend="up"
                trendValue="+2.3%"
              />
            </div>

            {/* Mobile Store Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Top Stores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {storeKPIData.slice(0, 3).map((store, index) => (
                    <div key={store.storeId} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm",
                          index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-500"
                        )}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{store.storeName}</div>
                          <div className="text-sm text-muted-foreground">{store.manager}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm">{formatCurrency(store.revenue)}</div>
                        <div className="text-xs text-muted-foreground">{store.growth}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "stores" && (
          <div className="space-y-4">
            {storeKPIData.map((store) => (
              <Card key={store.storeId}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{store.storeName}</CardTitle>
                    <Badge className={getStatusColor(store.status)}>
                      {getStatusIcon(store.status)}
                      <span className="ml-1 capitalize">{store.status.replace('_', ' ')}</span>
                    </Badge>
                  </div>
                  <CardDescription>{store.manager}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Revenue</div>
                      <div className="font-bold">{formatCurrency(store.revenue)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Target</div>
                      <div className="font-bold">{formatCurrency(store.target)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Growth</div>
                      <div className={cn(
                        "font-bold flex items-center gap-1",
                        store.growth > 0 ? "text-green-600" : "text-red-600"
                      )}>
                        {store.growth > 0 ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3" />
                        )}
                        {store.growth}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Rating</div>
                      <div className="font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        {store.customerSatisfaction}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "employees" && (
          <div className="space-y-4">
            {employeeKPIData.map((employee) => (
              <Card key={employee.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{employee.name}</CardTitle>
                    <Badge className={getStatusColor(employee.status)}>
                      {getStatusIcon(employee.status)}
                      <span className="ml-1 capitalize">{employee.status.replace('_', ' ')}</span>
                    </Badge>
                  </div>
                  <CardDescription>{employee.position} • {employee.store}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Sales</div>
                      <div className="font-bold">{formatCurrency(employee.sales)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Target</div>
                      <div className="font-bold">{formatCurrency(employee.target)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Growth</div>
                      <div className={cn(
                        "font-bold flex items-center gap-1",
                        employee.growth > 0 ? "text-green-600" : "text-red-600"
                      )}>
                        {employee.growth > 0 ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3" />
                        )}
                        {employee.growth}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Rating</div>
                      <div className="font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        {employee.customerRating}
                      </div>
                    </div>
                  </div>
                  
                  {employee.achievements.length > 0 && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Achievements</div>
                      <div className="flex flex-wrap gap-1">
                        {employee.achievements.map((achievement, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Key metrics across all stores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Total Revenue</span>
                    </div>
                    <div className="text-lg font-bold text-green-900">{formatCurrency(overallKPIs.totalRevenue)}</div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Avg Conversion</span>
                    </div>
                    <div className="text-lg font-bold text-blue-900">{overallKPIs.avgConversionRate.toFixed(1)}%</div>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">Customer Rating</span>
                    </div>
                    <div className="text-lg font-bold text-yellow-900">{overallKPIs.avgCustomerSatisfaction.toFixed(1)}/5</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
