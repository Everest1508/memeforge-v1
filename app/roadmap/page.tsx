import { roadmapMilestones } from '@/lib/data';
import MilestoneCard from '@/components/roadmap/MilestoneCard';

export default function RoadmapPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Roadmap</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover our journey and future plans for MemeForge as we revolutionize the world of meme creation on the blockchain.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {roadmapMilestones.map((milestone, index) => (
          <MilestoneCard 
            key={milestone.id} 
            milestone={milestone}
            isFirst={index === 0}
            isLast={index === roadmapMilestones.length - 1}
          />
        ))}
      </div>
      
      <div className="mt-20 bg-red-50 rounded-xl p-8 md:p-12 max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Help Shape Our Future</h2>
          <p className="text-gray-600 mb-8">
            We value our community's input in determining our future development priorities. Join our Discord community to participate in roadmap discussions and feature voting.
          </p>
          
          <a 
            href="#" 
            className="px-8 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors"
          >
            Join Our Community
          </a>
        </div>
      </div>
    </div>
  );
}