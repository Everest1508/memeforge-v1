"use client";

import { useRef, useState, useEffect } from "react";
import { Sticker, Template } from "@/types";
import { Download, Share2, Trash2, MoveHorizontal, MoveVertical } from "lucide-react";
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
  rotation: number;
  scale: number;
  isResizing: boolean;
  isRotating: boolean;
  resizeDirection: string | null;
  isSelected: boolean;
  initialWidth: number;
  initialHeight: number;
  initialX: number;
  initialY: number;
  initialRotation: number;
}

const MemeCanvas = ({ selectedStickers, onRemoveSticker, selectedTemplate }: MemeCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasWidth, setCanvasWidth] = useState(600);
  const [canvasHeight, setCanvasHeight] = useState(600);

  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([]);
  const [activeSticker, setActiveSticker] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [initialAngle, setInitialAngle] = useState(0);
  const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (selectedTemplate) {
      const img = new Image();
      img.src = selectedTemplate.url;
      img.onload = () => {
        const maxWidth = 900;
        const maxHeight = 700;
        const aspectRatio = img.width / img.height;

        let newWidth = img.width;
        let newHeight = img.height;

        if (img.width > maxWidth) {
          newWidth = maxWidth;
          newHeight = maxWidth / aspectRatio;
        }

        if (newHeight > maxHeight) {
          newHeight = maxHeight;
          newWidth = maxHeight * aspectRatio;
        }

        setCanvasWidth(newWidth);
        setCanvasHeight(newHeight);
      };
    }
  }, [selectedTemplate]);

  useEffect(() => {
    if (selectedStickers.length > placedStickers.length) {
      const newSticker = selectedStickers[selectedStickers.length - 1];
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
          rotation: 0,
          scale: 1,
          isResizing: false,
          isRotating: false,
          resizeDirection: null,
          isSelected: false,
          initialWidth: 100,
          initialHeight: 100,
          initialX: 50,
          initialY: 50,
          initialRotation: 0,
        },
      ]);
    }
  }, [selectedStickers, placedStickers]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, stickerId: string, action: 'move' | 'resize' | 'rotate' = 'move', direction?: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const sticker = placedStickers.find(s => s.id === stickerId);
    if (!sticker) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    if (action === 'resize' && direction) {
      setPlacedStickers(
        placedStickers.map((s) =>
          s.id === stickerId
            ? { 
                ...s, 
                isResizing: true, 
                resizeDirection: direction, 
                zIndex: Math.max(...placedStickers.map((s) => s.zIndex)) + 1,
                initialWidth: s.width,
                initialHeight: s.height,
                initialX: s.x,
                initialY: s.y
              }
            : s
        )
      );
    } else if (action === 'rotate') {
      const centerX = sticker.x + sticker.width / 2;
      const centerY = sticker.y + sticker.height / 2;
      const angle = Math.atan2(offsetY - centerY, offsetX - centerX) * (180 / Math.PI);
      setInitialAngle(angle);
      setInitialMousePosition({ x: e.clientX, y: e.clientY });
      setPlacedStickers(
        placedStickers.map((s) =>
          s.id === stickerId
            ? { 
                ...s, 
                isRotating: true, 
                zIndex: Math.max(...placedStickers.map((s) => s.zIndex)) + 1,
                initialRotation: s.rotation
              }
            : s
        )
      );
    } else {
      setDragOffset({ x: offsetX, y: offsetY });
      setPlacedStickers(
        placedStickers.map((s) =>
          s.id === stickerId
            ? { ...s, isDragging: true, zIndex: Math.max(...placedStickers.map((s) => s.zIndex)) + 1 }
            : s
        )
      );
    }

    setActiveSticker(stickerId);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!activeSticker) return;

    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;

    const mouseX = e.clientX - canvasRect.left;
    const mouseY = e.clientY - canvasRect.top;
    const sticker = placedStickers.find(s => s.id === activeSticker);
    if (!sticker) return;

    if (sticker.isResizing && sticker.resizeDirection) {
      const centerX = sticker.initialX + sticker.initialWidth / 2;
      const centerY = sticker.initialY + sticker.initialHeight / 2;
      
      // Calculate distance from center
      const dx = mouseX - centerX;
      const dy = mouseY - centerY;
      
      // Calculate angle relative to center
      const angle = Math.atan2(dy, dx);
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Calculate scale based on distance from center
      const baseDistance = Math.sqrt(
        (sticker.initialWidth / 2) ** 2 + 
        (sticker.initialHeight / 2) ** 2
      );
      
      let scale = distance / baseDistance;
      scale = Math.max(0.2, Math.min(scale, 3)); // Limit scale between 0.2 and 3

      const newWidth = sticker.initialWidth * scale;
      const newHeight = sticker.initialHeight * scale;

      let newX = sticker.initialX;
      let newY = sticker.initialY;

      switch (sticker.resizeDirection) {
        case 'nw':
          newX = sticker.initialX + (sticker.initialWidth - newWidth);
          newY = sticker.initialY + (sticker.initialHeight - newHeight);
          break;
        case 'ne':
          newY = sticker.initialY + (sticker.initialHeight - newHeight);
          break;
        case 'sw':
          newX = sticker.initialX + (sticker.initialWidth - newWidth);
          break;
      }

      setPlacedStickers(
        placedStickers.map((s) =>
          s.id === activeSticker
            ? { 
                ...s, 
                width: newWidth, 
                height: newHeight,
                x: newX,
                y: newY
              }
            : s
        )
      );
    } else if (sticker.isRotating) {
      const centerX = sticker.x + sticker.width / 2;
      const centerY = sticker.y + sticker.height / 2;
      
      // Calculate angle between initial mouse position and current position
      const dx = e.clientX - initialMousePosition.x;
      const dy = e.clientY - initialMousePosition.y;
      const angleChange = Math.atan2(dy, dx) * (180 / Math.PI);
      
      // Apply rotation with smoothing
      const newRotation = sticker.initialRotation + angleChange;
      
      setPlacedStickers(
        placedStickers.map((s) =>
          s.id === activeSticker
            ? { ...s, rotation: newRotation }
            : s
        )
      );
    } else if (sticker.isDragging) {
      setPlacedStickers(
        placedStickers.map((s) =>
          s.id === activeSticker
            ? {
                ...s,
                x: mouseX - dragOffset.x,
                y: mouseY - dragOffset.y,
              }
            : s
        )
      );
    }
  };

  const handleMouseUp = () => {
    if (!activeSticker) return;

    setPlacedStickers(
      placedStickers.map((s) =>
        s.id === activeSticker
          ? { ...s, isDragging: false, isResizing: false, isRotating: false, resizeDirection: null }
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
    alert("Download functionality would be implemented here");
  };

  const handleShare = () => {
    alert("Share functionality would be implemented here");
  };

  const handleResize = (direction: "width" | "height", amount: number) => {
    if (!selectedTemplate) {
      if (direction === "width") setCanvasWidth((w) => Math.max(100, w + amount));
      else setCanvasHeight((h) => Math.max(100, h + amount));
    }
  };

  const handleStickerClick = (stickerId: string) => {
    setPlacedStickers(
      placedStickers.map((s) =>
        s.id === stickerId
          ? { ...s, isSelected: true, zIndex: Math.max(...placedStickers.map((s) => s.zIndex)) + 1 }
          : { ...s, isSelected: false }
      )
    );
    setActiveSticker(stickerId);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === canvasRef.current) {
      setPlacedStickers(placedStickers.map(s => ({ ...s, isSelected: false })));
      setActiveSticker(null);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white p-4 shadow-sm mb-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Canvas</h2>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="flex items-center gap-2" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
            <Button size="sm" className="flex items-center gap-2 bg-red-600 hover:bg-red-700" onClick={handleDownload}>
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex w-full gap-4 mb-4 overflow-x-auto px-4 md:justify-center">
        {!selectedTemplate && (
          <>
            <Button size="sm" variant="outline" onClick={() => handleResize("width", -50)}>
              <MoveHorizontal className="h-4 w-4" /> Shrink Width
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleResize("width", 50)}>
              <MoveHorizontal className="h-4 w-4 rotate-180" /> Expand Width
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleResize("height", -50)}>
              <MoveVertical className="h-4 w-4" /> Shrink Height
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleResize("height", 50)}>
              <MoveVertical className="h-4 w-4 rotate-180" /> Expand Height
            </Button>
          </>
        )}
      </div>

      
      <div className="overflow-x-auto w-full">

      <div
        ref={canvasRef}
        className="relative bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden mx-auto"
        style={{ width: `${canvasWidth}px`, height: `${canvasHeight}px` }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleCanvasClick}
      >
        {selectedTemplate && (
          <img
            src={selectedTemplate.url}
            alt={selectedTemplate.name}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />
        )}

        {placedStickers.map((sticker) => (
          <div
            key={sticker.id}
            className={`absolute cursor-move ${sticker.isSelected ? "ring-2 ring-blue-500" : ""}`}
            style={{
              left: `${sticker.x}px`,
              top: `${sticker.y}px`,
              width: `${sticker.width}px`,
              height: `${sticker.height}px`,
              zIndex: sticker.zIndex,
              transform: `rotate(${sticker.rotation}deg)`,
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleStickerClick(sticker.id);
            }}
            onMouseDown={(e) => handleMouseDown(e, sticker.id)}
          >
            <img src={sticker.url} alt={sticker.name} className="w-full h-full object-contain" />
            
            {/* Controls - only show when sticker is selected */}
            {sticker.isSelected && (
              <div className="absolute inset-0 border-2 border-blue-500">
                {/* Resize handles */}
                <div
                  className="absolute -top-1 -left-1 w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-nw-resize"
                  onMouseDown={(e) => handleMouseDown(e, sticker.id, 'resize', 'nw')}
                />
                <div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-ne-resize"
                  onMouseDown={(e) => handleMouseDown(e, sticker.id, 'resize', 'ne')}
                />
                <div
                  className="absolute -bottom-1 -left-1 w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-sw-resize"
                  onMouseDown={(e) => handleMouseDown(e, sticker.id, 'resize', 'sw')}
                />
                <div
                  className="absolute -bottom-1 -right-1 w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-se-resize"
                  onMouseDown={(e) => handleMouseDown(e, sticker.id, 'resize', 'se')}
                />
                
                {/* Rotation handle */}
                <div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-grab"
                  onMouseDown={(e) => handleMouseDown(e, sticker.id, 'rotate')}
                />
                
                {/* Delete button - always visible when selected */}
                <button
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveSticker(sticker.id);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        ))}
        {!selectedTemplate && placedStickers.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 p-4">
            <p>Select a template or add stickers to start creating</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default MemeCanvas;
