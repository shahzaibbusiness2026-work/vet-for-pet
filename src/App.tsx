import React, { useState, useEffect } from 'react';
import { PageType, CartItem, Product, ServiceItem } from './types';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { AppointmentModal } from './components/common/AppointmentModal';
import { ServiceDetailModal } from './components/common/ServiceDetailModal';
import { Toast, ToastMessage } from './components/common/Toast';
import { ScrollProgressBar } from './components/common/ScrollProgressBar';
import { ScrollToTop } from './components/common/ScrollToTop';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { TeamPage } from './pages/TeamPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { AppointmentPage } from './pages/AppointmentPage';
import { ShopPage } from './pages/ShopPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { PRODUCTS } from './data/mockData';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 } // Pre-loaded with 1 sample item for good UX
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['p1', 'p5']);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Automatically scroll smoothly to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { product, quantity: 1 }];
    });
    addToast(`Added "${product.name}" to cart!`, 'success');
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems(prev => prev.map(i => i.product.id === productId ? { ...i, quantity } : i));
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(i => i.product.id !== productId));
    addToast('Item removed from cart', 'info');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleWishlist = (productId: string) => {
    if (wishlistIds.includes(productId)) {
      setWishlistIds(prev => prev.filter(id => id !== productId));
      addToast('Removed from wishlist', 'info');
    } else {
      setWishlistIds(prev => [...prev, productId]);
      addToast('Saved to wishlist!', 'success');
    }
  };

  const handleOpenAppointmentModalWithService = (serviceName: string) => {
    setPreselectedService(serviceName);
    setIsAppointmentModalOpen(true);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // If viewing Admin, render the comprehensive Admin Dashboard UI
  if (currentPage === 'admin') {
    return (
      <div className="min-h-screen bg-subtle-cream text-slate-800">
        <ScrollProgressBar />
        <AdminDashboard setCurrentPage={setCurrentPage} />
        <ScrollToTop />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-subtle-cream text-slate-800 relative selection:bg-[#006B4F]/15 selection:text-emerald-950">
      {/* Top Scroll Indicator Progress Bar */}
      <ScrollProgressBar />

      {/* Sticky Global Header */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        openAppointmentModal={() => {
          setPreselectedService('');
          setIsAppointmentModalOpen(true);
        }}
      />

      {/* Main Pages Content with Smooth Fade Transitions */}
      <main className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {currentPage === 'home' && (
              <HomePage
                setCurrentPage={setCurrentPage}
                openAppointmentModal={() => setIsAppointmentModalOpen(true)}
                onSelectService={(service) => setSelectedServiceDetail(service)}
              />
            )}

            {currentPage === 'about' && (
              <AboutPage
                setCurrentPage={setCurrentPage}
                openAppointmentModal={() => setIsAppointmentModalOpen(true)}
              />
            )}

            {currentPage === 'services' && (
              <ServicesPage
                setCurrentPage={setCurrentPage}
                openAppointmentModal={() => setIsAppointmentModalOpen(true)}
                onSelectService={(service) => setSelectedServiceDetail(service)}
              />
            )}

            {currentPage === 'team' && (
              <TeamPage
                setCurrentPage={setCurrentPage}
                openAppointmentModal={() => setIsAppointmentModalOpen(true)}
              />
            )}

            {currentPage === 'gallery' && (
              <GalleryPage
                setCurrentPage={setCurrentPage}
                openAppointmentModal={() => setIsAppointmentModalOpen(true)}
              />
            )}

            {currentPage === 'contact' && (
              <ContactPage
                setCurrentPage={setCurrentPage}
                openAppointmentModal={() => setIsAppointmentModalOpen(true)}
              />
            )}

            {currentPage === 'appointment' && (
              <AppointmentPage
                setCurrentPage={setCurrentPage}
              />
            )}

            {currentPage === 'shop' && (
              <ShopPage
                setCurrentPage={setCurrentPage}
                onAddToCart={handleAddToCart}
                openCart={() => setIsCartOpen(true)}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Floating Back to Top Button with Scroll Progress Gauge */}
      <ScrollToTop />

      {/* Modals & Slide-out Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        preselectedService={preselectedService}
      />

      <ServiceDetailModal
        service={selectedServiceDetail}
        onClose={() => setSelectedServiceDetail(null)}
        onBookService={handleOpenAppointmentModalWithService}
      />

      <Toast
        toasts={toasts}
        onDismiss={handleDismissToast}
      />
    </div>
  );
}
