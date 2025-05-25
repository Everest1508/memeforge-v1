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
  images?: any;
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
  backgroundColor?: string;
}


interface SubmissionData {
  vercel_blob_url: string;
  email: string;
  x_post_url: string;
}

export interface BrandElement {
  id: string;
  type: 'logo' | 'website';
  position: 'top-right' | 'bottom-right';
  visible: boolean;
  url?: string;
  text?: string;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  zIndex?: number;
}