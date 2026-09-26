'use client';

import { useRouter } from 'next/navigation';
import { AdminDashboard } from '@/src/views/admin/AdminDashboard';
import { PageType } from '@/src/types';

export default function AdminRoute() {
  const router = useRouter();

  const handleSetPage = (page: PageType) => {
    router.push(page === 'home' ? '/' : `/${page}`);
  };

  return <AdminDashboard setCurrentPage={handleSetPage} />;
}
