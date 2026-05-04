import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <p>(c) {new Date().getFullYear()} CLICOM - Agence digitale pour PME en Suisse romande.</p>
        <div className="flex gap-6">
          <Link href="/services" className="hover:text-brand-600 transition-colors">Services</Link>
          <Link href="/blog" className="hover:text-brand-600 transition-colors">Blog</Link>
          <Link href="/contact" className="hover:text-brand-600 transition-colors">Contact</Link>
          <Link href="/devis" className="hover:text-brand-600 transition-colors">Devis</Link>
        </div>
      </div>
    </footer>
  )
}
