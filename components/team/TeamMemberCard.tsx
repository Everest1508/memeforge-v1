import Image from 'next/image';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { TeamMember } from '@/types';
import { cn } from '@/lib/utils';

interface TeamMemberCardProps {
  member: TeamMember;
  className?: string;
}

const TeamMemberCard = ({ member, className }: TeamMemberCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300",
      className
    )}>
      <div className="relative h-64 w-full">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
        <p className="text-red-600 font-medium">{member.role}</p>
        
        <p className="text-gray-600 mt-4 mb-4">{member.bio}</p>
        
        <div className="flex space-x-4">
          {member.links.twitter && (
            <a
              href={member.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-red-600 transition-colors"
              aria-label={`${member.name}'s Twitter`}
            >
              <Twitter className="h-5 w-5" />
            </a>
          )}
          
          {member.links.linkedin && (
            <a
              href={member.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-red-600 transition-colors"
              aria-label={`${member.name}'s LinkedIn`}
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          
          {member.links.github && (
            <a
              href={member.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-red-600 transition-colors"
              aria-label={`${member.name}'s GitHub`}
            >
              <Github className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;