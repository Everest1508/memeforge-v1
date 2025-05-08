import { useState } from 'react';
import { Sticker, TextElement } from '@/types';

type LayersProps = {
  selectedStickers: Sticker[];
  onRemoveSticker: (stickerId: string) => void;
  selectedTexts: TextElement[];
  onAddText: (text: TextElement) => void;
  onRemoveText: (textId: string) => void;
};

export default function Layers({
  selectedStickers,
  onRemoveSticker,
  selectedTexts,
  onAddText,
  onRemoveText,
}: LayersProps) {
  const [activeTab, setActiveTab] = useState<'layers' | 'text'>('layers');
  const [newText, setNewText] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [borderColor, setBorderColor] = useState('#ffffff');
  const [isBold, setIsBold] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAddText = () => {
    if (newText.trim() !== '') {
      onAddText({
        id: Date.now().toString(),
        text: newText,
        color: textColor,
        borderColor: borderColor,
        fontWeight: isBold ? 'bold' : 'normal',
      });
      setNewText('');
      setTextColor('#000000');
      setBorderColor('#ffffff');
      setIsBold(false);
      setShowModal(false); // Close modal
    }
  };

  return (
    <>
      <div className="max-h-60 overflow-y-auto bg-white border border-black p-4 rounded-2xl drop-shadow-[2px_2px_0px_#000]">
        {/* Tabs */}
        <div className="flex border-b mb-4 sticky top-0 bg-white z-10 border border-black drop-shadow-[2px_2px_0px_#000]">
          <button
            className={`px-4 py-2 font-bold ${activeTab === 'layers' ? 'text-black' : 'text-gray-500'}`}
            onClick={() => setActiveTab('layers')}
          >
            Layers
          </button>
          <button
            className={`px-4 py-2 font-bold ${activeTab === 'text' ? 'text-black' : 'text-gray-500'}`}
            onClick={() => setActiveTab('text')}
          >
            Text
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'layers' && (
          <div>
            {selectedStickers.length === 0 ? (
              <p className="text-gray-400">No stickers added.</p>
            ) : (
              selectedStickers.map((sticker, index) => (
                <div key={sticker.id} className="flex justify-between items-center mb-2 max-h-8 h-8 overflow-y-auto">
                  <span>Layer {index + 1}</span>
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
              className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600 mb-2"
            >
              Add New Text
            </button>

            {selectedTexts.length === 0 ? (
              <p className="text-gray-400">No text added.</p>
            ) : (
              selectedTexts.map(text => (
                <div key={text.id} className="flex justify-between items-center mb-2">
                  <span>{text.text}</span>
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

      {/* Modal OUTSIDE of main container */}
      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white p-6 rounded-2xl border-2 border-black drop-shadow-[2px_2px_0px_#000] w-80">
      <h3 className="text-lg font-bold mb-4 text-center">Add Text</h3>

      <input
        type="text"
        className="border-2 border-black p-2 w-full mb-4 rounded drop-shadow-[2px_2px_0px_#000]"
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

      {/* <div className="flex items-center mb-4">
        <label className="w-24 font-medium">Border Color:</label>
        <input
          type="color"
          value={borderColor}
          onChange={(e) => setBorderColor(e.target.value)}
          className="w-10 h-10 p-1 border-2 border-black rounded-full drop-shadow-[2px_2px_0px_#000]"
        />
      </div> */}

      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          checked={isBold}
          onChange={(e) => setIsBold(e.target.checked)}
          id="bold"
          className="mr-2 accent-black"
        />
        <label htmlFor="bold" className="font-medium">Bold</label>
      </div>

      <div className="flex justify-between gap-2">
        <button
          onClick={handleAddText}
          className="flex-1 bg-red-500 text-white font-bold py-2 rounded-2xl border-2 border-black drop-shadow-[2px_2px_0px_#000] hover:bg-red-600"
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
