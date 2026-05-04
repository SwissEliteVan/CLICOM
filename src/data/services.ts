export interface Service {
  id: number
  title: string
  desc: string
  tags: string[]
  href: string
  image: string
  alt: string
}

export const SERVICES_DATA: Service[] = [
  {
    id: 1,
    title: 'Sites web professionnels',
    desc: 'Nous concevons des sites vitrines et e-commerce sur mesure, avec un design moderne et une navigation fluide.',
    tags: ['Design sur mesure', 'Navigation fluide', 'Mobile-friendly', 'Rapide'],
    href: '/services/creation-site',
    image: '/images/creation-site-internet-pme-suisse.avif',
    alt: 'creation site web professionnel pme suisse clicom',
  },
  {
    id: 2,
    title: 'Visibilite sur Google',
    desc: 'Soyez trouve par vos clients. Nous optimisons votre site pour les moteurs de recherche et gerons vos campagnes publicitaires.',
    tags: ['Referencement local', 'Google Ads', 'Visibilite', 'Plus de clients'],
    href: '/services/seo',
    image: '/images/referencement-seo-local-pme-suisse.webp',
    alt: 'referencement seo local pour pme suisse clicom',
  },
  {
    id: 3,
    title: 'Identite visuelle',
    desc: 'Votre marque merite une identite forte. Logo, charte graphique, supports de communication.',
    tags: ['Logo', 'Charte graphique', 'Coherence', 'Professionnel'],
    href: '/services/ux-ui-design',
    image: '/images/reunion-conseil-client-agence-digitale.avif',
    alt: 'logo clicom agence digitale identite visuelle',
  },
  {
    id: 4,
    title: 'Accompagnement continu',
    desc: 'Support reactif, maintenance et conseils strategiques pour vous accompagner dans la duree.',
    tags: ['Support 7j/7', 'Maintenance', 'Conseil', 'Proximite'],
    href: '/services/strategie-digitale',
    image: '/images/reunion-conseil-client-agence-digitale.avif',
    alt: 'reunion conseil client agence digitale clicom',
  },
]
