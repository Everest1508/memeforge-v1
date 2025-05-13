"use client";

import { useState, useEffect } from 'react';
import { StickerCategory, Sticker } from '@/types';
import { fetchStickerCategories, fetchStickersByCategorySlug } from '@/lib/data';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

interface ToolbarProps {
  onSelectSticker: (sticker: Sticker) => void;
}

const Toolbar = ({ onSelectSticker }: ToolbarProps) => {
  const [categories, setCategories] = useState<StickerCategory[]>([]);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [stickersMap, setStickersMap] = useState<Record<string, Sticker[]>>({});
  const [loadingCategory, setLoadingCategory] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchStickerCategories();
        setCategories(data);
        if (data.length > 0) {
          setOpenCategory(data[0].slug); 
  
          setLoadingCategory(data[0].slug);
          try {
            const stickers = await fetchStickersByCategorySlug(data[0].slug);
            setStickersMap((prev) => ({ ...prev, [data[0].slug]: stickers }));
          } catch (err) {
            console.error("Failed to fetch stickers for default category:", err);
          } finally {
            setLoadingCategory(null);
          }
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    loadCategories();
  }, []);

  const handleToggleCategory = async (slug: string) => {
    if (openCategory === slug) {
      setOpenCategory(null);
      return;
    }

    setOpenCategory(slug);

    if (!stickersMap[slug]) {
      setLoadingCategory(slug);
      try {
        const stickers = await fetchStickersByCategorySlug(slug);
        setStickersMap((prev) => ({ ...prev, [slug]: stickers }));
      } catch (err) {
        console.error("Failed to fetch stickers:", err);
      } finally {
        setLoadingCategory(null);
      }
    }
  };

  return (
    <div className="space-y-4 overflow-y-auto  h-[calc(80vh-10rem)]">
      {categories.map((category) => {
        const isOpen = openCategory === category.slug;
        const isLoading = loadingCategory === category.slug;
        const stickers = stickersMap[category.slug] || [];

        return (
          <div
            key={category.slug}
            className="bg-white rounded-lg drop-shadow-[4px_4px_0px_#000] border border-black"
          >
            <button
              className="w-full text-left text-sm  px-4 py-3 flex justify-between items-center border-b border-[#C92D2E]"
              onClick={() => handleToggleCategory(category.slug)}
            >
              <span>{category.name}</span>
              <span>{isOpen ? '-' : '+'}</span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-3 bg-gray-100 rounded-b-lg border-t border-black">
                    {isLoading ? (
                      <div className="h-60 flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-red-600" />
                      </div>
                    ) : stickers.length === 0 ? (
                      <p className="text-sm text-gray-500">No stickers found.</p>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-80 overflow-y-auto scrollbar-hide">
                        {stickers.map((sticker) => (
                          <div
                            key={sticker.id}
                            onClick={() => onSelectSticker(sticker)}
                            className="relative aspect-square cursor-pointer hover:scale-105 transition-transform"
                          >
                            <Image
                              src={sticker.url}
                              alt={sticker.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-contain rounded-md"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Toolbar;
