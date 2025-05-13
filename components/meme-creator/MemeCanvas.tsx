import { useRef, useState, useEffect } from "react";
import { Sticker, Template, TextElement } from "@/types";
import { Canvas, Image as FabricImage, Text as FabricText } from "fabric";
import { Download, MoveHorizontal, MoveVertical, SendIcon, Share, Share2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure you import the CSS
import { signIn, useSession } from "next-auth/react";


interface MemeCanvasProps {
  selectedStickers: Sticker[];
  onRemoveSticker: (id: string) => void;
  selectedTemplate: Template | null;
  selectedTexts: TextElement[];
  fabricCanvasRef: React.MutableRefObject<Canvas | null>;
}

interface ExtendedFabricImage extends FabricImage {
  id?: string;
}

interface ExtendedFabricText extends FabricText {
  id?: string;
}

const MemeCanvas = ({ selectedStickers, onRemoveSticker, selectedTemplate, selectedTexts,fabricCanvasRef }: MemeCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasWidth, setCanvasWidth] = useState(600);
  const [canvasHeight, setCanvasHeight] = useState(600);
  const [uploadedTemplate, setUploadedTemplate] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const { data: session } = useSession();
  const [backgroundColor, setBackgroundColor] = useState<string>("#C92D2E"); // Default background color});
 

  useEffect(() => {
    if (fabricCanvasRef.current) {
      const canvas = fabricCanvasRef.current;
      canvas.backgroundColor = backgroundColor || "#C92D2E"; // Set default background color
      canvas.renderAll();
    }
  }, [backgroundColor]);
  

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

    selectedTexts.forEach(textElement => {
      let fabricText = existingTexts.find(t => t.id === textElement.id);

      if (fabricText) {
        const oldLeft = fabricText.left || 100;
        const oldTop = fabricText.top || 100;

        fabricText.set({
          text: textElement.text,
          fontSize: textElement.fontSize || 24,
          fill: textElement.color || "black",
          fontFamily: textElement.fontFamily || "Arial",
          fontWeight: textElement.fontWeight || "normal", // <-- ADD THIS
          borderColor: textElement.borderColor || "blue", // <-- ADD THIS
        });


        fabricText.set({
          left: oldLeft,
          top: oldTop,
        });

        fabricText.setCoords();
      } else {
        const newText = new FabricText(textElement.text, {
          left: textElement.left || 100,
          top: textElement.top || 100,
          fontSize: textElement.fontSize || 24,
          fill: textElement.color || "black",
          fontFamily: textElement.fontFamily || "Arial",
          fontWeight: textElement.fontWeight || "normal", // <-- ADD THIS
          selectable: true,
          hasControls: true,
          lockScalingFlip: true,
          lockRotation: false,
          hasBorders: true,
          borderColor: textElement.borderColor || "blue", // <-- ADD THIS
          cornerColor: "blue",
          cornerSize: 8,
          transparentCorners: false,
        }) as ExtendedFabricText;
        newText.id = textElement.id;
        (newText as any).customType = "addedText";
        canvas.add(newText);
      }
    });

    existingTexts.forEach(textObj => {
      if (!selectedTexts.find(t => t.id === textObj.id)) {
        canvas.remove(textObj);
      }
    });

    canvas.renderAll();
  }, [selectedTexts, canvasWidth, canvasHeight]);

  useEffect(() => {
    if (fabricCanvasRef.current) {
      const canvas = fabricCanvasRef.current;
      // Get all existing stickers on the canvas
      const currentStickers = canvas
        .getObjects()
        .filter((obj) => obj instanceof FabricImage && (obj as ExtendedFabricImage).id) as ExtendedFabricImage[];

      // Remove stickers that are no longer in the selectedStickers array
      currentStickers.forEach((sticker) => {
        if (!selectedStickers.some((s) => s.instanceId === sticker.id)) {
          canvas.remove(sticker);
        }
      });

      // Add new stickers to the canvas
      selectedStickers.forEach((sticker) => {
        if (!currentStickers.some((s) => s.id === sticker.instanceId)) {
          FabricImage.fromURL(sticker.url.replace('http://', 'https://'), {
            crossOrigin: 'anonymous',
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
              id: sticker.instanceId, // Use unique instanceId for each sticker
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
  }, [selectedStickers, canvasWidth, canvasHeight]);

  // Upload template and resize the canvas

  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const loadTemplate = async (url: string) => {
      const img = await FabricImage.fromURL(url, { crossOrigin: "anonymous" });

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

      img.scaleToWidth(newWidth);
      img.scaleToHeight(newHeight);

      img.set({
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

      canvas.clear();
      canvas.add(img);
      canvas.sendObjectToBack(img);
      canvas.renderAll();
    };

    if (selectedTemplate) {
      setUploadedTemplate(null); // reset uploadedTemplate if template selected
      loadTemplate("https://memeforge.mooo.com" + selectedTemplate.url);
    } else if (uploadedTemplate) {
      loadTemplate(uploadedTemplate);
    }
  }, [selectedTemplate, uploadedTemplate]);


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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedTemplate(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };



  const handleSubmit = async () => {
    if (!fabricCanvasRef.current) return;

    // Check if there's a session (i.e., the user is logged in)
    const session = await axios.get("/api/auth/session");

    if (!session.data?.user) {
      // If no session (user not logged in), show a toast message to log in
      toast.info("Please log in to submit a meme.");
      return; // Stop further execution
    }

    const email = session.data?.user?.email || "anonymous@memeforge.lol";

    const canvas = fabricCanvasRef.current;
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 1,
    });

    try {
      // Check if the user has already submitted a meme today
      const checkResponse = await axios.get("https://memeforge.mooo.com/check-submission/", {
        params: { email: email }
      });

      if (checkResponse.data.message === "You have already submitted a meme today.") {
        toast.info("You have already submitted a meme today.");
        return; // Stop further execution if the user has already submitted
      }

      // If no submission found, proceed with uploading the meme
      const uploadResponse = await axios.post(
        "/api/upload-meme",
        { imageData: dataURL },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Meme uploaded successfully!", uploadResponse.data);

      const imageUrl = uploadResponse.data.url;

      // Proceed with submitting the meme
      const submissionResponse = await axios.post(
        "https://memeforge.mooo.com/submissions/",
        {
          vercel_blob_url: imageUrl,
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Show a success toast with the response message from Memeforge API
      toast.success(`${submissionResponse.data.message || ''}`);
    } catch (error) {
      console.error("Failed during meme submission", error);
      // Show an error toast
      toast.error("Failed to upload or submit meme. Please try again.");
    }
  };

    const handleBackgroundColorChange = (color: string) => {
      setBackgroundColor(color);
    
      if (fabricCanvasRef.current) {
        const canvas = fabricCanvasRef.current;
        canvas.backgroundColor = color;
      }
    };
  


  return (
    <div className="flex flex-col h-full">
      <div className="bg-white p-4 shadow-sm mb-4 rounded-lg drop-shadow-[4px_4px_0px_#000]">
        <div className="flex justify-between items-center overflow-x-auto">
          <h2 className="text-xl font-bold text-gray-800 hidden md:block">Canvas</h2>
          <div className="flex space-x-2">
            <input
              type="color"
              id="backgroundColor"
              value={backgroundColor}
              onChange={(e) => handleBackgroundColorChange(e.target.value)}
              className="w-10 h-10 border rounded-full cursor-pointer drop-shadow-[2px_2px_0px_#000]"
            />
            <Button
              size="sm"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 drop-shadow-[2px_2px_0px_#000] border border-black"
              onClick={handleSubmit}
            ><SendIcon className="h-4 w-4" />
              <span>Submit</span>
            </Button>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <Button
              size="sm"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 drop-shadow-[2px_2px_0px_#000] border border-black"
              onClick={() => fileInputRef.current?.click()} // 👈 Trigger file input click
            >
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </Button>

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
        {/* {!selectedTemplate && (
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
        )} */}
      </div>

      <div className="overflow-x-auto w-full scrollbar-hide">
        <canvas
          ref={canvasRef}
          className="border-2 border-dashed border-gray-300 rounded-lg mx-auto"
        />
      </div>
      {modalIsOpen && !session?.user && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-80 text-center drop-shadow-[4px_4px_0px_#000] border border-black"
            style={{
              backgroundColor: '#C92D2E',
              backgroundImage: 'url("https://www.tabichain.com/images/new/bg/1.svg")',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          >
            <h3 className="text-xl font-semibold">Please log in to submit your meme</h3>
            <p className="mt-4">You need to be logged in to submit a meme.</p>
            <div className="mt-6 flex justify-center gap-2">
              <Button onClick={() => signIn('twitter')} className="bg-red-500 drop-shadow-[2px_2px_0px_#000] border border-black hover:bg-red-700">
                Login
              </Button>
              <Button onClick={() => setModalIsOpen(false)} className="bg-white hover:bg-gray-200  text-black border border-black  drop-shadow-[2px_2px_0px_#000]">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }} // Ensure the toast is above other elements  
      />
    </div>
  );
};

export default MemeCanvas;
