'use client';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CallToActionSection from '@/components/home/CallToActionSection';
import Head from 'next/head';
import { useRef, useState, useEffect } from 'react';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [showEnter, setShowEnter] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Force video loading
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  const handleEnterClick = () => {
    if (isVideoLoading) return;
    setShowEnter(false);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleVideoLoaded = () => {
    console.log('Video loaded');
    setIsVideoLoading(false);
  };

  const handleVideoError = () => {
    console.error('Video loading error');
    setIsVideoLoading(false);
  };

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setShowIntro(false);
  };

  const handleVideoEnd = () => {
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen">
      <Head>
        <title>Forge Memes | Create Blockchain Backed Memes</title>
        <meta
          name="description"
          content="Create and share blockchain-powered memes easily with our meme creator platform. Join our creative community today!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {showIntro ? (
        <div className="fixed top-0 left-0 z-50 w-full h-screen overflow-hidden">
          {/* Enter screen with loader */}
          {showEnter && (
            <div
              className={`absolute inset-0 bg-black flex flex-col items-center justify-center z-20 ${
                isVideoLoading ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              onClick={handleEnterClick}
            >
              <img
                src="/iconx/loader.png"
                alt="Enter"
                className="w-32 h-32 object-contain z-10"
                style={{ animation: 'spin 5s linear infinite' }}
              />
              <img
                src="/iconx/parrot.png"
                alt="Middle Image"
                className="w-32 h-32 object-contain -mt-28 z-20"
              />
              <p className="mt-4 text-white text-xl font-semibold">
                {isVideoLoading ? 'Loading...' : 'Click to Enter'}
              </p>
            </div>
          )}

          {/* Skip button (shown only after Enter is clicked) */}
          {!showEnter && (
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 z-30 bg-black/60 text-white px-4 py-2 rounded hover:bg-black/80 transition"
            >
              Skip
            </button>
          )}

          {/* Background video */}
          <video
            ref={videoRef}
            autoPlay={false}
            muted
            playsInline
            onEnded={handleVideoEnd}
            onLoadedData={handleVideoLoaded}
            onCanPlay={handleVideoLoaded}
            onError={handleVideoError}
            className="w-full h-full object-cover md:bg-center bg-[left_50%_top]"
          >
            <source src="/intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <div
            className="bg-cover md:bg-center bg-[left_center] min-h-screen flex items-center justify-center w-full"
            style={{ backgroundImage: "url('/images/background/landing-page.PNG')" }}
          >
            <img
              src="/images/background/landing-page.PNG"
              alt="Create Memes on Blockchain"
              className="hidden"
            />
            <HeroSection />
          </div>

          {/* Features Section */}
          <FeaturesSection />

          {/* Call to Action Section */}
          <CallToActionSection />
        </>
      )}
    </div>
  );
}
