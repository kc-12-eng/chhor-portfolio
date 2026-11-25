# Portfolio BTS SIO SISR — Ksatiyarith Patrice Chhor

Portfolio personnel en HTML/CSS/JavaScript, avec animations et appel à l’API publique GitHub.

## Consulter le site

Une fois GitHub Pages activé : **https://kc-12-eng.github.io/chhor-portfolio/**

## Rubriques incluses

- Accueil animé et identité professionnelle
- CV avec lien vers la version PDF publique anonymisée
- Stage de première année à l’Institut Saint-Dominique (Pau)
- Projet Fruit / Figue : pfSense, WAN/DMZ/LAN, Web/DNS, SquidGuard
- Les six compétences E5 du bloc 1
- Veille PQC / VPN IPsec — suivi S1 à S6 (13 octobre au 17 novembre 2026)
- Laboratoire API : lecture de l’API REST GitHub

Le code du site est contenu dans `index.html`. Les documents téléchargeables sont encore servis depuis **chhorportfolio.wordpress.com**, qui reste actif.

## Activer GitHub Pages (une fois)

1. Dans le dépôt, ouvrez **Settings → Pages**.
2. Sous **Build and deployment → Source**, choisissez **GitHub Actions**.
3. Puis ouvrez **Actions** et déclenchez manuellement **Publier le portfolio GitHub Pages** avec **Run workflow** si aucune exécution ne démarre.
4. Quand le déploiement a réussi, le site sera accessible sur l’adresse indiquée plus haut.

La configuration de déploiement se trouve dans `.github/workflows/pages.yml`.

## Modifier le site

La structure, les styles CSS et les interactions JavaScript sont dans `index.html`. Le site fonctionne sans npm, sans framework et sans clé d’API.

Pour tester localement : ouvrez le dossier dans VS Code et lancez un serveur HTTP, par exemple :

```bash
python -m http.server 8000
```

Puis visitez http://localhost:8000/.

## Confidentialité

Vérifier les documents joints avant de les rendre publics. Ne jamais inscrire de mot de passe, clé API, jeton ou donnée d’entreprise sensible dans le code du dépôt.

## Version WordPress

Version de référence conservée : https://chhorportfolio.wordpress.com/
