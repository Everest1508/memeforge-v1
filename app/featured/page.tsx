'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Feature = {
  title: string;
  description: string;
  image: string;
  link?: string;
};

const features: Feature[] = [
  {
    title: 'Get your Tabi Pay card',
    description: 'Seamlessly mint and manage your own meme-powered debit card with on-chain identity.',
    image: 'https://www.tabichain.com/images/new/card.png',
    link: '/featured/tabi-pay',
  },
  {
    title: 'MemeLab Tools',
    description: 'Advanced tools for creating, remixing, and minting memes on-chain.',
    image: 'https://www.tabichain.com/images/new/rocket.png',
    link: '/meme-creator',
  },
  {
    title: 'MemeLab Tools',
    description: 'Advanced tools for creating, remixing, and minting memes on-chain.',
    image: 'https://www.tabichain.com/images/new/rocket.png',
    link: '/meme-creator',
  },
];

export default function FeaturedPage() {
  return (
    <div
      className="mx-auto px-20 py-20 min-h-screen"
      style={{
        backgroundColor: '#C92D2E',
        backgroundImage: 'url("https://www.tabichain.com/images/new/bg/1.svg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-[2px_2px_0px_#000] font-[gumbo] mt-14 mb-8">
        Featured
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((feature, index) => (
            <motion.div
  key={index}
  initial={{ x: 0, rotate: 0 }}
  whileHover="panic"
  variants={{
    panic: {
      x: [0, -130, 130, -170, 170, -100, 100, -5, 5, 0],
      rotate: [0, -5, 5, -5, 5, -3, 3, -1, 1, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }}
  className="bg-white text-black p-6 rounded-lg shadow-md transition-all duration-300 drop-shadow-[4px_4px_0px_#000]"
>

        
        
        
        
            <Image
              src={feature.image}
              alt={feature.title}
              width={400}
              height={300}
              className="rounded-lg w-full h-56 object-cover mb-6"
            />
            <h2 className="text-2xl mb-4">{feature.title}</h2>
            <p className="text-md mb-6">{feature.description}</p>
            {feature.link && (
              <a
                href={feature.link}
                className="inline-block bg-[#C92D2E] px-6 py-2 rounded-md text-white font-semibold hover:bg-red-600 transition-colors duration-300"
              >
                Explore
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
