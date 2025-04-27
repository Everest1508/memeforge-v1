import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import Head from 'next/head';
import { Metadata } from 'next';
import CallToActionSection from '@/components/home/CallToActionSection';

export const metadata: Metadata = {
  title: "Forge Memes | Create Blockchain Backed Memes",
  description: "Create and share blockchain-powered memes easily with our meme creator platform. Join our creative community today!",
  keywords: "blockchain memes, meme creation, NFT memes, meme creator, create memes, blockchain-powered memes",
  authors: [{ name: "Forge Memes Team" }],
  openGraph: {
    title: "Forge Memes | Create Blockchain Backed Memes",
    description: "Create and share blockchain-powered memes easily with our meme creator platform. Join our creative community today!",
    url: "https://www.memeforge.lol",
    images: ["/images/background/landing-page.PNG"],
    siteName: "Forge Memes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forge Memes | Create Blockchain Backed Memes",
    description: "Create and share blockchain-powered memes easily with our meme creator platform. Join our creative community today!",
    images: ["/images/background/landing-page.PNG"],
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Forge Memes | Create Blockchain Backed Memes</title>
        <meta name="description" content="Create and share blockchain-powered memes easily with our meme creator platform. Join our creative community today!" />
        <link rel="icon" href="/favicon.ico" />
        {/* Open Graph and Twitter metadata */}
      </Head>

      {/* Hero Section */}
      <div
        className="bg-cover md:bg-center bg-[left_center] min-h-screen flex items-center justify-center w-full"
        style={{ backgroundImage: "url('/images/background/landing-page.PNG')" }}
      >
        <img src="/images/background/landing-page.PNG" alt="Create Memes on Blockchain" className="hidden" />
        <HeroSection />
      </div>

      {/* Features Section */}
      <FeaturesSection />

      {/* Call to Action Section */}
      <CallToActionSection />
    </div>
  );
}
