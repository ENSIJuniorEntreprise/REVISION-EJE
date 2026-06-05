import {
  Award,
  CheckCircle2,
  Globe,
  MessageSquare,
  Monitor,
  Smartphone,
  TrendingUp,
  Users,
} from 'lucide-react'

export const services = [
  {
    id: 'web',
    title: 'Web Development',
    icon: Globe,
    copy: 'Scalable, secure, and maintainable web platforms built for measurable outcomes.',
    href: '/services#web',
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    icon: Smartphone,
    copy: 'Smooth and robust iOS and Android apps aligned with your business use cases.',
    href: '/services#mobile',
  },
  {
    id: 'desktop',
    title: 'Desktop Development',
    icon: Monitor,
    copy: 'High-performance desktop tools to automate your operations and make workflows more reliable.',
    href: '/services#desktop',
  },
  {
    id: 'chatbot',
    title: 'AI Chatbots & Smart FAQs',
    icon: MessageSquare,
    copy: 'Conversational assistants that speed up support and improve response quality.',
    href: '/services#chatbot',
  },
]

export const pillars = [
  {
    title: 'Engineering Excellence',
    icon: Award,
    copy: 'A team of ENSI engineers combining technical rigor, curiosity, and a results-driven mindset.',
  },
  {
    title: 'Clear Methodology',
    icon: CheckCircle2,
    copy: 'Every mission follows clear scoping, readable milestones, and continuous execution tracking.',
  },
  {
    title: 'Measurable Impact',
    icon: TrendingUp,
    copy: 'Our goal is simple: turn your priorities into useful, stable, and concrete deliverables.',
  },
]

export const milestones = [
  { year: '2011', title: 'JET Co-founded' },
  { year: '2012', title: 'Association bylaws adopted' },
  { year: '2020', title: 'Excellence Award' },
]

export const stats = [
  { label: 'Completed projects', value: '90+', icon: TrendingUp },
  { label: 'Partner companies', value: '50+', icon: Users },
  { label: 'Client satisfaction', value: '94%', icon: CheckCircle2 },
  { label: 'On-time delivery', value: '100%', icon: CheckCircle2 },
  { label: 'Years of experience', value: '19+', icon: Award },
  { label: 'Consultants IT', value: '80+', icon: Users },
]

export const optionalAddOns = [
  'Design UI/UX',
  'Analytics dashboard',
  'Search engine optimization (SEO)',
  'Hosting and domain setup',
  'Ongoing maintenance',
  'Team training',
]

export const faqs = [
  {
    q: 'What is ENSI Junior Entreprise?',
    a: 'ENSI Junior Entreprise is a student-led organization that delivers high-quality digital services at controlled cost.',
  },
  {
    q: 'How do I start a project with EJE?',
    a: 'Share your need and we come back with clear scoping, a realistic schedule, and transparent execution.',
  },
  {
    q: 'Which services does EJE provide?',
    a: 'Web, mobile, and desktop development, AI chatbots, and product-oriented complementary options.',
  },
  {
    q: 'Who delivers EJE projects?',
    a: 'Projects are delivered by ENSI engineers with guidance from experienced profiles and alumni.',
  },
  {
    q: 'How can I contact your team quickly?',
    a: 'Use the Contact page and our team will reply quickly with clear next steps.',
  },
]

export const sectionLinks = {
  about: [
    { label: 'Discover EJE', to: '/a-propos' },
  ],
  services: [
    { label: 'View all services', to: '/services' },
  ],
  reasons: [
    { label: 'Why EJE', to: '/a-propos' },
  ],
  partners: [
    { label: 'Become a partner', to: '/contact' },
  ],
  faq: [
    { label: 'Contact us', to: '/contact' },
  ],
}
