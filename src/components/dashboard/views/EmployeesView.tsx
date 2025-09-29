import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  Calendar, 
  DollarSign,
  TrendingUp,
  Award,
  Edit,
  UserPlus,
  Filter,
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
  RefreshCw,
  Heart,
  Zap,
  Shield,
  Crown,
  Sparkles,
  Rocket,
  Brain,
  Coffee,
  Briefcase,
  GraduationCap,
  Trophy,
  Medal,
  Flag,
  CheckCircle,
  AlertCircle,
  Info,
  ExternalLink,
  MoreHorizontal,
  MessageSquare,
  Bell,
  Share,
  Copy,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  FileText,
  Camera,
  Video,
  Mic,
  Headphones,
  Monitor,
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  Gamepad2,
  Music,
  Play,
  Pause,
  Stop,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume2,
  VolumeX,
  Wifi,
  Bluetooth,
  Battery,
  Signal,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  Scan,
  QrCode,
  Barcode,
  Hash,
  AtSign,
  Percent,
  Hash as HashIcon
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
  skills?: string[];
  experience?: number;
  education?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  performanceMetrics?: {
    customerSatisfaction: number;
    salesTarget: number;
    salesAchieved: number;
    attendanceRate: number;
    punctualityRate: number;
  };
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@sswireless.com",
    phone: "(214) 555-0123",
    position: "Store Manager",
    store: "Downtown Flagship",
    storeCode: "DT001",
    hireDate: "2022-03-15",
    monthlySales: 125000,
    totalSales: 1500000,
    status: "active",
    performance: "excellent",
    salary: 75000,
    department: "Management",
    manager: "Regional Director",
    notes: "Exceptional leadership skills, consistently exceeds targets",
    lastLogin: "2024-01-15T09:30:00Z",
    schedule: "Monday-Friday, 9AM-6PM",
    certification: ["Certified Retail Manager", "Customer Service Excellence"],
    goals: {
      monthly: 100000,
      quarterly: 300000,
      annual: 1200000
    },
    achievements: ["Top Performer Q4 2023", "Customer Service Award 2023", "Sales Leader 2023"],
    reviews: [
      {
        date: "2023-12-15",
        rating: 5,
        feedback: "Outstanding performance, great team leadership"
      }
    ],
    skills: ["Leadership", "Sales Management", "Customer Service", "Team Building"],
    experience: 8,
    education: "Bachelor's in Business Administration",
    emergencyContact: {
      name: "John Johnson",
      phone: "(214) 555-0124",
      relationship: "Spouse"
    },
    address: {
      street: "123 Main St",
      city: "Dallas",
      state: "TX",
      zipCode: "75201"
    },
    socialMedia: {
      linkedin: "linkedin.com/in/sarahjohnson",
      twitter: "@sarahj_retail"
    },
    performanceMetrics: {
      customerSatisfaction: 4.9,
      salesTarget: 100000,
      salesAchieved: 125000,
      attendanceRate: 98.5,
      punctualityRate: 99.2
    }
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.c@sswireless.com",
    phone: "(214) 555-0125",
    position: "Senior Sales Associate",
    store: "Mall Location",
    storeCode: "ML002",
    hireDate: "2021-08-20",
    monthlySales: 85000,
    totalSales: 950000,
    status: "active",
    performance: "good",
    salary: 45000,
    department: "Sales",
    manager: "Sarah Johnson",
    notes: "Strong technical knowledge, excellent with customers",
    lastLogin: "2024-01-15T08:45:00Z",
    schedule: "Tuesday-Saturday, 10AM-7PM",
    certification: ["Apple Certified", "Samsung Expert"],
    goals: {
      monthly: 80000,
      quarterly: 240000,
      annual: 960000
    },
    achievements: ["Sales Excellence Award Q3 2023", "Customer Choice Award"],
    reviews: [
      {
        date: "2023-11-20",
        rating: 4,
        feedback: "Great technical skills, room for improvement in leadership"
      }
    ],
    skills: ["Technical Support", "Sales", "Product Knowledge", "Customer Relations"],
    experience: 5,
    education: "Associate's in Computer Science",
    emergencyContact: {
      name: "Lisa Chen",
      phone: "(214) 555-0126",
      relationship: "Sister"
    },
    address: {
      street: "456 Oak Ave",
      city: "Dallas",
      state: "TX",
      zipCode: "75202"
    },
    performanceMetrics: {
      customerSatisfaction: 4.7,
      salesTarget: 80000,
      salesAchieved: 85000,
      attendanceRate: 96.8,
      punctualityRate: 97.5
    }
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@sswireless.com",
    phone: "(214) 555-0127",
    position: "Customer Service Specialist",
    store: "Airport Terminal",
    storeCode: "AT003",
    hireDate: "2023-01-10",
    monthlySales: 45000,
    totalSales: 180000,
    status: "active",
    performance: "good",
    salary: 38000,
    department: "Customer Service",
    manager: "Sarah Johnson",
    notes: "Bilingual, excellent problem-solving skills",
    lastLogin: "2024-01-15T10:15:00Z",
    schedule: "Monday-Friday, 8AM-5PM",
    certification: ["Customer Service Excellence", "Bilingual Certified"],
    goals: {
      monthly: 40000,
      quarterly: 120000,
      annual: 480000
    },
    achievements: ["New Employee Excellence Award", "Customer Satisfaction Leader"],
    reviews: [
      {
        date: "2023-10-15",
        rating: 4,
        feedback: "Excellent customer service, very reliable"
      }
    ],
    skills: ["Customer Service", "Bilingual (Spanish/English)", "Problem Solving", "Communication"],
    experience: 2,
    education: "Bachelor's in Communications",
    emergencyContact: {
      name: "Carlos Rodriguez",
      phone: "(214) 555-0128",
      relationship: "Father"
    },
    address: {
      street: "789 Pine St",
      city: "Dallas",
      state: "TX",
      zipCode: "75203"
    },
    performanceMetrics: {
      customerSatisfaction: 4.8,
      salesTarget: 40000,
      salesAchieved: 45000,
      attendanceRate: 99.1,
      punctualityRate: 98.8
    }
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.k@sswireless.com",
    phone: "(214) 555-0129",
    position: "Technical Support Specialist",
    store: "University Store",
    storeCode: "US004",
    hireDate: "2022-11-05",
    monthlySales: 60000,
    totalSales: 420000,
    status: "active",
    performance: "excellent",
    salary: 52000,
    department: "Technical Support",
    manager: "Michael Chen",
    notes: "Expert in mobile device troubleshooting, great with students",
    lastLogin: "2024-01-15T09:00:00Z",
    schedule: "Monday-Friday, 9AM-6PM",
    certification: ["Apple Certified Technician", "Android Expert", "Network+ Certified"],
    goals: {
      monthly: 55000,
      quarterly: 165000,
      annual: 660000
    },
    achievements: ["Technical Excellence Award", "Student Choice Award", "Innovation Award"],
    reviews: [
      {
        date: "2023-12-01",
        rating: 5,
        feedback: "Outstanding technical knowledge and customer service"
      }
    ],
    skills: ["Technical Support", "Mobile Device Repair", "Network Troubleshooting", "Customer Education"],
    experience: 4,
    education: "Bachelor's in Computer Engineering",
    emergencyContact: {
      name: "Jennifer Kim",
      phone: "(214) 555-0130",
      relationship: "Wife"
    },
    address: {
      street: "321 Elm St",
      city: "Dallas",
      state: "TX",
      zipCode: "75204"
    },
    performanceMetrics: {
      customerSatisfaction: 4.9,
      salesTarget: 55000,
      salesAchieved: 60000,
      attendanceRate: 97.2,
      punctualityRate: 98.1
    }
  },
  {
    id: "5",
    name: "Lisa Thompson",
    email: "lisa.t@sswireless.com",
    phone: "(214) 555-0131",
    position: "Part-time Sales Associate",
    store: "Suburban Plaza",
    storeCode: "SP005",
    hireDate: "2023-06-01",
    monthlySales: 25000,
    totalSales: 75000,
    status: "active",
    performance: "average",
    salary: 28000,
    department: "Sales",
    manager: "Sarah Johnson",
    notes: "Part-time student, shows potential for growth",
    lastLogin: "2024-01-14T16:30:00Z",
    schedule: "Weekends, 12PM-8PM",
    certification: ["Basic Sales Training"],
    goals: {
      monthly: 20000,
      quarterly: 60000,
      annual: 240000
    },
    achievements: ["Rookie of the Month", "Customer Service Excellence"],
    reviews: [
      {
        date: "2023-09-15",
        rating: 3,
        feedback: "Good potential, needs more experience"
      }
    ],
    skills: ["Sales", "Customer Service", "Product Knowledge"],
    experience: 1,
    education: "Currently pursuing Bachelor's in Marketing",
    emergencyContact: {
      name: "Robert Thompson",
      phone: "(214) 555-0132",
      relationship: "Father"
    },
    address: {
      street: "654 Maple Dr",
      city: "Dallas",
      state: "TX",
      zipCode: "75205"
    },
    performanceMetrics: {
      customerSatisfaction: 4.5,
      salesTarget: 20000,
      salesAchieved: 25000,
      attendanceRate: 95.5,
      punctualityRate: 96.8
    }
  }
];

export const EmployeesView = ({ onViewChange }: EmployeesViewProps) => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPerformance, setFilterPerformance] = useState("all");
  const [filterStore, setFilterStore] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  const filteredAndSortedEmployees = useMemo(() => {
    let filtered = employees.filter(employee => {
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || employee.status === filterStatus;
      const matchesPerformance = filterPerformance === "all" || employee.performance === filterPerformance;
      const matchesStore = filterStore === "all" || employee.storeCode === filterStore;
      
      return matchesSearch && matchesStatus && matchesPerformance && matchesStore;
    });

    return filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "name":
          aValue = a.name;
          bValue = b.name;
          break;
        case "position":
          aValue = a.position;
          bValue = b.position;
          break;
        case "sales":
          aValue = a.monthlySales;
          bValue = b.monthlySales;
          break;
        case "hireDate":
          aValue = new Date(a.hireDate).getTime();
          bValue = new Date(b.hireDate).getTime();
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [employees, searchTerm, filterStatus, filterPerformance, filterStore, sortBy, sortOrder]);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'on_leave':
        return <Badge className="bg-yellow-100 text-yellow-800">On Leave</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case 'excellent':
        return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
      case 'good':
        return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
      case 'average':
        return <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>;
      case 'needs_improvement':
        return <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{performance}</Badge>;
    }
  };

  const getPerformanceProgress = (employee: Employee) => {
    if (!employee.goals) return 0;
    return (employee.monthlySales / employee.goals.monthly) * 100;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDetailDialogOpen(true);
  };

  const stats = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter(emp => emp.status === 'active').length,
    onLeaveEmployees: employees.filter(emp => emp.status === 'on_leave').length,
    excellentPerformers: employees.filter(emp => emp.performance === 'excellent').length,
    totalMonthlySales: employees.reduce((sum, emp) => sum + emp.monthlySales, 0),
    averagePerformance: employees.reduce((sum, emp) => {
      const perf = emp.performance === 'excellent' ? 4 : emp.performance === 'good' ? 3 : emp.performance === 'average' ? 2 : 1;
      return sum + perf;
    }, 0) / employees.length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employee Management</h1>
          <p className="text-muted-foreground">
            Manage your team with advanced analytics and insights
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeEmployees} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalMonthlySales)}</div>
            <p className="text-xs text-muted-foreground">
              Team performance
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.excellentPerformers}</div>
            <p className="text-xs text-muted-foreground">
              Excellent ratings
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averagePerformance.toFixed(1)}/4</div>
            <p className="text-xs text-muted-foreground">
              Team average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
          <CardDescription>
            Search, filter, and manage your team members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="on_leave">On Leave</option>
              <option value="inactive">Inactive</option>
            </select>
            <select 
              value={filterPerformance} 
              onChange={(e) => setFilterPerformance(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Performance</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="average">Average</option>
              <option value="needs_improvement">Needs Improvement</option>
            </select>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="name">Sort by Name</option>
              <option value="position">Sort by Position</option>
              <option value="sales">Sort by Sales</option>
              <option value="hireDate">Sort by Hire Date</option>
            </select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "cards" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("cards")}
              >
                Cards
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
              >
                Table
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee Cards/Table */}
      {viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedEmployees.map((employee) => (
            <Card 
              key={employee.id} 
              className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
              onClick={() => handleEmployeeClick(employee)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={employee.avatar || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg">
                      {getInitials(employee.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{employee.name}</CardTitle>
                    <CardDescription>{employee.position}</CardDescription>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStatusBadge(employee.status)}
                      {getPerformanceBadge(employee.performance)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Store</div>
                    <div className="font-medium">{employee.store}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Monthly Sales</div>
                    <div className="font-medium">{formatCurrency(employee.monthlySales)}</div>
                  </div>
                </div>
                
                {employee.goals && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Goal Progress</span>
                      <span>{getPerformanceProgress(employee).toFixed(0)}%</span>
                    </div>
                    <Progress value={getPerformanceProgress(employee)} className="h-2" />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Hired {formatDate(employee.hireDate)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                    <span className="text-sm text-muted-foreground group-hover:text-blue-600 transition-colors">
                      View Details
                    </span>
                  </div>
                </div>

                {employee.achievements && employee.achievements.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-yellow-600">
                      {employee.achievements.length} achievement{employee.achievements.length > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4">Employee</th>
                    <th className="text-left p-4">Position</th>
                    <th className="text-left p-4">Store</th>
                    <th className="text-left p-4">Monthly Sales</th>
                    <th className="text-left p-4">Performance</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedEmployees.map((employee) => (
                    <tr 
                      key={employee.id}
                      className="border-b hover:bg-muted/50 cursor-pointer"
                      onClick={() => handleEmployeeClick(employee)}
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={employee.avatar || undefined} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                              {getInitials(employee.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-muted-foreground">{employee.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{employee.position}</div>
                        <div className="text-sm text-muted-foreground">{employee.department}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{employee.store}</div>
                        <div className="text-sm text-muted-foreground">{employee.storeCode}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{formatCurrency(employee.monthlySales)}</div>
                        <div className="text-sm text-muted-foreground">
                          Total: {formatCurrency(employee.totalSales)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          {getPerformanceBadge(employee.performance)}
                          {employee.achievements && employee.achievements.length > 0 && (
                            <Star className="h-4 w-4 text-yellow-500" />
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(employee.status)}
                      </td>
                      <td className="p-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEmployeeClick(employee);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Employee Detail Dialog */}
      {selectedEmployee && (
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedEmployee.avatar || undefined} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg">
                    {getInitials(selectedEmployee.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-2xl font-bold">{selectedEmployee.name}</div>
                  <div className="text-muted-foreground">{selectedEmployee.position}</div>
                </div>
              </DialogTitle>
              <DialogDescription>
                Complete employee profile and performance details
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span>Employee ID:</span>
                        <span className="font-mono">{selectedEmployee.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span>{selectedEmployee.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phone:</span>
                        <span>{selectedEmployee.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Position:</span>
                        <span>{selectedEmployee.position}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Department:</span>
                        <span>{selectedEmployee.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Manager:</span>
                        <span>{selectedEmployee.manager}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hire Date:</span>
                        <span>{formatDate(selectedEmployee.hireDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        {getStatusBadge(selectedEmployee.status)}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Sales Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span>Monthly Sales:</span>
                        <span className="font-medium">{formatCurrency(selectedEmployee.monthlySales)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Sales:</span>
                        <span className="font-medium">{formatCurrency(selectedEmployee.totalSales)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Performance:</span>
                        {getPerformanceBadge(selectedEmployee.performance)}
                      </div>
                      {selectedEmployee.goals && (
                        <>
                          <div className="flex justify-between">
                            <span>Monthly Goal:</span>
                            <span>{formatCurrency(selectedEmployee.goals.monthly)}</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Goal Progress</span>
                              <span>{getPerformanceProgress(selectedEmployee).toFixed(0)}%</span>
                            </div>
                            <Progress value={getPerformanceProgress(selectedEmployee)} className="h-2" />
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="performance" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedEmployee.performanceMetrics && (
                        <>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Customer Satisfaction:</span>
                              <span className="font-medium">{selectedEmployee.performanceMetrics.customerSatisfaction}/5</span>
                            </div>
                            <Progress value={selectedEmployee.performanceMetrics.customerSatisfaction * 20} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Attendance Rate:</span>
                              <span className="font-medium">{selectedEmployee.performanceMetrics.attendanceRate}%</span>
                            </div>
                            <Progress value={selectedEmployee.performanceMetrics.attendanceRate} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Punctuality Rate:</span>
                              <span className="font-medium">{selectedEmployee.performanceMetrics.punctualityRate}%</span>
                            </div>
                            <Progress value={selectedEmployee.performanceMetrics.punctualityRate} className="h-2" />
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Achievements & Skills</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedEmployee.achievements && selectedEmployee.achievements.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Achievements</h4>
                          <div className="space-y-1">
                            {selectedEmployee.achievements.map((achievement, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <Trophy className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {selectedEmployee.skills && selectedEmployee.skills.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-1">
                            {selectedEmployee.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {selectedEmployee.certification && selectedEmployee.certification.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Certifications</h4>
                          <div className="space-y-1">
                            {selectedEmployee.certification.map((cert, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <GraduationCap className="h-4 w-4 text-blue-500" />
                                <span className="text-sm">{cert}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span>{selectedEmployee.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phone:</span>
                        <span>{selectedEmployee.phone}</span>
                      </div>
                      {selectedEmployee.address && (
                        <>
                          <div className="flex justify-between">
                            <span>Address:</span>
                            <span>{selectedEmployee.address.street}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>City:</span>
                            <span>{selectedEmployee.address.city}, {selectedEmployee.address.state}</span>
                          </div>
                        </>
                      )}
                      {selectedEmployee.emergencyContact && (
                        <>
                          <div className="flex justify-between">
                            <span>Emergency Contact:</span>
                            <span>{selectedEmployee.emergencyContact.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Emergency Phone:</span>
                            <span>{selectedEmployee.emergencyContact.phone}</span>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Professional Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span>Experience:</span>
                        <span>{selectedEmployee.experience} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Education:</span>
                        <span>{selectedEmployee.education}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Schedule:</span>
                        <span>{selectedEmployee.schedule}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Login:</span>
                        <span>{selectedEmployee.lastLogin ? new Date(selectedEmployee.lastLogin).toLocaleString() : 'Never'}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedEmployee.reviews && selectedEmployee.reviews.length > 0 ? (
                      <div className="space-y-4">
                        {selectedEmployee.reviews.map((review, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">Review #{index + 1}</span>
                                <div className="flex items-center space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                                    />
                                  ))}
                                </div>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {formatDate(review.date)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{review.feedback}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No performance reviews available
                      </div>
                    )}
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
