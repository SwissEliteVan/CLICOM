export interface NavLink {
  id: string
  label: string
  href: string
}

export const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Accueil', href: '/' },
  { id: 'services', label: 'Services', href: '/services' },
  { id: 'method', label: 'Methode', href: '/#method' },
  { id: 'tarifs', label: 'Tarifs', href: '/#tarifs' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'contact', label: 'Contact', href: '/contact' },
]
