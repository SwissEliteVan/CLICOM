/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mode standalone pour déploiement sur serveur Node.js (Hostinger VPS)
  output: 'standalone',
  
  // Optimisation des images (Next.js Image Optimization activée en mode standalone)
  images: {
    // Formats modernes supportés
    formats: ['image/avif', 'image/webp'],
    // Cache les images optimisées
    minimumCacheTTL: 60,
    // Tailles d'images responsive
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Désactiver Turbopack en production (utilisation de Webpack stable)
  // Turbopack est encore expérimental en Next.js 16
  experimental: {
    // Activer uniquement en développement si nécessaire
  },
  
  // Compression des assets
  compress: true,
  
  // Power par X-Powered-By (sécurité)
  poweredByHeader: false,
  
  // Gestion des trailing slashes (important pour SEO)
  trailingSlash: false,
  
  // Environnement de production
  reactStrictMode: true,
}

export default nextConfig
