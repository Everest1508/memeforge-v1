"use client";

import { useState, useEffect } from 'react';
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

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Templates</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : templates.map((template) => (
              <div
                key={template.id}
                className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg border border-gray-200 hover:border-red-400 transition-all"
                onClick={() => onSelectTemplate(template)}
                >
                  <Image
                    src={`https://memeforge.mooo.com${template.url}`}
                    alt={template.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-end justify-center">
                  <p className="text-white text-sm font-medium pb-2 transform translate-y-full group-hover:translate-y-0 transition-transform">
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
  