import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  CreditCard, 
  Store, 
  User, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Filter,
  Search,
  Download,
  RefreshCw,
  Activity,
  Zap,
  Shield,
  Smartphone,
  Monitor,
  Receipt,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Banknote,
  Coins,
  Wallet,
  ShoppingCart,
  Package,
  Tag,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Plus,
  MoreHorizontal,
  Settings,
  Bell,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share,
  Copy,
  ExternalLink,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  Scan,
  QrCode,
  Barcode,
  Hash,
  Building2,
  Users,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Gift
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface TransactionsViewProps {
  onViewChange?: (view: string) => void;
}

interface Transaction {
  id: string;
  timestamp: string;
  storeId: string;
  storeName: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  amount: number;
  currency: string;
  paymentMethod: 'card' | 'cash' | 'mobile' | 'crypto' | 'check' | 'gift_card';
  paymentStatus: 'completed' | 'pending' | 'failed' | 'refunded' | 'cancelled';
  items: TransactionItem[];
  employeeId: string;
  employeeName: string;
  terminalId: string;
  receiptNumber: string;
  tax: number;
  discount: number;
  tip: number;
  total: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  metadata: {
    ipAddress: string;
    userAgent: string;
    deviceType: 'mobile' | 'tablet' | 'desktop' | 'pos';
    browser: string;
    os: string;
    referrer: string;
    campaign: string;
    source: string;
    medium: string;
  };
  riskScore: number;
  fraudFlags: string[];
  tags: string[];
  notes: string;
  attachments: string[];
  relatedTransactions: string[];
  refunds: Refund[];
  status: 'active' | 'archived' | 'disputed';
  createdAt: string;
  updatedAt: string;
}

interface TransactionItem {
  id: string;
  productId: string;
  productName: string;
  category: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discount: number;
  tax: number;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  attributes: Record<string, any>;
}

interface Refund {
  id: string;
  amount: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
}

// Enhanced mock data with comprehensive transaction details
const generateMockTransactions = (): Transaction[] => {
  const stores = [
    { id: 'ST001', name: 'Post Oak', city: 'Houston', address: '5015 Westheimer Rd', zipCode: '77056', manager: 'Sarah Johnson' },
    { id: 'ST002', name: 'Fondren', city: 'Houston', address: '9801 Southwest Fwy', zipCode: '77074', manager: 'Michael Chen' },
    { id: 'ST003', name: 'West Bellfort', city: 'Houston', address: '7625 W Bellfort Ave', zipCode: '77071', manager: 'Emily Rodriguez' },
    { id: 'ST004', name: 'El Campo', city: 'El Campo', address: '2101 N Mechanic St', zipCode: '77437', manager: 'David Kim' },
    { id: 'ST005', name: 'Galleria', city: 'Houston', address: '5085 Westheimer Rd', zipCode: '77056', manager: 'Lisa Thompson' },
    { id: 'ST006', name: 'Woodlands', city: 'The Woodlands', address: '1201 Lake Woodlands Dr', zipCode: '77380', manager: 'Carlos Martinez' },
    { id: 'ST007', name: 'Katy', city: 'Katy', address: '23501 Cinco Ranch Blvd', zipCode: '77494', manager: 'Angela White' },
    { id: 'ST008', name: 'Pearland', city: 'Pearland', address: '11200 Broadway St', zipCode: '77584', manager: 'James Wilson' }
  ];

  const employees = [
    { id: 'E001', name: 'John Smith', store: 'ST001', role: 'Sales Associate' },
    { id: 'E002', name: 'Maria Garcia', store: 'ST001', role: 'Senior Sales' },
    { id: 'E003', name: 'Alex Johnson', store: 'ST002', role: 'Store Manager' },
    { id: 'E004', name: 'Sarah Wilson', store: 'ST002', role: 'Sales Associate' },
    { id: 'E005', name: 'Mike Brown', store: 'ST003', role: 'Sales Associate' },
    { id: 'E006', name: 'Jennifer Lee', store: 'ST003', role: 'Senior Sales' },
    { id: 'E007', name: 'Robert Davis', store: 'ST004', role: 'Store Manager' },
    { id: 'E008', name: 'Amanda Taylor', store: 'ST004', role: 'Sales Associate' },
    { id: 'E009', name: 'Chris Martinez', store: 'ST005', role: 'Senior Sales' },
    { id: 'E010', name: 'Jessica White', store: 'ST005', role: 'Sales Associate' },
    { id: 'E011', name: 'Brandon Lee', store: 'ST006', role: 'Sales Associate' },
    { id: 'E012', name: 'Sophia Nguyen', store: 'ST006', role: 'Senior Sales' },
    { id: 'E013', name: 'Tyler Rodriguez', store: 'ST007', role: 'Sales Associate' },
    { id: 'E014', name: 'Olivia Johnson', store: 'ST007', role: 'Store Manager' },
    { id: 'E015', name: 'Marcus Thompson', store: 'ST008', role: 'Sales Associate' },
    { id: 'E016', name: 'Emma Davis', store: 'ST008', role: 'Senior Sales' }
  ];

  const customers = [
    { id: 'C001', name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1-555-0101' },
    { id: 'C002', name: 'Michael Chen', email: 'm.chen@email.com', phone: '+1-555-0102' },
    { id: 'C003', name: 'Emily Rodriguez', email: 'emily.r@email.com', phone: '+1-555-0103' },
    { id: 'C004', name: 'David Kim', email: 'david.k@email.com', phone: '+1-555-0104' },
    { id: 'C005', name: 'Lisa Thompson', email: 'lisa.t@email.com', phone: '+1-555-0105' }
  ];

  const products = [
    { id: 'P001', name: 'iPhone 15 Pro Max', category: 'Electronics', sku: 'APL-IPH-15PM-256', price: 1199, brand: 'Apple' },
    { id: 'P002', name: 'Samsung Galaxy S24 Ultra', category: 'Electronics', sku: 'SAM-GAL-S24U-512', price: 1299, brand: 'Samsung' },
    { id: 'P003', name: 'MacBook Pro 16" M3 Pro', category: 'Electronics', sku: 'APL-MBP-16M3-1TB', price: 2499, brand: 'Apple' },
    { id: 'P004', name: 'iPad Pro 12.9"', category: 'Electronics', sku: 'APL-IPD-129-256', price: 1099, brand: 'Apple' },
    { id: 'P005', name: 'AirPods Pro 2nd Gen', category: 'Electronics', sku: 'APL-APP-PRO2', price: 249, brand: 'Apple' },
    { id: 'P006', name: 'Apple Watch Series 9', category: 'Electronics', sku: 'APL-AW-S9-45MM', price: 429, brand: 'Apple' },
    { id: 'P007', name: 'Sony WH-1000XM5 Headphones', category: 'Electronics', sku: 'SNY-WH-1000XM5', price: 399, brand: 'Sony' },
    { id: 'P008', name: 'Dell XPS 15 Laptop', category: 'Electronics', sku: 'DEL-XPS-15-1TB', price: 1899, brand: 'Dell' },
    { id: 'P009', name: 'LG 55" OLED TV', category: 'Electronics', sku: 'LG-OLED-55C3', price: 1599, brand: 'LG' },
    { id: 'P010', name: 'PlayStation 5', category: 'Electronics', sku: 'SNY-PS5-1TB', price: 499, brand: 'Sony' }
  ];

  const paymentMethods: Array<'card' | 'cash' | 'mobile' | 'crypto' | 'check' | 'gift_card'> = 
    ['card', 'cash', 'mobile', 'crypto', 'check', 'gift_card'];
  
  const paymentStatuses: Array<'completed' | 'pending' | 'failed' | 'refunded' | 'cancelled'> = 
    ['completed', 'pending', 'failed', 'refunded', 'cancelled'];

  const transactions: Transaction[] = [];

  // Generate comprehensive transaction data
  for (let i = 0; i < 200; i++) {
    const store = stores[Math.floor(Math.random() * stores.length)];
    const employee = employees.filter(emp => emp.store === store.id)[Math.floor(Math.random() * employees.filter(emp => emp.store === store.id).length)];
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
    const paymentStatus = paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];
    
    const daysAgo = Math.floor(Math.random() * 30);
    const hoursAgo = Math.floor(Math.random() * 24);
    const minutesAgo = Math.floor(Math.random() * 60);
    const transactionDate = new Date();
    transactionDate.setDate(transactionDate.getDate() - daysAgo);
    transactionDate.setHours(transactionDate.getHours() - hoursAgo);
    transactionDate.setMinutes(transactionDate.getMinutes() - minutesAgo);

    const itemCount = Math.floor(Math.random() * 5) + 1;
    const items: TransactionItem[] = [];
    let subtotal = 0;

    for (let j = 0; j < itemCount; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      const unitPrice = product.price + (Math.random() - 0.5) * 50;
      const totalPrice = unitPrice * quantity;
      subtotal += totalPrice;

      items.push({
        id: `TI${i}-${j}`,
        productId: product.id,
        productName: product.name,
        category: product.category,
        sku: product.sku,
        quantity,
        unitPrice,
        totalPrice,
        discount: Math.random() * 10,
        tax: totalPrice * 0.08,
        weight: Math.random() * 2,
        dimensions: {
          length: Math.random() * 20,
          width: Math.random() * 15,
          height: Math.random() * 10
        },
        attributes: {
          color: ['Black', 'White', 'Blue', 'Red'][Math.floor(Math.random() * 4)],
          size: ['S', 'M', 'L', 'XL'][Math.floor(Math.random() * 4)]
        }
      });
    }

    const tax = subtotal * 0.08;
    const discount = Math.random() * 20;
    const tip = Math.random() * 15;
    const total = subtotal + tax - discount + tip;

    transactions.push({
      id: `TXN-${String(Date.now() + i).slice(-6)}`,
      timestamp: transactionDate.toISOString(),
      storeId: store.id,
      storeName: store.name,
      customerId: customer.id,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      amount: total,
      currency: 'USD',
      paymentMethod,
      paymentStatus,
      items,
      employeeId: employee.id,
      employeeName: employee.name,
      terminalId: `TERM-${store.id}-${Math.floor(Math.random() * 5) + 1}`,
      receiptNumber: `RCP-${String(Date.now() + i).slice(-8)}`,
      tax,
      discount,
      tip,
      total,
      location: {
        address: store.address,
        city: store.city,
        state: 'TX',
        zipCode: store.zipCode,
        country: 'USA'
      },
      metadata: {
        ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        deviceType: ['mobile', 'tablet', 'desktop', 'pos'][Math.floor(Math.random() * 4)] as 'mobile' | 'tablet' | 'desktop' | 'pos',
        browser: 'Chrome',
        os: 'Windows 10',
        referrer: 'https://google.com',
        campaign: 'Summer Sale',
        source: 'google',
        medium: 'cpc'
      },
      riskScore: Math.random() * 100,
      fraudFlags: Math.random() > 0.8 ? ['High Risk', 'Unusual Pattern'] : [],
      tags: [['VIP', 'Returning Customer', 'High Value'][Math.floor(Math.random() * 3)]],
      notes: Math.random() > 0.7 ? 'Special handling required' : '',
      attachments: [],
      relatedTransactions: [],
      refunds: [],
      status: 'active',
      createdAt: transactionDate.toISOString(),
      updatedAt: transactionDate.toISOString()
    });
  }

  return transactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const TransactionsView = ({ onViewChange }: TransactionsViewProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStore, setFilterStore] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMethod, setFilterMethod] = useState("all");
  const [filterDateRange, setFilterDateRange] = useState("today");
  const [sortBy, setSortBy] = useState("timestamp");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Initialize with mock data
  useEffect(() => {
    const mockData = generateMockTransactions();
    setTransactions(mockData);
    setFilteredTransactions(mockData);
  }, []);

  // Real-time updates simulation
  useEffect(() => {
    if (!realTimeUpdates) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of new transaction every 5 seconds
        const newTransaction = generateMockTransactions()[0];
        newTransaction.timestamp = new Date().toISOString();
        newTransaction.id = `TXN-${String(Date.now()).slice(-6)}`;
        
        setTransactions(prev => [newTransaction, ...prev]);
        setFilteredTransactions(prev => [newTransaction, ...prev]);
        
        toast({
          title: "New Transaction",
          description: `$${newTransaction.total.toFixed(2)} at ${newTransaction.storeName}`,
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [realTimeUpdates]);

  // Filter and search transactions
  useEffect(() => {
    let filtered = transactions;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(txn => 
        txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Store filter
    if (filterStore !== "all") {
      filtered = filtered.filter(txn => txn.storeId === filterStore);
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(txn => txn.paymentStatus === filterStatus);
    }

    // Method filter
    if (filterMethod !== "all") {
      filtered = filtered.filter(txn => txn.paymentMethod === filterMethod);
    }

    // Date range filter
    const now = new Date();
    if (filterDateRange === "today") {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      filtered = filtered.filter(txn => new Date(txn.timestamp) >= today);
    } else if (filterDateRange === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(txn => new Date(txn.timestamp) >= weekAgo);
    } else if (filterDateRange === "month") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(txn => new Date(txn.timestamp) >= monthAgo);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "timestamp":
          aValue = new Date(a.timestamp).getTime();
          bValue = new Date(b.timestamp).getTime();
          break;
        case "amount":
          aValue = a.total;
          bValue = b.total;
          break;
        case "customer":
          aValue = a.customerName;
          bValue = b.customerName;
          break;
        case "store":
          aValue = a.storeName;
          bValue = b.storeName;
          break;
        default:
          aValue = new Date(a.timestamp).getTime();
          bValue = new Date(b.timestamp).getTime();
      }
      
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, filterStore, filterStatus, filterMethod, filterDateRange, sortBy, sortOrder]);

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'card': return <CreditCard className="w-4 h-4" />;
      case 'cash': return <Banknote className="w-4 h-4" />;
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'crypto': return <Coins className="w-4 h-4" />;
      case 'check': return <Receipt className="w-4 h-4" />;
      case 'gift_card': return <Gift className="w-4 h-4" />;
      default: return <CreditCard className="w-4 h-4" />;
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'tablet': return <Monitor className="w-4 h-4" />;
      case 'desktop': return <Monitor className="w-4 h-4" />;
      case 'pos': return <CreditCard className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  // Calculate summary statistics
  const totalRevenue = filteredTransactions.reduce((sum, txn) => sum + txn.total, 0);
  const totalTransactions = filteredTransactions.length;
  const avgTransactionValue = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;
  const completedTransactions = filteredTransactions.filter(txn => txn.paymentStatus === 'completed').length;
  const completionRate = totalTransactions > 0 ? (completedTransactions / totalTransactions) * 100 : 0;

  // Group transactions by store
  const transactionsByStore = filteredTransactions.reduce((acc, txn) => {
    if (!acc[txn.storeId]) {
      acc[txn.storeId] = {
        storeName: txn.storeName,
        transactions: [],
        totalRevenue: 0,
        transactionCount: 0
      };
    }
    acc[txn.storeId].transactions.push(txn);
    acc[txn.storeId].totalRevenue += txn.total;
    acc[txn.storeId].transactionCount += 1;
    return acc;
  }, {} as Record<string, { storeName: string; transactions: Transaction[]; totalRevenue: number; transactionCount: number }>);

  return (
    <div className="p-6 space-y-6 backdrop-blur-glass" style={{background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))"}}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-shadow-lg">🚀 MASTERFUL TRANSACTION MONITOR 🚀</h1>
          <p className="text-muted-foreground mt-2">
            Real-time transaction monitoring and analysis across all stores
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRealTimeUpdates(!realTimeUpdates)}
            className={cn("btn-glass", realTimeUpdates && "animate-glow")}
          >
            <Activity className="w-4 h-4 mr-2" />
            {realTimeUpdates ? 'Live' : 'Paused'}
          </Button>
          <Button variant="outline" size="sm" className="btn-glass">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-float">
        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              {totalTransactions} transactions
            </p>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Transaction</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(avgTransactionValue)}</div>
            <p className="text-xs text-muted-foreground">
              Per transaction
            </p>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {completedTransactions} completed
            </p>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Stores</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(transactionsByStore).length}</div>
            <p className="text-xs text-muted-foreground">
              Processing transactions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="card-premium">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search transactions, customers, stores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 input-glass"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterStore}
                onChange={(e) => setFilterStore(e.target.value)}
                className="px-3 py-2 border border-white/20 rounded-md bg-white/10 backdrop-blur-xl text-sm"
              >
                <option value="all">All Stores</option>
                {Object.values(transactionsByStore).map((store, index) => (
                  <option key={index} value={store.storeName}>{store.storeName}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-white/20 rounded-md bg-white/10 backdrop-blur-xl text-sm"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={filterDateRange}
                onChange={(e) => setFilterDateRange(e.target.value)}
                className="px-3 py-2 border border-white/20 rounded-md bg-white/10 backdrop-blur-xl text-sm"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions by Store */}
      <div className="space-y-6">
        {Object.entries(transactionsByStore).map(([storeId, storeData]) => (
          <Card key={storeId} className="card-premium">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Building2 className="w-6 h-6 text-primary" />
                  <div>
                    <CardTitle className="text-xl">{storeData.storeName}</CardTitle>
                    <CardDescription>
                      {storeData.transactionCount} transactions • {formatCurrency(storeData.totalRevenue)} revenue
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="badge-glass">
                  {storeData.transactionCount} transactions
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {storeData.transactions.slice(0, 5).map((transaction) => (
                  <div
                    key={transaction.id}
                    onClick={() => handleTransactionClick(transaction)}
                    className="flex items-center justify-between p-4 border border-white/20 rounded-lg bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getMethodIcon(transaction.paymentMethod)}
                        <span className="text-sm font-medium">{transaction.id}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{transaction.customerName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{transaction.employeeName}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(transaction.total)}</div>
                        <div className="text-sm text-muted-foreground">{formatDate(transaction.timestamp)}</div>
                      </div>
                      <Badge className={getStatusColor(transaction.paymentStatus)}>
                        {transaction.paymentStatus}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {storeData.transactions.length > 5 && (
                  <div className="text-center pt-2">
                    <Button variant="outline" size="sm" className="btn-glass">
                      View All {storeData.transactionCount} Transactions
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
          <DialogContent className="dialog-glass max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Receipt className="w-5 h-5" />
                <span>Transaction Details - {selectedTransaction.id}</span>
              </DialogTitle>
              <DialogDescription>
                Complete transaction information and line items
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {/* Transaction Overview */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Customer Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{selectedTransaction.customerName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{selectedTransaction.customerEmail}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{selectedTransaction.customerPhone}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Store & Employee</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Store className="w-4 h-4" />
                        <span>{selectedTransaction.storeName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{selectedTransaction.employeeName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedTransaction.location.address}, {selectedTransaction.location.city}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Payment Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        {getMethodIcon(selectedTransaction.paymentMethod)}
                        <span className="capitalize">{selectedTransaction.paymentMethod}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(selectedTransaction.paymentStatus)}>
                          {selectedTransaction.paymentStatus}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Receipt className="w-4 h-4" />
                        <span>{selectedTransaction.receiptNumber}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Transaction Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>{formatCurrency(selectedTransaction.total - selectedTransaction.tax + selectedTransaction.discount - selectedTransaction.tip)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax:</span>
                        <span>{formatCurrency(selectedTransaction.tax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Discount:</span>
                        <span>-{formatCurrency(selectedTransaction.discount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tip:</span>
                        <span>{formatCurrency(selectedTransaction.tip)}</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Total:</span>
                        <span>{formatCurrency(selectedTransaction.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Line Items */}
              <div>
                <h4 className="font-semibold mb-4">Line Items</h4>
                <div className="space-y-2">
                  {selectedTransaction.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border border-white/20 rounded-lg bg-white/5">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="font-medium">{item.productName}</div>
                          <div className="text-sm text-muted-foreground">{item.sku}</div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.quantity} × {formatCurrency(item.unitPrice)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(item.totalPrice)}</div>
                        <div className="text-sm text-muted-foreground">
                          Tax: {formatCurrency(item.tax)} | Discount: {formatCurrency(item.discount)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
