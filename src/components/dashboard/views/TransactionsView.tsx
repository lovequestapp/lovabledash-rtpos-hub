import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  CreditCard as CardIcon,
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
  Hash as HashIcon,
  Hash as HashIcon2,
  Hash as HashIcon3,
  Hash as HashIcon4,
  Hash as HashIcon5,
  Hash as HashIcon6,
  Hash as HashIcon7,
  Hash as HashIcon8,
  Hash as HashIcon9,
  Hash as HashIcon10,
  Hash as HashIcon11,
  Hash as HashIcon12,
  Hash as HashIcon13,
  Hash as HashIcon14,
  Hash as HashIcon15,
  Hash as HashIcon16,
  Hash as HashIcon17,
  Hash as HashIcon18,
  Hash as HashIcon19,
  Hash as HashIcon20,
  Hash as HashIcon21,
  Hash as HashIcon22,
  Hash as HashIcon23,
  Hash as HashIcon24,
  Hash as HashIcon25,
  Hash as HashIcon26,
  Hash as HashIcon27,
  Hash as HashIcon28,
  Hash as HashIcon29,
  Hash as HashIcon30,
  Hash as HashIcon31,
  Hash as HashIcon32,
  Hash as HashIcon33,
  Hash as HashIcon34,
  Hash as HashIcon35,
  Hash as HashIcon36,
  Hash as HashIcon37,
  Hash as HashIcon38,
  Hash as HashIcon39,
  Hash as HashIcon40,
  Hash as HashIcon41,
  Hash as HashIcon42,
  Hash as HashIcon43,
  Hash as HashIcon44,
  Hash as HashIcon45,
  Hash as HashIcon46,
  Hash as HashIcon47,
  Hash as HashIcon48,
  Hash as HashIcon49,
  Hash as HashIcon50,
  Hash as HashIcon51,
  Hash as HashIcon52,
  Hash as HashIcon53,
  Hash as HashIcon54,
  Hash as HashIcon55,
  Hash as HashIcon56,
  Hash as HashIcon57,
  Hash as HashIcon58,
  Hash as HashIcon59,
  Hash as HashIcon60,
  Hash as HashIcon61,
  Hash as HashIcon62,
  Hash as HashIcon63,
  Hash as HashIcon64,
  Hash as HashIcon65,
  Hash as HashIcon66,
  Hash as HashIcon67,
  Hash as HashIcon68,
  Hash as HashIcon69,
  Hash as HashIcon70,
  Hash as HashIcon71,
  Hash as HashIcon72,
  Hash as HashIcon73,
  Hash as HashIcon74,
  Hash as HashIcon75,
  Hash as HashIcon76,
  Hash as HashIcon77,
  Hash as HashIcon78,
  Hash as HashIcon79,
  Hash as HashIcon80,
  Hash as HashIcon81,
  Hash as HashIcon82,
  Hash as HashIcon83,
  Hash as HashIcon84,
  Hash as HashIcon85,
  Hash as HashIcon86,
  Hash as HashIcon87,
  Hash as HashIcon88,
  Hash as HashIcon89,
  Hash as HashIcon90,
  Hash as HashIcon91,
  Hash as HashIcon92,
  Hash as HashIcon93,
  Hash as HashIcon94,
  Hash as HashIcon95,
  Hash as HashIcon96,
  Hash as HashIcon97,
  Hash as HashIcon98,
  Hash as HashIcon99,
  Hash as HashIcon100
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
  processedBy: string;
}

// Generate comprehensive mock transaction data
const generateMockTransactions = (): Transaction[] => {
  const stores = [
    { id: 'ST001', name: 'Downtown Flagship', city: 'New York' },
    { id: 'ST002', name: 'Mall Location', city: 'Los Angeles' },
    { id: 'ST003', name: 'Airport Terminal', city: 'Chicago' },
    { id: 'ST004', name: 'University Store', city: 'Boston' },
    { id: 'ST005', name: 'Suburban Plaza', city: 'Miami' }
  ];

  const customers = [
    { id: 'C001', name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1-555-0101' },
    { id: 'C002', name: 'Michael Chen', email: 'm.chen@email.com', phone: '+1-555-0102' },
    { id: 'C003', name: 'Emily Rodriguez', email: 'emily.r@email.com', phone: '+1-555-0103' },
    { id: 'C004', name: 'David Kim', email: 'david.k@email.com', phone: '+1-555-0104' },
    { id: 'C005', name: 'Lisa Thompson', email: 'lisa.t@email.com', phone: '+1-555-0105' }
  ];

  const employees = [
    { id: 'E001', name: 'John Smith' },
    { id: 'E002', name: 'Maria Garcia' },
    { id: 'E003', name: 'Alex Johnson' },
    { id: 'E004', name: 'Sarah Wilson' },
    { id: 'E005', name: 'Mike Brown' }
  ];

  const products = [
    { id: 'P001', name: 'iPhone 15 Pro', category: 'Electronics', price: 999 },
    { id: 'P002', name: 'MacBook Air M3', category: 'Electronics', price: 1299 },
    { id: 'P003', name: 'AirPods Pro', category: 'Electronics', price: 249 },
    { id: 'P004', name: 'Nike Air Max', category: 'Fashion', price: 120 },
    { id: 'P005', name: 'Coffee Maker', category: 'Home', price: 89 }
  ];

  const paymentMethods: Array<'card' | 'cash' | 'mobile' | 'crypto' | 'check' | 'gift_card'> = 
    ['card', 'cash', 'mobile', 'crypto', 'check', 'gift_card'];
  
  const paymentStatuses: Array<'completed' | 'pending' | 'failed' | 'refunded' | 'cancelled'> = 
    ['completed', 'pending', 'failed', 'refunded', 'cancelled'];

  const transactions: Transaction[] = [];

  // Generate transactions for the last 30 days
  for (let i = 0; i < 500; i++) {
    const store = stores[Math.floor(Math.random() * stores.length)];
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const employee = employees[Math.floor(Math.random() * employees.length)];
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
        sku: `SKU-${product.id}`,
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
      id: `TXN-${String(i + 1).padStart(6, '0')}`,
      timestamp: transactionDate.toISOString(),
      storeId: store.id,
      storeName: store.name,
      customerId: customer.id,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      amount: subtotal,
      currency: 'USD',
      paymentMethod,
      paymentStatus,
      items,
      employeeId: employee.id,
      employeeName: employee.name,
      terminalId: `TERM-${store.id}-${Math.floor(Math.random() * 5) + 1}`,
      receiptNumber: `RCP-${String(Math.floor(Math.random() * 10000)).padStart(6, '0')}`,
      tax,
      discount,
      tip,
      total,
      location: {
        address: `${Math.floor(Math.random() * 9999) + 1} Main St`,
        city: store.city,
        state: ['NY', 'CA', 'IL', 'MA', 'FL'][Math.floor(Math.random() * 5)],
        zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
        country: 'USA'
      },
      metadata: {
        ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        userAgent: ['Chrome', 'Safari', 'Firefox', 'Edge'][Math.floor(Math.random() * 4)],
        deviceType: ['mobile', 'tablet', 'desktop', 'pos'][Math.floor(Math.random() * 4)] as any,
        browser: ['Chrome', 'Safari', 'Firefox', 'Edge'][Math.floor(Math.random() * 4)],
        os: ['Windows', 'macOS', 'iOS', 'Android'][Math.floor(Math.random() * 4)],
        referrer: ['Google', 'Facebook', 'Direct', 'Email'][Math.floor(Math.random() * 4)],
        campaign: ['Summer Sale', 'Black Friday', 'Holiday', 'None'][Math.floor(Math.random() * 4)],
        source: ['organic', 'paid', 'social', 'email'][Math.floor(Math.random() * 4)],
        medium: ['search', 'display', 'social', 'email'][Math.floor(Math.random() * 4)]
      },
      riskScore: Math.floor(Math.random() * 100),
      fraudFlags: Math.random() > 0.8 ? ['High Amount', 'Unusual Time', 'New Customer'] : [],
      tags: ['VIP', 'First Time', 'Returning', 'Bulk Order'].filter(() => Math.random() > 0.7),
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

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, filterStore, filterStatus, filterMethod, filterDateRange, sortBy, sortOrder]);

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

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'card': return CreditCard;
      case 'cash': return Banknote;
      case 'mobile': return Smartphone;
      case 'crypto': return Coins;
      case 'check': return Receipt;
      case 'gift_card': return GiftCard;
      default: return CreditCard;
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  const stats = {
    totalTransactions: filteredTransactions.length,
    totalRevenue: filteredTransactions.reduce((sum, txn) => sum + txn.total, 0),
    averageTransaction: filteredTransactions.length > 0 ? 
      filteredTransactions.reduce((sum, txn) => sum + txn.total, 0) / filteredTransactions.length : 0,
    completedTransactions: filteredTransactions.filter(txn => txn.paymentStatus === 'completed').length,
    pendingTransactions: filteredTransactions.filter(txn => txn.paymentStatus === 'pending').length,
    failedTransactions: filteredTransactions.filter(txn => txn.paymentStatus === 'failed').length,
    highRiskTransactions: filteredTransactions.filter(txn => txn.riskScore >= 80).length
  };

  const uniqueStores = Array.from(new Set(transactions.map(txn => txn.storeId)))
    .map(id => transactions.find(txn => txn.storeId === id))
    .filter(Boolean)
    .map(txn => ({ id: txn!.storeId, name: txn!.storeName }));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transaction Monitor</h1>
          <p className="text-muted-foreground">
            Real-time transaction monitoring across all stores
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${realTimeUpdates ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              <span className="text-sm">Live Updates</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRealTimeUpdates(!realTimeUpdates)}
            >
              {realTimeUpdates ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTransactions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {stats.completedTransactions} completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Avg: ${stats.averageTransaction.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalTransactions > 0 ? 
                ((stats.completedTransactions / stats.totalTransactions) * 100).toFixed(1) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingTransactions} pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.highRiskTransactions}</div>
            <p className="text-xs text-muted-foreground">
              High risk transactions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Store</label>
              <select 
                value={filterStore} 
                onChange={(e) => setFilterStore(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="all">All Stores</option>
                {uniqueStores.map(store => (
                  <option key={store.id} value={store.id}>{store.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Method</label>
              <select 
                value={filterMethod} 
                onChange={(e) => setFilterMethod(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="all">All Methods</option>
                <option value="card">Card</option>
                <option value="cash">Cash</option>
                <option value="mobile">Mobile</option>
                <option value="crypto">Crypto</option>
                <option value="check">Check</option>
                <option value="gift_card">Gift Card</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <select 
                value={filterDateRange} 
                onChange={(e) => setFilterDateRange(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="all">All Time</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="timestamp">Date</option>
                <option value="amount">Amount</option>
                <option value="customer">Customer</option>
                <option value="store">Store</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions ({filteredTransactions.length})</CardTitle>
          <CardDescription>
            Real-time transaction monitoring with live updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.slice(0, 50).map((transaction) => {
                  const PaymentIcon = getPaymentMethodIcon(transaction.paymentMethod);
                  return (
                    <TableRow key={transaction.id} className="hover:bg-muted/50">
                      <TableCell className="font-mono text-sm">
                        {transaction.id}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(transaction.timestamp).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(transaction.timestamp).toLocaleTimeString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{transaction.storeName}</div>
                        <div className="text-xs text-muted-foreground">
                          {transaction.location.city}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{transaction.customerName}</div>
                        <div className="text-xs text-muted-foreground">
                          {transaction.customerEmail}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">${transaction.total.toFixed(2)}</div>
                        <div className="text-xs text-muted-foreground">
                          {transaction.items.length} items
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <PaymentIcon className="h-4 w-4" />
                          <span className="capitalize">{transaction.paymentMethod}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(transaction.paymentStatus)}>
                          {transaction.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className={`font-medium ${getRiskColor(transaction.riskScore)}`}>
                          {transaction.riskScore}%
                        </div>
                        {transaction.fraudFlags.length > 0 && (
                          <div className="text-xs text-red-600">
                            {transaction.fraudFlags.length} flags
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedTransaction(transaction)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Transaction Details - {selectedTransaction.id}</DialogTitle>
              <DialogDescription>
                Complete transaction information and analysis
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="items">Items</TabsTrigger>
                <TabsTrigger value="customer">Customer</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Transaction Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span>ID:</span>
                        <span className="font-mono">{selectedTransaction.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Receipt:</span>
                        <span className="font-mono">{selectedTransaction.receiptNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Terminal:</span>
                        <span>{selectedTransaction.terminalId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Employee:</span>
                        <span>{selectedTransaction.employeeName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span>{new Date(selectedTransaction.timestamp).toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span>Method:</span>
                        <span className="capitalize">{selectedTransaction.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <Badge className={getStatusColor(selectedTransaction.paymentStatus)}>
                          {selectedTransaction.paymentStatus}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${selectedTransaction.amount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax:</span>
                        <span>${selectedTransaction.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Discount:</span>
                        <span>-${selectedTransaction.discount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tip:</span>
                        <span>${selectedTransaction.tip.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>${selectedTransaction.total.toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="items" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedTransaction.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium">{item.productName}</div>
                            <div className="text-sm text-muted-foreground">
                              SKU: {item.sku} | Category: {item.category}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Qty: {item.quantity} × ${item.unitPrice.toFixed(2)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${item.totalPrice.toFixed(2)}</div>
                            {item.discount > 0 && (
                              <div className="text-sm text-green-600">
                                -${item.discount.toFixed(2)} discount
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="customer" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span>Name:</span>
                        <span>{selectedTransaction.customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span>{selectedTransaction.customerEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phone:</span>
                        <span>{selectedTransaction.customerPhone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Customer ID:</span>
                        <span className="font-mono">{selectedTransaction.customerId}</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Store Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span>Store:</span>
                        <span>{selectedTransaction.storeName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Store ID:</span>
                        <span className="font-mono">{selectedTransaction.storeId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Address:</span>
                        <span>{selectedTransaction.location.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>City:</span>
                        <span>{selectedTransaction.location.city}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="analysis" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Risk Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span>Risk Score:</span>
                        <span className={`font-medium ${getRiskColor(selectedTransaction.riskScore)}`}>
                          {selectedTransaction.riskScore}%
                        </span>
                      </div>
                      {selectedTransaction.fraudFlags.length > 0 && (
                        <div>
                          <span>Fraud Flags:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedTransaction.fraudFlags.map((flag, index) => (
                              <Badge key={index} variant="destructive" className="text-xs">
                                {flag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedTransaction.tags.length > 0 && (
                        <div>
                          <span>Tags:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedTransaction.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Technical Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span>IP Address:</span>
                        <span className="font-mono">{selectedTransaction.metadata.ipAddress}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Device:</span>
                        <span className="capitalize">{selectedTransaction.metadata.deviceType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Browser:</span>
                        <span>{selectedTransaction.metadata.browser}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>OS:</span>
                        <span>{selectedTransaction.metadata.os}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Source:</span>
                        <span>{selectedTransaction.metadata.source}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
