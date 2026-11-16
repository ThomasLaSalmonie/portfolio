import type { RawProject } from '~/utils/types/projects.types';

// `shortDescription` carries { en, fr }. `blocks` are still empty pending real
// write-ups (RENOVATION.md owner follow-up); when added, their `title`/`content`
// take { en, fr } too. FR copy below is a first pass — owner should review voice.
export const projects: RawProject[] = [
  {
    slug: 'traceprints',
    name: 'TracePrints',
    shortDescription: {
      en: 'Turn the GPX file of a ride, run or hike into a minimalist map poster — designed in the browser, sold as a 300 DPI download or a printed poster shipped to your door.',
      fr: "Transformez le fichier GPX d'une sortie vélo, course ou randonnée en affiche cartographique minimaliste — conçue dans le navigateur, vendue en fichier 300 DPI ou imprimée et livrée chez vous."
    },
    banner: '/projects/traceprints/banner.webp',
    status: 'play',
    links: ['https://traceprints.art/'],
    blocks: [
      {
        title: {
          en: 'A poster editor in the browser',
          fr: 'Un éditeur d’affiche dans le navigateur'
        },
        content: {
          en: 'Drop a GPX export from Strava, Garmin Connect or Komoot and the track is parsed client-side into a simplified route, an elevation profile and stats. The poster is drawn with MapLibre GL on OpenStreetMap vector tiles, with a custom map style generated per theme (Ivory, Charcoal, Blueprint, Trace Orange) and five layouts. The draft is kept locally, so nothing is uploaded until you buy.',
          fr: 'Déposez un export GPX de Strava, Garmin Connect ou Komoot : le tracé est analysé côté client en un parcours simplifié, un profil d’élévation et des statistiques. L’affiche est dessinée avec MapLibre GL sur des tuiles vectorielles OpenStreetMap, avec un style de carte généré pour chaque thème (Ivory, Charcoal, Blueprint, Trace Orange) et cinq mises en page. Le brouillon reste en local : rien n’est envoyé avant l’achat.'
        },
        image: '/projects/traceprints/editor.webp',
        imagePosition: 'left'
      },
      {
        title: { en: 'Print-ready rendering', fr: 'Un rendu prêt pour l’impression' },
        content: {
          en: 'After a guest Stripe Checkout, a webhook claims the order and a queued headless Chromium (Playwright) renders the exact same Vue poster at 300 DPI. The buyer gets a signed download link by email; physical prints (5×7, A4, A3) are sent to Gelato for print-on-demand, with shipping updates forwarded by email. Failed renders retry, alert the admin and recover on restart.',
          fr: 'Après un paiement Stripe Checkout sans compte, un webhook réserve la commande et un Chromium headless (Playwright) en file d’attente rend exactement la même affiche Vue à 300 DPI. L’acheteur reçoit un lien de téléchargement signé par courriel ; les tirages (5×7, A4, A3) partent chez Gelato en impression à la demande, avec le suivi d’expédition relayé par courriel. Les rendus échoués sont relancés, signalés à l’admin et repris au redémarrage.'
        },
        image: '/projects/traceprints/poster.webp',
        imagePosition: 'right'
      },
      {
        title: { en: 'Built and run solo', fr: 'Conçu et exploité en solo' },
        content: {
          en: 'A single Nuxt 4 app (Nuxt UI, Nitro server routes, shared zod schemas) on Supabase Postgres via Drizzle, shipped as a Docker image to a DigitalOcean droplet behind Caddy by GitHub Actions. Bilingual FR/EN with a Markdown blog, Sentry error monitoring and self-hosted, cookie-free Umami analytics with privacy scrubbing.',
          fr: 'Une seule application Nuxt 4 (Nuxt UI, routes serveur Nitro, schémas zod partagés) sur Supabase Postgres via Drizzle, livrée en image Docker sur un droplet DigitalOcean derrière Caddy par GitHub Actions. Bilingue FR/EN avec un blogue Markdown, suivi des erreurs Sentry et statistiques Umami auto-hébergées, sans cookie et anonymisées.'
        }
      }
    ],
    technologiesUsed: [
      'typescript',
      'vuejs',
      'nuxt',
      'nodejs',
      'maplibre',
      'postgresql',
      'stripe',
      'playwright',
      'docker',
      'digital-ocean',
      'github',
      'claude-code'
    ]
  },
  {
    slug: 'bell-iot',
    name: 'Bell IoT platform',
    shortDescription: {
      en: 'IoT application platform for Bell Business Markets — configurable telemetry APIs and reusable dashboard widgets across multiple product dashboards.',
      fr: 'Plateforme applicative IoT pour Bell Business Markets — API de télémétrie configurables et widgets de tableau de bord réutilisables sur plusieurs produits.'
    },
    links: ['https://business.bell.ca/shop/medium-large/internet-of-things/iot-applications'],
    status: 'play',
    technologiesUsed: [
      'typescript',
      'vuejs',
      'nodejs',
      'graphql',
      'restapi',
      'azure',
      'kubernetes',
      'docker',
      'redis',
      'mongodb',
      'gitlab'
    ]
  },
  {
    slug: 'baumpub',
    name: 'Baum publications',
    shortDescription: {
      en: "Publishing platform behind Baum Publications' trade titles — Heavy Equipment Guide and Recycling Product News — on a Nuxt front-end with a PHP/Elasticsearch back-end.",
      fr: "Plateforme d'édition derrière les titres spécialisés de Baum Publications — Heavy Equipment Guide et Recycling Product News — front-end Nuxt et back-end PHP/Elasticsearch."
    },
    banner: 'https://img.thomaslasalmonie.me/baum/banner.jpg',
    status: 'play',
    links: [
      'https://baumpub.com/',
      'https://www.heavyequipmentguide.ca/',
      'https://www.recyclingproductnews.com/'
    ],
    technologiesUsed: [
      'typescript',
      'vuejs',
      'nuxt',
      'gcp',
      'nodejs',
      'graphql',
      'restapi',
      'kubernetes',
      'docker',
      'redis',
      'github',
      'php',
      'elasticsearch',
      'mysql'
    ]
  },
  {
    slug: 'ardatho',
    name: 'Ardatho',
    shortDescription: {
      en: 'My freelance software studio — custom platforms, integrations between business tools (ERP, CRM, CMS) and AI connected to a company’s own data. The site is a bilingual one-pager I designed and built.',
      fr: 'Mon studio de développement indépendant — plateformes sur mesure, intégrations entre outils d’affaires (ERP, CRM, CMS) et IA branchée sur les données de l’entreprise. Le site est un one-pager bilingue que j’ai conçu et développé.'
    },
    banner: '/projects/ardatho/banner.webp',
    status: 'play',
    links: ['https://ardatho.com/'],
    blocks: [
      {
        title: {
          en: 'Three offers, written for owners',
          fr: 'Trois offres, écrites pour les dirigeants'
        },
        content: {
          en: 'Ardatho builds the software a business can’t buy off the shelf: custom websites and platforms, connections between the tools a company already runs on, and AI assistants that can actually see its clients and orders (via MCP servers, read-only by default). Each offer is framed around the situation that triggers the call and concrete example projects, rather than a list of technologies.',
          fr: 'Ardatho développe le logiciel qu’une entreprise ne peut pas acheter tout fait : sites et plateformes sur mesure, connexions entre les outils qu’elle utilise déjà, et assistants IA qui voient réellement ses clients et ses commandes (via des serveurs MCP, en lecture seule par défaut). Chaque offre part de la situation qui déclenche l’appel et d’exemples de projets concrets, plutôt que d’une liste de technologies.'
        },
        image: '/projects/ardatho/services.webp',
        imagePosition: 'left'
      },
      {
        title: { en: 'A transparent process', fr: 'Un processus transparent' },
        content: {
          en: 'One or two clients at a time and no middleman: a 30-minute first call, a few days of written scoping, a new build to try every week on staging, then launch with the code in the client’s repositories from day one. Engagements are a short diagnostic, a fixed-price project or a monthly retainer.',
          fr: 'Un ou deux clients à la fois, sans intermédiaire : un premier appel de 30 minutes, quelques jours de cadrage écrit, une nouvelle version à essayer chaque semaine en préproduction, puis la mise en ligne, avec le code dans les dépôts du client dès le premier jour. Les mandats prennent la forme d’un diagnostic, d’un projet à prix fixe ou d’un forfait mensuel.'
        },
        image: '/projects/ardatho/process.webp',
        imagePosition: 'right'
      },
      {
        title: {
          en: 'Built like the rest of my work',
          fr: 'Construit comme le reste de mon travail'
        },
        content: {
          en: 'A statically generated Nuxt 4 one-pager with Tailwind CSS v4 and shadcn-vue on top of a custom, dark-first design system. French by default with a full English version (@nuxtjs/i18n), SEO metadata and sitemaps from @nuxtjs/seo, self-hosted fonts and inlined icons, linted and type-checked on every commit.',
          fr: 'Un one-pager Nuxt 4 généré en statique, avec Tailwind CSS v4 et shadcn-vue sur un système de design maison, sombre par défaut. Français par défaut avec une version anglaise complète (@nuxtjs/i18n), métadonnées SEO et plans de site via @nuxtjs/seo, polices auto-hébergées et icônes intégrées, lint et vérification des types à chaque commit.'
        }
      }
    ],
    technologiesUsed: ['typescript', 'vuejs', 'nuxt', 'html', 'css', 'mcp']
  },
  {
    slug: 'fillactive',
    name: 'Fillactive',
    shortDescription: {
      en: 'Content-management system and reporting dashboards for Fillactive, a Québec non-profit promoting physical activity for teenagers.',
      fr: "Système de gestion de contenu et tableaux de bord de reddition de comptes pour Fillactive, un OBNL québécois qui promeut l'activité physique chez les adolescents."
    },
    links: ['https://fillactive.ca/'],
    banner: 'https://img.thomaslasalmonie.me/fillactive/banner.jpg',
    status: 'stop',
    technologiesUsed: [
      'typescript',
      'vuejs',
      'nuxt',
      'nodejs',
      'graphql',
      'restapi',
      'digital-ocean',
      'docker',
      'redis',
      'github',
      'mysql'
    ]
  },
  {
    slug: 'megaswords',
    name: 'Megaswords',
    links: ['https://megaswords.com/'],
    banner: 'https://img.thomaslasalmonie.me/megaswords/banner.jpg',
    status: 'pause',
    shortDescription: {
      en: 'Mobile MMORPG — a React Native game client with Node game services and a Nuxt companion site.',
      fr: 'MMORPG mobile — client de jeu React Native, services de jeu Node et site compagnon Nuxt.'
    },
    blocks: [],
    technologiesUsed: [
      'typescript',
      'react',
      'react-native',
      'vuejs',
      'nuxt',
      'nodejs',
      'graphql',
      'restapi',
      'digital-ocean',
      'docker',
      'redis',
      'github',
      'mysql'
    ]
  },
  {
    slug: 'ax2',
    name: 'Ax2',
    shortDescription: {
      en: 'Internal products for Ax2, a Montréal digital studio — an in-house intelligent CMS and the CI/CD automation around it.',
      fr: "Produits internes pour Ax2, un studio numérique montréalais — un CMS intelligent maison et l'automatisation CI/CD autour."
    },
    links: ['https://ax2.ca/'],
    banner: 'https://img.thomaslasalmonie.me/ax2/banner.jpg',
    status: 'stop',
    technologiesUsed: [
      'typescript',
      'vuejs',
      'nuxt',
      'nodejs',
      'graphql',
      'digital-ocean',
      'gcp',
      'restapi',
      'kubernetes',
      'docker',
      'redis',
      'github',
      'php',
      'mysql'
    ]
  },
  {
    slug: 'canadiens',
    name: 'Canadiens',
    shortDescription: {
      en: 'Fan-club and membership sites for the Montréal Canadiens — Club 1909, the fan club, and the 7th Player program.',
      fr: 'Sites de club de partisans et d’adhésion pour les Canadiens de Montréal — Club 1909, le club de partisans et le programme 7e joueur.'
    },
    links: [
      'https://www.club1909.com/',
      'https://fanclub.canadiens.com/',
      'https://www.nhl.com/canadiens/fans/7thplayer'
    ],
    banner: 'https://img.thomaslasalmonie.me/canadiens/banner.jpg',
    status: 'stop',
    technologiesUsed: [
      'nodejs',
      'gcp',
      'restapi',
      'kubernetes',
      'docker',
      'redis',
      'github',
      'php',
      'mysql'
    ]
  },
  {
    slug: 'lumenpulse',
    name: 'Lumenpulse',
    shortDescription: {
      en: 'Corporate and product sites for Lumenpulse / LMPG, an architectural lighting manufacturer, across its Lumenpulse and Exenia brands.',
      fr: "Sites corporatifs et produits pour Lumenpulse / LMPG, fabricant d'éclairage architectural, pour ses marques Lumenpulse et Exenia."
    },
    links: ['https://www.lumenpulse.com/', 'https://www.lmpg.com/', 'https://www.exenia.eu/en/'],
    banner: 'https://img.thomaslasalmonie.me/lumenpulse/banner.jpg',
    status: 'stop',
    technologiesUsed: [
      'vuejs',
      'nodejs',
      'gcp',
      'restapi',
      'kubernetes',
      'docker',
      'redis',
      'github',
      'php',
      'elasticsearch',
      'mysql'
    ]
  },
  {
    slug: 'monet',
    name: 'Librairie Monet',
    shortDescription: {
      en: 'Website and online catalogue for Librairie Monet, an independent Montréal bookstore, backed by Elasticsearch search and a RabbitMQ pipeline.',
      fr: 'Site web et catalogue en ligne pour la Librairie Monet, librairie indépendante de Montréal, avec recherche Elasticsearch et pipeline RabbitMQ.'
    },
    links: ['https://www.librairiemonet.com/', 'https://catalogue.librairiemonet.com/'],
    status: 'stop',
    technologiesUsed: [
      'typescript',
      'vuejs',
      'nuxt',
      'nodejs',
      'graphql',
      'gcp',
      'restapi',
      'kubernetes',
      'docker',
      'redis',
      'github',
      'elasticsearch',
      'mysql',
      'rabbitmq'
    ]
  }
];
