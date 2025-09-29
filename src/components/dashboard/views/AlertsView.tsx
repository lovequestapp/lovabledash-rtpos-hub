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
  Trash2
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
    type: "revenue",
    title: "Revenue Anomaly Detected",
    message: "Daily revenue 35% below baseline at Suburban Plaza",
    severity: "medium",
    store: "Suburban Plaza",
    storeCode: "SP004",
    createdAt: "2024-01-15 09:15 AM",
    status: "read",
    acknowledged: true,
    details: {
      currentRevenue: 1250,
      baselineRevenue: 1920,
      deviation: -35
    }
  },
  {
    id: "3",
    type: "inventory",
    title: "Out of Stock",
    message: "USB-C 20W Fast Charger is out of stock at Suburban Plaza",
    severity: "critical",
    store: "Suburban Plaza",
    storeCode: "SP004", 
    createdAt: "2024-01-15 08:45 AM",
    status: "read",
    acknowledged: false,
    details: {
      item: "USB-C 20W Fast Charger",
      currentStock: 0,
      sku: "CHRG-USBC-20W"
    }
  },
  {
    id: "4",
    type: "system",
    title: "Sync Failure",
    message: "Failed to sync data from RT-POS system",
    severity: "medium",
    store: "All Stores",
    storeCode: "ALL",
    createdAt: "2024-01-15 07:20 AM",
    status: "read",
    acknowledged: true,
    details: {
      error: "Connection timeout",
      lastSuccessfulSync: "2024-01-14 11:30 PM"
    }
  },
  {
    id: "5",
    type: "employee",
    title: "Performance Alert",
    message: "Employee sales below target at Downtown Location",
    severity: "low",
    store: "Downtown Location",
    storeCode: "DT001",
    createdAt: "2024-01-14 06:30 PM",
    status: "read",
    acknowledged: true,
    details: {
      employee: "Emily Davis",
      currentSales: 850,
      target: 1200,
      deficit: -29
    }
  }
];

const alertRules = [
  {
    id: "1",
    name: "Low Stock Alert",
    type: "inventory",
    description: "Trigger when inventory falls below reorder level",
    isActive: true,
    stores: ["all"],
    threshold: "reorder_level",
    notifications: ["email", "dashboard"]
  },
  {
    id: "2", 
    name: "Revenue Anomaly",
    type: "revenue",
    description: "Detect unusual revenue patterns",
    isActive: true,
    stores: ["all"],
    threshold: "30%",
    notifications: ["email", "sms", "dashboard"]
  },
  {
    id: "3",
    name: "System Sync Failure",
    type: "system",
    description: "Alert when data sync fails",
    isActive: true,
    stores: ["all"],
    threshold: "immediate",
    notifications: ["email", "dashboard"]
  },
  {
    id: "4",
    name: "High Value Transaction", 
    type: "transaction",
    description: "Flag transactions above threshold",
    isActive: false,
    stores: ["all"],
    threshold: "$5000",
    notifications: ["email"]
  }
];

export const AlertsView = () => {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [rules, setRules] = useState(alertRules);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isRuleDialogOpen, setIsRuleDialogOpen] = useState(false);

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.store.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === "all" || alert.severity === filterSeverity;
    const matchesStatus = filterStatus === "all" || alert.status === filterStatus;
    
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, acknowledged: true, status: "read" }
        : alert
    ));
    toast({
      title: "Alert Acknowledged",
      description: "Alert has been marked as acknowledged.",
    });
  };

  const handleCreateRule = () => {
    toast({
      title: "Alert Rule Created",
      description: "New alert rule has been created successfully.",
    });
    setIsRuleDialogOpen(false);
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "high":
        return <Badge variant="destructive" className="bg-red-600">High</Badge>;
      case "medium":
        return <Badge variant="secondary" className="bg-yellow-500">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "inventory":
        return <Package className="w-4 h-4" />;
      case "revenue":
        return <DollarSign className="w-4 h-4" />;
      case "system":
        return <Settings className="w-4 h-4" />;
      case "employee":
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const unreadCount = alerts.filter(alert => alert.status === "unread").length;
  const criticalCount = alerts.filter(alert => alert.severity === "critical").length;
  const acknowledgedCount = alerts.filter(alert => alert.acknowledged).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alert Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage system alerts and notifications
          </p>
        </div>
        
        <Dialog open={isRuleDialogOpen} onOpenChange={setIsRuleDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Rule
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Alert Rule</DialogTitle>
              <DialogDescription>
                Set up a new alert rule to monitor your operations.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="ruleName">Rule Name</Label>
                <Input id="ruleName" placeholder="Enter rule name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ruleType">Alert Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inventory">Inventory</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe when this alert should trigger" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="threshold">Threshold</Label>
                <Input id="threshold" placeholder="e.g., 30%, $1000, 5 units" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsRuleDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateRule}>Create Rule</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alerts.length}</div>
            <p className="text-xs text-muted-foreground">
              Active notifications
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{unreadCount}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
            <p className="text-xs text-muted-foreground">
              Urgent action required
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acknowledged</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{acknowledgedCount}</div>
            <p className="text-xs text-muted-foreground">
              Being handled
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alert Management Tabs */}
      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
          <TabsTrigger value="rules">Alert Rules</TabsTrigger>
          <TabsTrigger value="settings">Notification Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert Dashboard</CardTitle>
              <CardDescription>
                Monitor and respond to system alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search alerts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="unread">Unread</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Alerts List */}
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`border rounded-lg p-4 ${alert.status === 'unread' ? 'bg-blue-50 border-blue-200' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {getTypeIcon(alert.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{alert.title}</h3>
                            {getSeverityBadge(alert.severity)}
                            {alert.status === 'unread' && (
                              <Badge variant="default" className="bg-blue-500">New</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {alert.createdAt}
                            </div>
                            <div>Store: {alert.store}</div>
                            {alert.acknowledged && (
                              <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="w-3 h-3" />
                                Acknowledged
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!alert.acknowledged && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleAcknowledgeAlert(alert.id)}
                          >
                            Acknowledge
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Alert Details */}
                    {alert.details && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="text-sm space-y-1">
                          {Object.entries(alert.details).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-muted-foreground capitalize">
                                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                              </span>
                              <span className="font-medium">{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert Rules</CardTitle>
              <CardDescription>
                Configure when and how alerts are triggered
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rule Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Threshold</TableHead>
                    <TableHead>Notifications</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[70px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">{rule.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(rule.type)}
                          <span className="capitalize">{rule.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{rule.description}</TableCell>
                      <TableCell>{rule.threshold}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {rule.notifications.map((notif) => (
                            <Badge key={notif} variant="outline" className="text-xs">
                              {notif}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Switch checked={rule.isActive} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you receive alert notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Dashboard Notifications</h4>
                    <p className="text-sm text-muted-foreground">Show alerts in dashboard</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Slack Integration</h4>
                    <p className="text-sm text-muted-foreground">Send alerts to Slack channel</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">Contact Information</h4>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="admin@sswireless.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="(214) 555-0123" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="slack">Slack Webhook URL</Label>
                    <Input id="slack" placeholder="https://hooks.slack.com/..." />
                  </div>
                </div>
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};