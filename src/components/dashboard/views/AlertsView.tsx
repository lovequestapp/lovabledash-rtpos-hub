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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Bell, 
  Mail, 
  MessageSquare,
  DollarSign,
  Package,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  Settings,
  Edit,
  Trash2,
  Shield,
  Brain,
  Eye,
  Zap
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { AnomalyDetectorView } from "./AnomalyDetectorView";

interface AlertsViewProps {
  onViewChange?: (view: string) => void;
}

const mockAlerts = [
  {
    id: "1",
    type: "inventory",
    title: "Low Stock Alert",
    message: "iPhone 15 128GB Black is running low at Mall Kiosk",
    severity: "high",
    store: "Mall Kiosk",
    storeCode: "MK002",
    createdAt: "2024-01-15 10:30 AM",
    status: "unread",
    acknowledged: false,
    details: {
      item: "iPhone 15 128GB Black",
      currentStock: 3,
      reorderLevel: 8,
      sku: "IP15-128-BLK"
    }
  },
  {
    id: "2",
    type: "employee",
    title: "Time Clock Anomaly",
    message: "Unusual clock-in pattern detected for John Smith",
    severity: "medium",
    store: "Downtown Store",
    storeCode: "DT001",
    createdAt: "2024-01-15 09:15 AM",
    status: "read",
    acknowledged: true,
    details: {
      employee: "John Smith",
      pattern: "Exact timing patterns detected",
      riskScore: 72
    }
  },
  {
    id: "3",
    type: "fraud",
    title: "Suspicious Transaction",
    message: "Multiple high-value transactions detected from same customer",
    severity: "critical",
    store: "Downtown Store",
    storeCode: "DT001",
    createdAt: "2024-01-15 14:30 PM",
    status: "unread",
    acknowledged: false,
    details: {
      customer: "Customer #12345",
      amount: 12500,
      transactions: 3,
      timeframe: "2 hours"
    }
  },
  {
    id: "4",
    type: "system",
    title: "System Performance",
    message: "POS system response time exceeded threshold",
    severity: "low",
    store: "Mall Kiosk",
    storeCode: "MK002",
    createdAt: "2024-01-15 11:45 AM",
    status: "resolved",
    acknowledged: true,
    details: {
      system: "POS Terminal #3",
      responseTime: "4.2s",
      threshold: "3.0s"
    }
  }
];

export const AlertsView = ({ onViewChange }: AlertsViewProps) => {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newAlert, setNewAlert] = useState({
    type: "",
    title: "",
    message: "",
    severity: "medium",
    store: "",
    details: ""
  });

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || alert.type === filterType;
    const matchesSeverity = filterSeverity === "all" || alert.severity === filterSeverity;
    const matchesStatus = filterStatus === "all" || alert.status === filterStatus;
    
    return matchesSearch && matchesType && matchesSeverity && matchesStatus;
  });

  const stats = {
    total: alerts.length,
    unread: alerts.filter(a => a.status === 'unread').length,
    critical: alerts.filter(a => a.severity === 'critical').length,
    acknowledged: alerts.filter(a => a.acknowledged).length
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-gray-100 text-gray-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'inventory': return Package;
      case 'employee': return Bell;
      case 'fraud': return Shield;
      case 'system': return Settings;
      default: return AlertTriangle;
    }
  };

  const handleAcknowledge = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'read', acknowledged: true }
        : alert
    ));
    
    toast({
      title: "Alert Acknowledged",
      description: "Alert has been marked as acknowledged"
    });
  };

  const handleResolve = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'resolved', acknowledged: true }
        : alert
    ));
    
    toast({
      title: "Alert Resolved",
      description: "Alert has been marked as resolved"
    });
  };

  const handleCreateAlert = () => {
    if (!newAlert.title || !newAlert.message) {
      toast({
        title: "Error",
        description: "Title and message are required",
        variant: "destructive"
      });
      return;
    }

    const alert = {
      id: Date.now().toString(),
      ...newAlert,
      createdAt: new Date().toLocaleString(),
      status: "unread",
      acknowledged: false,
      details: { note: newAlert.details }
    };

    setAlerts([...alerts, alert]);
    setNewAlert({
      type: "",
      title: "",
      message: "",
      severity: "medium",
      store: "",
      details: ""
    });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Alert Created",
      description: "New alert has been created successfully"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Alerts & Monitoring</h2>
          <p className="text-muted-foreground">
            Comprehensive alert management and anomaly detection
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Alert
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Alert</DialogTitle>
                <DialogDescription>
                  Create a custom alert for monitoring
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Alert Type</Label>
                  <Select value={newAlert.type} onValueChange={(value) => setNewAlert({...newAlert, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select alert type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inventory">Inventory</SelectItem>
                      <SelectItem value="employee">Employee</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="fraud">Fraud</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newAlert.title}
                    onChange={(e) => setNewAlert({...newAlert, title: e.target.value})}
                    placeholder="Enter alert title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={newAlert.message}
                    onChange={(e) => setNewAlert({...newAlert, message: e.target.value})}
                    placeholder="Enter alert message"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="severity">Severity</Label>
                  <Select value={newAlert.severity} onValueChange={(value) => setNewAlert({...newAlert, severity: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store">Store</Label>
                  <Input
                    id="store"
                    value={newAlert.store}
                    onChange={(e) => setNewAlert({...newAlert, store: e.target.value})}
                    placeholder="Enter store name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="details">Additional Details</Label>
                  <Textarea
                    id="details"
                    value={newAlert.details}
                    onChange={(e) => setNewAlert({...newAlert, details: e.target.value})}
                    placeholder="Enter additional details"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateAlert}>
                  Create Alert
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats.unread} unread alerts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.critical}</div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acknowledged</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.acknowledged}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.acknowledged / stats.total) * 100).toFixed(0)}% response rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unread}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different alert types */}
      <Tabs defaultValue="alerts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="anomaly-detector">AI Anomaly Detector</TabsTrigger>
          <TabsTrigger value="monitoring">Real-time Monitoring</TabsTrigger>
        </TabsList>
        
        <TabsContent value="alerts" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Alert Management</CardTitle>
              <CardDescription>
                Monitor and manage all system alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search alerts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="inventory">Inventory</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="fraud">Fraud</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severity</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="unread">Unread</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Alerts List */}
          <div className="space-y-4">
            {filteredAlerts.map((alert) => {
              const TypeIcon = getTypeIcon(alert.type);
              return (
                <Card key={alert.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <TypeIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-semibold">{alert.title}</h3>
                            <Badge className={getSeverityColor(alert.severity)}>
                              {alert.severity}
                            </Badge>
                            <Badge className={getStatusColor(alert.status)}>
                              {alert.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">{alert.message}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Store:</span>
                              <div className="font-medium">{alert.store}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Created:</span>
                              <div className="font-medium">{alert.createdAt}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Type:</span>
                              <div className="font-medium">{alert.type}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Acknowledged:</span>
                              <div className="font-medium">
                                {alert.acknowledged ? (
                                  <span className="text-green-600">Yes</span>
                                ) : (
                                  <span className="text-red-600">No</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!alert.acknowledged && (
                          <Button
                            size="sm"
                            onClick={() => handleAcknowledge(alert.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Acknowledge
                          </Button>
                        )}
                        {alert.status !== 'resolved' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleResolve(alert.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Resolve
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="anomaly-detector">
          <AnomalyDetectorView onViewChange={onViewChange} />
        </TabsContent>
        
        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Monitoring Dashboard</CardTitle>
              <CardDescription>
                Live monitoring of all system activities and potential issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">System Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>POS Systems</span>
                        <Badge className="bg-green-100 text-green-800">Online</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Database</span>
                        <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>API Services</span>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Transaction Monitoring</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Active Transactions</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg Response Time</span>
                        <span className="font-medium">1.2s</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Success Rate</span>
                        <span className="font-medium">99.8%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Security Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Threat Level</span>
                        <Badge className="bg-green-100 text-green-800">Low</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Active Sessions</span>
                        <span className="font-medium">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Scan</span>
                        <span className="font-medium">2 min ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
