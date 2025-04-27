import { useState } from "react";
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

  const handleAddText = () => {
    if (newText.trim() !== '') {
      onAddText({
        id: Date.now().toString(),
        text: newText,
      });
      setNewText('');
    }
  };

  return (
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
        <div className=''>
          {selectedStickers.length === 0 ? (
            <p className="text-gray-400">No stickers added.</p>
          ) : (
            selectedStickers.map(sticker => (
              <div key={sticker.id} className="flex justify-between items-center mb-2 max-h-8 h-8 overflow-y-auto">
                <span>{sticker.name}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => onRemoveSticker(sticker.id)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'text' && (
        <div>
          <div className="flex mb-2">
            <input
              type="text"
              className="flex-1 border p-2 rounded-l"
              placeholder="Enter text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
            <button
              onClick={handleAddText}
              className="bg-red-500 text-white px-4 rounded-r hover:bg-red-600"
            >
              Add
            </button>
          </div>
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
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
