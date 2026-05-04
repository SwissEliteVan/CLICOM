'use client'

import Link from 'next/link'
import Head from 'next/head'

export default function SeoPage() {
  return (
    <>
      <Head>
        <title>Referencement naturel SEO | CLICOM</title>
        <meta name="description" content="Audit SEO et optimisation pour PME suisses. Ameliorez votre positionnement Google et attirez plus de clients qualifies." />
      </Head>
      <div className="min-h-screen bg-white">
        <nav className="bg-white shadow-soft sticky top-0 z-50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center font-bold text-white">C</div>
              <span className="font-bold text-xl text-slate-900">CLICOM</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/services" className="text-sm text-slate-500 hover:text-brand-600 transition-colors">Services</Link>
              <Link href="/devis" className="px-6 py-3 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-600 transition-all">Demander un devis</Link>
            </div>
          </div>
        </nav>

        <main className="py-24 md:py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/services" className="text-sm text-slate-400 hover:text-brand-600 transition-colors mb-8 inline-block">Retour aux services</Link>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-brand-200">SEO</span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-8">Referencement naturel / SEO</h1>
            <p className="text-xl text-slate-500 leading-relaxed mb-12 max-w-3xl">
              Optimisez votre visibilite sur Google. Nous realisons un audit complet, definissons une strategie de contenu et deployons les meilleures pratiques techniques pour vous propulser en tete des resultats de recherche.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {[{ value: '+200%', label: 'Trafic organique moyen' }, { value: 'Top 3', label: 'Positionnement vise' }, { value: 'Audit offert', label: 'Sans engagement' }].map((stat, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100">
                  <p className="text-lg font-bold text-brand-600">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-16 text-center">
              <Link href="/devis" className="px-10 py-5 bg-accent-500 text-white font-bold text-lg rounded-2xl hover:bg-accent-600 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] inline-block">
                Demander mon audit SEO gratuit
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}