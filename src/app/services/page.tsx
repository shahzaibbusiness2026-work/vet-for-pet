'use client';

import { useRouter } from 'next/navigation';
import { ServicesPage } from '@/src/views/ServicesPage';
import { useApp } from '@/src/context/AppContext';
import { PageType } from '@/src/types';

export default function ServicesRoute() {
  const router = useRouter();
  const { openAppointmentModal, openServiceDetail } = useApp();

  const handleSetPage = (page: PageType) => {
    router.push(page === 'home' ? '/' : `/${page}`);
  };

  return (
    <ServicesPage
      setCurrentPage={handleSetPage}
      openAppointmentModal={() => openAppointmentModal()}
      onSelectService={openServiceDetail}
    />
  );
}
