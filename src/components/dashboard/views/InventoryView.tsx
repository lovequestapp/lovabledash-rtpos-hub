import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Package, 
  Plus, 
  Search, 
  Download,
  Upload,
  AlertTriangle,
  DollarSign,
  BarChart3,
  Shield,
  Edit,
  Eye,
  MoreHorizontal,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  Zap,
  AlertCircle,
  CheckCircle,
  XCircle,
  Activity,
  Calendar,
  Filter,
  SortAsc,
  SortDesc,
  Settings,
  Bell,
  Lock,
  Unlock,
  RotateCcw,
  Trash2,
  Copy,
  Share,
  Archive,
  Star,
  StarOff,
  Brain,
  Sparkles,
  MapPin,
  Boxes,
  ShoppingCart,
  Truck,
  LineChart,
  PieChart,
  Radio,
  Waves,
  Cpu,
  Database,
  Layers,
  Grid3x3,
  PackageCheck,
  PackageX,
  PackagePlus,
  PackageMinus,
  PackageSearch,
  Warehouse,
  Store,
  Building2,
  Users,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Globe,
  Link2,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Tag,
  Hash,
  Percent,
  Calculator,
  CreditCard,
  Wallet,
  Receipt,
  TrendingUpIcon,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Info,
  HelpCircle,
  AlertOctagon,
  Flame,
  Snowflake,
  Wind,
  Sun,
  Moon,
  CloudRain,
  Zap as ZapIcon
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface InventoryViewProps {
  onViewChange?: (view: string) => void;
}

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  brand: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  cost: number;
  price: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'discontinued';
  storeCode: string;
  storeName: string;
  supplier: string;
  lastRestocked: string;
  totalSold: number;
  totalRevenue: number;
  fraudRisk: number;
  alerts: number;
  lifecycle: 'introduction' | 'growth' | 'maturity' | 'decline';
  abcCategory: 'A' | 'B' | 'C';
  turnoverRate: number;
  demandForecast: number;
  shrinkageRate: number;
  securityLevel: 'low' | 'medium' | 'high';
  autoReorder: boolean;
  lastAudit: string;
  expiryDate?: string;
  batchNumber?: string;
  location: string;
  weight: number;
  dimensions: string;
  tags: string[];
  notes: string;
  images: string[];
  warrantyPeriod: number;
  returnRate: number;
  profitMargin: number;
  roi: number;
  velocity: number;
  seasonality: 'high' | 'medium' | 'low';
  aiRecommendation: string;
  predictedStockout: number;
  optimalPrice: number;
  competitorPrice: number;
  marketDemand: number;
  trendScore: number;
}

// Generate advanced mock data
const generateMockInventory = (): InventoryItem[] => {
  const stores = [
    { code: 'ST001', name: 'Post Oak' },
    { code: 'ST002', name: 'Fondren' },
    { code: 'ST003', name: 'West Bellfort' },
    { code: 'ST004', name: 'El Campo' },
    { code: 'ST005', name: 'Galleria' },
    { code: 'ST006', name: 'Woodlands' },
    { code: 'ST007', name: 'Katy' },
    { code: 'ST008', name: 'Pearland' }
  ];

  const categories = ['Smartphones', 'Tablets', 'Accessories', 'Wearables', 'Audio', 'Computing'];
  const brands = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Sony', 'LG', 'Motorola'];
  const suppliers = ['Tech Supply Co', 'Global Electronics', 'Premium Distributors', 'Direct Import LLC'];
  const lifecycles: Array<'introduction' | 'growth' | 'maturity' | 'decline'> = ['introduction', 'growth', 'maturity', 'decline'];
  const abcCategories: Array<'A' | 'B' | 'C'> = ['A', 'B', 'C'];
  const securityLevels: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];
  const seasonalities: Array<'high' | 'medium' | 'low'> = ['high', 'medium', 'low'];
  const statuses: Array<'in_stock' | 'low_stock' | 'out_of_stock' | 'discontinued'> = ['in_stock', 'low_stock', 'out_of_stock', 'discontinued'];

  const items: InventoryItem[] = [];

  for (let i = 0; i < 150; i++) {
    const store = stores[Math.floor(Math.random() * stores.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const currentStock = Math.floor(Math.random() * 200);
    const minStock = Math.floor(Math.random() * 20) + 10;
    const maxStock = minStock + Math.floor(Math.random() * 100) + 50;
    const cost = Math.floor(Math.random() * 800) + 50;
    const price = cost * (1.2 + Math.random() * 0.6);
    const totalSold = Math.floor(Math.random() * 500);
    const velocity = Math.floor(Math.random() * 100);
    const turnoverRate = Math.random() * 12;
    const shrinkageRate = Math.random() * 5;
    const returnRate = Math.random() * 15;
    const profitMargin = ((price - cost) / price) * 100;
    const roi = ((price - cost) / cost) * 100;

    let status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'discontinued';
    if (currentStock === 0) status = 'out_of_stock';
    else if (currentStock < minStock) status = 'low_stock';
    else status = 'in_stock';

    items.push({
      id: `INV-${String(i + 1000).padStart(5, '0')}`,
      name: `${brand} ${category} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 99)}`,
      sku: `SKU-${brand.substring(0, 3).toUpperCase()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
      category,
      brand,
      currentStock,
      minStock,
      maxStock,
      cost,
      price,
      status,
      storeCode: store.code,
      storeName: store.name,
      supplier: suppliers[Math.floor(Math.random() * suppliers.length)],
      lastRestocked: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      totalSold,
      totalRevenue: totalSold * price,
      fraudRisk: Math.floor(Math.random() * 100),
      alerts: Math.floor(Math.random() * 5),
      lifecycle: lifecycles[Math.floor(Math.random() * lifecycles.length)],
      abcCategory: abcCategories[Math.floor(Math.random() * abcCategories.length)],
      turnoverRate,
      demandForecast: Math.floor(Math.random() * 200) + 50,
      shrinkageRate,
      securityLevel: securityLevels[Math.floor(Math.random() * securityLevels.length)],
      autoReorder: Math.random() > 0.3,
      lastAudit: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
      expiryDate: Math.random() > 0.7 ? new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString() : undefined,
      batchNumber: `BATCH-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`,
      location: `${String.fromCharCode(65 + Math.floor(Math.random() * 5))}-${Math.floor(Math.random() * 20) + 1}-${Math.floor(Math.random() * 10) + 1}`,
      weight: Math.random() * 2,
      dimensions: `${Math.floor(Math.random() * 20) + 5}x${Math.floor(Math.random() * 15) + 5}x${Math.floor(Math.random() * 10) + 2}cm`,
      tags: ['Popular', 'Best Seller', 'New Arrival', 'Limited Stock', 'Premium'].slice(0, Math.floor(Math.random() * 3) + 1),
      notes: Math.random() > 0.7 ? 'Handle with care - fragile item' : '',
      images: [],
      warrantyPeriod: [12, 24, 36, 48][Math.floor(Math.random() * 4)],
      returnRate,
      profitMargin,
      roi,
      velocity,
      seasonality: seasonalities[Math.floor(Math.random() * seasonalities.length)],
      aiRecommendation: ['Increase stock', 'Reduce price', 'Promote heavily', 'Consider clearance', 'Maintain current'][Math.floor(Math.random() * 5)],
      predictedStockout: Math.floor(Math.random() * 30),
      optimalPrice: price * (0.9 + Math.random() * 0.2),
      competitorPrice: price * (0.85 + Math.random() * 0.3),
      marketDemand: Math.floor(Math.random() * 100),
      trendScore: Math.floor(Math.random() * 100)
    });
  }

  return items.sort((a, b) => b.velocity - a.velocity);
};

export const InventoryView = ({ onViewChange }: InventoryViewProps) => {
  const [items, setItems] = useState<InventoryItem[]>(generateMockInventory());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterStore, setFilterStore] = useState("all");
  const [sortBy, setSortBy] = useState<keyof InventoryItem>("velocity");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [realTimeMode, setRealTimeMode] = useState(true);

  // Real-time updates simulation
  useEffect(() => {
    if (!realTimeMode) return;

    const interval = setInterval(() => {
      setItems(prev => prev.map(item => ({
        ...item,
        currentStock: Math.max(0, item.currentStock + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3)),
        velocity: Math.max(0, item.velocity + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5))
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, [realTimeMode]);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let filtered = items;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter(item => item.category === filterCategory);
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter(item => item.status === filterStatus);
    }

    if (filterStore !== "all") {
      filtered = filtered.filter(item => item.storeCode === filterStore);
    }

    return filtered.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
  }, [items, searchTerm, filterCategory, filterStatus, filterStore, sortBy, sortOrder]);

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalValue = filteredItems.reduce((sum, item) => sum + (item.currentStock * item.price), 0);
    const totalItems = filteredItems.reduce((sum, item) => sum + item.currentStock, 0);
    const lowStockItems = filteredItems.filter(item => item.status === 'low_stock' || item.status === 'out_of_stock').length;
    const avgTurnover = filteredItems.reduce((sum, item) => sum + item.turnoverRate, 0) / filteredItems.length;
    const totalRevenue = filteredItems.reduce((sum, item) => sum + item.totalRevenue, 0);
    const avgProfit = filteredItems.reduce((sum, item) => sum + item.profitMargin, 0) / filteredItems.length;
    const highRiskItems = filteredItems.filter(item => item.fraudRisk > 70).length;
    const aiRecommendations = filteredItems.filter(item => item.aiRecommendation).length;

    return {
      totalValue,
      totalItems,
      lowStockItems,
      avgTurnover,
      totalRevenue,
      avgProfit,
      highRiskItems,
      aiRecommendations
    };
  }, [filteredItems]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return 'bg-green-100 text-green-800 border-green-300';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'out_of_stock': return 'bg-red-100 text-red-800 border-red-300';
      case 'discontinued': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getLifecycleIcon = (lifecycle: string) => {
    switch (lifecycle) {
      case 'introduction': return <Sparkles className="w-4 h-4 text-blue-500" />;
      case 'growth': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'maturity': return <Target className="w-4 h-4 text-purple-500" />;
      case 'decline': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6 space-y-6 bg-background/80 backdrop-blur-xl rounded-lg shadow-lg border border-border/50">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
              <Warehouse className="w-8 h-8 text-purple-500" />
            </div>
            <span>Advanced Inventory Management</span>
            <Badge variant="outline" className="animate-pulse bg-gradient-to-r from-purple-500/20 to-pink-500/20">
              <Brain className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>
          </h1>
          <p className="text-muted-foreground mt-2">
            Next-generation inventory control with predictive analytics and real-time optimization
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRealTimeMode(!realTimeMode)}
            className={cn("btn-glass", realTimeMode && "animate-pulse border-green-500")}
          >
            <Radio className="w-4 h-4 mr-2" />
            {realTimeMode ? 'Live Mode' : 'Paused'}
          </Button>
          <Button variant="outline" size="sm" className="btn-glass">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="default" size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Advanced Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-premium hover:shadow-2xl transition-all duration-300 border-2 border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Inventory Value</p>
                <p className="text-3xl font-bold mt-2">{formatCurrency(metrics.totalValue)}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary" className="badge-glass">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.5%
                  </Badge>
                  <span className="text-xs text-muted-foreground">vs last month</span>
                </div>
              </div>
              <div className="p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                <DollarSign className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium hover:shadow-2xl transition-all duration-300 border-2 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Units</p>
                <p className="text-3xl font-bold mt-2">{metrics.totalItems.toLocaleString()}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary" className="badge-glass">
                    <Package className="w-3 h-3 mr-1" />
                    {filteredItems.length} SKUs
                  </Badge>
                </div>
              </div>
              <div className="p-4 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                <Boxes className="w-8 h-8 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium hover:shadow-2xl transition-all duration-300 border-2 border-yellow-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock Alerts</p>
                <p className="text-3xl font-bold mt-2">{metrics.lowStockItems}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="destructive" className="badge-glass animate-pulse">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Needs Attention
                  </Badge>
                </div>
              </div>
              <div className="p-4 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
                <AlertCircle className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium hover:shadow-2xl transition-all duration-300 border-2 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Turnover Rate</p>
                <p className="text-3xl font-bold mt-2">{metrics.avgTurnover.toFixed(1)}x</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary" className="badge-glass">
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Excellent
                  </Badge>
                </div>
              </div>
              <div className="p-4 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                <RotateCcw className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Banner */}
      <Card className="card-premium border-2 border-purple-500/30 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 animate-pulse">
                <Brain className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg">AI-Powered Recommendations Active</h3>
                <p className="text-sm text-muted-foreground">
                  {metrics.aiRecommendations} intelligent insights available • Predictive analytics running • Auto-optimization enabled
                </p>
              </div>
            </div>
            <Button variant="outline" className="btn-glass border-purple-500/50">
              <Sparkles className="w-4 h-4 mr-2" />
              View Insights
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card className="card-premium">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by name, SKU, brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 input-glass"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Smartphones">Smartphones</SelectItem>
                  <SelectItem value="Tablets">Tablets</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Wearables">Wearables</SelectItem>
                  <SelectItem value="Audio">Audio</SelectItem>
                  <SelectItem value="Computing">Computing</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="in_stock">In Stock</SelectItem>
                  <SelectItem value="low_stock">Low Stock</SelectItem>
                  <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                  <SelectItem value="discontinued">Discontinued</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStore} onValueChange={setFilterStore}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Store" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stores</SelectItem>
                  <SelectItem value="ST001">Post Oak</SelectItem>
                  <SelectItem value="ST002">Fondren</SelectItem>
                  <SelectItem value="ST003">West Bellfort</SelectItem>
                  <SelectItem value="ST004">El Campo</SelectItem>
                  <SelectItem value="ST005">Galleria</SelectItem>
                  <SelectItem value="ST006">Woodlands</SelectItem>
                  <SelectItem value="ST007">Katy</SelectItem>
                  <SelectItem value="ST008">Pearland</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2 border border-border/50 rounded-md px-3 bg-white/5">
                <span className="text-sm text-muted-foreground">View:</span>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  className="h-8 w-8 p-0"
                >
                  <Layers className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Grid/Table */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="card-premium hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedItem(item)}
            >
              <CardContent className="p-0">
                {/* Image/Icon Header */}
                <div className="relative h-32 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden">
                  <Package className="w-16 h-16 text-purple-500 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute top-2 right-2">
                    <Badge className={getStatusColor(item.status)}>
                      {item.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  {item.abcCategory === 'A' && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                        <Star className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    </div>
                  )}
                  {realTimeMode && (
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="outline" className="bg-green-500/20 border-green-500 animate-pulse">
                        <Radio className="w-3 h-3 mr-1" />
                        Live
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-lg line-clamp-1 group-hover:text-purple-500 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.sku}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Stock Level</p>
                      <p className="text-2xl font-bold">{item.currentStock}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Value</p>
                      <p className="text-lg font-semibold text-green-500">
                        {formatCurrency(item.currentStock * item.price)}
                      </p>
                    </div>
                  </div>

                  <Progress 
                    value={(item.currentStock / item.maxStock) * 100} 
                    className="h-2"
                  />

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Min: {item.minStock}</span>
                    <span>Max: {item.maxStock}</span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="badge-glass">
                      {getLifecycleIcon(item.lifecycle)}
                      <span className="ml-1 capitalize">{item.lifecycle}</span>
                    </Badge>
                    <Badge variant="outline" className="badge-glass">
                      <Zap className="w-3 h-3 mr-1" />
                      {item.velocity}/day
                    </Badge>
                    {item.autoReorder && (
                      <Badge variant="outline" className="badge-glass bg-blue-500/10 border-blue-500/50">
                        <Cpu className="w-3 h-3 mr-1" />
                        Auto
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <span className="text-xs text-muted-foreground flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {item.storeName}
                    </span>
                    <Button variant="ghost" size="sm" className="h-8">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="card-premium">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Lifecycle</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id} className="cursor-pointer hover:bg-white/5" onClick={() => setSelectedItem(item)}>
                    <TableCell className="font-medium">
                      <div>
                        <p>{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.brand}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                    <TableCell>{item.storeName}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end">
                        <span className="font-bold">{item.currentStock}</span>
                        <Progress value={(item.currentStock / item.maxStock) * 100} className="w-16 h-1 mt-1" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold">{formatCurrency(item.price)}</TableCell>
                    <TableCell className="text-right font-bold text-green-500">
                      {formatCurrency(item.currentStock * item.price)}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="badge-glass">
                        {getLifecycleIcon(item.lifecycle)}
                        <span className="ml-1 capitalize">{item.lifecycle}</span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Advanced Item Details Modal */}
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="dialog-glass max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="sticky top-0 bg-background/95 backdrop-blur-xl z-10 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                    <Package className="w-8 h-8 text-purple-500" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-bold">{selectedItem.name}</DialogTitle>
                    <DialogDescription className="text-sm mt-1">
                      {selectedItem.sku} • {selectedItem.brand} • {selectedItem.storeName}
                    </DialogDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(selectedItem.status)}>
                    {selectedItem.status.replace('_', ' ')}
                  </Badge>
                  <Button variant="outline" size="sm" className="btn-glass">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            </DialogHeader>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
                <TabsTrigger value="lifecycle">Lifecycle</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="card-premium">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Boxes className="w-5 h-5" />
                        <span>Stock Information</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Current Stock</p>
                        <p className="text-3xl font-bold">{selectedItem.currentStock}</p>
                        <Progress value={(selectedItem.currentStock / selectedItem.maxStock) * 100} className="mt-2" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Min Stock</p>
                          <p className="font-semibold">{selectedItem.minStock}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Max Stock</p>
                          <p className="font-semibold">{selectedItem.maxStock}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-semibold flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {selectedItem.location}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-premium">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <DollarSign className="w-5 h-5" />
                        <span>Pricing & Value</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Cost</p>
                          <p className="font-semibold text-lg">{formatCurrency(selectedItem.cost)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Price</p>
                          <p className="font-semibold text-lg text-green-500">{formatCurrency(selectedItem.price)}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Value</p>
                        <p className="text-2xl font-bold text-purple-500">
                          {formatCurrency(selectedItem.currentStock * selectedItem.price)}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Profit Margin</p>
                          <p className="font-semibold">{selectedItem.profitMargin.toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">ROI</p>
                          <p className="font-semibold">{selectedItem.roi.toFixed(1)}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-premium">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BarChart3 className="w-5 h-5" />
                        <span>Performance</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Sold</p>
                        <p className="text-2xl font-bold">{selectedItem.totalSold}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Revenue</p>
                        <p className="text-xl font-semibold text-green-500">
                          {formatCurrency(selectedItem.totalRevenue)}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Velocity</p>
                          <p className="font-semibold">{selectedItem.velocity}/day</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Turnover</p>
                          <p className="font-semibold">{selectedItem.turnoverRate.toFixed(1)}x</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="card-premium">
                    <CardHeader>
                      <CardTitle>Demand Forecast</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Next 30 Days</span>
                          <span className="font-bold text-xl">{selectedItem.demandForecast} units</span>
                        </div>
                        <Progress value={65} className="h-3" />
                        <p className="text-sm text-muted-foreground">
                          Based on historical sales data and market trends
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-premium">
                    <CardHeader>
                      <CardTitle>Risk Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Fraud Risk Score</span>
                          <Badge variant={selectedItem.fraudRisk > 70 ? 'destructive' : 'secondary'}>
                            {selectedItem.fraudRisk}%
                          </Badge>
                        </div>
                        <Progress value={selectedItem.fraudRisk} className="h-3" />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Shrinkage Rate</span>
                          <span className="font-semibold">{selectedItem.shrinkageRate.toFixed(2)}%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Return Rate</span>
                          <span className="font-semibold">{selectedItem.returnRate.toFixed(1)}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* AI Insights Tab */}
              <TabsContent value="ai-insights" className="space-y-6">
                <Card className="card-premium border-2 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="w-6 h-6 text-purple-500" />
                      <span>AI Recommendations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                      <p className="font-semibold mb-2">Primary Recommendation</p>
                      <p className="text-lg">{selectedItem.aiRecommendation}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-white/5">
                        <p className="text-sm text-muted-foreground">Optimal Price</p>
                        <p className="text-xl font-bold text-green-500">{formatCurrency(selectedItem.optimalPrice)}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5">
                        <p className="text-sm text-muted-foreground">Competitor Price</p>
                        <p className="text-xl font-bold">{formatCurrency(selectedItem.competitorPrice)}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5">
                        <p className="text-sm text-muted-foreground">Market Demand</p>
                        <p className="text-xl font-bold">{selectedItem.marketDemand}%</p>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5">
                        <p className="text-sm text-muted-foreground">Trend Score</p>
                        <p className="text-xl font-bold">{selectedItem.trendScore}/100</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        <p className="font-semibold">Stockout Prediction</p>
                      </div>
                      <p>Estimated stockout in <span className="font-bold">{selectedItem.predictedStockout} days</span></p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Lifecycle Tab */}
              <TabsContent value="lifecycle" className="space-y-6">
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      {getLifecycleIcon(selectedItem.lifecycle)}
                      <span>Product Lifecycle Stage: {selectedItem.lifecycle}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                        <p className="text-sm text-muted-foreground mb-2">ABC Category</p>
                        <Badge className="text-lg">{selectedItem.abcCategory}</Badge>
                        <p className="text-xs text-muted-foreground mt-2">
                          {selectedItem.abcCategory === 'A' && 'High-value, strategic item'}
                          {selectedItem.abcCategory === 'B' && 'Medium-value, important item'}
                          {selectedItem.abcCategory === 'C' && 'Low-value, routine item'}
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                        <p className="text-sm text-muted-foreground mb-2">Seasonality</p>
                        <Badge className="text-lg capitalize">{selectedItem.seasonality}</Badge>
                        <p className="text-xs text-muted-foreground mt-2">
                          {selectedItem.seasonality} seasonal demand variation
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                        <p className="text-sm text-muted-foreground mb-2">Auto-Reorder</p>
                        <Badge className="text-lg">
                          {selectedItem.autoReorder ? 'Enabled' : 'Disabled'}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-2">
                          Automated replenishment {selectedItem.autoReorder ? 'active' : 'inactive'}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Last Audit</p>
                      <p className="font-semibold">{formatDate(selectedItem.lastAudit)}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-6 h-6" />
                      <span>Security & Protection</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-white/5">
                        <p className="text-sm text-muted-foreground mb-2">Security Level</p>
                        <Badge className={cn(
                          "text-lg",
                          selectedItem.securityLevel === 'high' && 'bg-red-500',
                          selectedItem.securityLevel === 'medium' && 'bg-yellow-500',
                          selectedItem.securityLevel === 'low' && 'bg-green-500'
                        )}>
                          {selectedItem.securityLevel.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="p-4 rounded-lg bg-white/5">
                        <p className="text-sm text-muted-foreground mb-2">Fraud Risk</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={selectedItem.fraudRisk} className="flex-1" />
                          <span className="font-bold">{selectedItem.fraudRisk}%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Batch Information</p>
                      <p className="font-mono font-semibold">{selectedItem.batchNumber}</p>
                    </div>
                    {selectedItem.expiryDate && (
                      <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                        <p className="text-sm text-muted-foreground mb-2">Expiry Date</p>
                        <p className="font-semibold">{formatDate(selectedItem.expiryDate)}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="space-y-6">
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="w-6 h-6" />
                      <span>Activity History</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg bg-white/5">
                      <p className="text-sm text-muted-foreground mb-2">Last Restocked</p>
                      <p className="font-semibold">{formatDate(selectedItem.lastRestocked)}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-white/5">
                        <p className="text-sm text-muted-foreground">Supplier</p>
                        <p className="font-semibold">{selectedItem.supplier}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5">
                        <p className="text-sm text-muted-foreground">Warranty</p>
                        <p className="font-semibold">{selectedItem.warrantyPeriod} months</p>
                      </div>
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
