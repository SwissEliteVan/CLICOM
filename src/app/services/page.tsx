'use client'

import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

const SERVICES = [
  {
    id: 1,
    title: 'Sites web professionnels',
    desc: 'Creation de sites vitrines et e-commerce sur mesure avec un design moderne et une navigation fluide.',
    tags: ['Design sur mesure', 'Navigation fluide', 'Mobile-friendly'],
    image: '/images/creation-site-web-pme-suisse-romande.webp',
    alt: 'creation site web professionnel clicom',
  },
  {
    id: 2,
    title: 'Visibilite sur Google',
    desc: "Soyez trouve par vos clients. Nous optimisons votre site pour les moteurs de recherche.",
    tags: ['Referencement local', 'Google Ads', 'Visibilite'],
    image: '/images/referencement-seo-local-pme-suisse.webp',
    alt: 'referencement seo local pme suisse clicom',
  },
  {
    id: 3,
    title: 'Identite visuelle',
    desc: 'Votre marque merite une identite forte. Logo, charte graphique, supports de communication.',
    tags: ['Logo', 'Charte graphique', 'Professionnel'],
    image: '/images/logo-clicom-agence-digitale-bleu.webp',
    alt: 'logo clicom agence digitale identite visuelle',
  },
  {
    id: 4,
    title: 'Accompagnement continu',
    desc: 'Support reactif, maintenance et conseils strategiques pour vous accompagner dans la duree.',
    tags: ['Support 7j/7', 'Maintenance', 'Conseil'],
    image: '/images/reunion-conseil-client-agence-digitale.avif',
    alt: 'reunion conseil client agence digitale clicom',
  },
]

export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>Services | CLICOM Agence Web</title>
        <meta name="description" content="Creation de sites web, referencement SEO, identite visuelle et accompagnement digital pour PME suisses." />
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

        <main className="py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-brand-200">Nos services</span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">Ce que nous faisons pour vous</h1>
              <div className="w-20 h-1 bg-brand-600 rounded-full mx-auto mt-6" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {SERVICES.map((s) => (
                <div key={s.id} className="bg-slate-50 rounded-2xl overflow-hidden hover:shadow-soft transition-all border border-slate-100 hover:border-brand-200 group">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-8">
                    <h2 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-brand-600 transition-colors">{s.title}</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">{s.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1.5 bg-brand-50 text-brand-700 text-xs font-medium rounded-lg">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link href="/devis" className="px-10 py-5 bg-accent-500 text-white font-bold text-lg rounded-2xl hover:bg-accent-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 inline-block">
                Demander un devis gratuit
              </Link>
            </div>
          </div>
        </main>

        <footer className="py-16 bg-slate-900 text-white/60 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center font-bold text-white">C</div>
              <span className="font-bold text-xl text-white">CLICOM</span>
            </div>
            <p className="text-white/40 leading-relaxed max-w-md mx-auto mb-8">Agence digitale suisse dediee aux PME. Creation de sites web, visibilite sur Google et marketing digital.</p>
            <div className="flex justify-center gap-8 mb-6">
              <Link href="/" className="text-sm text-white/50 hover:text-white transition-colors">Accueil</Link>
              <Link href="/blog" className="text-sm text-white/50 hover:text-white transition-colors">Blog</Link>
              <Link href="/contact" className="text-sm text-white/50 hover:text-white transition-colors">Contact</Link>
              <Link href="/devis" className="text-sm text-white/50 hover:text-white transition-colors">Devis</Link>
            </div>
            <p className="text-sm text-white/30 pt-8 border-t border-white/5">&copy; 2026 CLICOM. Tous droits reserves.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
