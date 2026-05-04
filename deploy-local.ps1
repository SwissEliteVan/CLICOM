# Script PowerShell de déploiement LOCAL vers Hostinger (Windows)
# Alternative au script bash pour Windows natif (sans Git Bash)

###############################################################################
# Configuration - À PERSONNALISER
###############################################################################

$SSH_USER = "votre-user"
$SSH_HOST = "votre-serveur.hostinger.com"
$SSH_PORT = "22"
$REMOTE_DIR = "~/clicom"

###############################################################################

Write-Host "`n╔═══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  📦 Déploiement LOCAL → Hostinger (PowerShell)       ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Fonctions utilitaires
function Log-Info {
    param($Message)
    Write-Host "[INFO] $Message" -ForegroundColor Green
}

function Log-Warn {
    param($Message)
    Write-Host "[WARN] $Message" -ForegroundColor Yellow
}

function Log-Error {
    param($Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Vérifier la configuration
if ($SSH_USER -eq "votre-user" -or $SSH_HOST -eq "votre-serveur.hostinger.com") {
    Log-Error "Veuillez configurer SSH_USER et SSH_HOST dans ce script!"
    exit 1
}

# Vérifier que nous sommes dans le bon répertoire
if (-not (Test-Path "package.json") -or -not (Test-Path "next.config.mjs")) {
    Log-Error "Ce script doit être exécuté depuis la racine du projet!"
    exit 1
}

# Méthode 1: Utiliser scp (si disponible via OpenSSH Windows)
Log-Info "Vérification de scp (OpenSSH)..."
if (Get-Command scp -ErrorAction SilentlyContinue) {
    Log-Info "Création d'un package pour le transfert..."
    
    # Créer un dossier temporaire pour le package
    $tempDir = ".\temp_deploy"
    if (Test-Path $tempDir) {
        Remove-Item -Recurse -Force $tempDir
    }
    New-Item -ItemType Directory -Path $tempDir | Out-Null
    
    # Copier les fichiers nécessaires (exclure node_modules, .next, etc.)
    Log-Info "Copie des fichiers..."
    
    $excludeDirs = @('.next', 'node_modules', '.git', 'logs', 'temp_deploy')
    $excludeFiles = @('*.log', '.env.local', '.DS_Store', 'Thumbs.db')
    
    Get-ChildItem -Path . -Recurse | Where-Object {
        $path = $_.FullName
        $exclude = $false
        foreach ($dir in $excludeDirs) {
            if ($path -like "*\$dir\*" -or $path -like "*\$dir") {
                $exclude = $true
                break
            }
        }
        foreach ($file in $excludeFiles) {
            if ($_.Name -like $file) {
                $exclude = $true
                break
            }
        }
        -not $exclude
    } | ForEach-Object {
        $dest = $_.FullName.Replace((Get-Location).Path, $tempDir)
        $destDir = Split-Path $dest -Parent
        if (-not (Test-Path $destDir)) {
            New-Item -ItemType Directory -Path $destDir -Force | Out-Null
        }
        if (-not $_.PSIsContainer) {
            Copy-Item $_.FullName -Destination $dest -Force
        }
    }
    
    # Créer une archive ZIP
    Log-Info "Création de l'archive..."
    $archivePath = ".\clicom-deploy.zip"
    if (Test-Path $archivePath) {
        Remove-Item $archivePath -Force
    }
    Compress-Archive -Path "$tempDir\*" -DestinationPath $archivePath
    
    # Transférer via scp
    Log-Info "Transfert vers le serveur Hostinger..."
    scp -P $SSH_PORT $archivePath "${SSH_USER}@${SSH_HOST}:~/clicom-deploy.zip"
    
    # Décompresser et déployer sur le serveur
    Log-Info "Décompression et déploiement sur le serveur..."
    ssh -p $SSH_PORT "${SSH_USER}@${SSH_HOST}" @"
cd ~
mkdir -p $REMOTE_DIR
unzip -o clicom-deploy.zip -d $REMOTE_DIR
rm clicom-deploy.zip
cd $REMOTE_DIR
bash deploy.sh
"@
    
    # Nettoyage
    Remove-Item $archivePath -Force
    Remove-Item -Recurse -Force $tempDir
    
    Log-Info "✅ Déploiement terminé!"
}
else {
    Log-Warn "OpenSSH (scp) n'est pas disponible."
    Log-Info "Options alternatives:"
    Write-Host "  1. Installer OpenSSH: " -NoNewline
    Write-Host "Paramètres Windows → Applications → Fonctionnalités optionnelles → Client OpenSSH" -ForegroundColor Yellow
    Write-Host "  2. Utiliser Git Bash: " -NoNewline
    Write-Host "bash deploy-local.sh" -ForegroundColor Yellow
    Write-Host "  3. Utiliser un client FTP (FileZilla): " -NoNewline
    Write-Host "Télécharger manuellement les fichiers" -ForegroundColor Yellow
    Write-Host "  4. Utiliser Git: " -NoNewline
    Write-Host "Pousser sur Git puis git pull sur le serveur" -ForegroundColor Yellow
}

Write-Host "`nPour vérifier les logs sur le serveur:" -ForegroundColor Cyan
Write-Host "  ssh -p $SSH_PORT ${SSH_USER}@${SSH_HOST} 'pm2 logs clicom'" -ForegroundColor White
