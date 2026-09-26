'use client';

import React, { useState } from 'react';
import { 
  PageType, 
  AdminTab, 
  AdminAppointment, 
  AdminOrder, 
  InventoryItem,
  ServiceItem,
  Doctor,
  SupportStaff,
  Product,
  GalleryItem,
  Testimonial,
  FAQItem
} from '../../types';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Stethoscope, 
  HeartHandshake, 
  ShoppingBag, 
  Package, 
  Boxes, 
  UserCheck, 
  Star, 
  MessageSquare, 
  TrendingUp, 
  Settings, 
  Search, 
  Plus, 
  ExternalLink,
  Phone,
  MessageCircle,
  Menu,
  X,
  Sparkles,
  CheckCircle2,
  Trash2,
  Edit,
  Save,
  RotateCcw,
  Image as ImageIcon,
  HelpCircle,
  FileText,
  Clock,
  MapPin,
  Mail,
  Shield,
  Filter
} from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import { Logo } from '../../components/common/Logo';
import { PawDecor } from '../../components/common/PawDecor';

interface AdminDashboardProps {
  setCurrentPage: (page: PageType) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ setCurrentPage }) => {
  const {
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
    markMessageRead,
    deleteMessage,
    resetAllToDefaults
  } = useSiteData();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Modals state
  const [modalType, setModalType] = useState<
    'appointment' | 'doctor' | 'staff' | 'service' | 'product' | 'gallery' | 'testimonial' | 'faq' | 'restock' | 'resetConfirm' | null
  >(null);

  // Edit target states
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingFaqIndex, setEditingFaqIndex] = useState<number | null>(null);
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);

  // Temporary Form States
  const [appointmentForm, setAppointmentForm] = useState({
    petName: '',
    petType: 'Dog',
    owner: '',
    phone: '',
    service: 'General Checkups',
    vet: 'Dr. Ahmad Raza',
    dateTime: 'Today 04:00 PM'
  });

  const [serviceForm, setServiceForm] = useState<Omit<ServiceItem, 'id'>>({
    title: '',
    description: '',
    iconName: 'Stethoscope',
    petImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80',
    category: 'general',
    fullDetails: '',
    badge: 'Routine Care'
  });

  const [doctorForm, setDoctorForm] = useState<Omit<Doctor, 'id'>>({
    name: '',
    role: 'Veterinarian',
    specialty: 'Internal Medicine',
    experience: '5+ Years Experience',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    bio: '',
    fullBio: '',
    education: 'DVM (Veterinary Medicine)',
    availableDays: 'Mon – Sat (10:00 AM – 8:00 PM)'
  });

  const [staffForm, setStaffForm] = useState<Omit<SupportStaff, 'id'>>({
    name: '',
    role: 'Veterinary Technician',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
  });

  const [productForm, setProductForm] = useState<Omit<Product, 'id'>>({
    name: '',
    category: 'cat-feed',
    petType: 'cat',
    price: 1500,
    rating: 4.8,
    reviewCount: 25,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=500&q=80',
    inStock: true,
    isPopular: false,
    isTopSeller: false,
    description: ''
  });

  const [galleryForm, setGalleryForm] = useState<Omit<GalleryItem, 'id'>>({
    title: '',
    category: 'dogs',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
    likes: 50
  });

  const [testimonialForm, setTestimonialForm] = useState<Omit<Testimonial, 'id'>>({
    author: '',
    role: 'Pet Parent, Sahiwal',
    petName: '',
    petType: 'Dog',
    rating: 5,
    comment: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    date: 'Just now'
  });

  const [faqForm, setFaqForm] = useState<FAQItem>({
    question: '',
    answer: '',
    category: 'General'
  });

  const [restockItemId, setRestockItemId] = useState('');
  const [restockAmount, setRestockAmount] = useState(20);

  const showFeedback = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const sidebarLinks: { id: AdminTab; label: string; icon: any; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'content', label: 'Website Content', icon: FileText },
    { id: 'services', label: 'Services (12)', icon: HeartHandshake },
    { id: 'doctors', label: 'Doctors & Team', icon: Stethoscope },
    { id: 'shop', label: 'Shop Products', icon: ShoppingBag },
    { id: 'appointments', label: 'Appointments', icon: Calendar, badge: appointments.filter(a => a.status === 'Confirmed' || a.status === 'In Progress').length },
    { id: 'orders', label: 'Orders', icon: Package, badge: orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length },
    { id: 'inventory', label: 'Inventory', icon: Boxes, badge: inventory.filter(i => i.stock <= i.reorderLevel).length },
    { id: 'gallery', label: 'Gallery Photos', icon: ImageIcon },
    { id: 'reviews', label: 'Reviews & Ratings', icon: Star },
    { id: 'patients', label: 'Patients Directory', icon: PawDecor },
    { id: 'messages', label: 'Inquiries', icon: MessageSquare, badge: messages.filter(m => (m.unreadCount || 0) > 0).length },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Clinic Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7F6] text-slate-800 flex">
      {/* 1. SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo Brand Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <button onClick={() => setCurrentPage('home')} className="text-left cursor-pointer">
              <Logo title={clinicInfo.name} subtext="Admin Control Panel" />
            </button>
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto flex-1 no-scrollbar">
            {sidebarLinks.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#006B4F] text-white shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.id === 'patients' ? (
                      <PawDecor size={18} opacity={1} color={isActive ? '#FFFFFF' : '#006B4F'} />
                    ) : (
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    )}
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white text-[#006B4F]' : 'bg-red-500 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom Live Website Link & Reset */}
          <div className="p-3 border-t border-slate-100 space-y-2 bg-slate-50/70">
            <button 
              onClick={() => setCurrentPage('home')}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white hover:bg-emerald-50 text-[#006B4F] border border-emerald-200 text-xs font-bold shadow-2xs transition-colors cursor-pointer"
            >
              <span>View Public Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setModalType('resetConfirm')}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[11px] text-slate-500 hover:text-red-600 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset to Factory Defaults</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* 2. MAIN ADMIN CONTENT CONTAINER */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        
        {/* Sticky Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-lg">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5 text-[#006B4F]" />
            </button>

            {/* Global Search Bar */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search anything (patients, services, products, orders)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#006B4F]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Right Header Status & Quick Action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Live website indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Site Synced</span>
            </div>

            <button
              onClick={() => setCurrentPage('home')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#006B4F] text-white text-xs font-bold hover:bg-[#00543E] transition-colors cursor-pointer shadow-xs"
            >
              <span>Back to Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Status Toast Banner */}
        {statusMessage && (
          <div className="bg-emerald-600 text-white px-6 py-2.5 text-xs font-bold flex items-center justify-between shadow-sm animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{statusMessage}</span>
            </div>
            <button onClick={() => setStatusMessage(null)} className="text-white/80 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Content Body */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* ========================================================
              TAB 1: DASHBOARD OVERVIEW
             ======================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Header Title with quick actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 font-heading tracking-tight">
                    Clinic Management Overview
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Real-time operational dashboard for {clinicInfo.name}, Fareed Town Sahiwal.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      setAppointmentForm({
                        petName: '',
                        petType: 'Dog',
                        owner: '',
                        phone: '',
                        service: 'General Checkups',
                        vet: 'Dr. Ahmad Raza',
                        dateTime: 'Today 04:00 PM'
                      });
                      setModalType('appointment');
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#006B4F] text-white text-xs font-bold hover:bg-[#00543E] shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Appointment</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('content')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-emerald-300 text-[#006B4F] text-xs font-bold hover:bg-emerald-50 shadow-2xs cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Site Content</span>
                  </button>
                </div>
              </div>

              {/* Stats Cards Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs text-left">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Appointments</span>
                    <Calendar className="w-5 h-5 text-[#006B4F]" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-emerald-950 font-heading">{appointments.length}</p>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                    {appointments.filter(a => a.status === 'Confirmed' || a.status === 'In Progress').length} Active / Pending
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs text-left">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Store Orders</span>
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-emerald-950 font-heading">{orders.length}</p>
                  <p className="text-[11px] text-blue-600 font-semibold mt-1">
                    PKR {orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()} Total
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs text-left">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Products & Stock</span>
                    <Boxes className="w-5 h-5 text-amber-600" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-emerald-950 font-heading">{products.length}</p>
                  <p className="text-[11px] text-amber-600 font-semibold mt-1">
                    {inventory.filter(i => i.stock <= i.reorderLevel).length} Low Stock Alerts
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs text-left">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Services Active</span>
                    <HeartHandshake className="w-5 h-5 text-teal-600" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-emerald-950 font-heading">{services.length}</p>
                  <p className="text-[11px] text-teal-600 font-semibold mt-1">
                    {doctors.length} Licensed Veterinarians
                  </p>
                </div>
              </div>

              {/* Two Column Layout: Recent Appointments & Recent Orders */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Recent Appointments (7 cols) */}
                <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs text-left space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-emerald-950 font-heading">Recent Appointments</h3>
                      <p className="text-xs text-slate-500">Live patient appointments scheduled at the clinic.</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('appointments')}
                      className="text-xs font-bold text-[#006B4F] hover:underline cursor-pointer"
                    >
                      View All ({appointments.length})
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {appointments.slice(0, 5).map((app) => (
                      <div key={app.id} className="py-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={app.petAvatar}
                            alt={app.petName}
                            className="w-10 h-10 rounded-xl object-cover border border-emerald-100 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                              {app.petName} <span className="font-normal text-slate-500">({app.petType})</span>
                            </p>
                            <p className="text-[11px] text-slate-500 truncate">
                              {app.owner} • {app.service}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <select
                            value={app.status}
                            onChange={(e) => updateAppointmentStatus(app.id, e.target.value as AdminAppointment['status'])}
                            className="text-[11px] font-bold py-1 px-2 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Shortcuts & Website Status (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Website Quick CMS Access Card */}
                  <div className="bg-gradient-to-br from-[#006B4F] to-[#004D38] text-white p-6 rounded-2xl shadow-md text-left space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-full text-emerald-200">
                        Content Management
                      </span>
                      <Sparkles className="w-5 h-5 text-emerald-300" />
                    </div>
                    <div>
                      <h4 className="text-lg font-extrabold font-heading text-white">Full Website Content Editor</h4>
                      <p className="text-xs text-emerald-100/90 mt-1 leading-relaxed">
                        Easily edit clinic phone, address, hours, hero headlines, doctor profiles, services, shop catalogue, and FAQs.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button
                        onClick={() => setActiveTab('content')}
                        className="py-2.5 px-3 rounded-xl bg-white text-[#006B4F] font-bold text-xs hover:bg-emerald-50 transition-colors text-center shadow-xs cursor-pointer"
                      >
                        General & Texts
                      </button>
                      <button
                        onClick={() => setActiveTab('services')}
                        className="py-2.5 px-3 rounded-xl bg-white/15 text-white hover:bg-white/25 border border-white/20 font-bold text-xs transition-colors text-center cursor-pointer"
                      >
                        Edit Services
                      </button>
                      <button
                        onClick={() => setActiveTab('doctors')}
                        className="py-2.5 px-3 rounded-xl bg-white/15 text-white hover:bg-white/25 border border-white/20 font-bold text-xs transition-colors text-center cursor-pointer"
                      >
                        Edit Doctors
                      </button>
                      <button
                        onClick={() => setActiveTab('shop')}
                        className="py-2.5 px-3 rounded-xl bg-white/15 text-white hover:bg-white/25 border border-white/20 font-bold text-xs transition-colors text-center cursor-pointer"
                      >
                        Edit Pet Shop
                      </button>
                    </div>
                  </div>

                  {/* Low Stock Alerts */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs text-left space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-emerald-950 font-heading">Inventory Status</h4>
                      <button onClick={() => setActiveTab('inventory')} className="text-xs font-bold text-[#006B4F] hover:underline cursor-pointer">
                        Restock
                      </button>
                    </div>

                    <div className="space-y-2">
                      {inventory.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 text-xs">
                          <span className="font-semibold text-slate-800 truncate">{item.productName}</span>
                          <span className={`font-bold px-2 py-0.5 rounded-md text-[10px] ${
                            item.stock <= 5 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {item.stock} in stock
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================
              TAB 2: WEBSITE CONTENT & GENERAL CLINIC INFO (CMS)
             ======================================================== */}
          {activeTab === 'content' && (
            <div className="space-y-8 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 font-heading">
                    Website Content & General Settings
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Changes here immediately update the header, footer, hero sections, and public pages across the entire site.
                  </p>
                </div>
                <button
                  onClick={() => showFeedback('All website content changes have been saved successfully!')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#006B4F] text-white font-bold text-xs shadow-md hover:bg-[#00543E] transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Changes</span>
                </button>
              </div>

              {/* 1. Clinic Core Identity */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
                <h3 className="text-base font-bold text-emerald-950 font-heading flex items-center gap-2">
                  <PawDecor size={18} opacity={1} color="#006B4F" />
                  <span>1. Clinic Name & Branding</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Clinic Name (Logo & Titles)</label>
                    <input
                      type="text"
                      value={clinicInfo.name}
                      onChange={(e) => updateClinicInfo({ name: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#006B4F] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tagline</label>
                    <input
                      type="text"
                      value={clinicInfo.tagline}
                      onChange={(e) => updateClinicInfo({ tagline: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#006B4F] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Sub-Tagline</label>
                    <input
                      type="text"
                      value={clinicInfo.subTagline}
                      onChange={(e) => updateClinicInfo({ subTagline: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#006B4F] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Contact Numbers & Direct Communications */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
                <h3 className="text-base font-bold text-emerald-950 font-heading flex items-center gap-2">
                  <Phone className="w-5 h-5 text-[#006B4F]" />
                  <span>2. Contact Numbers & WhatsApp</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Clinic Phone (Displayed in header & call buttons)</label>
                    <input
                      type="text"
                      value={clinicInfo.phone}
                      onChange={(e) => updateClinicInfo({ phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#006B4F] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Number (Digits only, with country code)</label>
                    <input
                      type="text"
                      value={clinicInfo.whatsapp}
                      onChange={(e) => updateClinicInfo({ whatsapp: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#006B4F] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Official Email Address</label>
                    <input
                      type="email"
                      value={clinicInfo.email}
                      onChange={(e) => updateClinicInfo({ email: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#006B4F] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Clinic Physical Address</label>
                  <input
                    type="text"
                    value={clinicInfo.address}
                    onChange={(e) => updateClinicInfo({ address: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#006B4F] focus:outline-none"
                  />
                </div>
              </div>

              {/* 3. Operating Hours & Top Bar Notice */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
                <h3 className="text-base font-bold text-emerald-950 font-heading flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#006B4F]" />
                  <span>3. Operating Hours & Announcements</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Weekday Hours (Mon – Thu, Sat – Sun)</label>
                    <input
                      type="text"
                      value={clinicInfo.hoursWeekday}
                      onChange={(e) => updateClinicInfo({ hoursWeekday: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#006B4F] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Friday Hours</label>
                    <input
                      type="text"
                      value={clinicInfo.hoursFriday}
                      onChange={(e) => updateClinicInfo({ hoursFriday: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#006B4F] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Sunday Hours</label>
                    <input
                      type="text"
                      value={clinicInfo.hoursSunday}
                      onChange={(e) => updateClinicInfo({ hoursSunday: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#006B4F] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Statistics Counters */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
                <h3 className="text-base font-bold text-emerald-950 font-heading flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#006B4F]" />
                  <span>4. Trust & Statistics Counters</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Clients / Patients Healed Count</label>
                    <input
                      type="text"
                      value={clinicInfo.clientsCount}
                      onChange={(e) => updateClinicInfo({ clientsCount: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#006B4F] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Years of Trust & Service</label>
                    <input
                      type="text"
                      value={clinicInfo.yearsCount}
                      onChange={(e) => updateClinicInfo({ yearsCount: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#006B4F] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Average Clinic Rating</label>
                    <input
                      type="text"
                      value={clinicInfo.rating}
                      onChange={(e) => updateClinicInfo({ rating: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#006B4F] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 5. FAQs Editor */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-emerald-950 font-heading flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#006B4F]" />
                    <span>5. Frequently Asked Questions ({faqs.length})</span>
                  </h3>
                  <button
                    onClick={() => {
                      setFaqForm({ question: '', answer: '', category: 'General' });
                      setEditingFaqIndex(null);
                      setModalType('faq');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#006B4F] text-white text-xs font-bold hover:bg-[#00543E] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New FAQ</span>
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="py-3 flex items-start justify-between gap-4">
                      <div className="space-y-1 max-w-2xl">
                        <p className="text-xs font-bold text-slate-900">{faq.question}</p>
                        <p className="text-xs text-slate-500 leading-relaxed">{faq.answer}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setFaqForm(faq);
                            setEditingFaqIndex(idx);
                            setModalType('faq');
                          }}
                          className="p-1.5 text-slate-400 hover:text-[#006B4F] hover:bg-emerald-50 rounded-lg cursor-pointer"
                          title="Edit FAQ"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            deleteFaq(idx);
                            showFeedback('FAQ item deleted');
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                          title="Delete FAQ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================
              TAB 3: SERVICES MANAGEMENT
             ======================================================== */}
          {activeTab === 'services' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 font-heading">
                    Veterinary Services Management ({services.length})
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Add, edit, or delete any veterinary service offered by Vet for Pet Clinic.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setServiceForm({
                      title: '',
                      description: '',
                      iconName: 'Stethoscope',
                      petImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80',
                      category: 'general',
                      fullDetails: '',
                      badge: 'Routine Care'
                    });
                    setEditingServiceId(null);
                    setModalType('service');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006B4F] text-white font-bold text-xs hover:bg-[#00543E] shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Service</span>
                </button>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((s) => (
                  <div key={s.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-[#006B4F] border border-emerald-200">
                          {s.badge || s.category}
                        </span>
                        <img
                          src={s.petImage}
                          alt={s.title}
                          className="w-10 h-10 rounded-full object-cover border-2 border-emerald-100"
                        />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-emerald-950 font-heading">{s.title}</h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{s.description}</p>
                      </div>
                      {s.fullDetails && (
                        <p className="text-[11px] text-slate-400 bg-slate-50 p-2.5 rounded-xl line-clamp-2">
                          {s.fullDetails}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 capitalize">Category: {s.category}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setServiceForm({
                              title: s.title,
                              description: s.description,
                              iconName: s.iconName,
                              petImage: s.petImage,
                              category: s.category,
                              fullDetails: s.fullDetails || '',
                              badge: s.badge || ''
                            });
                            setEditingServiceId(s.id);
                            setModalType('service');
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#006B4F] hover:bg-emerald-50 cursor-pointer"
                          title="Edit Service"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            deleteService(s.id);
                            showFeedback(`Service "${s.title}" deleted.`);
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 4: DOCTORS & STAFF
             ======================================================== */}
          {activeTab === 'doctors' && (
            <div className="space-y-8 text-left">
              {/* Doctors Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 font-heading">
                    Veterinarians & Clinic Staff
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Manage profiles, credentials, consultation hours, and bios for the medical team.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setDoctorForm({
                        name: '',
                        role: 'Veterinarian',
                        specialty: 'Internal Medicine',
                        experience: '5+ Years Experience',
                        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
                        bio: '',
                        fullBio: '',
                        education: 'DVM (Veterinary Medicine)',
                        availableDays: 'Mon – Sat (10:00 AM – 8:00 PM)'
                      });
                      setEditingDoctorId(null);
                      setModalType('doctor');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006B4F] text-white font-bold text-xs hover:bg-[#00543E] shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Veterinarian</span>
                  </button>
                  <button
                    onClick={() => {
                      setStaffForm({
                        name: '',
                        role: 'Veterinary Technician',
                        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
                      });
                      setModalType('staff');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-emerald-300 text-[#006B4F] font-bold text-xs hover:bg-emerald-50 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Support Staff</span>
                  </button>
                </div>
              </div>

              {/* 1. Veterinarians Grid */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-emerald-950 font-heading">Licensed Veterinarians ({doctors.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctors.map((doc) => (
                    <div key={doc.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-4">
                      <div className="flex gap-4">
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="w-20 h-24 rounded-2xl object-cover shrink-0 border border-slate-100 shadow-2xs"
                        />
                        <div className="min-w-0 space-y-1">
                          <h4 className="text-base font-bold text-emerald-950 font-heading truncate">{doc.name}</h4>
                          <p className="text-xs font-semibold text-[#006B4F]">{doc.role}</p>
                          <p className="text-xs text-slate-500 font-medium">{doc.specialty} • {doc.experience}</p>
                          <p className="text-xs text-slate-600 line-clamp-2 pt-1">{doc.bio}</p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span>{doc.availableDays}</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setDoctorForm({
                                name: doc.name,
                                role: doc.role,
                                specialty: doc.specialty,
                                experience: doc.experience,
                                image: doc.image,
                                bio: doc.bio,
                                fullBio: doc.fullBio || '',
                                education: doc.education || '',
                                availableDays: doc.availableDays || ''
                              });
                              setEditingDoctorId(doc.id);
                              setModalType('doctor');
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-[#006B4F] hover:bg-emerald-50 cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              deleteDoctor(doc.id);
                              showFeedback(`Dr. "${doc.name}" removed.`);
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Support Staff Strip */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-lg font-bold text-emerald-950 font-heading">Support Staff & Technicians ({supportStaff.length})</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {supportStaff.map((staff) => (
                    <div key={staff.id} className="bg-white p-4 rounded-2xl border border-slate-200/80 text-center space-y-2 relative group">
                      <button
                        onClick={() => {
                          deleteSupportStaff(staff.id);
                          showFeedback('Staff member removed.');
                        }}
                        className="absolute top-2 right-2 p-1 text-slate-300 hover:text-red-600 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete staff"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <img
                        src={staff.image}
                        alt={staff.name}
                        className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-emerald-100"
                      />
                      <p className="text-xs font-bold text-slate-900">{staff.name}</p>
                      <p className="text-[11px] text-[#006B4F]">{staff.role}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================
              TAB 5: PET SHOP PRODUCTS
             ======================================================== */}
          {activeTab === 'shop' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 font-heading">
                    Pet Shop Catalogue ({products.length} Products)
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Manage food feeds, supplements, grooming products, toys, and pricing.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setProductForm({
                      name: '',
                      category: 'cat-feed',
                      petType: 'cat',
                      price: 1500,
                      rating: 4.8,
                      reviewCount: 25,
                      image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=500&q=80',
                      inStock: true,
                      isPopular: false,
                      isTopSeller: false,
                      description: ''
                    });
                    setEditingProductId(null);
                    setModalType('product');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006B4F] text-white font-bold text-xs hover:bg-[#00543E] shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">Product</th>
                        <th className="py-3.5 px-4">Category</th>
                        <th className="py-3.5 px-4">Price (PKR)</th>
                        <th className="py-3.5 px-4">Stock Status</th>
                        <th className="py-3.5 px-4">Badges</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0" />
                            <div className="min-w-0">
                              <p className="truncate font-bold text-slate-900">{p.name}</p>
                              <p className="text-[10px] text-slate-400">Pet: {p.petType}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-slate-600 capitalize">{p.category.replace('-', ' ')}</td>
                          <td className="py-3 px-4 font-extrabold text-[#006B4F]">PKR {p.price.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => {
                                updateProduct(p.id, { inStock: !p.inStock });
                                showFeedback(`Updated stock status for ${p.name}`);
                              }}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer ${
                                p.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {p.inStock ? 'In Stock' : 'Out of Stock'}
                            </button>
                          </td>
                          <td className="py-3 px-4 space-x-1">
                            {p.isTopSeller && <span className="text-[9px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">Best Seller</span>}
                            {p.isPopular && <span className="text-[9px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold">Popular</span>}
                          </td>
                          <td className="py-3 px-4 text-right space-x-1">
                            <button
                              onClick={() => {
                                setProductForm({
                                  name: p.name,
                                  category: p.category,
                                  petType: p.petType,
                                  price: p.price,
                                  rating: p.rating,
                                  reviewCount: p.reviewCount,
                                  image: p.image,
                                  inStock: p.inStock,
                                  isPopular: p.isPopular,
                                  isTopSeller: p.isTopSeller,
                                  description: p.description || ''
                                });
                                setEditingProductId(p.id);
                                setModalType('product');
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-[#006B4F] hover:bg-emerald-50 cursor-pointer"
                              title="Edit product"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                deleteProduct(p.id);
                                showFeedback(`Product "${p.name}" deleted.`);
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 6: APPOINTMENTS MANAGEMENT
             ======================================================== */}
          {activeTab === 'appointments' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 font-heading">
                    Patient Appointments ({appointments.length})
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Review incoming appointment requests, update visit statuses, and record offline walk-ins.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setAppointmentForm({
                      petName: '',
                      petType: 'Dog',
                      owner: '',
                      phone: '',
                      service: 'General Checkups',
                      vet: 'Dr. Ahmad Raza',
                      dateTime: 'Today 04:00 PM'
                    });
                    setModalType('appointment');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006B4F] text-white font-bold text-xs hover:bg-[#00543E] shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Book New Appointment</span>
                </button>
              </div>

              {/* Appointments Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">Pet / Owner</th>
                        <th className="py-3.5 px-4">Contact</th>
                        <th className="py-3.5 px-4">Service</th>
                        <th className="py-3.5 px-4">Veterinarian</th>
                        <th className="py-3.5 px-4">Date & Slot</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {appointments.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-4 flex items-center gap-3">
                            <img src={app.petAvatar} alt={app.petName} className="w-8 h-8 rounded-xl object-cover shrink-0 border border-emerald-100" />
                            <div>
                              <p className="font-bold text-slate-900">{app.petName} <span className="font-normal text-slate-500">({app.petType})</span></p>
                              <p className="text-[11px] text-slate-600">{app.owner}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-600">{app.phone}</td>
                          <td className="py-3 px-4 font-semibold text-slate-800">{app.service}</td>
                          <td className="py-3 px-4 text-slate-700">{app.vet}</td>
                          <td className="py-3 px-4 text-slate-500">{app.dateTime}</td>
                          <td className="py-3 px-4">
                            <select
                              value={app.status}
                              onChange={(e) => updateAppointmentStatus(app.id, e.target.value as AdminAppointment['status'])}
                              className="px-2 py-1 rounded-lg border border-slate-200 text-[11px] font-bold bg-white cursor-pointer"
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => {
                                deleteAppointment(app.id);
                                showFeedback('Appointment deleted.');
                              }}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                              title="Delete Appointment"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 7: ORDERS MANAGEMENT
             ======================================================== */}
          {activeTab === 'orders' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 font-heading">
                    Pet Store Orders ({orders.length})
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Track customer delivery orders across Sahiwal and manage dispatch statuses.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">Order #</th>
                        <th className="py-3.5 px-4">Customer</th>
                        <th className="py-3.5 px-4">Items</th>
                        <th className="py-3.5 px-4">Date</th>
                        <th className="py-3.5 px-4">Total Amount</th>
                        <th className="py-3.5 px-4">Delivery Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-[#006B4F]">{o.orderNumber}</td>
                          <td className="py-3 px-4 font-bold text-slate-900">{o.customer}</td>
                          <td className="py-3 px-4 text-slate-600">{o.itemsCount} items</td>
                          <td className="py-3 px-4 text-slate-500">{o.date}</td>
                          <td className="py-3 px-4 font-black text-slate-900">PKR {o.total.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <select
                              value={o.status}
                              onChange={(e) => updateOrderStatus(o.id, e.target.value as AdminOrder['status'])}
                              className="px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] font-bold bg-white cursor-pointer"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 8: INVENTORY MANAGEMENT
             ======================================================== */}
          {activeTab === 'inventory' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 font-heading">
                    Stock & Inventory Tracker ({inventory.length} items)
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Live inventory counts, reorder alerts, and one-click restocking.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setRestockItemId(inventory[0]?.id || '');
                    setRestockAmount(20);
                    setModalType('restock');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006B4F] text-white font-bold text-xs hover:bg-[#00543E] shadow-sm cursor-pointer"
                >
                  <Boxes className="w-4 h-4" />
                  <span>Receive Shipment / Restock</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">Item Name</th>
                        <th className="py-3.5 px-4">Category</th>
                        <th className="py-3.5 px-4">Current Stock</th>
                        <th className="py-3.5 px-4">Reorder Level</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Quick Adjust</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {inventory.map((inv) => (
                        <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-3">
                            <img src={inv.image} alt={inv.productName} className="w-8 h-8 rounded-lg object-cover" />
                            <span>{inv.productName}</span>
                          </td>
                          <td className="py-3 px-4 text-slate-600">{inv.category}</td>
                          <td className="py-3 px-4 font-black text-slate-900">{inv.stock} units</td>
                          <td className="py-3 px-4 text-slate-500">{inv.reorderLevel} units</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              inv.stock <= 5 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {inv.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right space-x-1">
                            <button
                              onClick={() => {
                                updateInventoryStock(inv.id, inv.stock + 10);
                                showFeedback(`Added +10 to ${inv.productName}`);
                              }}
                              className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-[#006B4F] font-bold rounded-lg cursor-pointer"
                            >
                              +10 Units
                            </button>
                            <button
                              onClick={() => {
                                updateInventoryStock(inv.id, Math.max(0, inv.stock - 1));
                              }}
                              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
                            >
                              -1
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 9: GALLERY MANAGEMENT
             ======================================================== */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 font-heading">
                    Photo Gallery Management ({galleryItems.length} photos)
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Add, edit, or remove photos shown on the public Gallery page and patient highlights.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setGalleryForm({
                      title: '',
                      category: 'dogs',
                      imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
                      likes: 50
                    });
                    setEditingGalleryId(null);
                    setModalType('gallery');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006B4F] text-white font-bold text-xs hover:bg-[#00543E] shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload New Photo</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryItems.map((g) => (
                  <div key={g.id} className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs flex flex-col justify-between group">
                    <div className="relative aspect-square">
                      <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-slate-800 capitalize shadow-2xs">
                        {g.category}
                      </span>
                    </div>
                    <div className="p-3 space-y-2">
                      <p className="text-xs font-bold text-slate-900 truncate">{g.title}</p>
                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                        <span className="text-[11px] text-slate-400">{g.likes} likes</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              deleteGalleryItem(g.id);
                              showFeedback('Photo removed from gallery.');
                            }}
                            className="p-1 text-slate-400 hover:text-red-600 rounded-md cursor-pointer"
                            title="Delete Photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 10: REVIEWS & TESTIMONIALS
             ======================================================== */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 font-heading">
                    Customer Reviews & Testimonials ({testimonials.length})
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Manage real client testimonials displayed on Home and About pages.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setTestimonialForm({
                      author: '',
                      role: 'Pet Parent, Sahiwal',
                      petName: '',
                      petType: 'Dog',
                      rating: 5,
                      comment: '',
                      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
                      date: 'Just now'
                    });
                    setEditingTestimonialId(null);
                    setModalType('testimonial');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006B4F] text-white font-bold text-xs hover:bg-[#00543E] shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Review</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map((t) => (
                  <div key={t.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex text-amber-400 gap-0.5">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400">{t.date}</span>
                      </div>
                      <p className="text-xs text-slate-700 italic leading-relaxed">“{t.comment}”</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img src={t.avatar} alt={t.author} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{t.author}</p>
                          <p className="text-[10px] text-slate-500">{t.role}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          deleteTestimonial(t.id);
                          showFeedback('Review deleted.');
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg cursor-pointer"
                        title="Delete Review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 11: PATIENTS DIRECTORY
             ======================================================== */}
          {activeTab === 'patients' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 font-heading">
                    Registered Patients Directory
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Clinical records of dogs, cats, rabbits, and birds treated at Vet for Pet Clinic.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Milo", type: "Cat (Persian)", owner: "Sara Khan", phone: "0321-9876543", lastVisit: "Dec 08, 2026", photo: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=200&q=80", tag: "Vaccination Up to date" },
                  { name: "Buddy", type: "Dog (Golden Retriever)", owner: "Ahmed Raza", phone: "0300-1234567", lastVisit: "Dec 05, 2026", photo: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=200&q=80", tag: "Routine Checkup" },
                  { name: "Snowy", type: "Rabbit (Angora)", owner: "Ayesha Malik", phone: "0333-8899112", lastVisit: "Nov 28, 2026", photo: "https://images.unsplash.com/photo-1589952283406-b53a7d13d368?auto=format&fit=crop&w=200&q=80", tag: "Dewormed" },
                  { name: "Bella", type: "Dog (Beagle)", owner: "Usman Khan", phone: "0302-4455667", lastVisit: "Nov 22, 2026", photo: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=200&q=80", tag: "Dental Cleaning" },
                  { name: "Luna", type: "Cat (Siamese)", owner: "Farhan Ali", phone: "0312-3344556", lastVisit: "Nov 15, 2026", photo: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=200&q=80", tag: "Pediatric Care" },
                  { name: "Rocky", type: "Dog (German Shepherd)", owner: "Bilal Ahmed", phone: "0345-6677889", lastVisit: "Nov 10, 2026", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", tag: "Skin Treatment" },
                ].map((p, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
                    <div className="flex items-center gap-3">
                      <img src={p.photo} alt={p.name} className="w-12 h-12 rounded-2xl object-cover border border-emerald-100" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{p.name}</h4>
                        <p className="text-xs text-slate-500">{p.type}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-100 text-xs space-y-1 text-slate-600">
                      <p><span className="text-slate-400">Owner:</span> {p.owner}</p>
                      <p><span className="text-slate-400">Phone:</span> {p.phone}</p>
                      <p><span className="text-slate-400">Last Exam:</span> {p.lastVisit}</p>
                    </div>
                    <div className="pt-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#006B4F] border border-emerald-200">
                        {p.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 12: MESSAGES INBOX
             ======================================================== */}
          {activeTab === 'messages' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 font-heading">
                    Customer Messages & Inquiries ({messages.length})
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Incoming inquiries from the Contact form and website chat.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs divide-y divide-slate-100">
                {messages.map((m) => (
                  <div key={m.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                    <div className="flex items-start gap-3.5">
                      <img src={m.senderAvatar} alt={m.sender} className="w-10 h-10 rounded-full object-cover shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs sm:text-sm font-bold text-slate-900">{m.sender}</p>
                          {(m.unreadCount || 0) > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#006B4F] text-white">
                              New
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400">{m.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{m.message}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <a
                        href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20${encodeURIComponent(m.sender)},%20regarding%20your%20inquiry%20at%20${encodeURIComponent(clinicInfo.name)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-[#006B4F] font-bold text-xs hover:bg-emerald-100"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Reply WhatsApp</span>
                      </a>
                      <button
                        onClick={() => {
                          deleteMessage(m.id);
                          showFeedback('Message archived.');
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 13: CLINIC SETTINGS
             ======================================================== */}
          {activeTab === 'settings' && (
            <div className="space-y-6 text-left max-w-3xl">
              <div className="pb-4 border-b border-slate-200">
                <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 font-heading">
                  System Settings & Preferences
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Global operational toggles, notification options, and clinic reset.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Online Appointment Booking</p>
                    <p className="text-xs text-slate-500">Allow pet parents to book online through website forms.</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Enabled</span>
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Currency Standard</p>
                    <p className="text-xs text-slate-500">Pakistani Rupee (PKR)</p>
                  </div>
                  <span className="text-xs font-bold font-mono text-slate-700">PKR (Rs.)</span>
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Interactive Cart & Pet Shop</p>
                    <p className="text-xs text-slate-500">Enable in-clinic pet feed and product catalogue browsing.</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Active</span>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setModalType('resetConfirm')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset All Website & Admin Data to Factory Initial</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 14: ANALYTICS OVERVIEW
             ======================================================== */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 text-left">
              <div className="pb-4 border-b border-slate-200">
                <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 font-heading">
                  Performance & Analytics
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Overview of patient treatment volumes, most requested services, and shop sales.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
                  <h4 className="text-sm font-bold text-emerald-950 font-heading">Patient Species Ratio</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Dogs & Puppies</span>
                        <span className="text-[#006B4F]">54%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#006B4F] h-full w-[54%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Cats & Kittens</span>
                        <span className="text-teal-600">36%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-teal-500 h-full w-[36%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Rabbits & Birds</span>
                        <span className="text-amber-600">10%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full w-[10%]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
                  <h4 className="text-sm font-bold text-emerald-950 font-heading">Most Popular Services</h4>
                  <ul className="text-xs space-y-2.5 text-slate-600">
                    <li className="flex items-center justify-between">
                      <span>General Health Checkups</span>
                      <span className="font-bold text-slate-900">42%</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Vaccination Protocols</span>
                      <span className="font-bold text-slate-900">28%</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Treatment & Soft Surgery</span>
                      <span className="font-bold text-slate-900">16%</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Pet Grooming & Spa</span>
                      <span className="font-bold text-slate-900">14%</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
                  <h4 className="text-sm font-bold text-emerald-950 font-heading">Client Satisfaction</h4>
                  <div className="text-center py-2 space-y-1">
                    <p className="text-4xl font-black text-[#006B4F] font-heading">{clinicInfo.rating} ★</p>
                    <p className="text-xs font-bold text-slate-700">100% Five-Star Satisfaction</p>
                    <p className="text-[11px] text-slate-400">Based on Google Reviews in Sahiwal</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ========================================================
          MODALS FOR ACTIONS & CONTENT CREATION
         ======================================================== */}
      
      {/* 1. APPOINTMENT MODAL */}
      {modalType === 'appointment' && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Book Patient Appointment</h3>
              <button onClick={() => setModalType(null)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              addAppointment({
                id: `app-${Date.now()}`,
                petName: appointmentForm.petName,
                petType: appointmentForm.petType,
                petAvatar: appointmentForm.petType.toLowerCase().includes('cat')
                  ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=100&q=80'
                  : 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=100&q=80',
                owner: appointmentForm.owner,
                phone: appointmentForm.phone,
                service: appointmentForm.service,
                vet: appointmentForm.vet,
                dateTime: appointmentForm.dateTime,
                status: 'Confirmed'
              });
              setModalType(null);
              showFeedback(`Appointment confirmed for ${appointmentForm.petName}!`);
            }} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Pet Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Leo"
                  value={appointmentForm.petName}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, petName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pet Type</label>
                  <select
                    value={appointmentForm.petType}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, petType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Bird">Bird</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Owner Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Mehmood"
                    value={appointmentForm.owner}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, owner: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Owner Contact Phone *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 0300-1122334"
                  value={appointmentForm.phone}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Service</label>
                  <select
                    value={appointmentForm.service}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, service: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    {services.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Veterinarian</label>
                  <select
                    value={appointmentForm.vet}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, vet: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    {doctors.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Date & Time Slot</label>
                <input
                  type="text"
                  value={appointmentForm.dateTime}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, dateTime: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#006B4F] text-white font-bold text-xs hover:bg-[#00543E] cursor-pointer shadow-md"
              >
                Save & Confirm Appointment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. SERVICE MODAL */}
      {modalType === 'service' && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {editingServiceId ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button onClick={() => setModalType(null)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (editingServiceId) {
                updateService(editingServiceId, serviceForm);
                showFeedback(`Service "${serviceForm.title}" updated.`);
              } else {
                addService({
                  id: `srv-${Date.now()}`,
                  ...serviceForm
                });
                showFeedback(`Service "${serviceForm.title}" created.`);
              }
              setModalType(null);
            }} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Service Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Laser Therapy"
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="general">General</option>
                    <option value="surgery">Surgery</option>
                    <option value="wellness">Wellness</option>
                    <option value="specialized">Specialized</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Badge Text</label>
                <input
                  type="text"
                  placeholder="e.g. Advanced Care"
                  value={serviceForm.badge}
                  onChange={(e) => setServiceForm({ ...serviceForm, badge: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Description (for cards) *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Brief summary of this clinical service..."
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Clinical Details (for modal & detail page)</label>
                <textarea
                  rows={3}
                  placeholder="Comprehensive procedures, equipment used, and preparation instructions..."
                  value={serviceForm.fullDetails}
                  onChange={(e) => setServiceForm({ ...serviceForm, fullDetails: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Pet Illustration / Image URL</label>
                <input
                  type="url"
                  value={serviceForm.petImage}
                  onChange={(e) => setServiceForm({ ...serviceForm, petImage: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#006B4F] text-white font-bold text-xs hover:bg-[#00543E] cursor-pointer shadow-md"
              >
                {editingServiceId ? 'Save Service Updates' : 'Add Service to Public Site'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. DOCTOR MODAL */}
      {modalType === 'doctor' && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {editingDoctorId ? 'Edit Veterinarian' : 'Add New Veterinarian'}
              </h3>
              <button onClick={() => setModalType(null)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (editingDoctorId) {
                updateDoctor(editingDoctorId, doctorForm);
                showFeedback(`Doctor ${doctorForm.name} updated.`);
              } else {
                addDoctor({
                  id: `doc-${Date.now()}`,
                  ...doctorForm
                });
                showFeedback(`Doctor ${doctorForm.name} added.`);
              }
              setModalType(null);
            }} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Usman Tariq"
                    value={doctorForm.name}
                    onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Role / Designation</label>
                  <input
                    type="text"
                    placeholder="e.g. Veterinary Surgeon"
                    value={doctorForm.role}
                    onChange={(e) => setDoctorForm({ ...doctorForm, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Specialties</label>
                  <input
                    type="text"
                    placeholder="e.g. Orthopedics, Surgery"
                    value={doctorForm.specialty}
                    onChange={(e) => setDoctorForm({ ...doctorForm, specialty: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Experience Years</label>
                  <input
                    type="text"
                    placeholder="e.g. 6+ Years Experience"
                    value={doctorForm.experience}
                    onChange={(e) => setDoctorForm({ ...doctorForm, experience: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Biography *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Overview of veterinarian passion and experience..."
                  value={doctorForm.bio}
                  onChange={(e) => setDoctorForm({ ...doctorForm, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Education / Degrees</label>
                  <input
                    type="text"
                    placeholder="DVM, M.Phil"
                    value={doctorForm.education}
                    onChange={(e) => setDoctorForm({ ...doctorForm, education: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Consultation Schedule</label>
                  <input
                    type="text"
                    placeholder="Mon – Sat (10:00 AM – 8:00 PM)"
                    value={doctorForm.availableDays}
                    onChange={(e) => setDoctorForm({ ...doctorForm, availableDays: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Doctor Photo URL</label>
                <input
                  type="url"
                  value={doctorForm.image}
                  onChange={(e) => setDoctorForm({ ...doctorForm, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#006B4F] text-white font-bold text-xs hover:bg-[#00543E] cursor-pointer shadow-md"
              >
                {editingDoctorId ? 'Save Doctor Profile' : 'Add Veterinarian to Team Page'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 4. PRODUCT MODAL */}
      {modalType === 'product' && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {editingProductId ? 'Edit Product' : 'Add Product to Shop'}
              </h3>
              <button onClick={() => setModalType(null)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (editingProductId) {
                updateProduct(editingProductId, productForm);
                showFeedback(`Product ${productForm.name} updated.`);
              } else {
                addProduct({
                  id: `prod-${Date.now()}`,
                  ...productForm
                });
                showFeedback(`Product ${productForm.name} added to shop.`);
              }
              setModalType(null);
            }} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Canin Kitten Food"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="cat-feed">Cat Feed</option>
                    <option value="cat-accessories">Cat Accessories</option>
                    <option value="dog-food">Dog Food</option>
                    <option value="dog-accessories">Dog Accessories</option>
                    <option value="grooming">Grooming & Shampoos</option>
                    <option value="supplements">Supplements & Vitamins</option>
                    <option value="toys">Toys</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pet Type</label>
                  <select
                    value={productForm.petType}
                    onChange={(e) => setProductForm({ ...productForm, petType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="cat">Cats</option>
                    <option value="dog">Dogs</option>
                    <option value="all">All Pets</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Stock Availability</label>
                  <select
                    value={productForm.inStock ? 'true' : 'false'}
                    onChange={(e) => setProductForm({ ...productForm, inStock: e.target.value === 'true' })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Image URL</label>
                <input
                  type="url"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Description</label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#006B4F] text-white font-bold text-xs hover:bg-[#00543E] cursor-pointer shadow-md"
              >
                {editingProductId ? 'Save Product Details' : 'Publish Product to Shop'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 5. FAQ MODAL */}
      {modalType === 'faq' && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {editingFaqIndex !== null ? 'Edit FAQ' : 'Add FAQ Item'}
              </h3>
              <button onClick={() => setModalType(null)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (editingFaqIndex !== null) {
                updateFaq(editingFaqIndex, faqForm);
                showFeedback('FAQ updated.');
              } else {
                addFaq(faqForm);
                showFeedback('New FAQ published.');
              }
              setModalType(null);
            }} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Question *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Do I need an appointment for routine vaccination?"
                  value={faqForm.question}
                  onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Answer *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Clear and detailed clinic policy or medical advice..."
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#006B4F] text-white font-bold text-xs hover:bg-[#00543E] cursor-pointer shadow-md"
              >
                Save FAQ
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 6. RESTOCK MODAL */}
      {modalType === 'restock' && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Restock Product Inventory</h3>
              <button onClick={() => setModalType(null)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Item to Restock</label>
                <select
                  value={restockItemId}
                  onChange={(e) => setRestockItemId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                >
                  {inventory.map(i => (
                    <option key={i.id} value={i.id}>{i.productName} (Current: {i.stock})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Units Received</label>
                <input
                  type="number"
                  value={restockAmount}
                  onChange={(e) => setRestockAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <button
                onClick={() => {
                  const target = inventory.find(i => i.id === restockItemId);
                  if (target) {
                    updateInventoryStock(target.id, target.stock + restockAmount);
                    showFeedback(`Added ${restockAmount} units to ${target.productName}`);
                  }
                  setModalType(null);
                }}
                className="w-full py-3 rounded-xl bg-[#006B4F] text-white font-bold text-xs hover:bg-[#00543E] cursor-pointer shadow-md"
              >
                Confirm Restock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. FACTORY RESET CONFIRMATION MODAL */}
      {modalType === 'resetConfirm' && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Reset All Data?</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              This will restore all default clinic details, original services, doctors, and products. Any custom edits saved to your browser will be reset.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setModalType(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetAllToDefaults();
                  setModalType(null);
                  showFeedback('All clinic data restored to default initial state.');
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm cursor-pointer"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
