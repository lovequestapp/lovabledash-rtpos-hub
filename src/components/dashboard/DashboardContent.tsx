import { OverviewDashboard } from "./views/OverviewDashboard";

type ViewType = 'overview' | 'stores' | 'employees' | 'inventory' | 'reports' | 'alerts' | 'settings';

interface DashboardContentProps {
  currentView: ViewType;
  userProfile: any;
}

export const DashboardContent = ({ currentView, userProfile }: DashboardContentProps) => {
  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <OverviewDashboard userProfile={userProfile} />;
      case 'stores':
        return <div className="p-6">Stores Management (Coming Soon)</div>;
      case 'employees':
        return <div className="p-6">Employee Management (Coming Soon)</div>;
      case 'inventory':
        return <div className="p-6">Inventory Management (Coming Soon)</div>;
      case 'reports':
        return <div className="p-6">Reports & Analytics (Coming Soon)</div>;
      case 'alerts':
        return <div className="p-6">Alert Management (Coming Soon)</div>;
      case 'settings':
        return <div className="p-6">Settings (Coming Soon)</div>;
      default:
        return <OverviewDashboard userProfile={userProfile} />;
    }
  };

  return (
    <div className="h-full">
      {renderView()}
    </div>
  );
};