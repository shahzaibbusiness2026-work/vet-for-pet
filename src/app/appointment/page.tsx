'use client';

import { useRouter } from 'next/navigation';
import { AppointmentPage } from '@/src/views/AppointmentPage';
import { PageType } from '@/src/types';

export default function AppointmentRoute() {
  const router = useRouter();

  const handleSetPage = (page: PageType) => {
    router.push(page === 'home' ? '/' : `/${page}`);
  };

  return <AppointmentPage setCurrentPage={handleSetPage} />;
}
