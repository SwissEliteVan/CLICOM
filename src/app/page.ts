'use client'

import { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react'
import Link from 'next/link'
import Head from 'next/head'

// --- Types ---
interface NavLink {
  id: string
  label: string
  href: string
}

interface Service {
  id: number
  title: string
  desc: string
  tags: string[]
  href: string
}

interface Testimonial {
  id: number
  initials: string
  name: string
  type: string
  text: string
  result: string
}

interface BlogPost {
  id: number
  category: string
  date: string
  title: string
  excerpt: string
  href: string
}

interface Pillar {
  id: number
  number: string
  title: string
  desc: string
  tags: string[]
}

// --- Data ---
const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Accueil', href: '/' },
  { id: 'services', label: 'Services', href: '/services' },
  { id: 'method', label: 'Methode', href: '/#method' },
  { id: 'tarifs', label: 'Tarifs', href: '/devis' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'contact', label: 'Contact', href: '/contact' },
]

const SERVICES_DATA: Service[] = [
  {
    id: 1,
    title: 'Sites web professionnels',
    desc: 'Nous concevons des sites vitrines et e-commerce sur mesure, avec un design moderne et une navigation fluide.',
    tags: ['Design sur mesure', 'Navigation fluide', 'Mobile-friendly', 'Rapide'],
    href: '/services/creation-site',
  },
  {
    id: 2,
    title: 'Visibilite sur Google',
    desc: "Soyez trouve par vos clients. Nous optimisons votre site pour les moteurs de recherche et gerons vos campagnes publicitaires.",
    tags: ['Referencement local', 'Google Ads', 'Visibilite', 'Plus de clients'],
    href: '/services/seo',
  },
  {
    id: 3,
    title: 'Identite visuelle',
    desc: "Votre marque merite une identite forte. Logo, charte graphique, supports de communication.",
    tags: ['Logo', 'Charte graphique', 'Cohérence', 'Professionnel'],
    href: '/services/ux-ui-design',
  },
  {
    id: 4,
    title: 'Accompagnement continu',
    desc: "Support reactif, maintenance et conseils strategiques pour vous accompagner dans la duree.",
    tags: ['Support 7j/7', 'Maintenance', 'Conseil', 'Proximite'],
    href: '/services/strategie-digitale',
  },
]

const TESTIMONIALS: Testimonial[] = [
  { id: 1, initials: 'PV', name: 'PME industrielle Vaud', type: 'Industrie', text: "CLICOM a transforme notre presence en ligne. Notre nouveau site a double les demandes de devis en 3 mois.", result: '+125% de demandes' },
  { id: 2, initials: 'CG', name: 'Cabinet Geneve', type: 'Services', text: "Grace a CLICOM, nous sommes desormais en tete des recherches locales. Nos clients nous trouvent facilement.", result: 'Top 3 Google' },
  { id: 3, initials: 'PF', name: 'PME B2B Fribourg', type: 'B2B', text: "L'accompagnement local fait toute la difference. CLICOM comprend nos enjeux et nous conseille avec pertinence.", result: '+45% de leads' },
]

const BLOG_POSTS: BlogPost[] = [
  { id: 1, category: 'Site web', date: '25 mars 2026', title: "Pourquoi votre entreprise suisse a besoin d'un site internet en 2026", excerpt: "A l'ere du numerique, une presence en ligne professionnelle n'est plus optionnelle.", href: '/blog/pourquoi-site-web-2026' },
  { id: 2, category: 'Intelligence Artificielle', date: '14 mars 2026', title: "Comment l'intelligence artificielle peut aider votre PME", excerpt: "Decouvrez comment les PME peuvent utiliser ces outils pour gagner du temps.", href: '/blog/ia-pme' },
  { id: 3, category: 'Marketing', date: '5 mars 2026', title: "Attirer des clients sans prospection agressive", excerpt: "Strategies concretes adaptees aux PME pour generer des leads durablement.", href: '/blog/attirer-clients-sans-prospection' },
]

const PILIERS: Pillar[] = [
  { id: 1, number: '01', title: 'Des sites rapides', desc: 'Nos sites sont concus pour etre ultra-rapides. Pas de temps d\'attente : vos visiteurs naviguent en un clin d\'oeil.', tags: ['Rapidite', 'Performance', 'Experience'] },
  { id: 2, number: '02', title: 'Un marketing qui rapporte', desc: "Chaque franc investi doit generer un resultat. Nous mesurons tout et optimisons en continu.", tags: ['Rentable', 'Mesurable', 'Optimise'] },
  { id: 3, number: '03', title: 'Un accompagnement de proximite', desc: "Bases a Vevey, disponibles, reactifs et a l'ecoute, nous sommes bien plus qu'un prestataire.", tags: ['Proximite', 'Disponible', 'Partenaire'] },
]

const Icons = {
  arrowRight: (size = 24, className = '') => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>),
  check: (size = 24, className = '') => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12" /></svg>),
  menu: (size = 24, className = '') => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>),
  x: (size = 24, className = '') => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>),
  quote: (size = 24, className = '') => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M3 21c3 0 7-1 7-8V5c0-1 0-2-2-2H4c-1 0-2 1-2 2v6c0 1 0 2 2 2h2v2c0 2-1 3-3 3zm14 0c3 0 7-1 7-8V5c0-1 0-2-2-2h-4c-1 0-2 1-2 2v6c0 1 0 2 2 2h2v2c0 2-1 3-3 3z" /></svg>),
  mail: (size = 24, className = '') => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 4L12 13 2 4" /></svg>),
  phone: (size = 24, className = '') => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>),
  mapPin: (size = 24, className = '') => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>),
  star: (size = 24, className = '') => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>),
}

const Icon = memo(({ name, size = 24, className = '' }: { name: keyof typeof Icons; size?: number; className?: string }) => Icons[name]?.(size, className) || null)
Icon.displayName = 'Icon'

const Badge = memo(({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-brand-200">{children}</span>
))
Badge.displayName = 'Badge'

const useReveal = (threshold = 0.1) => {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } }, { threshold })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, visible }
}

const Reveal = memo(({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const { ref, visible } = useReveal()
  return <div ref={ref} className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
})
Reveal.displayName = 'Reveal'

const SectionTitle = memo(({ subtitle, title }: { subtitle: string; title: string }) => (
  <div className="text-center mb-16">
    <Badge>{subtitle}</Badge>
    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mt-4">{title}</h2>
    <div className="w-20 h-1 bg-brand-600 rounded-full mx-auto mt-6" />
  </div>
))
SectionTitle.displayName = 'SectionTitle'

const ContactForm = memo(() => {
  const [step, setStep] = useState<'start' | 'success'>('start')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({})
  const validate = () => {
    const newErrors: typeof errors = {}
    if (!formData.name.trim()) newErrors.name = 'Votre nom est requis'
    if (!formData.email.trim()) newErrors.email = 'Votre email est requis'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide'
    if (!formData.message.trim()) newErrors.message = 'Votre message est requis'
    setErrors(newErrors); return Object.keys(newErrors).length === 0
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }
  const handleSubmit = () => { if (!validate()) return; setStep('success') }
  return (
    <div className="bg-white rounded-2xl shadow-soft p-8 md:p-10">
      {step === 'start' ? (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-900">Envoyez-nous un message</h3>
          <p className="text-slate-500">Remplissez ce formulaire, on vous repond sous 24h.</p>
          <div className="space-y-4">
            <input type="text" name="name" placeholder="Votre nom" value={formData.name} onChange={handleChange} className={`w-full p-4 bg-slate-50 border rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all ${errors.name ? 'border-red-500' : 'border-slate-200'}`} />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            <input type="email" name="email" placeholder="Votre email" value={formData.email} onChange={handleChange} className={`w-full p-4 bg-slate-50 border rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all ${errors.email ? 'border-red-500' : 'border-slate-200'}`} />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            <textarea name="message" placeholder="Votre message" rows={4} value={formData.message} onChange={handleChange} className={`w-full p-4 bg-slate-50 border rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none resize-none transition-all ${errors.message ? 'border-red-500' : 'border-slate-200'}`} />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            <button onClick={handleSubmit} className="w-full py-4 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-all shadow-soft hover:shadow-glow">Envoyer le message</button>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-6 py-12">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-scale-in"><Icon name="check" size={36} /></div>
          <h3 className="text-2xl font-bold text-slate-900">Message envoye</h3>
          <p className="text-slate-500">Nous vous repondrons sous 24h.</p>
          <button onClick={() => { setStep('start'); setFormData({ name: '', email: '', message: '' }); setErrors({}) }} className="px-6 py-3 border border-slate-200 rounded-xl font-medium text-slate-500 hover:text-brand-600 hover:border-brand-200 transition-all">Envoyer un autre message</button>
        </div>
      )}
    </div>
  )
})
ContactForm.displayName = 'ContactForm'

const useScrollHandler = () => {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h) }, [])
  return scrolled
}

const Particles = memo(() => {
  const particles = useMemo(() => [...Array(8)].map((_, i) => ({ id: i, width: Math.random() * 100 + 50, height: Math.random() * 100 + 50, top: Math.random() * 100, left: Math.random() * 100, delay: Math.random() * 5, duration: Math.random() * 5 + 5 })), [])
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => <div key={p.id} className="particle" style={{ width: `${p.width}px`, height: `${p.height}px`, top: `${p.top}%`, left: `${p.left}%`, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s` }} />)}
    </div>
  )
})
Particles.displayName = 'Particles'

const Navbar = memo(({ scrolled, menuOpen, setMenuOpen }: { scrolled: boolean; menuOpen: boolean; setMenuOpen: (open: boolean) => void }) => {
  const scrollToTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [])
  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-lg py-3 shadow-soft' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button onClick={scrollToTop} className="flex items-center gap-3" aria-label="Retour en haut">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-500 ${scrolled ? 'bg-brand-600 text-white' : 'bg-white/20 text-white backdrop-blur-sm'}`}>C</div>
          <span className={`text-xl font-bold tracking-tight transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}>CLICOM</span>
        </button>
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            link.id === 'home' ? (
              <button key={link.id} onClick={scrollToTop} className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-500 hover:text-brand-600' : 'text-white/80 hover:text-white'}`}>Accueil</button>
            ) : (
              <Link key={link.id} href={link.href} className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-500 hover:text-brand-600' : 'text-white/80 hover:text-white'}`}>{link.label}</Link>
            )
          ))}
          <Link href="/devis" className="px-6 py-3 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-600 transition-all shadow-soft hover:shadow-glow-accent">Demander un devis</Link>
        </div>
        <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}>
          <Icon name={menuOpen ? 'x' : 'menu'} className={scrolled ? 'text-slate-900' : 'text-white'} />
        </button>
      </div>
    </nav>
  )
})
Navbar.displayName = 'Navbar'

const Footer = () => (
  <footer className="py-16 bg-slate-900 text-white/60 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center font-bold text-white">C</div>
            <span className="font-bold text-xl text-white">CLICOM</span>
          </div>
          <p className="text-white/40 leading-relaxed max-w-md">Agence digitale suisse dediee aux PME. Creation de sites web, visibilite sur Google et marketing digital.</p>
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
            <p><a href="mailto:hello@clicom.ch" className="text-white/50 hover:text-white transition-colors">hello@clicom.ch</a></p>
            <p><a href="tel:+41788238950" className="text-white/50 hover:text-white transition-colors">078 823 89 50</a></p>
            <p className="text-white/30">Vevey - Suisse romande</p>
            <Link href="/contact" className="text-white/50 hover:text-white transition-colors block">Nous ecrire</Link>
          </div>
        </div>
      </div>
      <div className="pt-8 border-t border-white/5 text-center">
        <p className="text-sm text-white/30">c 2026 CLICOM. Tous droits reserves.</p>
      </div>
    </div>
  </footer>
)
Footer.displayName = 'Footer'

export default function HomePage() {
  const scrolled = useScrollHandler()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <Head>
        <title>CLICOM | Agence digitale pour PME suisses</title>
        <meta name="description" content="Creation de sites web, visibilite Google et marketing digital pour PME en Suisse romande. Devis gratuit sous 24h." />
      </Head>
      <div className="min-h-screen bg-white text-slate-800 selection:bg-brand-200 selection:text-brand-900">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-white p-2 rounded shadow">Aller au contenu principal</a>
        <Navbar scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        {menuOpen && (
          <div className="fixed inset-0 z-[45] bg-white flex flex-col items-center justify-center space-y-8 lg:hidden animate-slide-down">
            {NAV_LINKS.map(link => (
              link.id === 'home' ? (
                <button key={link.id} onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false) }} className="text-2xl font-medium text-slate-800 hover:text-brand-600 transition-colors">Accueil</button>
              ) : (
                <Link key={link.id} href={link.href} onClick={() => setMenuOpen(false)} className="text-2xl font-medium text-slate-800 hover:text-brand-600 transition-colors">{link.label}</Link>
              )
            ))}
            <Link href="/devis" onClick={() => setMenuOpen(false)} className="px-10 py-4 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-all">Demander un devis</Link>
          </div>
        )}

        <main id="main-content">
          {/* Hero */}
          <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
            <Particles />
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
              <div className="animate-fade-in">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-white/90 mb-8 border border-white/20 backdrop-blur-sm animate-slide-up">
                  <Icon name="star" size={16} className="text-accent-400" /> Agence digitale basee a Vevey - Suisse romande
                </span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-8 tracking-tight text-white">Votre agence digitale <br /> pour <span className="text-accent-400">PME suisses</span></h1>
                <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">Nous creons des sites web professionnels, ameliorons votre visibilite sur Google et vous accompagnons dans votre strategie digitale.</p>
                <div className="flex flex-wrap justify-center gap-6 mb-16">
                  {[{ value: '98%', label: 'Clients satisfaits' }, { value: '<24h', label: 'Delai de reponse' }, { value: '50+', label: 'Projets realises' }].map((s, i) => (
                    <div key={i} className="text-center px-8 py-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 animate-slide-up" style={{ animationDelay: `${i * 0.2}s` }}>
                      <div className="text-3xl md:text-4xl font-bold text-accent-400">{s.value}</div>
                      <div className="text-sm text-white/60 font-medium mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/services" className="px-10 py-5 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform duration-300">Decouvrir nos services</Link>
                  <Link href="/devis" className="px-10 py-5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20">Demander un devis gratuit</Link>
                </div>
              </div>
            </div>
          </section>

          {/* Services */}
          <section id="services" className="py-24 md:py-32 bg-white px-6">
            <div className="max-w-7xl mx-auto">
              <Reveal><SectionTitle subtitle="Nos services" title="Ce que nous faisons pour vous" /></Reveal>
              <div className="grid md:grid-cols-2 gap-8">
                {SERVICES_DATA.map((s, i) => (
                  <Reveal key={s.id} delay={i * 100}>
                    <Link href={s.href} className="block p-8 md:p-10 bg-slate-50 rounded-2xl hover:shadow-soft transition-all group border border-slate-100 hover:border-brand-200 hover:bg-white">
                      <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-brand-600 transition-colors">{s.title}</h3>
                      <p className="text-slate-600 mb-6 leading-relaxed">{s.desc}</p>
                      <div className="flex flex-wrap gap-2">{s.tags.map(tag => <span key={tag} className="px-3 py-1.5 bg-brand-50 text-brand-700 text-xs font-medium rounded-lg">{tag}</span>)}</div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* 3 piliers */}
          <section className="py-24 md:py-32 bg-slate-50 px-6">
            <div className="max-w-7xl mx-auto">
              <Reveal><SectionTitle subtitle="Notre methode" title="Pourquoi choisir CLICOM ?" /></Reveal>
              <div className="grid md:grid-cols-3 gap-10">
                {PILIERS.map((p, i) => (
                  <Reveal key={p.id} delay={i * 150}>
                    <div className="text-center p-8 md:p-10 bg-white rounded-2xl shadow-soft hover:shadow-glow transition-all">
                      <div className="text-6xl font-black text-brand-600/10 mb-6">{p.number}</div>
                      <div className="w-16 h-1 bg-gradient-to-r from-brand-500 to-accent-500 rounded-full mx-auto mb-6" />
                      <h3 className="text-2xl font-bold mb-4 text-slate-900">{p.title}</h3>
                      <p className="text-slate-600 leading-relaxed mb-6">{p.desc}</p>
                      <div className="flex flex-wrap justify-center gap-2">{p.tags.map(tag => <span key={tag} className="px-3 py-1.5 bg-brand-50 text-brand-700 text-xs font-medium rounded-lg">{tag}</span>)}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Temoignages */}
          <section className="py-24 md:py-32 bg-brand-900 px-6">
            <div className="max-w-7xl mx-auto">
              <Reveal>
                <div className="text-center mb-16">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white/90 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-white/20">Ils nous font confiance</span>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Ce que disent nos clients</h2>
                  <div className="w-20 h-1 bg-accent-500 rounded-full mx-auto mt-6" />
                </div>
              </Reveal>
              <div className="grid md:grid-cols-3 gap-8">
                {TESTIMONIALS.map((t, i) => (
                  <Reveal key={t.id} delay={i * 150}>
                    <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 h-full flex flex-col hover:bg-white/10 transition-all">
                      <Icon name="quote" size={28} className="text-accent-400 mb-4" />
                      <p className="text-white/80 leading-relaxed mb-6 flex-grow">"{t.text}"</p>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-brand-600 flex items-center justify-center font-bold text-white">{t.initials}</div>
                        <div><p className="font-bold text-white">{t.name}</p><p className="text-xs text-white/50 uppercase tracking-wider">{t.type}</p></div>
                      </div>
                      <div className="pt-4 border-t border-white/10"><span className="text-accent-400 font-bold text-lg">{t.result}</span></div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Tarifs */}
          <section id="tarifs" className="py-24 md:py-32 bg-white px-6">
            <div className="max-w-7xl mx-auto">
              <Reveal><SectionTitle subtitle="Tarifs transparents" title="Jusqu'a 5 fois moins cher que le marche" /></Reveal>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[{ title: 'Site Web', price: "1'800 CHF", sub: 'paiement unique', features: ['Design sur mesure', 'SEO de base inclus', 'Formulaire