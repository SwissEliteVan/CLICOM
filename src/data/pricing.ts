export interface PricingPlan {
  title: string
  price: string
  sub: string
  features: string[]
  image: string
  alt: string
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    title: 'Site Web',
    price: "1'800 CHF",
    sub: 'paiement unique',
    features: ['Design sur mesure', 'SEO de base inclus', 'Formulaire de contact', 'Responsive mobile'],
    image: '/images/service-creation-site-internet.webp',
    alt: 'creation site web professionnel pme suisse tarif clicom',
  },
  {
    title: 'SEO et Visibilite',
    price: 'Des 400 CHF',
    sub: '/ mois',
    features: ['Optimisation locale', 'Google My Business', 'Creation de contenu', 'Rapport mensuel'],
    image: '/images/referencement-seo-local-pme-suisse.webp',
    alt: 'referencement seo local visibilite google tarif clicom',
  },
  {
    title: 'E-commerce',
    price: 'Sur devis',
    sub: 'paiement unique',
    features: ['Boutique complete', 'Paiements securises', 'Formation incluse', 'Support prioritaire'],
    image: '/images/boutique-ecommerce-suisse-paiement-securise.webp',
    alt: 'boutique ecommerce en ligne paiement securise tarif clicom',
  },
]
