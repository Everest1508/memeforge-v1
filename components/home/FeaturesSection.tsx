import { Layers, Share2, Download, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Layers className="h-10 w-10 text-red-500" />,
    title: 'Advanced Meme Creation',
    description: 'Create unique memes with our easy-to-use editor and vast sticker collection',
  },
  {
    icon: <Sparkles className="h-10 w-10 text-red-500" />,
    title: 'Blockchain Powered',
    description: 'Own your creations with blockchain technology ensuring authenticity and ownership',
  },
  {
    icon: <Share2 className="h-10 w-10 text-red-500" />,
    title: 'Instant Sharing',
    description: 'Share your memes across social platforms with one click',
  },
  {
    icon: <Download className="h-10 w-10 text-red-500" />,
    title: 'Easy Download',
    description: 'Download your memes in multiple formats for any use case',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose MemeForge?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The ultimate platform for creating, owning, and sharing your meme masterpieces
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;