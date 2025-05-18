"use client";

import React, { useEffect, useState } from 'react';
import Step1Intro from '@/components/featured/tabi-pay/StepCard1';
import Step2Questions from '@/components/featured/tabi-pay/StepCard2';
import Step3UserInfo from '@/components/featured/tabi-pay/StepCard3';
import Step4Progress from '@/components/featured/tabi-pay/StepCard4';
import Step5Card from '@/components/featured/tabi-pay/StepCard5';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { formatDistanceToNowStrict } from 'date-fns';

const TabiPayStepper: React.FC = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [userInfo, setUserInfo] = useState({ name: '', username: '' });
  const [overlayId, setOverlayId] = useState<string | null>(null);
  const [cardImageUrl, setCardImageUrl] = useState<string | null>(null);
  const [canCreate, setCanCreate] = useState<boolean | null>(null);
  const [cooldownMessage, setCooldownMessage] = useState<string | null>(null);

  const { data: session, status } = useSession();

  useEffect(() => {
    const checkCanCreate = async () => {
      if (status !== 'authenticated') {
        setCanCreate(true); // allow flow for guests or unauthenticated users
        return; 
      }

      try {
        const res = await axios.post('https://memeforge.mooo.com/api/tabipay/check/', {}, {
          headers: {
            Authorization: `Cream ${session?.user?.encrypted}`, 
          },
        });

        if (res.data.can_create) {
          setCanCreate(true);
        } else {
          setCanCreate(false);
          const createdAt = new Date(res.data.created_at);
          const expiryDate = new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000);
          const timeRemaining = formatDistanceToNowStrict(expiryDate, { addSuffix: true });
          setCooldownMessage(`You can create a new card ${timeRemaining}.`);
        }
      } catch (err) {
        console.error('Error checking card creation status', err);
        setCanCreate(true); // fallback: allow
      }
    };

    checkCanCreate();
  }, [session, status]);

  const handleUserInfoChange = (info: { name: string; username: string }) => {
    setUserInfo(info);
  };

  const handleNextStep = () => {
    if (step < 5) setStep(step + 1);
    if (step < 4) setProgress(progress + 25);
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep(step - 1);
    if (step > 1) setProgress(progress - 25);
  };

  const handleShare = () => console.log('Sharing...');
  const handleDownload = () => console.log('Downloading...');

  if (canCreate === false && step < 4) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center px-6 py-28 text-white"
        style={{
          backgroundColor: '#C92D2E',
          backgroundImage: 'url("/images/1.svg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl max-w-md p-8 text-center text-white animate-fade-in">
          <h2 className="text-3xl font-bold mb-4">⏳ Hold up!</h2>
          <p className="text-lg mb-4 font-medium">
            You’ve already created a TabiPay card recently.
          </p>
          <p className="text-sm text-white/80 mb-6">{cooldownMessage}</p>
          <button
            onClick={() => setStep(5)}
            className="px-6 py-2 rounded-full bg-white text-[#C92D2E] font-semibold shadow hover:bg-white/90 transition"
          >
            View your existing card
          </button>
        </div>

        <img
          src="/images/featured/4.png"
          alt="Tabi Character"
          className="fixed bottom-0 right-0 w-52 sm:w-32 md:w-96 opacity-90 pointer-events-none select-none"
        />
      </div>
    );
  }


  return (
    <div
      className="min-h-screen w-full px-6 py-28 flex items-center justify-center text-black"
      style={{
        backgroundColor: '#C92D2E',
        backgroundImage: 'url("/images/1.svg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="w-full max-w-3xl text-white">
        {step === 1 && <Step1Intro onNext={handleNextStep} />}
        {step === 2 && <Step2Questions onNext={handleNextStep} onPrevious={handlePreviousStep} />}
        {step === 3 && (
          <Step3UserInfo
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
            handleUserInfoChange={handleUserInfoChange}
          />
        )}
        {step === 4 && (
          <Step4Progress
            progress={progress}
            onNext={handleNextStep}
            userInfo={userInfo}
            setOverlayId={setOverlayId}
            setCardImageUrl={setCardImageUrl}
          />
        )}
        {step === 5 && (
          <Step5Card
            onShare={handleShare}
            onDownload={handleDownload}
            userInfo={userInfo}
            overlayId={overlayId}
            cardImageUrl={cardImageUrl}
          />
        )}
      </div>

      <img
        src="/images/featured/4.png"
        alt="Tabi Character"
        className="fixed bottom-0 right-0 w-52 sm:w-32 md:w-96 opacity-90 pointer-events-none select-none"
      />
    </div>
  );
};

export default TabiPayStepper;
