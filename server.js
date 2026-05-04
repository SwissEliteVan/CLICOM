/**
 * Serveur de production Next.js pour Hostinger
 * Point d'entrée pour le déploiement avec PM2
 */

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Configuration
const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

// Instance Next.js
const app = next({ 
  dev,
  // En mode standalone, Next.js cherche les fichiers dans .next/standalone
  dir: process.cwd()
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal server error');
    }
  })
    .once('error', (err) => {
      console.error('Server error:', err);
      process.exit(1);
    })
    .listen(port, hostname, () => {
      console.log(`
╔═══════════════════════════════════════════════════════╗
║  🚀 CLICOM - Next.js Server (Production)            ║
╚═══════════════════════════════════════════════════════╝
      
  ✅ Ready on: http://${hostname}:${port}
  📁 Mode: ${dev ? 'development' : 'production'}
  🌍 Environment: ${process.env.NODE_ENV || 'development'}
  
  Logs: pm2 logs clicom
  Stop: pm2 stop clicom
      `);
    });
});

// Gestion gracieuse de l'arrêt
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});
