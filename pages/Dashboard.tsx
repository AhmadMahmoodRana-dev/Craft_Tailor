
import React from 'react';
import { Users, ShoppingBag, Clock, CheckCircle2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Today Orders', value: '12', icon: <ShoppingBag className="text-blue-600" />, trend: '+3' },
    { label: 'In Stitching', value: '45', icon: <Clock className="text-amber-600" />, trend: '0' },
    { label: 'Ready for Pickup', value: '8', icon: <CheckCircle2 className="text-green-600" />, trend: '+2' },
    { label: 'Active Customers', value: '2.4k', icon: <Users className="text-purple-600" />, trend: '+12' },
  ];

  const recentOrders = [
    { id: 'ORD-7721', customer: 'Ahmed Ali', item: 'Shalwar Kameez (2)', status: 'In Stitching', date: '2h ago' },
    { id: 'ORD-7719', customer: 'Zoya Ahmed', item: 'Pant & Shirt', status: 'Fabric Dispatched', date: '4h ago' },
    { id: 'ORD-7715', customer: 'Bilal Khan', item: 'Bespoke Suit', status: 'Ready for Pickup', date: 'Yesterday' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 rounded-lg">{stat.icon}</div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">{stat.trend}</span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800">Recent Branch Activity</h3>
            <button className="text-sm text-amber-600 font-semibold hover:underline">View All</button>
          </div>
          <div className="divide-y divide-slate-100">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">
                    {order.customer[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{order.customer}</h4>
                    <p className="text-xs text-slate-500">{order.item} • {order.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1 ${
                    order.status === 'Ready for Pickup' ? 'bg-green-100 text-green-700' : 
                    order.status === 'In Stitching' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {order.status}
                  </span>
                  <p className="text-[10px] text-slate-400">{order.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl p-8 text-white flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-4 leading-tight">Ready to craft a new masterpiece?</h3>
            <p className="text-slate-400 text-sm mb-8">Start a new order session to capture customer dreams and precise measurements.</p>
          </div>
          <button className="w-full bg-amber-500 text-slate-900 py-4 rounded-xl font-bold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20">
            Create New Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
