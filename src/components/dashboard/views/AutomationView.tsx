import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Zap, 
  Bot, 
  Settings, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  Brain, 
  Activity, 
  BarChart3, 
  DollarSign, 
  Package, 
  Users, 
  Bell, 
  Shield, 
  RefreshCw, 
  Download, 
  Upload, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Calendar, 
  Timer, 
  ArrowRight, 
  ArrowLeft, 
  Star, 
  StarOff
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AutomationViewProps {
  onViewChange?: (view: string) => void;
}

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  category: 'inventory' | 'pricing' | 'staffing' | 'marketing' | 'security' | 'analytics';
  trigger: string;
  action: string;
  conditions: string[];
  isActive: boolean;
  lastExecuted?: string;
  executionCount: number;
  successRate: number;
  estimatedSavings: number;
  priority: 'low' | 'medium' | 'high';
  createdBy: string;
  createdAt: string;
  nextExecution?: string;
  tags: string[];
}

interface AutomationExecution {
  id: string;
  ruleId: string;
  ruleName: string;
  status: 'success' | 'failed' | 'running';
  startedAt: string;
  completedAt?: string;
  duration?: number;
  result?: string;
  error?: string;
  impact: {
    value: number;
    description: string;
  };
}

const mockAutomationRules: AutomationRule[] = [
  {
    id: "1",
    name: "Smart Reorder System",
    description: "Automatically reorder products when stock falls below minimum threshold",
    category: "inventory",
    trigger: "Stock level < minimum threshold",
    action: "Create purchase order and notify supplier",
    conditions: ["Stock < min_stock", "Supplier available", "Budget approved"],
    isActive: true,
    lastExecuted: "2024-01-15T10:30:00Z",
    executionCount: 47,
    successRate: 94,
    estimatedSavings: 12500,
    priority: "high",
    createdBy: "System",
    createdAt: "2024-01-01T00:00:00Z",
    nextExecution: "2024-01-16T08:00:00Z",
    tags: ["inventory", "cost-savings", "automation"]
  },
  {
    id: "2",
    name: "Dynamic Pricing Engine",
    description: "Adjust prices based on demand, competition, and inventory levels",
    category: "pricing",
    trigger: "Market conditions change",
    action: "Update product prices across all channels",
    conditions: ["Competitor price change", "Demand spike", "Inventory low"],
    isActive: true,
    lastExecuted: "2024-01-15T14:20:00Z",
    executionCount: 23,
    successRate: 87,
    estimatedSavings: 8500,
    priority: "high",
    createdBy: "AI System",
    createdAt: "2024-01-05T00:00:00Z",
    nextExecution: "2024-01-15T16:00:00Z",
    tags: ["pricing", "revenue", "ai"]
  },
  {
    id: "3",
    name: "Staff Scheduling Optimizer",
    description: "Automatically optimize staff schedules based on predicted demand",
    category: "staffing",
    trigger: "Weekly schedule generation",
    action: "Generate optimal staff schedule",
    conditions: ["Demand forecast available", "Staff availability", "Labor budget"],
    isActive: true,
    lastExecuted: "2024-01-14T18:00:00Z",
    executionCount: 12,
    successRate: 92,
    estimatedSavings: 3200,
    priority: "medium",
    createdBy: "HR Manager",
    createdAt: "2024-01-10T00:00:00Z",
    nextExecution: "2024-01-21T18:00:00Z",
    tags: ["staffing", "efficiency", "optimization"]
  },
  {
    id: "4",
    name: "Fraud Detection System",
    description: "Monitor transactions for suspicious patterns and alert security team",
    category: "security",
    trigger: "Suspicious transaction detected",
    action: "Block transaction and alert security",
    conditions: ["Transaction amount > threshold", "Unusual pattern", "Risk score high"],
    isActive: true,
    lastExecuted: "2024-01-15T15:45:00Z",
    executionCount: 156,
    successRate: 98,
    estimatedSavings: 15000,
    priority: "high",
    createdBy: "Security Team",
    createdAt: "2024-01-01T00:00:00Z",
    tags: ["security", "fraud", "protection"]
  },
  {
    id: "5",
    name: "Customer Retention Campaign",
    description: "Automatically send personalized offers to at-risk customers",
    category: "marketing",
    trigger: "Customer churn risk detected",
    action: "Send personalized retention offer",
    conditions: ["Churn probability > 70%", "Customer tier > bronze", "No recent purchase"],
    isActive: true,
    lastExecuted: "2024-01-15T09:15:00Z",
    executionCount: 8,
    successRate: 75,
    estimatedSavings: 4500,
    priority: "medium",
    createdBy: "Marketing Team",
    createdAt: "2024-01-08T00:00:00Z",
    tags: ["marketing", "retention", "personalization"]
  }
];

const mockExecutions: AutomationExecution[] = [
  {
    id: "1",
    ruleId: "1",
    ruleName: "Smart Reorder System",
    status: "success",
    startedAt: "2024-01-15T10:30:00Z",
    completedAt: "2024-01-15T10:32:00Z",
    duration: 120,
    result: "Purchase order created for 50 units of iPhone 15 Pro Max",
    impact: {
      value: 2500,
      description: "Prevented stockout, maintained sales"
    }
  },
  {
    id: "2",
    ruleId: "2",
    ruleName: "Dynamic Pricing Engine",
    status: "success",
    startedAt: "2024-01-15T14:20:00Z",
    completedAt: "2024-01-15T14:22:00Z",
    duration: 120,
    result: "Updated prices for 12 products, increased margins by 8%",
    impact: {
      value: 850,
      description: "Increased revenue through optimized pricing"
    }
  },
  {
    id: "3",
    ruleId: "4",
    ruleName: "Fraud Detection System",
    status: "success",
    startedAt: "2024-01-15T15:45:00Z",
    completedAt: "2024-01-15T15:46:00Z",
    duration: 60,
    result: "Blocked suspicious transaction of $2,500",
    impact: {
      value: 2500,
      description: "Prevented fraudulent loss"
    }
  }
];

export const AutomationView = ({ onViewChange }: AutomationViewProps) => {
  const [rules, setRules] = useState<AutomationRule[]>(mockAutomationRules);
  const [executions, setExecutions] = useState<AutomationExecution[]>(mockExecutions);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedRule, setSelectedRule] = useState<AutomationRule | null>(null);

  const filteredRules = rules.filter(rule => {
    const matchesCategory = filterCategory === "all" || rule.category === filterCategory;
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "active" && rule.isActive) ||
                         (filterStatus === "inactive" && !rule.isActive);
    return matchesCategory && matchesStatus;
  });

  const stats = {
    totalRules: rules.length,
    activeRules: rules.filter(r => r.isActive).length,
    totalExecutions: executions.length,
    successRate: executions.length > 0 ? 
      (executions.filter(e => e.status === 'success').length / executions.length) * 100 : 0,
    totalSavings: rules.reduce((sum, r) => sum + r.estimatedSavings, 0),
    avgExecutionTime: executions.length > 0 ? 
      executions.reduce((sum, e) => sum + (e.duration || 0), 0) / executions.length : 0
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'inventory': return 'bg-blue-100 text-blue-800';
      case 'pricing': return 'bg-green-100 text-green-800';
      case 'staffing': return 'bg-purple-100 text-purple-800';
      case 'marketing': return 'bg-pink-100 text-pink-800';
      case 'security': return 'bg-red-100 text-red-800';
      case 'analytics': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'failed': return 'text-red-600';
      case 'running': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const toggleRule = (ruleId: string) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
    ));
    
    const rule = rules.find(r => r.id === ruleId);
    toast({
      title: rule?.isActive ? "Rule Deactivated" : "Rule Activated",
      description: `${rule?.name} has been ${rule?.isActive ? 'deactivated' : 'activated'}`
    });
  };

  const executeRule = (ruleId: string) => {
    toast({
      title: "Rule Executed",
      description: "Automation rule has been manually triggered"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Smart Automation Suite</h2>
          <p className="text-muted-foreground">
            Revolutionary AI-powered automation for zero-touch operations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Rules
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import Rules
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Rule
          </Button>
        </div>
      </div>

      {/* Automation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rules</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeRules}</div>
            <p className="text-xs text-muted-foreground">
              of {stats.totalRules} total rules
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.successRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalExecutions} executions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalSavings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Estimated monthly savings
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Execution</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgExecutionTime.toFixed(0)}s</div>
            <p className="text-xs text-muted-foreground">
              Average execution time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Automation Dashboard</CardTitle>
          <CardDescription>
            Manage and monitor your automation rules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Categories</option>
              <option value="inventory">Inventory</option>
              <option value="pricing">Pricing</option>
              <option value="staffing">Staffing</option>
              <option value="marketing">Marketing</option>
              <option value="security">Security</option>
              <option value="analytics">Analytics</option>
            </select>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Automation Rules */}
      <div className="space-y-4">
        {filteredRules.map((rule) => (
          <Card key={rule.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold">{rule.name}</h3>
                      <Badge className={getCategoryColor(rule.category)}>
                        {rule.category}
                      </Badge>
                      <Badge className={getPriorityColor(rule.priority)}>
                        {rule.priority}
                      </Badge>
                      <Badge variant={rule.isActive ? "default" : "secondary"}>
                        {rule.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{rule.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Executions:</span>
                        <div className="font-medium">{rule.executionCount}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Success Rate:</span>
                        <div className="font-medium">{rule.successRate}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Savings:</span>
                        <div className="font-medium">${rule.estimatedSavings.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Run:</span>
                        <div className="font-medium">
                          {rule.lastExecuted ? new Date(rule.lastExecuted).toLocaleDateString() : 'Never'}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {rule.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={rule.isActive}
                    onCheckedChange={() => toggleRule(rule.id)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => executeRule(rule.id)}
                    disabled={!rule.isActive}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRule(rule)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Executions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Executions</CardTitle>
          <CardDescription>
            Latest automation rule executions and their results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {executions.map((execution) => (
              <div key={execution.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    execution.status === 'success' ? 'bg-green-100' :
                    execution.status === 'failed' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    {execution.status === 'success' ? <CheckCircle className="h-4 w-4 text-green-600" /> :
                     execution.status === 'failed' ? <XCircle className="h-4 w-4 text-red-600" /> :
                     <Clock className="h-4 w-4 text-blue-600" />}
                  </div>
                  <div>
                    <div className="font-medium">{execution.ruleName}</div>
                    <div className="text-sm text-muted-foreground">{execution.result}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${getStatusColor(execution.status)}`}>
                    {execution.status}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {execution.duration}s
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rule Detail Modal */}
      {selectedRule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{selectedRule.name}</CardTitle>
              <CardDescription>{selectedRule.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Badge className={getCategoryColor(selectedRule.category)}>
                    {selectedRule.category}
                  </Badge>
                </div>
                <div>
                  <Label>Priority</Label>
                  <Badge className={getPriorityColor(selectedRule.priority)}>
                    {selectedRule.priority}
                  </Badge>
                </div>
              </div>
              <div>
                <Label>Trigger</Label>
                <p className="text-sm text-muted-foreground mt-1">{selectedRule.trigger}</p>
              </div>
              <div>
                <Label>Action</Label>
                <p className="text-sm text-muted-foreground mt-1">{selectedRule.action}</p>
              </div>
              <div>
                <Label>Conditions</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedRule.conditions.map((condition, index) => (
                    <Badge key={index} variant="outline">{condition}</Badge>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Success Rate</Label>
                  <div className="flex items-center space-x-2">
                    <Progress value={selectedRule.successRate} className="flex-1" />
                    <span className="text-sm font-medium">{selectedRule.successRate}%</span>
                  </div>
                </div>
                <div>
                  <Label>Estimated Savings</Label>
                  <div className="text-2xl font-bold">${selectedRule.estimatedSavings.toLocaleString()}</div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedRule(null)}>
                  Close
                </Button>
                <Button onClick={() => executeRule(selectedRule.id)}>
                  Execute Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
