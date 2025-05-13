'use client';

import React, { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { Loader2, Share2, Download, Trophy, LogIn } from 'lucide-react';

interface Step5CardProps {
  onShare?: () => void;
  onDownload?: () => void;
  userInfo: {
    name: string;
    username: string;
  };
}

const Step5Card: React.FC<Step5CardProps> = ({ userInfo }) => {
  const { data: session, status } = useSession();
  const [cardImageUrl, setCardImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const name = userInfo.name;
  const username = userInfo.username;
  const email = session?.user?.email || '';

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await fetch('/api/tabi-card', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, username, email }),
        });

        const data = await res.json();
        setCardImageUrl(data.cardImageUrl);
      } catch (err) {
        console.error('Failed to fetch card image:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [name, username, email]);

  const showLoginPrompt = status !== 'loading' && !session;

  const handleDownload = async () => {
    if (!cardImageUrl) return;
    const response = await fetch(cardImageUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'tabi-pay-card.png';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    // if (!cardImageUrl) return;

    const tweetText = encodeURIComponent(`Check out my new Tabi Pay card! 💳🚀\nJoin me at https://tabichain.com`);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(cardImageUrl || 'https://c2d9-103-178-126-236.ngrok-free.app/media/images/8.png')}`;

    window.open(tweetUrl, '_blank');
  };

  return (
    <div className="max-w-xl mx-auto text-black space-y-6 bg-white p-6 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-bold text-center text-red-700">Your Tabi Pay Card</h2>

      {loading ? (
        <div className="animate-pulse bg-black/10 h-48 rounded-lg flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-black/50" />
        </div>
      ) : cardImageUrl ? (
        <img
          src={cardImageUrl}
          alt="Your Tabi Pay Card"
          className="w-full rounded-lg border border-black/10 shadow-md"
        />
      ) : (
        <p className="text-sm text-black/60">Couldn’t load your card. Please try again later.</p>
      )}

      <div className="flex gap-4 justify-center">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 bg-[#C92D2E] text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-red-600 transition"
        >
          <Share2 className="w-4 h-4" />
          Share on Twitter
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-gray-800 transition"
        >
          <Download className="w-4 h-4" />
          Download Card
        </button>
      </div>

      {showLoginPrompt && (
        <div className="flex items-center justify-between text-sm text-black bg-red-100 border border-red-300 p-4 rounded-md mt-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span>
              <strong>Want leaderboard perks?</strong> Login to track weekly activity!
            </span>
          </div>
          <button
            onClick={() => signIn('twitter')}
            className="flex items-center gap-1 text-white bg-[#C92D2E] hover:bg-red-600 px-4 py-1.5 rounded-md shadow transition"
          >
            <LogIn className="w-4 h-4" />
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Step5Card;
