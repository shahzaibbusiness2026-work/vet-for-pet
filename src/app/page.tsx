'use client';

import { useRouter } from 'next/navigation';
import { HomePage } from '@/src/views/HomePage';
import { useApp } from '@/src/context/AppContext';
import { PageType } from '@/src/types';

export default function HomeRoute() {
  const router = useRouter();
  const { openAppointmentModal, openServiceDetail } = useApp();

  const handleSetPage = (page: PageType) => {
    router.push(page === 'home' ? '/' : `/${page}`);
  };

  return (
    <HomePage
      setCurrentPage={handleSetPage}
      openAppointmentModal={() => openAppointmentModal()}
      onSelectService={openServiceDetail}
    />
  );
}
