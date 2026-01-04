
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  isPopular?: boolean;
  isDealOfTheDay?: boolean;
  discountPercentage?: number;
}

export interface CartItem extends Product {
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  customer: string;
  status: 'pending' | 'preparing' | 'delivery' | 'completed';
  items: CartItem[];
  total: number;
  time: string;
  paymentMethod: string;
}

export interface Table {
  id: number;
  name: string;
  seats: number;
  status: 'available' | 'reserved' | 'occupied';
}

export interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  isPositive?: boolean;
  icon: string;
  color: string;
}

export interface ClientUser {
  name: string;
  email: string;
  whatsapp: string;
}

export interface PromoBanner {
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  isVisible: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'alert' | 'info';
}