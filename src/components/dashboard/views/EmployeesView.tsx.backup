import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
  Filter,
  Trash2,
  Eye,
  Download,
  Upload,
  Clock,
  MapPin,
  Building,
  Star,
  ArrowUpDown,
  ChevronDown,
  X,
  Check,
  BarChart3,
  Activity,
  Target,
  ChartBar,
  Settings,
  UserCheck,
  UserX,
  RefreshCw
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

type ViewType = 'overview' | 'stores' | 'employees' | 'inventory' | 'reports' | 'alerts' | 'settings';

interface EmployeesViewProps {
  onViewChange?: (view: ViewType) => void;
}

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  store: string;
  storeCode: string;
  hireDate: string;
  monthlySales: number;
  totalSales: number;
  status: 'active' | 'on_leave' | 'inactive';
  avatar?: string | null;
  performance: 'excellent' | 'good' | 'average' | 'needs_improvement';
  salary?: number;
  department?: string;
  manager?: string;
  notes?: string;
  lastLogin?: string;
  schedule?: string;
  certification?: string[];
  goals?: {
    monthly: number;
    quarterly: number;
    annual: number;
  };
  achievements?: string[];
  reviews?: {
    date: string;
    rating: number;
    feedback: string;
  }[];
}

const mockEmployees: Employee[] = [
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
    performance: "excellent",
    salary: 65000,
    department: "Retail",
    manager: "Regional Manager",
    notes: "Exceptional leadership skills, consistently exceeds targets",
    lastLogin: "2024-01-15T09:30:00Z",
    schedule: "Full-time",
    certification: ["Sales Excellence", "Leadership", "Customer Service"],
    goals: { monthly: 20000, quarterly: 60000, annual: 240000 },
    achievements: ["Employee of the Month - Dec 2023", "Top Sales Q4 2023"],
    reviews: [
      { date: "2023-12-01", rating: 5, feedback: "Outstanding performance and leadership" },
      { date: "2023-06-01", rating: 5, feedback: "Excellent team management" }
    ]
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
    performance: "good",
    salary: 42000,
    department: "Retail",
    manager: "Sarah Johnson",
    notes: "Strong product knowledge, great with customers",
    lastLogin: "2024-01-14T16:45:00Z",
    schedule: "Full-time",
    certification: ["Product Knowledge", "Customer Service"],
    goals: { monthly: 10000, quarterly: 30000, annual: 120000 },
    achievements: ["Customer Service Award - Nov 2023"],
    reviews: [
      { date: "2023-11-01", rating: 4, feedback: "Good performance, room for improvement in closing sales" }
    ]
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
    performance: "excellent",
    salary: 52000,
    department: "Retail",
    manager: "Regional Manager",
    notes: "Bilingual skills, excellent with international customers",
    lastLogin: "2024-01-15T08:15:00Z",
    schedule: "Full-time",
    certification: ["Sales Excellence", "Bilingual Service", "Assistant Management"],
    goals: { monthly: 15000, quarterly: 45000, annual: 180000 },
    achievements: ["Top Sales Rep 2022", "Bilingual Service Excellence"],
    reviews: [
      { date: "2023-10-01", rating: 5, feedback: "Exceptional customer service and sales skills" },
      { date: "2023-04-01", rating: 5, feedback: "Outstanding performance" }
    ]
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
    performance: "average",
    salary: 38000,
    department: "Retail",
    manager: "Jessica Rodriguez",
    notes: "New employee, showing steady improvement",
    lastLogin: "2024-01-13T14:20:00Z",
    schedule: "Part-time",
    certification: ["Basic Sales"],
    goals: { monthly: 8000, quarterly: 24000, annual: 96000 },
    achievements: [],
    reviews: [
      { date: "2023-12-01", rating: 3, feedback: "Meeting expectations, needs to focus on upselling" }
    ]
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
    performance: "good",
    salary: 40000,
    department: "Retail",
    manager: "Sarah Johnson",
    notes: "Quick learner, great potential for advancement",
    lastLogin: "2024-01-15T10:00:00Z",
    schedule: "Full-time",
    certification: ["Customer Service", "Product Knowledge"],
    goals: { monthly: 12000, quarterly: 36000, annual: 144000 },
    achievements: ["Fastest Onboarding 2023"],
    reviews: [
      { date: "2023-12-01", rating: 4, feedback: "Strong progress since hiring" }
    ]
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
    performance: "excellent",
    salary: 58000,
    department: "Retail",
    manager: "Regional Manager",
    notes: "On medical leave, returning February 2024",
    lastLogin: "2023-12-20T17:30:00Z",
    schedule: "Full-time",
    certification: ["Sales Excellence", "Leadership", "Advanced Product Knowledge", "Training"],
    goals: { monthly: 18000, quarterly: 54000, annual: 216000 },
    achievements: ["Top Performer 2020-2023", "Training Excellence Award", "Customer Service Champion"],
    reviews: [
      { date: "2023-06-01", rating: 5, feedback: "Consistently outstanding performance" },
      { date: "2022-12-01", rating: 5, feedback: "Excellent mentor to new employees" }
    ]
  }
];

export const EmployeesView = ({ onViewChange }: EmployeesViewProps) => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStore, setFilterStore] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPerformance, setFilterPerformance] = useState("all");
  const [filterPosition, setFilterPosition] = useState("all");
  const [sortBy, setSortBy] = useState<keyof Employee>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);
  const [bulkActionType, setBulkActionType] = useState<string>("");
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({
    name: "",
    email: "",
    phone: "",
    position: "",
    storeCode: "",
    status: "active",
    performance: "average"
  });

  // Filtering and sorting logic
  const filteredAndSortedEmployees = useMemo(() => {
    const filtered = employees.filter(employee => {
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.store.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStore = filterStore === "all" || employee.storeCode === filterStore;
      const matchesStatus = filterStatus === "all" || employee.status === filterStatus;
      const matchesPerformance = filterPerformance === "all" || employee.performance === filterPerformance;
      const matchesPosition = filterPosition === "all" || employee.position === filterPosition;
      
      return matchesSearch && matchesStore && matchesStatus && matchesPerformance && matchesPosition;
    });

    // Sort employees
    filtered.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" 
          ? aValue - bValue
          : bValue - aValue;
      }
      
      return 0;
    });

    return filtered;
  }, [employees, searchTerm, filterStore, filterStatus, filterPerformance, filterPosition, sortBy, sortOrder]);

  // Statistics
  const stats = useMemo(() => {
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(e => e.status === 'active').length;
    const onLeaveEmployees = employees.filter(e => e.status === 'on_leave').length;
    const totalMonthlySales = employees.reduce((sum, emp) => sum + emp.monthlySales, 0);
    const avgSalesPerEmployee = activeEmployees > 0 ? totalMonthlySales / activeEmployees : 0;
    const topPerformers = employees.filter(e => e.performance === 'excellent').length;
    const newHires = employees.filter(e => {
      const hireDate = new Date(e.hireDate);
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      return hireDate > threeMonthsAgo;
    }).length;

    return {
      totalEmployees,
      activeEmployees,
      onLeaveEmployees,
      totalMonthlySales,
      avgSalesPerEmployee,
      topPerformers,
      newHires
    };
  }, [employees]);

  // Handlers
  const handleSort = (column: keyof Employee) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handleSelectEmployee = (employeeId: string) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSelectAll = () => {
    setSelectedEmployees(
      selectedEmployees.length === filteredAndSortedEmployees.length 
        ? [] 
        : filteredAndSortedEmployees.map(emp => emp.id)
    );
  };

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.position || !newEmployee.storeCode) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const employee: Employee = {
      id: (employees.length + 1).toString(),
      name: newEmployee.name!,
      email: newEmployee.email!,
      phone: newEmployee.phone || "",
      position: newEmployee.position!,
      store: getStoreNameByCode(newEmployee.storeCode!),
      storeCode: newEmployee.storeCode!,
      hireDate: new Date().toISOString().split('T')[0],
      monthlySales: 0,
      totalSales: 0,
      status: newEmployee.status as 'active' | 'on_leave' | 'inactive' || 'active',
      performance: newEmployee.performance as 'excellent' | 'good' | 'average' | 'needs_improvement' || 'average',
      salary: 40000,
      department: "Retail",
      manager: "TBD",
      notes: "",
      lastLogin: new Date().toISOString(),
      schedule: "Full-time",
      certification: [],
      goals: { monthly: 10000, quarterly: 30000, annual: 120000 },
      achievements: [],
      reviews: []
    };

    setEmployees(prev => [...prev, employee]);
    setNewEmployee({
      name: "",
      email: "",
      phone: "",
      position: "",
      storeCode: "",
      status: "active",
      performance: "average"
    });
    setIsAddDialogOpen(false);
    toast({
      title: "Employee Added",
      description: `${employee.name} has been added successfully.`,
    });
  };

  const handleEditEmployee = () => {
    if (!selectedEmployee) return;

    setEmployees(prev => 
      prev.map(emp => 
        emp.id === selectedEmployee.id ? selectedEmployee : emp
      )
    );
    setIsEditDialogOpen(false);
    setSelectedEmployee(null);
    toast({
      title: "Employee Updated",
      description: "Employee information has been updated successfully.",
    });
  };

  const handleDeleteEmployee = (employeeId: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
    setEmployeeToDelete(null);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Employee Deleted",
      description: "Employee has been removed from the system.",
    });
  };

  const handleBulkAction = (action: string) => {
    if (selectedEmployees.length === 0) {
      toast({
        title: "No Selection",
        description: "Please select employees to perform bulk actions.",
        variant: "destructive"
      });
      return;
    }

    switch (action) {
      case "activate":
        setEmployees(prev => 
          prev.map(emp => 
            selectedEmployees.includes(emp.id) 
              ? { ...emp, status: 'active' as const }
              : emp
          )
        );
        toast({
          title: "Bulk Action Complete",
          description: `${selectedEmployees.length} employees activated.`,
        });
        break;
      case "deactivate":
        setEmployees(prev => 
          prev.map(emp => 
            selectedEmployees.includes(emp.id) 
              ? { ...emp, status: 'inactive' as const }
              : emp
          )
        );
        toast({
          title: "Bulk Action Complete",
          description: `${selectedEmployees.length} employees deactivated.`,
        });
        break;
      case "export":
        // Simulate export
        toast({
          title: "Export Complete",
          description: `Exported ${selectedEmployees.length} employee records.`,
        });
        break;
      case "delete":
        setEmployees(prev => 
          prev.filter(emp => !selectedEmployees.includes(emp.id))
        );
        toast({
          title: "Bulk Delete Complete",
          description: `${selectedEmployees.length} employees removed.`,
        });
        break;
    }
    setSelectedEmployees([]);
  };

  const getStoreNameByCode = (code: string): string => {
    const storeMap: { [key: string]: string } = {
      "DT001": "Downtown Location",
      "MK002": "Mall Kiosk", 
      "AP003": "Airport Terminal",
      "SP004": "Suburban Plaza"
    };
    return storeMap[code] || code;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case "on_leave":
        return <Badge variant="secondary" className="bg-yellow-500 hover:bg-yellow-600 text-white">On Leave</Badge>;
      case "inactive":
        return <Badge variant="destructive">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case "excellent":
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Excellent</Badge>;
      case "good":
        return <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">Good</Badge>;
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getPerformanceProgress = (employee: Employee) => {
    if (!employee.goals) return 0;
    return Math.min((employee.monthlySales / employee.goals.monthly) * 100, 100);
  };

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
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Import
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="w-4 h-4" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogDescription>
                  Add a new team member to your organization.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter employee name"
                      value={newEmployee.name || ""}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="employee@sswireless.com"
                      value={newEmployee.email || ""}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      placeholder="(214) 555-0123"
                      value={newEmployee.phone || ""}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="position">Position *</Label>
                    <Select value={newEmployee.position || ""} onValueChange={(value) => setNewEmployee(prev => ({ ...prev, position: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sales Associate">Sales Associate</SelectItem>
                        <SelectItem value="Senior Sales Rep">Senior Sales Rep</SelectItem>
                        <SelectItem value="Assistant Manager">Assistant Manager</SelectItem>
                        <SelectItem value="Store Manager">Store Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="store">Store Location *</Label>
                    <Select value={newEmployee.storeCode || ""} onValueChange={(value) => setNewEmployee(prev => ({ ...prev, storeCode: value }))}>
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
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={newEmployee.status || "active"} onValueChange={(value) => setNewEmployee(prev => ({ ...prev, status: value as any }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="on_leave">On Leave</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeEmployees} active, {stats.onLeaveEmployees} on leave
            </p>
            <div className="mt-2">
              <Progress value={(stats.activeEmployees / stats.totalEmployees) * 100} className="h-1" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalMonthlySales)}</div>
            <p className="text-xs text-muted-foreground">
              Combined team total
            </p>
            <div className="mt-2">
              <Progress value={75} className="h-1" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Sales/Employee</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.avgSalesPerEmployee)}</div>
            <p className="text-xs text-muted-foreground">
              Per active employee
            </p>
            <div className="mt-2">
              <Progress value={82} className="h-1" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.topPerformers}</div>
            <p className="text-xs text-muted-foreground">
              Excellent ratings ({stats.newHires} new hires)
            </p>
            <div className="mt-2">
              <Progress value={(stats.topPerformers / stats.totalEmployees) * 100} className="h-1" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Team Directory</CardTitle>
              <CardDescription>
                Manage your employees and track their performance
              </CardDescription>
            </div>
            {selectedEmployees.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {selectedEmployees.length} selected
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Bulk Actions <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Bulk Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleBulkAction("activate")}>
                      <UserCheck className="mr-2 h-4 w-4" />
                      Activate Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAction("deactivate")}>
                      <UserX className="mr-2 h-4 w-4" />
                      Deactivate Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAction("export")}>
                      <Download className="mr-2 h-4 w-4" />
                      Export Selected
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => handleBulkAction("delete")}
                      className="text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Selected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px]">
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
            <Select value={filterPerformance} onValueChange={setFilterPerformance}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Performance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Performance</SelectItem>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="average">Average</SelectItem>
                <SelectItem value="needs_improvement">Needs Improvement</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPosition} onValueChange={setFilterPosition}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Positions</SelectItem>
                <SelectItem value="Store Manager">Store Manager</SelectItem>
                <SelectItem value="Assistant Manager">Assistant Manager</SelectItem>
                <SelectItem value="Senior Sales Rep">Senior Sales Rep</SelectItem>
                <SelectItem value="Sales Associate">Sales Associate</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setFilterStore("all");
                setFilterStatus("all");
                setFilterPerformance("all");
                setFilterPosition("all");
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
              Showing {filteredAndSortedEmployees.length} of {employees.length} employees
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Sort by:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {sortBy} <ArrowUpDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleSort("name")}>Name</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("position")}>Position</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("hireDate")}>Hire Date</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("monthlySales")}>Monthly Sales</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("performance")}>Performance</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("status")}>Status</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Employees Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedEmployees.length === filteredAndSortedEmployees.length && filteredAndSortedEmployees.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                    <div className="flex items-center gap-1">
                      Employee
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("position")}>
                    <div className="flex items-center gap-1">
                      Position
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("hireDate")}>
                    <div className="flex items-center gap-1">
                      Hire Date
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("monthlySales")}>
                    <div className="flex items-center gap-1">
                      Monthly Sales
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Goals Progress</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("performance")}>
                    <div className="flex items-center gap-1">
                      Performance
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                    <div className="flex items-center gap-1">
                      Status
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedEmployees.map((employee) => (
                  <TableRow 
                    key={employee.id}
                    className={selectedEmployees.includes(employee.id) ? "bg-muted/50" : ""}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedEmployees.includes(employee.id)}
                        onCheckedChange={() => handleSelectEmployee(employee.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={employee.avatar || undefined} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                            {getInitials(employee.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">{employee.email}</div>
                          {employee.certification && employee.certification.length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {employee.certification.slice(0, 2).map((cert, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {cert}
                                </Badge>
                              ))}
                              {employee.certification.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{employee.certification.length - 2}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{employee.position}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          {employee.department || "Retail"}
                        </div>
                      </div>
                    </TableCell>
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
                        {formatDate(employee.hireDate)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{formatCurrency(employee.monthlySales)}</div>
                      <div className="text-sm text-muted-foreground">
                        Total: {formatCurrency(employee.totalSales)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          {employee.goals ? formatCurrency(employee.goals.monthly) : "No goal set"}
                        </div>
                        <Progress 
                          value={getPerformanceProgress(employee)} 
                          className="h-2"
                        />
                        <div className="text-xs text-muted-foreground">
                          {getPerformanceProgress(employee).toFixed(0)}% of goal
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getPerformanceBadge(employee.performance)}
                        {employee.achievements && employee.achievements.length > 0 && (
                          <Star className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(employee.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedEmployee(employee);
                            setIsViewDialogOpen(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedEmployee(employee);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => {
                                setSelectedEmployee(employee);
                                setIsViewDialogOpen(true);
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedEmployee(employee);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Employee
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Clock className="mr-2 h-4 w-4" />
                              View Schedule
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <BarChart3 className="mr-2 h-4 w-4" />
                              Performance Report
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setEmployeeToDelete(employee.id);
                                setIsDeleteDialogOpen(true);
                              }}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Employee
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredAndSortedEmployees.length === 0 && (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold text-muted-foreground">No employees found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search criteria or filters.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Employee Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={selectedEmployee?.avatar || undefined} />
                <AvatarFallback>
                  {selectedEmployee ? getInitials(selectedEmployee.name) : ""}
                </AvatarFallback>
              </Avatar>
              {selectedEmployee?.name}
            </DialogTitle>
            <DialogDescription>
              Employee details and performance overview
            </DialogDescription>
          </DialogHeader>
          
          {selectedEmployee && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{selectedEmployee.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{selectedEmployee.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{selectedEmployee.store}</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Employment Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Position:</span>
                        <span className="text-sm font-medium">{selectedEmployee.position}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Hire Date:</span>
                        <span className="text-sm font-medium">{formatDate(selectedEmployee.hireDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        {getStatusBadge(selectedEmployee.status)}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Schedule:</span>
                        <span className="text-sm font-medium">{selectedEmployee.schedule}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Sales Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(selectedEmployee.monthlySales)}
                        </div>
                        <div className="text-sm text-muted-foreground">Monthly Sales</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(selectedEmployee.totalSales)}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Sales</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {selectedEmployee.salary ? formatCurrency(selectedEmployee.salary) : "N/A"}
                        </div>
                        <div className="text-sm text-muted-foreground">Annual Salary</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Certifications & Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-medium mb-2">Certifications:</div>
                        <div className="flex flex-wrap gap-1">
                          {selectedEmployee.certification?.map((cert, index) => (
                            <Badge key={index} variant="secondary">{cert}</Badge>
                          )) || <span className="text-sm text-muted-foreground">No certifications</span>}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-2">Achievements:</div>
                        <div className="space-y-1">
                          {selectedEmployee.achievements?.map((achievement, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm">{achievement}</span>
                            </div>
                          )) || <span className="text-sm text-muted-foreground">No achievements recorded</span>}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {selectedEmployee.notes && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{selectedEmployee.notes}</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="performance" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Performance Rating
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        {getPerformanceBadge(selectedEmployee.performance)}
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {selectedEmployee.reviews && selectedEmployee.reviews.length > 0 
                              ? selectedEmployee.reviews[selectedEmployee.reviews.length - 1].rating
                              : "N/A"
                            }
                          </div>
                          <div className="text-sm text-muted-foreground">out of 5</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        Goal Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Monthly Goal</span>
                          <span>{getPerformanceProgress(selectedEmployee).toFixed(0)}%</span>
                        </div>
                        <Progress value={getPerformanceProgress(selectedEmployee)} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          {formatCurrency(selectedEmployee.monthlySales)} / {formatCurrency(selectedEmployee.goals?.monthly || 0)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Sales Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                      <ChartBar className="w-8 h-8 mr-2" />
                      Sales chart would be displayed here
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-4">
                <div className="space-y-4">
                  {selectedEmployee.reviews && selectedEmployee.reviews.length > 0 ? (
                    selectedEmployee.reviews.map((review, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm">
                              Review - {formatDate(review.date)}
                            </CardTitle>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{review.feedback}</p>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="py-8 text-center">
                        <p className="text-muted-foreground">No reviews available</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="goals" className="space-y-4">
                <div className="grid gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Sales Goals</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">
                              {formatCurrency(selectedEmployee.goals?.monthly || 0)}
                            </div>
                            <div className="text-sm text-muted-foreground">Monthly Goal</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">
                              {formatCurrency(selectedEmployee.goals?.quarterly || 0)}
                            </div>
                            <div className="text-sm text-muted-foreground">Quarterly Goal</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-purple-600">
                              {formatCurrency(selectedEmployee.goals?.annual || 0)}
                            </div>
                            <div className="text-sm text-muted-foreground">Annual Goal</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Goal Progress Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Monthly Progress</span>
                            <span>{getPerformanceProgress(selectedEmployee).toFixed(0)}%</span>
                          </div>
                          <Progress value={getPerformanceProgress(selectedEmployee)} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Quarterly Progress</span>
                            <span>{((selectedEmployee.monthlySales * 3) / (selectedEmployee.goals?.quarterly || 1) * 100).toFixed(0)}%</span>
                          </div>
                          <Progress value={(selectedEmployee.monthlySales * 3) / (selectedEmployee.goals?.quarterly || 1) * 100} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Annual Progress</span>
                            <span>{((selectedEmployee.totalSales) / (selectedEmployee.goals?.annual || 1) * 100).toFixed(0)}%</span>
                          </div>
                          <Progress value={(selectedEmployee.totalSales) / (selectedEmployee.goals?.annual || 1) * 100} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Employee Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>
              Update employee information and settings.
            </DialogDescription>
          </DialogHeader>
          
          {selectedEmployee && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input 
                    id="edit-name" 
                    value={selectedEmployee.name}
                    onChange={(e) => setSelectedEmployee(prev => prev ? { ...prev, name: e.target.value } : null)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input 
                    id="edit-email" 
                    value={selectedEmployee.email}
                    onChange={(e) => setSelectedEmployee(prev => prev ? { ...prev, email: e.target.value } : null)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input 
                    id="edit-phone" 
                    value={selectedEmployee.phone}
                    onChange={(e) => setSelectedEmployee(prev => prev ? { ...prev, phone: e.target.value } : null)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-position">Position</Label>
                  <Select 
                    value={selectedEmployee.position} 
                    onValueChange={(value) => setSelectedEmployee(prev => prev ? { ...prev, position: value } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sales Associate">Sales Associate</SelectItem>
                      <SelectItem value="Senior Sales Rep">Senior Sales Rep</SelectItem>
                      <SelectItem value="Assistant Manager">Assistant Manager</SelectItem>
                      <SelectItem value="Store Manager">Store Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-store">Store Location</Label>
                  <Select 
                    value={selectedEmployee.storeCode} 
                    onValueChange={(value) => setSelectedEmployee(prev => prev ? { 
                      ...prev, 
                      storeCode: value,
                      store: getStoreNameByCode(value)
                    } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DT001">Downtown Location</SelectItem>
                      <SelectItem value="MK002">Mall Kiosk</SelectItem>
                      <SelectItem value="AP003">Airport Terminal</SelectItem>
                      <SelectItem value="SP004">Suburban Plaza</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select 
                    value={selectedEmployee.status} 
                    onValueChange={(value) => setSelectedEmployee(prev => prev ? { ...prev, status: value as any } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on_leave">On Leave</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-performance">Performance</Label>
                  <Select 
                    value={selectedEmployee.performance} 
                    onValueChange={(value) => setSelectedEmployee(prev => prev ? { ...prev, performance: value as any } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="average">Average</SelectItem>
                      <SelectItem value="needs_improvement">Needs Improvement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-salary">Annual Salary</Label>
                  <Input 
                    id="edit-salary" 
                    type="number"
                    value={selectedEmployee.salary || ""}
                    onChange={(e) => setSelectedEmployee(prev => prev ? { ...prev, salary: parseInt(e.target.value) || 0 } : null)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea 
                  id="edit-notes" 
                  value={selectedEmployee.notes || ""}
                  onChange={(e) => setSelectedEmployee(prev => prev ? { ...prev, notes: e.target.value } : null)}
                  placeholder="Add notes about this employee..."
                />
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditEmployee}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the employee
              from your system and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => employeeToDelete && handleDeleteEmployee(employeeToDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Employee
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}; 