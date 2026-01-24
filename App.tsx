
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewOrderFlow from './pages/NewOrderFlow';
import StitchingHub from './pages/StitchingHub';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'new-order':
        return <NewOrderFlow />;
      case 'stitching-hub':
        return <StitchingHub />;
      case 'customers':
      case 'history':
      case 'logistics':
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 py-20">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <div className="w-8 h-8 border-2 border-slate-300 border-dashed rounded-full" />
            </div>
            <h3 className="text-xl font-bold text-slate-600">Coming Soon</h3>
            <p className="text-sm">The {activeTab} module is currently under development.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
