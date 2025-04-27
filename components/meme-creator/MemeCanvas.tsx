import { useRef, useState, useEffect } from "react";
import { Sticker, Template, TextElement } from "@/types";
import { Canvas, Image as FabricImage, Text as FabricText } from "fabric";
import { Download, MoveHorizontal, MoveVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MemeCanvasProps {
  selectedStickers: Sticker[];
  onRemoveSticker: (id: string) => void;
  selectedTemplate: Template | null;
  selectedTexts: TextElement[];
}

interface ExtendedFabricImage extends FabricImage {
  id?: string;
}

interface ExtendedFabricText extends FabricText {
  id?: string;
}

const MemeCanvas = ({ selectedStickers, onRemoveSticker, selectedTemplate, selectedTexts }: MemeCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const [canvasWidth, setCanvasWidth] = useState(600);
  const [canvasHeight, setCanvasHeight] = useState(600);

  useEffect(() => {
    if (canvasRef.current) {
      fabricCanvasRef.current = new Canvas(canvasRef.current, {
        width: canvasWidth,
        height: canvasHeight,
        selection: false,
      });

      return () => {
        fabricCanvasRef.current?.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (!fabricCanvasRef.current) return;
    const canvas = fabricCanvasRef.current;
  
    const existingTexts = canvas.getObjects()
      .filter(obj => obj.type === "text" && (obj as any).customType === "addedText") as ExtendedFabricText[];
  
    // Update existing or add new
    selectedTexts.forEach(textElement => {
      let fabricText = existingTexts.find(t => t.id === textElement.id);
  
      if (fabricText) {
        // 🔥 Save original position
        const oldLeft = fabricText.left || 100;
        const oldTop = fabricText.top || 100;
  
        // Update text properties
        fabricText.set({
          text: textElement.text,
          fontSize: textElement.fontSize || 24,
          fill: textElement.color || "black",
          fontFamily: textElement.fontFamily || "Arial",
        });
  
        // 🔥 Restore original position exactly
        fabricText.set({
          left: oldLeft,
          top: oldTop,
        });
  
        fabricText.setCoords(); // Important to refresh internal coordinates
      } else {
        // Add new
        const newText = new FabricText(textElement.text, {
          left: textElement.left || 100,
          top: textElement.top || 100,
          fontSize: textElement.fontSize || 24,
          fill: textElement.color || "black",
          fontFamily: textElement.fontFamily || "Arial",
          selectable: true,
          hasControls: true,
          lockScalingFlip: true,
          lockRotation: false,
          hasBorders: true,
          borderColor: "blue",
          cornerColor: "blue",
          cornerSize: 8,
          transparentCorners: false,
        }) as ExtendedFabricText;
        newText.id = textElement.id;
        (newText as any).customType = "addedText";
        canvas.add(newText);
      }
    });
  
    // Remove texts not in selectedTexts
    existingTexts.forEach(textObj => {
      if (!selectedTexts.find(t => t.id === textObj.id)) {
        canvas.remove(textObj);
      }
    });
  
    canvas.renderAll();
  }, [selectedTexts, canvasWidth, canvasHeight]);
  

  useEffect(() => {
    if (selectedTemplate && fabricCanvasRef.current) {
      const canvas = fabricCanvasRef.current;
      canvas.clear();

      FabricImage.fromURL("https://memeforge.mooo.com" + selectedTemplate.url, {
        crossOrigin: "anonymous",
      }).then((img: FabricImage) => {
        const screenWidth = window.innerWidth;
        const isMobile = screenWidth < 640;
        const maxWidth = isMobile ? screenWidth - 40 : 900;
        const maxHeight = isMobile ? window.innerHeight * 0.6 : 700;

        const aspectRatio = img.width! / img.height!;
        let newWidth = img.width!;
        let newHeight = img.height!;

        if (newWidth > maxWidth) {
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
          hoverCursor: "default",
        });

        canvas.add(img);
        canvas.sendObjectToBack(img);
        canvas.renderAll();
      });
    }
  }, [selectedTemplate]);

  useEffect(() => {
    if (fabricCanvasRef.current) {
      const canvas = fabricCanvasRef.current;
      const currentStickers = canvas.getObjects()
        .filter(obj => obj instanceof FabricImage && (obj as ExtendedFabricImage).id) as ExtendedFabricImage[];

      currentStickers.forEach(sticker => {
        if (!selectedStickers.some(s => s.id === sticker.id)) {
          canvas.remove(sticker);
        }
      });

      selectedStickers.forEach(sticker => {
        if (!currentStickers.some(s => s.id === sticker.id)) {
          FabricImage.fromURL(sticker.url, {
            crossOrigin: "anonymous",
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
              borderColor: "blue",
              cornerColor: "blue",
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
      const dataURL = canvas.toDataURL({
        format: "png",
        quality: 1,
        multiplier: 2,
      });

      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `meme-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
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
            <Button
              size="sm"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 drop-shadow-[2px_2px_0px_#000] border border-black"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex w-full gap-4 mb-4 overflow-x-auto px-4 md:justify-center p-2">
        {!selectedTemplate && (
          <>
            <Button
              size="sm"
              variant="outline"
              className="drop-shadow-[2px_2px_0px_#000]"
              onClick={() => handleResize("width", -50)}
            >
              <MoveHorizontal className="h-4 w-4" /> Shrink Width
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="drop-shadow-[2px_2px_0px_#000]"
              onClick={() => handleResize("width", 50)}
            >
              <MoveHorizontal className="h-4 w-4 rotate-180" /> Expand Width
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="drop-shadow-[2px_2px_0px_#000]"
              onClick={() => handleResize("height", -50)}
            >
              <MoveVertical className="h-4 w-4" /> Shrink Height
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="drop-shadow-[2px_2px_0px_#000]"
              onClick={() => handleResize("height", 50)}
            >
              <MoveVertical className="h-4 w-4 rotate-180" /> Expand Height
            </Button>
          </>
        )}
      </div>

      <div className="overflow-x-auto w-full scrollbar-hide">
        <canvas
          ref={canvasRef}
          className="border-2 border-dashed border-gray-300 rounded-lg mx-auto"
        />
      </div>
    </div>
  );
};

export default MemeCanvas;
