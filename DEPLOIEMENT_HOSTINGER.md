# 🚀 Guide de Déploiement CLICOM sur Hostinger

Ce document explique comment déployer votre site Next.js CLICOM sur **Hostinger** (VPS ou hébergement partagé avec support Node.js).

---

## 📋 Table des Matières

1. [Prérequis](#prérequis)
2. [Configuration du Projet](#configuration-du-projet)
3. [Méthode 1: Déploiement sur VPS Hostinger (Recommandé)](#méthode-1-déploiement-sur-vps-hostinger-recommandé)
4. [Méthode 2: Déploiement sur Hébergement Partagé](#méthode-2-déploiement-sur-hébergement-partagé)
5. [Configuration du Domaine](#configuration-du-domaine)
6. [Maintenance et Monitoring](#maintenance-et-monitoring)
7. [Dépannage](#dépannage)

---

## 🔧 Prérequis

### Sur votre machine locale (Windows)
- ✅ Git installé
- ✅ Node.js 18+ installé
- ✅ npm ou pnpm installé
- ✅ (Optionnel) OpenSSH Client Windows ou Git Bash

### Sur le serveur Hostinger
- ✅ Accès SSH au VPS (pour VPS)
- ✅ Node.js 18+ installé
- ✅ PM2 installé (gestionnaire de processus)
- ✅ Git installé (optionnel, recommandé)

---

## ⚙️ Configuration du Projet

### 1. Fichiers de configuration créés

Les fichiers suivants ont été ajoutés au projet pour optimiser le déploiement :

| Fichier | Description |
|---------|-------------|
| [`next.config.mjs`](next.config.mjs) | Configuration Next.js en mode `standalone` |
| [`server.js`](server.js) | Serveur Node.js personnalisé pour production |
| [`ecosystem.config.js`](ecosystem.config.js) | Configuration PM2 pour gestion du processus |
| [`.env.production`](.env.production) | Variables d'environnement pour production |
| [`deploy.sh`](deploy.sh) | Script de déploiement sur le serveur (bash) |
| [`deploy-local.sh`](deploy-local.sh) | Script de déploiement depuis votre machine (bash) |
| [`deploy-local.ps1`](deploy-local.ps1) | Script de déploiement depuis votre machine (PowerShell) |
| [`.htaccess`](.htaccess) | Configuration Apache (pour hébergement partagé) |

### 2. Vérifications avant déploiement

```bash
# Tester le build en local
npm run build

# Tester le serveur en local
node server.js
# Visiter: http://localhost:3000
```

---

## 🌟 Méthode 1: Déploiement sur VPS Hostinger (Recommandé)

Cette méthode offre les meilleures performances et un contrôle total.

### Étape 1: Préparer le serveur VPS

#### 1.1 Connexion SSH au VPS

```bash
ssh votre-user@votre-serveur.hostinger.com -p 22
```

#### 1.2 Installer Node.js (si pas déjà installé)

```bash
# Méthode recommandée: nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Installer Node.js LTS
nvm install 20
nvm use 20
nvm alias default 20

# Vérifier
node -v
npm -v
```

#### 1.3 Installer PM2 (gestionnaire de processus)

```bash
npm install -g pm2
pm2 --version
```

#### 1.4 Configurer Git (optionnel mais recommandé)

```bash
# Installer Git
sudo apt update
sudo apt install git -y

# Configurer Git
git config --global user.name "Votre Nom"
git config --global user.email "votre-email@example.com"
```

### Étape 2: Transférer le projet sur le serveur

#### Option A: Via Git (Recommandé)

```bash
# Sur le serveur
cd ~
git clone https://github.com/votre-compte/clicom.git
cd clicom
```

#### Option B: Via rsync (depuis votre machine Windows avec Git Bash)

```bash
# Éditer deploy-local.sh et configurer:
# SSH_USER="votre-user"
# SSH_HOST="votre-serveur.hostinger.com"

# Puis exécuter (Git Bash)
bash deploy-local.sh
```

#### Option C: Via PowerShell (Windows natif)

```powershell
# Éditer deploy-local.ps1 et configurer:
# $SSH_USER = "votre-user"
# $SSH_HOST = "votre-serveur.hostinger.com"

# Puis exécuter
.\deploy-local.ps1
```

#### Option D: Via FTP/SFTP manuel (FileZilla)

1. Télécharger tous les fichiers SAUF:
   - `node_modules/`
   - `.next/`
   - `logs/`
   - `.env.local`

### Étape 3: Configurer les variables d'environnement

```bash
# Sur le serveur
cd ~/clicom

# Créer le fichier .env.production
nano .env.production
```

Contenu de `.env.production` :

```env
# Site
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
PORT=3000
HOSTNAME=localhost
NODE_ENV=production

# Email SMTP (à configurer avec votre fournisseur)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=contact@votre-domaine.com
SMTP_PASS=votre-mot-de-passe-email

# API (optionnel)
NEXT_PUBLIC_API_URL=https://votre-domaine.com/api
```

**Important:** Ne jamais versionner ce fichier (déjà dans `.gitignore`).

### Étape 4: Déployer l'application

```bash
# Sur le serveur
cd ~/clicom

# Rendre le script exécutable
chmod +x deploy.sh

# Exécuter le déploiement
bash deploy.sh
```

Le script automatise :
- ✅ Installation des dépendances
- ✅ Build de production
- ✅ Configuration PM2
- ✅ Démarrage de l'application

### Étape 5: Vérifier le déploiement

```bash
# Vérifier le statut PM2
pm2 status

# Voir les logs en temps réel
pm2 logs clicom

# Tester l'application
curl http://localhost:3000
```

### Étape 6: Configurer Nginx/Apache comme reverse proxy

#### Avec Nginx (recommandé)

```bash
sudo nano /etc/nginx/sites-available/clicom
```

```nginx
server {
    listen 80;
    server_name votre-domaine.com www.votre-domaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Activer le site
sudo ln -s /etc/nginx/sites-available/clicom /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### Avec Apache

```bash
sudo a2enmod proxy proxy_http
sudo nano /etc/apache2/sites-available/clicom.conf
```

```apache
<VirtualHost *:80>
    ServerName votre-domaine.com
    ServerAlias www.votre-domaine.com

    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
</VirtualHost>
```

```bash
sudo a2ensite clicom
sudo systemctl reload apache2
```

### Étape 7: Configurer SSL/HTTPS avec Let's Encrypt

```bash
# Installer Certbot
sudo apt install certbot python3-certbot-nginx -y  # Pour Nginx
# OU
sudo apt install certbot python3-certbot-apache -y  # Pour Apache

# Obtenir un certificat SSL
sudo certbot --nginx -d votre-domaine.com -d www.votre-domaine.com
# OU
sudo certbot --apache -d votre-domaine.com -d www.votre-domaine.com

# Renouvellement automatique (déjà configuré par Certbot)
sudo certbot renew --dry-run
```

---

## 📦 Méthode 2: Déploiement sur Hébergement Partagé

Si vous n'avez pas de VPS, vous pouvez utiliser l'hébergement partagé **avec support Node.js** de Hostinger.

### Option A: Mode Node.js (si disponible)

1. **Télécharger les fichiers** via FTP (FileZilla):
   - Tous les fichiers du projet
   - SAUF `node_modules/`, `.next/`, `logs/`

2. **Via l'interface Hostinger**:
   - Aller dans **Node.js Manager**
   - Créer une nouvelle application Node.js
   - Version: Node.js 20 LTS
   - Point d'entrée: `server.js`
   - Mode: `production`

3. **Installer les dépendances** (terminal SSH):
   ```bash
   cd ~/public_html/clicom
   npm install --production
   npm run build
   ```

4. **Redémarrer** l'application depuis l'interface Hostinger.

### Option B: Mode Export Statique (sans Node.js)

Si Hostinger ne supporte pas Node.js, vous pouvez exporter en site statique :

#### 1. Modifier la configuration locale

Éditer [`next.config.mjs`](next.config.mjs) :

```javascript
const nextConfig = {
  output: 'export',  // ← Changer de 'standalone' à 'export'
  images: {
    unoptimized: true,
  },
}
```

#### 2. Builder en local

```bash
npm run build
```

Cela génère un dossier `out/` avec le site statique.

#### 3. Télécharger sur Hostinger

Transférer tout le contenu du dossier `out/` vers `public_html/` via FTP.

#### 4. Configuration Apache

Le fichier [`.htaccess`](.htaccess) est déjà configuré pour :
- ✅ Compression GZIP
- ✅ Mise en cache
- ✅ Sécurité (headers)
- ✅ Redirection HTTPS

**Important:** Cette méthode ne supporte pas les **API Routes** Next.js.

---

## 🌐 Configuration du Domaine

### Dans l'interface Hostinger

1. Aller dans **Domaines**
2. Pointer votre domaine vers votre serveur :
   - **Type A** : `votre-domaine.com` → `IP du VPS`
   - **Type A** : `www.votre-domaine.com` → `IP du VPS`

3. Attendre la propagation DNS (jusqu'à 24h, souvent 1-2h).

### Vérifier la configuration DNS

```bash
# Depuis votre machine locale
nslookup votre-domaine.com
ping votre-domaine.com
```

---

## 🛠️ Maintenance et Monitoring

### Commandes PM2 essentielles

```bash
# Voir le statut
pm2 status

# Logs en temps réel
pm2 logs clicom

# Redémarrer
pm2 restart clicom

# Arrêter
pm2 stop clicom

# Monitoring (CPU, RAM)
pm2 monit

# Voir les détails
pm2 show clicom

# Supprimer du gestionnaire PM2
pm2 delete clicom

# Sauvegarder la configuration
pm2 save

# Lister les applications sauvegardées
pm2 list
```

### Mettre à jour le site (après modification du code)

#### Option A: Via Git (recommandé)

```bash
# Sur le serveur
cd ~/clicom
git pull origin main
npm install --production
npm run build
pm2 restart clicom
```

#### Option B: Via script automatisé

Depuis votre machine locale :

```bash
# Git Bash
bash deploy-local.sh

# OU PowerShell
.\deploy-local.ps1
```

### Monitoring des logs

```bash
# Logs en temps réel
pm2 logs clicom --lines 100

# Logs d'erreurs uniquement
pm2 logs clicom --err

# Vider les logs
pm2 flush clicom
```

### Gestion de la mémoire

Si l'application utilise trop de RAM :

```bash
# Éditer ecosystem.config.js
nano ~/clicom/ecosystem.config.js
```

Modifier :
```javascript
max_memory_restart: '256M',  // Redémarrer si > 256MB
```

Puis :
```bash
pm2 restart clicom
```

---

## 🔍 Dépannage

### Problème: L'application ne démarre pas

```bash
# Vérifier les logs
pm2 logs clicom --err

# Vérifier si le port 3000 est occupé
netstat -tulpn | grep 3000
# OU
lsof -i :3000

# Tuer le processus sur le port 3000
kill -9 $(lsof -t -i:3000)

# Redémarrer
pm2 restart clicom
```

### Problème: Erreur "Cannot find module"

```bash
# Réinstaller les dépendances
cd ~/clicom
rm -rf node_modules package-lock.json
npm install --production
npm run build
pm2 restart clicom
```

### Problème: Images ne s'affichent pas

Vérifier que :
1. Les images sont dans `public/images/`
2. Les chemins dans le code sont corrects : `/images/nom-image.webp`
3. Les permissions sont correctes :
   ```bash
   chmod -R 755 ~/clicom/public
   ```

### Problème: Erreur 502 Bad Gateway (Nginx)

```bash
# Vérifier que l'application tourne
pm2 status

# Vérifier la configuration Nginx
sudo nginx -t

# Recharger Nginx
sudo systemctl reload nginx

# Vérifier les logs Nginx
sudo tail -f /var/log/nginx/error.log
```

### Problème: Site lent

```bash
# Activer le mode cluster PM2 (plusieurs instances)
# Éditer ecosystem.config.js
nano ~/clicom/ecosystem.config.js
```

Modifier :
```javascript
instances: 'max',  // Utiliser tous les CPU
exec_mode: 'cluster',
```

Puis :
```bash
pm2 restart clicom
```

### Problème: Variables d'environnement non chargées

```bash
# Vérifier que .env.production existe
cat ~/clicom/.env.production

# Recharger PM2 avec les nouvelles variables
pm2 restart clicom --update-env
```

---

## 📊 Optimisations Recommandées

### 1. Activer Redis pour le cache (optionnel)

```bash
# Installer Redis
sudo apt install redis-server -y
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

### 2. Configurer un CDN (Cloudflare)

1. Créer un compte Cloudflare gratuit
2. Ajouter votre domaine
3. Changer les DNS chez Hostinger vers ceux de Cloudflare
4. Activer:
   - Cache (HTML, CSS, JS, images)
   - Minification
   - Brotli compression
   - HTTP/3

### 3. Monitoring avec PM2 Plus (optionnel)

```bash
pm2 link <secret_key> <public_key>
```

Monitoring avancé sur https://app.pm2.io

---

## ✅ Checklist de Déploiement

Avant de déployer en production, vérifiez :

- [ ] `.env.production` configuré avec les vraies valeurs
- [ ] SMTP configuré pour les emails
- [ ] SSL/HTTPS activé (Let's Encrypt)
- [ ] Domaine DNS correctement configuré
- [ ] PM2 configuré pour redémarrer automatiquement
- [ ] Logs accessibles et monitoring en place
- [ ] Backup régulier configuré
- [ ] Politique de cache configurée
- [ ] Headers de sécurité activés
- [ ] Compression GZIP/Brotli activée
- [ ] Images optimisées (WebP/AVIF)

---

## 📞 Support

Pour toute question :
- Documentation Next.js : https://nextjs.org/docs
- Documentation PM2 : https://pm2.keymetrics.io/
- Documentation Hostinger : https://support.hostinger.com
- Support CLICOM : contact@clicom.ch

---

**Dernière mise à jour:** 2026-05-04
**Version:** 1.0.0
