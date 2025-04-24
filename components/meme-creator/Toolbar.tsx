"use client";

import { useState, useEffect } from 'react';
import { StickerCategory, Sticker } from '@/types';
import { fetchStickerCategories } from '@/lib/data';
import CategorySelector from './CategorySelector';
import StickerPanel from './StickerPanel';
import { Loader2 } from 'lucide-react';

interface ToolbarProps {
  onSelectSticker: (sticker: Sticker) => void;
}

const Toolbar = ({ onSelectSticker }: ToolbarProps) => {
  const [categories, setCategories] = useState<StickerCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchStickerCategories();
        setCategories(data);
        
        // Auto-select the first category
        if (data.length > 0) {
          setSelectedCategory(data[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-8 w-8 text-red-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Stickers</h2>
      
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <StickerPanel
        categoryId={selectedCategory}
        onSelectSticker={onSelectSticker}
      />
    </div>
  );
};

export default Toolbar;