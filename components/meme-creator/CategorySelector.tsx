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
          onClick={() => onSelectCategory(category.id)}
          onMouseEnter={() => setHoveredCategory(category.id)}
          onMouseLeave={() => setHoveredCategory(null)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            "border border-red-200 hover:border-red-400",
            selectedCategory === category.id
              ? "bg-red-600 text-white"
              : hoveredCategory === category.id
              ? "bg-red-100 text-red-600"
              : "bg-white text-gray-700"
          )}
        >
          <span className="mr-2">{category.icon}</span>
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;