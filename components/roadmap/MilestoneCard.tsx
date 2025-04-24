import { Milestone } from '@/types';
import { CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MilestoneCardProps {
  milestone: Milestone;
  isFirst?: boolean;
  isLast?: boolean;
}

const MilestoneCard = ({ milestone, isFirst, isLast }: MilestoneCardProps) => {
  return (
    <div className="flex relative">
      {/* Timeline connector */}
      {!isFirst && (
        <div className="absolute top-0 left-6 h-1/2 w-0.5 bg-red-200"></div>
      )}
      {!isLast && (
        <div className="absolute top-1/2 left-6 h-1/2 w-0.5 bg-red-200"></div>
      )}
      
      {/* Status icon */}
      <div className={cn(
        "relative z-10 h-12 w-12 rounded-full flex items-center justify-center",
        milestone.completed ? "bg-green-100" : "bg-red-100"
      )}>
        {milestone.completed ? (
          <CheckCircle className="h-6 w-6 text-green-600" />
        ) : (
          <Clock className="h-6 w-6 text-red-600" />
        )}
      </div>
      
      {/* Content */}
      <div className="ml-4 pb-10">
        <div className={cn(
          "bg-white rounded-lg shadow-sm p-6 border-l-4",
          milestone.completed ? "border-green-500" : "border-red-500"
        )}>
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">{milestone.icon}</span>
            <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
          </div>
          
          <p className="text-gray-600 mb-3">{milestone.description}</p>
          
          <div className={cn(
            "inline-block px-3 py-1 rounded-full text-sm font-medium",
            milestone.completed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          )}>
            {milestone.date}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneCard;