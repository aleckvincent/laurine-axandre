# Laurine & Axandre — Site faire-part

Site d'information pour le mariage de Laurine et Axandre (24 octobre 2026), protégé par code d'accès, avec déroulé adapté au type d'invitation, galerie photo, RSVP par email et retransmission Zoom.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** — tokens de couleur (sage/terracotta/ivoire) dans [`src/app/globals.css`](src/app/globals.css)
- **next-intl** — fr (défaut) / en / de
- **Resend** + React Email — notifications RSVP
- **Vercel Blob** — hébergement des photos de galerie
- **jose** — cookie de session signé (JWT) pour le code d'accès
- Hébergement cible : **Vercel**

## Développement local

```bash
pnpm install
cp .env.example .env.local   # puis remplir les valeurs, voir ci-dessous
pnpm dev
```

Le site tourne sur http://localhost:3000.

### Variables d'environnement

Voir [`.env.example`](.env.example) pour la liste complète et leur rôle. Pour développer en local sans compte Resend, laissez `RESEND_API_KEY` vide : le formulaire RSVP échouera proprement (message d'erreur affiché) au lieu de planter.

Générer un `SESSION_SECRET` :

```bash
openssl rand -base64 32
```

## Codes d'accès et paliers d'invitation

Trois codes fixes, un par palier, définis en variables d'environnement (`ACCESS_CODE_MAIRIE`, `ACCESS_CODE_VIN_HONNEUR`, `ACCESS_CODE_COMPLET`). Les paliers sont **imbriqués** :

| Palier | Voit |
|---|---|
| `mairie` | Mairie + Cérémonie religieuse |
| `vin_honneur` | + Vin d'honneur |
| `complet` | + Soirée réception |

Le déroulé affiché ([`src/lib/schedule.ts`](src/lib/schedule.ts)) est filtré côté serveur selon le palier — jamais côté client uniquement.

## Galerie photo

Les photos ne sont pas commitées dans le repo. Pour les publier :

1. Déposer les fichiers dans `./gallery-photos/` (jpg/png/webp).
2. S'assurer que `BLOB_READ_WRITE_TOKEN` est configuré (voir déploiement ci-dessous).
3. `pnpm gallery:upload`
4. Coller le tableau affiché dans [`src/lib/gallery-manifest.ts`](src/lib/gallery-manifest.ts) (avec le texte alternatif des images).

## Déploiement sur Vercel

Ces étapes nécessitent vos propres comptes — je ne peux pas les créer à votre place :

1. **Créer un compte [Resend](https://resend.com)** (gratuit) → récupérer une clé API (`RESEND_API_KEY`).
2. **Pousser ce projet sur GitHub** (ou GitLab/Bitbucket).
3. **Créer un compte [Vercel](https://vercel.com)** et importer le repo → Vercel détecte Next.js automatiquement.
4. Dans **Project Settings → Environment Variables**, ajouter toutes les variables de `.env.example` (Production *et* Preview).
5. Dans l'onglet **Storage** du projet Vercel, créer un **Blob store** et le lier au projet — `BLOB_READ_WRITE_TOKEN` est alors injecté automatiquement.
6. Déployer. Le site est disponible sur une URL `*.vercel.app` ; un nom de domaine personnalisé peut être attaché plus tard dans **Settings → Domains** sans rien changer au code.
7. Vérifier les 3 codes d'accès et tester une soumission RSVP réelle avant de transmettre les codes aux invités.

## Structure du projet

```
src/
├── app/[locale]/          # pages (App Router, routing localisé)
│   ├── gate/               # saisie du code d'accès (publique)
│   └── (site)/              # pages protégées (accueil, déroulé, infos, galerie, RSVP)
├── components/             # composants UI, par domaine
├── lib/                    # logique serveur (auth, schedule, env, resend...)
├── i18n/messages/{fr,en,de}.json
└── emails/                 # template React Email
```

Voir aussi le plan de conception initial pour le détail des décisions d'architecture.
