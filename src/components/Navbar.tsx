import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-soft sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center font-bold text-white">C</div>
          <span className="font-bold text-xl text-slate-900">CLICOM</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/services" className="hidden sm:inline text-sm text-slate-500 hover:text-brand-600 transition-colors">Services</Link>
          <Link href="/blog" className="hidden sm:inline text-sm text-slate-500 hover:text-brand-600 transition-colors">Blog</Link>
          <Link href="/contact" className="hidden sm:inline text-sm text-slate-500 hover:text-brand-600 transition-colors">Contact</Link>
          <Link href="/devis" className="px-6 py-3 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-600 transition-all">Demander un devis</Link>
        </div>
      </div>
    </nav>
  )
}
