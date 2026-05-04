import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-16 bg-slate-900 text-white/60 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center font-bold text-white">C</div>
              <span className="font-bold text-xl text-white">CLICOM</span>
            </div>
            <p className="text-white/40 leading-relaxed max-w-md">
              Agence digitale suisse dediee aux PME. Creation de sites web, visibilite sur Google et marketing digital.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-6">Services</p>
            <div className="flex flex-col gap-3">
              <Link href="/services" className="text-sm text-white/50 hover:text-white transition-colors">Tous nos services</Link>
              <Link href="/services/creation-site" className="text-sm text-white/50 hover:text-white transition-colors">Creation de site</Link>
              <Link href="/services/seo" className="text-sm text-white/50 hover:text-white transition-colors">Referencement SEO</Link>
              <Link href="/services/sea" className="text-sm text-white/50 hover:text-white transition-colors">Publicite SEA</Link>
              <Link href="/devis" className="text-sm text-white/50 hover:text-white transition-colors">Devis</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-6">Contact</p>
            <div className="space-y-3 text-sm">
              <p>
                <a href="mailto:hello@clicom.ch" className="text-white/50 hover:text-white transition-colors">hello@clicom.ch</a>
              </p>
              <p>
                <a href="tel:+41788238950" className="text-white/50 hover:text-white transition-colors">078 823 89 50</a>
              </p>
              <p className="text-white/30">Vevey - Suisse romande</p>
              <Link href="/contact" className="text-white/50 hover:text-white transition-colors block">Nous ecrire</Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-sm text-white/30">(c) {new Date().getFullYear()} CLICOM. Tous droits reserves.</p>
        </div>
      </div>
    </footer>
  )
}
