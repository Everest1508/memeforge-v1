// components/meme-creator/Layers.tsx
import { Sticker } from "@/types";

interface LayersProps {
  selectedStickers: Sticker[];
  onRemoveSticker: (stickerId: string) => void;
}

export default function Layers({ selectedStickers, onRemoveSticker }: LayersProps) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Layers</h2>
      {selectedStickers.length === 0 ? (
        <p className="text-gray-500">No layers added yet.</p>
      ) : (
        <ul className="space-y-2">
          {selectedStickers.map((sticker) => (
            <li
              key={sticker.id}
              className="flex justify-between items-center p-2 bg-gray-100 rounded-lg"
            >
              <span>{sticker.name}</span>
              <button
                className="text-red-500 hover:text-red-700 text-sm"
                onClick={() => onRemoveSticker(sticker.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
