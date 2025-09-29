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
  DollarSign
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
    lastSync: "2024-01-15 09:30 AM"
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
    lastSync: "2024-01-15 08:45 AM"
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
    lastSync: "2024-01-15 10:15 AM"
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
    lastSync: "2024-01-14 04:20 PM"
  }
];

export const StoresView = () => {
  const [stores, setStores] = useState(mockStores);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStore = () => {
    toast({
      title: "Store Added",
      description: "New store has been added successfully.",
    });
    setIsAddDialogOpen(false);
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

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stores.length}</div>
            <p className="text-xs text-muted-foreground">
              {stores.filter(s => s.status === 'active').length} active
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stores.reduce((sum, store) => sum + store.employees, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all locations
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stores.reduce((sum, store) => sum + store.monthlyRevenue, 0))}
            </div>
            <p className="text-xs text-muted-foreground">
              Combined total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Revenue/Store</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stores.reduce((sum, store) => sum + store.monthlyRevenue, 0) / stores.length)}
            </div>
            <p className="text-xs text-muted-foreground">
              Per location
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
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
            <Select defaultValue="all">
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
          </div>

          {/* Stores Table */}
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
                  <TableRow key={store.id}>
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
    </div>
  );
};