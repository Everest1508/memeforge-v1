import { useRef, useState, useEffect } from "react";
import { Sticker, Template } from "@/types";
import { Canvas, Image as FabricImage, Rect, Text as FabricText } from "fabric";
import { Download, Share2, MoveHorizontal, MoveVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MemeCanvasProps {
  selectedStickers: Sticker[];
  onRemoveSticker: (id: string) => void;
  selectedTemplate: Template | null;
}

interface ExtendedFabricImage extends FabricImage {
  id?: string;
}

const MemeCanvas = ({ selectedStickers, onRemoveSticker, selectedTemplate }: MemeCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const [canvasWidth, setCanvasWidth] = useState(600);
  const [canvasHeight, setCanvasHeight] = useState(600);

  useEffect(() => {
    if (canvasRef.current) {
      fabricCanvasRef.current = new Canvas(canvasRef.current, {
        width: canvasWidth,
        height: canvasHeight,
        // backgroundColor: "#f3f4f6",
        selection: false,
      });

      return () => {
        fabricCanvasRef.current?.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (selectedTemplate && fabricCanvasRef.current) {
      const canvas = fabricCanvasRef.current;
      canvas.clear();

      FabricImage.fromURL(selectedTemplate.url, {
        crossOrigin: 'anonymous'
      }).then((img: FabricImage) => {
        const maxWidth = 900;
        const maxHeight = 700;
        const aspectRatio = img.width! / img.height!;

        let newWidth = img.width!;
        let newHeight = img.height!;

        if (img.width! > maxWidth) {
          newWidth = maxWidth;
          newHeight = maxWidth / aspectRatio;
        }

        if (newHeight > maxHeight) {
          newHeight = maxHeight;
          newWidth = maxHeight * aspectRatio;
        }

        setCanvasWidth(newWidth);
        setCanvasHeight(newHeight);
        canvas.setWidth(newWidth);
        canvas.setHeight(newHeight);

        img.set({
          scaleX: newWidth / img.width!,
          scaleY: newHeight / img.height!,
          selectable: false,
          evented: false,
          hasControls: false,
          hasBorders: false,
          lockMovementX: true,
          lockMovementY: true,
          lockRotation: true,
          lockScalingX: true,
          lockScalingY: true,
          hoverCursor: 'default',
        });

        // Add template first so it's at the bottom
        canvas.add(img);
        canvas.sendObjectToBack(img);
        canvas.renderAll();
      });
    }
  }, [selectedTemplate]);

  useEffect(() => {
    if (fabricCanvasRef.current) {
      const canvas = fabricCanvasRef.current;
      const currentStickers = canvas
        .getObjects()
        .filter((obj) => obj instanceof FabricImage && (obj as ExtendedFabricImage).id) as ExtendedFabricImage[];

      currentStickers.forEach((sticker) => {
        if (!selectedStickers.some((s) => s.id === sticker.id)) {
          canvas.remove(sticker);
        }
      });

      selectedStickers.forEach((sticker) => {
        if (!currentStickers.some((s) => s.id === sticker.id)) {
          FabricImage.fromURL(sticker.url, {
            crossOrigin: 'anonymous'
          }).then((img: ExtendedFabricImage) => {
            const maxStickerSize = Math.min(canvasWidth, canvasHeight) * 0.2;
            const aspectRatio = img.width! / img.height!;
            
            let width = maxStickerSize;
            let height = maxStickerSize / aspectRatio;
            
            if (height > maxStickerSize) {
              height = maxStickerSize;
              width = maxStickerSize * aspectRatio;
            }

            img.set({
              left: canvasWidth * 0.1,
              top: canvasHeight * 0.1,
              scaleX: width / img.width!,
              scaleY: height / img.height!,
              id: sticker.id,
              selectable: true,
              hasControls: true,
              lockScalingFlip: true,
              lockRotation: false,
              hasBorders: true,
              borderColor: 'blue',
              cornerColor: 'blue',
              cornerSize: 8,
              transparentCorners: false,
            });

            canvas.add(img);
            canvas.renderAll();
          });
        }
      });
    }
  }, [selectedStickers, onRemoveSticker, canvasWidth, canvasHeight]);

  const handleDownload = () => {
    if (fabricCanvasRef.current) {
      const canvas = fabricCanvasRef.current;
      // Convert canvas to data URL
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 2 // Increase resolution
      });

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `meme-${Date.now()}.png`; 
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = () => {
    alert("Share functionality would be implemented here");
  };

  const handleResize = (direction: "width" | "height", amount: number) => {
    if (!selectedTemplate && fabricCanvasRef.current) {
      const canvas = fabricCanvasRef.current;
      if (direction === "width") {
        const newWidth = Math.max(100, canvasWidth + amount);
        setCanvasWidth(newWidth);
        canvas.setWidth(newWidth);
      } else {
        const newHeight = Math.max(100, canvasHeight + amount);
        setCanvasHeight(newHeight);
        canvas.setHeight(newHeight);
      }
      canvas.renderAll();
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
        <canvas
          ref={canvasRef}
          className="border-2 border-dashed border-gray-300 rounded-lg mx-auto"
        />
      </div>
    </div>
  );
};

export default MemeCanvas;
