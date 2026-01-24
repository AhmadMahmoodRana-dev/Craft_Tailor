
import React, { useState, useMemo } from 'react';
/* Added Scissors and Settings to the import list */
import { Search, Plus, UserPlus, Check, ChevronRight, Ruler, Palette, FileText, ChevronLeft, Minus, Trash2, Scissors, Settings } from 'lucide-react';
import { MOCK_CUSTOMERS, DESIGN_CATALOG, STANDARD_MEASUREMENTS } from '../constants';
import { Customer, CustomerProfile, GarmentType, SizingType, OrderItem, Measurement } from '../types';

const NewOrderFlow: React.FC = () => {
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<CustomerProfile | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const filteredCustomers = useMemo(() => {
    if (!searchQuery) return [];
    return MOCK_CUSTOMERS.filter(c => 
      c.mobile.includes(searchQuery) || 
      c.profiles.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const handleCreateProfile = () => {
    // In a real app, this would open a modal
    alert("Create new profile functionality triggered for mobile: " + searchQuery);
  };

  const startOrderForProfile = (customer: Customer, profile: CustomerProfile) => {
    setSelectedCustomer(customer);
    setSelectedProfile(profile);
    setStep(2);
  };

  const addGarment = (type: GarmentType) => {
    const newItem: OrderItem = {
      id: Math.random().toString(36).substr(2, 9),
      garmentType: type,
      sizingType: SizingType.STANDARD,
      baseSize: 'M',
      measurements: Object.entries(STANDARD_MEASUREMENTS[type]).map(([label, value]) => ({
        label,
        value,
        delta: 0
      })),
      designs: DESIGN_CATALOG[type]?.map(c => ({ category: c.category, selection: c.options[0] })) || [],
      fabricStatus: 'Pending',
      price: type === GarmentType.SUIT ? 15000 : 3500
    };
    setItems([...items, newItem]);
    setActiveItemIndex(items.length);
    setStep(3);
  };

  const updateMeasurement = (idx: number, deltaChange: number) => {
    const updatedItems = [...items];
    const currentItem = updatedItems[activeItemIndex];
    const measurement = currentItem.measurements[idx];
    
    measurement.delta = (measurement.delta || 0) + deltaChange;
    measurement.value = (STANDARD_MEASUREMENTS[currentItem.garmentType][measurement.label]) + measurement.delta;
    
    setItems(updatedItems);
  };

  const currentItem = items[activeItemIndex];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Stepper Header */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors ${
              step >= s ? 'bg-amber-500 border-amber-500 text-slate-900' : 'bg-white border-slate-200 text-slate-400'
            }`}>
              {step > s ? <Check size={20} /> : s}
            </div>
            {s < 5 && (
              <div className={`flex-1 h-1 mx-4 rounded ${step > s ? 'bg-amber-500' : 'bg-slate-200'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Customer Identification */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-2xl font-bold mb-6">Who are we crafting for today?</h3>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search mobile number or customer name..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map(customer => (
                <div key={customer.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{customer.mobile}</h4>
                      <p className="text-sm text-slate-500">{customer.profiles.length} Profiles Linked</p>
                    </div>
                    <button className="text-amber-600 font-bold text-sm flex items-center gap-1">
                      <Plus size={16} /> Add Profile
                    </button>
                  </div>
                  <div className="space-y-3">
                    {customer.profiles.map(profile => (
                      <button 
                        key={profile.id}
                        onClick={() => startOrderForProfile(customer, profile)}
                        className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-amber-50 hover:border-amber-200 transition-all text-left flex items-center justify-between group"
                      >
                        <div>
                          <p className="font-bold text-slate-800">{profile.name}</p>
                          <p className="text-xs text-slate-500">{profile.relationship} • Last: {profile.lastOrderDate || 'None'}</p>
                        </div>
                        <ChevronRight className="text-slate-300 group-hover:text-amber-500" />
                      </button>
                    ))}
                  </div>
                </div>
              ))
            ) : searchQuery.length > 5 ? (
              <div className="col-span-full bg-amber-50 border border-amber-200 p-8 rounded-2xl text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="text-amber-600" size={32} />
                </div>
                <h4 className="text-xl font-bold text-amber-900 mb-2">New Customer Detected</h4>
                <p className="text-amber-700 mb-6">Mobile number "{searchQuery}" is not in our system. Create a new master profile?</p>
                <button 
                  onClick={handleCreateProfile}
                  className="bg-amber-500 text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-amber-400 transition-colors"
                >
                  Create Profile & Start Order
                </button>
              </div>
            ) : (
              <div className="col-span-full text-center py-20 text-slate-400">
                <Search size={48} className="mx-auto mb-4 opacity-20" />
                <p>Start typing to search existing records</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Garment Selection */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Ordering For</p>
              <h3 className="text-2xl font-bold">{selectedProfile?.name}</h3>
              <p className="text-sm text-slate-500">{selectedCustomer?.mobile}</p>
            </div>
            <button onClick={() => setStep(1)} className="text-sm text-slate-400 underline">Change Customer</button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.values(GarmentType).map((type) => (
              <button 
                key={type}
                onClick={() => addGarment(type)}
                className="bg-white aspect-square rounded-2xl border-2 border-slate-100 hover:border-amber-500 transition-all flex flex-col items-center justify-center gap-4 group shadow-sm hover:shadow-lg"
              >
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-amber-50 group-hover:text-amber-500 transition-colors">
                  <Scissors size={40} />
                </div>
                <span className="font-bold text-slate-700 group-hover:text-amber-600">{type}</span>
              </button>
            ))}
          </div>

          {items.length > 0 && (
            <div className="mt-12 p-6 bg-white rounded-xl border border-slate-200">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <ShoppingCart size={20} /> Current Session Items
              </h4>
              <div className="space-y-2">
                {items.map((item, i) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span>{item.garmentType}</span>
                    <button onClick={() => { setActiveItemIndex(i); setStep(3); }} className="text-amber-600 text-sm font-bold">Edit Details</button>
                  </div>
                ))}
              </div>
              <button onClick={() => setStep(5)} className="w-full mt-6 bg-slate-900 text-white py-3 rounded-xl font-bold">Review & Lock Session</button>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Design & Measurements */}
      {step === 3 && currentItem && (
        <div className="space-y-8">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <button onClick={() => setStep(2)} className="flex items-center gap-2 text-slate-500 hover:text-slate-900">
              <ChevronLeft size={20} /> Back
            </button>
            <div className="text-center">
              <h3 className="font-bold text-lg">{currentItem.garmentType}</h3>
              <p className="text-xs text-slate-400">Step 3 of 5: Customization</p>
            </div>
            <button onClick={() => setStep(4)} className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-sm">Next: Design</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <Ruler className="text-amber-500" />
                    <h4 className="text-xl font-bold">Sizing Base</h4>
                  </div>
                  <div className="flex bg-slate-100 p-1 rounded-lg">
                    {[SizingType.STANDARD, SizingType.LAST_ORDER, SizingType.BESPOKE].map((t) => (
                      <button 
                        key={t}
                        className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
                          currentItem.sizingType === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                        }`}
                        onClick={() => {
                          const updated = [...items];
                          updated[activeItemIndex].sizingType = t;
                          setItems(updated);
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
               </div>

               {currentItem.sizingType === SizingType.STANDARD && (
                 <div className="flex gap-2 mb-8 justify-center">
                   {['S', 'M', 'L', 'XL'].map(s => (
                     <button 
                       key={s}
                       onClick={() => {
                         const updated = [...items];
                         updated[activeItemIndex].baseSize = s;
                         setItems(updated);
                       }}
                       className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center font-bold transition-all ${
                         currentItem.baseSize === s ? 'bg-amber-500 border-amber-500 text-slate-900' : 'border-slate-100 text-slate-400 hover:border-slate-200'
                       }`}
                     >
                       {s}
                     </button>
                   ))}
                 </div>
               )}

               <div className="space-y-4">
                 <h5 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Adjustments (Inches)</h5>
                 {currentItem.measurements.map((m, i) => (
                   <div key={m.label} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                     <span className="font-semibold text-slate-700">{m.label}</span>
                     <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                          <button onClick={() => updateMeasurement(i, -0.25)} className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-500"><Minus size={16} /></button>
                          <span className={`w-16 text-center font-mono font-bold ${m.delta && m.delta > 0 ? 'text-green-600' : m.delta && m.delta < 0 ? 'text-red-600' : 'text-slate-900'}`}>
                            {m.delta && m.delta > 0 ? '+' : ''}{m.delta === 0 ? '0' : m.delta}"
                          </span>
                          <button onClick={() => updateMeasurement(i, 0.25)} className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-500"><Plus size={16} /></button>
                        </div>
                        <div className="w-12 text-right">
                          <p className="text-[10px] text-slate-400 uppercase font-bold">Final</p>
                          <p className="font-bold text-slate-900">{m.value}"</p>
                        </div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-slate-900 rounded-2xl p-8 text-white">
                <h4 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <FileText className="text-amber-500" /> System Logic Note
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Variation logic is automatically applied. The stitching unit will receive the base size {currentItem.baseSize} plus these specific deviations:
                </p>
                <div className="space-y-2">
                  {currentItem.measurements.filter(m => m.delta !== 0).map(m => (
                    <div key={m.label} className="flex justify-between text-xs py-2 border-b border-slate-800 last:border-0">
                      <span>{m.label}</span>
                      <span className="font-mono text-amber-500">{m.delta && m.delta > 0 ? '+' : ''}{m.delta}"</span>
                    </div>
                  ))}
                  {currentItem.measurements.filter(m => m.delta !== 0).length === 0 && (
                    <p className="text-xs italic text-slate-600">No deviations from standard {currentItem.baseSize}</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex-1">
                 <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <Palette className="text-amber-500" /> Quick Design Pick
                </h4>
                <div className="space-y-6">
                  {currentItem.designs.map((d, i) => (
                    <div key={d.category} className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{d.category}</label>
                      <select 
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        value={d.selection}
                        onChange={(e) => {
                          const updated = [...items];
                          updated[activeItemIndex].designs[i].selection = e.target.value;
                          setItems(updated);
                        }}
                      >
                        {DESIGN_CATALOG[currentItem.garmentType]?.find(c => c.category === d.category)?.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Design Details (Catalog) */}
      {step === 4 && (
        <div className="space-y-8">
           <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <button onClick={() => setStep(3)} className="flex items-center gap-2 text-slate-500 hover:text-slate-900">
              <ChevronLeft size={20} /> Back
            </button>
            <div className="text-center">
              <h3 className="font-bold text-lg">Visual Design Selection</h3>
              <p className="text-xs text-slate-400">Browse and confirm with customer</p>
            </div>
            <button onClick={() => setStep(5)} className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-sm">Review Order</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <img src={`https://picsum.photos/seed/${currentItem?.garmentType}${i}/400/300`} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" alt="Design" />
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h5 className="font-bold text-slate-800">Design DS-{100 + i}</h5>
                      <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded">TRENDING</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Modern {currentItem?.garmentType} fit with hand-embroidered details.</p>
                  </div>
                  <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white px-4 py-2 rounded-full font-bold text-sm shadow-xl">Select This Design</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
               <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm sticky top-24">
                  <h4 className="font-bold text-lg mb-6 border-b border-slate-100 pb-4">Selected Styles</h4>
                  <div className="space-y-4">
                    {currentItem?.designs.map(d => (
                      <div key={d.category} className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">{d.category}</span>
                        <span className="text-sm font-bold text-slate-900">{d.selection}</span>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase mb-2">Attached Notes</p>
                      <textarea 
                        className="w-full p-3 rounded-xl bg-slate-50 text-sm border-0 focus:ring-2 focus:ring-amber-500 h-32 resize-none"
                        placeholder="Add specific embroidery placement details or special requests..."
                      ></textarea>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Final Review & Confirmation */}
      {step === 5 && (
        <div className="space-y-8">
           <div className="text-center space-y-2">
              <h2 className="text-4xl font-bold">Review & Lock Order</h2>
              <p className="text-slate-500">Ensure all measurements and design choices are correct before synchronization.</p>
           </div>

           <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
              <div className="bg-slate-900 p-8 text-white flex justify-between items-end">
                <div>
                  <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-1">Customer Profile</p>
                  <h3 className="text-2xl font-bold">{selectedProfile?.name}</h3>
                  <p className="text-slate-400">{selectedCustomer?.mobile}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Session ID</p>
                  <p className="font-mono text-xl">SESS-{Math.floor(1000 + Math.random() * 9000)}</p>
                </div>
              </div>

              <div className="p-8">
                <div className="space-y-8">
                  {items.map((item, i) => (
                    <div key={item.id} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center">
                            <Scissors className="text-amber-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-xl">{item.garmentType}</h4>
                            <p className="text-sm text-slate-500">Base: {item.baseSize} ({item.sizingType})</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                           <button onClick={() => { setActiveItemIndex(i); setStep(3); }} className="p-2 text-slate-400 hover:text-slate-900"><Edit3 size={20} /></button>
                           <button onClick={() => setItems(items.filter((_, idx) => idx !== i))} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={20} /></button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Measurement Deviations</h5>
                          <div className="grid grid-cols-2 gap-2">
                            {item.measurements.filter(m => m.delta !== 0).map(m => (
                              <div key={m.label} className="bg-white px-3 py-2 rounded-lg border border-slate-100 flex justify-between text-sm">
                                <span className="text-slate-500">{m.label}</span>
                                <span className="font-bold text-amber-600">{m.delta && m.delta > 0 ? '+' : ''}{m.delta}"</span>
                              </div>
                            ))}
                            {item.measurements.filter(m => m.delta !== 0).length === 0 && <p className="text-xs italic text-slate-400">Standard fit - no changes</p>}
                          </div>
                        </div>
                        <div>
                          <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Design Specifications</h5>
                          <div className="grid grid-cols-2 gap-2">
                            {item.designs.map(d => (
                              <div key={d.category} className="bg-white px-3 py-2 rounded-lg border border-slate-100 flex justify-between text-sm">
                                <span className="text-slate-500">{d.category}</span>
                                <span className="font-bold text-slate-900">{d.selection}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 flex flex-col md:flex-row gap-6 items-center justify-between border-t border-slate-100 pt-8">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="confirm" className="w-5 h-5 rounded accent-amber-500" />
                    <label htmlFor="confirm" className="text-sm text-slate-600">I confirm that physical fabric has been measured and marked.</label>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setStep(2)} className="px-8 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">Add More Items</button>
                    <button 
                      onClick={() => alert("Order successfully saved and synced to Lahore Hub!")}
                      className="px-12 py-4 bg-amber-500 text-slate-900 rounded-xl font-black text-lg hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20 active:scale-95"
                    >
                      LOCK & DISPATCH FABRIC
                    </button>
                  </div>
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

// Internal icon proxy for missing lucide imports
const ShoppingCart = ({ size }: { size: number }) => <Check size={size} />;
/* Added Settings as an internal proxy since it's used by Edit3 below and now imported correctly */
const Edit3 = ({ size }: { size: number }) => <Settings size={size} />;

export default NewOrderFlow;
