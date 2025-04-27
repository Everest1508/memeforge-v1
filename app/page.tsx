"use client";

import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import { motion } from 'framer-motion';
import Head from "next/head";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Forge Memes | Create Blockchain Backed Memes</title>
        <meta name="description" content="Create and share blockchain-powered memes easily with our meme creator platform. Join our creative community today!" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph tags for better social media preview */}
        <meta property="og:title" content="Forge Memes | Create Blockchain Backed Memes" />
        <meta property="og:description" content="Create and share blockchain-powered memes easily with our meme creator platform. Join our creative community today!" />
        <meta property="og:image" content="/images/background/landing-page.PNG" />
        <meta property="og:url" content="https://yourwebsite.com/" />
        <meta property="og:type" content="website" />

        {/* Optional: Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Forge Memes | Create Blockchain Backed Memes" />
        <meta name="twitter:description" content="Create and share blockchain-powered memes easily with our meme creator platform. Join our creative community today!" />
        <meta name="twitter:image" content="/images/background/landing-page.PNG" />
      </Head>

      {/* Background image wrapper */}
      <div
        className="bg-cover md:bg-center bg-[left_center] min-h-screen flex items-center justify-center w-full"
        style={{ backgroundImage: "url('/images/background/landing-page.PNG')" }}
      >
        {/* Hidden image for SEO (because background images are not crawled well) */}
        <img src="/images/background/landing-page.PNG" alt="Create Memes on Blockchain" className="hidden" />
        
        <HeroSection />
      </div>

      {/* Features Section */}
      <FeaturesSection />

      {/* Call to Action Section */}
      <section className="bg-red-600 text-white py-20 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 70 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-[2px_2px_0px_#000] leading-tight"
        >
          Ready to Forge Your Memes?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, type: "spring", stiffness: 60 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-[1.8] md:leading-relaxed"
        >
          Join our community and start creating blockchain backed memes today.
        </motion.p>

        <motion.a
          href="/meme-creator"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4, type: "spring", bounce: 0.4 }}
          viewport={{ once: true }}
          className="inline-block bg-white text-red-600 font-bold py-3 px-8 rounded-full shadow-xl hover:bg-red-100 transition-colors text-lg"
        >
          Start creating
        </motion.a>
      </div>
    </section>
    </div>
  );
}
