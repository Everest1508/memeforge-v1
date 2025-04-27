"use client";

import { useState } from 'react';
import { StickerCategory } from '@/types';
import { cn } from '@/lib/utils';

interface CategorySelectorProps {
  categories: StickerCategory[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
}

const CategorySelector = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategorySelectorProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.slug)}
          onMouseEnter={() => setHoveredCategory(category.slug)}
          onMouseLeave={() => setHoveredCategory(null)}
          className={cn(
            "px-4 py-2 rounded-lg drop-shadow-[2px_2px_0px_#000] text-sm font-medium transition-all duration-200",
            "border border-black hover:border-black",
            selectedCategory === category.slug
              ? "bg-red-600 text-white"
              : hoveredCategory === category.slug
              ? "bg-red-100 text-red-600"
              : "bg-white text-gray-700"
          )}
        >
          {/* <span className="mr-2">{category.icon}</span> */}
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;