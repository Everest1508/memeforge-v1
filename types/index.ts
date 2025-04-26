export interface Sticker {
  id: string;
  url: string;
  name: string;
  categoryId: string;
}

export interface StickerCategory {
  id: string;
  name: string;
  icon?: string; // Ensure consistency across declarations
  slug: string;     // <-- ADD THIS LINE
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
  date: string;
  completed: boolean;
  icon?: string;
}

export interface Template {
  id: string;
  name: string;
  url: string;
  category: string;
}

