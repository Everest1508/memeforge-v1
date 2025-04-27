"use client";

import { useState } from 'react';
import { Sticker, Template, TextElement } from '@/types';
import MemeCanvas from '@/components/meme-creator/MemeCanvas';
import Toolbar from '@/components/meme-creator/Toolbar';
import TemplateSelector from '@/components/meme-creator/TemplateSelector';
import Layers from '@/components/meme-creator/Layers';  // <-- Import Layers component
import { motion } from 'framer-motion';



export default function MemeCreatorPage() {
  const [selectedStickers, setSelectedStickers] = useState<Sticker[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedTexts, setSelectedTexts] = useState<TextElement[]>([]);

    // Function to add text
  const handleAddText = (text: TextElement) => {
    setSelectedTexts([...selectedTexts, text]);
  };

  // Function to remove text
  const handleRemoveText = (textId: string) => {
    setSelectedTexts(selectedTexts.filter(t => t.id !== textId));
  };

  // Function to handle selecting a sticker (add to the list)
  const handleSelectSticker = (sticker: Sticker) => {
    setSelectedStickers([...selectedStickers, sticker]);
  };

  // Function to handle removing a sticker (remove from the list)
  const handleRemoveSticker = (stickerId: string) => {
    setSelectedStickers(selectedStickers.filter(s => s.id !== stickerId));
  };

  // Function to handle selecting a template
  const handleSelectTemplate: (template: Template) => void = (template: Template) => {
    setSelectedTemplate(template);
  };

  return (
    <div className="mx-auto md:px-24 py-12 px-4 font-[Melon] pt-28 min-h-screen">

      <div className="mb-8 mt-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#EF4444] drop-shadow-[2px_2px_0px_#000] font-[SpaceComic]">Meme Lab</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Canvas section - 100% width on mobile, 50% on desktop */}
        <div className="lg:order-1 lg:col-span-1">
        <MemeCanvas 
          selectedStickers={selectedStickers} 
          selectedTexts={selectedTexts}
          onRemoveSticker={handleRemoveSticker}
          selectedTemplate={selectedTemplate}
        />

        </div>
        
        {/* Tools section */}
        <div className="lg:order-2 lg:col-span-1">
          <Toolbar onSelectSticker={handleSelectSticker} />
          
          
          {/* Add Layers component below Toolbar */}
          <div className='px-4' >
          <Layers 
            selectedStickers={selectedStickers} 
            onRemoveSticker={handleRemoveSticker}
            selectedTexts={selectedTexts}
            onAddText={handleAddText}
            onRemoveText={handleRemoveText}
          />
          </div>

        </div>
      </div>
      <div className="mt-8">
        <TemplateSelector onSelectTemplate={handleSelectTemplate} />  
      </div>
    </div>
  );
}
