import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
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
  StarOff
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

type ViewType = 'overview' | 'stores' | 'employees' | 'inventory' | 'reports' | 'alerts' | 'settings';

interface InventoryViewProps {
  onViewChange?: (view: ViewType) => void;
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
  supplier: string;
  lastRestocked: string;
  totalSold: number;
  totalRevenue: number;
  fraudRisk: number;
  alerts: number;
  // Advanced fields
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
}

const mockInventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max 256GB",
    sku: "IPH15PM-256-TIT",
    category: "Smartphones",
    brand: "Apple",
    currentStock: 12,
    minStock: 5,
    maxStock: 50,
    cost: 999,
    price: 1199,
    status: "in_stock",
    storeCode: "DT001",
    supplier: "Apple Inc.",
    lastRestocked: "2024-01-10",
    totalSold: 45,
    totalRevenue: 53955,
    fraudRisk: 15,
    alerts: 1,
    lifecycle: "growth",
    abcCategory: "A",
    turnoverRate: 3.75,
    demandForecast: 18,
    shrinkageRate: 2.1,
    securityLevel: "high",
    autoReorder: true,
    lastAudit: "2024-01-15",
    location: "A1-B2-C3",
    weight: 0.221,
    dimensions: "159.9 x 76.7 x 8.25 mm",
    tags: ["premium", "5G", "camera"],
    notes: "High-demand item, monitor closely",
    images: ["iphone15pm.jpg"],
    warrantyPeriod: 12,
    returnRate: 1.2,
    profitMargin: 20.0,
    roi: 15.8
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra 512GB",
    sku: "SGS24U-512-BLK",
    category: "Smartphones",
    brand: "Samsung",
    currentStock: 3,
    minStock: 5,
    maxStock: 30,
    cost: 899,
    price: 1099,
    status: "low_stock",
    storeCode: "DT001",
    supplier: "Samsung Electronics",
    lastRestocked: "2024-01-05",
    totalSold: 28,
    totalRevenue: 30772,
    fraudRisk: 25,
    alerts: 1,
    lifecycle: "maturity",
    abcCategory: "A",
    turnoverRate: 9.33,
    demandForecast: 8,
    shrinkageRate: 3.5,
    securityLevel: "high",
    autoReorder: true,
    lastAudit: "2024-01-12",
    location: "A1-B2-C4",
    weight: 0.232,
    dimensions: "162.3 x 79.0 x 8.6 mm",
    tags: ["premium", "5G", "S-Pen"],
    notes: "Low stock alert triggered",
    images: ["sgs24u.jpg"],
    warrantyPeriod: 12,
    returnRate: 2.1,
    profitMargin: 22.3,
    roi: 18.2
  },
  {
    id: "3",
    name: "AirPods Pro 2nd Gen",
    sku: "APP2-WHT",
    category: "Audio",
    brand: "Apple",
    currentStock: 0,
    minStock: 10,
    maxStock: 100,
    cost: 199,
    price: 249,
    status: "out_of_stock",
    storeCode: "MK002",
    supplier: "Apple Inc.",
    lastRestocked: "2024-01-08",
    totalSold: 156,
    totalRevenue: 38844,
    fraudRisk: 5,
    alerts: 1,
    lifecycle: "maturity",
    abcCategory: "B",
    turnoverRate: 15.6,
    demandForecast: 25,
    shrinkageRate: 1.8,
    securityLevel: "medium",
    autoReorder: true,
    lastAudit: "2024-01-10",
    location: "B1-C2-D1",
    weight: 0.056,
    dimensions: "60.9 x 45.2 x 21.7 mm",
    tags: ["wireless", "noise-cancelling"],
    notes: "Out of stock - reorder needed",
    images: ["airpodspro2.jpg"],
    warrantyPeriod: 12,
    returnRate: 0.8,
    profitMargin: 25.1,
    roi: 22.4
  }
];

export const InventoryView = ({ onViewChange }: InventoryViewProps) => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(mockInventoryItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterStore, setFilterStore] = useState("all");
  const [filterLifecycle, setFilterLifecycle] = useState("all");
  const [filterABC, setFilterABC] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    name: "",
    sku: "",
    category: "",
    brand: "",
    currentStock: 0,
    minStock: 0,
    maxStock: 0,
    cost: 0,
    price: 0,
    status: "in_stock",
    storeCode: "",
    supplier: "",
    lifecycle: "introduction",
    abcCategory: "C",
    securityLevel: "medium",
    autoReorder: false,
    location: "",
    weight: 0,
    dimensions: "",
    tags: [],
    notes: "",
    images: [],
    warrantyPeriod: 12,
    returnRate: 0,
    profitMargin: 0,
    roi: 0
  });

  const filteredAndSortedItems = useMemo(() => {
    let filtered = inventoryItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = filterCategory === "all" || item.category === filterCategory;
      const matchesStatus = filterStatus === "all" || item.status === filterStatus;
      const matchesStore = filterStore === "all" || item.storeCode === filterStore;
      const matchesLifecycle = filterLifecycle === "all" || item.lifecycle === filterLifecycle;
      const matchesABC = filterABC === "all" || item.abcCategory === filterABC;
      
      return matchesSearch && matchesCategory && matchesStatus && matchesStore && matchesLifecycle && matchesABC;
    });

    return filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof InventoryItem];
      let bValue: any = b[sortBy as keyof InventoryItem];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [inventoryItems, searchTerm, filterCategory, filterStatus, filterStore, filterLifecycle, filterABC, sortBy, sortOrder]);

  const stats = {
    totalItems: inventoryItems.length,
    totalValue: inventoryItems.reduce((sum, item) => sum + (item.currentStock * item.cost), 0),
    lowStockItems: inventoryItems.filter(item => item.status === 'low_stock').length,
    outOfStockItems: inventoryItems.filter(item => item.status === 'out_of_stock').length,
    highRiskItems: inventoryItems.filter(item => item.fraudRisk > 20).length,
    totalRevenue: inventoryItems.reduce((sum, item) => sum + item.totalRevenue, 0),
    averageTurnover: inventoryItems.reduce((sum, item) => sum + item.turnoverRate, 0) / inventoryItems.length,
    shrinkageRate: inventoryItems.reduce((sum, item) => sum + item.shrinkageRate, 0) / inventoryItems.length
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.sku) {
      toast({
        title: "Error",
        description: "Name and SKU are required",
        variant: "destructive"
      });
      return;
    }

    const item: InventoryItem = {
      id: Date.now().toString(),
      name: newItem.name!,
      sku: newItem.sku!,
      category: newItem.category!,
      brand: newItem.brand!,
      currentStock: newItem.currentStock!,
      minStock: newItem.minStock!,
      maxStock: newItem.maxStock!,
      cost: newItem.cost!,
      price: newItem.price!,
      status: newItem.status!,
      storeCode: newItem.storeCode!,
      supplier: newItem.supplier!,
      lastRestocked: new Date().toISOString().split('T')[0],
      totalSold: 0,
      totalRevenue: 0,
      fraudRisk: 0,
      alerts: 0,
      lifecycle: newItem.lifecycle!,
      abcCategory: newItem.abcCategory!,
      turnoverRate: 0,
      demandForecast: 0,
      shrinkageRate: 0,
      securityLevel: newItem.securityLevel!,
      autoReorder: newItem.autoReorder!,
      lastAudit: new Date().toISOString().split('T')[0],
      location: newItem.location!,
      weight: newItem.weight!,
      dimensions: newItem.dimensions!,
      tags: newItem.tags!,
      notes: newItem.notes!,
      images: newItem.images!,
      warrantyPeriod: newItem.warrantyPeriod!,
      returnRate: 0,
      profitMargin: ((newItem.price! - newItem.cost!) / newItem.price!) * 100,
      roi: 0
    };

    setInventoryItems([...inventoryItems, item]);
    setNewItem({
      name: "",
      sku: "",
      category: "",
      brand: "",
      currentStock: 0,
      minStock: 0,
      maxStock: 0,
      cost: 0,
      price: 0,
      status: "in_stock",
      storeCode: "",
      supplier: "",
      lifecycle: "introduction",
      abcCategory: "C",
      securityLevel: "medium",
      autoReorder: false,
      location: "",
      weight: 0,
      dimensions: "",
      tags: [],
      notes: "",
      images: [],
      warrantyPeriod: 12,
      returnRate: 0,
      profitMargin: 0,
      roi: 0
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Inventory item added successfully"
    });
  };

  const handleBulkAction = (action: string) => {
    if (selectedItems.length === 0) {
      toast({
        title: "No items selected",
        description: "Please select items to perform bulk actions",
        variant: "destructive"
      });
      return;
    }

    switch (action) {
      case 'reorder':
        toast({
          title: "Bulk Reorder",
          description: `Reordering ${selectedItems.length} items`
        });
        break;
      case 'audit':
        toast({
          title: "Bulk Audit",
          description: `Auditing ${selectedItems.length} items`
        });
        break;
      case 'archive':
        toast({
          title: "Bulk Archive",
          description: `Archiving ${selectedItems.length} items`
        });
        break;
    }
    setSelectedItems([]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      case 'discontinued': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLifecycleColor = (lifecycle: string) => {
    switch (lifecycle) {
      case 'introduction': return 'bg-blue-100 text-blue-800';
      case 'growth': return 'bg-green-100 text-green-800';
      case 'maturity': return 'bg-yellow-100 text-yellow-800';
      case 'decline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getABCCategoryColor = (category: string) => {
    switch (category) {
      case 'A': return 'bg-red-100 text-red-800';
      case 'B': return 'bg-yellow-100 text-yellow-800';
      case 'C': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSecurityLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Advanced Inventory Management</h1>
          <p className="text-muted-foreground">
            Comprehensive inventory tracking, lifecycle management, and loss prevention
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Inventory Item</DialogTitle>
                <DialogDescription>
                  Add a new item to your inventory with comprehensive tracking
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    placeholder="Enter product name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU *</Label>
                  <Input
                    id="sku"
                    value={newItem.sku}
                    onChange={(e) => setNewItem({...newItem, sku: e.target.value})}
                    placeholder="Enter SKU"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newItem.category} onValueChange={(value) => setNewItem({...newItem, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Smartphones">Smartphones</SelectItem>
                      <SelectItem value="Audio">Audio</SelectItem>
                      <SelectItem value="Computers">Computers</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    value={newItem.brand}
                    onChange={(e) => setNewItem({...newItem, brand: e.target.value})}
                    placeholder="Enter brand"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentStock">Current Stock</Label>
                  <Input
                    id="currentStock"
                    type="number"
                    value={newItem.currentStock}
                    onChange={(e) => setNewItem({...newItem, currentStock: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minStock">Min Stock</Label>
                  <Input
                    id="minStock"
                    type="number"
                    value={newItem.minStock}
                    onChange={(e) => setNewItem({...newItem, minStock: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxStock">Max Stock</Label>
                  <Input
                    id="maxStock"
                    type="number"
                    value={newItem.maxStock}
                    onChange={(e) => setNewItem({...newItem, maxStock: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">Cost ($)</Label>
                  <Input
                    id="cost"
                    type="number"
                    value={newItem.cost}
                    onChange={(e) => setNewItem({...newItem, cost: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newItem.price}
                    onChange={(e) => setNewItem({...newItem, price: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeCode">Store Code</Label>
                  <Input
                    id="storeCode"
                    value={newItem.storeCode}
                    onChange={(e) => setNewItem({...newItem, storeCode: e.target.value})}
                    placeholder="Enter store code"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input
                    id="supplier"
                    value={newItem.supplier}
                    onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                    placeholder="Enter supplier"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lifecycle">Product Lifecycle</Label>
                  <Select value={newItem.lifecycle} onValueChange={(value) => setNewItem({...newItem, lifecycle: value as any})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select lifecycle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="introduction">Introduction</SelectItem>
                      <SelectItem value="growth">Growth</SelectItem>
                      <SelectItem value="maturity">Maturity</SelectItem>
                      <SelectItem value="decline">Decline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="abcCategory">ABC Category</Label>
                  <Select value={newItem.abcCategory} onValueChange={(value) => setNewItem({...newItem, abcCategory: value as any})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ABC category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A (High Value)</SelectItem>
                      <SelectItem value="B">B (Medium Value)</SelectItem>
                      <SelectItem value="C">C (Low Value)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="securityLevel">Security Level</Label>
                  <Select value={newItem.securityLevel} onValueChange={(value) => setNewItem({...newItem, securityLevel: value as any})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select security level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newItem.location}
                    onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                    placeholder="e.g., A1-B2-C3"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.001"
                    value={newItem.weight}
                    onChange={(e) => setNewItem({...newItem, weight: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dimensions">Dimensions</Label>
                  <Input
                    id="dimensions"
                    value={newItem.dimensions}
                    onChange={(e) => setNewItem({...newItem, dimensions: e.target.value})}
                    placeholder="e.g., 159.9 x 76.7 x 8.25 mm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="warrantyPeriod">Warranty Period (months)</Label>
                  <Input
                    id="warrantyPeriod"
                    type="number"
                    value={newItem.warrantyPeriod}
                    onChange={(e) => setNewItem({...newItem, warrantyPeriod: parseInt(e.target.value) || 12})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input
                    id="notes"
                    value={newItem.notes}
                    onChange={(e) => setNewItem({...newItem, notes: e.target.value})}
                    placeholder="Additional notes"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="autoReorder"
                      checked={newItem.autoReorder}
                      onCheckedChange={(checked) => setNewItem({...newItem, autoReorder: checked})}
                    />
                    <Label htmlFor="autoReorder">Auto Reorder</Label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddItem}>
                  Add Item
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Advanced Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalItems}</div>
            <p className="text-xs text-muted-foreground">
              {stats.lowStockItems} low stock, {stats.outOfStockItems} out of stock
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Average: ${(stats.totalValue / stats.totalItems).toFixed(0)} per item
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Turnover Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageTurnover.toFixed(1)}x</div>
            <p className="text-xs text-muted-foreground">
              {stats.highRiskItems} high-risk items
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shrinkage Rate</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.shrinkageRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Loss prevention monitoring
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Filters and Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Inventory Management</CardTitle>
          <CardDescription>
            Comprehensive filtering, sorting, and bulk operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search items, SKU, brand, tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Smartphones">Smartphones</SelectItem>
                  <SelectItem value="Audio">Audio</SelectItem>
                  <SelectItem value="Computers">Computers</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px]">
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
              <Select value={filterLifecycle} onValueChange={setFilterLifecycle}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Lifecycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Lifecycle</SelectItem>
                  <SelectItem value="introduction">Introduction</SelectItem>
                  <SelectItem value="growth">Growth</SelectItem>
                  <SelectItem value="maturity">Maturity</SelectItem>
                  <SelectItem value="decline">Decline</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterABC} onValueChange={setFilterABC}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="ABC Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All ABC</SelectItem>
                  <SelectItem value="A">A Category</SelectItem>
                  <SelectItem value="B">B Category</SelectItem>
                  <SelectItem value="C">C Category</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="currentStock">Stock</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="turnoverRate">Turnover</SelectItem>
                    <SelectItem value="fraudRisk">Risk</SelectItem>
                    <SelectItem value="lastRestocked">Last Restocked</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                >
                  {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "table" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                >
                  Table
                </Button>
                <Button
                  variant={viewMode === "cards" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("cards")}
                >
                  Cards
                </Button>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedItems.length > 0 && (
              <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium">{selectedItems.length} items selected</span>
                <Button size="sm" onClick={() => handleBulkAction('reorder')}>
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Reorder
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('audit')}>
                  <Shield className="h-4 w-4 mr-1" />
                  Audit
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('archive')}>
                  <Archive className="h-4 w-4 mr-1" />
                  Archive
                </Button>
                <Button size="sm" variant="outline" onClick={() => setSelectedItems([])}>
                  Clear
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items ({filteredAndSortedItems.length})</CardTitle>
          <CardDescription>
            Advanced inventory management with lifecycle tracking and loss prevention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === filteredAndSortedItems.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems(filteredAndSortedItems.map(item => item.id));
                        } else {
                          setSelectedItems([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Financial</TableHead>
                  <TableHead>Lifecycle</TableHead>
                  <TableHead>Analytics</TableHead>
                  <TableHead>Security</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems([...selectedItems, item.id]);
                          } else {
                            setSelectedItems(selectedItems.filter(id => id !== item.id));
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.sku}</div>
                        <div className="text-sm text-muted-foreground">{item.brand}</div>
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{item.currentStock}</span>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Min: {item.minStock} | Max: {item.maxStock}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Location: {item.location}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{width: `${(item.currentStock / item.maxStock) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="font-medium">${item.price}</span>
                          <span className="text-muted-foreground"> / ${item.cost}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Margin: {item.profitMargin.toFixed(1)}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ROI: {item.roi.toFixed(1)}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Sold: {item.totalSold}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge className={getLifecycleColor(item.lifecycle)}>
                          {item.lifecycle}
                        </Badge>
                        <Badge className={getABCCategoryColor(item.abcCategory)}>
                          {item.abcCategory}
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          Turnover: {item.turnoverRate.toFixed(1)}x
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Forecast: {item.demandForecast}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="font-medium">Risk: {item.fraudRisk}%</span>
                          {item.fraudRisk > 20 && <AlertTriangle className="h-4 w-4 text-red-500 inline ml-1" />}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Shrinkage: {item.shrinkageRate.toFixed(1)}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Return: {item.returnRate.toFixed(1)}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Last Audit: {new Date(item.lastAudit).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge className={getSecurityLevelColor(item.securityLevel)}>
                          {item.securityLevel}
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          {item.autoReorder ? (
                            <span className="text-green-600">Auto Reorder</span>
                          ) : (
                            <span className="text-gray-500">Manual</span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Warranty: {item.warrantyPeriod}m
                        </div>
                        {item.alerts > 0 && (
                          <div className="text-sm text-red-600">
                            {item.alerts} alerts
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
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
    </div>
  );
};
