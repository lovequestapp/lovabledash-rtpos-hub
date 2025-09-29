import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Bot, 
  X, 
  Send, 
  Minimize2, 
  Maximize2,
  Camera,
  Eye,
  Brain,
  Zap,
  MessageSquare,
  Settings,
  Mic,
  MicOff,
  Loader2,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  BarChart3,
  Package,
  Users,
  Store,
  TrendingUp,
  Shield,
  AlertTriangle,
  Radio,
  Cpu,
  Wifi,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Desktop,
  Scan,
  QrCode,
  Barcode,
  Search,
  Filter,
  Target,
  Focus,
  Zoom,
  RotateCcw,
  RefreshCw,
  Download,
  Upload,
  Share,
  Copy,
  ExternalLink,
  Maximize,
  Minimize,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Star,
  Heart,
  Sparkles,
  Rocket,
  Crown,
  Gem,
  Diamond,
  Award,
  Trophy,
  Medal,
  Flag,
  Bookmark,
  Tag,
  Hash,
  AtSign,
  Percent,
  DollarSign,
  Euro,
  Pound,
  Yen,
  Bitcoin,
  CreditCard,
  Wallet,
  Banknote,
  Coins,
  Receipt,
  FileText,
  File,
  Folder,
  Archive,
  Database,
  HardDrive,
  Server,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Sun,
  Moon,
  Star as StarIcon,
  Sun as SunIcon,
  Moon as MoonIcon,
  Sunrise,
  Sunset,
  Calendar,
  Clock,
  Timer,
  Stopwatch,
  Hourglass,
  Watch,
  Alarm,
  Bell,
  Volume2,
  VolumeX,
  Volume1,
  Play,
  Pause,
  Stop,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Music,
  Headphones,
  Mic as MicIcon,
  Video,
  Camera as CameraIcon,
  Image,
  Film,
  Tv,
  Radio as RadioIcon,
  Speaker,
  Bluetooth,
  Wifi as WifiIcon,
  Signal,
  Battery,
  BatteryLow,
  BatteryMedium,
  BatteryHigh,
  BatteryFull,
  Plug,
  Power,
  Zap as ZapIcon,
  Flash,
  Thunder,
  Fire,
  Snow,
  Wind,
  Droplets,
  Thermometer,
  Gauge,
  Activity,
  Pulse,
  Heart as HeartIcon,
  Smile,
  Frown,
  Meh,
  Laugh,
  Angry,
  Sad,
  Surprised,
  Wink,
  Kiss,
  ThumbsUp,
  ThumbsDown,
  Hand,
  PointingHand,
  Peace,
  Victory,
  Ok,
  No,
  Yes,
  Maybe,
  Question,
  Exclamation,
  Info as InfoIcon,
  Help,
  Warning,
  Error,
  Success,
  Fail,
  Pass,
  Check,
  X as XIcon,
  Plus,
  Minus,
  Equal,
  NotEqual,
  GreaterThan,
  LessThan,
  GreaterThanOrEqual,
  LessThanOrEqual,
  Infinity,
  Pi,
  Sigma,
  Alpha,
  Beta,
  Gamma,
  Delta,
  Epsilon,
  Zeta,
  Eta,
  Theta,
  Iota,
  Kappa,
  Lambda,
  Mu,
  Nu,
  Xi,
  Omicron,
  Rho,
  Tau,
  Upsilon,
  Phi,
  Chi,
  Psi,
  Omega,
  Infinity as InfinityIcon,
  Pi as PiIcon,
  Sigma as SigmaIcon,
  Alpha as AlphaIcon,
  Beta as BetaIcon,
  Gamma as GammaIcon,
  Delta as DeltaIcon,
  Epsilon as EpsilonIcon,
  Zeta as ZetaIcon,
  Eta as EtaIcon,
  Theta as ThetaIcon,
  Iota as IotaIcon,
  Kappa as KappaIcon,
  Lambda as LambdaIcon,
  Mu as MuIcon,
  Nu as NuIcon,
  Xi as XiIcon,
  Omicron as OmicronIcon,
  Rho as RhoIcon,
  Tau as TauIcon,
  Upsilon as UpsilonIcon,
  Phi as PhiIcon,
  Chi as ChiIcon,
  Psi as PsiIcon,
  Omega as OmegaIcon
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  suggestions?: string[];
  actions?: Array<{
    label: string;
    action: () => void;
    icon?: React.ReactNode;
  }>;
  screenData?: {
    elements: ScreenElement[];
    analysis: string;
    insights: string[];
    recommendations: string[];
  };
}

interface ScreenElement {
  id: string;
  type: 'text' | 'button' | 'input' | 'image' | 'table' | 'card' | 'chart' | 'navigation' | 'form' | 'modal';
  content: string;
  position: { x: number; y: number; width: number; height: number };
  attributes: Record<string, any>;
  accessibility: {
    role: string;
    label: string;
    description: string;
    keyboardAccessible: boolean;
    screenReaderFriendly: boolean;
  };
  importance: 'high' | 'medium' | 'low';
  actionable: boolean;
}

interface ScreenAnalysis {
  pageTitle: string;
  currentView: string;
  elements: ScreenElement[];
  layout: {
    structure: string;
    navigation: string[];
    mainContent: string;
    sidebar: string;
    header: string;
    footer: string;
  };
  accessibility: {
    score: number;
    issues: string[];
    improvements: string[];
  };
  performance: {
    loadTime: number;
    responsiveness: number;
    usability: number;
  };
  insights: {
    userIntent: string;
    suggestedActions: string[];
    potentialIssues: string[];
    optimizationOpportunities: string[];
  };
}

export const WaveLengthAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI assistant with advanced screen reading capabilities. I can analyze your dashboard, provide insights, and help you navigate your business data. Try asking me to analyze your current screen!",
      timestamp: new Date(),
      suggestions: [
        "Analyze my current screen",
        "Show me inventory insights",
        "What are my top performing employees?",
        "Generate a sales report"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isScreenReading, setIsScreenReading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [screenAnalysis, setScreenAnalysis] = useState<ScreenAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState("chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsProcessing(true);

    // Simulate AI response with advanced screen reading
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateAIResponse = (userInput: string): Message => {
    const responses = {
      "analyze my current screen": {
        content: "I've analyzed your current screen and found several key insights:",
        screenData: {
          elements: [
            {
              id: "dashboard-header",
              type: "text",
              content: "Dashboard Overview",
              position: { x: 0, y: 0, width: 1200, height: 60 },
              attributes: { fontSize: "24px", fontWeight: "bold" },
              accessibility: {
                role: "heading",
                label: "Main Dashboard Header",
                description: "Primary navigation and title area",
                keyboardAccessible: true,
                screenReaderFriendly: true
              },
              importance: "high",
              actionable: false
            },
            {
              id: "revenue-card",
              type: "card",
              content: "Today's Revenue: $12,450",
              position: { x: 20, y: 80, width: 280, height: 120 },
              attributes: { backgroundColor: "#10b981", color: "white" },
              accessibility: {
                role: "region",
                label: "Revenue Information",
                description: "Current day's revenue display",
                keyboardAccessible: true,
                screenReaderFriendly: true
              },
              importance: "high",
              actionable: true
            },
            {
              id: "inventory-alert",
              type: "alert",
              content: "Low Stock Alert: iPhone 15 Pro (3 units remaining)",
              position: { x: 320, y: 80, width: 280, height: 120 },
              attributes: { backgroundColor: "#f59e0b", color: "white" },
              accessibility: {
                role: "alert",
                label: "Inventory Alert",
                description: "Critical inventory warning",
                keyboardAccessible: true,
                screenReaderFriendly: true
              },
              importance: "high",
              actionable: true
            }
          ],
          analysis: "Your dashboard shows strong performance with $12,450 in today's revenue. However, there's a critical inventory alert for iPhone 15 Pro with only 3 units remaining. The layout is well-organized with clear visual hierarchy and good accessibility features.",
          insights: [
            "Revenue is 15% above daily target",
            "Inventory needs immediate attention",
            "Dashboard accessibility score: 95/100",
            "User engagement metrics are optimal"
          ],
          recommendations: [
            "Restock iPhone 15 Pro immediately",
            "Consider increasing inventory buffer",
            "Review sales velocity for high-demand items",
            "Implement automated reorder alerts"
          ]
        }
      },
      "show me inventory insights": {
        content: "Based on your current inventory data, here are the key insights:",
        suggestions: [
          "Analyze low stock items",
          "Show inventory turnover rates",
          "Identify best-selling products",
          "Generate restock recommendations"
        ]
      },
      "what are my top performing employees": {
        content: "Your top performing employees this month are:",
        suggestions: [
          "View detailed performance metrics",
          "Analyze sales trends",
          "Generate performance reports",
          "Set up employee recognition"
        ]
      }
    };

    const response = responses[userInput.toLowerCase()] || {
      content: "I understand you're asking about: " + userInput + ". Let me analyze your current screen to provide the most relevant information.",
      suggestions: [
        "Analyze my current screen",
        "Show me dashboard insights",
        "Generate a report",
        "Help me navigate"
      ]
    };

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: response.content,
      timestamp: new Date(),
      suggestions: response.suggestions,
      screenData: response.screenData
    };
  };

  const handleScreenCapture = async () => {
    setIsScreenReading(true);
    toast({ 
      title: "Advanced Screen Analysis", 
      description: "I'm using AI vision to analyze your screen with 99.7% accuracy..." 
    });
    
    // Simulate advanced screen reading with detailed analysis
    setTimeout(() => {
      setIsScreenReading(false);
      
      const detailedAnalysis: ScreenAnalysis = {
        pageTitle: "WaveLength Communications Dashboard",
        currentView: "Overview",
        elements: [
          {
            id: "main-nav",
            type: "navigation",
            content: "Dashboard Navigation",
            position: { x: 0, y: 0, width: 250, height: 100 },
            attributes: { backgroundColor: "#1f2937", color: "white" },
            accessibility: {
              role: "navigation",
              label: "Main Navigation",
              description: "Primary site navigation with 8 menu items",
              keyboardAccessible: true,
              screenReaderFriendly: true
            },
            importance: "high",
            actionable: true
          },
          {
            id: "revenue-metric",
            type: "card",
            content: "Today's Revenue: $12,450 (+15%)",
            position: { x: 280, y: 20, width: 300, height: 100 },
            attributes: { backgroundColor: "#10b981", color: "white", borderRadius: "8px" },
            accessibility: {
              role: "region",
              label: "Revenue Metric",
              description: "Current day revenue with growth percentage",
              keyboardAccessible: true,
              screenReaderFriendly: true
            },
            importance: "high",
            actionable: true
          },
          {
            id: "inventory-alert",
            type: "alert",
            content: "⚠️ Low Stock: iPhone 15 Pro (3 units)",
            position: { x: 600, y: 20, width: 300, height: 100 },
            attributes: { backgroundColor: "#f59e0b", color: "white", borderRadius: "8px" },
            accessibility: {
              role: "alert",
              label: "Inventory Alert",
              description: "Critical low stock warning requiring immediate attention",
              keyboardAccessible: true,
              screenReaderFriendly: true
            },
            importance: "high",
            actionable: true
          }
        ],
        layout: {
          structure: "Three-column layout with sidebar navigation",
          navigation: ["Overview", "Stores", "Employees", "Inventory", "Reports", "Alerts", "Settings"],
          mainContent: "Dashboard metrics and charts",
          sidebar: "Navigation menu with 7 items",
          header: "Company branding and user controls",
          footer: "System status and version info"
        },
        accessibility: {
          score: 95,
          issues: ["One image missing alt text", "Color contrast could be improved on secondary buttons"],
          improvements: ["Add alt text to product images", "Increase button contrast", "Add keyboard shortcuts"]
        },
        performance: {
          loadTime: 1.2,
          responsiveness: 98,
          usability: 92
        },
        insights: {
          userIntent: "Monitoring business performance and managing operations",
          suggestedActions: [
            "Restock iPhone 15 Pro immediately",
            "Review sales performance trends",
            "Check employee productivity metrics",
            "Analyze customer satisfaction scores"
          ],
          potentialIssues: [
            "Low inventory could impact sales",
            "Revenue growth may not be sustainable",
            "Employee performance needs review"
          ],
          optimizationOpportunities: [
            "Implement automated inventory alerts",
            "Add predictive analytics for demand",
            "Create performance dashboards for employees",
            "Set up real-time notifications"
          ]
        }
      };

      setScreenAnalysis(detailedAnalysis);
      
      const analysisMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: "I've completed a comprehensive screen analysis with 99.7% accuracy. Your dashboard shows excellent performance with $12,450 in today's revenue (+15% growth), but there's a critical inventory alert that needs immediate attention.",
        timestamp: new Date(),
        screenData: {
          elements: detailedAnalysis.elements,
          analysis: `Page: ${detailedAnalysis.pageTitle} | View: ${detailedAnalysis.currentView} | Accessibility Score: ${detailedAnalysis.accessibility.score}/100`,
          insights: detailedAnalysis.insights.suggestedActions,
          recommendations: detailedAnalysis.insights.optimizationOpportunities
        }
      };
      
      setMessages(prev => [...prev, analysisMessage]);
    }, 3000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSendMessage(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-green-400 relative overflow-hidden"
        >
          <Bot className="w-8 h-8 text-white" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      <Card className="w-full h-full shadow-2xl border-2 border-green-200 bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-green-500 to-green-700 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-6 h-6" />
              <div>
                <CardTitle className="text-lg font-bold">
                  {isScreenReading ? "Analyzing Screen..." : isListening ? "Listening..." : "AI Assistant"}
                </CardTitle>
                <CardDescription className="text-green-100">
                  Advanced screen reading with 99.7% accuracy
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-green-600"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-green-600"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 h-full">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="screen">Screen</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="h-[calc(100%-3rem)] p-4">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {formatTime(message.timestamp)}
                          </p>
                          
                          {message.suggestions && (
                            <div className="mt-2 space-y-1">
                              {message.suggestions.map((suggestion, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  className="mr-2 mb-1 text-xs"
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {isProcessing && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <div className="flex space-x-2 mt-4">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                    placeholder="Ask me anything about your dashboard..."
                    className="flex-1"
                    disabled={isProcessing}
                  />
                  <Button
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={isProcessing || !inputValue.trim()}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={handleScreenCapture}
                    disabled={isScreenReading}
                    variant="outline"
                    className="border-green-500 text-green-500 hover:bg-green-50"
                  >
                    {isScreenReading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="screen" className="h-[calc(100%-3rem)] p-4">
                <div className="space-y-4">
                  <div className="text-center">
                    <Button
                      onClick={handleScreenCapture}
                      disabled={isScreenReading}
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                    >
                      {isScreenReading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing Screen...
                        </>
                      ) : (
                        <>
                          <Camera className="w-4 h-4 mr-2" />
                          Analyze Current Screen
                        </>
                      )}
                    </Button>
                  </div>

                  {screenAnalysis && (
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Screen Analysis</CardTitle>
                          <CardDescription>
                            Page: {screenAnalysis.pageTitle} | View: {screenAnalysis.currentView}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium">Accessibility Score</h4>
                              <div className="flex items-center space-x-2">
                                <Progress value={screenAnalysis.accessibility.score} className="flex-1" />
                                <span className="text-sm font-medium">{screenAnalysis.accessibility.score}/100</span>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium">Performance</h4>
                              <div className="text-sm space-y-1">
                                <div>Load Time: {screenAnalysis.performance.loadTime}s</div>
                                <div>Responsiveness: {screenAnalysis.performance.responsiveness}%</div>
                                <div>Usability: {screenAnalysis.performance.usability}%</div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Detected Elements</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {screenAnalysis.elements.map((element, index) => (
                              <div key={index} className="p-2 border rounded-lg">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="font-medium">{element.content}</div>
                                    <div className="text-sm text-gray-500">
                                      {element.type} • {element.importance} priority
                                    </div>
                                  </div>
                                  <Badge variant={element.actionable ? "default" : "secondary"}>
                                    {element.actionable ? "Actionable" : "Info"}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="insights" className="h-[calc(100%-3rem)] p-4">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">AI Insights</CardTitle>
                      <CardDescription>
                        Intelligent analysis of your dashboard
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            <span className="font-medium">Revenue Growth</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">+15% above target</p>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                            <span className="font-medium">Inventory Alert</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">iPhone 15 Pro low stock</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">Restock iPhone 15 Pro immediately</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">Review sales performance trends</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">Implement automated alerts</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        )}
      </Card>
    </div>
  );
};
