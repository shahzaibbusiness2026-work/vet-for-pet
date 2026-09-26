'use client';

import { useRouter } from 'next/navigation';
import { GalleryPage } from '@/src/views/GalleryPage';
import { useApp } from '@/src/context/AppContext';
import { PageType } from '@/src/types';

export default function GalleryRoute() {
  const router = useRouter();
  const { openAppointmentModal } = useApp();

  const handleSetPage = (page: PageType) => {
    router.push(page === 'home' ? '/' : `/${page}`);
  };

  return (
    <GalleryPage
      setCurrentPage={handleSetPage}
      openAppointmentModal={() => openAppointmentModal()}
    />
  );
}
