import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      
      {/* Call to Action Section */}
      <section className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Forge Your Memes?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community and start creating blockchain-backed memes today.
          </p>
          <a 
            href="/meme-creator" 
            className="inline-block bg-white text-red-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-red-100 transition-colors"
          >
            Start Creating
          </a>
        </div>
      </section>
    </div>
  );
}