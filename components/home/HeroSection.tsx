"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
      <div className="relative text-white w-full min-h-screen flex items-center justify-center font-[gumbo]">
        <div className=''>
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: [1, 0.95, 1] }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
          }}
          className="w-full h-full bg-[url('/images/2.svg')] bg-cover bg-center"
        />
      </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center py-16 md:py-24">
            {/* Empty div for spacing */}
            <div className="flex justify-center md:justify-end" />

            {/* Animated center text */}
            <div className="text-center space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight drop-shadow-[2px_2px_0px_#000]"
              >
                Design your memes with us!
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg md:text-xl opacity-90 mb-8 drop-shadow-[2px_2px_0px_#000]"
              >
                create, share, and own your memes on the blockchain
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.4, type: "spring", bounce: 0.4 }}
              >
                <Link href="/meme-creator">
                  <Button
                    size="lg"
                    className="bg-white text-red-600 hover:bg-red-100 hover:text-red-700 text-lg px-8 py-6 rounded-full drop-shadow-[2px_2px_0px_#000] transform transition hover:scale-105"
                  >
                    Get started
                  </Button>
                </Link>
              </motion.div>
            </div>
            
            {/* <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative flex justify-center md:justify-start"
            >
              <img
                src="/images/background/fat-shiro.PNG"
                alt="Fat Shiro Meme"
                className="w-52 md:w-72 lg:w-80 absolute -right-10 md:right-0 -bottom-50 z-10"
              />
            </motion.div>  */}
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
