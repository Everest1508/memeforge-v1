import React from 'react';
import { Info } from 'lucide-react';

interface Step1IntroProps {
  onNext: () => void;
}

const Step1Intro: React.FC<Step1IntroProps> = ({ onNext }) => {
  return (
    <div className="bg-white p-8 rounded-lg drop-shadow-[4px_4px_0px_#000] border border-gray-200">
      <h1 className="text-3xl text-[#C92D2E]  mb-6">Welcome to Tabi Pay (Just for Fun)</h1>

      <div className="flex items-start bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md mb-6">
        <Info className="w-5 h-5 text-yellow-600 mt-1 mr-3" />
        <div className="text-sm text-gray-800 text-left space-y-2">
          <p>
            This is a **mock experience** for entertainment purposes only. The card you create is not real and
            does not function as a financial product.
          </p>
          <p>
            Tabi Pay is a concept by <a href="https://www.tabichain.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">TabiChain</a> and may not be publicly available yet.
            For official announcements, visit the{' '}
            <a href="https://www.tabichain.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">official website</a>{' '}
            or follow the official accounts on{' '}
            <a href="https://twitter.com/tabichain" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Twitter</a> and other platforms.
          </p>
        </div>
      </div>

      <p className="text-base text-gray-700 mb-6">
        We're giving you a taste of what it could feel like to hold a meme-powered Tabi Pay card with your name on it.
      </p>

      <button
        onClick={onNext}
        className="bg-[#C92D2E] text-white px-6 py-2 rounded-md hover:bg-red-700 transition drop-shadow-[2px_2px_0px_#000]"
      >
        Continue
      </button>
    </div>
  );
};

export default Step1Intro;
