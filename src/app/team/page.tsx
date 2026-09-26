'use client';

import { useRouter } from 'next/navigation';
import { TeamPage } from '@/src/views/TeamPage';
import { useApp } from '@/src/context/AppContext';
import { PageType } from '@/src/types';

export default function TeamRoute() {
  const router = useRouter();
  const { openAppointmentModal } = useApp();

  const handleSetPage = (page: PageType) => {
    router.push(page === 'home' ? '/' : `/${page}`);
  };

  return (
    <TeamPage
      setCurrentPage={handleSetPage}
      openAppointmentModal={() => openAppointmentModal()}
    />
  );
}
