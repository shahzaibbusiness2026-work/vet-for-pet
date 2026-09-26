import { Metadata } from 'next';
import { ProfilePage } from '@/src/views/ProfilePage';

export const metadata: Metadata = {
  title: 'My Pet Parent Account | Vet for Pet Clinic Sahiwal',
  description: 'Manage your veterinary health records, recent pet food orders, registered pets, and delivery details in Sahiwal.',
};

export default function ProfileRoute() {
  return <ProfilePage />;
}
