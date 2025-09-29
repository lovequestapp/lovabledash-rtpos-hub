import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  LogOut, 
  Building2, 
  Home, 
  Store, 
  Package, 
  BarChart3, 
  AlertTriangle, 
  Users, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Truck,
  Warehouse,
  Shield,
  Zap,
  Star,
  Target,
  Globe,
  Database,
  FileText,
  PieChart,
  LineChart,
  TrendingDown,
  AlertCircle,
  Info,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  MoreHorizontal,
  Brain,
  User,
  Bot,
  Sparkles,
  Rocket,
  Eye,
  Heart,
  MessageCircle,
  Lightbulb,
  Cpu,
  Network,
  Layers,
  Workflow
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  id: string;
  label: string;
  icon: any;
  href?: string;
  badge?: string;
  badgeColor?: string;
  children?: SidebarItem[];
  isNew?: boolean;
  isRevolutionary?: boolean;
}

type ViewType = 'overview' | 'stores' | 'employees' | 'inventory' | 'reports' | 'alerts' | 'settings' | 'ai-insights' | 'customer-360' | 'automation';

interface DashboardSidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const DashboardSidebar = ({ currentView, onViewChange, collapsed, onToggleCollapse }: DashboardSidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(['core']);

  const sidebarItems: SidebarItem[] = [
    {
      id: 'core',
      label: 'Core Operations',
      icon: Building2,
      children: [
        {
          id: 'overview',
          label: 'Dashboard',
          icon: Home,
          href: '/dashboard'
        },
        {
          id: 'stores',
          label: 'Stores',
          icon: Store,
          badge: '3',
          badgeColor: 'bg-blue-100 text-blue-800'
        },
        {
          id: 'employees',
          label: 'Employees',
          icon: Users,
          badge: '8',
          badgeColor: 'bg-green-100 text-green-800'
        },
        {
          id: 'inventory',
          label: 'Inventory',
          icon: Package,
          badge: '12',
          badgeColor: 'bg-yellow-100 text-yellow-800'
        }
      ]
    },
    {
      id: 'revolutionary',
      label: '🚀 Revolutionary Features',
      icon: Rocket,
      isRevolutionary: true,
      children: [
        {
          id: 'ai-insights',
          label: 'AI Business Intelligence',
          icon: Brain,
          badge: 'NEW',
          badgeColor: 'bg-purple-100 text-purple-800',
          isNew: true
        },
        {
          id: 'customer-360',
          label: 'Customer 360° View',
          icon: Eye,
          badge: 'BETA',
          badgeColor: 'bg-pink-100 text-pink-800',
          isNew: true
        },
        {
          id: 'automation',
          label: 'Smart Automation',
          icon: Zap,
          badge: 'AI',
          badgeColor: 'bg-orange-100 text-orange-800',
          isNew: true
        }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics & Intelligence',
      icon: BarChart3,
      children: [
        {
          id: 'reports',
          label: 'Reports',
          icon: FileText
        },
        {
          id: 'alerts',
          label: 'Alerts',
          icon: AlertTriangle,
          badge: '3',
          badgeColor: 'bg-red-100 text-red-800'
        }
      ]
    },
    {
      id: 'advanced',
      label: 'Advanced Features',
      icon: Layers,
      children: [
        {
          id: 'settings',
          label: 'Settings',
          icon: Settings
        }
      ]
    }
  ];

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemClick = (itemId: string) => {
    if (itemId === 'ai-insights' || itemId === 'customer-360' || itemId === 'automation') {
      onViewChange(itemId as ViewType);
    } else {
      onViewChange(itemId as ViewType);
    }
  };

  return (
    <div className={cn(
      "flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">WaveLength</h1>
              <p className="text-xs text-gray-500">Communications</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="p-2"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {sidebarItems.map((item) => (
          <div key={item.id}>
            {item.children ? (
              <div>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-left font-medium",
                    collapsed ? "px-2" : "px-3",
                    item.isRevolutionary && "bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200"
                  )}
                  onClick={() => toggleExpanded(item.id)}
                >
                  <item.icon className={cn("h-4 w-4", collapsed ? "mx-auto" : "mr-2")} />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {expandedItems.includes(item.id) ? (
                        <ChevronLeft className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </>
                  )}
                </Button>
                
                {expandedItems.includes(item.id) && !collapsed && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Button
                        key={child.id}
                        variant={currentView === child.id ? "default" : "ghost"}
                        className={cn(
                          "w-full justify-start text-left",
                          child.isNew && "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200"
                        )}
                        onClick={() => handleItemClick(child.id)}
                      >
                        <child.icon className="h-4 w-4 mr-2" />
                        <span className="flex-1">{child.label}</span>
                        {child.badge && (
                          <Badge 
                            variant="secondary" 
                            className={cn(
                              "ml-2 text-xs",
                              child.badgeColor
                            )}
                          >
                            {child.badge}
                          </Badge>
                        )}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Button
                variant={currentView === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start text-left",
                  collapsed ? "px-2" : "px-3"
                )}
                onClick={() => handleItemClick(item.id)}
              >
                <item.icon className={cn("h-4 w-4", collapsed ? "mx-auto" : "mr-2")} />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "ml-2 text-xs",
                          item.badgeColor
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            )}
          </div>
        ))}
      </nav>

      {/* Revolutionary Features Banner */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-3 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">Revolutionary Features</span>
            </div>
            <p className="text-xs opacity-90">
              Experience the future of retail with AI-powered insights, automation, and customer intelligence.
            </p>
            <Button 
              size="sm" 
              variant="secondary" 
              className="mt-2 w-full text-xs"
              onClick={() => onViewChange('ai-insights')}
            >
              Explore Now
            </Button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@wavelength.com</p>
            </div>
          )}
          <Button variant="ghost" size="sm" className="p-2">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
