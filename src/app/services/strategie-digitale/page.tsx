import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Strategie digitale pour PME suisses | CLICOM',
  description: 'Strategie digitale sur mesure pour PME suisses : positionnement, audience, contenu et KPIs alignes sur vos objectifs.',
}

export default function StrategieDigitalePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <Link href="/services" className="text-sm text-slate-400 hover:text-brand-600 transition-colors mb-8 inline-block">Retour aux services</Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-brand-200">Strategie</span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">Strategie digitale sur mesure</h1>
              <p className="text-lg text-slate-500 leading-relaxed">Une feuille de route claire pour atteindre vos objectifs : positionnement, audience, canaux, contenu et indicateurs de performance, alignes sur les realites de votre PME.</p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-soft">
              <Image src="/images/atelier-strategie-digitale-postit-clicom.avif" alt="Atelier de strategie digitale pour PME" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100">
              <p className="text-lg font-bold text-brand-600">Audit 360</p>
              <p className="text-sm text-slate-500">Diagnostic complet</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100">
              <p className="text-lg font-bold text-brand-600">Roadmap</p>
              <p className="text-sm text-slate-500">Plan 12 mois</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100">
              <p className="text-lg font-bold text-brand-600">KPIs</p>
              <p className="text-sm text-slate-500">Indicateurs cles</p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/devis" className="px-10 py-5 bg-accent-500 text-white font-bold text-lg rounded-2xl hover:bg-accent-600 transition-all shadow-lg hover:shadow-xl inline-block">
              Construire ma strategie digitale
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}