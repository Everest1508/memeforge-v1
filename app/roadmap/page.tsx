"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';
import { XIcon } from 'lucide-react';
import { FaClock } from 'react-icons/fa';
import { Milestone, MilestoneImage } from '@/types';

export default function RoadmapPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState<Milestone | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  const openModal = (milestone: Milestone) => {
    setCurrentMilestone(milestone);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentMilestone(null);
  };

  useEffect(() => {
    fetch('https://memeforge.mooo.com/api/roadmap')
      .then(res => res.json())
      .then(data => {
        setMilestones(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-12 md:py-16"
    style={{
      backgroundColor: '#C92D2E',
      backgroundImage: 'url("/images/1.svg")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}
    >
      <div className="text-center mb-8 sm:mb-12 md:mb-16 mt-8 sm:mt-12 md:mt-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-[2px_2px_0px_#000] mb-3 sm:mb-4">Our Roadmap</h1>
        <p className="text-lg sm:text-xl text-white max-w-3xl mx-auto px-4">
          Discover our journey and future plans for MemeForge as we revolutionize the world of meme creation on the blockchain.
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-1 bg-gray-300 z-0" />

          <div className="flex flex-col gap-20 relative z-10">
          {loading
  ? Array.from({ length: 4 }).map((_, index) => {
      const isLeft = index % 2 === 0;
      return (
        <div
          key={index}
          className={`
            flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8
            ${isLeft ? 'md:justify-start' : 'md:justify-end'}
          `}
        >
          {isLeft && (
            <div className="hidden md:flex justify-end w-1/2 pr-6">
              <MilestoneCardSkeleton />
            </div>
          )}

          <div className="flex items-center justify-center w-full md:w-12 h-12 relative z-20">
            <div className="w-10 h-10 bg-gray-400 rounded-full" />
          </div>

          {!isLeft && (
            <div className="hidden md:flex justify-start w-1/2 pl-6">
              <MilestoneCardSkeleton />
            </div>
          )}

          <div className="md:hidden w-full">
            <MilestoneCardSkeleton />
          </div>
        </div>
      );
    })
  : milestones.map((milestone, index) => {
      const isLeft = index % 2 === 0;

      return (
        <div
          key={milestone.id}
          className={`
            flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8
            ${isLeft ? 'md:justify-start' : 'md:justify-end'}
          `}
          onClick={() => openModal(milestone)}
        >
          {isLeft && (
            <div className="hidden md:flex justify-end w-1/2 pr-6">
              <MilestoneCard milestone={milestone} />
            </div>
          )}

          <div className="flex items-center justify-center w-full md:w-12 h-12 relative z-20">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white drop-shadow-[2px_2px_0px_#000]">
              <FaClock />
            </div>
          </div>

          {!isLeft && (
            <div className="hidden md:flex justify-start w-1/2 pl-6">
              <MilestoneCard milestone={milestone} />
            </div>
          )}

          <div className="md:hidden w-full">
            <MilestoneCard milestone={milestone} />
          </div>
        </div>
      );
    })}

          </div>
        </div>
      </div>

      {currentMilestone && (
        <Dialog open={isOpen} onClose={closeModal} className="fixed inset-0 z-50">
          <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-60 px-4 text-white">
            <div className="relative rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              style={{
                backgroundColor: '#C92D2E',
                backgroundImage: 'url("/images/1.svg")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:text-gray-200"
              >
                <XIcon className="h-6 w-6" />
              </button>

              <h2 className="text-2xl mb-4 font-semibold drop-shadow-[2px_2px_0px_#000]">{currentMilestone.title}</h2>

              {/* State for selected image */}
              <SelectedImageGallery images={currentMilestone.images || []} />
            </div>
          </div>
        </Dialog>
      )}

      <div className="mt-20 flex justify-center">
        <Image
          src="/images/group.png"
          alt="MemeForge Characters"
          width={800}
          height={600}
          className="object-contain"
        />
      </div>
    </div>
  );
}

function SelectedImageGallery({ images }: { images: MilestoneImage[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];

  return (
    <div className="flex flex-col items-center drop-shadow-[2px_2px_0px_#000]">
      <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden mb-4">
        <Image
          src={selectedImage.image}
          alt={`Selected image`}
          width={800}
          height={600}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 cursor-pointer ${
              idx === selectedIndex ? 'border-red-500' : 'border-transparent'
            }`}
            onClick={() => setSelectedIndex(idx)}
          >
            <Image
              src={img.image}
              alt={`Thumbnail ${idx + 1}`}
              width={80}
              height={80}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function MilestoneCard({ milestone }: { milestone: Milestone }) {
  return (
    <div className="bg-white drop-shadow-[4px_4px_0px_#000] rounded-lg overflow-hidden cursor-pointer w-full max-w-sm">
      <Image
        src={(milestone.image || milestone.imageUrl) as string}
        alt={milestone.title}
        width={400}
        height={300}
        className="w-full h-48 object-contain rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-lg text-gray-800">{milestone.title}</h3>
        <p className="text-sm text-gray-600">{milestone.description}</p>
      </div>
    </div>
  );
}


function MilestoneCardSkeleton() {
  return (
    <div className="bg-white drop-shadow-[4px_4px_0px_#000] rounded-lg overflow-hidden w-full max-w-sm animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded-t-lg" />
      <div className="p-4 space-y-2">
        <div className="h-5 bg-gray-300 rounded w-3/4" />
        <div className="h-3 bg-gray-300 rounded w-full" />
        <div className="h-3 bg-gray-300 rounded w-5/6" />
      </div>
    </div>
  );
}
