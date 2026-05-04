import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Blog | CLICOM Agence digitale',
  description: 'Conseils et actualites marketing digital pour PME suisses : SEO, sites web, intelligence artificielle.',
}

const ARTICLES = [
  {
    slug: 'pourquoi-site-web-2026',
    category: 'Site web',
    date: '25 mars 2026',
    title: "Pourquoi votre entreprise suisse a besoin d'un site internet en 2026",
    excerpt: "A l'ere du numerique, une presence en ligne professionnelle n'est plus optionnelle pour rester competitif.",
    image: '/images/creation-site-web-pme-suisse-romande.webp',
    alt: 'Creation de site web pour PME suisse',
  },
  {
    slug: 'ia-pme',
    category: 'Intelligence Artificielle',
    date: '14 mars 2026',
    title: "Comment l'intelligence artificielle peut aider votre PME",
    excerpt: "L'IA n'est plus reservee aux grandes entreprises : decouvrez comment les PME peuvent gagner du temps avec ces outils.",
    image: '/images/automation-process-robotique-3d-clicom.avif',
    alt: 'Intelligence artificielle et automatisation pour PME',
  },
  {
    slug: 'attirer-clients-sans-prospection',
    category: 'Marketing',
    date: '5 mars 2026',
    title: 'Attirer des clients sans prospection agressive',
    excerpt: 'Strategies concretes adaptees aux PME pour generer des leads qualifies durablement, sans demarchage.',
    image: '/images/marketing-croissance-abstrait-clicom.avif',
    alt: 'Strategies marketing pour generer des leads',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="py-24 md:py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-brand-200">Blog</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">Conseils et actualites</h1>
            <div className="w-20 h-1 bg-brand-600 rounded-full mx-auto mt-6" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {ARTICLES.map((post) => (
              <article key={post.slug} className="bg-white rounded-2xl overflow-hidden hover:shadow-soft transition-all group">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image src={post.image} alt={post.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider mb-4">
                    <span className="text-brand-600">{post.category}</span>
                    <span className="text-slate-300">-</span>
                    <span className="text-slate-400">{post.date}</span>
                  </div>
                  <h2 className="text-lg font-bold mb-4 text-slate-900 group-hover:text-brand-600 transition-colors leading-snug">{post.title}</h2>
                  <p className="text-slate-500 leading-relaxed mb-6">{post.excerpt}</p>
                  <span className="text-brand-600 font-semibold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Lire la suite
                    <span aria-hidden>{'->'}</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}