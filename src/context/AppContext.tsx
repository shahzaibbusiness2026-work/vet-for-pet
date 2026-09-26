'use client';

import React, { createContext, useContext, useState } from 'react';
import { CartItem, Product, ServiceItem } from '../types';
import { PRODUCTS } from '../data/mockData';
import { ToastMessage } from '../components/common/Toast';

interface AppContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  handleAddToCart: (product: Product) => void;
  handleUpdateQuantity: (productId: string, quantity: number) => void;
  handleRemoveFromCart: (productId: string) => void;
  handleClearCart: () => void;
  totalCartCount: number;
  
  isAppointmentModalOpen: boolean;
  setIsAppointmentModalOpen: (open: boolean) => void;
  openAppointmentModal: (serviceName?: string) => void;
  closeAppointmentModal: () => void;
  preselectedService: string;

  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  openProfileModal: () => void;
  closeProfileModal: () => void;

  selectedServiceDetail: ServiceItem | null;
  setSelectedServiceDetail: (service: ServiceItem | null) => void;
  openServiceDetail: (service: ServiceItem) => void;
  closeServiceDetail: () => void;

  selectedProductDetail: Product | null;
  setSelectedProductDetail: (product: Product | null) => void;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;

  wishlistIds: string[];
  handleToggleWishlist: (productId: string) => void;

  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  handleDismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['p1', 'p5']);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

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

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { product, quantity }];
    });
    addToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}"${product.name}" to cart!`, 'success');
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

  const openAppointmentModal = (serviceName: string = '') => {
    setPreselectedService(serviceName);
    setIsAppointmentModalOpen(true);
  };

  const closeAppointmentModal = () => {
    setIsAppointmentModalOpen(false);
  };

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const openServiceDetail = (service: ServiceItem) => {
    setSelectedServiceDetail(service);
  };

  const closeServiceDetail = () => {
    setSelectedServiceDetail(null);
  };

  const openProductDetail = (product: Product) => {
    setSelectedProductDetail(product);
  };

  const closeProductDetail = () => {
    setSelectedProductDetail(null);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        handleAddToCart,
        handleUpdateQuantity,
        handleRemoveFromCart,
        handleClearCart,
        totalCartCount,
        isAppointmentModalOpen,
        setIsAppointmentModalOpen,
        openAppointmentModal,
        closeAppointmentModal,
        preselectedService,
        isProfileModalOpen,
        setIsProfileModalOpen,
        openProfileModal,
        closeProfileModal,
        selectedServiceDetail,
        setSelectedServiceDetail,
        openServiceDetail,
        closeServiceDetail,
        selectedProductDetail,
        setSelectedProductDetail,
        openProductDetail,
        closeProductDetail,
        wishlistIds,
        handleToggleWishlist,
        toasts,
        addToast,
        handleDismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
