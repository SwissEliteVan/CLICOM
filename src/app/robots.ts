@"
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://clicom.ch/sitemap.xml',
  }
}
"@ | Set-Content "src/app/robots.ts"

Write-Host "robots.ts cree !" -ForegroundColor Green