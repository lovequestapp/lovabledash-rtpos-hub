import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Plus, 
  Search, 
  MoreHorizontal, 
  AlertTriangle, 
  TrendingDown,
  DollarSign,
  Boxes,
  Archive,
  Edit,
  Eye,
  Filter,
  Download
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const mockInventory = [
  {
    id: "1",
    sku: "IP15-128-BLK",
    name: "iPhone 15 128GB Black",
    category: "Smartphones",
    brand: "Apple",
    costPrice: 699.00,
    retailPrice: 899.00,
    quantityOnHand: 45,
    reorderLevel: 10,
    store: "Downtown Location",
    storeCode: "DT001",
    lastUpdated: "2024-01-15",
    status: "in_stock",
    supplier: "Apple Inc."
  },
  {
    id: "2",
    sku: "SM-S24-256-BLU",
    name: "Samsung Galaxy S24 256GB Blue",
    category: "Smartphones", 
    brand: "Samsung",
    costPrice: 649.00,
    retailPrice: 849.00,
    quantityOnHand: 3,
    reorderLevel: 8,
    store: "Mall Kiosk",
    storeCode: "MK002",
    lastUpdated: "2024-01-14",
    status: "low_stock",
    supplier: "Samsung Electronics"
  },
  {
    id: "3",
    sku: "CASE-IP15-CLR",
    name: "Clear Case for iPhone 15",
    category: "Accessories",
    brand: "Generic",
    costPrice: 8.50,
    retailPrice: 24.99,
    quantityOnHand: 156,
    reorderLevel: 25,
    store: "Airport Terminal",
    storeCode: "AP003",
    lastUpdated: "2024-01-15",
    status: "in_stock",
    supplier: "TechAccessories Co."
  },
  {
    id: "4",
    sku: "CHRG-USBC-20W",
    name: "USB-C 20W Fast Charger",
    category: "Accessories",
    brand: "Apple",
    costPrice: 15.00,
    retailPrice: 29.99,
    quantityOnHand: 0,
    reorderLevel: 15,
    store: "Suburban Plaza",
    storeCode: "SP004",
    lastUpdated: "2024-01-12",
    status: "out_of_stock",
    supplier: "Apple Inc."
  },
  {
    id: "5",
    sku: "SCRN-IP15-TMPR",
    name: "iPhone 15 Tempered Glass Screen Protector",
    category: "Accessories",
    brand: "TechGuard",
    costPrice: 3.25,
    retailPrice: 19.99,
    quantityOnHand: 89,
    reorderLevel: 20,
    store: "Downtown Location",
    storeCode: "DT001",
    lastUpdated: "2024-01-15",
    status: "in_stock",
    supplier: "TechGuard Solutions"
  },
  {
    id: "6",
    sku: "TAB-IP-11-128",
    name: "iPad 11-inch 128GB WiFi",
    category: "Tablets",
    brand: "Apple",
    costPrice: 449.00,
    retailPrice: 599.00,
    quantityOnHand: 12,
    reorderLevel: 5,
    store: "Airport Terminal",
    storeCode: "AP003",
    lastUpdated: "2024-01-13",
    status: "in_stock",
    supplier: "Apple Inc."
  }
];

export const InventoryView = () => {
  const [inventory, setInventory] = useState(mockInventory);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterStore, setFilterStore] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || item.category === filterCategory;
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    const matchesStore = filterStore === "all" || item.storeCode === filterStore;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesStore;
  });

  const handleAddItem = () => {
    toast({
      title: "Item Added",
      description: "New inventory item has been added successfully.",
    });
    setIsAddDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_stock":
        return <Badge variant="default" className="bg-green-500">In Stock</Badge>;
      case "low_stock":
        return <Badge variant="secondary" className="bg-yellow-500">Low Stock</Badge>;
      case "out_of_stock":
        return <Badge variant="destructive">Out of Stock</Badge>;
      case "discontinued":
        return <Badge variant="outline">Discontinued</Badge>;
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

  const totalItems = inventory.length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.quantityOnHand * item.costPrice), 0);
  const lowStockItems = inventory.filter(item => item.quantityOnHand <= item.reorderLevel).length;
  const outOfStockItems = inventory.filter(item => item.quantityOnHand === 0).length;

  const categories = [...new Set(inventory.map(item => item.category))];
  const stores = [...new Set(inventory.map(item => ({ code: item.storeCode, name: item.store })))];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground">
            Track and manage inventory across all store locations
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Inventory Item</DialogTitle>
                <DialogDescription>
                  Add a new product to your inventory system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="e.g., IP15-128-BLK" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" placeholder="Enter product name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smartphones">Smartphones</SelectItem>
                      <SelectItem value="tablets">Tablets</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                      <SelectItem value="cases">Cases</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input id="brand" placeholder="e.g., Apple, Samsung" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="cost">Cost Price</Label>
                    <Input id="cost" type="number" placeholder="0.00" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="retail">Retail Price</Label>
                    <Input id="retail" type="number" placeholder="0.00" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="store">Store Location</Label>
                  <Select>
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">
              SKUs in system
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
            <p className="text-xs text-muted-foreground">
              At cost price
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">
              Items need reorder
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStockItems}</div>
            <p className="text-xs text-muted-foreground">
              Immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Management Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Inventory</TabsTrigger>
          <TabsTrigger value="alerts">Stock Alerts</TabsTrigger>
          <TabsTrigger value="movements">Recent Movements</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Items</CardTitle>
              <CardDescription>
                Manage all inventory items across your store locations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search inventory..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
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
                  </SelectContent>
                </Select>
                <Select value={filterStore} onValueChange={setFilterStore}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Store" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stores</SelectItem>
                    {stores.map(store => (
                      <SelectItem key={store.code} value={store.code}>{store.code}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Inventory Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Store</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Cost Price</TableHead>
                      <TableHead>Retail Price</TableHead>
                      <TableHead>Total Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[70px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInventory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">
                              SKU: {item.sku} • {item.brand}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.storeCode}</div>
                            <div className="text-sm text-muted-foreground">{item.store}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={`font-medium ${item.quantityOnHand <= item.reorderLevel ? 'text-yellow-600' : ''} ${item.quantityOnHand === 0 ? 'text-red-600' : ''}`}>
                            {item.quantityOnHand}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Reorder at {item.reorderLevel}
                          </div>
                        </TableCell>
                        <TableCell>{formatCurrency(item.costPrice)}</TableCell>
                        <TableCell>{formatCurrency(item.retailPrice)}</TableCell>
                        <TableCell>{formatCurrency(item.quantityOnHand * item.costPrice)}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
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
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stock Alerts</CardTitle>
              <CardDescription>
                Items that need immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventory.filter(item => item.quantityOnHand <= item.reorderLevel).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${item.quantityOnHand === 0 ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.sku} • {item.store}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={`font-medium ${item.quantityOnHand === 0 ? 'text-red-600' : 'text-yellow-600'}`}>
                          {item.quantityOnHand} units
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Reorder at {item.reorderLevel}
                        </div>
                      </div>
                      <Button size="sm">Reorder</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Inventory Movements</CardTitle>
              <CardDescription>
                Track recent inventory changes and adjustments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center text-muted-foreground py-8">
                  <Archive className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No recent inventory movements to display.</p>
                  <p className="text-sm">Movements will appear here when inventory is updated.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};