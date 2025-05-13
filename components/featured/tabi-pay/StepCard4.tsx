'use client';

import React, { useEffect, useState } from 'react';
import { Info, Clock, CreditCard } from 'lucide-react';

interface Step4ProgressProps {
  progress: number;
  onNext: () => void;
}

const Step4Progress: React.FC<Step4ProgressProps> = ({ progress, onNext }) => {
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="text-black max-w-xl mx-auto p-6 rounded-2xl bg-white shadow-xl space-y-6 border border-gray-200 md:mb-0 mb-28">
      <h2 className="text-3xl text-red-700  text-center ">
        Almost There!
      </h2>

      {/* Progress bar */}
      <progress value={progress} max={100} className="w-full h-2 rounded bg-gray-300" />

      {/* Disclaimer */}
      <div className="flex items-start bg-yellow-100 text-yellow-900 p-4 rounded-md shadow-inner gap-3 text-sm">
        <Info className="w-5 h-5 mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold">Disclaimer:</p>
          <p>
            This is a fun demo experience. Real Tabi Pay distributions happen on the official platform only.
          </p>
        </div>
      </div>

      {/* Countdown Notice */}
      <div className="flex items-center gap-2 text-sm bg-black bg-opacity-10 text-black p-3 rounded-md">
        <Clock className="w-5 h-5" />
        <span>
          Please wait <strong>{countdown > 0 ? countdown : '0'} seconds</strong> before claiming your card.
        </span>
      </div>

      {/* Info */}
      <div className="text-sm leading-relaxed text-gray-800">
        We have <strong>20 unique Tabi Pay Cards</strong> — you can claim <em>1 each week</em>.<br />
        Log in to unlock future benefits like leaderboard access and bonus rewards.
      </div>

{/* Demo card */}
<div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-xl p-4 shadow-md">
  <div className="flex items-center gap-2 mb-2 text-white font-medium">
    <CreditCard className="w-4 h-4" />
    Demo Tabi Pay Card
  </div>

  {/* Card Image */}
  <div className="w-full bg-white bg-opacity-10 rounded-lg flex items-center justify-center border border-white border-dashed overflow-hidden">
    <img
      src="/images/featured/demo-tabipay.png" // 🔁 Update this path as needed
      alt="TabiCard #07"
      className="h-full object-contain"
    />
  </div>

  <p className="mt-2 text-xs text-white text-center opacity-80">
    Different card each week. Stay tuned.
  </p>
</div>


      {/* Claim Button */}
      <button
        onClick={onNext}
        disabled={countdown > 0}
        className={`w-full py-3 px-6 text-lg rounded-md font-semibold transition ${
          countdown > 0
            ? 'bg-gray-300 cursor-not-allowed text-gray-600'
            : 'bg-red-700 text-white hover:bg-red-600'
        } drop-shadow-[2px_2px_0px_#000]`}
      >
        {countdown > 0 ? `Claim in ${countdown}s` : 'Claim Your Tabi Pay Card'}
      </button>
    </div>
  );
};

export default Step4Progress;
