import { OverviewDashboard } from "./views/OverviewDashboard";
import { StoresView } from "./views/StoresView";
import { EmployeesView } from "./views/EmployeesView";
import { InventoryView } from "./views/InventoryView";
import { ReportsView } from "./views/ReportsView";
import { AlertsView } from "./views/AlertsView";
import { SettingsView } from "./views/SettingsView";
import { AIInsightsView } from "./views/AIInsightsView";
import { Customer360View } from "./views/Customer360View";
import { AutomationView } from "./views/AutomationView";

type ViewType = 'overview' | 'stores' | 'employees' | 'inventory' | 'reports' | 'alerts' | 'settings' | 'ai-insights' | 'customer-360' | 'automation';

interface DashboardContentProps {
  currentView: ViewType;
  userProfile: any;
  onViewChange: (view: ViewType) => void;
}

export const DashboardContent = ({ currentView, userProfile, onViewChange }: DashboardContentProps) => {
  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <OverviewDashboard userProfile={userProfile} onViewChange={onViewChange} />;
      case 'stores':
        return <StoresView />;
      case 'employees':
        return <EmployeesView onViewChange={onViewChange} />;
      case 'inventory':
        return <InventoryView />;
      case 'reports':
        return <ReportsView onViewChange={onViewChange} />;
      case 'alerts':
        return <AlertsView />;
      case 'settings':
        return <SettingsView />;
      case 'ai-insights':
        return <AIInsightsView onViewChange={onViewChange} />;
      case 'customer-360':
        return <Customer360View onViewChange={onViewChange} />;
      case 'automation':
        return <AutomationView onViewChange={onViewChange} />;
      default:
        return <OverviewDashboard userProfile={userProfile} onViewChange={onViewChange} />;
    }
  };

  return (
    <div className="h-full">
      {renderView()}
    </div>
  );
};
