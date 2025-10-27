import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { 
  Bot, 
  X, 
  Send, 
  Minimize2, 
  Maximize2,
  Camera,
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
  Scan,
  QrCode,
  Barcode,
  Search,
  Filter,
  Target,
  Focus,
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
  Sunrise,
  Sunset,
  Calendar,
  Clock,
  Timer,
  Hourglass,
  Watch,
  Bell,
  Volume2,
  VolumeX,
  Volume1,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Music,
  Headphones,
  Video,
  Image,
  Film,
  Tv,
  Speaker,
  Bluetooth,
  Signal,
  Battery,
  BatteryLow,
  BatteryMedium,
  BatteryFull,
  Plug,
  Power,
  Wind,
  Droplets,
  Thermometer,
  Gauge,
  Activity,
  Smile,
  Frown,
  Meh,
  Laugh,
  ThumbsUp,
  ThumbsDown,
  Hand,
  Info,
  Check,
  Plus,
  Minus,
  Infinity
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

export const StoreManagerAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your StoreManagerAI Assistant. I can help you manage your retail operations, track inventory, analyze sales data, manage employees, and answer any questions about your business dashboard. How can I assist you today?",
      timestamp: new Date(),
      suggestions: [
        "Analyze my current screen",
        "Show me business insights",
        "What are my top performing stores?",
        "Generate a sales report",
        "Help me with inventory management",
        "Analyze customer data"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isScreenReading, setIsScreenReading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [screenAnalysis, setScreenAnalysis] = useState<ScreenAnalysis | null>(null);
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

    // Simulate AI response with advanced business intelligence
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateAIResponse = (userInput: string): Message => {
    const responses = {
      "analyze my current screen": {
        content: "I've analyzed your current screen and found several key insights for StoreManagerAI:",
        screenData: {
          elements: [
            {
              id: "dashboard-header",
              type: "text",
              content: "StoreManagerAI Dashboard",
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
          analysis: "Your StoreManagerAI dashboard shows strong performance with $12,450 in today's revenue. The system is tracking inventory levels across all locations and employee performance metrics. The layout is well-organized with clear visual hierarchy and excellent accessibility features.",
          insights: [
            "Sales volume is 15% above daily target for StoreManagerAI",
            "Low inventory alert needs immediate attention",
            "Dashboard accessibility score: 95/100",
            "Store performance metrics are optimal across all locations"
          ],
          recommendations: [
            "Restock iPhone 15 Pro immediately to avoid stockouts",
            "Consider increasing inventory buffer for high-demand items",
            "Review sales velocity for popular products",
            "Implement automated inventory alerts for StoreManagerAI"
          ]
        }
      },
      "show me business insights": {
        content: "Here are your key business insights for StoreManagerAI:",
        suggestions: [
          "Analyze revenue trends",
          "Review inventory performance",
          "Check employee productivity",
          "Generate customer insights"
        ]
      },
      "what are my top performing stores": {
        content: "Your top performing carriers this month are:",
        suggestions: [
          "View detailed store metrics",
          "Analyze store performance trends",
          "Generate store comparison reports",
          "Set up store performance alerts"
        ]
      },
      "generate a sales report": {
        content: "I'll generate a comprehensive business report for StoreManagerAI:",
        suggestions: [
          "Download PDF report",
          "Email report to stakeholders",
          "Schedule automated reports",
          "Create custom report templates"
        ]
      },
      "help me with inventory management": {
        content: "I can help you optimize your StoreManagerAI inventory management:",
        suggestions: [
          "Analyze stock levels",
          "Identify reorder points",
          "Review inventory turnover",
          "Set up automated alerts"
        ]
      },
      "analyze customer data": {
        content: "Let me analyze your StoreManagerAI customer data:",
        suggestions: [
          "View customer segments",
          "Analyze purchase patterns",
          "Identify high-value customers",
          "Generate customer insights"
        ]
      }
    };

    const response = responses[userInput.toLowerCase()] || {
      content: "I understand you're asking about: " + userInput + ". As your StoreManagerAI Assistant, I can help you with sales analysis, inventory management, employee insights, customer data, and much more. What specific aspect would you like me to focus on?",
      suggestions: [
        "Analyze my current screen",
        "Show me business insights",
        "Generate a sales report",
        "Help me with inventory",
        "Analyze customer data",
        "Review store performance"
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
      description: "I'm using AI vision to analyze your StoreManagerAI dashboard with 99.7% accuracy..." 
    });
    
    // Simulate advanced screen reading with detailed analysis
    setTimeout(() => {
      setIsScreenReading(false);
      
      const detailedAnalysis: ScreenAnalysis = {
        pageTitle: "StoreManagerAI Dashboard",
        currentView: "Overview",
        elements: [
          {
            id: "main-nav",
            type: "navigation",
            content: "Houston Phone Bill Pay - All Carriers Navigation",
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
          header: "StoreManagerAI branding and user controls",
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
          userIntent: "Monitoring StoreManagerAI retail performance and managing operations",
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
        content: "I've completed a comprehensive screen analysis with 99.7% accuracy for your StoreManagerAI dashboard. Your retail operations show excellent performance with $12,450 in today's sales volume (+15% growth), but there's a critical inventory alert that needs immediate attention.",
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
          className="fab-glass"
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
      <Card className="w-full h-full shadow-2xl border-2 border-green-200/30 bg-white/10 backdrop-blur-2xl">
        <CardHeader className="bg-gradient-to-r from-green-500 to-green-700 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-6 h-6" />
              <div>
                <CardTitle className="text-lg font-bold">
                  StoreManagerAI Assistant
                </CardTitle>
                <CardDescription className="text-green-100">
                  {isScreenReading ? "Analyzing screen..." : isListening ? "Listening..." : "Your intelligent business assistant"}
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
            <div className="h-[calc(100%-3rem)] p-4">
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

                        {message.screenData && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <Brain className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-800">Screen Analysis</span>
                            </div>
                            <p className="text-xs text-blue-700 mb-2">{message.screenData.analysis}</p>
                            
                            <div className="grid grid-cols-2 gap-2 mb-2">
                              <div>
                                <h4 className="text-xs font-medium text-blue-800">Insights</h4>
                                <ul className="text-xs text-blue-700 space-y-1">
                                  {message.screenData.insights.slice(0, 2).map((insight, index) => (
                                    <li key={index}>• {insight}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="text-xs font-medium text-blue-800">Recommendations</h4>
                                <ul className="text-xs text-blue-700 space-y-1">
                                  {message.screenData.recommendations.slice(0, 2).map((rec, index) => (
                                    <li key={index}>• {rec}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
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
                  placeholder="Ask me anything about your business..."
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
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};
