# ONIR CMS — Landing page

Site public statique de ONIR CMS, servi sur **https://cms.onirtech.com**.

L’application (dashboard, liens publics, API, documentation) vit dans le dépôt séparé
[`RINOHeinrich1/onir-cms`](https://github.com/RINOHeinrich1/onir-cms) et est servie sur
**https://cms-backoffice.onirtech.com**.

## Contenu

- `index.html` — page d’accueil et choix des démonstrations.
- `plugins/` — marketplace et téléchargement des templates.
- `participer/` — page unique avec onglets Sponsor (ville 2D/3D + chatbot) et Développeur.
- `mentions-legales/` — mentions légales.
- `confidentialite-site/` — politique de confidentialité du site et des démonstrations.
- `assets/css/` — styles autonomes (aucun framework).
- `assets/js/` — thème clair/sombre et dialogue de démonstration.
- `assets/fonts/` — Montserrat auto-hébergée.
- `assets/logo/` — logos clair/sombre.
- `assets/plugins/` — archives `.onirtech-template` et manifests de release.
- `assets/data/sponsors.js` — données de la ville et des sponsors (démonstration).
- `assets/js/participer.js` — carte 2D, onglets et chatbot de sponsoring.
- `assets/js/town-3d.js` — scène Three.js low-poly chargée à la demande.
- `assets/vendor/` — Three.js et OrbitControls (MIT, fichiers de licence inclus).

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
sudo ./deploy/apply-production.sh
```

Le script :

- met à jour le clone serveur et synchronise le site dans `/var/www/onir-cms-landing` ;
- installe les vhosts `cms.onirtech.com` (statique) et `cms-backoffice.onirtech.com` (proxy
  vers l’application sur `127.0.0.1:3100`) ;
- aligne `APP_URL` dans `/opt/onir-cms/.env.release` ;
- déploie la version applicative `${APP_VERSION:-0.8.0}` avec `/opt/onir-cms/deploy.sh` ;
- teste et recharge Nginx.

Variables surchargeables : `APP_VERSION`, `APP_DIR`, `WEB_ROOT`, `APP_ENV`, `APP_DEPLOY`.

Le script plus simple `deploy/deploy.sh` ne synchronise que les fichiers statiques.
Voir `deploy/nginx-location.conf` pour les règles de routage et les redirections des anciennes
URL de l’application vers `cms-backoffice.onirtech.com`.

## Preprod

La landing preprod est déployée automatiquement sur chaque push `main` :

```bash
ssh deploy-preprod@preprod-cms.onirtech.com \
  "/opt/onir-cms-landing-preprod/deploy/preprod.sh"
```

- Dépôt serveur : `/opt/onir-cms-landing-preprod`
- Répertoire web : `/var/www/onir-cms-landing-preprod`
- URL : `https://preprod-cms.onirtech.com/` (Basic Auth)
- Les liens vers `cms-backoffice.onirtech.com` sont réécrits vers l’application preprod.
- Le workflow est dans `.github/workflows/preprod.yml`.
- Runner self-hosted : `onir-landing-preprod` (utilisateur `deploy-preprod`).

Le déploiement production reste manuel via `deploy/apply-production.sh`.

## Règles de séparation

- Aucun code applicatif, aucune dépendance Next.js/React ici.
- Les liens « Documentation » et « Se connecter » pointent vers `cms-backoffice.onirtech.com`.
- Les liens de démonstration pointent vers les URL publiques de l’application.
- Les anciennes URL applicatives servies par `cms.onirtech.com` sont redirigées en 301.
