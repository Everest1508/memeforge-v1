"use client";

import { useRef, useState, useEffect } from "react";
import { Sticker, Template } from "@/types";
import { Download, Share2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MemeCanvasProps {
  selectedStickers: Sticker[];
  onRemoveSticker: (id: string) => void;
  selectedTemplate: Template | null;
}

interface PlacedSticker extends Sticker {
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isDragging: boolean;
}

const MemeCanvas = ({ selectedStickers, onRemoveSticker, selectedTemplate }: MemeCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([]);
  const [activeSticker, setActiveSticker] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Add new stickers when selectedStickers changes
  useEffect(() => {
    if (selectedStickers.length > placedStickers.length) {
      const newSticker = selectedStickers[selectedStickers.length - 1];
      
      if (!placedStickers.find(s => s.id === newSticker.id + Date.now())) {
        // Generate a unique ID by adding timestamp
        const uniqueId = newSticker.id + Date.now();
        
        setPlacedStickers([
          ...placedStickers,
          {
            ...newSticker,
            id: uniqueId,
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            zIndex: placedStickers.length + 1,
            isDragging: false,
          },
        ]);
      }
    }
  }, [selectedStickers, placedStickers]);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    stickerId: string
  ) => {
    e.preventDefault();
    const sticker = placedStickers.find((s) => s.id === stickerId);
    if (!sticker) return;

    // Calculate the offset from the sticker's position to the mouse position
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    setDragOffset({ x: offsetX, y: offsetY });
    setActiveSticker(stickerId);

    // Bring sticker to front
    setPlacedStickers(
      placedStickers.map((s) => 
        s.id === stickerId 
          ? { ...s, zIndex: Math.max(...placedStickers.map(s => s.zIndex)) + 1, isDragging: true } 
          : s
      )
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!activeSticker) return;

    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;

    // Get mouse position relative to canvas
    const mouseX = e.clientX - canvasRect.left;
    const mouseY = e.clientY - canvasRect.top;

    // Update sticker position
    setPlacedStickers(
      placedStickers.map((sticker) =>
        sticker.id === activeSticker
          ? {
              ...sticker,
              x: mouseX - dragOffset.x,
              y: mouseY - dragOffset.y,
            }
          : sticker
      )
    );
  };

  const handleMouseUp = () => {
    if (!activeSticker) return;
    
    setPlacedStickers(
      placedStickers.map((s) => 
        s.id === activeSticker 
          ? { ...s, isDragging: false } 
          : s
      )
    );
    
    setActiveSticker(null);
  };

  const handleRemoveSticker = (stickerId: string) => {
    setPlacedStickers(placedStickers.filter((s) => s.id !== stickerId));
    onRemoveSticker(stickerId);
  };

  const handleDownload = () => {
    // Implementation for downloading the canvas as an image would go here
    alert("Download functionality would be implemented here");
  };

  const handleShare = () => {
    // Implementation for sharing the meme would go here
    alert("Share functionality would be implemented here");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white p-4 shadow-sm mb-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Canvas</h2>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
            <Button
              size="sm"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
          </div>
        </div>
      </div>

      <div
        ref={canvasRef}
        className="flex-grow relative bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden"
        style={{ minHeight: "300px" }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {selectedTemplate && (
          <div className="absolute inset-0">
            <img
              src={selectedTemplate.url}
              alt={selectedTemplate.name}
              className="w-full h-full object-contain"
            />
          </div>
        )}
        
        {placedStickers.map((sticker) => (
          <div
            key={sticker.id}
            className={`absolute cursor-move ${sticker.isDragging ? 'ring-2 ring-red-500' : ''}`}
            style={{
              left: `${sticker.x}px`,
              top: `${sticker.y}px`,
              width: `${sticker.width}px`,
              height: `${sticker.height}px`,
              zIndex: sticker.zIndex,
            }}
            onMouseDown={(e) => handleMouseDown(e, sticker.id)}
          >
            <img
              src={sticker.url}
              alt={sticker.name}
              className="w-full h-full object-contain"
            />
            {sticker.isDragging && (
              <button
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                onClick={() => handleRemoveSticker(sticker.id)}
              >
                <Trash2 className="h-3 w-3" />
              </button>
            )}
          </div>
        ))}
        {!selectedTemplate && placedStickers.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <p>Select a template or add stickers to start creating</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemeCanvas;