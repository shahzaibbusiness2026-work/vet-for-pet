'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ServiceItem, 
  Doctor, 
  SupportStaff, 
  Product, 
  GalleryItem, 
  Testimonial, 
  FAQItem, 
  AdminAppointment, 
  AdminOrder, 
  InventoryItem, 
  MessageItem 
} from '../types';
import { 
  CLINIC_INFO as INITIAL_CLINIC_INFO, 
  SERVICES as INITIAL_SERVICES, 
  DOCTORS as INITIAL_DOCTORS, 
  SUPPORT_STAFF as INITIAL_SUPPORT_STAFF, 
  PRODUCTS as INITIAL_PRODUCTS, 
  GALLERY_ITEMS as INITIAL_GALLERY_ITEMS, 
  TESTIMONIALS as INITIAL_TESTIMONIALS, 
  FAQS as INITIAL_FAQS, 
  ADMIN_APPOINTMENTS as INITIAL_APPOINTMENTS, 
  ADMIN_ORDERS as INITIAL_ORDERS, 
  INVENTORY_ITEMS as INITIAL_INVENTORY, 
  CUSTOMER_MESSAGES as INITIAL_MESSAGES 
} from '../data/mockData';

export interface ClinicInfo {
  name: string;
  tagline: string;
  subTagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hoursWeekday: string;
  hoursFriday: string;
  hoursSunday: string;
  rating: string;
  clientsCount: string;
  yearsCount: string;
  bannerNotice: string;
}

export interface SiteTexts {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  emergencyTitle: string;
  emergencySubtitle: string;
  aboutHeading: string;
  aboutStory: string;
  servicesIntro: string;
  teamIntro: string;
  shopIntro: string;
  galleryIntro: string;
  contactIntro: string;
}

const INITIAL_SITE_TEXTS: SiteTexts = {
  heroBadge: "Sahiwal's Most Trusted Pet Clinic",
  heroTitle: "Expert Veterinary Care for Your Beloved Pets",
  heroSubtitle: "Dedicated to keeping your dogs, cats, rabbits, and birds healthy, vibrant, and happy with modern medicine and gentle handling in Sahiwal.",
  emergencyTitle: "Need Immediate Veterinary Care in Sahiwal?",
  emergencySubtitle: "Our team is prepared for critical emergencies, sudden trauma, and urgent pet treatments.",
  aboutHeading: "Devoted to Exceptional Animal Wellness Since 2019",
  aboutStory: "Founded with a passion to bring world-class veterinary healthcare to Sahiwal, Vet for Pet Clinic combines advanced medical diagnostic equipment with gentle, fear-free handling.",
  servicesIntro: "From preventive care & routine vaccines to advanced sterile surgery, we cover every aspect of your pet's health under one roof.",
  teamIntro: "Meet our licensed veterinarians and experienced support staff dedicated to giving your pet the gentle, expert care they deserve.",
  shopIntro: "Authentic imported pet feeds, vet-approved supplements, grooming supplies, and accessories delivered directly to your doorstep in Sahiwal.",
  galleryIntro: "A glimpse into daily life at Vet for Pet Clinic — happy pet patients, modern facilities, sterile surgeries, and loving care.",
  contactIntro: "Have questions about your pet's health or want to schedule an appointment? Get in touch with our friendly team in Fareed Town, Sahiwal."
};

const INITIAL_CLINIC_FULL: ClinicInfo = {
  ...INITIAL_CLINIC_INFO,
  bannerNotice: "Mon – Thu & Sat – Sun: 10:00 AM – 10:00 PM • Fri: 3:00 PM – 10:00 PM • Fareed Town, Sahiwal"
};

interface SiteDataContextType {
  // Data
  clinicInfo: ClinicInfo;
  siteTexts: SiteTexts;
  services: ServiceItem[];
  doctors: Doctor[];
  supportStaff: SupportStaff[];
  products: Product[];
  galleryItems: GalleryItem[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  appointments: AdminAppointment[];
  orders: AdminOrder[];
  inventory: InventoryItem[];
  messages: MessageItem[];

  // Mutations
  updateClinicInfo: (updates: Partial<ClinicInfo>) => void;
  updateSiteTexts: (updates: Partial<SiteTexts>) => void;

  // Services CRUD
  addService: (service: ServiceItem) => void;
  updateService: (id: string, updates: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;

  // Doctors & Staff CRUD
  addDoctor: (doctor: Doctor) => void;
  updateDoctor: (id: string, updates: Partial<Doctor>) => void;
  deleteDoctor: (id: string) => void;
  addSupportStaff: (staff: SupportStaff) => void;
  updateSupportStaff: (id: string, updates: Partial<SupportStaff>) => void;
  deleteSupportStaff: (id: string) => void;

  // Products CRUD
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Gallery CRUD
  addGalleryItem: (item: GalleryItem) => void;
  updateGalleryItem: (id: string, updates: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;

  // Testimonials CRUD
  addTestimonial: (item: Testimonial) => void;
  updateTestimonial: (id: string, updates: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  // FAQs CRUD
  addFaq: (faq: FAQItem) => void;
  updateFaq: (index: number, faq: FAQItem) => void;
  deleteFaq: (index: number) => void;

  // Appointments CRUD
  addAppointment: (appointment: AdminAppointment) => void;
  updateAppointmentStatus: (id: string, status: AdminAppointment['status']) => void;
  deleteAppointment: (id: string) => void;

  // Orders CRUD
  addOrder: (order: AdminOrder) => void;
  updateOrderStatus: (id: string, status: AdminOrder['status']) => void;

  // Inventory CRUD
  updateInventoryStock: (id: string, newStock: number) => void;
  addInventoryItem: (item: InventoryItem) => void;
  deleteInventoryItem: (id: string) => void;

  // Messages CRUD
  addMessage: (item: { sender: string; email?: string; phone?: string; message: string }) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;

  // Reset
  resetAllToDefaults: () => void;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CLINIC: 'vfp_clinic_info',
  TEXTS: 'vfp_site_texts',
  SERVICES: 'vfp_services',
  DOCTORS: 'vfp_doctors',
  STAFF: 'vfp_staff',
  PRODUCTS: 'vfp_products',
  GALLERY: 'vfp_gallery',
  TESTIMONIALS: 'vfp_testimonials',
  FAQS: 'vfp_faqs',
  APPOINTMENTS: 'vfp_appointments',
  ORDERS: 'vfp_orders',
  INVENTORY: 'vfp_inventory',
  MESSAGES: 'vfp_messages',
};

function loadStored<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch {
    return fallback;
  }
}

function saveStored<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`Failed to persist ${key} to localStorage:`, e);
  }
}

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clinicInfo, setClinicInfo] = useState<ClinicInfo>(() => loadStored(STORAGE_KEYS.CLINIC, INITIAL_CLINIC_FULL));
  const [siteTexts, setSiteTexts] = useState<SiteTexts>(() => loadStored(STORAGE_KEYS.TEXTS, INITIAL_SITE_TEXTS));
  const [services, setServices] = useState<ServiceItem[]>(() => loadStored(STORAGE_KEYS.SERVICES, INITIAL_SERVICES));
  const [doctors, setDoctors] = useState<Doctor[]>(() => loadStored(STORAGE_KEYS.DOCTORS, INITIAL_DOCTORS));
  const [supportStaff, setSupportStaff] = useState<SupportStaff[]>(() => loadStored(STORAGE_KEYS.STAFF, INITIAL_SUPPORT_STAFF));
  const [products, setProducts] = useState<Product[]>(() => loadStored(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS));
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => loadStored(STORAGE_KEYS.GALLERY, INITIAL_GALLERY_ITEMS));
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => loadStored(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS));
  const [faqs, setFaqs] = useState<FAQItem[]>(() => loadStored(STORAGE_KEYS.FAQS, INITIAL_FAQS));
  const [appointments, setAppointments] = useState<AdminAppointment[]>(() => loadStored(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS));
  const [orders, setOrders] = useState<AdminOrder[]>(() => loadStored(STORAGE_KEYS.ORDERS, INITIAL_ORDERS));
  const [inventory, setInventory] = useState<InventoryItem[]>(() => loadStored(STORAGE_KEYS.INVENTORY, INITIAL_INVENTORY));
  const [messages, setMessages] = useState<MessageItem[]>(() => loadStored(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES));

  // Sync to localStorage
  useEffect(() => { saveStored(STORAGE_KEYS.CLINIC, clinicInfo); }, [clinicInfo]);
  useEffect(() => { saveStored(STORAGE_KEYS.TEXTS, siteTexts); }, [siteTexts]);
  useEffect(() => { saveStored(STORAGE_KEYS.SERVICES, services); }, [services]);
  useEffect(() => { saveStored(STORAGE_KEYS.DOCTORS, doctors); }, [doctors]);
  useEffect(() => { saveStored(STORAGE_KEYS.STAFF, supportStaff); }, [supportStaff]);
  useEffect(() => { saveStored(STORAGE_KEYS.PRODUCTS, products); }, [products]);
  useEffect(() => { saveStored(STORAGE_KEYS.GALLERY, galleryItems); }, [galleryItems]);
  useEffect(() => { saveStored(STORAGE_KEYS.TESTIMONIALS, testimonials); }, [testimonials]);
  useEffect(() => { saveStored(STORAGE_KEYS.FAQS, faqs); }, [faqs]);
  useEffect(() => { saveStored(STORAGE_KEYS.APPOINTMENTS, appointments); }, [appointments]);
  useEffect(() => { saveStored(STORAGE_KEYS.ORDERS, orders); }, [orders]);
  useEffect(() => { saveStored(STORAGE_KEYS.INVENTORY, inventory); }, [inventory]);
  useEffect(() => { saveStored(STORAGE_KEYS.MESSAGES, messages); }, [messages]);

  // Clinic & Site Texts
  const updateClinicInfo = (updates: Partial<ClinicInfo>) => {
    setClinicInfo(prev => ({ ...prev, ...updates }));
  };

  const updateSiteTexts = (updates: Partial<SiteTexts>) => {
    setSiteTexts(prev => ({ ...prev, ...updates }));
  };

  // Services
  const addService = (service: ServiceItem) => {
    setServices(prev => [service, ...prev]);
  };

  const updateService = (id: string, updates: Partial<ServiceItem>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  // Doctors
  const addDoctor = (doctor: Doctor) => {
    setDoctors(prev => [...prev, doctor]);
  };

  const updateDoctor = (id: string, updates: Partial<Doctor>) => {
    setDoctors(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
  };

  const deleteDoctor = (id: string) => {
    setDoctors(prev => prev.filter(d => d.id !== id));
  };

  // Support Staff
  const addSupportStaff = (staff: SupportStaff) => {
    setSupportStaff(prev => [...prev, staff]);
  };

  const updateSupportStaff = (id: string, updates: Partial<SupportStaff>) => {
    setSupportStaff(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteSupportStaff = (id: string) => {
    setSupportStaff(prev => prev.filter(s => s.id !== id));
  };

  // Products
  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Gallery
  const addGalleryItem = (item: GalleryItem) => {
    setGalleryItems(prev => [item, ...prev]);
  };

  const updateGalleryItem = (id: string, updates: Partial<GalleryItem>) => {
    setGalleryItems(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems(prev => prev.filter(g => g.id !== id));
  };

  // Testimonials
  const addTestimonial = (item: Testimonial) => {
    setTestimonials(prev => [item, ...prev]);
  };

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  // FAQs
  const addFaq = (faq: FAQItem) => {
    setFaqs(prev => [...prev, faq]);
  };

  const updateFaq = (index: number, faq: FAQItem) => {
    setFaqs(prev => prev.map((f, i) => i === index ? faq : f));
  };

  const deleteFaq = (index: number) => {
    setFaqs(prev => prev.filter((_, i) => i !== index));
  };

  // Appointments
  const addAppointment = (appointment: AdminAppointment) => {
    setAppointments(prev => [appointment, ...prev]);
  };

  const updateAppointmentStatus = (id: string, status: AdminAppointment['status']) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  // Orders
  const addOrder = (order: AdminOrder) => {
    setOrders(prev => [order, ...prev]);
  };

  const updateOrderStatus = (id: string, status: AdminOrder['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  // Inventory
  const updateInventoryStock = (id: string, newStock: number) => {
    setInventory(prev => prev.map(inv => {
      if (inv.id === id) {
        const stock = Math.max(0, newStock);
        const status: InventoryItem['status'] = stock === 0 ? 'Out of Stock' : stock <= inv.reorderLevel ? 'Low Stock' : 'In Stock';
        return { ...inv, stock, status };
      }
      return inv;
    }));
  };

  const addInventoryItem = (item: InventoryItem) => {
    setInventory(prev => [item, ...prev]);
  };

  const deleteInventoryItem = (id: string) => {
    setInventory(prev => prev.filter(i => i.id !== id));
  };

  // Messages
  const addMessage = (item: { sender: string; email?: string; phone?: string; message: string }) => {
    const newMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      sender: item.sender,
      phone: item.phone || '',
      message: item.message,
      time: 'Just now',
      unreadCount: 1
    };
    setMessages(prev => [newMsg, ...prev]);
  };

  const markMessageRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, unreadCount: 0 } : m));
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  // Reset All
  const resetAllToDefaults = () => {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    setClinicInfo(INITIAL_CLINIC_FULL);
    setSiteTexts(INITIAL_SITE_TEXTS);
    setServices(INITIAL_SERVICES);
    setDoctors(INITIAL_DOCTORS);
    setSupportStaff(INITIAL_SUPPORT_STAFF);
    setProducts(INITIAL_PRODUCTS);
    setGalleryItems(INITIAL_GALLERY_ITEMS);
    setTestimonials(INITIAL_TESTIMONIALS);
    setFaqs(INITIAL_FAQS);
    setAppointments(INITIAL_APPOINTMENTS);
    setOrders(INITIAL_ORDERS);
    setInventory(INITIAL_INVENTORY);
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <SiteDataContext.Provider
      value={{
        clinicInfo,
        siteTexts,
        services,
        doctors,
        supportStaff,
        products,
        galleryItems,
        testimonials,
        faqs,
        appointments,
        orders,
        inventory,
        messages,
        updateClinicInfo,
        updateSiteTexts,
        addService,
        updateService,
        deleteService,
        addDoctor,
        updateDoctor,
        deleteDoctor,
        addSupportStaff,
        updateSupportStaff,
        deleteSupportStaff,
        addProduct,
        updateProduct,
        deleteProduct,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addFaq,
        updateFaq,
        deleteFaq,
        addAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        addOrder,
        updateOrderStatus,
        updateInventoryStock,
        addInventoryItem,
        deleteInventoryItem,
        addMessage,
        markMessageRead,
        deleteMessage,
        resetAllToDefaults
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};
