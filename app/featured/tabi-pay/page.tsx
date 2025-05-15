"use client";

import Step1Intro from '@/components/featured/tabi-pay/StepCard1';
import Step2Questions from '@/components/featured/tabi-pay/StepCard2';
import Step3UserInfo from '@/components/featured/tabi-pay/StepCard3';
import Step4Progress from '@/components/featured/tabi-pay/StepCard4';
import Step5Card from '@/components/featured/tabi-pay/StepCard5';
import React, { useState } from 'react';

const TabiPayStepper: React.FC = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [userInfo, setUserInfo] = useState({
    name: '',
    username: '',
  });

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

  const handleShare = () => {
    console.log('Sharing...');
  };

  const handleDownload = () => {
    console.log('Downloading...');
  };

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
        {step === 4 && <Step4Progress progress={progress} onNext={handleNextStep} />}
        {step === 5 && <Step5Card onShare={handleShare} onDownload={handleDownload} userInfo={userInfo}/>}
      </div>
      <img
      src="/images/featured/4.png" // Replace with your actual image path
      alt="Tabi Character"
      className="fixed bottom-0 right-0 w-52 sm:w-32 md:w-96 opacity-90 pointer-events-none select-none"
    />
    </div>
  );
};

export default TabiPayStepper;
