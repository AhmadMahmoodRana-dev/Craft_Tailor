
export enum GarmentType {
  SHALWAR_KAMEEZ = 'Shalwar Kameez',
  PANT = 'Pant',
  SHIRT = 'Shirt',
  SUIT = 'Suit'
}

export enum OrderStatus {
  ORDER_CREATED = 'Order Created (Branch)',
  FABRIC_DISPATCHED = 'Fabric Dispatched',
  FABRIC_RECEIVED = 'Fabric Received (Hub)',
  IN_STITCHING = 'In Stitching',
  READY_FOR_PICKUP = 'Ready for Pickup',
  COMPLETED = 'Completed'
}

export enum SizingType {
  STANDARD = 'Standard',
  LAST_ORDER = 'Last Order',
  BESPOKE = 'Bespoke'
}

export interface Measurement {
  label: string;
  value: number; // in inches
  delta?: number; // adjustment from standard
}

export interface DesignChoice {
  category: string;
  selection: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  relationship: string;
  lastOrderDate?: string;
  standardSize?: 'S' | 'M' | 'L' | 'XL';
}

export interface Customer {
  id: string;
  mobile: string;
  profiles: CustomerProfile[];
}

export interface OrderItem {
  id: string;
  garmentType: GarmentType;
  sizingType: SizingType;
  baseSize?: string;
  measurements: Measurement[];
  designs: DesignChoice[];
  fabricStatus: 'Pending' | 'Dispatched' | 'Received';
  price: number;
}

export interface Order {
  id: string;
  branchId: string;
  customerId: string;
  profileId: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: string;
  totalAmount: number;
}
