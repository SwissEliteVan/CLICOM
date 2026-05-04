export interface Testimonial {
  id: number
  initials: string
  name: string
  type: string
  text: string
  result: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    initials: 'PV',
    name: 'PME industrielle Vaud',
    type: 'Industrie',
    text: 'CLICOM a transforme notre presence en ligne. Notre nouveau site a double les demandes de devis en 3 mois.',
    result: '+125% de demandes',
  },
  {
    id: 2,
    initials: 'CG',
    name: 'Cabinet Geneve',
    type: 'Services',
    text: 'Grace a CLICOM, nous sommes desormais en tete des recherches locales. Nos clients nous trouvent facilement.',
    result: 'Top 3 Google',
  },
  {
    id: 3,
    initials: 'PF',
    name: 'PME B2B Fribourg',
    type: 'B2B',
    text: "L'accompagnement local fait toute la difference. CLICOM comprend nos enjeux et nous conseille avec pertinence.",
    result: '+45% de leads',
  },
]
