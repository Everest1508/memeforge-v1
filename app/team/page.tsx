import { teamMembers } from '@/lib/data';
import TeamMemberCard from '@/components/team/TeamMemberCard';

export default function TeamPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Meet the talented individuals behind MemeForge who are building the future of meme creation on the blockchain.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
      
      <div className="mt-20 bg-red-50 rounded-xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Join Our Team</h2>
          <p className="text-gray-600">
            We're always looking for talented individuals to join our mission.
          </p>
        </div>
        
        <div className="flex justify-center">
          <a 
            href="#" 
            className="px-8 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors"
          >
            View Open Positions
          </a>
        </div>
      </div>
    </div>
  );
}