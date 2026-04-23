import React, { useState, useEffect, useRef } from 'react';

// --- DATA ---
const NAV_LINKS = [
  { id: 'home', label: 'Accueil' },
  { id: 'solutions', label: 'Expertises' },
  { id: 'tarifs', label: 'Tarifs' },
  { id: 'contact', label: 'Contact' }
];

const SERVICES = [
  { id: 1, title: "Site Vitrine Pro", price: "2000 CHF", desc: "Design sur-mesure pour artisans et PME souhaitant une image d'excellence." },
  { id: 2, title: "E-commerce Performance", price: "4500 CHF", desc: "Boutique en ligne optimisée pour le taux de conversion et la vitesse." },
  { id: 3, title: "Stratégie SEO Local", price: "800 CHF/m", desc: "Soyez le premier choix quand vos clients vous cherchent sur Google." }
];

// --- STYLES CSS PERSONNALISÉS ---
const customCSS = `
  .app-container {
    visibility: hidden; /* Masqué jusqu'au chargement de Tailwind pour éviter le flash moche */
  }
  .tailwind-loaded .app-container {
    visibility: visible;
  }

  html { scroll-behavior: smooth; }

  /* --- PRELOADER --- */
  .preload {
    position: fixed; inset: 0; z-index: 9999;
    background-color: #7752d5;
    display: flex; align-items: center; justify-content: center;
    transition: opacity 0.5s ease-out, visibility 0.5s ease-out;
  }
  .preload.fade-out { opacity: 0; visibility: hidden; }
  
  .loading-circle {
    border-radius: 50%;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 50%; left: 50%;
    opacity: 0;
    animation: popCircle 2s infinite cubic-bezier(.5,.5,0,1);
  }
  .lc1 { background-color: #7752d5; width: 240px; height: 240px; margin: -120px 0 0 -120px; animation-delay: 0s; }
  .lc2 { background-color: #8362d9; width: 170px; height: 170px; margin: -85px 0 0 -85px; animation-delay: 0.4s; }
  .lc3 { background-color: #9f88d6; width: 100px; height: 100px; margin: -50px 0 0 -50px; animation-delay: 0.8s; }

  @keyframes popCircle {
    0% { transform: scale(0); opacity: 0; }
    25% { opacity: 1; }
    100% { transform: scale(1.5); opacity: 0; }
  }

  /* --- ARRIÈRE-PLAN HERO FIXÉ --- */
  .hero-bg-decor {
    position: absolute; inset: 0; z-index: 0;
    pointer-events: none; overflow: hidden;
  }

  .small-circles-wrapper {
    position: absolute; width: 100%; height: 100%;
    animation: infinite-rotation 150s infinite linear;
  }

  .small-circle {
    position: absolute; width: 250px; height: 250px;
    background: #3b1b8b; border-radius: 50%;
    margin-top: -125px; margin-left: -125px;
    animation: floatingAnim 4s ease-in-out alternate infinite;
    opacity: 0.6;
  }

  @keyframes floatingAnim {
    0% { transform: translateY(0px) scale(1); }
    100% { transform: translateY(-30px) scale(1.05); }
  }

  @keyframes infinite-rotation {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* --- ANIMATIONS DE RÉVÉLATION --- */
  .anim-reveal {
    transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
  }
  .reveal-hidden { opacity: 0; transform: translateY(30px); }
  .reveal-visible { opacity: 1; transform: translateY(0); }

  .hover-card-premium {
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .hover-card-premium:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px -12px rgba(98, 62, 189, 0.3);
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .fade-in { animation: fadeIn 0.6s ease-out forwards; }
`;

// --- COMPOSANTS INTERNES ---

const Icon = ({ name, size = 24, className = "" }) => {
  const icons = {
    arrowRight: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>,
    check: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"></polyline></svg>,
    menu: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>,
    x: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
    phone: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
  };
  return icons[name] || null;
};

const Badge = ({ children, color = "purple" }) => {
  const styles = color === "green" ? "text-[#76FF03] border-[#76FF03]" : "text-white/60 border-white/20";
  return (
    <span className={`inline-block px-4 py-1.5 border-2 rounded-none text-[10px] font-black uppercase tracking-[0.2em] mb-6 ${styles}`}>
      {children}
    </span>
  );
};

const Reveal = ({ children, delay = 0 }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`anim-reveal ${visible ? 'reveal-visible' : 'reveal-hidden'}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const StepForm = () => {
  const [step, setStep] = useState('start');
  
  return (
    <div className="bg-white p-8 md:p-12 border-[5px] border-[#3b1b8b] shadow-2xl relative min-h-[450px] flex flex-col justify-center text-slate-900">
      {step === 'start' && (
        <div className="fade-in space-y-6">
          <h3 className="text-3xl font-black tracking-tighter">Étape 1 : Votre ambition</h3>
          <p className="text-slate-500 font-medium">Quel type de propulseur digital recherchez-vous ?</p>
          <div className="grid gap-3">
            {['Site Vitrine', 'Boutique en ligne', 'Référencement SEO'].map(opt => (
              <button key={opt} onClick={() => setStep('next')} className="w-full text-left p-4 border-2 border-slate-100 hover:border-[#623ebd] hover:bg-purple-50 font-bold transition-all">
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'next' && (
        <div className="fade-in space-y-6">
          <h3 className="text-3xl font-black tracking-tighter">Étape 2 : Le contact</h3>
          <div className="space-y-4">
            <input type="text" placeholder="Votre nom" className="w-full p-4 bg-slate-50 border-none focus:ring-2 focus:ring-[#623ebd] outline-none font-bold" />
            <input type="email" placeholder="Email professionnel" className="w-full p-4 bg-slate-50 border-none focus:ring-2 focus:ring-[#623ebd] outline-none font-bold" />
            <button onClick={() => setStep('success')} className="w-full py-4 bg-[#623ebd] text-white font-black text-lg hover:bg-[#3b1b8b] transition-all">
              RECEVOIR MA PROPOSITION
            </button>
            <button onClick={() => setStep('start')} className="w-full text-slate-400 font-bold text-sm">Retour</button>
          </div>
        </div>
      )}

      {step === 'success' && (
        <div className="fade-in text-center space-y-6">
          <div className="w-20 h-20 bg-[#76FF03] text-[#3b1b8b] rounded-full flex items-center justify-center mx-auto">
            <Icon name="check" size={40} />
          </div>
          <h3 className="text-3xl font-black">C'est en route !</h3>
          <p className="text-slate-500 font-medium">On analyse votre marché. <br/>Réponse garantie sous 24h.</p>
          <button onClick={() => setStep('start')} className="px-6 py-2 border-2 border-slate-200 font-bold text-slate-400 hover:text-[#623ebd] transition-colors">Fermer</button>
        </div>
      )}
    </div>
  );
};

// --- COMPOSANT RACINE ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // --- L'INJECTION MAGIQUE POUR RÉPARER LE DESIGN (TAILWIND + FONTS) ---
    if (!document.getElementById('montserrat-font')) {
      const font = document.createElement('link');
      font.id = 'montserrat-font';
      font.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap';
      font.rel = 'stylesheet';
      document.head.appendChild(font);
    }

    if (!document.getElementById('tailwind-script')) {
      const twScript = document.createElement('script');
      twScript.id = 'tailwind-script';
      twScript.src = 'https://cdn.tailwindcss.com';
      twScript.onload = () => {
        document.body.classList.add('tailwind-loaded');
      };
      document.head.appendChild(twScript);

      const twConfig = document.createElement('script');
      twConfig.innerHTML = `
        tailwind.config = {
          theme: {
            extend: {
              fontFamily: { sans: ['Montserrat', 'sans-serif'] }
            }
          }
        }
      `;
      document.head.appendChild(twConfig);
    } else {
      document.body.classList.add('tailwind-loaded');
    }

    const timer = setTimeout(() => setLoading(false), 2000);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll); clearTimeout(timer); };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <div className="app-container min-h-screen bg-[#3b1b8b] text-white selection:bg-[#76FF03] selection:text-[#3b1b8b]">
      <style dangerouslySetInnerHTML={{ __html: customCSS }} />

      {/* PRELOADER */}
      <div className={`preload ${!loading ? 'fade-out' : ''}`}>
        <div className="loading-circle lc1"></div>
        <div className="loading-circle lc2"></div>
        <div className="loading-circle lc3"></div>
        <h1 className="absolute text-white font-black text-2xl tracking-[0.5em] z-10">CLICOM</h1>
      </div>

      {/* NAVIGATION PRESTIGE */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className={`w-10 h-10 flex items-center justify-center font-black text-xl transition-all duration-500 ${scrolled ? 'bg-[#623ebd] text-white' : 'bg-white text-[#623ebd]'}`}>C</div>
            <span className={`text-2xl font-black tracking-tighter transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}>CLICOM</span>
          </div>
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map(link => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className={`text-[11px] font-black uppercase tracking-widest transition-colors ${scrolled ? 'text-slate-500 hover:text-[#623ebd]' : 'text-white/70 hover:text-white'}`}>
                {link.label}
              </button>
            ))}
            <button onClick={() => scrollTo('contact')} className={`px-8 py-3 font-black text-[11px] uppercase tracking-widest transition-all ${scrolled ? 'bg-[#623ebd] text-white shadow-lg' : 'border-2 border-[#76FF03] text-[#76FF03] hover:bg-[#76FF03] hover:text-[#3b1b8b]'}`}>
              DEVIS RAPIDE
            </button>
          </div>
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
             <Icon name={menuOpen ? "x" : "menu"} className={scrolled ? "text-slate-900" : "text-white"} />
          </button>
        </div>
      </nav>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div className="fixed inset-0 z-[45] bg-[#3b1b8b] flex flex-col items-center justify-center space-y-8 fade-in lg:hidden">
          {NAV_LINKS.map(link => (
            <button key={link.id} onClick={() => scrollTo(link.id)} className="text-3xl font-black uppercase tracking-widest">
              {link.label}
            </button>
          ))}
          <button className="px-10 py-4 bg-[#76FF03] text-[#3b1b8b] font-black uppercase tracking-widest" onClick={() => scrollTo('contact')}>
            Devis Gratuit
          </button>
        </div>
      )}

      <main>
        {/* HERO SECTION */}
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="hero-bg-decor">
            <div className="small-circles-wrapper">
              <div className="small-circle" style={{ top: '15%', left: '20%' }}></div>
              <div className="small-circle" style={{ top: '25%', left: '70%', animationDelay: '1s' }}></div>
              <div className="small-circle" style={{ top: '70%', left: '10%', animationDelay: '2s' }}></div>
              <div className="small-circle" style={{ top: '80%', left: '80%', animationDelay: '3s' }}></div>
              <div className="small-circle" style={{ top: '40%', left: '45%', width: '450px', height: '450px', filter: 'blur(100px)', opacity: 0.2 }}></div>
            </div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <div className={`transition-all duration-1000 transform ${!loading ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
              <Badge color="green">L'élite digitale suisse romande</Badge>
              <h1 className="text-5xl md:text-8xl font-black leading-none mb-8 tracking-tighter">
                Le digital <br/> <span className="text-[#76FF03]">sans blabla.</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 font-medium">
                Nous traduisons vos ambitions en performance brute. <br/>Sites ultra-rapides, design d'impact, clients réels.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button onClick={() => scrollTo('contact')} className="px-10 py-5 bg-[#76FF03] text-[#3b1b8b] font-black text-lg hover:scale-105 transition-transform shadow-2xl">
                  DÉMARRER MON PROJET
                </button>
                <button onClick={() => scrollTo('solutions')} className="px-10 py-5 border-4 border-white text-white font-black text-lg hover:bg-white hover:text-[#3b1b8b] transition-all">
                  NOTRE APPROCHE
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTIONS SECTION */}
        <section id="solutions" className="py-32 bg-white text-slate-900 px-6">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="text-center mb-20">
                <span className="text-[#623ebd] font-black uppercase tracking-[0.3em] text-xs">Expertises</span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mt-4">Des solutions pour <br/>votre croissance.</h2>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-10">
              {SERVICES.map((s, i) => (
                <Reveal key={s.id} delay={i * 150}>
                  <div className="p-10 bg-slate-50 border-l-[10px] border-[#623ebd] hover-card-premium h-full flex flex-col group">
                    <h3 className="text-2xl font-black mb-4 group-hover:text-[#623ebd] transition-colors">{s.title}</h3>
                    <p className="text-slate-500 mb-8 font-medium leading-relaxed flex-grow">{s.desc}</p>
                    <div className="pt-6 border-t border-slate-200 flex justify-between items-center">
                      <span className="font-black text-[#623ebd] text-lg">{s.price}</span>
                      <Icon name="arrowRight" className="text-slate-300 group-hover:text-[#623ebd] transition-all" />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* TARIFS SECTION */}
        <section id="tarifs" className="py-32 bg-slate-950 px-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <Reveal>
                <Badge color="green">Investissement</Badge>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 text-white">Tarifs clairs. <br/>Zéro surprise.</h2>
                <p className="text-xl text-white/60 leading-relaxed mb-10">
                  Parce que vous avez besoin de budgetiser votre croissance. Nous proposons des packs tout inclus, de la conception à l'hébergement sécurisé en Suisse.
                </p>
                <div className="grid gap-6">
                  {["Hébergement Suisse inclus", "Statistiques en temps réel", "Support réactif 7j/7"].map(feat => (
                    <div key={feat} className="flex items-center gap-4 font-black uppercase text-xs tracking-widest text-[#76FF03]">
                      <div className="w-6 h-6 border border-[#76FF03] flex items-center justify-center"><Icon name="check" size={14} /></div>
                      {feat}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <div className="lg:w-1/2 w-full">
              <Reveal delay={300}>
                <div className="p-10 bg-[#623ebd] shadow-2xl relative overflow-hidden group">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                  <h3 className="text-2xl font-black mb-2 text-white">Pack Croissance</h3>
                  <div className="text-6xl font-black mb-8 text-white">2900 <span className="text-lg opacity-50">CHF</span></div>
                  <ul className="space-y-4 text-purple-100 font-bold mb-12">
                    <li>• Site complet jusqu'à 10 pages</li>
                    <li>• SEO Local (Google Maps) optimisé</li>
                    <li>• Formation gestion autonome 2h</li>
                    <li>• Certificat SSL & Sécurité Pro</li>
                  </ul>
                  <button onClick={() => scrollTo('contact')} className="w-full py-5 bg-[#76FF03] text-[#3b1b8b] font-black text-lg hover:scale-105 transition-transform shadow-xl">
                    CHOISIR CE PACK
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-32 bg-[#3b1b8b] relative overflow-hidden px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <Reveal>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 text-white">Prêt à changer <br/>de dimension ?</h2>
              <p className="text-xl text-white/70 mb-12 max-w-lg leading-relaxed">
                Utilisez notre assistant pour configurer votre projet en 30 secondes. <br/>Réponse personnalisée sous 24h.
              </p>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-[#76FF03]"><Icon name="phone" /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Appelez-nous</p>
                    <p className="text-2xl font-black text-white">+41 (0) 22 555 00 00</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <StepForm />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="py-20 bg-slate-950 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/10 flex items-center justify-center font-black text-sm">C</div>
            <span className="font-black tracking-tighter text-white">CLICOM SUISSE</span>
          </div>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
            <span className="hover:text-[#76FF03] cursor-pointer">Légal</span>
            <span className="hover:text-[#76FF03] cursor-pointer">Confidentialité</span>
            <span className="hover:text-[#76FF03] cursor-pointer">© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
