import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Creation et refonte de site internet | CLICOM',
  description: 'Creation de site web sur mesure pour PME suisses. Design moderne, performances optimisees, SEO integre. Devis gratuit sous 24h.',
}

export default function CreationSitePage() {
  return (
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
        <div className="max-w-5xl mx-auto">
          <Link href="/services" className="text-sm text-slate-400 hover:text-brand-600 transition-colors mb-8 inline-block">Retour aux services</Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-brand-200">Creation et Refonte</span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">Creation et refonte de site internet</h1>
              <p className="text-lg text-slate-500 leading-relaxed">Sites vitrines et e-commerce sur mesure, design moderne, performances optimisees et SEO integre des la conception. Votre entreprise merite une presence en ligne a son image.</p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-soft">
              <Image src="/images/service-creation-site-internet.webp" alt="Creation de site internet professionnel pour PME suisse" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100">
              <p className="text-lg font-bold text-brand-600">Sous 3 semaines</p>
              <p className="text-sm text-slate-500">Livraison rapide</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100">
              <p className="text-lg font-bold text-brand-600">100% responsive</p>
              <p className="text-sm text-slate-500">Mobile et tablette</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100">
              <p className="text-lg font-bold text-brand-600">SEO inclus</p>
              <p className="text-sm text-slate-500">Optimise Google</p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/devis" className="px-10 py-5 bg-accent-500 text-white font-bold text-lg rounded-2xl hover:bg-accent-600 transition-all shadow-lg hover:shadow-xl inline-block">
              Demander mon devis creation site
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}