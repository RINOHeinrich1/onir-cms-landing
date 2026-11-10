# ONIR CMS — Landing page

Site public statique de ONIR CMS, servi sur **https://onir-cms.tech**.

L’application (dashboard, liens publics, API, documentation) vit dans le dépôt séparé
[`RINOHeinrich1/onir-cms`](https://github.com/RINOHeinrich1/onir-cms) et est servie sur
**https://cms-backoffice.onirtech.com**.

## Langues

Le site est généré statiquement en trois langues :

- français à la racine (`/`, `/fonctionnalites/`, `/themes/`, `/participer/`, …) ;
- anglais sous `/en/` (`/en/features/`, `/en/themes/`, `/en/participate/`, …) ;
- malagasy sous `/mg/` (`/mg/fampiasa/`, `/mg/endrika/`, `/mg/handray-anjara/`, …).

Le sélecteur de langue du header pointe vers la **même page** dans chaque langue. Les liens
`hreflang`, le canonical et le sitemap sont générés depuis la table de routes
`src/_data/allLocales.js`.

## Structure

- `src/pages/` — gabarits Nunjucks des pages (accueil, fonctionnalités, thèmes, participer,
  mentions légales, confidentialité, 404).
- `src/_includes/` — layout, header/footer (variantes v2 et legacy), sélecteur de langue et
  composants (carte malagasy, fournisseurs, icônes de thèmes).
- `src/_data/` — locales/routes, métadonnées du site, liens de démonstration, téléchargements
  de thèmes et données calculées (canonical, hreflang, CSS).
- `i18n/fr/`, `i18n/en/`, `i18n/mg/` — dictionnaires JSON par page. Le français est la source ;
  `npm run check:i18n` vérifie la parité des clés et des placeholders.
- `assets/` — CSS, JS, polices, logos, plugins et vendor (inchangé, copié tel quel dans `dist/`).
- `deploy/` — scripts et vhosts Nginx.
- `dist/` — sortie générée, **non versionnée**.

Les pages historiques (`themes`, `participer`, `mentions-legales`, `confidentialite-site`)
utilisent encore `landing.css` et un header/footer « legacy » ; l’accueil et la page
fonctionnalités utilisent `landing-v2.css`. Le sélecteur de langue est commun aux deux.

### Carte des partenaires

La page `/participer/` charge les partenaires publiés depuis
`https://partner-api.onir-cms.tech/partenaires`, puis les place dans le catalogue
`assets/data/town-layout.js` (26 emplacements : centre, organisations, partenaires,
particuliers).

- `mapSlotId` (optionnel, API) force un emplacement ;
- sans `mapSlotId`, la première place libre compatible avec `nature` est utilisée ;
- chaque emplacement libre affiche une pancarte « Place disponible » ;
- les partenaires sans place restent dans la liste d’attente et sont signalés ;
- `?demo=1` affiche les données locales de `assets/data/sponsors.js` ;
- si l’API est indisponible, la carte affiche les places libres sans bloquer la page.

## Développement local

```bash
npm ci
npm run check:i18n
npm run dev          # serveur local Eleventy
# ou
npm run build        # génère dist/
python3 -m http.server 8080 --directory dist
```

Le build exécute `check:i18n` avant de générer les pages. Une clé manquante, une valeur vide
hors clés optionnelles, un placeholder différent ou une balise HTML non autorisée bloque le build.

## Traductions

- `fr` est la langue de référence.
- `en` et `mg` doivent avoir exactement les mêmes clés que `fr`.
- Le malagasy est un **brouillon** en attente de relecture native.
- Les mentions légales et la politique de confidentialité EN/MG portent la mention
  « seule la version française fait foi ».
- Les libellés générés dynamiquement par `assets/js/participer.js` (ville 3D, chatbot de
  sponsoring) restent en français ; un avertissement localisé est affiché sur les pages
  EN/MG.

## Déploiement

Le site est généré dans `dist/` puis synchronisé vers le répertoire servi par Nginx
(par défaut `/var/www/onir-cms-landing`).

```bash
sudo ./deploy/apply-production.sh
```

Le script :

- met à jour le clone serveur, exécute `npm ci` et `npm run build` ;
- synchronise `dist/` dans `/var/www/onir-cms-landing` ;
- installe les vhosts `onir-cms.tech` (statique), `cms.onirtech.com` (redirection 301 vers
  `onir-cms.tech`) et `cms-backoffice.onirtech.com` (proxy vers l’application sur
  `127.0.0.1:3100`) ;
- aligne `APP_URL` dans `/opt/onir-cms/.env.release` ;
- déploie la version applicative `${APP_VERSION:-0.8.0}` avec `/opt/onir-cms/deploy.sh` ;
- teste et recharge Nginx.

Variables surchargeables : `APP_VERSION`, `APP_DIR`, `WEB_ROOT`, `APP_ENV`, `APP_DEPLOY`.

Le script plus simple `deploy/deploy.sh` ne synchronise que le site statique généré.
Voir `deploy/nginx-location.conf` pour les règles de routage et les redirections des anciennes
URL de l’application vers `cms-backoffice.onirtech.com`.

## Preprod

La landing preprod est déployée automatiquement sur chaque push `main` :

```bash
sudo -u deploy-preprod /opt/onir-cms-landing-preprod/deploy/preprod.sh
```

- Dépôt serveur : `/opt/onir-cms-landing-preprod`
- Répertoire web : `/var/www/onir-cms-landing-preprod`
- URL : `https://preprod-cms.onirtech.com/` (Basic Auth)
- Le script construit `dist/`, synchronise le répertoire web, puis réécrit les liens vers
  `cms-backoffice.onirtech.com` et `magic-panel.onir-cms.tech` vers l’application preprod.
- Le workflow est dans `.github/workflows/preprod.yml` et vérifie `/`, `/themes/`, `/en/`,
  `/mg/`, `/en/features/` et `/mg/fampiasa/`.

Le déploiement production reste manuel via `deploy/apply-production.sh`.

## Règles de séparation

- Aucun code applicatif, aucune dépendance Next.js/React ici.
- Les liens « Documentation » et « Se connecter » pointent vers l’application publique
  (`cms-backoffice.onirtech.com` / `magic-panel.onir-cms.tech`), réécrits en preprod.
- Les liens de démonstration pointent vers les URL publiques de l’application.
- `cms.onirtech.com` redirige en 301 vers `onir-cms.tech` ; les anciennes URL applicatives
  sont redirigées vers `cms-backoffice.onirtech.com`.
