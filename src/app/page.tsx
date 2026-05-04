'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
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
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image avec effet premium */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-agence-digitale-pme-suisse.webp"
              alt="agence digitale pour pme suisses clicom vevey"
              fill
              className="object-cover object-top"
              priority
              sizes="100vw"
              quality={95}
            />
          </div>
          
          {/* Overlay subtil pour meilleure visibilité de l'image */}
          <div className="absolute inset-0 bg-black/30 z-[1]" />
          
          {/* Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-24 pb-16">
            {/* Badge premium animé */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2.5 px-6 py-3 bg-white/5 rounded-full text-sm font-bold text-white mb-10 border border-white/20 backdrop-blur-xl shadow-2xl">
                <Icon name="star" size={18} className="text-accent-400" />
                <span className="tracking-wide">Agence digitale basée à Vevey • Suisse romande</span>
              </span>
            </motion.div>

            {/* Titre principal avec typographie premium */}
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-black leading-normal pb-4 mb-10 tracking-[-0.02em] py-2"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="block text-white drop-shadow-lg py-2">
                Propulsez votre PME
              </span>
              <span className="block mt-3 text-white drop-shadow-lg py-2 bg-gradient-to-r from-accent-300 via-accent-400 to-brand-300 bg-clip-text">
                vers le succès digital
              </span>
            </motion.h1>

            {/* Sous-titre premium */}
            <motion.p
              className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-16 leading-relaxed font-medium py-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              Sites web performants, référencement SEO optimisé et stratégie digitale sur-mesure.
              <span className="block mt-3 text-accent-300 font-semibold text-lg">Votre partenaire digital en Suisse romande.</span>
            </motion.p>

            {/* Stats Cards premium avec animations décalées */}
            <motion.div
              className="flex flex-wrap justify-center gap-8 mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {HERO_STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="group text-center px-10 py-6 bg-white/5 rounded-3xl backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-accent-400/50 hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-accent-500/20"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -8 }}
                >
                  <div className="text-5xl md:text-6xl font-black bg-gradient-to-br from-accent-300 via-accent-400 to-brand-400 bg-clip-text text-transparent mb-2">
                    {s.value}
                  </div>
                  <div className="text-sm text-white/80 font-bold tracking-wider uppercase">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons premium avec hover sophistiqué */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href="/services"
                  className="group inline-flex items-center justify-center gap-3 px-12 py-6 bg-gradient-to-r from-accent-500 via-accent-600 to-accent-500 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-accent-500/40 hover:shadow-3xl hover:shadow-accent-500/60 transition-all duration-500"
                >
                  <span>Découvrir nos services</span>
                  <Icon name="arrowRight" size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href="/devis"
                  className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-white/5 text-white font-bold text-lg rounded-2xl hover:bg-white/15 transition-all duration-300 backdrop-blur-xl border-2 border-white/20 hover:border-white/40 shadow-2xl hover:shadow-white/10"
                >
                  <Icon name="mail" size={20} />
                  <span>Devis gratuit</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom fade premium pour transition douce */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent z-[2]" />
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
                    className="flex flex-col h-full bg-slate-50 rounded-2xl hover:shadow-soft transition-all group border border-slate-100 hover:border-brand-200 hover:bg-white overflow-hidden"
                  >
                    <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-slate-100">
                      <Image
                        src={s.image}
                        alt={s.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    <div className="p-8 md:p-10">
                      <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-brand-600 transition-colors">{s.title}</h3>
                      <p className="text-slate-600 mb-6 leading-relaxed">{s.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {s.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1.5 bg-brand-50 text-brand-700 text-xs font-medium rounded-lg">{tag}</span>
                        ))}
                      </div>
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
                  <div className="text-center bg-white rounded-2xl shadow-soft hover:shadow-glow transition-all group h-full overflow-hidden flex flex-col">
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
                      <Image
                        src={p.image}
                        alt={p.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-8 md:p-10 flex-1 flex flex-col">
                      <div className="text-6xl font-black text-brand-600/10 mb-6">{p.number}</div>
                      <div className="w-16 h-1 bg-gradient-to-r from-brand-500 to-accent-500 rounded-full mx-auto mb-6" />
                      <h3 className="text-2xl font-bold mb-4 text-slate-900">{p.title}</h3>
                      <p className="text-slate-600 leading-relaxed mb-6 flex-1">{p.desc}</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {p.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1.5 bg-brand-50 text-brand-700 text-xs font-medium rounded-lg">{tag}</span>
                        ))}
                      </div>
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
                  <div className="bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand-200 hover:shadow-soft transition-all h-full flex flex-col overflow-hidden group">
                    <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-slate-100">
                      <Image
                        src={plan.image}
                        alt={plan.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    <div className="p-8 flex flex-col flex-1">
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
                  <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-soft border border-slate-100 hover:border-brand-200 transition-all group">
                    <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-slate-100">
                      <Image
                        src={post.image}
                        alt={post.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">{post.category}</span>
                        <span className="text-xs text-slate-400">{post.date}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-slate-900 group-hover:text-brand-600 transition-colors">{post.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">{post.excerpt}</p>
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



