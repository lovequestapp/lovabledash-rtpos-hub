import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  RefreshCw
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
    alerts: 1
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
    alerts: 1
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
    alerts: 1
  }
];

export const InventoryView = ({ onViewChange }: InventoryViewProps) => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(mockInventoryItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterStore, setFilterStore] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
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
    supplier: ""
  });

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || item.category === filterCategory;
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    const matchesStore = filterStore === "all" || item.storeCode === filterStore;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesStore;
  });

  const stats = {
    totalItems: inventoryItems.length,
    inStockItems: inventoryItems.filter(item => item.status === 'in_stock').length,
    lowStockItems: inventoryItems.filter(item => item.status === 'low_stock').length,
    outOfStockItems: inventoryItems.filter(item => item.status === 'out_of_stock').length,
    totalValue: inventoryItems.reduce((sum, item) => sum + (item.currentStock * item.cost), 0),
    highRiskItems: inventoryItems.filter(item => item.fraudRisk >= 30).length,
    itemsWithAlerts: inventoryItems.filter(item => item.alerts > 0).length
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.sku || !newItem.category || !newItem.brand) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const item: InventoryItem = {
      id: (inventoryItems.length + 1).toString(),
      name: newItem.name!,
      sku: newItem.sku!,
      category: newItem.category!,
      brand: newItem.brand!,
      currentStock: newItem.currentStock || 0,
      minStock: newItem.minStock || 0,
      maxStock: newItem.maxStock || 0,
      cost: newItem.cost || 0,
      price: newItem.price || 0,
      status: newItem.status as any || 'in_stock',
      storeCode: newItem.storeCode || "",
      supplier: newItem.supplier || "",
      lastRestocked: new Date().toISOString().split('T')[0],
      totalSold: 0,
      totalRevenue: 0,
      fraudRisk: 0,
      alerts: 0
    };

    setInventoryItems(prev => [...prev, item]);
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
      supplier: ""
    });
    setIsAddDialogOpen(false);
    toast({
      title: "Item Added",
      description: `${item.name} has been added to inventory.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_stock":
        return <Badge variant="default" className="bg-green-500">In Stock</Badge>;
      case "low_stock":
        return <Badge variant="secondary" className="bg-yellow-500 text-white">Low Stock</Badge>;
      case "out_of_stock":
        return <Badge variant="destructive">Out of Stock</Badge>;
      case "discontinued":
        return <Badge variant="outline">Discontinued</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRiskBadge = (riskScore: number) => {
    if (riskScore < 20) {
      return <Badge variant="default" className="bg-green-500">Low Risk</Badge>;
    } else if (riskScore < 40) {
      return <Badge variant="secondary" className="bg-yellow-500">Medium Risk</Badge>;
    } else {
      return <Badge variant="destructive">High Risk</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground">
            Track, monitor, and manage your inventory with advanced analytics
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Import
          </Button>
          <Button variant="outline" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Inventory Item</DialogTitle>
                <DialogDescription>
                  Add a new item to your inventory system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Item Name *</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter item name"
                      value={newItem.name || ""}
                      onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sku">SKU *</Label>
                    <Input 
                      id="sku" 
                      placeholder="Enter SKU"
                      value={newItem.sku || ""}
                      onChange={(e) => setNewItem(prev => ({ ...prev, sku: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={newItem.category || ""} onValueChange={(value) => setNewItem(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Smartphones">Smartphones</SelectItem>
                        <SelectItem value="Laptops">Laptops</SelectItem>
                        <SelectItem value="Tablets">Tablets</SelectItem>
                        <SelectItem value="Audio">Audio</SelectItem>
                        <SelectItem value="Accessories">Accessories</SelectItem>
                        <SelectItem value="Wearables">Wearables</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="brand">Brand *</Label>
                    <Input 
                      id="brand" 
                      placeholder="Enter brand"
                      value={newItem.brand || ""}
                      onChange={(e) => setNewItem(prev => ({ ...prev, brand: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="currentStock">Current Stock</Label>
                    <Input 
                      id="currentStock" 
                      type="number"
                      value={newItem.currentStock || ""}
                      onChange={(e) => setNewItem(prev => ({ ...prev, currentStock: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="minStock">Min Stock</Label>
                    <Input 
                      id="minStock" 
                      type="number"
                      value={newItem.minStock || ""}
                      onChange={(e) => setNewItem(prev => ({ ...prev, minStock: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="maxStock">Max Stock</Label>
                    <Input 
                      id="maxStock" 
                      type="number"
                      value={newItem.maxStock || ""}
                      onChange={(e) => setNewItem(prev => ({ ...prev, maxStock: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="cost">Cost</Label>
                    <Input 
                      id="cost" 
                      type="number"
                      value={newItem.cost || ""}
                      onChange={(e) => setNewItem(prev => ({ ...prev, cost: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price</Label>
                    <Input 
                      id="price" 
                      type="number"
                      value={newItem.price || ""}
                      onChange={(e) => setNewItem(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="store">Store</Label>
                    <Select value={newItem.storeCode || ""} onValueChange={(value) => setNewItem(prev => ({ ...prev, storeCode: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select store" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DT001">Downtown Location</SelectItem>
                        <SelectItem value="MK002">Mall Kiosk</SelectItem>
                        <SelectItem value="AP003">Airport Terminal</SelectItem>
                        <SelectItem value="SP004">Suburban Plaza</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddItem}>Add Item</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onViewChange?.('reports')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalItems}</div>
            <p className="text-xs text-muted-foreground">
              {stats.inStockItems} in stock, {stats.lowStockItems} low stock
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onViewChange?.('reports')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalValue)}</div>
            <p className="text-xs text-muted-foreground">
              Total inventory value
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onViewChange?.('alerts')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Items</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.highRiskItems}</div>
            <p className="text-xs text-muted-foreground">
              High fraud risk items
            </p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onViewChange?.('alerts')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.itemsWithAlerts}</div>
            <p className="text-xs text-muted-foreground">
              Items with alerts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <CardDescription>
            Manage your inventory with advanced tracking and fraud detection
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Smartphones">Smartphones</SelectItem>
                <SelectItem value="Laptops">Laptops</SelectItem>
                <SelectItem value="Tablets">Tablets</SelectItem>
                <SelectItem value="Audio">Audio</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px]">
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
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Store" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stores</SelectItem>
                <SelectItem value="DT001">Downtown</SelectItem>
                <SelectItem value="MK002">Mall Kiosk</SelectItem>
                <SelectItem value="AP003">Airport</SelectItem>
                <SelectItem value="SP004">Suburban</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setFilterCategory("all");
                setFilterStatus("all");
                setFilterStore("all");
              }}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Clear
            </Button>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredItems.length} of {inventoryItems.length} items
            </p>
          </div>

          {/* Inventory Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.sku}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.category}</div>
                        <div className="text-sm text-muted-foreground">{item.brand}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.currentStock}</div>
                        <div className="text-sm text-muted-foreground">
                          Min: {item.minStock} | Max: {item.maxStock}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{formatCurrency(item.price)}</div>
                        <div className="text-sm text-muted-foreground">
                          Cost: {formatCurrency(item.cost)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.storeCode}</div>
                        <div className="text-sm text-muted-foreground">{item.supplier}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getRiskBadge(item.fraudRisk)}
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
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

          {filteredItems.length === 0 && (
            <div className="text-center py-8">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold text-muted-foreground">No items found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search criteria or filters.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}; 