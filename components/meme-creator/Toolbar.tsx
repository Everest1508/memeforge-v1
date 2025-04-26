"use client";

import { useState, useEffect } from 'react';
import { StickerCategory, Sticker } from '@/types';
import { fetchStickerCategories } from '@/lib/data';
import CategorySelector from './CategorySelector';
import StickerPanel from './StickerPanel';

interface ToolbarProps {
  onSelectSticker: (sticker: Sticker) => void;
}

const CategorySkeleton = () => (
  <div className="flex flex-wrap gap-2 mb-4">
    {Array.from({ length: 5 }).map((_, idx) => (
      <div
        key={idx}
        className="w-20 h-8 rounded-full bg-gray-200 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-skeleton" />
      </div>
    ))}
  </div>
);

const SkeletonGrid = () => (
  <div className="h-98 p-3 rounded-lg border border-gray-200 overflow-y-auto">
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    {Array.from({ length: 8 }).map((_, idx) => (
      <div
        key={idx}
        className="aspect-square bg-gray-200 rounded-md relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-skeleton" />
      </div>
    ))}
  </div>
  </div>
);

const Toolbar = ({ onSelectSticker }: ToolbarProps) => {
  const [categories, setCategories] = useState<StickerCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchStickerCategories();
        setCategories(data);
        if (data.length > 0) {
          setSelectedCategory(data[0].slug);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Stickers</h2>

      {loading ? (
        <>
          <CategorySkeleton />
          <SkeletonGrid />
        </>
      ) : categories.length === 0 ? (
        <p className="text-gray-500">No categories available.</p>
      ) : (
        <>
          <CategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <div className="max-h-[320px] overflow-y-auto mt-4">
            <StickerPanel
              categoryId={selectedCategory}
              onSelectSticker={onSelectSticker}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Toolbar;
