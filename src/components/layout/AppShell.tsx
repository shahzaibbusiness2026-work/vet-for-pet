'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AppProvider, useApp } from '@/src/context/AppContext';
import { Header } from '@/src/components/common/Header';
import { Footer } from '@/src/components/common/Footer';
import { CartDrawer } from '@/src/components/common/CartDrawer';
import { AppointmentModal } from '@/src/components/common/AppointmentModal';
import { ServiceDetailModal } from '@/src/components/common/ServiceDetailModal';
import { UserProfileModal } from '@/src/components/common/UserProfileModal';
import { ProductDetailModal } from '@/src/components/common/ProductDetailModal';
import { Toast } from '@/src/components/common/Toast';
import { ScrollProgressBar } from '@/src/components/common/ScrollProgressBar';
import { ScrollToTop } from '@/src/components/common/ScrollToTop';
import { motion, AnimatePresence } from 'framer-motion';

function ShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    openCart,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveFromCart,
    handleClearCart,
    isAppointmentModalOpen,
    setIsAppointmentModalOpen,
    preselectedService,
    openAppointmentModal,
    selectedServiceDetail,
    closeServiceDetail,
    selectedProductDetail,
    closeProductDetail,
    wishlistIds,
    handleToggleWishlist,
    isProfileModalOpen,
    closeProfileModal,
    toasts,
    handleDismissToast,
  } = useApp();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-subtle-cream text-slate-800">
        <ScrollProgressBar />
        {children}
        <ScrollToTop />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-subtle-cream text-slate-800 relative selection:bg-[#006B4F]/15 selection:text-emerald-950 overflow-x-hidden max-w-full w-full">
      <ScrollProgressBar />
      <Header />
      <main className="flex-1 relative overflow-x-hidden max-w-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollToTop />

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
        onClose={closeServiceDetail}
        onBookService={(serviceName) => openAppointmentModal(serviceName)}
      />

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
      />

      <ProductDetailModal
        product={selectedProductDetail}
        isOpen={Boolean(selectedProductDetail)}
        onClose={closeProductDetail}
        onAddToCart={handleAddToCart}
        onOpenCart={openCart}
        isWishlisted={selectedProductDetail ? wishlistIds.includes(selectedProductDetail.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <ShellInner>{children}</ShellInner>
    </AppProvider>
  );
}
