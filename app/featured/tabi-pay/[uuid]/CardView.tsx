'use client';

import { Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

type Props = {
  uuid: string;
};

export default function CardViewer({ uuid }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(true);

  const cardUrl = `https://memeforge.mooo.com/api/tabipay-cards/${uuid}.png`;
  const previewUrl = `https://www.memeforge.lol/featured/tabi-pay/${uuid}`;

  const handleDownload = async () => {
    try {
      const response = await fetch(cardUrl);
      if (!response.ok) throw new Error('Failed to fetch image.');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'tabi-pay-card.png';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download image.');
    }
  };

  const handleShare = () => {
    const tweetText = encodeURIComponent(
      `Check out my new Tabi Pay card! 💳🚀\nJoin me at https://memeforge.lol`
    );
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(previewUrl)}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <div className="max-w-xl mx-auto text-black space-y-6 bg-white p-6 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-bold text-center text-red-700">Your Tabi Pay Card</h2>

      {!imageLoaded ? (
        <div className="animate-pulse bg-black/10 h-48 rounded-lg flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-black/50" />
        </div>
      ) : null}

      <img
        src={cardUrl}
        alt="Your Tabi Pay Card"
        onLoad={() => {
          setIsLoading(false);
          setImageLoaded(true);
        }}
        className={`w-full rounded-lg border border-black/10 shadow-md ${!imageLoaded ? 'hidden' : ''}`}
      />

      <div className="flex gap-4 justify-center">
        <Button
          onClick={handleShare}
          className="flex items-center gap-2 bg-[#C92D2E] text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-red-600 transition"
        >
          <Share2 className="w-4 h-4" />
          Share on Twitter
        </Button>
        <Button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-gray-800 transition"
        >
          <Download className="w-4 h-4" />
          Download Card
        </Button>
      </div>
    </div>
  );
}
