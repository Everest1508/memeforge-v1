"use client";
import { useState } from 'react';
import { roadmapMilestones } from '@/lib/data';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';
import { XIcon } from 'lucide-react';
import { FaClock } from 'react-icons/fa';
import { Milestone } from '@/types';

export default function RoadmapPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState<Milestone | null>(null);

  const openModal = (milestone: Milestone) => {
    setCurrentMilestone(milestone);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentMilestone(null);
  };

  return (
    <div className="mx-auto px-4 py-16"
    style={{
      backgroundColor: '#C92D2E',
      backgroundImage: 'url("https://www.tabichain.com/images/new/bg/1.svg")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}
    >
      <div className="text-center mb-16 mt-16">
        <h1 className="text-4xl font-bold text-white drop-shadow-[2px_2px_0px_#000] mb-4">Our Roadmap</h1>
        <p className="text-xl text-white max-w-3xl mx-auto">
          Discover our journey and future plans for MemeForge as we revolutionize the world of meme creation on the blockchain.
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white/20"></div>
          
          {/* Milestones */}
          <div className="space-y-12">
            {roadmapMilestones.map((milestone, index) => (
              <div key={milestone.id} className="relative">
                {/* Connecting circle */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-500 rounded-full border-4 border-white z-10"></div>
                
                {/* Content */}
                <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 px-8">
                    <div className="bg-white drop-shadow-[4px_4px_0px_#000] rounded-lg overflow-hidden cursor-pointer" onClick={() => openModal(milestone)}>
                      <Image
                        src={milestone.imageUrl}
                        alt={milestone.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg text-gray-800">{milestone.title}</h3>
                        <p className="text-sm text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {currentMilestone && (
        <Dialog open={isOpen} onClose={closeModal} className="fixed inset-0 z-50">
          <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-60 px-4 text-white">
            <div className="relative rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              style={{
                backgroundColor: '#C92D2E',
                backgroundImage: 'url("https://www.tabichain.com/images/new/bg/1.svg")',
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
          src="https://www.tabichain.com/images/new/group.png"
          alt="MemeForge Characters"
          width={800}
          height={600}
          className="object-contain"
        />
      </div>
    </div>
  );
}

function SelectedImageGallery({ images }: { images: string[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];

  return (
    <div className="flex flex-col items-center drop-shadow-[2px_2px_0px_#000]">
      <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden mb-4">
        <Image
          src={selectedImage}
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
              src={img}
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
