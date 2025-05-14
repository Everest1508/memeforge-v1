export interface Sticker {
  id: string;
  url: string;
  name: string;
  categoryId: string;
  instanceId: string;
  left?: number;
  top?: number;
}

export interface StickerCategory {
  id: string;
  name: string;
  icon?: string;
  slug: string; 
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  links: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  date?: string;
  completed?: boolean;
  icon?: string;
  imageUrl?: string;
  image?: string;
  images?: MilestoneImage[];
}

export interface MilestoneImage {
  id: string;
  image: string;
  caption: string;
}

export interface Template {
  id: string;
  name: string;
  url: string;
  category: string;
}


export interface TextElement {
  id: string;
  text: string;
  left?: number;
  top?: number;
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  borderColor?: string; 
  fontWeight?: string;
}


interface SubmissionData {
  vercel_blob_url: string;
  email: string;
  x_post_url: string;
}