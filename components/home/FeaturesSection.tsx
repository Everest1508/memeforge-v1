"use client";

import { motion } from "framer-motion";
import { Layers, Share2, Download, Sparkles } from "lucide-react";

const features = [
  {
    icon: <Layers className="h-12 w-12 text-yellow-500 drop-shadow-[2px_2px_0px_#000]" />,
    title: "Advanced meme creation",
    description: "Create unique memes with our easy to use editor and vast sticker collection.",
    animation: { x: -100, opacity: 0 }, // from left
  },
  {
    icon: <Sparkles className="h-12 w-12 text-pink-500 drop-shadow-[2px_2px_0px_#000]" />,
    title: "Blockchain powered",
    description: "Own your creations with blockchain technology ensuring authenticity and ownership.",
    animation: { y: 100, opacity: 0 }, // from bottom
  },
  {
    icon: <Share2 className="h-12 w-12 text-green-500 drop-shadow-[2px_2px_0px_#000]" />,
    title: "Instant sharing",
    description: "Share your memes across social platforms with one click.",
    animation: { x: 100, opacity: 0 }, // from right
  },
  {
    icon: <Download className="h-12 w-12 text-blue-500 drop-shadow-[2px_2px_0px_#000]" />,
    title: "Easy download",
    description: "Download your memes in multiple formats for any use case.",
    animation: { y: -100, opacity: 0 }, // from top
  },
];

const FeaturesSection = () => {
  return (
    <section className="md:h-[90vh] flex items-center justify-center bg-white overflow-hidden py-16">
      <div className="container mx-auto px-4 text-gray-900">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-red-500 drop-shadow-[2px_2px_0px_#000] leading-[1.5] md:leading-[1.5]">
          Why choose Memeforge?
        </h2>
        <p className="text-base md:text-xl opacity-80 max-w-2xl mx-auto leading-relaxed mt-2">
          The ultimate platform for creating, owning, and sharing your meme masterpieces with the world.
        </p>
      </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={feature.animation}
              whileInView={{ x: 0, y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: index * 0.3,
                type: "spring",
                stiffness: 50,
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="animate-bounce-slow">{feature.icon}</div>
              <h3 className="text-lg md:text-xl font-bold mt-4 mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
