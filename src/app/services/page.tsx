import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Nos Services | CLICOM Agence digitale',
  description: 'Creation de sites internet, referencement SEO local et marketing digital pour les PME en Suisse romande.',
}

const services = [
  {
    title: 'Creation de site internet',
    desc: 'Sites vitrines et e-commerce sur mesure, concus pour convertir vos visiteurs en clients fideles.',
    image: '/images/service-creation-site-internet.webp',
    alt: 'Creation de site internet professionnel pour PME suisse',
    href: '/services/creation-site',
    features: ['Design sur mesure', 'Mobile-first', 'Optimise SEO', 'Hebergement suisse'],
  },
  {
    title: 'Referencement SEO local',
    desc: 'Soyez visible sur Google quand vos clients cherchent vos services en Suisse romande.',
    image: '/images/referencement-seo-local-pme-suisse.webp',
    alt: 'Referencement SEO local pour PME en Suisse',
    href: '/services/seo',
    features: ['Audit SEO complet', 'Google Business', 'Contenu optimise', 'Suivi mensuel'],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-slate-50 py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-brand-200">Nos Services</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
            Des solutions digitales <span className="text-brand-600">pensees pour les PME suisses</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500 leading-relaxed">
            De la creation de votre site internet a votre visibilite sur Google, nous vous accompagnons a chaque etape de votre transformation digitale.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/devis" className="px-8 py-4 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-600 transition-all shadow-lg">
              Demander un devis
            </Link>
            <Link href="/contact" className="px-8 py-4 border border-slate-200 bg-white font-semibold text-slate-900 rounded-xl hover:border-brand-600 hover:text-brand-600 transition-all">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            {services.map((service) => (
              <article key={service.title} className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-soft hover:shadow-xl transition-all">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image src={service.image} alt={service.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900">{service.title}</h2>
                  <p className="mt-3 text-slate-500 leading-relaxed">{service.desc}</p>
                  <ul className="mt-6 grid grid-cols-2 gap-2 text-sm text-slate-600">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-600" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={service.href} className="mt-8 inline-flex items-center gap-2 font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                    En savoir plus
                    <span aria-hidden>{'->'}</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-900 py-20 px-6 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Pret a passer au digital ?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300 leading-relaxed">
            Discutons de votre projet et trouvons ensemble la solution adaptee a votre PME.
          </p>
          <Link href="/devis" className="mt-8 inline-block px-10 py-4 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-600 transition-all shadow-lg">
            Obtenir mon devis gratuit
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}