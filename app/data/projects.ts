import type { Project } from '~/utils/types/projects.types';

export const projects: Project[] = [
  {
    slug: 'bell-iot',
    name: 'Bell IoT platform',
    shortDescription:
      'IoT application platform for Bell Business Markets — configurable telemetry APIs and reusable dashboard widgets across multiple product dashboards.',
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
    shortDescription:
      "Publishing platform behind Baum Publications' trade titles — Heavy Equipment Guide and Recycling Product News — on a Nuxt front-end with a PHP/Elasticsearch back-end.",
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
    shortDescription: 'Company website for Ardatho.',
    banner: 'https://img.thomaslasalmonie.me/ardatho/banner.jpg',
    status: 'play',
    links: ['https://ardatho.com/'],
    technologiesUsed: []
  },
  {
    slug: 'fillactive',
    name: 'Fillactive',
    shortDescription:
      'Content-management system and reporting dashboards for Fillactive, a Québec non-profit promoting physical activity for teenagers.',
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
    shortDescription:
      'Mobile MMORPG — a React Native game client with Node game services and a Nuxt companion site.',
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
    shortDescription:
      'Internal products for Ax2, a Montréal digital studio — an in-house intelligent CMS and the CI/CD automation around it.',
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
    shortDescription:
      'Fan-club and membership sites for the Montréal Canadiens — Club 1909, the fan club, and the 7th Player program.',
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
    shortDescription:
      'Corporate and product sites for Lumenpulse / LMPG, an architectural lighting manufacturer, across its Lumenpulse and Exenia brands.',
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
    shortDescription:
      'Website and online catalogue for Librairie Monet, an independent Montréal bookstore, backed by Elasticsearch search and a RabbitMQ pipeline.',
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
  //   {
  //     slug: 'nhlbet',
  //     name: 'Nhl bet',
  //     banner: 'https://picsum.photos/200/200',
  //     status: 'stop',
  //     shortDescription: 'Lorem ipsum dolor sit amet.',
  //     technologiesUsed: ['typescript', 'vuejs', 'nodejs', 'graphql', 'digital-ocean', 'docker', 'redis', 'github', 'mysql']
  //   },
];
