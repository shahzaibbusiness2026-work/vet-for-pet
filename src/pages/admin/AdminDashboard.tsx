import React, { useState } from 'react';
import { PageType, AdminTab, AdminAppointment, AdminOrder, InventoryItem } from '../../types';
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
  Bell, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  Filter, 
  ExternalLink,
  Phone,
  MessageCircle,
  Menu,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { 
  CLINIC_INFO, 
  ADMIN_APPOINTMENTS, 
  ADMIN_ORDERS, 
  INVENTORY_ITEMS, 
  VET_SCHEDULE, 
  CUSTOMER_MESSAGES, 
  TESTIMONIALS,
  SERVICES,
  DOCTORS,
  PRODUCTS
} from '../../data/mockData';
import { Logo } from '../../components/common/Logo';
import { PawDecor } from '../../components/common/PawDecor';

interface AdminDashboardProps {
  setCurrentPage: (page: PageType) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState<AdminAppointment[]>(ADMIN_APPOINTMENTS);
  const [orders, setOrders] = useState<AdminOrder[]>(ADMIN_ORDERS);
  const [inventory, setInventory] = useState<InventoryItem[]>(INVENTORY_ITEMS);
  const [selectedDate, setSelectedDate] = useState('Today, Dec 10, 2026');
  
  // Modals for Quick Actions
  const [actionModal, setActionModal] = useState<'appointment' | 'product' | 'inventory' | null>(null);
  const [newAppointmentData, setNewAppointmentData] = useState({
    petName: '',
    owner: '',
    phone: '',
    service: 'General Checkup',
    vet: 'Dr. Sarah Khan',
    dateTime: 'Today 05:00 PM'
  });

  const sidebarLinks: { id: AdminTab; label: string; icon: any; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'patients', label: 'Patients', icon: PawDecor },
    { id: 'doctors', label: 'Doctors', icon: Stethoscope },
    { id: 'services', label: 'Services', icon: HeartHandshake },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'inventory', label: 'Inventory', icon: Boxes },
    { id: 'customers', label: 'Customers', icon: UserCheck },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 3 },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppointmentData.petName || !newAppointmentData.owner) return;
    const newApp: AdminAppointment = {
      id: `app-${Date.now()}`,
      petName: newAppointmentData.petName,
      petType: 'Dog',
      petAvatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=100&q=80',
      owner: newAppointmentData.owner,
      phone: newAppointmentData.phone || '0300-1122334',
      service: newAppointmentData.service,
      vet: newAppointmentData.vet,
      dateTime: newAppointmentData.dateTime,
      status: 'Confirmed'
    };
    setAppointments([newApp, ...appointments]);
    setActionModal(null);
    setNewAppointmentData({
      petName: '',
      owner: '',
      phone: '',
      service: 'General Checkup',
      vet: 'Dr. Sarah Khan',
      dateTime: 'Today 05:00 PM'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'In Progress':
      case 'Processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Confirmed':
      case 'Shipped':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F6] text-[#1E293B] flex">
      {/* 1. SIDEBAR (DESKTOP FIXED & MOBILE DRAWER) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
      }`}>
        <div>
          {/* Logo */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <button onClick={() => setCurrentPage('home')} className="text-left">
              <Logo subtext="Admin Management System" />
            </button>
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)] no-scrollbar">
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
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#006B4F] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.id === 'patients' ? (
                      <PawDecor size={18} opacity={1} color={isActive ? '#FFFFFF' : '#006B4F'} />
                    ) : (
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                    )}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
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
        </div>

        {/* Sidebar Bottom Promo Card */}
        <div className="p-4 border-t border-gray-100">
          <div className="bg-[#EBF8F3] p-3 rounded-2xl border border-emerald-100 flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=100&q=80"
              alt="Clinic puppy"
              className="w-10 h-10 rounded-xl object-cover shrink-0"
            />
            <div className="text-left min-w-0">
              <p className="text-xs font-bold text-[#004D38] truncate">Vet for Pet Sahiwal</p>
              <button 
                onClick={() => setCurrentPage('home')}
                className="text-[11px] text-[#006B4F] font-semibold hover:underline flex items-center gap-1 mt-0.5"
              >
                <span>View Public Site</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>
            </div>
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
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-lg">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Global Search Bar */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search patients, owners, appointments, products... (Ctrl+K)"
                className="w-full pl-9 pr-12 py-2 text-xs rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-[#006B4F]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <span className="hidden sm:inline-block absolute right-2.5 top-2 text-[10px] font-mono text-gray-400 bg-gray-200/60 px-1.5 py-0.5 rounded">
                Ctrl+K
              </span>
            </div>
          </div>

          {/* Right Header User & Actions */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* View Clinic Web Button */}
            <button
              onClick={() => setCurrentPage('home')}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#006B4F]" />
              <span>Back to Clinic Site</span>
            </button>

            {/* Notification Bell */}
            <button className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>

            {/* Admin Profile */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1594824813633-91c2f9e42104?auto=format&fit=crop&w=100&q=80"
                alt="Dr. Sarah Khan"
                className="w-8 h-8 rounded-full object-cover border border-emerald-200"
              />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-gray-900 leading-tight">Dr. Sarah Khan</p>
                <p className="text-[10px] text-gray-500 leading-tight">Admin & Lead Vet</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Admin Body based on activeTab */}
        <main className="p-4 sm:p-8 space-y-8 flex-1">
          
          {activeTab === 'dashboard' ? (
            <>
              {/* WELCOME BANNER (MATCHING IMAGE 9) */}
              <div className="bg-gradient-to-r from-[#EAF6F0] via-[#F4FAF7] to-white rounded-3xl p-6 sm:p-8 border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs text-left">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white text-xs font-bold text-[#006B4F] shadow-2xs border border-emerald-100">
                      📅 {selectedDate}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#004D38] tracking-tight">
                    Welcome back, Dr. Sarah Khan! 👋
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Here’s what’s happening at Vet for Pet Clinic today. You have <strong className="text-emerald-800">28 patients</strong> scheduled and <strong className="text-emerald-800">56 orders</strong> pending.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActionModal('appointment')}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#006B4F] hover:bg-[#00543E] text-white text-xs font-bold shadow-md transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Appointment</span>
                  </button>
                  <button
                    onClick={() => setActionModal('product')}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white hover:bg-emerald-50 text-[#006B4F] border border-[#006B4F]/30 text-xs font-bold transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Product</span>
                  </button>
                </div>
              </div>

              {/* 6 TOP METRIC CARDS */}
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs text-left space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#006B4F] flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-medium">Total Appointments</span>
                    <h3 className="text-xl font-black text-gray-900 mt-0.5">134</h3>
                  </div>
                  <div className="flex items-center text-[11px] font-bold text-emerald-600">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>+12% vs last mo</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs text-left space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <PawDecor size={18} opacity={1} color="#2563EB" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-medium">Today’s Patients</span>
                    <h3 className="text-xl font-black text-gray-900 mt-0.5">28</h3>
                  </div>
                  <div className="flex items-center text-[11px] font-bold text-emerald-600">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>+8% vs yesterday</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs text-left space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-medium">Shop Orders</span>
                    <h3 className="text-xl font-black text-gray-900 mt-0.5">56</h3>
                  </div>
                  <div className="flex items-center text-[11px] font-bold text-emerald-600">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>+24% vs week</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs text-left space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#006B4F] flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-medium">Revenue (PKR)</span>
                    <h3 className="text-lg sm:text-xl font-black text-gray-900 mt-0.5">285,420</h3>
                  </div>
                  <div className="flex items-center text-[11px] font-bold text-emerald-600">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>+18% vs mo</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs text-left space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-medium">Low Stock Alerts</span>
                    <h3 className="text-xl font-black text-gray-900 mt-0.5">7</h3>
                  </div>
                  <div className="flex items-center text-[11px] font-bold text-amber-600">
                    <ArrowDownRight className="w-3.5 h-3.5" />
                    <span>-3 vs last wk</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs text-left space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                    <Star className="w-4 h-4 fill-amber-400" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-medium">Reviews Avg</span>
                    <h3 className="text-xl font-black text-gray-900 mt-0.5">4.9</h3>
                  </div>
                  <div className="flex items-center text-[11px] font-bold text-emerald-600">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>+0.2 rating</span>
                  </div>
                </div>
              </div>

              {/* CHARTS ROW (SVG VISUALIZATIONS) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Chart 1: Appointments Overview Bar Chart (6 cols) */}
                <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-2xs space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">Appointments Overview</h3>
                      <p className="text-xs text-gray-400">Monthly patient trends</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1.5 text-gray-600">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#006B4F]"></span> New
                      </span>
                      <span className="flex items-center gap-1.5 text-gray-600">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#93E2C4]"></span> Follow-up
                      </span>
                    </div>
                  </div>

                  {/* SVG Bar Chart */}
                  <div className="h-52 w-full pt-4">
                    <svg viewBox="0 0 500 180" className="w-full h-full overflow-visible">
                      {/* Grid lines */}
                      <line x1="0" y1="30" x2="500" y2="30" stroke="#F1F5F9" strokeWidth="1" />
                      <line x1="0" y1="80" x2="500" y2="80" stroke="#F1F5F9" strokeWidth="1" />
                      <line x1="0" y1="130" x2="500" y2="130" stroke="#F1F5F9" strokeWidth="1" />
                      
                      {/* 12 months bars */}
                      {[
                        { m: 'Jan', v1: 60, v2: 40 },
                        { m: 'Feb', v1: 75, v2: 50 },
                        { m: 'Mar', v1: 85, v2: 60 },
                        { m: 'Apr', v1: 95, v2: 70 },
                        { m: 'May', v1: 110, v2: 85 },
                        { m: 'Jun', v1: 125, v2: 90 },
                        { m: 'Jul', v1: 115, v2: 85 },
                        { m: 'Aug', v1: 130, v2: 95 },
                        { m: 'Sep', v1: 140, v2: 105 },
                        { m: 'Oct', v1: 150, v2: 110 },
                        { m: 'Nov', v1: 160, v2: 115 },
                        { m: 'Dec', v1: 170, v2: 125 },
                      ].map((bar, i) => {
                        const x = 20 + i * 40;
                        const h1 = (bar.v1 / 180) * 120;
                        const h2 = (bar.v2 / 180) * 120;
                        return (
                          <g key={i}>
                            <rect x={x} y={150 - h2} width="10" height={h2} rx="4" fill="#93E2C4" />
                            <rect x={x + 12} y={150 - h1} width="10" height={h1} rx="4" fill="#006B4F" />
                            <text x={x + 11} y="170" fontSize="10" fill="#94A3B8" textAnchor="middle">{bar.m}</text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>

                {/* Chart 2: Sales & Revenue Line Chart (6 cols) */}
                <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-2xs space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">Sales & Revenue</h3>
                      <p className="text-xs text-gray-400">Total: PKR 285,420</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-[#006B4F] font-bold">
                      +18% Growth
                    </span>
                  </div>

                  {/* SVG Line Graph with Area Fill */}
                  <div className="h-52 w-full pt-4">
                    <svg viewBox="0 0 500 180" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      <line x1="0" y1="30" x2="500" y2="30" stroke="#F1F5F9" strokeWidth="1" />
                      <line x1="0" y1="80" x2="500" y2="80" stroke="#F1F5F9" strokeWidth="1" />
                      <line x1="0" y1="130" x2="500" y2="130" stroke="#F1F5F9" strokeWidth="1" />

                      {/* Area Fill */}
                      <path
                        d="M 20 130 Q 80 110, 140 100 T 260 70 T 380 45 T 480 25 L 480 150 L 20 150 Z"
                        fill="url(#revenueGrad)"
                      />

                      {/* Line */}
                      <path
                        d="M 20 130 Q 80 110, 140 100 T 260 70 T 380 45 T 480 25"
                        fill="none"
                        stroke="#006B4F"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />

                      {/* Points */}
                      {[
                        { x: 20, y: 130 },
                        { x: 140, y: 100 },
                        { x: 260, y: 70 },
                        { x: 380, y: 45 },
                        { x: 480, y: 25 },
                      ].map((pt, idx) => (
                        <circle key={idx} cx={pt.x} cy={pt.y} r="4.5" fill="#006B4F" stroke="#FFFFFF" strokeWidth="2" />
                      ))}

                      {/* Months */}
                      <text x="20" y="170" fontSize="10" fill="#94A3B8">Jan</text>
                      <text x="140" y="170" fontSize="10" fill="#94A3B8">Apr</text>
                      <text x="260" y="170" fontSize="10" fill="#94A3B8">Jul</text>
                      <text x="380" y="170" fontSize="10" fill="#94A3B8">Oct</text>
                      <text x="480" y="170" fontSize="10" fill="#94A3B8">Dec</text>
                    </svg>
                  </div>
                </div>

              </div>

              {/* RECENT APPOINTMENTS & RECENT ORDERS TABLES */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Recent Appointments (7 cols) */}
                <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-100 shadow-2xs space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#006B4F]" />
                      <h3 className="text-base font-bold text-gray-900">Recent Appointments</h3>
                    </div>
                    <button 
                      onClick={() => setActiveTab('appointments')}
                      className="text-xs font-bold text-[#006B4F] hover:underline"
                    >
                      View All ➔
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                          <th className="pb-3">Pet Name</th>
                          <th className="pb-3">Owner</th>
                          <th className="pb-3">Service</th>
                          <th className="pb-3">Vet</th>
                          <th className="pb-3">Date & Time</th>
                          <th className="pb-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {appointments.slice(0, 5).map((app) => (
                          <tr key={app.id} className="hover:bg-gray-50/60 transition-colors">
                            <td className="py-3 flex items-center gap-2">
                              <img src={app.petAvatar} alt={app.petName} className="w-7 h-7 rounded-full object-cover" />
                              <span className="font-bold text-gray-900">{app.petName}</span>
                            </td>
                            <td className="py-3 text-gray-600">{app.owner}</td>
                            <td className="py-3 text-gray-600">{app.service}</td>
                            <td className="py-3 text-gray-600">{app.vet}</td>
                            <td className="py-3 text-gray-500 text-[11px]">{app.dateTime}</td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(app.status)}`}>
                                {app.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recent Shop Orders (5 cols) */}
                <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-2xs space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-[#006B4F]" />
                      <h3 className="text-base font-bold text-gray-900">Recent Shop Orders</h3>
                    </div>
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-[#006B4F] hover:underline"
                    >
                      View All ➔
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                          <th className="pb-3">Order #</th>
                          <th className="pb-3">Customer</th>
                          <th className="pb-3">Items</th>
                          <th className="pb-3">Total</th>
                          <th className="pb-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {orders.slice(0, 5).map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50/60 transition-colors">
                            <td className="py-3 font-mono font-bold text-[#006B4F]">{order.orderNumber}</td>
                            <td className="py-3 text-gray-800">{order.customer}</td>
                            <td className="py-3 text-gray-500">{order.itemsCount} items</td>
                            <td className="py-3 font-bold text-gray-900">PKR {order.total.toLocaleString()}</td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              {/* LOW STOCK INVENTORY, DONUT CHART & VET SCHEDULE */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Low Stock Inventory (4 cols) */}
                <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-2xs space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="w-4 h-4" />
                      <h3 className="text-sm font-bold text-gray-900">Low Stock Inventory</h3>
                    </div>
                    <button 
                      onClick={() => setActiveTab('inventory')}
                      className="text-xs font-bold text-[#006B4F] hover:underline"
                    >
                      Manage ➔
                    </button>
                  </div>

                  <div className="space-y-3">
                    {inventory.slice(0, 4).map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2 rounded-xl bg-gray-50 text-xs">
                        <div className="flex items-center gap-2">
                          <img src={item.image} alt={item.productName} className="w-8 h-8 rounded-lg object-cover" />
                          <div>
                            <p className="font-bold text-gray-900 truncate max-w-[130px]">{item.productName}</p>
                            <span className="text-[10px] text-gray-400">{item.category}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-red-600">{item.stock} left</span>
                          <span className="text-[10px] text-gray-400 block">Min: {item.reorderLevel}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shop Category Breakdown Donut Chart (4 cols) */}
                <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-2xs space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gray-900">Shop Category Breakdown</h3>
                    <span className="text-[10px] text-gray-400">This Month</span>
                  </div>

                  <div className="flex items-center justify-center relative py-2">
                    {/* SVG Donut */}
                    <svg width="150" height="150" viewBox="0 0 42 42" className="rotate-[-90deg]">
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#E2E8F0" strokeWidth="5" />
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#006B4F" strokeWidth="5" strokeDasharray="32 68" strokeDashoffset="0" />
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#10B981" strokeWidth="5" strokeDasharray="24 76" strokeDashoffset="-32" />
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#3B82F6" strokeWidth="5" strokeDasharray="16 84" strokeDashoffset="-56" />
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#F59E0B" strokeWidth="5" strokeDasharray="12 88" strokeDashoffset="-72" />
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#8B5CF6" strokeWidth="5" strokeDasharray="10 90" strokeDashoffset="-84" />
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#EC4899" strokeWidth="5" strokeDasharray="6 94" strokeDashoffset="-94" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-xs text-gray-400">Total Sales</span>
                      <span className="text-sm font-black text-gray-900">PKR 285k</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#006B4F]"></span> Dog Food 32%</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#10B981]"></span> Cat Food 24%</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span> Accessories 16%</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span> Grooming 12%</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#8B5CF6]"></span> Supplements 10%</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#EC4899]"></span> Toys 6%</span>
                  </div>
                </div>

                {/* Veterinarian Schedule (4 cols) */}
                <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-2xs space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gray-900">Veterinarian Schedule</h3>
                    <span className="text-xs text-[#006B4F] font-bold">Today</span>
                  </div>

                  <div className="space-y-3">
                    {VET_SCHEDULE.map((vet, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 text-xs">
                        <div className="flex items-center gap-2">
                          <img src={vet.avatar} alt={vet.name} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <p className="font-bold text-gray-900">{vet.name}</p>
                            <span className="text-[10px] text-gray-400">{vet.hours}</span>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#006B4F] text-[10px] font-bold">
                          {vet.appointmentsCount} Visits
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* MESSAGES & REVIEWS SUMMARY */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Messages (6 cols) */}
                <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-2xs space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#006B4F]" />
                      <h3 className="text-sm font-bold text-gray-900">Customer Messages & Inquiries</h3>
                    </div>
                    <span className="text-xs text-[#006B4F] font-bold">View All</span>
                  </div>

                  <div className="divide-y divide-gray-50">
                    {CUSTOMER_MESSAGES.map((msg) => (
                      <div key={msg.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img src={msg.senderAvatar} alt={msg.sender} className="w-7 h-7 rounded-full object-cover shrink-0" />
                          <div className="min-w-0">
                            <p className="font-bold text-gray-900 leading-tight">{msg.sender}</p>
                            <p className="text-gray-500 truncate text-[11px]">{msg.message}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[10px] text-gray-400 block">{msg.time}</span>
                          {msg.unreadCount && (
                            <span className="inline-block px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-bold">
                              {msg.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews Breakdown (6 cols) */}
                <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-2xs space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gray-900">Customer Reviews</h3>
                    <span className="text-xs text-amber-500 font-bold">4.9 / 5.0 (245 Reviews)</span>
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="w-10">5 star</span>
                      <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#006B4F] h-full w-[62%]" />
                      </div>
                      <span className="w-8 text-right">62%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-10">4 star</span>
                      <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#0E8F63] h-full w-[18%]" />
                      </div>
                      <span className="w-8 text-right">18%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-10">3 star</span>
                      <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full w-[12%]" />
                      </div>
                      <span className="w-8 text-right">12%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-10">2 star</span>
                      <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-orange-400 h-full w-[5%]" />
                      </div>
                      <span className="w-8 text-right">5%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-10">1 star</span>
                      <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-red-400 h-full w-[3%]" />
                      </div>
                      <span className="w-8 text-right">3%</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#F8FAF9] rounded-2xl border border-emerald-50 text-xs italic text-gray-700">
                    “Best pet clinic in Sahiwal! Very professional, kind staff and excellent care for my cat.” — Ayesha Khan
                  </div>
                </div>

              </div>

              {/* QUICK ACTIONS BAR (MATCHING IMAGE 9 BOTTOM) */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs text-left space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#006B4F]" />
                  <h3 className="text-base font-bold text-gray-900">Quick Actions</h3>
                  <span className="text-xs text-gray-400">Common administrative tasks</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button
                    onClick={() => setActionModal('appointment')}
                    className="p-4 rounded-2xl bg-[#F0FAF5] hover:bg-[#E2F7ED] border border-[#D1F2E2] text-left transition-colors flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-gray-900">Add New Appointment</p>
                      <span className="text-[11px] text-gray-500">Schedule a patient visit</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#006B4F]" />
                  </button>

                  <button
                    onClick={() => setActionModal('product')}
                    className="p-4 rounded-2xl bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-blue-200 text-left transition-colors flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-gray-900">Add Product</p>
                      <span className="text-[11px] text-gray-500">Add new shop item</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                  </button>

                  <button
                    onClick={() => setActionModal('inventory')}
                    className="p-4 rounded-2xl bg-[#FFFBEB] hover:bg-[#FEF3C7] border border-amber-200 text-left transition-colors flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-gray-900">Update Inventory</p>
                      <span className="text-[11px] text-gray-500">Manage stock levels</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-600" />
                  </button>

                  <a
                    href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Admin%20Response%20from%20Vet%20for%20Pet%20Clinic`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-2xl bg-[#ECFDF5] hover:bg-[#D1FAE5] border border-emerald-200 text-left transition-colors flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-gray-900">Send WhatsApp Reply</p>
                      <span className="text-[11px] text-gray-500">Respond to inquiries</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-600" />
                  </a>
                </div>
              </div>
            </>
          ) : (
            /* SUB-PAGES / SUB-TABS ROUTING */
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xs text-left space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 capitalize">
                    {activeTab} Management
                  </h2>
                  <p className="text-xs text-gray-500">
                    Manage and update all {activeTab} records for Vet for Pet Clinic, Sahiwal.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700"
                >
                  Back to Dashboard
                </button>
              </div>

              {activeTab === 'appointments' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Total {appointments.length} appointments recorded</span>
                    <button
                      onClick={() => setActionModal('appointment')}
                      className="px-4 py-2 rounded-xl bg-[#006B4F] text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Book New Appointment</span>
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                          <th className="pb-3">Pet Name</th>
                          <th className="pb-3">Owner</th>
                          <th className="pb-3">Phone</th>
                          <th className="pb-3">Service</th>
                          <th className="pb-3">Veterinarian</th>
                          <th className="pb-3">Date & Time</th>
                          <th className="pb-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {appointments.map((app) => (
                          <tr key={app.id} className="hover:bg-gray-50/60">
                            <td className="py-3 font-bold text-gray-900">{app.petName} ({app.petType})</td>
                            <td className="py-3 text-gray-700">{app.owner}</td>
                            <td className="py-3 text-gray-500">{app.phone}</td>
                            <td className="py-3 text-gray-700">{app.service}</td>
                            <td className="py-3 text-gray-700">{app.vet}</td>
                            <td className="py-3 text-gray-500">{app.dateTime}</td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(app.status)}`}>
                                {app.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                          <th className="pb-3">Order Number</th>
                          <th className="pb-3">Customer</th>
                          <th className="pb-3">Items</th>
                          <th className="pb-3">Date</th>
                          <th className="pb-3">Total Amount</th>
                          <th className="pb-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {orders.map((o) => (
                          <tr key={o.id} className="hover:bg-gray-50/60">
                            <td className="py-3 font-mono font-bold text-[#006B4F]">{o.orderNumber}</td>
                            <td className="py-3 font-bold text-gray-900">{o.customer}</td>
                            <td className="py-3 text-gray-600">{o.itemsCount} items</td>
                            <td className="py-3 text-gray-500">{o.date}</td>
                            <td className="py-3 font-extrabold text-gray-900">PKR {o.total.toLocaleString()}</td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(o.status)}`}>
                                {o.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'inventory' && (
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                          <th className="pb-3">Product Name</th>
                          <th className="pb-3">Category</th>
                          <th className="pb-3">Current Stock</th>
                          <th className="pb-3">Reorder Level</th>
                          <th className="pb-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {inventory.map((inv) => (
                          <tr key={inv.id} className="hover:bg-gray-50/60">
                            <td className="py-3 font-bold text-gray-900 flex items-center gap-2">
                              <img src={inv.image} alt={inv.productName} className="w-7 h-7 rounded-md object-cover" />
                              <span>{inv.productName}</span>
                            </td>
                            <td className="py-3 text-gray-600">{inv.category}</td>
                            <td className="py-3 font-bold text-gray-900">{inv.stock} units</td>
                            <td className="py-3 text-gray-500">{inv.reorderLevel} units</td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                inv.stock <= 5 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {inv.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab !== 'appointments' && activeTab !== 'orders' && activeTab !== 'inventory' && (
                <div className="py-12 text-center space-y-3 bg-gray-50 rounded-2xl">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto text-[#006B4F] shadow-xs">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-gray-900 capitalize">{activeTab} Section Active</h4>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    All administrative controls for {activeTab} are fully synchronized with Vet for Pet Clinic's mock operational records.
                  </p>
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className="px-5 py-2 rounded-full bg-[#006B4F] text-white text-xs font-bold"
                  >
                    Return to Main Dashboard
                  </button>
                </div>
              )}
            </div>
          )}

        </main>
      </div>

      {/* QUICK ACTION MODALS */}
      {actionModal === 'appointment' && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">Add New Patient Appointment</h3>
              <button onClick={() => setActionModal(null)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddAppointment} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Pet Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Leo"
                  value={newAppointmentData.petName}
                  onChange={(e) => setNewAppointmentData({...newAppointmentData, petName: e.target.value})}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Owner Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Mehmood"
                  value={newAppointmentData.owner}
                  onChange={(e) => setNewAppointmentData({...newAppointmentData, owner: e.target.value})}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Service</label>
                  <select
                    value={newAppointmentData.service}
                    onChange={(e) => setNewAppointmentData({...newAppointmentData, service: e.target.value})}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white"
                  >
                    <option value="General Checkup">General Checkup</option>
                    <option value="Vaccination">Vaccination</option>
                    <option value="Surgery Consult">Surgery Consult</option>
                    <option value="Pet Grooming">Pet Grooming</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Doctor</label>
                  <select
                    value={newAppointmentData.vet}
                    onChange={(e) => setNewAppointmentData({...newAppointmentData, vet: e.target.value})}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white"
                  >
                    <option value="Dr. Sarah Khan">Dr. Sarah Khan</option>
                    <option value="Dr. Ali Raza">Dr. Ali Raza</option>
                    <option value="Dr. Hira Fatima">Dr. Hira Fatima</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#006B4F] text-white font-bold text-xs hover:bg-[#00543E]"
              >
                Save & Confirm Appointment
              </button>
            </form>
          </div>
        </div>
      )}

      {actionModal === 'product' && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">Add New Shop Product</h3>
              <button onClick={() => setActionModal(null)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500">Add authentic pet food, accessories or medicine to the in-clinic shop catalogue.</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Product Name</label>
                <input type="text" placeholder="e.g. Reflex Plus Cat Food" className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                  <select className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white">
                    <option>Cat Feed</option>
                    <option>Dog Food</option>
                    <option>Grooming</option>
                    <option>Supplements</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Price (PKR)</label>
                  <input type="number" placeholder="2500" className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300" />
                </div>
              </div>
              <button
                onClick={() => setActionModal(null)}
                className="w-full py-3 rounded-xl bg-[#006B4F] text-white font-bold text-xs hover:bg-[#00543E]"
              >
                Save Product to Catalogue
              </button>
            </div>
          </div>
        </div>
      )}

      {actionModal === 'inventory' && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">Restock Inventory</h3>
              <button onClick={() => setActionModal(null)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500">Record incoming stock deliveries to prevent shortage alerts.</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Select Item to Restock</label>
                <select className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white">
                  {inventory.map(i => <option key={i.id}>{i.productName} (Current: {i.stock})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Units Received</label>
                <input type="number" placeholder="20" className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300" />
              </div>
              <button
                onClick={() => setActionModal(null)}
                className="w-full py-3 rounded-xl bg-[#006B4F] text-white font-bold text-xs hover:bg-[#00543E]"
              >
                Confirm Restock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
