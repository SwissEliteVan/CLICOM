$code = @'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nos Services | Agence digitale CLICOM',
  description: 'Creation de sites internet et referencement SEO local pour les PME en Suisse romande.',
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
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold text-slate-900">CLICOM</Link>
          <nav className="flex gap-6 text-sm font-medium">
            <Link href="/" className="text-slate-700 hover:text-brand-600">Accueil</Link>
            <Link href="/services" className="text-brand-600">Services</Link>
            <Link href="/blog" className="text-slate-700 hover:text-brand-600">Blog</Link>
            <Link href="/contact" className="text-slate-700 hover:text-brand-600">Contact</Link>
          </nav>
        </div>
      </header>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-600">Nos Services</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Des solutions digitales <span className="text-brand-600">pensees pour les PME suisses</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            De la creation de votre site internet a votre visibilite sur Google, nous vous accompagnons a chaque etape de votre transformation digitale.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/devis" className="rounded-full bg-brand-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-brand-700">
              Demander un devis
            </Link>
            <Link href="/contact" className="rounded-full border border-slate-300 bg-white px-8 py-3 font-semibold text-slate-900 transition hover:border-brand-600 hover:text-brand-600">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {services.map((service) => (
              <article key={service.title} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-xl">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900">{service.title}</h2>
                  <p className="mt-3 text-slate-600">{service.desc}</p>
                  <ul className="mt-6 grid grid-cols-2 gap-2 text-sm text-slate-700">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-600" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={service.href} className="mt-8 inline-flex items-center gap-2 font-semibold text-brand-600 hover:text-brand-700">
                    En savoir plus
                    <span aria-hidden>{'->'}</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Pret a passer au digital ?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Discutons de votre projet et trouvons ensemble la solution adaptee a votre PME.
          </p>
          <Link href="/devis" className="mt-8 inline-block rounded-full bg-brand-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-brand-700">
            Obtenir mon devis gratuit
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-600 md:flex-row">
          <p>(c) {new Date().getFullYear()} CLICOM - Agence digitale pour PME suisses.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-brand-600">Accueil</Link>
            <Link href="/services" className="hover:text-brand-600">Services</Link>
            <Link href="/contact" className="hover:text-brand-600">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
'@

$path = 'src/app/services/page.tsx'
Set-Content -Path $path -Value $code -Encoding UTF8 -NoNewline
Write-Host ("OK: {0} ecrase ({1} caracteres)" -f $path, $code.Length)
