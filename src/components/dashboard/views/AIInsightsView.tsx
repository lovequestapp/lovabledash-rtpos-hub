import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  Zap, 
  BarChart3,
  Lightbulb,
  Shield,
  Clock,
  DollarSign,
  Users,
  Package,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Eye,
  Settings,
  RefreshCw,
  Download,
  Share,
  Bell,
  CheckCircle,
  XCircle,
  Info,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Rocket,
  Cpu,
  Network,
  Database,
  Layers,
  Workflow,
  Bot,
  MessageSquare,
  Calendar,
  Timer,
  Gauge,
  PieChart,
  LineChart,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  X,
  Check,
  Filter,
  Search,
  SortAsc,
  SortDesc,
  MoreHorizontal,
  MoreVertical,
  HelpCircle,
  CheckCircle2,
  Award,
  Trophy,
  Medal,
  Crown,
  Gem,
  Diamond,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
  Droplets,
  Thermometer,
  Battery,
  BatteryLow,
  BatteryMedium,
  BatteryFull,
  Signal,
  SignalLow,
  SignalMedium,
  SignalHigh,
  WifiOff,
  BluetoothOff,
  Airplay,
  Cast,
  ScreenShare,
  MonitorSpeaker,
  Tv,
  Radio,
  Disc,
  Disc3,
  Music,
  PlayCircle,
  PauseCircle,
  StopCircle,
  Repeat,
  Repeat1,
  Shuffle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AIInsightsViewProps {
  onViewChange?: (view: string) => void;
}

interface AIInsight {
  id: string;
  type: 'prediction' | 'recommendation' | 'alert' | 'optimization' | 'forecast' | 'analysis';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  category: string;
  actionable: boolean;
  estimatedValue: number;
  timeframe: string;
  priority: number;
  tags: string[];
  relatedMetrics: string[];
  implementation: string;
  riskLevel: 'low' | 'medium' | 'high';
  status: 'new' | 'reviewed' | 'implemented' | 'dismissed';
  createdAt: string;
  expiresAt?: string;
  aiModel: string;
  dataPoints: number;
  accuracy: number;
  trend: 'up' | 'down' | 'stable';
  businessImpact: {
    revenue: number;
    cost: number;
    efficiency: number;
    customer: number;
  };
  implementationSteps: {
    step: number;
    action: string;
    timeframe: string;
    resources: string[];
    difficulty: 'easy' | 'medium' | 'hard';
  }[];
  successMetrics: {
    metric: string;
    current: number;
    target: number;
    timeframe: string;
  }[];
}

const mockAIInsights: AIInsight[] = [
  {
    id: "1",
    type: "prediction",
    title: "Sales Surge Predicted for Electronics",
    description: "AI analysis shows 35% increase in electronics sales expected next week based on weather patterns, local events, and historical data.",
    confidence: 87,
    impact: "high",
    category: "Sales",
    actionable: true,
    estimatedValue: 12500,
    timeframe: "Next 7 days",
    priority: 1,
    tags: ["electronics", "seasonal", "inventory", "sales"],
    relatedMetrics: ["sales_forecast", "inventory_levels", "staffing"],
    implementation: "Increase electronics inventory by 25% and schedule additional staff for peak hours.",
    riskLevel: "low",
    status: "new",
    createdAt: "2024-01-15T10:30:00Z",
    expiresAt: "2024-01-22T10:30:00Z",
    aiModel: "GPT-4 + Time Series Analysis",
    dataPoints: 15420,
    accuracy: 94.2,
    trend: "up",
    businessImpact: {
      revenue: 12500,
      cost: 2500,
      efficiency: 15,
      customer: 8
    },
    implementationSteps: [
      {
        step: 1,
        action: "Increase inventory order by 25%",
        timeframe: "2 days",
        resources: ["Procurement team", "Supplier contacts"],
        difficulty: "easy"
      },
      {
        step: 2,
        action: "Schedule additional staff",
        timeframe: "3 days",
        resources: ["HR team", "Staff scheduling system"],
        difficulty: "medium"
      },
      {
        step: 3,
        action: "Update marketing campaigns",
        timeframe: "1 day",
        resources: ["Marketing team", "Digital platforms"],
        difficulty: "easy"
      }
    ],
    successMetrics: [
      {
        metric: "Electronics Sales",
        current: 45000,
        target: 60750,
        timeframe: "7 days"
      },
      {
        metric: "Inventory Turnover",
        current: 2.1,
        target: 2.7,
        timeframe: "7 days"
      }
    ]
  },
  {
    id: "2",
    type: "recommendation",
    title: "Optimize Staff Scheduling",
    description: "Current scheduling shows 23% efficiency loss. AI recommends adjusting shifts to match customer flow patterns.",
    confidence: 92,
    impact: "medium",
    category: "Operations",
    actionable: true,
    estimatedValue: 3200,
    timeframe: "Immediate",
    priority: 2,
    tags: ["staffing", "efficiency", "cost_savings", "optimization"],
    relatedMetrics: ["labor_costs", "customer_satisfaction", "productivity"],
    implementation: "Redistribute 3 staff members from low-traffic to high-traffic hours.",
    riskLevel: "low",
    status: "new",
    createdAt: "2024-01-15T09:15:00Z",
    aiModel: "Deep Learning + Workforce Analytics",
    dataPoints: 8760,
    accuracy: 91.8,
    trend: "stable",
    businessImpact: {
      revenue: 0,
      cost: -3200,
      efficiency: 23,
      customer: 12
    },
    implementationSteps: [
      {
        step: 1,
        action: "Analyze current staff distribution",
        timeframe: "1 day",
        resources: ["HR analytics", "Staff data"],
        difficulty: "easy"
      },
      {
        step: 2,
        action: "Redistribute staff schedules",
        timeframe: "2 days",
        resources: ["HR team", "Staff members"],
        difficulty: "medium"
      }
    ],
    successMetrics: [
      {
        metric: "Labor Efficiency",
        current: 77,
        target: 100,
        timeframe: "2 weeks"
      },
      {
        metric: "Cost Savings",
        current: 0,
        target: 3200,
        timeframe: "1 month"
      }
    ]
  },
  {
    id: "3",
    type: "alert",
    title: "Fraud Risk Detected",
    description: "Unusual transaction patterns detected in Store DT001. 3 transactions exceed normal patterns by 400%.",
    confidence: 94,
    impact: "high",
    category: "Security",
    actionable: true,
    estimatedValue: -2500,
    timeframe: "Immediate",
    priority: 1,
    tags: ["fraud", "security", "transactions", "risk"],
    relatedMetrics: ["transaction_volume", "fraud_rate", "loss_prevention"],
    implementation: "Review transactions from 2-4 PM today and implement additional verification for high-value items.",
    riskLevel: "high",
    status: "new",
    createdAt: "2024-01-15T14:20:00Z",
    aiModel: "Anomaly Detection + Pattern Recognition",
    dataPoints: 125000,
    accuracy: 96.1,
    trend: "down",
    businessImpact: {
      revenue: -2500,
      cost: 500,
      efficiency: -5,
      customer: -15
    },
    implementationSteps: [
      {
        step: 1,
        action: "Immediate transaction review",
        timeframe: "30 minutes",
        resources: ["Security team", "Transaction logs"],
        difficulty: "easy"
      },
      {
        step: 2,
        action: "Implement additional verification",
        timeframe: "1 hour",
        resources: ["IT team", "POS systems"],
        difficulty: "medium"
      }
    ],
    successMetrics: [
      {
        metric: "Fraud Prevention",
        current: 95,
        target: 99,
        timeframe: "24 hours"
      },
      {
        metric: "Loss Prevention",
        current: 0,
        target: 2500,
        timeframe: "Immediate"
      }
    ]
  },
  {
    id: "4",
    type: "optimization",
    title: "Dynamic Pricing Opportunity",
    description: "Competitor analysis shows opportunity to increase margins on 12 products by 8-15% without affecting demand.",
    confidence: 78,
    impact: "medium",
    category: "Pricing",
    actionable: true,
    estimatedValue: 1800,
    timeframe: "Next 3 days",
    priority: 3,
    tags: ["pricing", "margins", "competition", "revenue"],
    relatedMetrics: ["profit_margins", "competitor_pricing", "demand_elasticity"],
    implementation: "Implement dynamic pricing for identified products with A/B testing.",
    riskLevel: "medium",
    status: "new",
    createdAt: "2024-01-15T11:45:00Z",
    aiModel: "Competitive Intelligence + Price Elasticity",
    dataPoints: 45000,
    accuracy: 89.3,
    trend: "up",
    businessImpact: {
      revenue: 1800,
      cost: 0,
      efficiency: 8,
      customer: 2
    },
    implementationSteps: [
      {
        step: 1,
        action: "Analyze competitor pricing",
        timeframe: "1 day",
        resources: ["Market research", "Pricing data"],
        difficulty: "easy"
      },
      {
        step: 2,
        action: "Implement A/B testing",
        timeframe: "2 days",
        resources: ["IT team", "Pricing system"],
        difficulty: "medium"
      }
    ],
    successMetrics: [
      {
        metric: "Profit Margins",
        current: 22,
        target: 25,
        timeframe: "1 week"
      },
      {
        metric: "Revenue Increase",
        current: 0,
        target: 1800,
        timeframe: "1 month"
      }
    ]
  },
  {
    id: "5",
    type: "forecast",
    title: "Inventory Shortage Risk",
    description: "AI predicts 67% chance of stockout for AirPods Pro within 5 days based on current sales velocity.",
    confidence: 89,
    impact: "high",
    category: "Inventory",
    actionable: true,
    estimatedValue: 4500,
    timeframe: "Next 5 days",
    priority: 1,
    tags: ["inventory", "stockout", "revenue_loss", "forecasting"],
    relatedMetrics: ["inventory_levels", "sales_velocity", "supplier_lead_time"],
    implementation: "Place emergency order for 50 units and expedite shipping.",
    riskLevel: "medium",
    status: "new",
    createdAt: "2024-01-15T08:30:00Z",
    aiModel: "Time Series Forecasting + Demand Prediction",
    dataPoints: 25000,
    accuracy: 92.7,
    trend: "down",
    businessImpact: {
      revenue: 4500,
      cost: 500,
      efficiency: 0,
      customer: 10
    },
    implementationSteps: [
      {
        step: 1,
        action: "Place emergency order",
        timeframe: "2 hours",
        resources: ["Procurement team", "Supplier contacts"],
        difficulty: "easy"
      },
      {
        step: 2,
        action: "Expedite shipping",
        timeframe: "4 hours",
        resources: ["Logistics team", "Shipping partners"],
        difficulty: "medium"
      }
    ],
    successMetrics: [
      {
        metric: "Stockout Prevention",
        current: 0,
        target: 100,
        timeframe: "5 days"
      },
      {
        metric: "Revenue Protection",
        current: 0,
        target: 4500,
        timeframe: "5 days"
      }
    ]
  }
];

export const AIInsightsView = ({ onViewChange }: AIInsightsViewProps) => {
  const [insights, setInsights] = useState<AIInsight[]>(mockAIInsights);
  const [filterType, setFilterType] = useState("all");
  const [filterImpact, setFilterImpact] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [aiProcessing, setAiProcessing] = useState(false);

  const filteredInsights = insights.filter(insight => {
    const matchesType = filterType === "all" || insight.type === filterType;
    const matchesImpact = filterImpact === "all" || insight.impact === filterImpact;
    const matchesStatus = filterStatus === "all" || insight.status === filterStatus;
    return matchesType && matchesImpact && matchesStatus;
  });

  const stats = {
    totalInsights: insights.length,
    newInsights: insights.filter(i => i.status === 'new').length,
    highImpact: insights.filter(i => i.impact === 'high').length,
    highConfidence: insights.filter(i => i.confidence > 85).length,
    totalValue: insights.reduce((sum, i) => sum + i.estimatedValue, 0),
    implemented: insights.filter(i => i.status === 'implemented').length,
    averageAccuracy: insights.reduce((sum, i) => sum + i.accuracy, 0) / insights.length
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'prediction': return Brain;
      case 'recommendation': return Lightbulb;
      case 'alert': return AlertTriangle;
      case 'optimization': return Target;
      case 'forecast': return TrendingUp;
      case 'analysis': return BarChart3;
      default: return Info;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-purple-100 text-purple-800';
      case 'implemented': return 'bg-green-100 text-green-800';
      case 'dismissed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return ArrowUpRight;
      case 'down': return ArrowDownRight;
      case 'stable': return Activity;
      default: return Activity;
    }
  };

  const handleInsightAction = (insightId: string, action: string) => {
    setInsights(prev => prev.map(insight => 
      insight.id === insightId 
        ? { ...insight, status: action as any }
        : insight
    ));
    
    toast({
      title: "Action Taken",
      description: `Insight ${action} successfully`
    });
  };

  const handleRefreshInsights = () => {
    setAiProcessing(true);
    setTimeout(() => {
      setAiProcessing(false);
      toast({
        title: "AI Analysis Complete",
        description: "New insights have been generated"
      });
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6 backdrop-blur-glass">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Business Intelligence</h1>
          <p className="text-muted-foreground">
            Revolutionary AI-powered insights, predictions, and recommendations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Switch
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
            />
            <span className="text-sm">Auto Refresh</span>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button onClick={handleRefreshInsights} disabled={aiProcessing}>
            {aiProcessing ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            {aiProcessing ? 'Analyzing...' : 'Refresh AI'}
          </Button>
        </div>
      </div>

      {/* AI Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Insights</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalInsights}</div>
            <p className="text-xs text-muted-foreground">
              {stats.newInsights} new, {stats.highImpact} high impact
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Accuracy</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageAccuracy.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Average prediction accuracy
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Value Impact</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Potential value impact
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Implemented</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.implemented}</div>
            <p className="text-xs text-muted-foreground">
              Actions taken
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Processing Status */}
      {aiProcessing && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="animate-spin">
                <Cpu className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-900">AI Processing</h3>
                <p className="text-sm text-blue-700">Analyzing data patterns and generating insights...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>AI Insights Dashboard</CardTitle>
          <CardDescription>
            Filter and manage AI-generated business insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 hover:bg-gray-50 focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors"
            >
              <option value="all">All Types</option>
              <option value="prediction">Predictions</option>
              <option value="recommendation">Recommendations</option>
              <option value="alert">Alerts</option>
              <option value="optimization">Optimizations</option>
              <option value="forecast">Forecasts</option>
              <option value="analysis">Analysis</option>
            </select>
            <select 
              value={filterImpact} 
              onChange={(e) => setFilterImpact(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 hover:bg-gray-50 focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors"
            >
              <option value="all">All Impact</option>
              <option value="high">High Impact</option>
              <option value="medium">Medium Impact</option>
              <option value="low">Low Impact</option>
            </select>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 hover:bg-gray-50 focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="reviewed">Reviewed</option>
              <option value="implemented">Implemented</option>
              <option value="dismissed">Dismissed</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights List */}
      <div className="space-y-4">
        {filteredInsights.map((insight) => {
          const Icon = getInsightIcon(insight.type);
          const TrendIcon = getTrendIcon(insight.trend);
          return (
            <Card key={insight.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold">{insight.title}</h3>
                        <Badge className={getImpactColor(insight.impact)}>
                          {insight.impact} impact
                        </Badge>
                        <Badge className={getStatusColor(insight.status)}>
                          {insight.status}
                        </Badge>
                        <TrendIcon className="h-4 w-4 text-gray-600" />
                      </div>
                      <p className="text-muted-foreground">{insight.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Confidence:</span>
                          <div className="font-medium">{insight.confidence}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Value:</span>
                          <div className="font-medium">${insight.estimatedValue.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Timeframe:</span>
                          <div className="font-medium">{insight.timeframe}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Accuracy:</span>
                          <div className="font-medium">{insight.accuracy}%</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {insight.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedInsight(insight)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {insight.status === 'new' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleInsightAction(insight.id, 'implemented')}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Implement
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleInsightAction(insight.id, 'dismissed')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Dismiss
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Insight Detail Modal */}
      {selectedInsight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {(() => {
                    const IconComponent = getInsightIcon(selectedInsight.type);
                    return <IconComponent className="h-6 w-6 text-blue-600" />;
                  })()}
                </div>
                <div>
                  <CardTitle>{selectedInsight.title}</CardTitle>
                  <CardDescription>{selectedInsight.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="implementation">Implementation</TabsTrigger>
                  <TabsTrigger value="metrics">Success Metrics</TabsTrigger>
                  <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Insight Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span>Type:</span>
                          <Badge className={getImpactColor(selectedInsight.impact)}>
                            {selectedInsight.type}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Confidence:</span>
                          <span className="font-medium">{selectedInsight.confidence}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Impact:</span>
                          <Badge className={getImpactColor(selectedInsight.impact)}>
                            {selectedInsight.impact}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Estimated Value:</span>
                          <span className="font-medium">${selectedInsight.estimatedValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Timeframe:</span>
                          <span className="font-medium">{selectedInsight.timeframe}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Risk Level:</span>
                          <span className={`font-medium ${getRiskColor(selectedInsight.riskLevel)}`}>
                            {selectedInsight.riskLevel}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Business Impact</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span>Revenue Impact:</span>
                          <span className="font-medium">${selectedInsight.businessImpact.revenue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cost Impact:</span>
                          <span className="font-medium">${selectedInsight.businessImpact.cost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Efficiency Gain:</span>
                          <span className="font-medium">{selectedInsight.businessImpact.efficiency}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Customer Impact:</span>
                          <span className="font-medium">{selectedInsight.businessImpact.customer}%</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="implementation" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Implementation Plan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Implementation Steps</h4>
                        <div className="space-y-3">
                          {selectedInsight.implementationSteps.map((step, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                              <div className="p-2 bg-blue-100 rounded-lg">
                                <span className="text-sm font-medium">{step.step}</span>
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{step.action}</div>
                                <div className="text-sm text-muted-foreground">
                                  Timeframe: {step.timeframe}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Difficulty: {step.difficulty}
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {step.resources.map((resource, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {resource}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="metrics" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Success Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedInsight.successMetrics.map((metric, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{metric.metric}</h4>
                              <Badge variant="outline">{metric.timeframe}</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <span className="text-sm text-muted-foreground">Current:</span>
                                <div className="font-medium">{metric.current}</div>
                              </div>
                              <div>
                                <span className="text-sm text-muted-foreground">Target:</span>
                                <div className="font-medium">{metric.target}</div>
                              </div>
                            </div>
                            <div className="mt-2">
                              <Progress value={(metric.current / metric.target) * 100} className="w-full" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="analysis" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Analysis Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">AI Model</h4>
                          <p className="text-sm text-muted-foreground">{selectedInsight.aiModel}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Data Points</h4>
                          <p className="text-sm text-muted-foreground">{selectedInsight.dataPoints.toLocaleString()}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Accuracy</h4>
                          <p className="text-sm text-muted-foreground">{selectedInsight.accuracy}%</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Trend</h4>
                          <div className="flex items-center space-x-2">
                            {(() => {
                              const TrendIconComponent = getTrendIcon(selectedInsight.trend);
                              return <TrendIconComponent className="h-4 w-4" />;
                            })()}
                            <span className="text-sm">{selectedInsight.trend}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Related Metrics</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedInsight.relatedMetrics.map((metric, index) => (
                            <Badge key={index} variant="secondary">{metric}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setSelectedInsight(null)}>
                  Close
                </Button>
                <Button onClick={() => handleInsightAction(selectedInsight.id, 'implemented')}>
                  Implement Insight
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
