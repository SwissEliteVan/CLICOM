# ⚡ Commandes Rapides - CLICOM

Aide-mémoire pour les commandes fréquentes.

---

## 🚀 Déploiement

### Depuis Windows (votre machine)

```bash
# Git Bash
bash deploy-local.sh

# PowerShell
.\deploy-local.ps1
```

### Sur le serveur Hostinger

```bash
# Déploiement complet
bash deploy.sh

# Mise à jour rapide (si Git configuré)
cd ~/clicom
git pull
npm install --production
npm run build
pm2 restart clicom
```

---

## 🔧 Développement Local

```bash
# Démarrer le serveur de développement
npm run dev

# Build de production local
npm run build

# Tester le build en local
npm run prod

# Linter le code
npm run lint

# Nettoyer les fichiers de cache
npm run clean
```

---

## 📊 PM2 (Sur le serveur)

```bash
# Démarrer l'application
pm2 start ecosystem.config.js

# Voir le statut
pm2 status

# Logs en temps réel
pm2 logs clicom

# Redémarrer
pm2 restart clicom

# Arrêter
pm2 stop clicom

# Supprimer
pm2 delete clicom

# Monitoring (CPU, RAM)
pm2 monit

# Sauvegarder la configuration
pm2 save

# Voir les infos détaillées
pm2 show clicom
```

---

## 🔒 SSL / HTTPS

```bash
# Obtenir un certificat SSL (Let's Encrypt)
sudo certbot --nginx -d votre-domaine.com

# Renouveler manuellement
sudo certbot renew

# Tester le renouvellement
sudo certbot renew --dry-run
```

---

## 🌐 Nginx

```bash
# Tester la configuration
sudo nginx -t

# Recharger la configuration
sudo systemctl reload nginx

# Redémarrer Nginx
sudo systemctl restart nginx

# Voir les logs d'erreur
sudo tail -f /var/log/nginx/error.log

# Voir les logs d'accès
sudo tail -f /var/log/nginx/access.log
```

---

## 🔍 Diagnostic

```bash
# Vérifier si Node.js est installé
node -v
npm -v

# Vérifier les processus sur le port 3000
netstat -tulpn | grep 3000
# OU
lsof -i :3000

# Tuer un processus sur le port 3000
kill -9 $(lsof -t -i:3000)

# Espace disque
df -h

# Mémoire RAM
free -h

# Processus les plus gourmands
top
# OU
htop
```

---

## 🗂️ Gestion des Fichiers

```bash
# Transférer un fichier via SCP
scp -P 22 fichier.txt user@serveur:~/clicom/

# Télécharger un fichier depuis le serveur
scp -P 22 user@serveur:~/clicom/fichier.txt ./

# Synchroniser un dossier (rsync)
rsync -avz --progress source/ user@serveur:~/destination/

# Permissions correctes
chmod -R 755 ~/clicom/public
chmod 644 ~/clicom/.env.production
```

---

## 📦 Git

```bash
# Cloner le repo
git clone https://github.com/votre-compte/clicom.git

# Mettre à jour depuis origin
git pull origin main

# Voir l'état
git status

# Commit et push
git add .
git commit -m "Message de commit"
git push origin main
```

---

## 🧹 Maintenance

```bash
# Nettoyer le cache npm
npm cache clean --force

# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install

# Nettoyer les logs PM2
pm2 flush clicom

# Rotation des logs Nginx (manuel)
sudo logrotate -f /etc/logrotate.d/nginx

# Mettre à jour Node.js
nvm install 20
nvm use 20
nvm alias default 20
```

---

## 🔄 Backup

```bash
# Sauvegarder la base de données (si applicable)
# mysqldump -u user -p database > backup.sql

# Sauvegarder les fichiers
tar -czf clicom-backup-$(date +%Y%m%d).tar.gz ~/clicom

# Télécharger le backup
scp user@serveur:~/clicom-backup-*.tar.gz ./backups/

# Restaurer depuis backup
tar -xzf clicom-backup-20260504.tar.gz -C ~/
```

---

## 🔐 Sécurité

```bash
# Changer les permissions .env
chmod 600 .env.production

# Voir les connexions SSH actives
who

# Bannir une IP (fail2ban)
sudo fail2ban-client set sshd banip IP_ADDRESS

# Débannir une IP
sudo fail2ban-client set sshd unbanip IP_ADDRESS

# Mettre à jour le système
sudo apt update && sudo apt upgrade -y
```

---

## 📧 Test Email (SMTP)

```bash
# Installer mailutils
sudo apt install mailutils -y

# Tester l'envoi d'email
echo "Test email from server" | mail -s "Test Subject" contact@example.com
```

---

## 📝 Logs

```bash
# Logs PM2 (application)
pm2 logs clicom --lines 100

# Logs Nginx (erreurs)
sudo tail -f /var/log/nginx/error.log

# Logs système (syslog)
sudo tail -f /var/log/syslog

# Logs d'authentification SSH
sudo tail -f /var/log/auth.log
```

---

## 🎯 Performance

```bash
# Activer le mode cluster PM2 (plusieurs instances)
pm2 scale clicom 4  # 4 instances

# Redémarrer sans downtime
pm2 reload clicom

# Tester la vitesse du site
curl -o /dev/null -s -w 'Time: %{time_total}s\n' https://votre-domaine.com

# Analyser les performances
pm2 monit
```

---

## 🌍 DNS

```bash
# Vérifier les DNS
nslookup votre-domaine.com

# Tester la résolution DNS
dig votre-domaine.com

# Ping le domaine
ping votre-domaine.com
```

---

## 📞 Support

**Hostinger VPS:** https://support.hostinger.com  
**Documentation PM2:** https://pm2.keymetrics.io/  
**Documentation Next.js:** https://nextjs.org/docs  
**Contact CLICOM:** contact@clicom.ch

---

**Dernière mise à jour:** 2026-05-04
