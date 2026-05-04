export interface PricingPlan {
  title: string
  price: string
  sub: string
  features: string[]
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    title: 'Site Web',
    price: "1'800 CHF",
    sub: 'paiement unique',
    features: ['Design sur mesure', 'SEO de base inclus', 'Formulaire de contact', 'Responsive mobile'],
  },
  {
    title: 'SEO et Visibilite',
    price: 'Des 400 CHF',
    sub: '/ mois',
    features: ['Optimisation locale', 'Google My Business', 'Creation de contenu', 'Rapport mensuel'],
  },
  {
    title: 'E-commerce',
    price: 'Sur devis',
    sub: 'paiement unique',
    features: ['Boutique complete', 'Paiements securises', 'Formation incluse', 'Support prioritaire'],
  },
]
