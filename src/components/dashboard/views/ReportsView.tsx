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
  Cell
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
  ExternalLink
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ReportsViewProps {
  onViewChange: (view: 'overview' | 'stores' | 'employees' | 'inventory' | 'reports' | 'alerts' | 'settings') => void;
}

const salesData = [
  { month: "Jan", revenue: 45000, transactions: 1200, avgTicket: 37.50 },
  { month: "Feb", revenue: 52000, transactions: 1350, avgTicket: 38.52 },
  { month: "Mar", revenue: 48000, transactions: 1180, avgTicket: 40.68 },
  { month: "Apr", revenue: 61000, transactions: 1420, avgTicket: 42.96 },
  { month: "May", revenue: 55000, transactions: 1280, avgTicket: 42.97 },
  { month: "Jun", revenue: 67000, transactions: 1520, avgTicket: 44.08 },
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

export const ReportsView = ({ onViewChange }: ReportsViewProps) => {
  const [selectedStore, setSelectedStore] = useState("all");
  const [dateRange, setDateRange] = useState("last_30_days");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleExportReport = (type: string) => {
    toast({
      title: "Export Started",
      description: `${type} report is being generated and will be downloaded shortly.`,
    });
  };

  const handleEmailReport = () => {
    toast({
      title: "Email Sent",
      description: "Report has been sent to your email address.",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleEmployeeClick = (employeeId: string) => {
    toast({
      title: "Employee Details",
      description: `Viewing detailed performance for employee ${employeeId}`,
    });
    onViewChange('employees');
  };

  const handleStoreClick = (storeId: string) => {
    toast({
      title: "Store Details",
      description: `Viewing detailed analytics for store ${storeId}`,
    });
    onViewChange('stores');
  };

  const handleInventoryClick = (category: string) => {
    toast({
      title: "Inventory Analysis",
      description: `Viewing detailed inventory for ${category}`,
    });
    onViewChange('inventory');
  };

  const handleCategoryClick = (category: string) => {
    toast({
      title: "Category Analysis",
      description: `Viewing detailed sales analysis for ${category}`,
    });
    onViewChange('inventory');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights and performance analytics
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEmailReport} className="gap-2">
            <Mail className="w-4 h-4" />
            Email Report
          </Button>
          <Button variant="outline" onClick={() => handleExportReport("PDF")} className="gap-2">
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
          <CardDescription>
            Customize your report parameters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Select value={selectedStore} onValueChange={setSelectedStore}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select store" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stores</SelectItem>
                <SelectItem value="DT001">Downtown</SelectItem>
                <SelectItem value="MK002">Mall Kiosk</SelectItem>
                <SelectItem value="AP003">Airport</SelectItem>
                <SelectItem value="SP004">Suburban</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last_7_days">Last 7 Days</SelectItem>
                <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                <SelectItem value="last_90_days">Last 90 Days</SelectItem>
                <SelectItem value="this_year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>

            {dateRange === "custom" && (
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      {startDate ? format(startDate, "MMM dd") : "Start Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      {endDate ? format(endDate, "MMM dd") : "End Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Report Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales Analysis</TabsTrigger>
          <TabsTrigger value="employees">Employee Performance</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Reports</TabsTrigger>
          <TabsTrigger value="stores">Store Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Key Metrics - Now Clickable */}
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
                <div className="text-2xl font-bold">{formatCurrency(328000)}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12.5%</span> from last period
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 hover:border-primary/20"
              onClick={() => onViewChange('reports')}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7,950</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8.2%</span> from last period
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 hover:border-primary/20"
              onClick={() => onViewChange('reports')}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Ticket</CardTitle>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(41.26)}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+3.8%</span> from last period
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

          {/* Sales Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    name="Revenue"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Sales by Category - Clickable */}
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>Revenue distribution across product categories</CardDescription>
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
                <div className="mt-4 space-y-2">
                  {categoryData.map((category) => (
                    <div 
                      key={category.name}
                      className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => handleCategoryClick(category.category)}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded" 
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{formatCurrency(category.value)}</span>
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                  </div>
              </CardContent>
            </Card>

            {/* Monthly Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Comparison</CardTitle>
                <CardDescription>Revenue and transaction trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                    <Bar dataKey="transactions" fill="#82ca9d" name="Transactions" />
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
              <CardDescription>Top performing sales representatives</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Store</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead>Transactions</TableHead>
                    <TableHead>Avg per Transaction</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeePerformance.map((employee, index) => (
                    <TableRow 
                      key={employee.name}
                      className="cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => handleEmployeeClick(employee.id)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          {employee.name}
                        </div>
                      </TableCell>
                      <TableCell>{employee.store}</TableCell>
                      <TableCell>{formatCurrency(employee.sales)}</TableCell>
                      <TableCell>{employee.transactions}</TableCell>
                      <TableCell>{formatCurrency(employee.sales / employee.transactions)}</TableCell>
                      <TableCell>
                        <Badge variant={index < 2 ? "default" : index < 4 ? "secondary" : "outline"}>
                          {index < 2 ? "Excellent" : index < 4 ? "Good" : "Average"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ExternalLink className="h-4 w-4" />
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
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Turnover</CardTitle>
                <CardDescription>Product category performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryData.map((category) => (
                    <div 
                      key={category.name} 
                      className="flex items-center justify-between p-3 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => handleInventoryClick(category.category)}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded" 
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span>{category.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="font-medium">{formatCurrency(category.value)}</div>
                          <div className="text-sm text-muted-foreground">
                            {((category.value / categoryData.reduce((sum, cat) => sum + cat.value, 0)) * 100).toFixed(1)}%
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stock Status Summary</CardTitle>
                <CardDescription>Current inventory health across locations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventoryStatus.map((status) => (
                    <div 
                      key={status.status}
                      className="flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => handleInventoryClick(status.status.toLowerCase().replace(' ', '_'))}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-3 h-3 rounded-full",
                          status.color === "green" ? "bg-green-500" : 
                          status.color === "yellow" ? "bg-yellow-500" : "bg-red-500"
                        )}></div>
                        <div>
                          <span className="font-medium">{status.status}</span>
                          <div className="text-sm text-muted-foreground">
                            {status.items.slice(0, 2).join(", ")}
                            {status.items.length > 2 && ` +${status.items.length - 2} more`}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{status.count} items</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
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
              <CardTitle>Store Performance Comparison</CardTitle>
              <CardDescription>Revenue and efficiency metrics by location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={storeComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="store" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                    <Bar dataKey="efficiency" fill="#82ca9d" name="Revenue per Employee" />
                  </BarChart>
                </ResponsiveContainer>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Store</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Employees</TableHead>
                      <TableHead>Revenue per Employee</TableHead>
                      <TableHead>Performance Rating</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {storeComparison.map((store) => (
                      <TableRow 
                        key={store.store}
                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleStoreClick(store.storeId)}
                      >
                        <TableCell className="font-medium">{store.store}</TableCell>
                        <TableCell>{formatCurrency(store.revenue)}</TableCell>
                        <TableCell>{store.employees}</TableCell>
                        <TableCell>{formatCurrency(store.efficiency)}</TableCell>
                        <TableCell>
                          <Badge variant={store.efficiency > 9000 ? "default" : store.efficiency > 7500 ? "secondary" : "outline"}>
                            {store.efficiency > 9000 ? "Excellent" : store.efficiency > 7500 ? "Good" : "Average"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};