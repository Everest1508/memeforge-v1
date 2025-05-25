import { useState } from 'react';
import { Sticker, TextElement, BrandElement } from '@/types';
import { Canvas, Object as FabricObject } from 'fabric';
import { X } from 'lucide-react';

interface ExtendedFabricObject extends FabricObject {
  id?: string;
}

type LayersProps = {
  selectedStickers: Sticker[];
  onRemoveSticker: (stickerId: string) => void;
  selectedTexts: TextElement[];
  onAddText: (text: TextElement) => void;
  onRemoveText: (textId: string) => void;
  onReorderStickers: (stickers: Sticker[]) => void;
  onReorderTexts: (texts: TextElement[]) => void;
  brandElements: BrandElement[];
  onToggleBrandElement: (id: string) => void;
  canvasRef: React.MutableRefObject<Canvas | null>;
};

const fontOptions = [
  'SpaceComic',
  'jsm',
  'Melon',
  'gumbo',
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Georgia',
  'Roboto',
];

export default function Layers({
  selectedStickers,
  onRemoveSticker,
  selectedTexts,
  onAddText,
  onRemoveText,
  onReorderStickers,
  onReorderTexts,
  brandElements,
  onToggleBrandElement,
  canvasRef,
}: LayersProps) {
  const [activeTab, setActiveTab] = useState<'layers' | 'text' | 'brand'>('layers');
  const [newText, setNewText] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [borderColor, setBorderColor] = useState('#ffffff');
  const [isBold, setIsBold] = useState(false);
  const [selectedFont, setSelectedFont] = useState('Arial'); // State for selected font
  const [showModal, setShowModal] = useState(false);

  const handleAddText = () => {
    if (newText.trim() !== '') {
      const textToAdd = selectedFont === 'SpaceComic' ? newText.toUpperCase() : newText;
      onAddText({
        id: Date.now().toString(),
        text: textToAdd,
        color: textColor,
        borderColor: borderColor,
        fontWeight: isBold ? 'bold' : 'normal',
        fontFamily: selectedFont, // Add font family to the TextElement
      });
      setNewText('');
      setTextColor('#000000');
      setBorderColor('#ffffff');
      setIsBold(false);
      setSelectedFont('Arial'); // Reset font to default after adding text
      setShowModal(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'layers' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('layers')}
        >
          Layers
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('text')}
        >
          Text
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'brand' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('brand')}
        >
          Brand
        </button>
      </div>

      {activeTab === 'brand' && (
        <div className="space-y-4">
          {brandElements.map((element) => (
            <div key={element.id} className="flex items-center justify-between p-2 bg-gray-100 rounded">
              <span>{element.type === 'logo' ? 'Logo' : 'Website'}</span>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={element.visible}
                  onChange={() => onToggleBrandElement(element.id)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span>Visible</span>
              </label>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'layers' && (
        <div>
          {/* Render selected stickers */}
          {selectedStickers.length === 0 ? (
            <p className="text-gray-900">No stickers added.</p>
          ) : (
            selectedStickers.map((sticker, index) => (
              <div
                key={sticker.instanceId}
                className="flex justify-between items-center mb-2 max-h-8 h-8 overflow-y-auto"
              >
                <div className="flex items-center">
                  <img
                    src={sticker.url}
                    alt={sticker.name}
                    className="w-8 h-8 object-cover rounded"
                  />
                  <span>Layer {index + 1}</span>
                </div>

                <div className="flex items-center gap-5">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => {
                      const newStickers = [...selectedStickers];
                      if (index > 0) {
                        [newStickers[index], newStickers[index - 1]] = [newStickers[index - 1], newStickers[index]];
                        onReorderStickers(newStickers);
                        // Update canvas objects order
                        if (canvasRef.current) {
                          const canvas = canvasRef.current;
                          const backgroundColor = canvas.backgroundColor;
                          const backgroundImage = canvas.getObjects().find(obj => !obj.selectable && !obj.evented); // Find background image
                          const objects = canvas.getObjects().filter(obj => obj.selectable || obj.evented) as ExtendedFabricObject[];
                          
                          // Remove all objects from canvas
                          objects.forEach(obj => canvas.remove(obj));
                          
                          // Add background image back if it exists
                          if (backgroundImage) {
                            canvas.add(backgroundImage);
                            canvas.sendObjectToBack(backgroundImage);
                          }
                          
                          // Add objects back in the correct order
                          newStickers.forEach(sticker => {
                            const obj = objects.find(o => o.id === sticker.instanceId);
                            if (obj) canvas.add(obj);
                          });
                          
                          // Add text objects
                          selectedTexts.forEach(text => {
                            const obj = objects.find(o => o.id === text.id);
                            if (obj) canvas.add(obj);
                          });
                          
                          canvas.backgroundColor = backgroundColor;
                          canvas.renderAll();
                        }
                      }
                    }}
                    disabled={index === 0}
                  >
                    ↑
                  </button>
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => {
                      const newStickers = [...selectedStickers];
                      if (index < selectedStickers.length - 1) {
                        [newStickers[index], newStickers[index + 1]] = [newStickers[index + 1], newStickers[index]];
                        onReorderStickers(newStickers);
                        // Update canvas objects order
                        if (canvasRef.current) {
                          const canvas = canvasRef.current;
                          const backgroundColor = canvas.backgroundColor;
                          const backgroundImage = canvas.getObjects().find(obj => !obj.selectable && !obj.evented); // Find background image
                          const objects = canvas.getObjects().filter(obj => obj.selectable || obj.evented) as ExtendedFabricObject[];
                          
                          // Remove all objects from canvas
                          objects.forEach(obj => canvas.remove(obj));
                          
                          // Add background image back if it exists
                          if (backgroundImage) {
                            canvas.add(backgroundImage);
                            canvas.sendObjectToBack(backgroundImage);
                          }
                          
                          // Add objects back in the correct order
                          newStickers.forEach(sticker => {
                            const obj = objects.find(o => o.id === sticker.instanceId);
                            if (obj) canvas.add(obj);
                          });
                          
                          // Add text objects
                          selectedTexts.forEach(text => {
                            const obj = objects.find(o => o.id === text.id);
                            if (obj) canvas.add(obj);
                          });
                          
                          canvas.backgroundColor = backgroundColor;
                          canvas.renderAll();
                        }
                      }
                    }}
                    disabled={index === selectedStickers.length - 1}
                  >
                    ↓
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onRemoveSticker(sticker.instanceId)}
                  >
                    <X className="w-6 h-6 rounded-full drop-shadow-[2px_2px_0px_#000]" />
                  </button>
                </div>
              </div>
            ))
          )}
          {/* Render selected texts (включая брендовые) */}
          {selectedTexts.length === 0 ? null : (
            selectedTexts.map((text, index) => (
              <div
                key={text.id}
                className="flex justify-between items-center mb-2 max-h-8 h-8 overflow-y-auto"
              >
                <div className="flex items-center">
                  <span
                    title={text.text}
                    className={`truncate max-w-[120px] overflow-hidden whitespace-nowrap block ${text.id === 'memeforge-website' ? 'bg-yellow-300 px-2 rounded' : ''}`}
                  >
                    {text.text}
                  </span>
                </div>
                <div className="flex items-center gap-5">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onRemoveText(text.id)}
                  >
                    <X className="w-6 h-6 rounded-full drop-shadow-[2px_2px_0px_#000]" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'text' && (
        <div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#C92D2E] text-white font-bold w-full py-2 rounded hover:bg-red-500 mb-2"
          >
            Add New Text
          </button>

          {selectedTexts.length === 0 ? (
            <p className="text-gray-900">No text added.</p>
          ) : (
            selectedTexts.map((text, index) => (
              <div
                key={text.id}
                className="flex justify-between items-center mb-2"
              >
                <span
                  title={text.text}
                  className="truncate max-w-[120px] overflow-hidden whitespace-nowrap block"
                >
                  {text.text}
                </span>

                <div className="flex items-center gap-5">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => {
                      const newTexts = [...selectedTexts];
                      if (index > 0) {
                        [newTexts[index], newTexts[index - 1]] = [newTexts[index - 1], newTexts[index]];
                        onReorderTexts(newTexts);
                        // Update canvas objects order
                        if (canvasRef.current) {
                          const canvas = canvasRef.current;
                          const backgroundColor = canvas.backgroundColor;
                          const backgroundImage = canvas.getObjects().find(obj => !obj.selectable && !obj.evented); // Find background image
                          const objects = canvas.getObjects().filter(obj => obj.selectable || obj.evented) as ExtendedFabricObject[];
                          
                          // Remove all objects from canvas
                          objects.forEach(obj => canvas.remove(obj));
                          
                          // Add background image back if it exists
                          if (backgroundImage) {
                            canvas.add(backgroundImage);
                            canvas.sendObjectToBack(backgroundImage);
                          }
                          
                          // Add objects back in the correct order
                          newTexts.forEach(text => {
                            const obj = objects.find(o => o.id === text.id);
                            if (obj) canvas.add(obj);
                          });
                          
                          canvas.backgroundColor = backgroundColor;
                          canvas.renderAll();
                        }
                      }
                    }}
                    disabled={index === 0}
                  >
                    ↑
                  </button>
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => {
                      const newTexts = [...selectedTexts];
                      if (index < selectedTexts.length - 1) {
                        [newTexts[index], newTexts[index + 1]] = [newTexts[index + 1], newTexts[index]];
                        onReorderTexts(newTexts);
                        // Update canvas objects order
                        if (canvasRef.current) {
                          const canvas = canvasRef.current;
                          const backgroundColor = canvas.backgroundColor;
                          const backgroundImage = canvas.getObjects().find(obj => !obj.selectable && !obj.evented); // Find background image
                          const objects = canvas.getObjects().filter(obj => obj.selectable || obj.evented) as ExtendedFabricObject[];
                          
                          // Remove all objects from canvas
                          objects.forEach(obj => canvas.remove(obj));
                          
                          // Add background image back if it exists
                          if (backgroundImage) {
                            canvas.add(backgroundImage);
                            canvas.sendObjectToBack(backgroundImage);
                          }
                          
                          // Add objects back in the correct order
                          newTexts.forEach(text => {
                            const obj = objects.find(o => o.id === text.id);
                            if (obj) canvas.add(obj);
                          });
                          
                          canvas.backgroundColor = backgroundColor;
                          canvas.renderAll();
                        }
                      }
                    }}
                    disabled={index === selectedTexts.length - 1}
                  >
                    ↓
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onRemoveText(text.id)}
                  >
                    <X className="w-6 h-6 rounded-full drop-shadow-[2px_2px_0px_#000]" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div
            className="w-80 max-w-full p-6 rounded-2xl border-2 border-black drop-shadow-[2px_2px_0px_#000] text-white"
            style={{
              backgroundColor: '#C92D2E',
              backgroundImage: 'url("/images/1.svg")',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          >
            <h3 className="text-lg font-bold mb-4 text-center">Add Text</h3>

            <input
              type="text"
              className="border border-black bg-white/90 text-black placeholder-gray-500 p-2 w-full drop-shadow-[2px_2px_0px_#000] mb-4 rounded-lg outline-none focus:ring-0 focus:outline-none"
              placeholder="Enter your text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />

            <div className="flex items-center mb-4">
              <label className="w-24 font-medium">Text Color:</label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-10 h-10 p-1 border-2 border-black rounded-full drop-shadow-[2px_2px_0px_#000]"
              />
            </div>

            <div className="flex items-center mb-4">
              <label className="w-24 font-medium">Font:</label>
              <select
                value={selectedFont}
                onChange={(e) => setSelectedFont(e.target.value)}
                className="border border-black p-2 rounded-lg bg-white text-black"
              >
                {fontOptions.map((font) => (
                  <option key={font} value={font} style={{ fontFamily: font }}>
                    {font}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                checked={isBold}
                onChange={(e) => setIsBold(e.target.checked)}
                id="bold"
                className="mr-2 accent-black"
              />
              <label htmlFor="bold" className="font-medium">
                Bold
              </label>
            </div>

            <div className="flex justify-between gap-2">
              <button
                onClick={handleAddText}
                className="flex-1 bg-white text-black font-bold py-2 rounded-2xl border-2 border-black drop-shadow-[2px_2px_0px_#000] hover:bg-gray-200"
              >
                Add
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-white text-black font-bold py-2 rounded-2xl border-2 border-black drop-shadow-[2px_2px_0px_#000] hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
