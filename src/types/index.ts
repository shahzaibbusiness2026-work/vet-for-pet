export type PageType = 
  | 'home' 
  | 'about' 
  | 'services' 
  | 'team' 
  | 'gallery' 
  | 'contact' 
  | 'appointment' 
  | 'shop' 
  | 'admin';

export type AdminTab = 
  | 'dashboard'
  | 'appointments'
  | 'patients'
  | 'doctors'
  | 'services'
  | 'shop'
  | 'orders'
  | 'inventory'
  | 'customers'
  | 'reviews'
  | 'messages'
  | 'analytics'
  | 'settings';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  petImage: string;
  category: 'general' | 'surgery' | 'wellness' | 'specialized';
  fullDetails?: string;
  badge?: string;
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  image: string;
  bio: string;
  fullBio?: string;
  education?: string;
  availableDays?: string;
}

export interface SupportStaff {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'dogs' | 'cats' | 'grooming' | 'clinic' | 'staff' | 'patients';
  imageUrl: string;
  likes: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'cat-feed' | 'cat-accessories' | 'dog-food' | 'dog-accessories' | 'grooming' | 'supplements' | 'toys' | 'bowls';
  petType: 'dog' | 'cat' | 'all';
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  isPopular?: boolean;
  isTopSeller?: boolean;
  inStock: boolean;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  petName?: string;
  petType?: string;
  rating: number;
  comment: string;
  avatar: string;
  date?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface AdminAppointment {
  id: string;
  petName: string;
  petType: string;
  petAvatar: string;
  owner: string;
  phone: string;
  service: string;
  vet: string;
  dateTime: string;
  status: 'Completed' | 'In Progress' | 'Confirmed' | 'Pending' | 'Cancelled';
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customer: string;
  itemsCount: number;
  total: number;
  status: 'Delivered' | 'Processing' | 'Shipped' | 'Pending' | 'Cancelled';
  date: string;
}

export interface InventoryItem {
  id: string;
  productName: string;
  category: string;
  stock: number;
  status: 'Low Stock' | 'In Stock' | 'Out of Stock';
  reorderLevel: number;
  image: string;
}

export interface MessageItem {
  id: string;
  sender: string;
  senderAvatar: string;
  message: string;
  time: string;
  unreadCount?: number;
}
