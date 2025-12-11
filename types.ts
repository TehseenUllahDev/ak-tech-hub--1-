export interface Project {
  id: string;
  name: string;
  role: string;
  description: string;
  status: 'In Progress' | 'Completed' | 'Maintenance';
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  skills: string[];
  joinDate: string;
  leaveDate?: string;
  hasLaptop: boolean;
  gender: 'Male' | 'Female' | 'Other';
  projects: Project[];
  avatarUrl?: string;
  isTopTalent?: boolean;
}

export interface LeadershipProfile {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
}