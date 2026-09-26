import type { Metadata } from 'next';
import '@/src/index.css';
import { ThemeRegistry } from '@/src/theme/ThemeRegistry';
import { SiteDataProvider } from '@/src/context/SiteDataContext';
import { AppShell } from '@/src/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'Vet for Pet Clinic, Sahiwal - Healthy Pets, Happier Lives',
  description: "Sahiwal's trusted veterinary clinic providing compassionate pet healthcare, modern surgeries, vaccinations, grooming, pet supplies shop, and dedicated pet care services.",
  keywords: ['veterinary clinic Sahiwal', 'pet clinic Sahiwal', 'vet doctor', 'pet surgery', 'pet vaccination', 'pet shop'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF8F5] text-slate-800 antialiased selection:bg-[#0E8F63]/20 selection:text-[#02231A]">
        <ThemeRegistry>
          <SiteDataProvider>
            <AppShell>{children}</AppShell>
          </SiteDataProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
