import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MessageCircle, 
  Star, 
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Package,
  Clock,
  Target,
  Zap,
  Brain,
  Eye,
  Edit,
  MoreHorizontal,
  Search,
  Filter,
  Download,
  Share,
  Bell,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Activity,
  BarChart3,
  PieChart,
  LineChart
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Customer360ViewProps {
  onViewChange?: (view: string) => void;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  totalSpent: number;
  totalOrders: number;
  averageOrderValue: number;
  lastPurchase: string;
  nextPurchasePrediction: string;
  lifetimeValue: number;
  satisfactionScore: number;
  loyaltyScore: number;
  riskScore: number;
  preferredCategories: string[];
  preferredStores: string[];
  communicationPreferences: string[];
  socialMediaHandles: Record<string, string>;
  demographics: {
    age: number;
    gender: string;
    location: string;
    income: string;
    occupation: string;
  };
  behavior: {
    browsingPattern: string;
    purchaseFrequency: string;
    preferredTime: string;
    preferredChannel: string;
    seasonalPatterns: string[];
  };
  interactions: {
    type: 'purchase' | 'support' | 'feedback' | 'social' | 'email' | 'sms';
    timestamp: string;
    description: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    value?: number;
  }[];
  recommendations: {
    product: string;
    reason: string;
    confidence: number;
    expectedValue: number;
  }[];
  alerts: {
    type: 'churn_risk' | 'upsell_opportunity' | 'support_needed' | 'loyalty_milestone';
    message: string;
    priority: 'low' | 'medium' | 'high';
    action: string;
  }[];
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    tier: "platinum",
    totalSpent: 15420.50,
    totalOrders: 47,
    averageOrderValue: 328.10,
    lastPurchase: "2024-01-14",
    nextPurchasePrediction: "2024-01-28",
    lifetimeValue: 18500.00,
    satisfactionScore: 4.8,
    loyaltyScore: 92,
    riskScore: 15,
    preferredCategories: ["Electronics", "Accessories", "Gaming"],
    preferredStores: ["DT001", "MK002"],
    communicationPreferences: ["email", "sms"],
    socialMediaHandles: {
      twitter: "@sarahj_tech",
      instagram: "sarahj_lifestyle"
    },
    demographics: {
      age: 28,
      gender: "Female",
      location: "San Francisco, CA",
      income: "$75k-$100k",
      occupation: "Software Engineer"
    },
    behavior: {
      browsingPattern: "Research-heavy, comparison shopping",
      purchaseFrequency: "Bi-weekly",
      preferredTime: "Evening (6-9 PM)",
      preferredChannel: "Online",
      seasonalPatterns: ["Holiday spender", "Back-to-school"]
    },
    interactions: [
      {
        type: "purchase",
        timestamp: "2024-01-14T15:30:00Z",
        description: "Purchased iPhone 15 Pro Max - $1,199",
        sentiment: "positive",
        value: 1199
      },
      {
        type: "support",
        timestamp: "2024-01-10T10:15:00Z",
        description: "Inquiry about warranty extension",
        sentiment: "neutral"
      },
      {
        type: "feedback",
        timestamp: "2024-01-08T14:20:00Z",
        description: "5-star review for AirPods Pro",
        sentiment: "positive"
      }
    ],
    recommendations: [
      {
        product: "MacBook Pro 16-inch",
        reason: "Based on your tech purchases and profession",
        confidence: 87,
        expectedValue: 2499
      },
      {
        product: "Apple Watch Series 9",
        reason: "Perfect complement to your iPhone",
        confidence: 73,
        expectedValue: 399
      }
    ],
    alerts: [
      {
        type: "upsell_opportunity",
        message: "High-value customer ready for premium products",
        priority: "high",
        action: "Schedule personal consultation"
      },
      {
        type: "loyalty_milestone",
        message: "Approaching $20k lifetime value milestone",
        priority: "medium",
        action: "Prepare exclusive rewards"
      }
    ]
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 987-6543",
    tier: "gold",
    totalSpent: 8750.25,
    totalOrders: 23,
    averageOrderValue: 380.45,
    lastPurchase: "2024-01-12",
    nextPurchasePrediction: "2024-02-05",
    lifetimeValue: 10200.00,
    satisfactionScore: 4.6,
    loyaltyScore: 78,
    riskScore: 25,
    preferredCategories: ["Audio", "Smart Home", "Gaming"],
    preferredStores: ["DT001"],
    communicationPreferences: ["email"],
    socialMediaHandles: {
      twitter: "@mikechen_audio"
    },
    demographics: {
      age: 35,
      gender: "Male",
      location: "Seattle, WA",
      income: "$100k-$150k",
      occupation: "Audio Engineer"
    },
    behavior: {
      browsingPattern: "Quick decision maker, brand loyal",
      purchaseFrequency: "Monthly",
      preferredTime: "Weekend mornings",
      preferredChannel: "In-store",
      seasonalPatterns: ["Black Friday", "Tech releases"]
    },
    interactions: [
      {
        type: "purchase",
        timestamp: "2024-01-12T11:45:00Z",
        description: "Purchased Sony WH-1000XM5 - $399",
        sentiment: "positive",
        value: 399
      },
      {
        type: "support",
        timestamp: "2024-01-05T16:30:00Z",
        description: "Technical support for audio setup",
        sentiment: "positive"
      }
    ],
    recommendations: [
      {
        product: "Bose QuietComfort Ultra",
        reason: "Upgrade from current headphones",
        confidence: 65,
        expectedValue: 429
      }
    ],
    alerts: [
      {
        type: "churn_risk",
        message: "Decreased purchase frequency detected",
        priority: "medium",
        action: "Send personalized re-engagement campaign"
      }
    ]
  }
];

export const Customer360View = ({ onViewChange }: Customer360ViewProps) => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTier, setFilterTier] = useState("all");
  const [filterRisk, setFilterRisk] = useState("all");

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = filterTier === "all" || customer.tier === filterTier;
    const matchesRisk = filterRisk === "all" || 
                       (filterRisk === "low" && customer.riskScore < 30) ||
                       (filterRisk === "medium" && customer.riskScore >= 30 && customer.riskScore < 60) ||
                       (filterRisk === "high" && customer.riskScore >= 60);
    
    return matchesSearch && matchesTier && matchesRisk;
  });

  const stats = {
    totalCustomers: customers.length,
    totalValue: customers.reduce((sum, c) => sum + c.lifetimeValue, 0),
    averageLTV: customers.reduce((sum, c) => sum + c.lifetimeValue, 0) / customers.length,
    highValueCustomers: customers.filter(c => c.tier === 'platinum' || c.tier === 'gold').length,
    atRiskCustomers: customers.filter(c => c.riskScore > 50).length,
    averageSatisfaction: customers.reduce((sum, c) => sum + c.satisfactionScore, 0) / customers.length
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'bg-purple-100 text-purple-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      case 'bronze': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk < 30) return 'text-green-600';
    if (risk < 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600';
      case 'neutral': return 'text-gray-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getAlertColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6 backdrop-blur-glass">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer 360° Intelligence</h1>
          <p className="text-muted-foreground">
            Complete customer insights, predictions, and personalized experiences
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button>
            <Brain className="h-4 w-4 mr-2" />
            AI Insights
          </Button>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.highValueCustomers} high-value customers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total LTV</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Average: ${stats.averageLTV.toFixed(0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.atRiskCustomers}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageSatisfaction.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              Average rating
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Intelligence Dashboard</CardTitle>
          <CardDescription>
            Advanced customer segmentation and insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select 
              value={filterTier} 
              onChange={(e) => setFilterTier(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Tiers</option>
              <option value="platinum">Platinum</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="bronze">Bronze</option>
            </select>
            <select 
              value={filterRisk} 
              onChange={(e) => setFilterRisk(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Customer List */}
      <div className="space-y-4">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={customer.avatar} />
                    <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold">{customer.name}</h3>
                      <Badge className={getTierColor(customer.tier)}>
                        {customer.tier}
                      </Badge>
                      <span className={`text-sm font-medium ${getRiskColor(customer.riskScore)}`}>
                        Risk: {customer.riskScore}%
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Lifetime Value:</span>
                        <div className="font-medium">${customer.lifetimeValue.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total Orders:</span>
                        <div className="font-medium">{customer.totalOrders}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Satisfaction:</span>
                        <div className="font-medium">{customer.satisfactionScore}/5.0</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Loyalty Score:</span>
                        <div className="font-medium">{customer.loyaltyScore}%</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {customer.preferredCategories.map((category, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    {customer.alerts.length > 0 && (
                      <div className="space-y-1">
                        {customer.alerts.map((alert, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Badge className={getAlertColor(alert.priority)}>
                              {alert.priority}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{alert.message}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedCustomer.avatar} />
                  <AvatarFallback>{selectedCustomer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{selectedCustomer.name}</CardTitle>
                  <CardDescription>{selectedCustomer.email} • {selectedCustomer.phone}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="behavior">Behavior</TabsTrigger>
                  <TabsTrigger value="interactions">Interactions</TabsTrigger>
                  <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Customer Metrics</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span>Tier:</span>
                          <Badge className={getTierColor(selectedCustomer.tier)}>
                            {selectedCustomer.tier}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Lifetime Value:</span>
                          <span className="font-medium">${selectedCustomer.lifetimeValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Orders:</span>
                          <span className="font-medium">{selectedCustomer.totalOrders}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average Order:</span>
                          <span className="font-medium">${selectedCustomer.averageOrderValue.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Satisfaction:</span>
                          <span className="font-medium">{selectedCustomer.satisfactionScore}/5.0</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Loyalty Score:</span>
                          <span className="font-medium">{selectedCustomer.loyaltyScore}%</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Demographics</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span>Age:</span>
                          <span className="font-medium">{selectedCustomer.demographics.age}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Gender:</span>
                          <span className="font-medium">{selectedCustomer.demographics.gender}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Location:</span>
                          <span className="font-medium">{selectedCustomer.demographics.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Income:</span>
                          <span className="font-medium">{selectedCustomer.demographics.income}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Occupation:</span>
                          <span className="font-medium">{selectedCustomer.demographics.occupation}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="behavior" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Behavioral Patterns</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium">Browsing Pattern</h4>
                        <p className="text-sm text-muted-foreground">{selectedCustomer.behavior.browsingPattern}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Purchase Frequency</h4>
                        <p className="text-sm text-muted-foreground">{selectedCustomer.behavior.purchaseFrequency}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Preferred Time</h4>
                        <p className="text-sm text-muted-foreground">{selectedCustomer.behavior.preferredTime}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Preferred Channel</h4>
                        <p className="text-sm text-muted-foreground">{selectedCustomer.behavior.preferredChannel}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Seasonal Patterns</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedCustomer.behavior.seasonalPatterns.map((pattern, index) => (
                            <Badge key={index} variant="outline">{pattern}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="interactions" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Interaction History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedCustomer.interactions.map((interaction, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <MessageCircle className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-6">
                                <span className="font-medium">{interaction.type}</span>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(interaction.timestamp).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">{interaction.description}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className={`text-sm ${getSentimentColor(interaction.sentiment)}`}>
                                  {interaction.sentiment}
                                </span>
                                {interaction.value && (
                                  <span className="text-sm font-medium">${interaction.value}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="recommendations" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>AI-Powered Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedCustomer.recommendations.map((rec, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{rec.product}</h4>
                              <Badge variant="outline">{rec.confidence}% confidence</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{rec.reason}</p>
                            <div className="flex items-center justify-between mb-6">
                              <span className="text-sm font-medium">Expected Value: ${rec.expectedValue}</span>
                              <Button size="sm">Recommend</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setSelectedCustomer(null)}>
                  Close
                </Button>
                <Button>Take Action</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
