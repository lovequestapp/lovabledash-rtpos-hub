import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  AlertTriangle
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
}

interface WaveLengthAIProps {
  onScreenCapture?: (data: string) => void;
}

export const WaveLengthAI = ({ onScreenCapture }: WaveLengthAIProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm WaveLength AI, your intelligent assistant. I can help you with inventory management, employee tracking, fraud detection, and much more!",
      timestamp: new Date(),
      suggestions: [
        "Show me inventory analytics",
        "Check employee performance",
        "Scan for fraud patterns",
        "Analyze current screen"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isScreenReading, setIsScreenReading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callOpenAI = async (userMessage: string, conversationHistory: Message[]) => {
    // For now, return a mock response to avoid API key issues
    // This will be replaced with actual OpenAI integration once deployment works
    return "I'm WaveLength AI, your intelligent assistant! I can help you with inventory management, employee tracking, fraud detection, and business analytics. How can I assist you today?";
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsProcessing(true);

    try {
      const aiResponse = await callOpenAI(content, messages);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        suggestions: generateSuggestions(content, aiResponse),
        actions: generateActions(content, aiResponse)
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I apologize, but I'm experiencing some technical difficulties. Please try again, or feel free to ask me about inventory management, employee tracking, or fraud detection.",
        timestamp: new Date(),
        suggestions: [
          "Help with inventory",
          "Check employee data",
          "Analyze current screen",
          "Generate business insights"
        ]
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const generateSuggestions = (userInput: string, aiResponse: string): string[] => {
    const input = userInput.toLowerCase();
    const response = aiResponse.toLowerCase();
    
    if (input.includes('inventory') || response.includes('inventory')) {
      return [
        "Show low stock items",
        "Analyze inventory trends",
        "Check fraud risk items",
        "Generate restock recommendations"
      ];
    }
    
    if (input.includes('employee') || response.includes('employee')) {
      return [
        "Show performance metrics",
        "Create training plan",
        "Schedule performance reviews",
        "Analyze team productivity"
      ];
    }
    
    if (input.includes('fraud') || response.includes('fraud')) {
      return [
        "Investigate fraud patterns",
        "Review flagged transactions",
        "Generate security report",
        "Set up fraud alerts"
      ];
    }
    
    return [
      "Help with inventory",
      "Check employee data",
      "Analyze current screen",
      "Generate business insights"
    ];
  };

  const generateActions = (userInput: string, aiResponse: string): Array<{
    label: string;
    action: () => void;
    icon?: React.ReactNode;
  }> => {
    const input = userInput.toLowerCase();
    const response = aiResponse.toLowerCase();
    
    if (input.includes('inventory') || response.includes('inventory')) {
      return [
        {
          label: "View Analytics",
          action: () => toast({ title: "Opening Inventory Analytics", description: "Loading detailed inventory insights..." }),
          icon: <BarChart3 className="w-4 h-4" />
        },
        {
          label: "Generate Report",
          action: () => toast({ title: "Generating Report", description: "Creating comprehensive inventory report..." }),
          icon: <Package className="w-4 h-4" />
        }
      ];
    }
    
    if (input.includes('employee') || response.includes('employee')) {
      return [
        {
          label: "View Team Performance",
          action: () => toast({ title: "Loading Team Performance", description: "Analyzing employee metrics and productivity..." }),
          icon: <Users className="w-4 h-4" />
        },
        {
          label: "Generate Training Plan",
          action: () => toast({ title: "Creating Training Plan", description: "Developing personalized training recommendations..." }),
          icon: <Lightbulb className="w-4 h-4" />
        }
      ];
    }
    
    if (input.includes('fraud') || response.includes('fraud')) {
      return [
        {
          label: "Investigate Now",
          action: () => toast({ title: "Starting Investigation", description: "Analyzing fraud patterns and generating security report..." }),
          icon: <Shield className="w-4 h-4" />
        },
        {
          label: "View Alerts",
          action: () => toast({ title: "Loading Security Alerts", description: "Displaying all fraud detection alerts..." }),
          icon: <AlertTriangle className="w-4 h-4" />
        }
      ];
    }
    
    return [];
  };

  const handleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true);
      toast({ title: "Listening...", description: "Speak now, I'm listening to your voice input!" });
      
      setTimeout(() => {
        setIsListening(false);
        const voiceText = "Show me the inventory analytics";
        setInputValue(voiceText);
        toast({ title: "Voice Input Received", description: `I heard: "${voiceText}"` });
      }, 3000);
    } else {
      setIsListening(false);
    }
  };

  const handleScreenCapture = () => {
    setIsScreenReading(true);
    toast({ title: "Capturing Screen", description: "I'm analyzing what's currently on your screen..." });
    
    setTimeout(() => {
      setIsScreenReading(false);
      const screenAnalysis = "I can see you're on the Inventory Management page with 5 items displayed. I've identified 1 low stock alert and 1 high-risk item that needs attention.";
      handleSendMessage(screenAnalysis);
    }, 2000);
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
          className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        >
          <Bot className="w-8 h-8 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]">
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">WaveLength AI</CardTitle>
                <CardDescription className="text-blue-100">
                  {isScreenReading ? "Analyzing screen..." : isListening ? "Listening..." : "Your intelligent assistant"}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0">
            <ScrollArea className="h-80 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.type === 'ai' && (
                          <Bot className="w-4 h-4 mt-1 text-blue-500 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <div className="flex items-center gap-1 mt-2 text-xs opacity-70">
                            <span>{formatTime(message.timestamp)}</span>
                            {message.type === 'ai' && (
                              <Badge variant="secondary" className="text-xs">
                                <Zap className="w-3 h-3 mr-1" />
                                AI
                              </Badge>
                            )}
                          </div>
                          
                          {message.suggestions && (
                            <div className="mt-3 space-y-2">
                              <p className="text-xs font-medium opacity-70">Quick actions:</p>
                              <div className="flex flex-wrap gap-1">
                                {message.suggestions.map((suggestion, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="text-xs h-7"
                                  >
                                    {suggestion}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}

                          {message.actions && (
                            <div className="mt-3 space-y-2">
                              <p className="text-xs font-medium opacity-70">Actions:</p>
                              <div className="space-y-1">
                                {message.actions.map((action, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    onClick={action.action}
                                    className="w-full justify-start text-xs h-8"
                                  >
                                    {action.icon}
                                    <span className="ml-2">{action.label}</span>
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-blue-500" />
                        <div className="flex items-center gap-1">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span className="text-sm">WaveLength AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="border-t p-4 bg-gray-50">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask WaveLength AI anything..."
                    className="pr-20"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage(inputValue);
                      }
                    }}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleVoiceInput}
                      className={`h-6 w-6 p-0 ${isListening ? 'text-red-500' : 'text-gray-500'}`}
                    >
                      {isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleScreenCapture}
                      className="h-6 w-6 p-0 text-gray-500"
                    >
                      <Camera className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isProcessing}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="mt-3 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleScreenCapture}
                  className="text-xs"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Read Screen
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendMessage("Show me analytics")}
                  className="text-xs"
                >
                  <BarChart3 className="w-3 h-3 mr-1" />
                  Analytics
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendMessage("Check for fraud")}
                  className="text-xs"
                >
                  <Shield className="w-3 h-3 mr-1" />
                  Security
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};
