import { StickerCategory, Sticker, Template, TeamMember, Milestone } from '@/types';

// Fetch all categories from your API
export const fetchStickerCategories = async (): Promise<StickerCategory[]> => {
  const res = await fetch('http://103.75.198.5/api/categories/');
  if (!res.ok) throw new Error('Failed to fetch categories');
  const data = await res.json();
  return data.map((item: any) => ({
    id: item.id.toString(),
    name: item.name,
    icon: '🖼️', // Default icon, update if API supports this
    slug: item.slug,
  }));
};

// Fetch all stickers for a given category slug
export const fetchStickersByCategorySlug = async (slug: string): Promise<Sticker[]> => {
  const res = await fetch(`http://103.75.198.5/api/categories/${slug}/images/`);
  if (!res.ok) throw new Error(`Failed to fetch stickers for ${slug}`);
  const data = await res.json();
  return data.map((item: any) => ({
    id: item.id.toString(),
    name: item.name,
    url: item.url || item.image || '', // fallback key names depending on API
    categoryId: slug,
  }));
};


// Fetch all meme templates from your API
export const fetchTemplates = async (): Promise<Template[]> => {
  const res = await fetch('http://103.75.198.5/api/templates/');
  if (!res.ok) throw new Error('Failed to fetch templates');
  const data = await res.json();

  return data.map((item: any) => ({
    id: item.id.toString(),
    name: item.name,
    url: item.url || item.image || '', // fallback for different image keys
    category: 'Uncategorized', // default value since no category exists
  }));
};


// --- The rest can stay static unless you're replacing them with real API too ---

// Static meme templates
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

// Static team members
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

// Static roadmap milestones
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
