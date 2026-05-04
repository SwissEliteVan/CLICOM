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
  { id: 1, number: '01', title: 'Des sites rapides', desc: 'Nos sites sont concus pour etre ultra-rapides. Pas de temps d\'attente : vos visiteurs naviguent en un clin d\'oeil.', tags: ['Rapidite', 'Performance', 'Experience'], image: '/images/automation-process-robotique-3d-clicom.avif', alt: 'performance et rapidite site web clicom' },
  { id: 2, number: '02', title: 'Un marketing qui rapporte', desc: "Chaque franc investi doit generer un resultat. Nous mesurons tout et optimisons en continu.", tags: ['Rentable', 'Mesurable', 'Optimise'], image: '/images/analyse-donnees-web-analytics-clicom.avif', alt: 'analyse de donnees marketing digital suisse' },
  { id: 3, number: '03', title: 'Un accompagnement de proximite', desc: "Bases a Vevey, disponibles, reactifs et a l'ecoute, nous sommes bien plus qu'un prestataire.", tags: ['Proximite', 'Disponible', 'Partenaire'], image: '/images/atelier-strategie-digitale-postit-clicom.avif', alt: 'atelier strategie digitale agence vevey' },
]

