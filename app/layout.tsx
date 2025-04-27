"use client";
import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/lib/theme-provider';
import Navbar from '@/components/layout/Navbar';
import { Toaster } from '@/components/ui/toaster';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
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
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
