"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Template } from '@/types';
import { fetchTemplates } from '@/lib/data';

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void;
}

// Skeleton with animated gradient shimmer
const SkeletonCard = () => (
  <div className="relative overflow-hidden rounded-lg aspect-square bg-gray-200">
    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-skeleton" />
  </div>
);

const TemplateSelector = ({ onSelectTemplate }: TemplateSelectorProps) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const data = await fetchTemplates();
        setTemplates(data);
      } catch (error) {
        console.error('Failed to fetch templates:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      setShowHeader(scrollPosition < 50);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 mt-6 h-96 overflow-y-auto scrollbar-hide" ref={containerRef}>
      <motion.h2
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: showHeader ? 1 : 0, y: showHeader ? 0 : -20 }}
        transition={{ duration: 0.3 }}
        className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 bg-white sticky top-0 inset-0 z-10 px-2 py-2"
      >
        Templates
      </motion.h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : templates.map((template) => (
              <div
                key={template.id}
                className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg border border-gray-200 hover:border-red-400 drop-shadow-[2px_2px_0px_#000] transition-all"
                onClick={() => onSelectTemplate(template)}
              >
                <Image
                  src={`https://memeforge.mooo.com${template.url}`}
                  alt={template.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-end justify-center">
                  <p className="text-white text-xs sm:text-sm font-medium pb-1 sm:pb-2 transform translate-y-full group-hover:translate-y-0 transition-transform">
                    {template.name}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
  