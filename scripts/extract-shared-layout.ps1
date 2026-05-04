# Remplace les nav copiees-collees + footer ad-hoc par <Navbar /> et <Footer />
# partages, dans toutes les pages applicatives.

$ErrorActionPreference = 'Stop'
$files = @{}

# ----------------------------------------------------------------------------
# blog/page.tsx
# ----------------------------------------------------------------------------
$files['src/app/blog/page.tsx'] = @'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Blog | CLICOM Agence digitale',
  description: 'Conseils et actualites marketing digital pour PME suisses : SEO, sites web, intelligence artificielle.',
}

const ARTICLES = [
  {
    slug: 'pourquoi-site-web-2026',
    category: 'Site web',
    date: '25 mars 2026',
    title: "Pourquoi votre entreprise suisse a besoin d'un site internet en 2026",
    excerpt: "A l'ere du numerique, une presence en ligne professionnelle n'est plus optionnelle pour rester competitif.",
    image: '/images/creation-site-web-pme-suisse-romande.webp',
    alt: 'Creation de site web pour PME suisse',
  },
  {
    slug: 'ia-pme',
    category: 'Intelligence Artificielle',
    date: '14 mars 2026',
    title: "Comment l'intelligence artificielle peut aider votre PME",
    excerpt: "L'IA n'est plus reservee aux grandes entreprises : decouvrez comment les PME peuvent gagner du temps avec ces outils.",
    image: '/images/automation-process-robotique-3d-clicom.avif',
    alt: 'Intelligence artificielle et automatisation pour PME',
  },
  {
    slug: 'attirer-clients-sans-prospection',
    category: 'Marketing',
    date: '5 mars 2026',
    title: 'Attirer des clients sans prospection agressive',
    excerpt: 'Strategies concretes adaptees aux PME pour generer des leads qualifies durablement, sans demarchage.',
    image: '/images/marketing-croissance-abstrait-clicom.avif',
    alt: 'Strategies marketing pour generer des leads',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="py-24 md:py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-brand-200">Blog</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">Conseils et actualites</h1>
            <div className="w-20 h-1 bg-brand-600 rounded-full mx-auto mt-6" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {ARTICLES.map((post) => (
              <article key={post.slug} className="bg-white rounded-2xl overflow-hidden hover:shadow-soft transition-all group">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image src={post.image} alt={post.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider mb-4">
                    <span className="text-brand-600">{post.category}</span>
                    <span className="text-slate-300">-</span>
                    <span className="text-slate-400">{post.date}</span>
                  </div>
                  <h2 className="text-lg font-bold mb-4 text-slate-900 group-hover:text-brand-600 transition-colors leading-snug">{post.title}</h2>
                  <p className="text-slate-500 leading-relaxed mb-6">{post.excerpt}</p>
                  <span className="text-brand-600 font-semibold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Lire la suite
                    <span aria-hidden>{'->'}</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
'@

# ----------------------------------------------------------------------------
# services/page.tsx
# ----------------------------------------------------------------------------
$files['src/app/services/page.tsx'] = @'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Nos Services | CLICOM Agence digitale',
  description: 'Creation de sites internet, referencement SEO local et marketing digital pour les PME en Suisse romande.',
}

const services = [
  {
    title: 'Creation de site internet',
    desc: 'Sites vitrines et e-commerce sur mesure, concus pour convertir vos visiteurs en clients fideles.',
    image: '/images/service-creation-site-internet.webp',
    alt: 'Creation de site internet professionnel pour PME suisse',
    href: '/services/creation-site',
    features: ['Design sur mesure', 'Mobile-first', 'Optimise SEO', 'Hebergement suisse'],
  },
  {
    title: 'Referencement SEO local',
    desc: 'Soyez visible sur Google quand vos clients cherchent vos services en Suisse romande.',
    image: '/images/referencement-seo-local-pme-suisse.webp',
    alt: 'Referencement SEO local pour PME en Suisse',
    href: '/services/seo',
    features: ['Audit SEO complet', 'Google Business', 'Contenu optimise', 'Suivi mensuel'],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-slate-50 py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-brand-200">Nos Services</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
            Des solutions digitales <span className="text-brand-600">pensees pour les PME suisses</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500 leading-relaxed">
            De la creation de votre site internet a votre visibilite sur Google, nous vous accompagnons a chaque etape de votre transformation digitale.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/devis" className="px-8 py-4 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-600 transition-all shadow-lg">
              Demander un devis
            </Link>
            <Link href="/contact" className="px-8 py-4 border border-slate-200 bg-white font-semibold text-slate-900 rounded-xl hover:border-brand-600 hover:text-brand-600 transition-all">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            {services.map((service) => (
              <article key={service.title} className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-soft hover:shadow-xl transition-all">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image src={service.image} alt={service.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900">{service.title}</h2>
                  <p className="mt-3 text-slate-500 leading-relaxed">{service.desc}</p>
                  <ul className="mt-6 grid grid-cols-2 gap-2 text-sm text-slate-600">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-600" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={service.href} className="mt-8 inline-flex items-center gap-2 font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                    En savoir plus
                    <span aria-hidden>{'->'}</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-900 py-20 px-6 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Pret a passer au digital ?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300 leading-relaxed">
            Discutons de votre projet et trouvons ensemble la solution adaptee a votre PME.
          </p>
          <Link href="/devis" className="mt-8 inline-block px-10 py-4 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-600 transition-all shadow-lg">
            Obtenir mon devis gratuit
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
'@

# ----------------------------------------------------------------------------
# Helper sub-service page (utilise Navbar + Footer)
# ----------------------------------------------------------------------------
function New-ServicePage {
    param(
        [string]$Component, [string]$Badge, [string]$Title, [string]$Intro,
        [string]$Image, [string]$Alt,
        [string]$Stat1Val, [string]$Stat1Lbl,
        [string]$Stat2Val, [string]$Stat2Lbl,
        [string]$Stat3Val, [string]$Stat3Lbl,
        [string]$Cta, [string]$MetaTitle, [string]$MetaDesc
    )
@"
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: '$MetaTitle',
  description: '$MetaDesc',
}

export default function ${Component}() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <Link href="/services" className="text-sm text-slate-400 hover:text-brand-600 transition-colors mb-8 inline-block">Retour aux services</Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-brand-200">$Badge</span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">$Title</h1>
              <p className="text-lg text-slate-500 leading-relaxed">$Intro</p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-soft">
              <Image src="$Image" alt="$Alt" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100">
              <p className="text-lg font-bold text-brand-600">$Stat1Val</p>
              <p className="text-sm text-slate-500">$Stat1Lbl</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100">
              <p className="text-lg font-bold text-brand-600">$Stat2Val</p>
              <p className="text-sm text-slate-500">$Stat2Lbl</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100">
              <p className="text-lg font-bold text-brand-600">$Stat3Val</p>
              <p className="text-sm text-slate-500">$Stat3Lbl</p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/devis" className="px-10 py-5 bg-accent-500 text-white font-bold text-lg rounded-2xl hover:bg-accent-600 transition-all shadow-lg hover:shadow-xl inline-block">
              $Cta
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
"@
}

$files['src/app/services/creation-site/page.tsx'] = New-ServicePage `
    -Component 'CreationSitePage' -Badge 'Creation et Refonte' `
    -Title 'Creation et refonte de site internet' `
    -Intro 'Sites vitrines et e-commerce sur mesure, design moderne, performances optimisees et SEO integre des la conception. Votre entreprise merite une presence en ligne a son image.' `
    -Image '/images/service-creation-site-internet.webp' `
    -Alt 'Creation de site internet professionnel pour PME suisse' `
    -Stat1Val 'Sous 3 semaines' -Stat1Lbl 'Livraison rapide' `
    -Stat2Val '100% responsive' -Stat2Lbl 'Mobile et tablette' `
    -Stat3Val 'SEO inclus' -Stat3Lbl 'Optimise Google' `
    -Cta 'Demander mon devis creation site' `
    -MetaTitle 'Creation et refonte de site internet | CLICOM' `
    -MetaDesc 'Creation de site web sur mesure pour PME suisses. Design moderne, performances optimisees, SEO integre. Devis gratuit sous 24h.'

$files['src/app/services/seo/page.tsx'] = New-ServicePage `
    -Component 'SeoPage' -Badge 'SEO' `
    -Title 'Referencement naturel SEO' `
    -Intro 'Optimisez votre visibilite sur Google. Audit complet, strategie de contenu et meilleures pratiques techniques pour vous propulser en tete des resultats de recherche.' `
    -Image '/images/referencement-seo-local-pme-suisse.webp' `
    -Alt 'Referencement SEO local pour PME en Suisse' `
    -Stat1Val '+200%' -Stat1Lbl 'Trafic organique moyen' `
    -Stat2Val 'Top 3' -Stat2Lbl 'Positionnement vise' `
    -Stat3Val 'Audit offert' -Stat3Lbl 'Sans engagement' `
    -Cta 'Demander mon audit SEO gratuit' `
    -MetaTitle 'Referencement naturel SEO | CLICOM' `
    -MetaDesc 'Audit SEO et optimisation pour PME suisses. Ameliorez votre positionnement Google et attirez plus de clients qualifies.'

$files['src/app/services/sea/page.tsx'] = New-ServicePage `
    -Component 'SeaPage' -Badge 'SEA' `
    -Title 'Referencement payant Google Ads' `
    -Intro 'Generez des leads qualifies des le premier jour. Campagnes Google Ads pilotees par la performance, ciblage local et optimisation continue du retour sur investissement.' `
    -Image '/images/marketing-digital-local-pme-suisse.webp' `
    -Alt 'Campagnes marketing digital local pour PME suisse' `
    -Stat1Val 'ROI mesure' -Stat1Lbl 'Reporting transparent' `
    -Stat2Val 'Sans engagement' -Stat2Lbl 'Flexibilite totale' `
    -Stat3Val 'Suivi mensuel' -Stat3Lbl 'Optimisation continue' `
    -Cta 'Lancer ma campagne Google Ads' `
    -MetaTitle 'Referencement payant Google Ads | CLICOM' `
    -MetaDesc 'Campagnes Google Ads pour PME suisses. Generez des leads qualifies des le premier jour avec un ROI mesure.'

$files['src/app/services/strategie-digitale/page.tsx'] = New-ServicePage `
    -Component 'StrategieDigitalePage' -Badge 'Strategie' `
    -Title 'Strategie digitale sur mesure' `
    -Intro 'Une feuille de route claire pour atteindre vos objectifs : positionnement, audience, canaux, contenu et indicateurs de performance, alignes sur les realites de votre PME.' `
    -Image '/images/atelier-strategie-digitale-postit-clicom.avif' `
    -Alt 'Atelier de strategie digitale pour PME' `
    -Stat1Val 'Audit 360' -Stat1Lbl 'Diagnostic complet' `
    -Stat2Val 'Roadmap' -Stat2Lbl 'Plan 12 mois' `
    -Stat3Val 'KPIs' -Stat3Lbl 'Indicateurs cles' `
    -Cta 'Construire ma strategie digitale' `
    -MetaTitle 'Strategie digitale pour PME suisses | CLICOM' `
    -MetaDesc 'Strategie digitale sur mesure pour PME suisses : positionnement, audience, contenu et KPIs alignes sur vos objectifs.'

$files['src/app/services/ux-ui-design/page.tsx'] = New-ServicePage `
    -Component 'UxUiDesignPage' -Badge 'UX et UI Design' `
    -Title 'UX et UI Design centre utilisateur' `
    -Intro 'Interfaces claires, parcours fluides, conversions accrues. Notre demarche design transforme vos visiteurs en clients grace a une experience pensee pour eux.' `
    -Image '/images/landing-page-ecommerce-sur-mesure.webp' `
    -Alt 'Design UX UI de landing page e-commerce sur mesure' `
    -Stat1Val 'Wireframes' -Stat1Lbl 'Maquettes detaillees' `
    -Stat2Val 'Prototypes' -Stat2Lbl 'Tests utilisateurs' `
    -Stat3Val '+30%' -Stat3Lbl 'Conversion moyenne' `
    -Cta 'Discuter de mon projet design' `
    -MetaTitle 'UX et UI Design | CLICOM' `
    -MetaDesc 'UX et UI design centre utilisateur pour PME suisses. Interfaces claires, parcours fluides, conversions accrues.'

# Ecriture des pages reinitialisees
foreach ($path in $files.Keys) {
    $content = $files[$path]
    Set-Content -Path $path -Value $content -Encoding UTF8 -NoNewline
    Write-Host ("[OK] reset    {0} ({1} chars)" -f $path, $content.Length)
}

# ----------------------------------------------------------------------------
# Surgical : contact + devis -> remplace <nav>...</nav> par <Navbar /> et
# ajoute <Footer /> + imports.
# ----------------------------------------------------------------------------
$surgicals = @('src/app/contact/page.tsx', 'src/app/devis/page.tsx')
foreach ($p in $surgicals) {
    $raw = Get-Content -Path $p -Raw -Encoding UTF8
    $before = $raw.Length

    # Ajout des imports apres le dernier import existant (s'ils ne sont pas deja la)
    if ($raw -notmatch "from '@/components/Navbar'") {
        $raw = [regex]::Replace($raw, "(?s)((?:^|\r?\n)import [^\r\n]+\r?\n)(?!import )", "`$1import Navbar from '@/components/Navbar'`r`nimport Footer from '@/components/Footer'`r`n", 1)
    }

    # Remplace le bloc <nav ...>...</nav> par <Navbar />
    $raw = [regex]::Replace($raw, '(?s)<nav\b[^>]*>.*?</nav>', '<Navbar />')

    # Ajoute <Footer /> avant </main> ou avant </div> final (juste avant la balise fermante du wrapper bg-white)
    if ($raw -notmatch '<Footer />') {
        # Insere <Footer /> juste avant la derniere </div> precedant </>
        $raw = [regex]::Replace($raw, '(?s)(</main>\s*)(</div>\s*</>\s*\)\s*\}\s*)$', "`$1      <Footer />`r`n    `$2", 1)
    }

    Set-Content -Path $p -Value $raw -Encoding UTF8 -NoNewline
    Write-Host ("[OK] surgical {0} ({1} -> {2} chars)" -f $p, $before, $raw.Length)
}

Write-Host "`n=== Extraction Navbar/Footer terminee ===`n"
