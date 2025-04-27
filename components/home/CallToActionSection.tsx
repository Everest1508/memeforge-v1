"use client";

import { motion } from "framer-motion";

const CallToActionSection = () => {
  return (
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
  );
};

export default CallToActionSection;
