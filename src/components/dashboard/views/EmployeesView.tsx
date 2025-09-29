import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Phone, 
  Mail, 
  Calendar, 
  DollarSign,
  TrendingUp,
  Award,
  Edit,
  UserPlus,
  Filter
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const mockEmployees = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@sswireless.com",
    phone: "(214) 555-0123",
    position: "Store Manager",
    store: "Downtown Location",
    storeCode: "DT001",
    hireDate: "2022-03-15",
    monthlySales: 15000,
    totalSales: 180000,
    status: "active",
    avatar: null,
    performance: "excellent"
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike.c@sswireless.com", 
    phone: "(214) 555-0456",
    position: "Sales Associate",
    store: "Mall Kiosk",
    storeCode: "MK002",
    hireDate: "2023-01-20",
    monthlySales: 8500,
    totalSales: 95000,
    status: "active",
    avatar: null,
    performance: "good"
  },
  {
    id: "3",
    name: "Jessica Rodriguez",
    email: "jessica.r@sswireless.com",
    phone: "(214) 555-0789",
    position: "Assistant Manager",
    store: "Airport Terminal",
    storeCode: "AP003",
    hireDate: "2021-11-08",
    monthlySales: 12000,
    totalSales: 250000,
    status: "active",
    avatar: null,
    performance: "excellent"
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.k@sswireless.com",
    phone: "(972) 555-0321",
    position: "Sales Associate",
    store: "Suburban Plaza",
    storeCode: "SP004",
    hireDate: "2023-06-12",
    monthlySales: 6200,
    totalSales: 42000,
    status: "active",
    avatar: null,
    performance: "average"
  },
  {
    id: "5",
    name: "Emily Davis",
    email: "emily.d@sswireless.com",
    phone: "(214) 555-0987",
    position: "Sales Associate",
    store: "Downtown Location",
    storeCode: "DT001",
    hireDate: "2023-09-03",
    monthlySales: 9800,
    totalSales: 35000,
    status: "active",
    avatar: null,
    performance: "good"
  },
  {
    id: "6",
    name: "Robert Wilson",
    email: "robert.w@sswireless.com",
    phone: "(214) 555-0654",
    position: "Senior Sales Rep",
    store: "Airport Terminal",
    storeCode: "AP003",
    hireDate: "2020-05-18",
    monthlySales: 13500,
    totalSales: 480000,
    status: "on_leave",
    avatar: null,
    performance: "excellent"
  }
];

export const EmployeesView = () => {
  const [employees, setEmployees] = useState(mockEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStore, setFilterStore] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStore = filterStore === "all" || employee.storeCode === filterStore;
    const matchesStatus = filterStatus === "all" || employee.status === filterStatus;
    
    return matchesSearch && matchesStore && matchesStatus;
  });

  const handleAddEmployee = () => {
    toast({
      title: "Employee Added",
      description: "New employee has been added successfully.",
    });
    setIsAddDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-500">Active</Badge>;
      case "on_leave":
        return <Badge variant="secondary">On Leave</Badge>;
      case "inactive":
        return <Badge variant="destructive">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case "excellent":
        return <Badge variant="default" className="bg-green-500">Excellent</Badge>;
      case "good":
        return <Badge variant="default" className="bg-blue-500">Good</Badge>;
      case "average":
        return <Badge variant="secondary">Average</Badge>;
      case "needs_improvement":
        return <Badge variant="destructive">Needs Improvement</Badge>;
      default:
        return <Badge variant="outline">{performance}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const totalMonthlySales = employees.reduce((sum, emp) => sum + emp.monthlySales, 0);
  const avgSalesPerEmployee = totalMonthlySales / activeEmployees;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employee Management</h1>
          <p className="text-muted-foreground">
            Manage your team and track performance across all locations
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="w-4 h-4" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>
                Add a new team member to your organization.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter employee name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="employee@sswireless.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="(214) 555-0123" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="position">Position</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales_associate">Sales Associate</SelectItem>
                    <SelectItem value="senior_sales">Senior Sales Rep</SelectItem>
                    <SelectItem value="assistant_manager">Assistant Manager</SelectItem>
                    <SelectItem value="store_manager">Store Manager</SelectItem>
                  </SelectContent>
                </Select>
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
              <Button onClick={handleAddEmployee}>Add Employee</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              {activeEmployees} active
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalMonthlySales)}</div>
            <p className="text-xs text-muted-foreground">
              Combined team total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Sales/Employee</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(avgSalesPerEmployee)}</div>
            <p className="text-xs text-muted-foreground">
              Per active employee
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {employees.filter(e => e.performance === 'excellent').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Excellent ratings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Team Directory</CardTitle>
          <CardDescription>
            Manage your employees and track their performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStore} onValueChange={setFilterStore}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by store" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stores</SelectItem>
                <SelectItem value="DT001">Downtown</SelectItem>
                <SelectItem value="MK002">Mall Kiosk</SelectItem>
                <SelectItem value="AP003">Airport</SelectItem>
                <SelectItem value="SP004">Suburban</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on_leave">On Leave</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Employees Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Hire Date</TableHead>
                  <TableHead>Monthly Sales</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[70px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={employee.avatar} />
                          <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">{employee.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{employee.store}</div>
                        <div className="text-sm text-muted-foreground">{employee.storeCode}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {employee.phone}
                        </div>
                        <div className="text-sm flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {employee.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-3 h-3" />
                        {new Date(employee.hireDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(employee.monthlySales)}</TableCell>
                    <TableCell>{getPerformanceBadge(employee.performance)}</TableCell>
                    <TableCell>{getStatusBadge(employee.status)}</TableCell>
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