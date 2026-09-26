'use client';

import { useRouter } from 'next/navigation';
import { ShopPage } from '@/src/views/ShopPage';
import { useApp } from '@/src/context/AppContext';
import { PageType } from '@/src/types';

export default function ShopRoute() {
  const router = useRouter();
  const {
    handleAddToCart,
    openCart,
    wishlistIds,
    handleToggleWishlist,
  } = useApp();

  const handleSetPage = (page: PageType) => {
    router.push(page === 'home' ? '/' : `/${page}`);
  };

  return (
    <ShopPage
      setCurrentPage={handleSetPage}
      onAddToCart={handleAddToCart}
      openCart={openCart}
      wishlistIds={wishlistIds}
      onToggleWishlist={handleToggleWishlist}
    />
  );
}
