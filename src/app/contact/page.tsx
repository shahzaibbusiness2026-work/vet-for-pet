'use client';

import { useRouter } from 'next/navigation';
import { ContactPage } from '@/src/views/ContactPage';
import { useApp } from '@/src/context/AppContext';
import { PageType } from '@/src/types';

export default function ContactRoute() {
  const router = useRouter();
  const { openAppointmentModal } = useApp();

  const handleSetPage = (page: PageType) => {
    router.push(page === 'home' ? '/' : `/${page}`);
  };

  return (
    <ContactPage
      setCurrentPage={handleSetPage}
      openAppointmentModal={() => openAppointmentModal()}
    />
  );
}
