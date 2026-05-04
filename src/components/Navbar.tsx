'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Icon from './Icon'
import { NAV_LINKS } from '@/data/nav'

interface NavbarProps {
  /** When true, navbar starts transparent over hero and becomes solid on scroll. */
  transparent?: boolean
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(!transparent)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!transparent) return
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [transparent])

  const onSolid = scrolled || !transparent

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          onSolid ? 'bg-white/90 backdrop-blur-lg py-3 shadow-soft' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3" aria-label="CLICOM accueil">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-500 ${onSolid ? 'bg-brand-600 text-white' : 'bg-white/20 text-white backdrop-blur-sm'}`}>C</div>
            <span className={`text-xl font-bold tracking-tight transition-colors ${onSolid ? 'text-slate-900' : 'text-white'}`}>CLICOM</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`text-sm font-medium transition-colors ${onSolid ? 'text-slate-500 hover:text-brand-600' : 'text-white/80 hover:text-white'}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/devis"
              className="px-6 py-3 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-600 transition-all shadow-soft hover:shadow-glow-accent"
            >
              Demander un devis
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
          >
            <Icon name={menuOpen ? 'x' : 'menu'} className={onSolid ? 'text-slate-900' : 'text-white'} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-[45] bg-white flex flex-col items-center justify-center space-y-8 lg:hidden animate-slide-down">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-medium text-slate-800 hover:text-brand-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/devis"
            onClick={() => setMenuOpen(false)}
            className="px-10 py-4 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-all"
          >
            Demander un devis
          </Link>
        </div>
      )}
    </>
  )
}
