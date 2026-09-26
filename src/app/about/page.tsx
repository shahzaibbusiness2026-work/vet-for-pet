'use client';

import { useRouter } from 'next/navigation';
import { AboutPage } from '@/src/views/AboutPage';
import { useApp } from '@/src/context/AppContext';
import { PageType } from '@/src/types';

export default function AboutRoute() {
  const router = useRouter();
  const { openAppointmentModal } = useApp();

  const handleSetPage = (page: PageType) => {
    router.push(page === 'home' ? '/' : `/${page}`);
  };

  return (
    <AboutPage
      setCurrentPage={handleSetPage}
      openAppointmentModal={() => openAppointmentModal()}
    />
  );
}
