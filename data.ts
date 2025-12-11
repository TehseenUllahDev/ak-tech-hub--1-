import { Employee, ServiceItem, Testimonial, LeadershipProfile } from './types';

export const SERVICES: ServiceItem[] = [
  { id: '1', title: 'Web Development', description: 'Cutting-edge responsive websites using modern frameworks like React and Next.js. We ensure SEO optimization and high performance.', icon: 'globe' },
  { id: '2', title: 'Mobile Apps', description: 'Native and cross-platform mobile applications for iOS and Android using React Native and Flutter.', icon: 'smartphone' },
  { id: '3', title: 'Cloud Solutions', description: 'Scalable cloud infrastructure setup, migration, and management on AWS, Azure, and Google Cloud Platform.', icon: 'cloud' },
  { id: '4', title: 'AI & ML', description: 'Intelligent solutions integrated into business processes, including predictive analytics, chatbots, and automation.', icon: 'cpu' },
  { id: '5', title: 'Cybersecurity', description: 'Robust security audits, penetration testing, and protection strategies for your digital assets.', icon: 'shield' },
  { id: '6', title: 'IT Consulting', description: 'Strategic technology planning, digital transformation guidance, and IT infrastructure optimization.', icon: 'briefcase' },
];

export const LEADERSHIP = [
  {
    id: 'lead-1',
    name: 'Kashif Akhtar',
    role: 'CEO & Founder',
    bio: 'A visionary leader with over 15 years in software engineering. Driven by a passion to bridge the digital.',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop',
    socials: { linkedin: '#', twitter: '#' }
  },
  {
    id: 'lead-2',
    name: 'Tehseen Ullah',
    role: 'Co-Founder & CTO',
    bio: 'Former Tech Lead at Silicon Valley giants. Ensures our technical curriculum and solutions are world-class.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop',
    socials: { linkedin: '#', twitter: '#' }
  },
  {
    id: 'lead-3',
    name: 'Ghuffran Ahmed',
    role: 'Consultant',
    bio: 'Former consultant at Silicon Valley giants. Specializes in strategic planning and business development.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
    socials: { linkedin: '#', twitter: '#' }
  },
  {
    id: 'lead-4',
    name: 'Ahmad Saleem',
    role: 'Web Developer',
    bio: 'Former web developer at Silicon Valley giants. Expert in modern web technologies and frameworks.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop',
    socials: { linkedin: '#', twitter: '#' }
  }
];

export const ABOUT_CONTENT = {
  whoWeAre: "AK Tech Hub Pvt. Ltd. is a modern learning center and digital solutions company dedicated to providing high-quality IT education, software services, and professional skill development.",
  history: "Founded on the principles of innovation and excellence, AK Hub aims to equip students with both technical and practical skills that match global industry requirements. We bridge the gap between academic theory and industry reality.",
  values: [
    { title: "Innovation", desc: "Constantly pushing boundaries and exploring new technologies." },
    { title: "Integrity", desc: "Upholding the highest standards of ethics in everything we do." },
    { title: "Excellence", desc: "Delivering superior quality in education and development services." }
  ]
};

export const MOCK_EMPLOYEES: Employee[] = [
 
  {
    id: 'emp-001',
    name: 'Alice Johnson',
    email: 'alice@aktechhub.com',
    role: 'Senior Frontend Engineer',
    department: 'Engineering',
    skills: ['React', 'TypeScript', 'Tailwind', 'Three.js'],
    joinDate: '2021-03-15',
    hasLaptop: true,
    gender: 'Female',
    isTopTalent: true,
    projects: [
      { id: 'p1', name: 'E-Commerce Platform', role: 'Lead Dev', description: 'Built the core storefront.', status: 'Completed' },
      { id: 'p2', name: 'Dashboard UI', role: 'UX Designer', description: 'Revamped the admin analytics.', status: 'In Progress' }
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'emp-002',
    name: 'Bob Smith',
    email: 'bob@aktechhub.com',
    role: 'Backend Architect',
    department: 'Engineering',
    skills: ['Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    joinDate: '2020-06-01',
    hasLaptop: true,
    gender: 'Male',
    isTopTalent: true,
    projects: [
      { id: 'p3', name: 'API Gateway', role: 'Architect', description: 'Designed microservices communication.', status: 'Completed' }
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'emp-003',
    name: 'Carol White',
    email: 'carol@aktechhub.com',
    role: 'Product Manager',
    department: 'Product',
    skills: ['Agile', 'Jira', 'Roadmapping', 'User Research'],
    joinDate: '2022-01-10',
    hasLaptop: true,
    gender: 'Female',
    isTopTalent: false,
    projects: [],
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'emp-004',
    name: 'David Lee',
    email: 'david@aktechhub.com',
    role: 'DevOps Engineer',
    department: 'Operations',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
    joinDate: '2023-05-20',
    hasLaptop: false,
    gender: 'Male',
    isTopTalent: false,
    projects: [
      { id: 'p4', name: 'Migration to Cloud', role: 'Lead', description: 'Moved on-prem legacy to AWS.', status: 'Completed' }
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'emp-005',
    name: 'Eva Green',
    email: 'eva@aktechhub.com',
    role: 'UI/UX Designer',
    department: 'Design',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'HTML/CSS'],
    joinDate: '2021-11-15',
    hasLaptop: true,
    gender: 'Female',
    isTopTalent: true,
    projects: [
      { id: 'p5', name: 'Mobile App Redesign', role: 'Lead Designer', description: 'Modern look for client app.', status: 'In Progress' }
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
  },
   {
    id: 'emp-006',
    name: 'Alice Johnson',
    email: 'alice@aktechhub.com',
    role: 'Senior Frontend Engineer',
    department: 'Engineering',
    skills: ['React', 'TypeScript', 'Tailwind', 'Three.js'],
    joinDate: '2021-03-15',
    hasLaptop: true,
    gender: 'Female',
    isTopTalent: true,
    projects: [
      { id: 'p1', name: 'E-Commerce Platform', role: 'Lead Dev', description: 'Built the core storefront.', status: 'Completed' },
      { id: 'p2', name: 'Dashboard UI', role: 'UX Designer', description: 'Revamped the admin analytics.', status: 'In Progress' }
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'emp-007',
    name: 'Bob Smith',
    email: 'bob@aktechhub.com',
    role: 'Backend Architect',
    department: 'Engineering',
    skills: ['Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    joinDate: '2020-06-01',
    hasLaptop: true,
    gender: 'Male',
    isTopTalent: true,
    projects: [
      { id: 'p3', name: 'API Gateway', role: 'Architect', description: 'Designed microservices communication.', status: 'Completed' }
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
  },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 't1', name: 'TechCorp Global', role: 'CTO', content: 'AK Tech Hub transformed our digital infrastructure.' },
  { id: 't2', name: 'InnovateOne', role: 'Founder', content: 'The skills and dedication of the team are unmatched.' },
  { id: 't3', name: 'EduSystems', role: 'Director', content: 'Bridging the gap between students and tech beautifully.' },
];