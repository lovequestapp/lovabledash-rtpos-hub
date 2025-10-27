import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  ReferenceLine,
  ReferenceArea,
  Brush,
  ComposedChart
} from "recharts";
import { 
  TrendingUp, 
  Download, 
  Calendar as CalendarIcon, 
  Filter,
  DollarSign,
  Users,
  Package,
  Target,
  FileText,
  Mail,
  Printer,
  ArrowRight,
  ExternalLink,
  BarChart3,
  Activity,
  Zap,
  Eye,
  Settings,
  RefreshCw,
  Maximize2,
  Minimize2,
  Menu,
  X,
  Target as TargetIcon,
  Trophy
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { KPIMetricsView } from "./KPIMetricsView";

interface ReportsViewProps {
  onViewChange: (view: 'overview' | 'stores' | 'employees' | 'inventory' | 'reports' | 'alerts' | 'settings') => void;
}

// Enhanced sales data with more metrics
const salesData = [
  { 
    month: "Jan", 
    revenue: 45000, 
    transactions: 1200, 
    avgTicket: 37.50,
    profit: 13500,
    returns: 1200,
    newCustomers: 180,
    repeatCustomers: 1020,
    onlineRevenue: 12000,
    inStoreRevenue: 33000,
    target: 50000,
    growth: 12.5
  },
  { 
    month: "Feb", 
    revenue: 52000, 
    transactions: 1350, 
    avgTicket: 38.52,
    profit: 15600,
    returns: 980,
    newCustomers: 210,
    repeatCustomers: 1140,
    onlineRevenue: 15000,
    inStoreRevenue: 37000,
    target: 50000,
    growth: 15.6
  },
  { 
    month: "Mar", 
    revenue: 48000, 
    transactions: 1180, 
    avgTicket: 40.68,
    profit: 14400,
    returns: 1100,
    newCustomers: 165,
    repeatCustomers: 1015,
    onlineRevenue: 13500,
    inStoreRevenue: 34500,
    target: 50000,
    growth: -7.7
  },
  { 
    month: "Apr", 
    revenue: 61000, 
    transactions: 1420, 
    avgTicket: 42.96,
    profit: 18300,
    returns: 850,
    newCustomers: 245,
    repeatCustomers: 1175,
    onlineRevenue: 18000,
    inStoreRevenue: 43000,
    target: 50000,
    growth: 27.1
  },
  { 
    month: "May", 
    revenue: 55000, 
    transactions: 1280, 
    avgTicket: 42.97,
    profit: 16500,
    returns: 920,
    newCustomers: 195,
    repeatCustomers: 1085,
    onlineRevenue: 16000,
    inStoreRevenue: 39000,
    target: 50000,
    growth: -9.8
  },
  { 
    month: "Jun", 
    revenue: 67000, 
    transactions: 1520, 
    avgTicket: 44.08,
    profit: 20100,
    returns: 750,
    newCustomers: 280,
    repeatCustomers: 1240,
    onlineRevenue: 20000,
    inStoreRevenue: 47000,
    target: 50000,
    growth: 21.8
  },
];

const employeePerformance = [
  { name: "Sarah Johnson", sales: 45000, transactions: 320, store: "Downtown", id: "emp_001" },
  { name: "Jessica Rodriguez", sales: 38000, transactions: 280, store: "Airport", id: "emp_002" },
  { name: "Mike Chen", sales: 32000, transactions: 240, store: "Mall", id: "emp_003" },
  { name: "David Kim", sales: 28000, transactions: 210, store: "Suburban", id: "emp_004" },
  { name: "Emily Davis", sales: 25000, transactions: 190, store: "Downtown", id: "emp_005" },
];

const categoryData = [
  { name: "Smartphones", value: 145000, color: "#0088FE", category: "electronics" },
  { name: "Accessories", value: 65000, color: "#00C49F", category: "accessories" },
  { name: "Tablets", value: 35000, color: "#FFBB28", category: "electronics" },
  { name: "Cases", value: 25000, color: "#FF8042", category: "accessories" },
];

const storeComparison = [
  { store: "Downtown", revenue: 75000, employees: 8, efficiency: 9375, storeId: "DT001" },
  { store: "Airport", revenue: 62000, employees: 6, efficiency: 10333, storeId: "AP003" },
  { store: "Mall", revenue: 28000, employees: 4, efficiency: 7000, storeId: "MK002" },
  { store: "Suburban", revenue: 35000, employees: 5, efficiency: 7000, storeId: "SP004" },
];

const inventoryStatus = [
  { status: "In Stock", count: 847, color: "green", items: ["iPhone 15", "Samsung Galaxy", "AirPods Pro"] },
  { status: "Low Stock", count: 23, color: "yellow", items: ["iPhone 14", "MacBook Air", "iPad Pro"] },
  { status: "Out of Stock", count: 8, color: "red", items: ["iPhone 13", "Samsung S24", "AirPods Max"] },
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

// Custom tooltip component for advanced charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-900 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium">{entry.name}:</span>
            <span className="text-sm font-bold">
              {entry.name.includes('Growth') ? `${entry.value}%` : formatCurrency(entry.value)}
            </span>
          </div>
        ))}
        {payload[0] && (
          <div className="mt-2 pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-600">
              <div>Transactions: {formatNumber(payload[0].payload.transactions)}</div>
              <div>Avg Ticket: {formatCurrency(payload[0].payload.avgTicket)}</div>
              <div>Profit: {formatCurrency(payload[0].payload.profit)}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export const ReportsView = ({ onViewChange }: ReportsViewProps) => {
  const [selectedStore, setSelectedStore] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [chartType, setChartType] = useState("composed");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedData, setSelectedData] = useState("revenue");
  const [showTarget, setShowTarget] = useState(true);
  const [showProfit, setShowProfit] = useState(true);
  const [showOnline, setShowOnline] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your revenue report is being prepared for download.",
    });
  };

  const handleEmail = () => {
    toast({
      title: "Email Sent",
      description: "Revenue report has been sent to your email.",
    });
  };

  const handlePrint = () => {
    toast({
      title: "Print Preview",
      description: "Opening print preview for revenue report.",
    });
  };

  const renderAdvancedChart = () => {
    const data = salesData;
    
    if (chartType === "composed") {
      return (
        <ResponsiveContainer width="100%" height={isFullscreen ? 600 : 400}>
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {/* Revenue Area */}
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              fill="url(#revenueGradient)"
              strokeWidth={3}
              name="Revenue"
            />
            
            {/* Profit Bar */}
            {showProfit && (
              <Bar 
                dataKey="profit" 
                fill="#3b82f6" 
                name="Profit"
                radius={[2, 2, 0, 0]}
              />
            )}
            
            {/* Online Revenue Line */}
            {showOnline && (
              <Line
                type="monotone"
                dataKey="onlineRevenue"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Online Revenue"
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
              />
            )}
            
            {/* Target Line */}
            {showTarget && (
              <ReferenceLine 
                y={50000} 
                stroke="#ef4444" 
                strokeDasharray="5 5" 
                label={{ value: "Target", position: "topRight" }}
              />
            )}
            
            {/* Growth indicators */}
            <Line
              type="monotone"
              dataKey="growth"
              stroke="#8b5cf6"
              strokeWidth={2}
              name="Growth %"
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 3 }}
              yAxisId="right"
            />
            
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#6b7280' }} />
          </ComposedChart>
        </ResponsiveContainer>
      );
    }
    
    if (chartType === "area") {
      return (
        <ResponsiveContainer width="100%" height={isFullscreen ? 600 : 400}>
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} />
            <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              fill="url(#revenueGradient)"
              strokeWidth={3}
              name="Revenue"
            />
            {showTarget && (
              <ReferenceLine y={50000} stroke="#ef4444" strokeDasharray="5 5" />
            )}
          </AreaChart>
        </ResponsiveContainer>
      );
    }
    
    return (
      <ResponsiveContainer width="100%" height={isFullscreen ? 600 : 400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} />
          <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#10b981" 
            strokeWidth={3}
            name="Revenue"
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
          />
          {showTarget && (
            <ReferenceLine y={50000} stroke="#ef4444" strokeDasharray="5 5" />
          )}
        </LineChart>
      </ResponsiveContainer>
    );
  };

  // Mobile-friendly tab navigation
  const MobileTabNavigation = () => (
    <div className="lg:hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Reports</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
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
            variant={activeTab === "sales" ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => {
              setActiveTab("sales");
              setIsMobileMenuOpen(false);
            }}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Sales
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
            Employees
          </Button>
          <Button
            variant={activeTab === "inventory" ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => {
              setActiveTab("inventory");
              setIsMobileMenuOpen(false);
            }}
          >
            <Package className="w-4 h-4 mr-2" />
            Inventory
          </Button>
          <Button
            variant={activeTab === "kpi" ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => {
              setActiveTab("kpi");
              setIsMobileMenuOpen(false);
            }}
          >
            <TargetIcon className="w-4 h-4 mr-2" />
            KPI Metrics
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
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <h2 className="text-xl lg:text-2xl font-semibold text-primary mb-2">StoreManagerAI</h2>
          <p className="text-muted-foreground">
            Comprehensive business insights and performance metrics
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="gap-2" onClick={handleExport}>
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleEmail}>
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">Email</span>
          </Button>
          <Button variant="outline" className="gap-2" onClick={handlePrint}>
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileTabNavigation />

      {/* Desktop Tabs */}
      <div className="hidden lg:block">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="kpi" className="flex items-center gap-2">
              <TargetIcon className="w-4 h-4" />
              KPI Metrics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Key Metrics Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card 
                className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 hover:border-primary/20"
                onClick={() => onViewChange('reports')}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$328,000</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+18.2%</span> from last period
                  </p>
                </CardContent>
              </Card>
              
              <Card 
                className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 hover:border-primary/20"
                onClick={() => onViewChange('employees')}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+2</span> new hires this month
                  </p>
                </CardContent>
              </Card>
              
              <Card 
                className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 hover:border-primary/20"
                onClick={() => onViewChange('inventory')}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Items Sold</CardTitle>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,450</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+15.3%</span> from last period
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Advanced Revenue Trend Chart */}
            <Card className={cn(isFullscreen && "fixed inset-4 z-50 bg-white")}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Advanced Revenue Analytics
                    </CardTitle>
                    <CardDescription>Interactive revenue performance with multiple metrics</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsFullscreen(!isFullscreen)}
                    >
                      {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                
                {/* Chart Controls */}
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Chart Type:</label>
                    <Select value={chartType} onValueChange={setChartType}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="composed">Composed</SelectItem>
                        <SelectItem value="area">Area</SelectItem>
                        <SelectItem value="line">Line</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={showTarget}
                        onChange={(e) => setShowTarget(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Target Line</span>
                    </label>
                    
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={showProfit}
                        onChange={(e) => setShowProfit(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Profit Bars</span>
                    </label>
                    
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={showOnline}
                        onChange={(e) => setShowOnline(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Online Revenue</span>
                    </label>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {renderAdvancedChart()}
                
                {/* Chart Summary */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">
                      {formatCurrency(salesData.reduce((sum, item) => sum + item.revenue, 0))}
                    </div>
                    <div className="text-xs text-green-600">Total Revenue</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">
                      {formatCurrency(salesData.reduce((sum, item) => sum + item.profit, 0))}
                    </div>
                    <div className="text-xs text-blue-600">Total Profit</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">
                      {((salesData[salesData.length - 1].revenue - salesData[0].revenue) / salesData[0].revenue * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-purple-600">Growth Rate</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">
                      {formatCurrency(salesData.reduce((sum, item) => sum + item.revenue, 0) / salesData.length)}
                    </div>
                    <div className="text-xs text-orange-600">Avg Monthly</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Sales by Category - Clickable */}
              <Card>
                <CardHeader>
                  <CardTitle>Sales by Category</CardTitle>
                  <CardDescription>Revenue breakdown by product category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Store Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Store Performance</CardTitle>
                  <CardDescription>Revenue comparison across locations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={storeComparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="store" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Bar dataKey="revenue" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="employees" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Employee Performance</CardTitle>
                <CardDescription>Sales performance by employee</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Store</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Transactions</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employeePerformance.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.store}</TableCell>
                        <TableCell>{formatCurrency(employee.sales)}</TableCell>
                        <TableCell>{employee.transactions}</TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => onViewChange('employees')}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              {inventoryStatus.map((status) => (
                <Card key={status.status} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-${status.color}-500`} />
                      {status.status}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{status.count}</div>
                    <p className="text-sm text-muted-foreground">
                      {status.items.join(", ")}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="kpi" className="space-y-4">
            <KPIMetricsView onViewChange={onViewChange} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Mobile Content */}
      <div className="lg:hidden">
        {activeTab === "overview" && (
          <div className="space-y-4">
            {/* Key Metrics Cards */}
            <div className="grid gap-4 grid-cols-2">
              <Card 
                className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 hover:border-primary/20"
                onClick={() => onViewChange('reports')}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">$328,000</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+18.2%</span>
                  </p>
                </CardContent>
              </Card>
              
              <Card 
                className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 hover:border-primary/20"
                onClick={() => onViewChange('employees')}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+2</span>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Mobile Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Revenue Analytics
                </CardTitle>
                <CardDescription>Monthly revenue performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      name="Revenue"
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "sales" && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>Revenue breakdown by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "employees" && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Employee Performance</CardTitle>
                <CardDescription>Sales performance by employee</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {employeePerformance.map((employee) => (
                    <div key={employee.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">{employee.store}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{formatCurrency(employee.sales)}</div>
                        <div className="text-sm text-muted-foreground">{employee.transactions} transactions</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "inventory" && (
          <div className="space-y-4">
            <div className="grid gap-4 grid-cols-1">
              {inventoryStatus.map((status) => (
                <Card key={status.status} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-${status.color}-500`} />
                      {status.status}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{status.count}</div>
                    <p className="text-sm text-muted-foreground">
                      {status.items.join(", ")}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "kpi" && (
          <div className="space-y-4">
            <KPIMetricsView onViewChange={onViewChange} />
          </div>
        )}
      </div>
    </div>
  );
};
