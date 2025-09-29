import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Info
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AIInsightsViewProps {
  onViewChange?: (view: string) => void;
}

interface AIInsight {
  id: string;
  type: 'prediction' | 'recommendation' | 'alert' | 'optimization';
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
    tags: ["electronics", "seasonal", "inventory"],
    relatedMetrics: ["sales_forecast", "inventory_levels", "staffing"],
    implementation: "Increase electronics inventory by 25% and schedule additional staff for peak hours.",
    riskLevel: "low",
    status: "new",
    createdAt: "2024-01-15T10:30:00Z",
    expiresAt: "2024-01-22T10:30:00Z"
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
    tags: ["staffing", "efficiency", "cost_savings"],
    relatedMetrics: ["labor_costs", "customer_satisfaction", "productivity"],
    implementation: "Redistribute 3 staff members from low-traffic to high-traffic hours.",
    riskLevel: "low",
    status: "new",
    createdAt: "2024-01-15T09:15:00Z"
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
    tags: ["fraud", "security", "transactions"],
    relatedMetrics: ["transaction_volume", "fraud_rate", "loss_prevention"],
    implementation: "Review transactions from 2-4 PM today and implement additional verification for high-value items.",
    riskLevel: "high",
    status: "new",
    createdAt: "2024-01-15T14:20:00Z"
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
    tags: ["pricing", "margins", "competition"],
    relatedMetrics: ["profit_margins", "competitor_pricing", "demand_elasticity"],
    implementation: "Implement dynamic pricing for identified products with A/B testing.",
    riskLevel: "medium",
    status: "new",
    createdAt: "2024-01-15T11:45:00Z"
  },
  {
    id: "5",
    type: "prediction",
    title: "Inventory Shortage Risk",
    description: "AI predicts 67% chance of stockout for AirPods Pro within 5 days based on current sales velocity.",
    confidence: 89,
    impact: "high",
    category: "Inventory",
    actionable: true,
    estimatedValue: 4500,
    timeframe: "Next 5 days",
    priority: 1,
    tags: ["inventory", "stockout", "revenue_loss"],
    relatedMetrics: ["inventory_levels", "sales_velocity", "supplier_lead_time"],
    implementation: "Place emergency order for 50 units and expedite shipping.",
    riskLevel: "medium",
    status: "new",
    createdAt: "2024-01-15T08:30:00Z"
  }
];

export const AIInsightsView = ({ onViewChange }: AIInsightsViewProps) => {
  const [insights, setInsights] = useState<AIInsight[]>(mockAIInsights);
  const [filterType, setFilterType] = useState("all");
  const [filterImpact, setFilterImpact] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null);

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
    implemented: insights.filter(i => i.status === 'implemented').length
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'prediction': return Brain;
      case 'recommendation': return Lightbulb;
      case 'alert': return AlertTriangle;
      case 'optimization': return Target;
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Business Intelligence</h2>
          <p className="text-muted-foreground">
            Revolutionary AI-powered insights, predictions, and recommendations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Insights
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share Report
          </Button>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh AI
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
            <CardTitle className="text-sm font-medium">Confidence</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.highConfidence}</div>
            <p className="text-xs text-muted-foreground">
              High confidence insights
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
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Types</option>
              <option value="prediction">Predictions</option>
              <option value="recommendation">Recommendations</option>
              <option value="alert">Alerts</option>
              <option value="optimization">Optimizations</option>
            </select>
            <select 
              value={filterImpact} 
              onChange={(e) => setFilterImpact(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Impact</option>
              <option value="high">High Impact</option>
              <option value="medium">Medium Impact</option>
              <option value="low">Low Impact</option>
            </select>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md"
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
                      </div>
                      <p className="text-muted-foreground">{insight.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Confidence: {insight.confidence}%</span>
                        <span>Value: ${insight.estimatedValue.toLocaleString()}</span>
                        <span>Timeframe: {insight.timeframe}</span>
                        <span className={getRiskColor(insight.riskLevel)}>
                          Risk: {insight.riskLevel}
                        </span>
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
          <Card className="max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{selectedInsight.title}</CardTitle>
              <CardDescription>{selectedInsight.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Confidence Level</Label>
                  <div className="flex items-center space-x-2">
                    <Progress value={selectedInsight.confidence} className="flex-1" />
                    <span className="text-sm font-medium">{selectedInsight.confidence}%</span>
                  </div>
                </div>
                <div>
                  <Label>Estimated Value</Label>
                  <div className="text-2xl font-bold">${selectedInsight.estimatedValue.toLocaleString()}</div>
                </div>
              </div>
              <div>
                <Label>Implementation Plan</Label>
                <p className="text-sm text-muted-foreground mt-1">{selectedInsight.implementation}</p>
              </div>
              <div>
                <Label>Related Metrics</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedInsight.relatedMetrics.map((metric, index) => (
                    <Badge key={index} variant="secondary">{metric}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
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
