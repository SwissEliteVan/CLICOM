# 🚀 Guide Rapide - Déploiement CLICOM

Guide de démarrage rapide pour déployer CLICOM sur **Hostinger VPS**.

> **📖 Documentation complète:** Consultez [`DEPLOIEMENT_HOSTINGER.md`](DEPLOIEMENT_HOSTINGER.md)

---

## ⚡ Déploiement Rapide (5 minutes)

### 1️⃣ Préparer le serveur Hostinger

```bash
# Connexion SSH
ssh votre-user@votre-serveur.hostinger.com

# Installer Node.js 20 (si nécessaire)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20

# Installer PM2
npm install -g pm2
```

### 2️⃣ Transférer le projet

**Option A - Via Git (recommandé):**
```bash
cd ~
git clone https://github.com/votre-compte/clicom.git
cd clicom
```

**Option B - Via rsync depuis Windows (Git Bash):**
```bash
# Éditer deploy-local.sh d'abord
bash deploy-local.sh
```

**Option C - Via PowerShell (Windows):**
```powershell
# Éditer deploy-local.ps1 d'abord
.\deploy-local.ps1
```

### 3️⃣ Configurer l'environnement

```bash
# Sur le serveur
cd ~/clicom
nano .env.production
```

Contenu minimal:
```env
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
PORT=3000
NODE_ENV=production
```

### 4️⃣ Déployer

```bash
chmod +x deploy.sh
bash deploy.sh
```

### 5️⃣ Configurer le reverse proxy

**Nginx:**
```bash
sudo nano /etc/nginx/sites-available/clicom
```

```nginx
server {
    listen 80;
    server_name votre-domaine.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/clicom /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 6️⃣ Activer SSL

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d votre-domaine.com
```

---

## 🔄 Mise à Jour du Site

```bash
# Sur le serveur
cd ~/clicom
git pull
npm install --production
npm run build
pm2 restart clicom
```

---

## 📊 Commandes Utiles

```bash
# Statut
pm2 status

# Logs
pm2 logs clicom

# Monitoring
pm2 monit

# Redémarrer
pm2 restart clicom

# Arrêter
pm2 stop clicom
```

---

## 📁 Fichiers de Configuration Créés

| Fichier | Description |
|---------|-------------|
| [`next.config.mjs`](next.config.mjs) | Config Next.js (mode standalone) |
| [`server.js`](server.js) | Serveur Node.js production |
| [`ecosystem.config.js`](ecosystem.config.js) | Config PM2 |
| [`.env.production`](.env.production) | Variables d'environnement |
| [`deploy.sh`](deploy.sh) | Script déploiement serveur |
| [`deploy-local.sh`](deploy-local.sh) | Script déploiement local (Bash) |
| [`deploy-local.ps1`](deploy-local.ps1) | Script déploiement local (PowerShell) |
| [`.htaccess`](.htaccess) | Config Apache (hébergement partagé) |

---

## 🆘 Aide

**Documentation complète:** [`DEPLOIEMENT_HOSTINGER.md`](DEPLOIEMENT_HOSTINGER.md)

**Support:** contact@clicom.ch
