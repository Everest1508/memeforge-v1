import { useState } from 'react';
import { Sticker, TextElement } from '@/types';
import { Canvas } from 'fabric';

type LayersProps = {
  selectedStickers: Sticker[];
  onRemoveSticker: (stickerId: string) => void;
  selectedTexts: TextElement[];
  onAddText: (text: TextElement) => void;
  onRemoveText: (textId: string) => void;
  onReorderStickers: (stickers: Sticker[]) => void;
  onReorderTexts: (texts: TextElement[]) => void;
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
  canvasRef,
}: LayersProps) {
  const [activeTab, setActiveTab] = useState<'layers' | 'text'>('layers');
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
    <>
      <div
        className="max-h-60 overflow-y-auto border border-black p-4 rounded-2xl drop-shadow-[2px_2px_0px_#000] text-black bg-white"
      >
        {/* Layer and Text tabs UI */}
        <div className="flex border-b mb-4 sticky top-0 z-10 border border-black drop-shadow-[2px_2px_0px_#000] bg-[#C92D2E]">
          <button
            className={`px-4 py-2 font-bold ${activeTab === 'layers' ? 'text-white' : 'text-gray-200'}`}
            onClick={() => setActiveTab('layers')}
          >
            Layers
          </button>
          <button
            className={`px-4 py-2 font-bold ${activeTab === 'text' ? 'text-white' : 'text-gray-200'}`}
            onClick={() => setActiveTab('text')}
          >
            Text
          </button>
        </div>

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
                  <div className="flex items-center gap-2">
                    <img
                      src={sticker.url}
                      alt={sticker.name}
                      className="w-8 h-8 object-cover rounded"
                    />
                    <span>Layer {index + 1}</span>
                  </div>

                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onRemoveSticker(sticker.instanceId)}
                  >
                    <img src="/iconx/x-icon.jpg" alt="Remove" className="w-6 h-6 rounded-full drop-shadow-[2px_2px_0px_#000]" />
                  </button>
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

                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onRemoveText(text.id)}
                  >
                    <img src="/iconx/x-icon.jpg" alt="Remove" className="w-6 h-6 rounded-full drop-shadow-[2px_2px_0px_#000]" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div
            className="w-80 max-w-full p-6 rounded-2xl border-2 border-black drop-shadow-[2px_2px_0px_#000] text-white"
            style={{
              backgroundColor: '#C92D2E',
              backgroundImage: 'url("https://www.tabichain.com/images/new/bg/1.svg")',
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
    </>
  );
}
