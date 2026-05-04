export interface BlogPost {
  id: number
  category: string
  date: string
  title: string
  excerpt: string
  href: string
  image: string
  alt: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    category: 'Site web',
    date: '25 mars 2026',
    title: "Pourquoi votre entreprise suisse a besoin d'un site internet en 2026",
    excerpt: "A l'ere du numerique, une presence en ligne professionnelle n'est plus optionnelle.",
    href: '/blog/pourquoi-site-web-2026',
    image: '/images/creation-site-internet-pme-suisse.avif',
    alt: 'site internet professionnel pme suisse clicom',
  },
  {
    id: 2,
    category: 'Intelligence Artificielle',
    date: '14 mars 2026',
    title: "Comment l'intelligence artificielle peut aider votre PME",
    excerpt: 'Decouvrez comment les PME peuvent utiliser ces outils pour gagner du temps.',
    href: '/blog/ia-pme',
    image: '/images/marketing-croissance-abstrait-clicom.avif',
    alt: 'marketing croissance abstrait clicom suisse romande',
  },
  {
    id: 3,
    category: 'Marketing',
    date: '5 mars 2026',
    title: 'Attirer des clients sans prospection agressive',
    excerpt: 'Strategies concretes adaptees aux PME pour generer des leads durablement.',
    href: '/blog/attirer-clients-sans-prospection',
    image: '/images/transformation-digitale-geneve-reseau-entreprise.avif',
    alt: 'transformation digitale geneve reseau entreprise clicom',
  },
]
