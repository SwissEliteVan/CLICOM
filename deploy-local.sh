#!/bin/bash

###############################################################################
# Script de déploiement LOCAL vers Hostinger (depuis votre machine Windows)
# À exécuter avec Git Bash ou WSL
###############################################################################

set -e

echo "╔═══════════════════════════════════════════════════════╗"
echo "║  📦 Déploiement LOCAL → Hostinger                    ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Configuration - À PERSONNALISER
SSH_USER="votre-user"
SSH_HOST="votre-serveur.hostinger.com"
SSH_PORT="22"
REMOTE_DIR="~/clicom"

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier les variables de configuration
if [ "$SSH_USER" == "votre-user" ] || [ "$SSH_HOST" == "votre-serveur.hostinger.com" ]; then
    log_error "Veuillez configurer SSH_USER et SSH_HOST dans ce script!"
    exit 1
fi

# 1. Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ] || [ ! -f "next.config.mjs" ]; then
    log_error "Ce script doit être exécuté depuis la racine du projet!"
    exit 1
fi

# 2. Nettoyer les fichiers locaux inutiles
log_info "Nettoyage des fichiers locaux..."
rm -rf .next node_modules/.cache

# 3. Synchronisation avec rsync (exclut les fichiers inutiles)
log_info "Synchronisation avec le serveur Hostinger via rsync..."
rsync -avz --progress \
    --exclude 'node_modules' \
    --exclude '.next' \
    --exclude '.git' \
    --exclude '.env.local' \
    --exclude 'logs' \
    --exclude '*.log' \
    --exclude '.DS_Store' \
    --exclude 'Thumbs.db' \
    -e "ssh -p $SSH_PORT" \
    ./ "$SSH_USER@$SSH_HOST:$REMOTE_DIR/"

# 4. Exécuter le script de déploiement sur le serveur
log_info "Exécution du déploiement sur le serveur..."
ssh -p "$SSH_PORT" "$SSH_USER@$SSH_HOST" "cd $REMOTE_DIR && bash deploy.sh"

# 5. Succès
echo ""
log_info "✅ Déploiement terminé!"
log_info "Votre site devrait être accessible sur votre domaine Hostinger."
echo ""
log_info "Pour vérifier les logs:"
echo "  ssh -p $SSH_PORT $SSH_USER@$SSH_HOST 'pm2 logs clicom'"
