'use client'

import { useState, useEffect, useRef, useCallback, memo } from 'react'

// --- Données externes ---
const NAV_LINKS = [
  { id: 'home', label: 'Accueil' },
  { id: 'services', label: 'Services' },
  { id: 'method', label: 'Méthode' },
  { id: 'tarifs', label: 'Tarifs' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
]

const SERVICES_DATA = [
  {
    id: 1,
    title: 'Sites web',
    desc: 'Création de sites web professionnels, vitrines et e-commerce. Design moderne, performance optimale et expérience utilisateur irréprochable pour convertir vos visiteurs.',
    tags: ['Design moderne', 'SEO', 'Responsive', 'Performance'],
  },
  {
    id: 2,
    title: 'Marketing & Pub',
    desc: 'Stratégies marketing digitales qui génèrent des résultats mesurables. Campagnes publicitaires ciblées et acquisition de clients qualifiés.',
    tags: ['Google Ads', 'Facebook Ads', 'ROI', 'Conversion'],
  },
  {
    id: 3,
    title: 'SEO & AEO',
    desc: "Optimisation pour les moteurs de recherche et Answer Engine Optimization. Positionnement stratégique pour être trouvé par vos clients.",
    tags: ['Référencement', 'AEO', 'Visibilité', 'Trafic qualifié'],
  },
  {
    id: 4,
    title: 'Réseaux sociaux',
    desc: 'Gestion de vos réseaux sociaux pour renforcer votre marque et engager votre communauté. Contenu créatif et stratégie de publication.',
    tags: ['Instagram', 'LinkedIn', 'Facebook', 'Contenu'],
  },
]

const TESTIMONIALS = [
  {
    id: 1,
    initials: 'PV',
    name: 'PME industrielle Vaud',
    type: 'Industrie',
    text: "CLICOM a transformé notre présence digitale. Le nouveau site web a doublé nos demandes de devis en 3 mois. Un investissement très rentable pour notre entreprise.",
    result: '+125% de demandes',
  },
  {
    id: 2,
    initials: 'CG',
    name: 'Cabinet Genève',
    type: 'Services',
    text: 'Professionnalisme et réactivité. Notre référencement nous a positionnés en tête des recherches locales. Les clients nous trouvent facilement maintenant.',
    result: 'Top 3 Google',
  },
  {
    id: 3,
    initials: 'PF',
    name: 'PME B2B Fribourg',
    type: 'B2B',
    text: "L'accompagnement local fait toute la différence. CLICOM comprend nos enjeux spécifiques et nous conseille avec pertinence. Vraiment satisfait.",
    result: '+45% de leads qualifiés',
  },
]

const BLOG_POSTS = [
  {
    id: 1,
    category: 'Création Web',
    date: '25 mars 2026',
    title: "Pourquoi votre entreprise suisse a besoin d'un site internet en 2026.",
    excerpt: "À l'ère du numérique, une présence en ligne professionnelle n'est plus optionnelle. Découvrez pourquoi investir dans un site web est aujourd'hui indispensable pour rester compétitif sur le marché suisse.",
  },
  {
    id: 2,
    category: 'Intelligence Artificielle',
    date: '14 mars 2026',
    title: "Transformer votre entreprise grâce à l'Intelligence Artificielle.",
    excerpt: "L'IA n'est plus réservée aux grandes entreprises. Explorez comment les PME peuvent tirer profit des outils d'intelligence artificielle pour automatiser, optimiser et accélérer leur croissance.",
  },
  {
    id: 3,
    category: 'Marketing',
    date: '5 mars 2026',
    title: "Les fondamentaux de l'Inbound Marketing pour les PME.",
    excerpt: "Attirer des clients qualifiés sans prospection agressive : c'est la promesse de l'inbound marketing. Découvrez les stratégies concrètes adaptées aux PME pour générer des leads durables.",
  },
]

const PILIERS = [
  {
    id: 1,
    number: '01',
    title: 'Sites rapides',
    desc: 'Des sites web ultra-performants optimisés pour la conversion et le référencement. Chaque ligne de code est pensée pour offrir une expérience utilisateur exceptionnelle sur tous les appareils.',
    tags: ['Performance Web', 'SEO optimisé', 'Mobile-first'],
  },
  {
    id: 2,
    number: '02',
    title: 'Marketing rentable',
    desc: "Stratégies digitales qui génèrent un ROI mesurable. Nous mettons l'accent sur les actions qui rapportent : acquisition ciblée, conversion et fidélisation.",
    tags: ['ROI mesurable', 'Acquisition ciblée', 'Conversion'],
  },
  {
    id: 3,
    number: '03',
    title: 'Accompagnement local',
    desc: 'Un partenaire de proximité qui comprend vos enjeux spécifiques à la Suisse romande. Disponibilité, réactivité et expertise au service de votre croissance.',
    tags: ['Suisse romande', 'Support réactif', 'Expertise locale'],
  },
]

// Projets "En coulisses" – utilisés pour le filtrage
const BEHIND_SCENES_PROJECTS = [
  { id: 1, title: 'Site Vitrine PME (En cours)', client: 'Client Confidentiel', type: 'Création Web', tags: ['Next.js', 'Design', 'SEO'], color: '#1d4ed8' },
  { id: 2, title: 'Refonte E-commerce (En cours)', client: 'Boutique Suisse', type: 'E-commerce', tags: ['Shopify', 'UX/UI'], color: '#f59e0b' },
  { id: 3, title: 'Nouvelle Identité Visuelle', client: 'Startup Locale', type: 'Branding', tags: ['Logo', 'Charte Graphique'], color: '#1e3a8a' },
]

const FILTER_OPTIONS = ['Tous', 'Création Web', 'E-commerce', 'Branding']

// --- Icônes optimisées (composants statiques mémoisés) ---
const Icons = {
  arrowRight: ({ size = 24, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  check: ({ size = 24, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  menu: ({ size = 24, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  x: ({ size = 24, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  quote: ({ size = 24, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3 21c3 0 7-1 7-8V5c0-1 0-2-2-2H4c-1 0-2 1-2 2v6c0 1 0 2 2 2h2v2c0 2-1 3-3 3zm14 0c3 0 7-1 7-8V5c0-1 0-2-2-2h-4c-1 0-2 1-2 2v6c0 1 0 2 2 2h2v2c0 2-1 3-3 3z" />
    </svg>
  ),
  phone: ({ size = 24, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  mail: ({ size = 24, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4L12 13 2 4" />
    </svg>
  ),
}

const Icon = memo(({ name, size = 24, className = '' }: { name: keyof typeof Icons; size?: number; className?: string }) => {
  const IconComponent = Icons[name]
  return IconComponent ? <IconComponent size={size} className={className} /> : null
})
Icon.displayName = 'Icon'

// --- Composant Badge ---
const Badge = memo(({ children, color = 'purple' }: { children: React.ReactNode; color?: string }) => {
  const colorClass = color === 'green' ? 'text-accent-400 border-accent-400' : 'text-white/60 border-white/20'
  return (
    <span className={`inline-block px-4 py-1.5 border-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] mb-6 ${colorClass}`}>
      {children}
    </span>
  )
})
Badge.displayName = 'Badge'

// --- Hook Intersection Observer pour animations au scroll ---
const useReveal = (threshold = 0.1) => {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

const Reveal = memo(({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
})
Reveal.displayName = 'Reveal'

// --- Formulaire de contact avec envoi API ---
const ContactForm = memo(() => {
  const [step, setStep] = useState<'start' | 'loading' | 'success' | 'error'>('start')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return
    setStep('loading')
    try {
      // Simulation d'appel API – remplacez par votre endpoint réel
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Exemple avec fetch réel:
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData), headers: { 'Content-Type': 'application/json' } })
      setStep('success')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setStep('error')
      setTimeout(() => setStep('start'), 2000)
    }
  }

  return (
    <div className="bg-white p-8 md:p-12 border-[5px] border-[#3b1b8b] shadow-2xl relative min-h-[450px] flex flex-col justify-center text-slate-900">
      {step === 'start' && (
        <div className="space-y-6">
          <h3 className="text-3xl font-black tracking-tighter">Parlons de vos objectifs</h3>
          <p className="text-slate-500 font-medium">Prêts pour 2026 ?</p>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Nom"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 bg-slate-50 border-none focus:ring-2 focus:ring-brand-600 outline-none font-bold"
              aria-label="Votre nom"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 bg-slate-50 border-none focus:ring-2 focus:ring-brand-600 outline-none font-bold"
              aria-label="Votre email"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 bg-slate-50 border-none focus:ring-2 focus:ring-brand-600 outline-none font-bold resize-none"
              aria-label="Votre message"
            />
            <button
              onClick={handleSubmit}
              disabled={!formData.name || !formData.email || !formData.message}
              className="w-full py-4 bg-brand-600 text-white font-black text-lg hover:bg-brand-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ENVOYER LE MESSAGE
            </button>
          </div>
        </div>
      )}
      {step === 'loading' && (
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 font-bold">Envoi en cours...</p>
        </div>
      )}
      {step === 'success' && (
        <div className="text-center space-y-6 animate-in fade-in duration-500">
          <div className="w-20 h-20 bg-accent-500 text-[#3b1b8b] rounded-full flex items-center justify-center mx-auto">
            <Icon name="check" size={40} />
          </div>
          <h3 className="text-3xl font-black">Message envoyé !</h3>
          <p className="text-slate-500 font-medium">
            On analyse votre demande. <br />
            Réponse garantie sous 24h.
          </p>
          <button
            onClick={() => setStep('start')}
            className="px-6 py-2 border border-slate-200 font-bold text-slate-400 hover:text-brand-600 transition-colors"
          >
            Fermer
          </button>
        </div>
      )}
      {step === 'error' && (
        <div className="text-center text-red-600 font-bold">
          Une erreur est survenue. Veuillez réessayer.
        </div>
      )}
    </div>
  )
})
ContactForm.displayName = 'ContactForm'

// --- Hooks personnalisés ---
const useScrollHandler = () => {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return scrolled
}

// Fonction de scroll avec offset pour le header fixe
const scrollToElement = (id: string, offset = 80) => {
  const el = document.getElementById(id)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

// --- PAGE PRINCIPALE ---
export default function HomePage() {
  const scrolled = useScrollHandler()
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('Tous')

  const scrollTo = useCallback((id: string) => {
    scrollToElement(id)
    setMenuOpen(false)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const filteredProjects = BEHIND_SCENES_PROJECTS.filter(project =>
    filter === 'Tous' ? true : project.type === filter
  )

  return (
    <div className="min-h-screen bg-brand-900 text-white selection:bg-accent-500 selection:text-[#3b1b8b]">
      {/* NAVIGATION */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-white/95 backdrop-blur-md py-3 shadow-xl' : 'bg-transparent py-6'
        }`}
        role="navigation"
        aria-label="Navigation principale"
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button onClick={scrollToTop} className="flex items-center gap-3 cursor-pointer group" aria-label="Retour en haut">
            <div
              className={`w-9 h-9 flex items-center justify-center font-black text-lg transition-all duration-500 ${
                scrolled ? 'bg-brand-600 text-white' : 'bg-white text-brand-600'
              }`}
            >
              C
            </div>
            <span
              className={`text-xl font-black tracking-tighter transition-colors ${
                scrolled ? 'text-slate-900' : 'text-white'
              }`}
            >
              CLICOM
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-[11px] font-black uppercase tracking-widest transition-colors ${
                  scrolled ? 'text-slate-500 hover:text-brand-600' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="px-6 py-2.5 font-black text-[11px] uppercase tracking-widest transition-all bg-brand-600 text-white shadow-lg hover:bg-brand-900"
            >
              Démarrer un projet
            </button>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            <Icon name={menuOpen ? 'x' : 'menu'} className={scrolled ? 'text-slate-900' : 'text-white'} />
          </button>
        </div>
      </nav>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[45] bg-brand-900 flex flex-col items-center justify-center space-y-8 lg:hidden animate-in slide-in-from-top duration-300"
          role="dialog"
          aria-label="Menu mobile"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-2xl font-black uppercase tracking-widest text-white hover:text-accent-400 transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            className="px-10 py-4 bg-accent-500 text-[#3b1b8b] font-black uppercase tracking-widest hover:scale-105 transition-transform"
            onClick={() => scrollTo('contact')}
          >
            Démarrer un projet
          </button>
        </div>
      )}

      <main>
        {/* HERO */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-[15%] left-[20%] w-[200px] h-[200px] bg-gradient-radial from-accent-400/10 to-transparent rounded-full animate-float" />
            <div className="absolute top-[25%] left-[70%] w-[200px] h-[200px] bg-gradient-radial from-accent-400/10 to-transparent rounded-full animate-float animation-delay-1000" />
            <div className="absolute top-[70%] left-[10%] w-[200px] h-[200px] bg-gradient-radial from-accent-400/10 to-transparent rounded-full animate-float animation-delay-2000" />
            <div className="absolute top-[80%] left-[80%] w-[200px] h-[200px] bg-gradient-radial from-accent-400/10 to-transparent rounded-full animate-float animation-delay-3000" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
            <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <Badge color="green">Agence digitale — Suisse romande</Badge>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-6 tracking-tighter">
                Agence digitale <br /> pour PME en <span className="text-accent-400">Suisse romande</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10 font-medium leading-relaxed">
                Nous propulsons votre PME suisse avec des sites web professionnels, des identités visuelles et des stratégies de visibilité digitale qui génèrent du chiffre d&apos;affaires.
              </p>
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                <div className="text-center">
                  <div className="text-3xl font-black text-accent-400">98%</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-white/60">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-accent-400">&lt;24h</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-white/60">Réponse</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-accent-400">50+</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-white/60">Projets livrés</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => scrollTo('services')}
                  className="px-8 py-4 bg-accent-500 text-[#3b1b8b] font-black text-base hover:scale-105 transition-transform shadow-2xl"
                >
                  DÉCOUVRIR NOS SERVICES
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="px-8 py-4 border-2 border-white text-white font-black text-base hover:bg-white hover:text-[#3b1b8b] transition-all"
                >
                  DEMANDER UN DEVIS
                </button>
              </div>
              <div className="mt-16 animate-bounce">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">Scroll pour découvrir</p>
                <div className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto flex justify-center">
                  <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-24 md:py-32 bg-white text-slate-900 px-6">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="text-center mb-16">
                <span className="text-brand-600 font-black uppercase tracking-[0.3em] text-xs">Nos services</span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mt-4">Ce que nous créons pour vous</h2>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8">
              {SERVICES_DATA.map((s, i) => (
                <Reveal key={s.id} delay={i * 100}>
                  <div className="p-8 md:p-10 bg-slate-50 border-l-[8px] border-brand-600 hover:shadow-xl transition-shadow h-full flex flex-col group">
                    <h3 className="text-2xl font-black mb-4 group-hover:text-brand-600 transition-colors">{s.title}</h3>
                    <p className="text-slate-500 mb-6 font-medium leading-relaxed flex-grow">{s.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-brand-600/10 text-brand-600 text-[10px] font-black uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* EN COULISSES (avec filtrage fonctionnel) */}
        <section className="py-24 md:py-32 bg-slate-50 text-slate-900 px-6">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="text-center mb-16">
                <span className="text-brand-600 font-black uppercase tracking-[0.3em] text-xs">En Coulisses</span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mt-4">Ce que nous préparons</h2>
                <p className="text-lg text-slate-500 mt-4 max-w-2xl mx-auto">
                  L&apos;agence vient d&apos;ouvrir ses portes, mais nos claviers chauffent déjà ! Voici un aperçu des projets sur lesquels nous travaillons actuellement.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {FILTER_OPTIONS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-5 py-2 text-[11px] font-black uppercase tracking-widest transition-all ${
                      filter === f
                        ? 'bg-brand-600 text-white'
                        : 'bg-white text-slate-400 hover:text-brand-600 border border-slate-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
              {filteredProjects.map((project, i) => (
                <Reveal key={project.id} delay={i * 150}>
                  <div className="bg-white p-8 border-l-[8px] hover:shadow-xl transition-shadow" style={{ borderLeftColor: project.color }}>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">En cours de création</p>
                    <p className="text-sm font-bold text-brand-600 mb-3">{project.client}</p>
                    <h3 className="text-xl font-black mb-4">{project.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12 text-slate-400 font-bold">Aucun projet dans cette catégorie pour le moment.</div>
            )}

            <Reveal delay={400}>
              <div className="text-center mt-12">
                <p className="text-slate-400 font-bold text-sm">Faites partie des prochains</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 3 PILIERS */}
        <section className="py-24 md:py-32 bg-white text-slate-900 px-6">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="text-center mb-16">
                <span className="text-brand-600 font-black uppercase tracking-[0.3em] text-xs">Nos 3 piliers</span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mt-4">Pourquoi CLICOM</h2>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-10">
              {PILIERS.map((p, i) => (
                <Reveal key={p.id} delay={i * 150}>
                  <div className="text-center p-8">
                    <div className="text-7xl font-black text-brand-600/10 mb-6">{p.number}</div>
                    <h3 className="text-2xl font-black mb-4">{p.title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed mb-6">{p.desc}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {p.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-brand-600/10 text-brand-600 text-[10px] font-black uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* TÉMOIGNAGES */}
        <section className="py-24 md:py-32 bg-slate-900 px-6">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="text-center mb-16">
                <Badge color="green">Ils nous font confiance</Badge>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">Résultats mesurables</h2>
                <p className="text-lg text-white/50 mt-4 max-w-2xl mx-auto">
                  Découvrez comment nos clients en Suisse romande transforment leur présence digitale avec CLICOM.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={t.id} delay={i * 150}>
                  <div className="bg-white/5 p-8 border border-white/10 h-full flex flex-col hover:bg-white/10 transition-colors">
                    <div className="text-accent-400 mb-4">
                      <Icon name="quote" size={24} />
                    </div>
                    <p className="text-white/80 font-medium leading-relaxed mb-6 flex-grow">"{t.text}"</p>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center font-black text-sm">
                        {t.initials}
                      </div>
                      <div>
                        <p className="font-black text-white text-sm">{t.name}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{t.type}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <span className="text-accent-400 font-black text-lg">{t.result}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* TARIFS */}
        <section id="tarifs" className="py-24 md:py-32 bg-white text-slate-900 px-6">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="text-center mb-16">
                <span className="text-brand-600 font-black uppercase tracking-[0.3em] text-xs">Tarifs transparents</span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mt-4">Jusqu&apos;à 5× moins cher que le marché</h2>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Reveal delay={0}>
                <div className="bg-slate-50 p-8 border-l-[8px] border-brand-600 hover:shadow-xl transition-shadow flex flex-col h-full">
                  <h3 className="text-2xl font-black mb-2">Site Web</h3>
                  <div className="text-5xl font-black text-brand-600 mb-2">1&apos;800<span className="text-lg text-slate-400">CHF</span></div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">paiement unique</p>
                  <p className="text-xs font-bold text-accent-400 mb-8">Le marché facture 2&apos;000–6&apos;000 CHF</p>
                  <ul className="space-y-3 mb-8 flex-grow">
                    {['Design premium sur mesure', 'SEO de base inclus', 'Formulaire de contact', 'Hébergement 1 an offert', 'Responsive mobile & tablette', 'Livraison en 3 semaines'].map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-sm font-medium text-slate-600">
                        <Icon name="check" size={16} className="text-accent-400 mt-0.5 flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => scrollTo('contact')} className="w-full py-4 bg-brand-600 text-white font-black text-sm hover:bg-brand-900 transition-all">
                    Démarrer mon projet
                  </button>
                </div>
              </Reveal>

              <Reveal delay={150}>
                <div className="bg-slate-50 p-8 border-l-[8px] border-accent-400 hover:shadow-xl transition-shadow flex flex-col h-full">
                  <h3 className="text-2xl font-black mb-2">E-commerce</h3>
                  <div className="text-5xl font-black text-brand-600 mb-2">3&apos;900<span className="text-lg text-slate-400">CHF</span></div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">paiement unique</p>
                  <p className="text-xs font-bold text-accent-400 mb-8">Le marché facture 5&apos;000–15&apos;000 CHF</p>
                  <ul className="space-y-3 mb-8 flex-grow">
                    {['Boutique en ligne complète', 'Gestion des stocks', 'Paiements sécurisés', 'SEO avancé', 'Design responsive', 'Support 30 jours'].map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-sm font-medium text-slate-600">
                        <Icon name="check" size={16} className="text-accent-400 mt-0.5 flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => scrollTo('contact')} className="w-full py-4 bg-brand-600 text-white font-black text-sm hover:bg-brand-900 transition-all">
                    Démarrer mon projet
                  </button>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div className="bg-slate-50 p-8 border-l-[8px] border-brand-600 hover:shadow-xl transition-shadow flex flex-col h-full">
                  <h3 className="text-2xl font-black mb-2">Marketing</h3>
                  <div className="text-5xl font-black text-brand-600 mb-2">Sur<span className="text-lg text-slate-400">devis</span></div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">stratégie personnalisée</p>
                  <p className="text-xs font-bold text-accent-400 mb-8">Des résultats mesurables garantis</p>
                  <ul className="space-y-3 mb-8 flex-grow">
                    {['Stratégie sur mesure', 'Campagnes publicitaires', 'Gestion des réseaux', 'Reporting mensuel', 'Optimisation continue', 'Support dédié'].map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-sm font-medium text-slate-600">
                        <Icon name="check" size={16} className="text-accent-400 mt-0.5 flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => scrollTo('contact')} className="w-full py-4 bg-brand-600 text-white font-black text-sm hover:bg-brand-900 transition-all">
                    Demander un devis
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* BLOG */}
        <section id="blog" className="py-24 md:py-32 bg-slate-50 text-slate-900 px-6">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="text-center mb-16">
                <span className="text-brand-600 font-black uppercase tracking-[0.3em] text-xs">Blog & Actus</span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mt-4">Derniers articles</h2>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
              {BLOG_POSTS.map((post, i) => (
                <Reveal key={post.id} delay={i * 150}>
                  <article className="bg-white p-8 hover:shadow-xl transition-all cursor-pointer">
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest mb-4">
                      <span className="text-brand-600">{post.category}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-400">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-black mb-4 leading-tight hover:text-brand-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 font-medium leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                    <button className="text-brand-600 font-black text-[11px] uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                      Lire la suite
                      <Icon name="arrowRight" size={14} />
                    </button>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 md:py-32 bg-slate-900 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <Reveal>
                <div>
                  <Badge color="green">Démarrons ensemble</Badge>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">
                    Prêt à propulser <br /> votre entreprise ?
                  </h2>
                  <p className="text-white/70 text-lg font-medium leading-relaxed mb-8">
                    Remplissez le formulaire ou contactez-nous directement. On vous répond sous 24h.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                        <Icon name="phone" size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-white/50">Téléphone</p>
                        <p className="font-bold text-white">+41 00 000 00 00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                        <Icon name="mail" size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-white/50">Email</p>
                        <p className="font-bold text-white">hello@clicom.ch</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-12 bg-slate-900 text-white/60 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center gap-8 mb-6 flex-wrap">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
          <p className="text-sm font-medium">
            © 2026 CLICOM - Agence digitale Suisse romande. Tous droits réservés.
          </p>
        </div>
      </footer>

      {/* Ajout des animations personnalisées via style global (nécessite que Tailwind les reconnaisse) */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .bg-gradient-radial {
          background: radial-gradient(circle, rgba(118,255,3,0.1) 0%, rgba(118,255,3,0) 70%);
        }
      `}</style>
    </div>
  )
}