import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Store, 
  Plus, 
  Search, 
  MoreHorizontal, 
  MapPin, 
  Phone, 
  Users, 
  TrendingUp,
  Edit,
  Trash2,
  DollarSign,
  Clock,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  Calendar,
  Settings,
  Eye,
  Download,
  Filter,
  RefreshCw,
  Star,
  Target,
  Zap,
  ArrowRight,
  ExternalLink,
  Package,
  ShoppingCart,
  TrendingDown,
  User,
  Building2,
  Globe,
  Shield,
  Bell,
  Info,
  ChevronRight,
  Maximize2,
  Minimize2
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface StoresViewProps {
  onViewChange: (view: 'overview' | 'stores' | 'employees' | 'inventory' | 'reports' | 'alerts' | 'settings') => void;
}

const mockStores = [
  {
    id: "1",
    name: "Downtown Location",
    code: "DT001",
    address: "123 Main St, Downtown, TX 75201",
    phone: "(214) 555-0123",
    manager: "Sarah Johnson",
    employees: 8,
    monthlyRevenue: 45000,
    status: "active",
    lastSync: "2024-01-15 09:30 AM",
    performance: {
      rating: 4.8,
      salesTarget: 50000,
      salesAchieved: 45000,
      customerSatisfaction: 92,
      employeeRetention: 95
    },
    metrics: {
      dailyTransactions: 45,
      avgTransactionValue: 85.50,
      footTraffic: 120,
      conversionRate: 12.5,
      inventoryTurnover: 8.2
    },
    alerts: [
      { type: "warning", message: "Low inventory on iPhone 15", priority: "medium" },
      { type: "info", message: "Monthly target 90% complete", priority: "low" }
    ],
    recentActivity: [
      { action: "Sale completed", amount: 1299, time: "2 minutes ago" },
      { action: "Inventory updated", amount: null, time: "15 minutes ago" },
      { action: "Employee clocked in", amount: null, time: "1 hour ago" }
    ],
    salesData: [
      { day: "Mon", sales: 1200, transactions: 15 },
      { day: "Tue", sales: 1800, transactions: 22 },
      { day: "Wed", sales: 2100, transactions: 28 },
      { day: "Thu", sales: 1900, transactions: 25 },
      { day: "Fri", sales: 2500, transactions: 32 },
      { day: "Sat", sales: 3200, transactions: 40 },
      { day: "Sun", sales: 1800, transactions: 23 }
    ],
    employeeData: [
      { name: "Sarah Johnson", role: "Manager", sales: 12000, status: "active" },
      { name: "Mike Chen", role: "Sales Rep", sales: 8500, status: "active" },
      { name: "Emily Davis", role: "Sales Rep", sales: 7200, status: "active" },
      { name: "David Kim", role: "Cashier", sales: 3200, status: "active" }
    ]
  },
  {
    id: "2", 
    name: "Mall Kiosk",
    code: "MK002",
    address: "456 Shopping Center Dr, Dallas, TX 75202",
    phone: "(214) 555-0456",
    manager: "Mike Chen",
    employees: 4,
    monthlyRevenue: 28000,
    status: "active",
    lastSync: "2024-01-15 08:45 AM",
    performance: {
      rating: 4.6,
      salesTarget: 35000,
      salesAchieved: 28000,
      customerSatisfaction: 88,
      employeeRetention: 100
    },
    metrics: {
      dailyTransactions: 28,
      avgTransactionValue: 65.20,
      footTraffic: 85,
      conversionRate: 8.2,
      inventoryTurnover: 6.5
    },
    alerts: [
      { type: "error", message: "POS system offline", priority: "high" },
      { type: "warning", message: "Low foot traffic today", priority: "medium" }
    ],
    recentActivity: [
      { action: "System restored", amount: null, time: "5 minutes ago" },
      { action: "Sale completed", amount: 450, time: "10 minutes ago" }
    ],
    salesData: [
      { day: "Mon", sales: 800, transactions: 12 },
      { day: "Tue", sales: 1200, transactions: 18 },
      { day: "Wed", sales: 1500, transactions: 22 },
      { day: "Thu", sales: 1100, transactions: 16 },
      { day: "Fri", sales: 1800, transactions: 26 },
      { day: "Sat", sales: 2200, transactions: 32 },
      { day: "Sun", sales: 1300, transactions: 19 }
    ],
    employeeData: [
      { name: "Mike Chen", role: "Manager", sales: 8500, status: "active" },
      { name: "Lisa Wang", role: "Sales Rep", sales: 6200, status: "active" },
      { name: "Tom Wilson", role: "Sales Rep", sales: 4800, status: "active" },
      { name: "Anna Lee", role: "Cashier", sales: 2100, status: "active" }
    ]
  },
  {
    id: "3",
    name: "Airport Terminal",
    code: "AP003", 
    address: "789 Airport Blvd, DFW, TX 75261",
    phone: "(214) 555-0789",
    manager: "Jessica Rodriguez",
    employees: 6,
    monthlyRevenue: 62000,
    status: "active",
    lastSync: "2024-01-15 10:15 AM",
    performance: {
      rating: 4.9,
      salesTarget: 60000,
      salesAchieved: 62000,
      customerSatisfaction: 96,
      employeeRetention: 90
    },
    metrics: {
      dailyTransactions: 65,
      avgTransactionValue: 95.80,
      footTraffic: 200,
      conversionRate: 15.2,
      inventoryTurnover: 9.8
    },
    alerts: [
      { type: "success", message: "Monthly target exceeded!", priority: "low" }
    ],
    recentActivity: [
      { action: "Sale completed", amount: 2500, time: "1 minute ago" },
      { action: "Sale completed", amount: 1800, time: "3 minutes ago" },
      { action: "Inventory restocked", amount: null, time: "30 minutes ago" }
    ],
    salesData: [
      { day: "Mon", sales: 1800, transactions: 20 },
      { day: "Tue", sales: 2200, transactions: 25 },
      { day: "Wed", sales: 2800, transactions: 32 },
      { day: "Thu", sales: 2500, transactions: 28 },
      { day: "Fri", sales: 3200, transactions: 38 },
      { day: "Sat", sales: 3800, transactions: 45 },
      { day: "Sun", sales: 2100, transactions: 24 }
    ],
    employeeData: [
      { name: "Jessica Rodriguez", role: "Manager", sales: 15000, status: "active" },
      { name: "Carlos Mendez", role: "Sales Rep", sales: 12000, status: "active" },
      { name: "Rachel Green", role: "Sales Rep", sales: 9500, status: "active" },
      { name: "James Brown", role: "Sales Rep", sales: 8200, status: "active" },
      { name: "Maria Garcia", role: "Cashier", sales: 4500, status: "active" },
      { name: "John Smith", role: "Cashier", sales: 3800, status: "active" }
    ]
  },
  {
    id: "4",
    name: "Suburban Plaza",
    code: "SP004",
    address: "321 Suburb Way, Plano, TX 75023",
    phone: "(972) 555-0321",
    manager: "David Kim",
    employees: 5,
    monthlyRevenue: 35000,
    status: "maintenance",
    lastSync: "2024-01-14 04:20 PM",
    performance: {
      rating: 4.5,
      salesTarget: 40000,
      salesAchieved: 35000,
      customerSatisfaction: 85,
      employeeRetention: 98
    },
    metrics: {
      dailyTransactions: 30,
      avgTransactionValue: 70.00,
      footTraffic: 100,
      conversionRate: 10.0,
      inventoryTurnover: 7.0
    },
    alerts: [
      { type: "info", message: "Store maintenance scheduled for tomorrow", priority: "low" }
    ],
    recentActivity: [
      { action: "Inventory updated", amount: null, time: "10 minutes ago" },
      { action: "Employee clocked out", amount: null, time: "20 minutes ago" }
    ],
    salesData: [
      { day: "Mon", sales: 1000, transactions: 14 },
      { day: "Tue", sales: 1400, transactions: 20 },
      { day: "Wed", sales: 1600, transactions: 23 },
      { day: "Thu", sales: 1300, transactions: 18 },
      { day: "Fri", sales: 1900, transactions: 27 },
      { day: "Sat", sales: 2200, transactions: 31 },
      { day: "Sun", sales: 1200, transactions: 17 }
    ],
    employeeData: [
      { name: "David Kim", role: "Manager", sales: 9500, status: "active" },
      { name: "Sarah Wilson", role: "Sales Rep", sales: 7200, status: "active" },
      { name: "Mark Johnson", role: "Sales Rep", sales: 6800, status: "active" },
      { name: "Lisa Chen", role: "Cashier", sales: 3200, status: "active" },
      { name: "Tom Anderson", role: "Cashier", sales: 2800, status: "active" }
    ]
  }
];

export const StoresView = ({ onViewChange }: StoresViewProps) => {
  const [stores, setStores] = useState(mockStores);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortBy, setSortBy] = useState('name');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredStores = stores
    .filter(store => {
      const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.manager.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || store.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'revenue':
          return b.monthlyRevenue - a.monthlyRevenue;
        case 'employees':
          return b.employees - a.employees;
        case 'rating':
          return b.performance.rating - a.performance.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleAddStore = () => {
    toast({
      title: "Store Added",
      description: "New store has been added successfully.",
    });
    setIsAddDialogOpen(false);
  };

  const handleStoreClick = (store: any) => {
    setSelectedStore(store);
  };

  const handleEmployeeClick = (storeId: string) => {
    toast({
      title: "Employee Management",
      description: `Viewing employees for store ${storeId}`,
    });
    onViewChange('employees');
  };

  const handleInventoryClick = (storeId: string) => {
    toast({
      title: "Inventory Management",
      description: `Viewing inventory for store ${storeId}`,
    });
    onViewChange('inventory');
  };

  const handleReportsClick = (storeId: string) => {
    toast({
      title: "Store Reports",
      description: `Viewing detailed reports for store ${storeId}`,
    });
    onViewChange('reports');
  };

  const handleAlertsClick = (storeId: string) => {
    toast({
      title: "Store Alerts",
      description: `Viewing alerts for store ${storeId}`,
    });
    onViewChange('alerts');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-500">Active</Badge>;
      case "maintenance":
        return <Badge variant="secondary">Maintenance</Badge>;
      case "inactive":
        return <Badge variant="destructive">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const totalRevenue = stores.reduce((sum, store) => sum + store.monthlyRevenue, 0);
  const totalEmployees = stores.reduce((sum, store) => sum + store.employees, 0);
  const activeStores = stores.filter(s => s.status === 'active').length;
  const avgRevenue = totalRevenue / stores.length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Store Management</h1>
          <p className="text-muted-foreground">
            Manage your store locations and monitor performance
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
            {viewMode === 'grid' ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Store
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Store</DialogTitle>
                <DialogDescription>
                  Create a new store location in your network.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Store Name</Label>
                  <Input id="name" placeholder="Enter store name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="code">Store Code</Label>
                  <Input id="code" placeholder="e.g., DT001" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" placeholder="Full store address" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="(214) 555-0123" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="manager">Manager</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select manager" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="mike">Mike Chen</SelectItem>
                      <SelectItem value="jessica">Jessica Rodriguez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddStore}>Add Store</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Interactive Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card 
          className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 hover:border-primary/20"
          onClick={() => onViewChange('stores')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
            <div className="flex items-center gap-2">
              <Store className="h-4 w-4 text-muted-foreground" />
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stores.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeStores} active
            </p>
          </CardContent>
        </Card>
        
        <Card 
          className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 hover:border-primary/20"
          onClick={() => onViewChange('employees')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              Across all locations
            </p>
          </CardContent>
        </Card>
        
        <Card 
          className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 hover:border-primary/20"
          onClick={() => onViewChange('reports')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              Combined total
            </p>
          </CardContent>
        </Card>
        
        <Card 
          className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 hover:border-primary/20"
          onClick={() => onViewChange('reports')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Revenue/Store</CardTitle>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(avgRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              Per location
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Store Locations</CardTitle>
          <CardDescription>
            Manage and monitor all your store locations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search stores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="employees">Employees</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Interactive Stores Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Store</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Monthly Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Sync</TableHead>
                  <TableHead className="w-[70px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStores.map((store) => (
                  <TableRow 
                    key={store.id}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleStoreClick(store)}
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium">{store.name}</div>
                        <div className="text-sm text-muted-foreground">{store.code}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm">{store.address}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {store.phone}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{store.manager}</TableCell>
                    <TableCell>{store.employees}</TableCell>
                    <TableCell>{formatCurrency(store.monthlyRevenue)}</TableCell>
                    <TableCell>{getStatusBadge(store.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {store.lastSync}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Store Detail Modal */}
      {selectedStore && (
        <Dialog open={!!selectedStore} onOpenChange={() => setSelectedStore(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Building2 className="w-6 h-6" />
                {selectedStore.name} - {selectedStore.code}
              </DialogTitle>
              <DialogDescription>
                Detailed analytics and management for {selectedStore.name}
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="employees">Employees</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formatCurrency(selectedStore.monthlyRevenue)}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={(selectedStore.performance.salesAchieved / selectedStore.performance.salesTarget) * 100} className="flex-1" />
                        <span className="text-xs text-muted-foreground">
                          {Math.round((selectedStore.performance.salesAchieved / selectedStore.performance.salesTarget) * 100)}%
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Daily Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{selectedStore.metrics.dailyTransactions}</div>
                      <p className="text-xs text-muted-foreground">
                        Avg: {formatCurrency(selectedStore.metrics.avgTransactionValue)}
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Foot Traffic</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{selectedStore.metrics.footTraffic}</div>
                      <p className="text-xs text-muted-foreground">
                        Conversion: {selectedStore.metrics.conversionRate}%
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Performance Rating</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold">{selectedStore.performance.rating}</div>
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Customer satisfaction: {selectedStore.performance.customerSatisfaction}%
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Sales Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={selectedStore.salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sales Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Sales Target</span>
                          <span className="font-medium">{formatCurrency(selectedStore.performance.salesTarget)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Sales Achieved</span>
                          <span className="font-medium">{formatCurrency(selectedStore.performance.salesAchieved)}</span>
                        </div>
                        <Progress value={(selectedStore.performance.salesAchieved / selectedStore.performance.salesTarget) * 100} />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Customer Satisfaction</span>
                          <span className="font-medium">{selectedStore.performance.customerSatisfaction}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Employee Retention</span>
                          <span className="font-medium">{selectedStore.performance.employeeRetention}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Inventory Turnover</span>
                          <span className="font-medium">{selectedStore.metrics.inventoryTurnover}x</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="employees" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Store Employees</CardTitle>
                    <CardDescription>Employee performance and details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedStore.employeeData.map((employee, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleEmployeeClick(selectedStore.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-medium">{employee.name}</div>
                              <div className="text-sm text-muted-foreground">{employee.role}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <div className="font-medium">{formatCurrency(employee.sales)}</div>
                              <div className="text-sm text-muted-foreground">Sales</div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="inventory" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Inventory Status</CardTitle>
                    <CardDescription>Current inventory levels and alerts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div 
                        className="flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleInventoryClick(selectedStore.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div>
                            <div className="font-medium">In Stock</div>
                            <div className="text-sm text-muted-foreground">847 items available</div>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      
                      <div 
                        className="flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleInventoryClick(selectedStore.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div>
                            <div className="font-medium">Low Stock</div>
                            <div className="text-sm text-muted-foreground">23 items need restocking</div>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      
                      <div 
                        className="flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleInventoryClick(selectedStore.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div>
                            <div className="font-medium">Out of Stock</div>
                            <div className="text-sm text-muted-foreground">8 items unavailable</div>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="alerts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Store Alerts</CardTitle>
                    <CardDescription>Current alerts and notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedStore.alerts.map((alert, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleAlertsClick(selectedStore.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-3 h-3 rounded-full",
                              alert.type === "error" ? "bg-red-500" :
                              alert.type === "warning" ? "bg-yellow-500" :
                              alert.type === "success" ? "bg-green-500" : "bg-blue-500"
                            )}></div>
                            <div>
                              <div className="font-medium">{alert.message}</div>
                              <div className="text-sm text-muted-foreground">Priority: {alert.priority}</div>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};