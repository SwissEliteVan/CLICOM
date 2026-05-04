import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'CLICOM | Agence digitale pour PME en Suisse romande',
    template: '%s | CLICOM',
  },
  description: "Agence digitale basée à Vevey. Création de sites web, visibilité sur Google et stratégies marketing pour les PME suisses.",
  openGraph: {
    type: 'website',
    locale: 'fr_CH',
    siteName: 'CLICOM',
    title: 'CLICOM | Agence digitale pour PME en Suisse romande',
    description: "Création de sites web, visibilité sur Google et marketing digital pour les PME suisses.",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}

