# ONIR CMS — Landing page

Site public statique de ONIR CMS, servi sur **https://cms.onirtech.com**.

L’application (dashboard, liens publics, API, documentation) vit dans le dépôt séparé
[`RINOHeinrich1/onir-cms`](https://github.com/RINOHeinrich1/onir-cms) et est servie sur
**https://cms-backoffice.onirtech.com**.

## Contenu

- `index.html` — page d’accueil et choix des démonstrations.
- `plugins/` — marketplace et téléchargement des templates.
- `mentions-legales/` — mentions légales.
- `confidentialite-site/` — politique de confidentialité du site et des démonstrations.
- `assets/css/` — styles autonomes (aucun framework).
- `assets/js/` — thème clair/sombre et dialogue de démonstration.
- `assets/fonts/` — Montserrat auto-hébergée.
- `assets/logo/` — logos clair/sombre.
- `assets/plugins/` — archives `.onirtech-template` et manifests de release.

## Développement local

Aucun build. Servir la racine du dépôt avec un serveur statique :

```bash
python3 -m http.server 8080
# http://localhost:8080
```

## Déploiement

Le site est un ensemble de fichiers statiques. Le serveur cible est un répertoire servi par
Nginx (par défaut `/var/www/onir-cms-landing`).

```bash
sudo ./deploy/deploy.sh
```

Le script met à jour le clone serveur, synchronise les fichiers et recharge Nginx.
Voir `deploy/nginx-location.conf` pour les règles de routage et les redirections des anciennes
URL de l’application vers `cms-backoffice.onirtech.com`.

## Règles de séparation

- Aucun code applicatif, aucune dépendance Next.js/React ici.
- Les liens « Documentation » et « Se connecter » pointent vers `cms-backoffice.onirtech.com`.
- Les liens de démonstration pointent vers les URL publiques de l’application.
- Les anciennes URL applicatives servies par `cms.onirtech.com` sont redirigées en 301.
