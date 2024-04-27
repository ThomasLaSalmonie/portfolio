import type { AboutItem } from '~/utils/types/about.types';

const aboutItems: AboutItem[] = [
  {
    color: 'red-lighten-2',
    icon: 'mdi-stop',
    date: '2024/02 - 2024/04',
    title: 'Back-end Developer',
    link: 'https://unito.io/',
    company: 'Unito, Montreal, QC',
    tasks: [
      'Building and maintaining integrations between Unito and a wide variety of third-party tools such as Jira, Asana, Azure Devops and many others',
      'Deeply involved in the creative process of shaping our platform\'s future',
      'Bugfixes and maintenance on Unito personnal deployer assitant <a href="https://unito.io/blog/unito-slackbot-for-shipping-software-le-capitaine/" target="_blank">"Le capitaine"</a>',
      '',
      'Unfortunately Unito had a significant internal restructuring that led to the departure of 17 individuals. This restructuring impacted not only my entire team but also two other teams, including myself.'
    ],
    retatedProjects: [],
    technologiesUsed: [
      'typescript',
      'nodejs',
      'restapi',
      'aws',
      'kubernetes',
      'docker',
      'redis',
      'mongodb',
      'github',
      'npm'
    ]
  },
  {
    color: 'red-lighten-2',
    icon: 'mdi-stop',
    date: '2022/10 - 2024/02',
    title: 'Tech Lead Web Developer',
    link: 'https://business.bell.ca/shop/medium-large/internet-of-things/iot-applications',
    company: 'Bell, Montreal, QC',
    tasks: [
      'Conducting high-level needs analysis in collaboration with architects',
      'Pearheading the high-level definition and implementation of software architecture and innovative functionalities',
      'Creating high-performance, configurable APIs to query telemetry database (ADX)',
      'Ensuring accessibility compliance with WCAG 2.1 AA standards',
      'Take proactive measures to address technical debt accumulated from numerous prototypes',
      'Additionally, I lead the implementation and development of reusable widgets across various IoT dashboards, showcasing both strategic thinking and hands-on technical expertise',
      'Evolve partially in an architect role, envisioning comprehensive strategies that integrate seamlessly with technology, address business challenges, and align with organizational objectives',
      'Translate intricate requirements into scalable, elegant designs, demonstrating a keen ability to balance creativity with pragmatism',
      'Proficient in implementing robust monitoring and observability solutions, ensuring real-time insights into system performance and facilitating proactive measures for optimal functionality and reliability'
    ],
    retatedProjects: ['bell-iot'],
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
      'gitlab',
      'npm'
    ]
  },
  {
    color: 'red-lighten-2',
    icon: 'mdi-stop',
    date: '2022/06 - 2022/09',
    title: 'Full Stack Web Developer',
    company: 'Bell, Montreal, QC',
    link: 'https://www.bell.ca/Accueil',
    tasks: [
      'Guiding the establishment of software architecture and the integration of new functionalities',
      "Lead the charge in shaping the project's technological landscape",
      'Meticulously crafting project environments while considering system configurations, I ensure a seamless and optimized developmental foundation',
      'Focused on elevating API performance, I contribute to the development of reusable widgets, implementing internal libraries such as reusable form components',
      'Spearhead the creation and integration of reusable widgets across various IoT dashboards, showcasing a commitment to efficiency and innovation in every aspect of development'
    ],
    retatedProjects: ['bell-iot'],
    technologiesUsed: ['typescript', 'vuejs', 'azure', 'kubernetes', 'docker', 'gitlab', 'npm']
  },
  {
    color: 'green-lighten-1',
    icon: 'mdi-play',
    date: '2022/06 - Current',
    title: 'Full Stack Web Developer',
    company: 'Baum Publication (Freelance)',
    link: 'https://baumpub.com/',
    tasks: [
      'Strategically updating libraries and operating systems',
      'Skillfully managing server maintenance, providing dedicated support, and contributing to the development of lead generation pages',
      "Maintaining a holistic approach, addressing both front-end and back-end intricacies, to uphold the project's stability, security, and overall performance"
    ],
    retatedProjects: ['baumpub'],
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
      'mysql',
      'yarn'
    ]
  },
  {
    color: 'red-lighten-2',
    icon: 'mdi-stop',
    date: '2022/06 - 2023/03',
    title: 'Full Stack Web Developer',
    company: 'Fillactive (Freelance)',
    link: 'https://fillactive.ca/',
    tasks: [
      'Continuing the evolution of the content management system',
      'Efficiently integrating form processes into the internal content manager and innovatively crafting dashboards that provide a comprehensive overview of historical data',
      'Managing the entire web project independently, I ensure the seamless maintenance and optimization of both front-end and back-end components, delivering a cohesive and user-friendly experience'
    ],
    retatedProjects: ['fillactive'],
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
      'yarn'
    ]
  },
  {
    color: 'red-lighten-2',
    icon: 'mdi-stop',
    date: '2020/04 - 2022/05',
    title: 'Tech Lead Web Developer',
    company: 'Ax2, Montreal, QC',
    link: 'https://ax2.ca/',
    tasks: [
      'Driving the development of internal products at Ax2, with a focus on innovating a new intelligent content management system',
      'Taking charge of implementing CI/CD automations',
      'Analyze project requirements, author comprehensive technical specifications, and present sophisticated technical solutions to our clients',
      'Leading the direction in establishing software architecture and pioneering new functionalities',
      'Committed to enhancing API performance',
      'creation of R&D prototypes, ensuring a continuous evolution of cutting-edge solutions'
    ],
    retatedProjects: ['ax2', 'fillactive', 'monet', 'lumenpulse', 'canadiens', 'baumpub'],
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
      'elasticsearch',
      'mysql',
      'rabbitmq',
      'bash',
      'yarn'
    ]
  },
  {
    color: 'red-lighten-2',
    icon: 'mdi-stop',
    date: '2018/10 - 2020/04',
    title: 'Back-end and Devops Developer',
    company: 'Ax2, Montreal, QC',
    link: 'https://ax2.ca/',
    tasks: [
      'Engaging in the establishment of the software architecture for cutting-edge features',
      'Implementing API security through JWT encryption,',
      'Actively contributing to the design and development of APIs',
      'Delving into the mastery of technologies associated with the dynamic realm of DevOps',
      'Diagramming the foundational structure of databases',
      'Proficient in crafting and optimizing robust database architectures to ensure efficient data storage, retrieval, and management',
      'Skilled in designing scalable and performance-driven database solutions, implementing data security measures, and conducting thorough database performance tuning'
    ],
    retatedProjects: ['monet', 'lumenpulse', 'canadiens', 'baumpub'],
    technologiesUsed: [
      'typescript',
      'nodejs',
      'graphql',
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
    color: 'red-lighten-2',
    icon: 'mdi-stop',
    date: '2018/03 - 2018/09',
    title: 'Back-end Developer (internship)',
    company: 'Ax2, Montreal, QC',
    link: 'https://ax2.ca/',
    tasks: [
      'Enhancement of the internal content manager as a back-end developer',
      'Involved in tasks ranging from client-driven requirements to the meticulous maintenance and quality assurance of code',
      'Active participation in the diverse phases of a project coupled with the agile application of methodologies to ensure seamless integration and functionality in the backend systems',
      'Contribute to the database architecture for the internal content manager'
    ],
    retatedProjects: ['lumenpulse', 'canadiens', 'baumpub'],
    technologiesUsed: ['typescript', 'nodejs', 'restapi', 'github', 'php', 'mysql']
  },
  {
    color: 'red-lighten-2',
    icon: 'mdi-stop',
    date: '2017/05 - 2017/09',
    title: 'Back-end Developer (internship)',
    company: 'Timeone, Bordeaux, France',
    link: 'https://www.timeonegroup.com/en/',
    tasks: [
      "Contributing to the enhancement of Timeone's internal platform",
      'Actively engaged in internal support to analyze and resolve bugs',
      'Fostering awareness of the various phases within a project',
      'Working with Agile methodology'
    ]
  }
];

export default aboutItems;
