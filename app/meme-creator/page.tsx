"use client";

import { useState } from 'react';
import { Sticker, Template } from '@/types';
import MemeCanvas from '@/components/meme-creator/MemeCanvas';
import Toolbar from '@/components/meme-creator/Toolbar';
import TemplateSelector from '@/components/meme-creator/TemplateSelector';

export default function MemeCreatorPage() {
  const [selectedStickers, setSelectedStickers] = useState<Sticker[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const handleSelectSticker = (sticker: Sticker) => {
    setSelectedStickers([...selectedStickers, sticker]);
  };

  const handleRemoveSticker = (stickerId: string) => {
    setSelectedStickers(selectedStickers.filter(s => s.id !== stickerId));
  };

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Meme Lab</h1>
        <p className="text-gray-600 mt-2">Create and customize your blockchain-powered memes</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Canvas section - 100% width on mobile, 50% on desktop */}
        <div className="lg:order-1 lg:col-span-1">
          <MemeCanvas 
            selectedStickers={selectedStickers} 
            onRemoveSticker={handleRemoveSticker}
            selectedTemplate={selectedTemplate}
          />
        </div>
        
        {/* Tools section */}
        <div className="lg:order-2 lg:col-span-1">
          <Toolbar onSelectSticker={handleSelectSticker} />
          <TemplateSelector onSelectTemplate={handleSelectTemplate} />
        </div>
      </div>
    </div>
  );
}