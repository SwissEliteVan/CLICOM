import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Referencement payant Google Ads | CLICOM',
  description: 'Campagnes Google Ads pour PME suisses. Generez des leads qualifies des le premier jour avec un ROI mesure.',
}

export default function SeaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <Link href="/services" className="text-sm text-slate-400 hover:text-brand-600 transition-colors mb-8 inline-block">Retour aux services</Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-brand-200">SEA</span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">Referencement payant Google Ads</h1>
              <p className="text-lg text-slate-500 leading-relaxed">Generez des leads qualifies des le premier jour. Campagnes Google Ads pilotees par la performance, ciblage local et optimisation continue du retour sur investissement.</p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-soft">
              <Image src="/images/marketing-digital-local-pme-suisse.webp" alt="Campagnes marketing digital local pour PME suisse" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100">
              <p className="text-lg font-bold text-brand-600">ROI mesure</p>
              <p className="text-sm text-slate-500">Reporting transparent</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100">
              <p className="text-lg font-bold text-brand-600">Sans engagement</p>
              <p className="text-sm text-slate-500">Flexibilite totale</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100">
              <p className="text-lg font-bold text-brand-600">Suivi mensuel</p>
              <p className="text-sm text-slate-500">Optimisation continue</p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/devis" className="px-10 py-5 bg-accent-500 text-white font-bold text-lg rounded-2xl hover:bg-accent-600 transition-all shadow-lg hover:shadow-xl inline-block">
              Lancer ma campagne Google Ads
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}