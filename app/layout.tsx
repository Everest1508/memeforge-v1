import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/lib/theme-provider';
import Navbar from '@/components/layout/Navbar';
import { Toaster } from '@/components/ui/toaster';
import  Head  from 'next/head';
export const metadata: Metadata = {
  title: 'MemeForge - Blockchain-Based Meme Creation',
  description: 'Create, share, and own your memes on the blockchain with MemeForge',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className="font-space-comic">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            {/* <footer className="bg-red-900 text-white py-6">
              <div className="container mx-auto px-4">
                <div className="text-center">
                  <p className="text-sm">© 2025 MemeForge. All rights reserved.</p>
                </div>
              </div>
            </footer> */}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
