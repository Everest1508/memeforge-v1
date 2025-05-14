'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Feature = {
  title: string;
  description: string;
  image: string;
  link?: string;
  url?: string;
  is_coming_soon?: boolean;
};

const SkeletonCard = () => (
  <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
    <div className="bg-gray-300 h-56 mb-6 rounded-lg"></div>
    <div className="bg-gray-300 w-3/4 h-6 mb-4"></div>
    <div className="bg-gray-300 w-full h-4 mb-6"></div>
    <div className="bg-gray-300 w-1/2 h-6"></div>
  </div>
);

export default function FeaturedPage() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://memeforge.mooo.com/api/featured')
      .then((res) => res.json())
      .then((data) => {
        setFeatures(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div
      className="mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-10 sm:py-15 md:py-20 min-h-screen"
      style={{
        backgroundColor: '#C92D2E',
        backgroundImage: 'url("https://www.tabichain.com/images/new/bg/1.svg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-[2px_2px_0px_#000] font-[gumbo] mt-8 sm:mt-12 md:mt-14 mb-6 sm:mb-8">
        Featured
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ x: 0, rotate: 0 }}
                whileHover="panic"
                variants={{
                  panic: {
                    scale: 1.05,
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
                {feature.url && (
                  <a
                    href={feature.url}
                    className="inline-block bg-[#C92D2E] px-6 py-2 rounded-md text-white font-semibold hover:bg-red-600 transition-colors duration-300"
                  >
                    Explore
                  </a>
                )}
                {feature.is_coming_soon && !feature.url && (
                  <div className="text-red-500 font-bold mt-4">
                    Coming Soon!
                  </div>
                )}
              </motion.div>
            ))}
      </div>
    </div>
  );
}
