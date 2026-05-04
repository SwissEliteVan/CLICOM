/**
 * Configuration PM2 pour Hostinger
 * PM2 est un gestionnaire de processus pour applications Node.js
 * Usage: pm2 start ecosystem.config.js
 */

module.exports = {
  apps: [
    {
      name: 'clicom',
      script: './server.js',
      instances: process.env.PM2_INSTANCES || 1, // 1 instance ou mode cluster
      exec_mode: 'cluster', // Mode cluster pour meilleure performance
      watch: false, // Désactiver le watch en production
      max_memory_restart: '500M', // Redémarrer si > 500MB RAM
      
      // Variables d'environnement
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: 'localhost',
      },
      
      // Logs
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      
      // Comportement en cas d'erreur
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      
      // Time avant force kill
      kill_timeout: 5000,
      listen_timeout: 3000,
      
      // Autres options
      ignore_watch: ['node_modules', 'logs', '.next'],
    },
  ],
};
