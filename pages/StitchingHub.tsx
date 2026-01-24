
import React, { useState } from 'react';
import { Package, Truck, Scissors, CheckCircle, Search, Filter } from 'lucide-react';
import { OrderStatus } from '../types';

const StitchingHub: React.FC = () => {
  const [orders, setOrders] = useState([
    { id: 'ORD-7719', customerId: 'C-991', branch: 'Lahore-1', items: 2, status: OrderStatus.FABRIC_DISPATCHED, priority: 'High' },
    { id: 'ORD-7715', customerId: 'C-223', branch: 'Islamabad-4', items: 1, status: OrderStatus.FABRIC_RECEIVED, priority: 'Normal' },
    { id: 'ORD-7712', customerId: 'C-104', branch: 'Karachi-8', items: 3, status: OrderStatus.IN_STITCHING, priority: 'Urgent' },
  ]);

  const updateStatus = (id: string, newStatus: OrderStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Central Production Hub</h2>
          <p className="text-slate-500">Lahore Main Unit • Monitoring {orders.length} active shipments</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Search Order ID..." />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Fabric Incoming Board */}
        <div className="bg-slate-100/50 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
             <h3 className="font-bold flex items-center gap-2 text-slate-800">
               <Truck className="text-blue-500" size={20} /> In Transit
             </h3>
             <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
               {orders.filter(o => o.status === OrderStatus.FABRIC_DISPATCHED).length}
             </span>
          </div>
          {orders.filter(o => o.status === OrderStatus.FABRIC_DISPATCHED).map(order => (
            <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-900">{order.id}</h4>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{order.branch}</p>
                </div>
                <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  order.priority === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {order.priority}
                </div>
              </div>
              <p className="text-xs text-slate-600">Items: {order.items} Shalwar Kameez</p>
              <button 
                onClick={() => updateStatus(order.id, OrderStatus.FABRIC_RECEIVED)}
                className="w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Confirm Fabric Receipt
              </button>
            </div>
          ))}
        </div>

        {/* Ready to Stitch Board */}
        <div className="bg-slate-100/50 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
             <h3 className="font-bold flex items-center gap-2 text-slate-800">
               <Package className="text-amber-500" size={20} /> Ready to Stitch
             </h3>
             <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">
               {orders.filter(o => o.status === OrderStatus.FABRIC_RECEIVED).length}
             </span>
          </div>
          {orders.filter(o => o.status === OrderStatus.FABRIC_RECEIVED).map(order => (
            <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-900">{order.id}</h4>
                  <p className="text-xs text-slate-500">Customer {order.customerId}</p>
                </div>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                <p className="text-[10px] font-bold text-amber-800 mb-1">DESIGN PREVIEW</p>
                <div className="flex gap-1">
                  {[1, 2].map(i => <div key={i} className="w-8 h-8 rounded bg-amber-200/50" />)}
                </div>
              </div>
              <button 
                onClick={() => updateStatus(order.id, OrderStatus.IN_STITCHING)}
                className="w-full py-2 bg-amber-500 text-slate-900 rounded-lg text-xs font-bold hover:bg-amber-400 transition-colors"
              >
                Send to Workshop
              </button>
            </div>
          ))}
        </div>

        {/* In Production Board */}
        <div className="bg-slate-100/50 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
             <h3 className="font-bold flex items-center gap-2 text-slate-800">
               <Scissors className="text-purple-500" size={20} /> In Production
             </h3>
             <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">
               {orders.filter(o => o.status === OrderStatus.IN_STITCHING).length}
             </span>
          </div>
          {orders.filter(o => o.status === OrderStatus.IN_STITCHING).map(order => (
            <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-900">{order.id}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                    <p className="text-[10px] text-purple-700 font-bold uppercase">Stitching in progress</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-purple-500" />
                </div>
                <span className="text-[10px] font-bold text-slate-400">75%</span>
              </div>
              <button 
                onClick={() => updateStatus(order.id, OrderStatus.READY_FOR_PICKUP)}
                className="w-full py-2 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle size={14} /> Quality Check Pass
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StitchingHub;
