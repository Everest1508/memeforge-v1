import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'MemeForge',
  description: 'Create and explore memes on the blockchain',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-gumbo">
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
