# MISSION D'OPTIMISATION GLOBALE (MODE CHIRURGICAL)

**RÈGLE ABSOLUE :** N'essaie JAMAIS de réécrire un fichier de 500 lignes d'un coup. Utilise tes outils pour faire des recherches et remplacements ciblés. 

Exécute ces 3 étapes une par une :

## 1. Images dans les sous-pages
- Scanne le dossier \public/images/\.
- Modifie \src/app/services/page.tsx\, \src/app/blog/page.tsx\, \src/app/contact/page.tsx\ et \src/app/devis/page.tsx\.
- Importe \
ext/image\ dans ces fichiers et injecte les images pertinentes à la place des placeholders (avec des balises alt optimisées SEO).

## 2. SEO et Performance (\layout.tsx\)
- Ouvre \src/app/layout.tsx\.
- Configure \
ext/font/google\ (police Inter) pour optimiser le rendu.
- Ajoute un objet \metadata\ complet (Title, Description, OpenGraph) orienté agence digitale pour PME suisses.

## 3. Indexation Statique
- Ouvre \src/app/sitemap.ts\.
- Assure-toi qu'il ne contient QUE des chaînes de caractères statiques (pas de \
ew Date()\, pas de variables complexes) car le projet est en \output: 'export'\.

Vérifie ton travail à chaque étape en t'assurant de ne rien casser.
