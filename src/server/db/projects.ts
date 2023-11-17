import type { Project } from '../../utils/types/projects.types';

const projects: Project[] = [
  {
    slug: 'bell-iot',
    name: 'Bell IoT platform',
    links: ['https://business.bell.ca/shop/medium-large/internet-of-things/iot-applications'],
    // banner: 'https://picsum.photos/200/200',
    status: 'play',
    // shortDescription: 'Lorem ipsum dolor sit amet.',
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
    // banner: 'https://picsum.photos/200/200',
    status: 'play',
    links: [
      'https://baumpub.com/',
      'https://www.heavyequipmentguide.ca/',
      'https://www.recyclingproductnews.com/'
    ],
    // shortDescription: 'Lorem ipsum dolor sit amet.',
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
    slug: 'fillactive',
    name: 'Fillactive',
    links: ['https://fillactive.ca/'],
    // banner: 'https://picsum.photos/200/200',
    status: 'stop',
    // shortDescription: 'Lorem ipsum dolor sit amet.',
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
    // shortDescription: 'MMORPG mobile game',
    blocks: [
      {
        title: 'My super section to introduce the project',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed lorem urna. Nullam sed urna lorem. Nunc hendrerit tellus lorem. Etiam urna augue, vehicula quis libero eget, congue volutpat turpis. Maecenas imperdiet risus id est tincidunt, non tempor ex vestibulum. Morbi et massa in ipsum cursus porttitor. Proin ullamcorper sapien non velit placerat, sit amet consequat nisi euismod.',
        image: 'https://picsum.photos/200/200',
        imagePosition: 'left'
      }
    ],
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
  //   {
  //     slug: 'test',
  //     name: 'Your Awesome Project test 1',
  //     banner: 'https://img.thomaslasalmonie.me/background_parallax.jpeg',
  //     shortDescription:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed lorem urna. Nullam sed urna lorem.',
  //     blocks: [
  //       {
  //         title: 'My super section to introduce the project',
  //         content:
  //           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed lorem urna. Nullam sed urna lorem. Nunc hendrerit tellus lorem. Etiam urna augue, vehicula quis libero eget, congue volutpat turpis. Maecenas imperdiet risus id est tincidunt, non tempor ex vestibulum. Morbi et massa in ipsum cursus porttitor. Proin ullamcorper sapien non velit placerat, sit amet consequat nisi euismod.',
  //         image: 'https://picsum.photos/200/200',
  //         imagePosition: 'left'
  //       },
  //       {
  //         title: 'This is the section 2',
  //         content:
  //           'Mauris vel rutrum diam, ac accumsan lacus. Nulla fermentum elit eu lectus tincidunt vestibulum. Fusce lobortis turpis sed lobortis blandit. Praesent eu sollicitudin urna. Ut bibendum elementum dignissim. Integer eros lorem, consequat non tincidunt et, cursus sed neque. Integer faucibus lorem sed ligula consequat elementum. Sed nunc nunc, dictum a pharetra vel, semper eu nibh. Duis pretium feugiat ante, aliquet ultricies erat imperdiet sed.',
  //         image: 'https://picsum.photos/200/200',
  //         imagePosition: 'right'
  //       },
  //       {
  //         title: 'No image but still a cool section',
  //         content:
  //           'Mauris molestie bibendum velit, quis laoreet purus. Phasellus vitae sem vel neque lobortis rhoncus in a nunc. Curabitur dictum convallis risus, ac ornare dui feugiat at. Duis mauris dui, tempor quis massa aliquet, cursus venenatis dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec eu erat in sem suscipit molestie. Duis pulvinar nulla quis eros sagittis rhoncus. Nulla facilisi. In et sapien euismod, blandit ex ut, rhoncus nisl. Duis ornare odio ac nisi tincidunt volutpat ut bibendum ipsum. Integer eu lectus enim. Donec pellentesque sollicitudin turpis, quis porttitor eros rutrum sed.'
  //       },
  //       {
  //         content:
  //           'Nulla vel lacinia dolor. Duis volutpat dapibus eleifend. Sed ac auctor nibh. Pellentesque nulla mauris, varius ac ultrices ac, cursus nec lacus. Cras nec magna et massa congue hendrerit. Aliquam molestie arcu nunc, vel lacinia nisl viverra id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam pretium, tellus ut lobortis varius, metus risus ultrices eros, non laoreet ex mi quis metus.',
  //         image: 'https://picsum.photos/200/200',
  //         imagePosition: 'left'
  //       },
  //       {
  //         content:
  //           'Ut efficitur molestie ligula, id aliquam magna. Aenean fringilla fermentum ipsum sagittis gravida. Sed pulvinar felis a suscipit pharetra. Suspendisse sapien augue, vehicula sed orci ac, posuere convallis lacus. Duis laoreet congue eros nec maximus. Aliquam hendrerit orci at porttitor elementum. Suspendisse sollicitudin feugiat justo, a dictum risus vulputate ut. Suspendisse egestas efficitur urna id posuere. Aenean elementum vel risus non semper. Sed eget quam magna.',
  //         image: 'https://picsum.photos/200/200',
  //         imagePosition: 'right'
  //       }
  //     ],
  //     technologiesUsed: ['vuejs', 'php']
  //   },
  {
    slug: 'ax2',
    name: 'Ax2',
    links: ['https://ax2.ca/'],
    // banner: 'https://picsum.photos/200/200',
    status: 'stop',
    // shortDescription: 'Lorem ipsum dolor sit amet.',
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
    // banner: 'https://picsum.photos/200/200',
    status: 'stop',
    // shortDescription: 'Lorem ipsum dolor sit amet.',
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
    links: [
      '',
      'https://www.lumenpulse.com/',
      'https://www.lmpg.com/',
      'https://www.exenia.eu/en/'
    ],
    // banner: 'https://picsum.photos/200/200',
    status: 'stop',
    // shortDescription: 'Lorem ipsum dolor sit amet.',
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
    // banner: 'https://picsum.photos/200/200',
    status: 'stop',
    // shortDescription: 'Lorem ipsum dolor sit amet.',
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

export default projects;
