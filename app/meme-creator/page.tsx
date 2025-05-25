"use client";

import { useRef, useState, useEffect } from 'react';
import { Sticker, Template, TextElement, BrandElement } from '@/types';
import MemeCanvas from '@/components/meme-creator/MemeCanvas';
import Toolbar from '@/components/meme-creator/Toolbar';
import TemplateSelector from '@/components/meme-creator/TemplateSelector';
import Layers from '@/components/meme-creator/Layers';
import { v4 as uuidv4 } from "uuid";
import { Canvas } from 'fabric';
import { AnimatePresence, motion } from 'framer-motion';


export default function MemeCreatorPage() {
  const [selectedStickers, setSelectedStickers] = useState<Sticker[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedTexts, setSelectedTexts] = useState<TextElement[]>([]);
  const [brandElements, setBrandElements] = useState<BrandElement[]>([]);

  const fabricCanvasRef = useRef<Canvas | null>(null);

  const [isStickerOpen, setIsStickerOpen] = useState(true); // For toggling Stickers section
  const [isLayerOpen, setIsLayerOpen] = useState(true); // For toggling Layers section

  // 1. Добавляю состояние для размеров canvas
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 600 });

  // Добавляем логотип и надпись как обычные элементы при первом рендере
  useEffect(() => {
    // Проверяем, есть ли уже логотип и надпись
    setSelectedStickers(prev => {
      if (!prev.some(s => s.id === 'memeforge-logo')) {
        return [
          {
            id: 'memeforge-logo',
            url: '/brand-logo.png',
            name: 'MemeForge Logo',
            categoryId: 'brand',
            instanceId: 'memeforge-logo',
            left: 500,
            top: 10
          },
          ...prev
        ];
      }
      return prev;
    });
    setSelectedTexts(prev => {
      if (!prev.some(t => t.id === 'memeforge-website')) {
        return [
          {
            id: 'memeforge-website',
            text: 'www.MemeForge.lol',
            left: 10,
            top: 560,
            fontSize: 24,
            color: '#000',
            fontFamily: 'Arial',
            borderColor: '#000',
            fontWeight: 'bold',
            backgroundColor: '#FFD600'
          },
          ...prev
        ];
      }
      return prev;
    });
  }, []);

  // 2. Функция для обновления позиций бренд-элементов
  const updateBrandPositions = (width: number, height: number) => {
    setSelectedStickers(prev => prev.map(s =>
      s.id === 'memeforge-logo'
        ? { ...s, left: 0, top: 0 }
        : s
    ));
    setSelectedTexts(prev => prev.map(t =>
      t.id === 'memeforge-website'
        ? { ...t, left: 10, top: height - 40, color: '#000', backgroundColor: '#FFD600' }
        : t
    ));
  };

  // 3. useEffect для обновления позиций при изменении размера canvas
  useEffect(() => {
    setSelectedStickers(prev => prev.map(s =>
      s.id === 'memeforge-logo' ? { ...s, left: 0, top: 0 } : s
    ));
    setSelectedTexts(prev => prev.map(t =>
      t.id === 'memeforge-website' ? { ...t, left: 10, top: canvasSize.height - 40 } : t
    ));
  }, [canvasSize.width, canvasSize.height]);

  const handleAddText = (text: TextElement) => {
    const uniqueText = { ...text, id: uuidv4() };
    setSelectedTexts([...selectedTexts, uniqueText]);
  };

  const handleRemoveText = (textId: string) => {
    setSelectedTexts(selectedTexts.filter(t => t.id !== textId));
  };

  const handleSelectSticker = (sticker: Sticker) => {
    const uniqueSticker = { ...sticker, instanceId: uuidv4() };
    setSelectedStickers([...selectedStickers, uniqueSticker]);
  };

  const handleRemoveSticker = (instanceId: string) => {
    setSelectedStickers(selectedStickers.filter((s) => s.instanceId !== instanceId));
  };

  const handleSelectTemplate: (template: Template) => void = (template: Template) => {
    setSelectedTemplate(template);
  };

  const handleReorderStickers = (newOrder: Sticker[]) => {
    setSelectedStickers(newOrder);
  };

  const handleReorderTexts = (newOrder: TextElement[]) => {
    setSelectedTexts(newOrder);
  };

  const handleToggleBrandElement = (id: string) => {
    setBrandElements(prev => prev.map(element => 
      element.id === id ? { ...element, visible: !element.visible } : element
    ));
  };

  return (
    <div 
      className="mx-auto md:px-24 py-12 px-4 font-[Melon] pt-28 min-h-screen bg-[#C92D2E] text-white"
      style={{
        backgroundColor: '#C92D2E',
        backgroundImage: 'url("https://www.tabichain.com/images/new/bg/1.svg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >

      <div className="mb-8 mt-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-[2px_2px_0px_#000] font-[gumbo]">
          Meme Lab
        </h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:order-1 lg:col-span-1">
          <MemeCanvas 
            selectedStickers={selectedStickers} 
            selectedTexts={selectedTexts}
            onRemoveSticker={handleRemoveSticker}
            selectedTemplate={selectedTemplate}
            fabricCanvasRef={fabricCanvasRef}
            setCanvasSize={setCanvasSize}
          />
        </div>

        <div className="lg:order-2 lg:col-span-1 text-black">
          {/* Accordion for Stickers */}
          <div className="bg-white rounded-lg mb-4 drop-shadow-[4px_4px_0px_#000]">
            <button
              onClick={() => setIsStickerOpen(!isStickerOpen)}
              className="w-full text-lg font-semibold py-2 px-4 border-b border-[#C92D2E] focus:outline-none flex justify-between"
            >
              <span>Stickers</span>
              <span>{isStickerOpen ? '-' : '+'}</span>
            </button>

            <AnimatePresence initial={false}>
              {isStickerOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-4">
                    <Toolbar onSelectSticker={handleSelectSticker} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>


          {/* Accordion for Layers */}
          <div className="bg-white rounded-lg mb-4 drop-shadow-[4px_4px_0px_#000]">
            <button
              onClick={() => setIsLayerOpen(!isLayerOpen)}
              className="w-full text-lg font-semibold py-2 px-4 border-b border-[#C92D2E] focus:outline-none flex justify-between"
            >
              <span>Layers</span>
              <span>{isLayerOpen ? '-' : '+'}</span>
            </button>

            <AnimatePresence initial={false}>
              {isLayerOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-4">
                    <Layers
                      selectedStickers={selectedStickers}
                      onRemoveSticker={handleRemoveSticker}
                      selectedTexts={selectedTexts}
                      onAddText={handleAddText}
                      onRemoveText={handleRemoveText}
                      onReorderStickers={handleReorderStickers}
                      onReorderTexts={handleReorderTexts}
                      brandElements={brandElements}
                      onToggleBrandElement={handleToggleBrandElement}
                      canvasRef={fabricCanvasRef}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      <div className="mt-8">
        <TemplateSelector onSelectTemplate={handleSelectTemplate} />  
      </div>
    </div>
  );
}
