"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { Sticker } from '@/types';
import { fetchStickersByCategorySlug } from '@/lib/data';

interface StickerPanelProps {
  categoryId: string | null;
  onSelectSticker: (sticker: Sticker) => void;
}

const StickerPanel = ({ categoryId, onSelectSticker }: StickerPanelProps) => {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryId) {
      setStickers([]);
      return;
    }

    const loadStickers = async () => {
      setLoading(true);
      try {
        const data = await fetchStickersByCategorySlug(categoryId);
        setStickers(data);
      } catch (error) {
        console.error('Failed to fetch stickers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStickers();
  }, [categoryId]);

  if (!categoryId) {
    return (
      <div className="h-60 flex items-center justify-center bg-gray-50 rounded-lg border border-black">
        <p className="text-gray-500">Select a category to view stickers</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-60 flex items-center justify-center bg-gray-50 rounded-lg border border-black">
        <Loader2 className="h-8 w-8 text-red-500 animate-spin" />
      </div>
    );
  }

  if (stickers.length === 0) {
    return (
      <div className="h-60 flex items-center justify-center bg-gray-50 rounded-lg border border-black">
        <p className="text-gray-500">No stickers found in this category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[320px] overflow-y-auto p-2 bg-gray-50 rounded-lg border border-black scrollbar-hide">
      {stickers.map((sticker) => (
        <div
          key={sticker.id}
          className="relative aspect-square cursor-pointer hover:scale-105 transition-transform "
          onClick={() => onSelectSticker(sticker)}
        >
          <Image
            src={sticker.url}
            alt={sticker.name}
            fill={true}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain rounded-md"
          />
        </div>
      ))}
    </div>
  );
};

export default StickerPanel;