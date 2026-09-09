import type { RawProject } from '~/utils/types/projects.types';

// `shortDescription` carries { en, fr }. `blocks` are still empty pending real
// write-ups (RENOVATION.md owner follow-up); when added, their `title`/`content`
// take { en, fr } too. FR copy below is a first pass — owner should review voice.
export const projects: RawProject[] = [
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
      en: 'Company website for Ardatho.',
      fr: "Site vitrine de l'entreprise Ardatho."
    },
    banner: 'https://img.thomaslasalmonie.me/ardatho/banner.jpg',
    status: 'play',
    links: ['https://ardatho.com/'],
    technologiesUsed: []
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
