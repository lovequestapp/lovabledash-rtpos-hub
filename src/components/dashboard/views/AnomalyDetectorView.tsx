import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Shield, 
  AlertTriangle, 
  Eye, 
  Brain, 
  Clock, 
  DollarSign, 
  Users, 
  Package, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Zap, 
  Target, 
  CheckCircle, 
  XCircle, 
  Info, 
  Bell, 
  Settings, 
  RefreshCw, 
  Download, 
  Filter, 
  Search,
  BarChart3,
  PieChart,
  LineChart,
  AlertCircle,
  Lock,
  Unlock,
  Timer,
  Calendar,
  MapPin,
  CreditCard,
  Smartphone,
  Laptop,
  Monitor,
  Database,
  Network,
  Cpu,
  HardDrive,
  Wifi,
  Bluetooth,
  Camera,
  Mic,
  Headphones,
  Speaker,
  Gamepad2,
  Mouse,
  Keyboard,
  Printer,
  Scanner,
  Fax,
  Phone,
  Mail,
  MessageSquare,
  Video,
  Image,
  File,
  Folder,
  Archive,
  Trash2,
  Edit,
  Copy,
  Share,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Bookmark,
  Tag,
  Link,
  ExternalLink,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  X,
  Check,
  RotateCcw,
  Play,
  Pause,
  Stop,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Fullscreen,
  Grid,
  List,
  Menu,
  MoreHorizontal,
  MoreVertical,
  HelpCircle,
  QuestionMarkCircle,
  ExclamationTriangle,
  ExclamationCircle,
  CheckCircle2,
  XCircle2,
  Info2,
  Lightbulb,
  Sparkles,
  Rocket,
  Star2,
  Award,
  Trophy,
  Medal,
  Crown,
  Gem,
  Diamond,
  Zap2,
  Flash,
  Thunder,
  Fire,
  Snow,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
  Droplets,
  Thermometer,
  Gauge,
  Battery,
  BatteryLow,
  BatteryMedium,
  BatteryHigh,
  BatteryFull,
  Signal,
  SignalLow,
  SignalMedium,
  SignalHigh,
  SignalFull,
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
  SkipBackCircle,
  SkipForwardCircle,
  SkipBackCircle2,
  SkipForwardCircle2,
  Repeat,
  Repeat1,
  Shuffle,
  Shuffle2,
  Repeat2,
  Repeat3,
  Repeat4,
  Repeat5,
  Repeat6,
  Repeat7,
  Repeat8,
  Repeat9,
  Repeat10,
  Repeat11,
  Repeat12,
  Repeat13,
  Repeat14,
  Repeat15,
  Repeat16,
  Repeat17,
  Repeat18,
  Repeat19,
  Repeat20,
  Repeat21,
  Repeat22,
  Repeat23,
  Repeat24,
  Repeat25,
  Repeat26,
  Repeat27,
  Repeat28,
  Repeat29,
  Repeat30,
  Repeat31,
  Repeat32,
  Repeat33,
  Repeat34,
  Repeat35,
  Repeat36,
  Repeat37,
  Repeat38,
  Repeat39,
  Repeat40,
  Repeat41,
  Repeat42,
  Repeat43,
  Repeat44,
  Repeat45,
  Repeat46,
  Repeat47,
  Repeat48,
  Repeat49,
  Repeat50,
  Repeat51,
  Repeat52,
  Repeat53,
  Repeat54,
  Repeat55,
  Repeat56,
  Repeat57,
  Repeat58,
  Repeat59,
  Repeat60,
  Repeat61,
  Repeat62,
  Repeat63,
  Repeat64,
  Repeat65,
  Repeat66,
  Repeat67,
  Repeat68,
  Repeat69,
  Repeat70,
  Repeat71,
  Repeat72,
  Repeat73,
  Repeat74,
  Repeat75,
  Repeat76,
  Repeat77,
  Repeat78,
  Repeat79,
  Repeat80,
  Repeat81,
  Repeat82,
  Repeat83,
  Repeat84,
  Repeat85,
  Repeat86,
  Repeat87,
  Repeat88,
  Repeat89,
  Repeat90,
  Repeat91,
  Repeat92,
  Repeat93,
  Repeat94,
  Repeat95,
  Repeat96,
  Repeat97,
  Repeat98,
  Repeat99,
  Repeat100
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AnomalyDetectorViewProps {
  onViewChange?: (view: string) => void;
}

interface Anomaly {
  id: string;
  type: 'fraud' | 'time_clock' | 'inventory' | 'transaction' | 'employee' | 'customer' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  detectedAt: string;
  confidence: number;
  riskScore: number;
  affectedEntity: string;
  location: string;
  amount?: number;
  status: 'new' | 'investigating' | 'resolved' | 'false_positive';
  evidence: string[];
  patterns: string[];
  recommendations: string[];
  autoResolved: boolean;
  falsePositiveRate: number;
  similarAnomalies: number;
  impact: {
    financial: number;
    operational: number;
    reputation: number;
  };
  timeline: {
    timestamp: string;
    event: string;
    actor: string;
    details: string;
  }[];
  relatedTransactions: string[];
  relatedEmployees: string[];
  relatedCustomers: string[];
  tags: string[];
  notes: string;
  assignedTo?: string;
  priority: number;
  estimatedResolutionTime: string;
  actualResolutionTime?: string;
  resolutionNotes?: string;
  preventionMeasures: string[];
}

const mockAnomalies: Anomaly[] = [
  {
    id: "1",
    type: "fraud",
    severity: "critical",
    title: "Suspicious Transaction Pattern Detected",
    description: "Multiple high-value transactions from same customer within 2-hour window, unusual payment methods detected.",
    detectedAt: "2024-01-15T14:30:00Z",
    confidence: 94,
    riskScore: 89,
    affectedEntity: "Customer ID: 12345",
    location: "Store DT001",
    amount: 12500,
    status: "new",
    evidence: [
      "3 transactions over $3,000 in 2 hours",
      "Different payment methods used",
      "Unusual time patterns (3 AM transactions)",
      "Customer behavior deviation from history"
    ],
    patterns: [
      "Rapid successive transactions",
      "Payment method switching",
      "Off-hours activity",
      "Amount escalation pattern"
    ],
    recommendations: [
      "Immediate transaction hold",
      "Customer verification required",
      "Enhanced fraud monitoring",
      "Staff notification sent"
    ],
    autoResolved: false,
    falsePositiveRate: 0.05,
    similarAnomalies: 3,
    impact: {
      financial: 12500,
      operational: 2,
      reputation: 5
    },
    timeline: [
      {
        timestamp: "2024-01-15T14:30:00Z",
        event: "Anomaly Detected",
        actor: "AI System",
        details: "Pattern analysis triggered fraud alert"
      },
      {
        timestamp: "2024-01-15T14:31:00Z",
        event: "Transaction Hold",
        actor: "System",
        details: "Automatic hold placed on pending transactions"
      }
    ],
    relatedTransactions: ["TXN-001", "TXN-002", "TXN-003"],
    relatedEmployees: ["EMP-001"],
    relatedCustomers: ["CUST-12345"],
    tags: ["fraud", "high-value", "payment-methods", "time-pattern"],
    notes: "Customer has been flagged for unusual activity. Requires immediate review.",
    priority: 1,
    estimatedResolutionTime: "2 hours",
    preventionMeasures: [
      "Enhanced customer verification",
      "Transaction limits implementation",
      "Real-time monitoring escalation"
    ]
  },
  {
    id: "2",
    type: "time_clock",
    severity: "high",
    title: "Time Clock Manipulation Detected",
    description: "Employee clock-in/out patterns show suspicious timing inconsistencies suggesting time theft.",
    detectedAt: "2024-01-15T09:15:00Z",
    confidence: 87,
    riskScore: 72,
    affectedEntity: "Employee: John Smith",
    location: "Store MK002",
    amount: 450,
    status: "investigating",
    evidence: [
      "Clock-in times exactly at shift start",
      "Clock-out times exactly at shift end",
      "No break time variations",
      "Pattern consistency across 2 weeks"
    ],
    patterns: [
      "Exact timing patterns",
      "No natural variation",
      "Consistent across multiple days",
      "Suspicious precision"
    ],
    recommendations: [
      "Review time clock logs",
      "Interview employee",
      "Implement random audits",
      "Enhanced time tracking"
    ],
    autoResolved: false,
    falsePositiveRate: 0.12,
    similarAnomalies: 1,
    impact: {
      financial: 450,
      operational: 3,
      reputation: 2
    },
    timeline: [
      {
        timestamp: "2024-01-15T09:15:00Z",
        event: "Pattern Analysis",
        actor: "AI System",
        details: "Time clock patterns flagged as suspicious"
      },
      {
        timestamp: "2024-01-15T09:20:00Z",
        event: "Manager Alert",
        actor: "System",
        details: "Store manager notified of potential time theft"
      }
    ],
    relatedTransactions: [],
    relatedEmployees: ["EMP-002"],
    relatedCustomers: [],
    tags: ["time-theft", "employee", "time-clock", "pattern-analysis"],
    notes: "Employee time patterns show signs of manipulation. Requires HR investigation.",
    assignedTo: "HR Manager",
    priority: 2,
    estimatedResolutionTime: "1 day",
    preventionMeasures: [
      "Random time clock audits",
      "Biometric verification",
      "Manager spot checks",
      "Time tracking training"
    ]
  },
  {
    id: "3",
    type: "inventory",
    severity: "medium",
    title: "Inventory Shrinkage Spike",
    description: "Unusual inventory loss detected in electronics section, 15% higher than normal rates.",
    detectedAt: "2024-01-15T11:45:00Z",
    confidence: 78,
    riskScore: 65,
    affectedEntity: "Electronics Department",
    location: "Store DT001",
    amount: 2300,
    status: "new",
    evidence: [
      "15% increase in shrinkage rate",
      "Focus on high-value items",
      "Pattern matches known theft methods",
      "Correlates with staff schedule changes"
    ],
    patterns: [
      "Shrinkage rate spike",
      "High-value item focus",
      "Time pattern correlation",
      "Staff schedule alignment"
    ],
    recommendations: [
      "Increase security presence",
      "Review surveillance footage",
      "Audit inventory procedures",
      "Staff training reinforcement"
    ],
    autoResolved: false,
    falsePositiveRate: 0.15,
    similarAnomalies: 2,
    impact: {
      financial: 2300,
      operational: 4,
      reputation: 3
    },
    timeline: [
      {
        timestamp: "2024-01-15T11:45:00Z",
        event: "Shrinkage Alert",
        actor: "AI System",
        details: "Inventory loss rate exceeded threshold"
      }
    ],
    relatedTransactions: [],
    relatedEmployees: ["EMP-003", "EMP-004"],
    relatedCustomers: [],
    tags: ["inventory", "shrinkage", "theft", "electronics"],
    notes: "Electronics department showing unusual loss patterns. Security review needed.",
    priority: 3,
    estimatedResolutionTime: "3 days",
    preventionMeasures: [
      "Enhanced security measures",
      "Inventory audit procedures",
      "Staff training updates",
      "Surveillance system review"
    ]
  }
];

export const AnomalyDetectorView = ({ onViewChange }: AnomalyDetectorViewProps) => {
  const [anomalies, setAnomalies] = useState<Anomaly[]>(mockAnomalies);
  const [filterType, setFilterType] = useState("all");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedAnomaly, setSelectedAnomaly] = useState<Anomaly | null>(null);
  const [autoDetection, setAutoDetection] = useState(true);
  const [realTimeMonitoring, setRealTimeMonitoring] = useState(true);

  const filteredAnomalies = anomalies.filter(anomaly => {
    const matchesType = filterType === "all" || anomaly.type === filterType;
    const matchesSeverity = filterSeverity === "all" || anomaly.severity === filterSeverity;
    const matchesStatus = filterStatus === "all" || anomaly.status === filterStatus;
    return matchesType && matchesSeverity && matchesStatus;
  });

  const stats = {
    totalAnomalies: anomalies.length,
    criticalAnomalies: anomalies.filter(a => a.severity === 'critical').length,
    newAnomalies: anomalies.filter(a => a.status === 'new').length,
    resolvedAnomalies: anomalies.filter(a => a.status === 'resolved').length,
    totalRiskScore: anomalies.reduce((sum, a) => sum + a.riskScore, 0) / anomalies.length,
    totalFinancialImpact: anomalies.reduce((sum, a) => sum + (a.amount || 0), 0),
    falsePositiveRate: anomalies.reduce((sum, a) => sum + a.falsePositiveRate, 0) / anomalies.length
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'false_positive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'fraud': return Shield;
      case 'time_clock': return Clock;
      case 'inventory': return Package;
      case 'transaction': return DollarSign;
      case 'employee': return Users;
      case 'customer': return User;
      case 'system': return Cpu;
      default: return AlertTriangle;
    }
  };

  const handleAnomalyAction = (anomalyId: string, action: string) => {
    setAnomalies(prev => prev.map(anomaly => 
      anomaly.id === anomalyId 
        ? { ...anomaly, status: action as any }
        : anomaly
    ));
    
    toast({
      title: "Action Taken",
      description: `Anomaly ${action} successfully`
    });
  };

  return (
    <div className="p-6 space-y-6 backdrop-blur-glass">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Anomaly Detector</h1>
          <p className="text-muted-foreground">
            Advanced fraud detection, time clock monitoring, and discrepancy analysis
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Switch
              checked={autoDetection}
              onCheckedChange={setAutoDetection}
            />
            <span className="text-sm">Auto Detection</span>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={realTimeMonitoring}
              onCheckedChange={setRealTimeMonitoring}
            />
            <span className="text-sm">Real-time</span>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Anomaly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Anomalies</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAnomalies}</div>
            <p className="text-xs text-muted-foreground">
              {stats.newAnomalies} new, {stats.criticalAnomalies} critical
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRiskScore.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              Average risk level
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Financial Impact</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalFinancialImpact.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Potential losses prevented
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(100 - stats.falsePositiveRate * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Detection accuracy
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Anomaly Detection Dashboard</CardTitle>
          <CardDescription>
            Monitor and manage detected anomalies across all business areas
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
              <option value="fraud">Fraud</option>
              <option value="time_clock">Time Clock</option>
              <option value="inventory">Inventory</option>
              <option value="transaction">Transaction</option>
              <option value="employee">Employee</option>
              <option value="customer">Customer</option>
              <option value="system">System</option>
            </select>
            <select 
              value={filterSeverity} 
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 hover:bg-gray-50 focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors"
            >
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 hover:bg-gray-50 focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
              <option value="false_positive">False Positive</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Anomalies List */}
      <div className="space-y-4">
        {filteredAnomalies.map((anomaly) => {
          const TypeIcon = getTypeIcon(anomaly.type);
          return (
            <Card key={anomaly.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <TypeIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold">{anomaly.title}</h3>
                        <Badge className={getSeverityColor(anomaly.severity)}>
                          {anomaly.severity}
                        </Badge>
                        <Badge className={getStatusColor(anomaly.status)}>
                          {anomaly.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{anomaly.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Confidence:</span>
                          <div className="font-medium">{anomaly.confidence}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Risk Score:</span>
                          <div className="font-medium">{anomaly.riskScore}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Amount:</span>
                          <div className="font-medium">${anomaly.amount?.toLocaleString() || 'N/A'}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Detected:</span>
                          <div className="font-medium">
                            {new Date(anomaly.detectedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {anomaly.tags.map((tag, index) => (
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
                      onClick={() => setSelectedAnomaly(anomaly)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {anomaly.status === 'new' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleAnomalyAction(anomaly.id, 'investigating')}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Investigate
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAnomalyAction(anomaly.id, 'false_positive')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          False Positive
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

      {/* Anomaly Detail Modal */}
      {selectedAnomaly && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  {React.createElement(getTypeIcon(selectedAnomaly.type), { className: "h-6 w-6 text-red-600" })}
                </div>
                <div>
                  <CardTitle>{selectedAnomaly.title}</CardTitle>
                  <CardDescription>{selectedAnomaly.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="evidence">Evidence</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="actions">Actions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Anomaly Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span>Type:</span>
                          <Badge className={getSeverityColor(selectedAnomaly.severity)}>
                            {selectedAnomaly.type}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Severity:</span>
                          <Badge className={getSeverityColor(selectedAnomaly.severity)}>
                            {selectedAnomaly.severity}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Confidence:</span>
                          <span className="font-medium">{selectedAnomaly.confidence}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Risk Score:</span>
                          <span className="font-medium">{selectedAnomaly.riskScore}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Affected Entity:</span>
                          <span className="font-medium">{selectedAnomaly.affectedEntity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Location:</span>
                          <span className="font-medium">{selectedAnomaly.location}</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Impact Analysis</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span>Financial Impact:</span>
                          <span className="font-medium">${selectedAnomaly.impact.financial.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Operational Impact:</span>
                          <span className="font-medium">{selectedAnomaly.impact.operational}/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Reputation Impact:</span>
                          <span className="font-medium">{selectedAnomaly.impact.reputation}/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span>False Positive Rate:</span>
                          <span className="font-medium">{(selectedAnomaly.falsePositiveRate * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Similar Anomalies:</span>
                          <span className="font-medium">{selectedAnomaly.similarAnomalies}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="evidence" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Evidence & Patterns</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Evidence</h4>
                        <ul className="space-y-1">
                          {selectedAnomaly.evidence.map((item, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Patterns Detected</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedAnomaly.patterns.map((pattern, index) => (
                            <Badge key={index} variant="outline">{pattern}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="timeline" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Event Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedAnomaly.timeline.map((event, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Clock className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-6">
                                <span className="font-medium">{event.event}</span>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(event.timestamp).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">{event.details}</p>
                              <p className="text-xs text-muted-foreground">Actor: {event.actor}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="actions" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recommended Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Immediate Actions</h4>
                        <ul className="space-y-1">
                          {selectedAnomaly.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Prevention Measures</h4>
                        <ul className="space-y-1">
                          {selectedAnomaly.preventionMeasures.map((measure, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <Shield className="h-4 w-4 text-green-600 mt-0.5" />
                              <span className="text-sm">{measure}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setSelectedAnomaly(null)}>
                  Close
                </Button>
                <Button onClick={() => handleAnomalyAction(selectedAnomaly.id, 'investigating')}>
                  Take Action
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
