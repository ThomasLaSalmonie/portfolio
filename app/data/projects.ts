import type { Project } from '~/utils/types/projects.types';

export const projects: Project[] = [
  {
    slug: 'bell-iot',
    name: 'Bell IoT platform',
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
    banner: 'https://img.thomaslasalmonie.me/ardatho/banner.jpg',
    status: 'play',
    links: ['https://ardatho.com/'],
    technologiesUsed: []
  },
  {
    slug: 'fillactive',
    name: 'Fillactive',
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
    shortDescription: 'MMORPG mobile game',
    blocks: [],
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
      'mysql',
      'unity',
      'csharp'
    ]
  },
  {
    slug: 'ax2',
    name: 'Ax2',
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
    name: 'Librairie monet',
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
