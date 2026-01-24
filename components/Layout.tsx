
import React from 'react';
import { NAV_ITEMS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-xl">
            C&C
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Cut & Craft</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Bespoke Tailoring</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id 
                ? 'bg-amber-500 text-slate-900 font-semibold' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">Jamal Din</p>
              <p className="text-[10px] text-slate-500 truncate">Branch: Lahore-1</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-auto relative">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-slate-800 capitalize">
            {activeTab.replace('-', ' ')}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              Status: Online
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
