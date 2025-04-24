import { StickerCategory, Sticker, TeamMember, Milestone, Template } from '@/types';

// Mock data for sticker categories
export const stickerCategories: StickerCategory[] = [
  { id: '1', name: 'Faces', icon: '😂' },
  { id: '2', name: 'Animals', icon: '🐱' },
  { id: '3', name: 'Objects', icon: '🚀' },
  { id: '4', name: 'Text', icon: '📝' },
  { id: '5', name: 'Blockchain', icon: '⛓️' },
];

// Mock data for stickers
export const stickers: Sticker[] = [
  { id: '1', name: 'Laughing Face', url: 'https://images.pexels.com/photos/207983/pexels-photo-207983.jpeg', categoryId: '1' },
  { id: '2', name: 'Thinking Face', url: 'https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg', categoryId: '1' },
  { id: '3', name: 'Cool Face', url: 'https://images.pexels.com/photos/1310474/pexels-photo-1310474.jpeg', categoryId: '1' },
  { id: '4', name: 'Cat', url: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg', categoryId: '2' },
  { id: '5', name: 'Dog', url: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg', categoryId: '2' },
  { id: '6', name: 'Rocket', url: 'https://images.pexels.com/photos/73871/rocket-launch-rocket-take-off-nasa-73871.jpeg', categoryId: '3' },
  { id: '7', name: 'Computer', url: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg', categoryId: '3' },
  { id: '8', name: 'LOL', url: 'https://images.pexels.com/photos/3807639/pexels-photo-3807639.jpeg', categoryId: '4' },
  { id: '9', name: 'OMG', url: 'https://images.pexels.com/photos/3174349/pexels-photo-3174349.jpeg', categoryId: '4' },
  { id: '10', name: 'Blockchain', url: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg', categoryId: '5' },
  { id: '11', name: 'Crypto', url: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg', categoryId: '5' },
  { id: '12', name: 'Crypto', url: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg', categoryId: '5' },
  { id: '13', name: 'Crypto', url: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg', categoryId: '5' },
  { id: '14', name: 'Crypto', url: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg', categoryId: '5' },
  { id: '15', name: 'Crypto', url: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg', categoryId: '5' },
  { id: '16', name: 'Crypto', url: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg', categoryId: '5' },
  { id: '17', name: 'Crypto', url: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg', categoryId: '5' },
  { id: '18', name: 'Crypto', url: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg', categoryId: '5' },
  { id: '19', name: 'Crypto', url: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg', categoryId: '5' },
];

// Mock data for meme templates
export const templates: Template[] = [
  {
    id: '1',
    name: 'Drake Hotline Bling',
    url: 'https://images.pexels.com/photos/3812743/pexels-photo-3812743.jpeg',
    category: 'Popular',
  },
  {
    id: '2',
    name: 'Distracted Boyfriend',
    url: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg',
    category: 'Popular',
  },
  {
    id: '3',
    name: 'Two Buttons',
    url: 'https://images.pexels.com/photos/3756879/pexels-photo-3756879.jpeg',
    category: 'Classic',
  },
  {
    id: '4',
    name: 'Expanding Brain',
    url: 'https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg',
    category: 'Classic',
  },
  {
    id: '5',
    name: 'Doge',
    url: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg',
    category: 'Classic',
  },
  {
    id: '6',
    name: 'Success Kid',
    url: 'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg',
    category: 'Classic',
  },
];

// Mock data for team members
export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    role: 'Founder & CEO',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    bio: 'Blockchain enthusiast and meme connoisseur with 10+ years in tech',
    links: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
  },
  {
    id: '2',
    name: 'Samantha Lee',
    role: 'CTO',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    bio: 'Full-stack developer specializing in blockchain technologies',
    links: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
  },
  {
    id: '3',
    name: 'Marcus Chen',
    role: 'Lead Designer',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    bio: 'Creative director with a passion for meme culture and digital art',
    links: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    role: 'Marketing Director',
    image: 'https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg',
    bio: 'Digital marketing expert with a focus on community building',
    links: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
];

// Mock data for roadmap
export const roadmapMilestones: Milestone[] = [
  {
    id: '1',
    title: 'Platform Launch',
    description: 'Initial launch of MemeForge with basic meme creation capabilities',
    date: '2024 Q2',
    completed: true,
    icon: '🚀',
  },
  {
    id: '2',
    title: 'Blockchain Integration',
    description: 'Implementation of blockchain technology for meme ownership and verification',
    date: '2024 Q3',
    completed: true,
    icon: '⛓️',
  },
  {
    id: '3',
    title: 'Marketplace',
    description: 'Launch of the MemeForge marketplace for buying and selling memes',
    date: '2024 Q4',
    completed: false,
    icon: '🛒',
  },
  {
    id: '4',
    title: 'Mobile App',
    description: 'Release of MemeForge mobile applications for iOS and Android',
    date: '2025 Q1',
    completed: false,
    icon: '📱',
  },
  {
    id: '5',
    title: 'DAO Governance',
    description: 'Introduction of decentralized governance for the MemeForge platform',
    date: '2025 Q2',
    completed: false,
    icon: '🏛️',
  },
  {
    id: '6',
    title: 'Global Expansion',
    description: 'Expansion to international markets with localized content and features',
    date: '2025 Q4',
    completed: false,
    icon: '🌎',
  },
];

// Function to simulate fetching stickers by category (to mimic API call)
export const fetchStickersByCategory = (categoryId: string): Promise<Sticker[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredStickers = stickers.filter(
        (sticker) => sticker.categoryId === categoryId
      );
      resolve(filteredStickers);
    }, 500); // Simulate network delay
  });
};

// Function to simulate fetching all categories (to mimic API call)
export const fetchStickerCategories = (): Promise<StickerCategory[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(stickerCategories);
    }, 300); // Simulate network delay
  });
};

// Function to simulate fetching templates (to mimic API call)
export const fetchTemplates = (): Promise<Template[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(templates);
    }, 300); // Simulate network delay
  });
};