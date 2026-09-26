import type { Metadata, Viewport } from 'next';
import { Outfit, Plus_Jakarta_Sans, Caveat } from 'next/font/google';
import '@/src/index.css';
import { ThemeRegistry } from '@/src/theme/ThemeRegistry';
import { SiteDataProvider } from '@/src/context/SiteDataContext';
import { AppShell } from '@/src/components/layout/AppShell';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-heading',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-script',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#006B4F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://vet-for-pet-clinic.vercel.app'),
  title: {
    default: 'Vet for Pet Clinic, Sahiwal - Compassionate Veterinary Healthcare',
    template: '%s | Vet for Pet Clinic, Sahiwal',
  },
  description: "Sahiwal's most trusted veterinary clinic offering professional surgery, vaccinations, pet dental care, emergency treatment, hygienic grooming, and premium pet supplies shop.",
  keywords: [
    'veterinary clinic Sahiwal',
    'pet clinic Sahiwal',
    'pet doctor in Sahiwal',
    'animal hospital Sahiwal',
    'dog vaccination Sahiwal',
    'cat surgery Sahiwal',
    'pet shop Sahiwal',
    'pet grooming Fareed Town',
    'best vet Sahiwal',
  ],
  authors: [{ name: 'Vet for Pet Clinic Sahiwal', url: 'https://vet-for-pet-clinic.vercel.app' }],
  creator: 'Vet for Pet Clinic',
  publisher: 'Vet for Pet Clinic',
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vet-for-pet-clinic.vercel.app',
    siteName: 'Vet for Pet Clinic, Sahiwal',
    title: 'Vet for Pet Clinic, Sahiwal - Healthy Pets, Happier Lives',
    description: "Sahiwal's trusted veterinary hospital providing compassionate pet healthcare, modern surgeries, vaccinations, grooming, and pet supplies.",
    images: [
      {
        url: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Vet for Pet Clinic Sahiwal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vet for Pet Clinic, Sahiwal',
    description: "Sahiwal's premier veterinary care and surgery center for dogs, cats, and small animals.",
    images: ['https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=1200&h=630&q=80'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VeterinaryCare',
  name: 'Vet for Pet Clinic',
  image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=1200&h=630&q=80',
  description: 'Specialized veterinary hospital and clinic in Sahiwal providing surgeries, checkups, pet grooming, and supplies.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Street 3, Main Market, Fareed Town',
    addressLocality: 'Sahiwal',
    addressRegion: 'Punjab',
    postalCode: '57000',
    addressCountry: 'PK',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 30.6682,
    longitude: 73.1114,
  },
  telephone: '+923001234567',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '21:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday'],
      opens: '15:00',
      closes: '21:00',
    },
  ],
  priceRange: '$$',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${outfit.variable} ${caveat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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

