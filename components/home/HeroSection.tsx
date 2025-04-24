import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AnimatedImage from './AnimatedImage';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-red-500 to-red-800 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex justify-center md:justify-end">
            <AnimatedImage
              src="/images/logo.png"
              alt="MemeForge Logo"
              width={300}
              height={300}
              className="w-40 md:w-64"
            />
          </div>
          
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Design your memes with us!
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Create, share, and own your memes on the blockchain
            </p>
            <Link href="/meme-creator">
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-100 hover:text-red-700 text-lg px-8 py-6 rounded-full font-semibold shadow-lg transform transition hover:scale-105">
                Get Started
              </Button>
            </Link>
          </div>
          
          <div className="flex justify-center md:justify-start">
            <AnimatedImage
              src="http://103.75.198.5/media/images/1738910099524.png"
              alt="MemeForge Artwork"
              width={300}
              height={300}
              className="w-40 md:w-64"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;