export interface Pillar {
  id: number
  number: string
  title: string
  desc: string
  tags: string[]
  image: string
  alt: string
}

export const PILIERS: Pillar[] = [
  {
    id: 1,
    number: '01',
    title: 'Des sites rapides',
    desc: "Nos sites sont concus pour etre ultra-rapides. Pas de temps d'attente : vos visiteurs naviguent en un clin d'oeil.",
    tags: ['Rapidite', 'Performance', 'Experience'],
    image: '/images/analyse-donnees-web-analytics-clicom.avif',
    alt: 'Analyse de donnees et web analytics pour sites performants',
  },
  {
    id: 2,
    number: '02',
    title: 'Un marketing qui rapporte',
    desc: 'Chaque franc investi doit generer un resultat. Nous mesurons tout et optimisons en continu.',
    tags: ['Rentable', 'Mesurable', 'Optimise'],
    image: '/images/audit-marketing-digital-gratuit-pme.avif',
    alt: 'Audit marketing digital pour PME',
  },
  {
    id: 3,
    number: '03',
    title: 'Un accompagnement de proximite',
    desc: "Bases a Vevey, disponibles, reactifs et a l'ecoute, nous sommes bien plus qu'un prestataire.",
    tags: ['Proximite', 'Disponible', 'Partenaire'],
    image: '/images/confiance-securite-garantie-clicom.webp',
    alt: 'Confiance et accompagnement de proximite pour PME suisses',
  },
]

