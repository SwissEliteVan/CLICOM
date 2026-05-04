import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Icon from '@/components/Icon'
import Badge from '@/components/Badge'
import Reveal from '@/components/Reveal'
import SectionTitle from '@/components/SectionTitle'
import PopupCapture from '@/components/PopupCapture'
import HomeContactForm from '@/components/HomeContactForm'
import { SERVICES_DATA } from '@/data/services'
import { TESTIMONIALS } from '@/data/testimonials'
import { BLOG_POSTS } from '@/data/blog'
import { PILIERS } from '@/data/pillars'
import { PRICING_PLANS } from '@/data/pricing'

const HERO_STATS = [
  { value: '98%', label: 'Clients satisfaits' },
  { value: '<24h', label: 'Delai de reponse' },
  { value: '50+', label: 'Projets realises' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-brand-200 selection:text-brand-900">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-white p-2 rounded shadow">
        Aller au contenu principal
      </a>

      <Navbar transparent />

      <main id="main-content">
        {/* Hero */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
          <Image
            src="/images/hero-agence-digitale-pme-suisse.webp"
            alt="agence digitale pour pme suisses clicom vevey"
            fill
            className="object-cover z-0"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-900/65 to-brand-900/75 z-[1]" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-white/90 mb-8 border border-white/20 backdrop-blur-sm animate-slide-up">
                <Icon name="star" size={16} className="text-accent-400" /> Agence digitale basee a Vevey - Suisse romande
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-8 tracking-tight text-white">
                Votre agence digitale <br /> pour <span className="text-accent-400">PME suisses</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
                Nous creons des sites web professionnels, ameliorons votre visibilite sur Google et vous accompagnons dans votre strategie digitale.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mb-16">
                {HERO_STATS.map((s, i) => (
                  <div
                    key={s.label}
                    className="text-center px-8 py-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 animate-slide-up"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    <div className="text-3xl md:text-4xl font-bold text-accent-400">{s.value}</div>
                    <div className="text-sm text-white/60 font-medium mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services" className="px-10 py-5 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform duration-300">
                  Decouvrir nos services
                </Link>
                <Link href="/devis" className="px-10 py-5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20">
                  Demander un devis gratuit
                </Link>
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
                  <Link
                    href={s.href}
                    className="block p-8 md:p-10 bg-slate-50 rounded-2xl hover:shadow-soft transition-all group border border-slate-100 hover:border-brand-200 hover:bg-white"
                  >
                    <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-brand-600 transition-colors">{s.title}</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">{s.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1.5 bg-brand-50 text-brand-700 text-xs font-medium rounded-lg">{tag}</span>
                      ))}
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Methode (Piliers) */}
        <section id="method" className="py-24 md:py-32 bg-slate-50 px-6">
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
                    <div className="flex flex-wrap justify-center gap-2">
                      {p.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1.5 bg-brand-50 text-brand-700 text-xs font-medium rounded-lg">{tag}</span>
                      ))}
                    </div>
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
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white/90 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-white/20">
                  Ils nous font confiance
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Ce que disent nos clients</h2>
                <div className="w-20 h-1 bg-accent-500 rounded-full mx-auto mt-6" />
              </div>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={t.id} delay={i * 150}>
                  <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 h-full flex flex-col hover:bg-white/10 transition-all">
                    <Icon name="quote" size={28} className="text-accent-400 mb-4" />
                    <p className="text-white/80 leading-relaxed mb-6 flex-grow">&quot;{t.text}&quot;</p>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-600 flex items-center justify-center font-bold text-white">{t.initials}</div>
                      <div>
                        <p className="font-bold text-white">{t.name}</p>
                        <p className="text-xs text-white/50 uppercase tracking-wider">{t.type}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <span className="text-accent-400 font-bold text-lg">{t.result}</span>
                    </div>
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
              {PRICING_PLANS.map((plan, i) => (
                <Reveal key={plan.title} delay={i * 100}>
                  <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-brand-200 hover:shadow-soft transition-all h-full flex flex-col">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.title}</h3>
                    <div className="text-3xl font-black text-brand-600 mb-2">{plan.price}</div>
                    <p className="text-sm text-slate-500 mb-6">{plan.sub}</p>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-slate-700 text-sm">
                          <Icon name="check" size={18} className="text-accent-500 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/devis" className="w-full py-4 text-center bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-brand-600 hover:text-brand-600 transition-all">
                      Demander un devis
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Blog */}
        <section id="blog" className="py-24 md:py-32 bg-slate-50 px-6">
          <div className="max-w-7xl mx-auto">
            <Reveal><SectionTitle subtitle="Notre blog" title="Dernieres actualites et conseils" /></Reveal>
            <div className="grid md:grid-cols-3 gap-8">
              {BLOG_POSTS.map((post, i) => (
                <Reveal key={post.id} delay={i * 100}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-soft border border-slate-100 hover:border-brand-200 transition-all group h-full flex flex-col">
                    <div className="p-8 flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">{post.category}</span>
                        <span className="text-xs text-slate-400">{post.date}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-slate-900 group-hover:text-brand-600 transition-colors">{post.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">{post.excerpt}</p>
                      <Link href={post.href} className="inline-flex items-center gap-2 text-brand-600 font-bold text-sm group-hover:gap-4 transition-all">
                        Lire l&apos;article <Icon name="arrowRight" size={16} />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 md:py-32 bg-white px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <div className="space-y-8">
                  <Badge>Contactez-nous</Badge>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                    Parlons de votre prochain <span className="text-brand-600">succes digital</span>
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Vous avez une question ou un projet ? Nous sommes la pour vous ecouter et vous proposer la meilleure solution adaptee a votre PME.
                  </p>
                  <div className="space-y-6 pt-4">
                    <div className="flex items-center gap-6 group">
                      <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-all">
                        <Icon name="mail" size={24} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Email</p>
                        <a href="mailto:hello@clicom.ch" className="text-lg font-bold text-slate-900 hover:text-brand-600 transition-colors">hello@clicom.ch</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 group">
                      <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-all">
                        <Icon name="phone" size={24} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Telephone</p>
                        <a href="tel:+41788238950" className="text-lg font-bold text-slate-900 hover:text-brand-600 transition-colors">078 823 89 50</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 group">
                      <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-all">
                        <Icon name="mapPin" size={24} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Localisation</p>
                        <p className="text-lg font-bold text-slate-900">Vevey, Suisse romande</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <HomeContactForm />
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <PopupCapture />
    </div>
  )
}
