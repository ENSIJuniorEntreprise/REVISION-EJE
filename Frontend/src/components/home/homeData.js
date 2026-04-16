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
    title: 'Developpement Web',
    icon: Globe,
    copy: 'Plateformes web evolutives, securisees et maintenables, pensees pour des resultats mesurables.',
    href: '/services#web',
  },
  {
    id: 'mobile',
    title: 'Developpement Mobile',
    icon: Smartphone,
    copy: 'Applications iOS et Android fluides, robustes et alignees sur vos usages metier.',
    href: '/services#mobile',
  },
  {
    id: 'desktop',
    title: 'Developpement Desktop',
    icon: Monitor,
    copy: 'Outils desktop performants pour automatiser vos operations et fiabiliser vos workflows.',
    href: '/services#desktop',
  },
  {
    id: 'chatbot',
    title: 'Chatbots IA & FAQ intelligentes',
    icon: MessageSquare,
    copy: 'Assistants conversationnels qui accelerent le support et ameliorent la qualite de reponse.',
    href: '/services#chatbot',
  },
]

export const pillars = [
  {
    title: "Excellence d'ingenierie",
    icon: Award,
    copy: "Une equipe d'ingenieurs ENSI qui combine rigueur technique, curiosite et sens du resultat.",
  },
  {
    title: 'Methodologie claire',
    icon: CheckCircle2,
    copy: 'Chaque mission suit un cadrage net, des jalons lisibles et un pilotage continu.',
  },
  {
    title: 'Impact mesurable',
    icon: TrendingUp,
    copy: 'Notre objectif est simple: transformer vos priorites en livrables utiles, stables et concrets.',
  },
]

export const milestones = [
  { year: '2011', title: 'Cofondation de la JET' },
  { year: '2012', title: 'Adoption des statuts associatifs' },
  { year: '2020', title: "Prix d'excellence" },
]

export const stats = [
  { label: 'Projets realises', value: '90+', icon: TrendingUp },
  { label: 'Entreprises partenaires', value: '50+', icon: Users },
  { label: 'Satisfaction client', value: '94%', icon: CheckCircle2 },
  { label: 'Livraison a temps', value: '100%', icon: CheckCircle2 },
  { label: "Annees d'experience", value: '19+', icon: Award },
  { label: 'Consultants IT', value: '80+', icon: Users },
]

export const optionalAddOns = [
  'Design UI/UX',
  'Tableau de bord analytics',
  'Referencement naturel (SEO)',
  'Configuration hebergement & domaine',
  'Maintenance evolutive',
  'Formation des equipes',
]

export const faqs = [
  {
    q: "Qu'est-ce que ENSI Junior Entreprise?",
    a: "ENSI Junior Entreprise est une structure etudiante qui propose des services digitaux de qualite a cout maitrise.",
  },
  {
    q: 'Comment demarrer un projet avec EJE?',
    a: 'Partagez votre besoin et nous revenons avec un cadrage clair, un planning realiste et une execution transparente.',
  },
  {
    q: 'Quels services propose EJE?',
    a: 'Developpement web, mobile, desktop, chatbots IA et options complementaires orientees produit.',
  },
  {
    q: 'Qui realise les projets EJE?',
    a: 'Les missions sont executees par des ingenieurs ENSI avec un encadrement de profils experimentes et alumni.',
  },
  {
    q: 'Comment contacter rapidement votre equipe?',
    a: 'Passez par la page Contact et notre equipe vous repondra rapidement avec la suite a donner.',
  },
]

export const sectionLinks = {
  about: [
    { label: 'Decouvrir EJE', to: '/a-propos' },
  ],
  services: [
    { label: 'Voir tous nos services', to: '/services' },
  ],
  reasons: [
    { label: 'Pourquoi EJE', to: '/a-propos' },
  ],
  partners: [
    { label: 'Devenir partenaire', to: '/contact' },
  ],
  faq: [
    { label: 'Nous contacter', to: '/contact' },
  ],
}
