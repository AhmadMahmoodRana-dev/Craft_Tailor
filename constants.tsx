
import React from 'react';
import { 
  Scissors, 
  User, 
  History, 
  Truck, 
  CheckCircle, 
  Settings,
  PlusSquare,
  Package
} from 'lucide-react';
import { GarmentType } from './types';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <Scissors size={20} /> },
  { id: 'new-order', label: 'New Order', icon: <PlusSquare size={20} /> },
  { id: 'customers', label: 'Customers', icon: <User size={20} /> },
  { id: 'stitching-hub', label: 'Stitching Hub', icon: <Package size={20} /> },
  { id: 'history', label: 'Order History', icon: <History size={20} /> },
  { id: 'logistics', label: 'Logistics', icon: <Truck size={20} /> },
];

export const STANDARD_MEASUREMENTS: Record<GarmentType, Record<string, number>> = {
  [GarmentType.SHALWAR_KAMEEZ]: {
    'Neck': 15.5,
    'Chest': 40,
    'Waist': 38,
    'Length': 42,
    'Sleeves': 24,
    'Shoulder': 18
  },
  [GarmentType.SHIRT]: {
    'Collar': 15,
    'Chest': 42,
    'Sleeves': 25,
    'Length': 30
  },
  [GarmentType.PANT]: {
    'Waist': 34,
    'Hip': 40,
    'Length': 40,
    'Bottom': 8
  },
  [GarmentType.SUIT]: {
    'Chest': 44,
    'Waist': 40,
    'Shoulder': 19,
    'Length': 31
  }
};

export const MOCK_CUSTOMERS = [
  {
    id: 'c1',
    mobile: '03001234567',
    profiles: [
      { id: 'p1', name: 'Ahmed Ali', relationship: 'Self', standardSize: 'L', lastOrderDate: '2024-05-01' },
      { id: 'p2', name: 'Zoya Ahmed', relationship: 'Daughter', standardSize: 'M' }
    ]
  },
  {
    id: 'c2',
    mobile: '03217654321',
    profiles: [
      { id: 'p3', name: 'Bilal Khan', relationship: 'Self', standardSize: 'XL' }
    ]
  }
];

export const DESIGN_CATALOG = {
  [GarmentType.SHALWAR_KAMEEZ]: [
    { category: 'Collar', options: ['Ban Collar', 'Shirt Collar', 'V-Neck'] },
    { category: 'Cuffs', options: ['Straight', 'Cut', 'Double Button'] },
    { category: 'Pockets', options: ['Front Left', 'Side Pockets', 'No Pocket'] },
    { category: 'Embroidery', options: ['Light Placket', 'Heavy Border', 'None'] }
  ],
  [GarmentType.SHIRT]: [
    { category: 'Collar', options: ['Spread', 'Button Down', 'Mandarin'] },
    { category: 'Cuffs', options: ['French', 'Barrel', 'Convertible'] },
    { category: 'Placket', options: ['Standard', 'Hidden', 'Tuxedo'] }
  ]
};
