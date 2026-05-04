'use client'

import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

const ARTICLES = [
  {
    slug: 'pourquoi-site-web-2026',
    category: 'Site web',
    date: '25 mars 2026',
    title: "Pourquoi votre entreprise suisse a besoin d'un site internet en 2026",
    excerpt: "A l'ere du numerique, une presence en ligne professionnelle n'est plus optionnelle. Decouvrez pourquoi investir dans un site web est indispensable pour rester competitif.",
  },
  {
    slug: 'ia-pme',
    category: 'Intelligence Artificielle',
    date: '14 mars 2026',
    title: "Comment l'intelligence artificielle peut aider votre PME",
    excerpt: "L'IA n'est plus reservee aux grandes entreprises. Decouvrez comment les PME peuvent utiliser ces outils pour gagner du temps et developper leur activite.",
  },
  {
    slug: 'attirer-clients-sans-prospection',
    category: 'Marketing',
    date: '5 mars 2026',
    title: "Attirer des clients sans prospection agressive",
    excerpt: "Attirez des clients qualifies sans demarchage agressif : strategies concretes adaptees aux PME pour generer des leads durablement.",
  },
]

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>Blog | CLICOM Agence Web</title>
        <meta name="description" content="Conseils et actualites marketing digital pour PME suisses. Guides SEO, reseaux sociaux, croissance en ligne." />
      </Head>
      <div className="min-h-screen bg-white">
        <nav className="bg-white shadow-soft sticky top-0 z-50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center font-bold text-white">C</div>
              <span className="font-bold text-xl text-slate-900">CLICOM</span>
            </Link>
            <Link href="/devis" className="px-6 py-3 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-600 transition-all">Demander un devis</Link>
          </div>
        </nav>

        <main className="py-24 md:py-32 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-brand-200">Blog</span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">Conseils & actualites</h1>
              <div className="w-20 h-1 bg-brand-600 rounded-full mx-auto mt-6" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {ARTICLES.map((post) => (
                <article key={post.slug} className="bg-white rounded-2xl overflow-hidden hover:shadow-soft transition-all group">
                  <div className="h-48 bg-gradient-to-br from-brand-100 to-brand-50 flex items-center justify-center">
                    <div className="text-6xl opacity-30">
                      <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 24 24" fill="currentColor" className="text-brand-600">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider mb-4">
                      <span className="text-brand-600">{post.category}</span>
                      <span className="text-slate-300">-</span>
                      <span className="text-slate-400">{post.date}</span>
                    </div>
                    <h2 className="text-lg font-bold mb-4 text-slate-900 group-hover:text-brand-600 transition-colors leading-snug">{post.title}</h2>
                    <p className="text-slate-500 leading-relaxed mb-6">{post.excerpt}</p>
                    <Link href={`/blog/${post.slug}`} className="text-brand-600 font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                      Lire la suite
                      <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
