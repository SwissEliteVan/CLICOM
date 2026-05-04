#!/bin/bash

###############################################################################
# Script de déploiement CLICOM sur Hostinger VPS
# À exécuter directement sur le serveur (via SSH)
###############################################################################

set -e  # Arrêter en cas d'erreur

echo "╔═══════════════════════════════════════════════════════╗"
echo "║  🚀 Déploiement CLICOM sur Hostinger                 ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Configuration
APP_DIR="$HOME/clicom"
APP_NAME="clicom"
NODE_VERSION="20"  # Version Node.js recommandée

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour logger
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 1. Vérifier Node.js et npm
log_info "Vérification Node.js..."
if ! command -v node &> /dev/null; then
    log_error "Node.js n'est pas installé. Installation requise."
    exit 1
fi
log_info "Node.js version: $(node -v)"
log_info "npm version: $(npm -v)"

# 2. Vérifier PM2
log_info "Vérification PM2..."
if ! command -v pm2 &> /dev/null; then
    log_warn "PM2 n'est pas installé. Installation en cours..."
    npm install -g pm2
fi
log_info "PM2 version: $(pm2 -v)"

# 3. Naviguer vers le dossier de l'application
log_info "Navigation vers $APP_DIR"
cd "$APP_DIR" || exit 1

# 4. Mise à jour du code (Git ou rsync)
if [ -d ".git" ]; then
    log_info "Mise à jour depuis Git..."
    git pull origin main || git pull origin master
else
    log_warn "Pas de dépôt Git détecté. Assurez-vous d'avoir uploadé les fichiers via FTP/rsync."
fi

# 5. Installation des dépendances (production uniquement)
log_info "Installation des dépendances..."
npm ci --omit=dev || npm install --production

# 6. Build de l'application Next.js
log_info "Build de l'application Next.js..."
npm run build

# 7. Création du dossier logs si nécessaire
mkdir -p logs

# 8. Arrêt de l'ancienne instance PM2 (si elle existe)
log_info "Arrêt de l'ancienne instance..."
pm2 stop "$APP_NAME" 2>/dev/null || log_warn "Aucune instance à arrêter"
pm2 delete "$APP_NAME" 2>/dev/null || true

# 9. Démarrage de la nouvelle instance avec PM2
log_info "Démarrage de l'application avec PM2..."
pm2 start ecosystem.config.js

# 10. Sauvegarde de la configuration PM2
log_info "Sauvegarde de la configuration PM2..."
pm2 save

# 11. Configuration du démarrage automatique (optionnel)
log_info "Configuration du démarrage automatique PM2..."
pm2 startup | tail -n 1 | bash || log_warn "Impossible de configurer le démarrage automatique (nécessite sudo)"

# 12. Affichage des logs et du statut
echo ""
log_info "✅ Déploiement terminé avec succès!"
echo ""
log_info "Commandes utiles:"
echo "  - Voir les logs:      pm2 logs $APP_NAME"
echo "  - Statut:             pm2 status"
echo "  - Redémarrer:         pm2 restart $APP_NAME"
echo "  - Arrêter:            pm2 stop $APP_NAME"
echo "  - Monitoring:         pm2 monit"
echo ""
pm2 status
