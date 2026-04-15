import {
  Award,
  CheckCircle2,
  Globe,
  MessageSquare,
  Monitor,
  Smartphone,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react'

export const services = [
  {
    id: 'web',
    title: 'Développement Web',
    icon: Globe,
    copy: 'Plateformes web rapides, stables et prêtes à grandir.',
    href: 'services.html#web',
  },
  {
    id: 'mobile',
    title: 'Solutions Mobiles',
    icon: Smartphone,
    copy: 'Applications iOS et Android fluides, orientées usage réel.',
    href: 'services.html#mobile',
  },
  {
    id: 'desktop',
    title: 'Développement Desktop',
    icon: Monitor,
    copy: 'Outils desktop robustes pour accélérer vos opérations.',
    href: 'services.html#desktop',
  },
  {
    id: 'chatbot',
    title: 'Développement Chatbots',
    icon: MessageSquare,
    copy: 'Assistants IA et automatisations qui améliorent le support.',
    href: 'services.html#chatbot',
  },
]

export const pillars = [
  {
    title: 'Créativité',
    icon: Star,
    copy: 'Des concepts utiles, pensés pour générer un impact concret.',
  },
  {
    title: 'Fiabilité',
    icon: CheckCircle2,
    copy: 'Des livrables testés, maintenables et alignés sur vos objectifs.',
  },
  {
    title: 'Précision',
    icon: TrendingUp,
    copy: 'Des priorités claires pour convertir la stratégie en résultats.',
  },
  {
    title: 'Collaboration',
    icon: Users,
    copy: 'Une équipe EJE intégrée à votre rythme et vos contraintes.',
  },
]

export const stats = [
  { label: 'Satisfaction client', value: '99%', icon: Star },
  { label: 'Partenaires renommés', value: '23+', icon: Users },
  { label: 'Croissance moyenne', value: '45%', icon: TrendingUp },
  { label: "Prix d'excellence", value: '3+', icon: Award },
]

export const faqs = [
  {
    q: "Qu'est-ce que l'ENSI Junior Entreprise ?",
    a: "L'ENSI Junior Entreprise est une structure étudiante qui livre des solutions digitales pour les entreprises.",
  },
  {
    q: 'Comment démarrer un projet avec EJE ?',
    a: 'Un brief, un cadrage rapide, puis une proposition claire de planning et de budget.',
  },
  {
    q: 'Quels services propose EJE ?',
    a: 'Développement web, mobile, desktop, chatbots IA et accompagnement produit.',
  },
  {
    q: 'Comment suivre nos actualités ?',
    a: 'Nos événements et publications sont regroupés dans la section Actualités.',
  },
  {
    q: 'Comment nous contacter rapidement ?',
    a: 'Par formulaire via la page Contact ou directement par email.',
  },
]

export const sectionLinks = {
  about: [
    { label: 'Voir notre histoire', to: '/a-propos' },
    { label: 'Lancer un projet', to: '/contact' },
  ],
  services: [
    { label: 'Tous nos services', to: '/services' },
    { label: 'Parler à un expert', to: '/contact' },
  ],
  reasons: [
    { label: 'Actualités EJE', to: '/actualites' },
    { label: 'Pourquoi EJE', to: '/a-propos' },
  ],
  partners: [
    { label: 'Devenir partenaire', to: '/contact' },
    { label: 'Voir nos actualités', to: '/actualites' },
  ],
  faq: [
    { label: 'Page Contact', to: '/contact' },
    { label: 'Section Services', href: 'services.html#web' },
  ],
}
