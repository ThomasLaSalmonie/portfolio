import type { RawAboutItem } from '~/utils/types/about.types';

// `title`, `company`, `date` and every `tasks` entry carry { en, fr }. The FR
// copy is a first pass by the build — owner should review it for voice/accuracy
// (RENOVATION.md, Phase 5).
export const aboutItems: RawAboutItem[] = [
  {
    date: '2024/02 - 2024/04',
    title: { en: 'Back-end Developer', fr: 'Développeur back-end' },
    link: 'https://unito.io/',
    company: { en: 'Unito, Montreal, QC', fr: 'Unito, Montréal, QC' },
    tasks: [
      {
        en: 'Building and maintaining integrations between Unito and a wide variety of third-party tools such as Jira, Asana, Azure Devops and many others',
        fr: "Conception et maintenance d'intégrations entre Unito et une grande variété d'outils tiers comme Jira, Asana, Azure DevOps et bien d'autres"
      },
      {
        en: "Deeply involved in the creative process of shaping our platform's future",
        fr: "Forte implication dans le processus de conception de l'avenir de la plateforme"
      },
      {
        en: 'Bugfixes and maintenance on Unito personal Slack deploy assistant, "Le capitaine"',
        fr: "Corrections de bogues et maintenance de l'assistant de déploiement Slack d'Unito, « Le capitaine »"
      },
      '',
      {
        en: 'Unfortunately Unito had a significant internal restructuring that led to the departure of 17 individuals. This restructuring impacted not only my entire team but also two other teams, including myself.',
        fr: 'Unito a connu une importante restructuration interne qui a mené au départ de 17 personnes. Elle a touché toute mon équipe ainsi que deux autres équipes, moi y compris.'
      }
    ],
    relatedProjects: [],
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
    date: '2022/10 - 2024/02',
    title: {
      en: 'Tech Lead Web Developer',
      fr: 'Développeur web — responsable technique'
    },
    link: 'https://business.bell.ca/shop/medium-large/internet-of-things/iot-applications',
    company: { en: 'Bell, Montreal, QC', fr: 'Bell, Montréal, QC' },
    tasks: [
      {
        en: 'Conducting high-level needs analysis in collaboration with architects',
        fr: 'Analyse de besoins de haut niveau en collaboration avec les architectes'
      },
      {
        en: 'Spearheading the high-level definition and implementation of software architecture and innovative functionalities',
        fr: "Pilotage de la définition et de la mise en œuvre de l'architecture logicielle et de fonctionnalités innovantes"
      },
      {
        en: 'Creating high-performance, configurable APIs to query telemetry database (ADX)',
        fr: "Création d'API configurables et performantes pour interroger la base de télémétrie (ADX)"
      },
      {
        en: 'Ensuring accessibility compliance with WCAG 2.1 AA standards',
        fr: "Conformité de l'accessibilité aux normes WCAG 2.1 AA"
      },
      {
        en: 'Take proactive measures to address technical debt accumulated from numerous prototypes',
        fr: 'Mesures proactives pour résorber la dette technique accumulée par de nombreux prototypes'
      },
      {
        en: 'Additionally, I lead the implementation and development of reusable widgets across various IoT dashboards, showcasing both strategic thinking and hands-on technical expertise',
        fr: 'Pilotage de la conception et du développement de widgets réutilisables sur divers tableaux de bord IoT, alliant vision stratégique et expertise technique concrète'
      },
      {
        en: 'Evolve partially in an architect role, envisioning comprehensive strategies that integrate seamlessly with technology, address business challenges, and align with organizational objectives',
        fr: "Rôle partiel d'architecte : élaboration de stratégies globales qui s'intègrent naturellement à la technologie, répondent aux enjeux d'affaires et s'alignent sur les objectifs de l'organisation"
      },
      {
        en: 'Translate intricate requirements into scalable, elegant designs, demonstrating a keen ability to balance creativity with pragmatism',
        fr: "Traduction d'exigences complexes en conceptions élégantes et évolutives, en équilibrant créativité et pragmatisme"
      },
      {
        en: 'Proficient in implementing robust monitoring and observability solutions, ensuring real-time insights into system performance and facilitating proactive measures for optimal functionality and reliability',
        fr: "Mise en place de solutions robustes de supervision et d'observabilité, offrant une visibilité en temps réel sur la performance des systèmes et facilitant les interventions proactives pour une fiabilité optimale"
      }
    ],
    relatedProjects: ['bell-iot'],
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
    date: '2022/06 - 2022/09',
    title: { en: 'Full Stack Web Developer', fr: 'Développeur web full-stack' },
    company: { en: 'Bell, Montreal, QC', fr: 'Bell, Montréal, QC' },
    link: 'https://www.bell.ca/Accueil',
    tasks: [
      {
        en: 'Guiding the establishment of software architecture and the integration of new functionalities',
        fr: "Encadrement de la mise en place de l'architecture logicielle et de l'intégration de nouvelles fonctionnalités"
      },
      {
        en: "Lead the charge in shaping the project's technological landscape",
        fr: 'Rôle moteur dans la définition du paysage technologique du projet'
      },
      {
        en: 'Meticulously crafting project environments while considering system configurations, I ensure a seamless and optimized developmental foundation',
        fr: 'Mise en place soignée des environnements de projet, en tenant compte des configurations système, pour une base de développement fluide et optimisée'
      },
      {
        en: 'Focused on elevating API performance, I contribute to the development of reusable widgets, implementing internal libraries such as reusable form components',
        fr: 'Amélioration de la performance des API et contribution au développement de widgets réutilisables, avec des librairies internes comme des composants de formulaire réutilisables'
      },
      {
        en: 'Spearhead the creation and integration of reusable widgets across various IoT dashboards, showcasing a commitment to efficiency and innovation in every aspect of development',
        fr: "Pilotage de la création et de l'intégration de widgets réutilisables sur divers tableaux de bord IoT, avec un souci constant d'efficacité et d'innovation"
      }
    ],
    relatedProjects: ['bell-iot'],
    technologiesUsed: ['typescript', 'vuejs', 'azure', 'kubernetes', 'docker', 'gitlab', 'npm']
  },
  {
    date: { en: '2022/06 - Current', fr: '2022/06 - à ce jour' },
    title: { en: 'Full Stack Web Developer', fr: 'Développeur web full-stack' },
    company: { en: 'Baum Publication (Freelance)', fr: 'Baum Publication (pigiste)' },
    link: 'https://baumpub.com/',
    tasks: [
      {
        en: 'Strategically updating libraries and operating systems',
        fr: "Mise à jour stratégique des librairies et des systèmes d'exploitation"
      },
      {
        en: 'Skillfully managing server maintenance, providing dedicated support, and contributing to the development of lead generation pages',
        fr: 'Gestion de la maintenance des serveurs, soutien dédié et contribution au développement de pages de génération de prospects'
      },
      {
        en: "Maintaining a holistic approach, addressing both front-end and back-end intricacies, to uphold the project's stability, security, and overall performance",
        fr: 'Approche globale, front-end comme back-end, pour maintenir la stabilité, la sécurité et la performance générale du projet'
      }
    ],
    relatedProjects: ['baumpub'],
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
    date: '2022/06 - 2023/03',
    title: { en: 'Full Stack Web Developer', fr: 'Développeur web full-stack' },
    company: { en: 'Fillactive (Freelance)', fr: 'Fillactive (pigiste)' },
    link: 'https://fillactive.ca/',
    tasks: [
      {
        en: 'Continuing the evolution of the content management system',
        fr: "Poursuite de l'évolution du système de gestion de contenu"
      },
      {
        en: 'Efficiently integrating form processes into the internal content manager and innovatively crafting dashboards that provide a comprehensive overview of historical data',
        fr: 'Intégration de processus de formulaires dans le gestionnaire de contenu interne et conception de tableaux de bord offrant une vue d’ensemble des données historiques'
      },
      {
        en: 'Managing the entire web project independently, I ensure the seamless maintenance and optimization of both front-end and back-end components, delivering a cohesive and user-friendly experience',
        fr: "Gestion autonome de l'ensemble du projet web : maintenance et optimisation du front-end et du back-end pour une expérience cohérente et conviviale"
      }
    ],
    relatedProjects: ['fillactive'],
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
    date: '2020/04 - 2022/05',
    title: {
      en: 'Tech Lead Web Developer',
      fr: 'Développeur web — responsable technique'
    },
    company: { en: 'Ax2, Montreal, QC', fr: 'Ax2, Montréal, QC' },
    link: 'https://ax2.ca/',
    tasks: [
      {
        en: 'Driving the development of internal products at Ax2, with a focus on innovating a new intelligent content management system',
        fr: "Pilotage du développement des produits internes d'Ax2, avec l'accent sur un nouveau système de gestion de contenu intelligent"
      },
      {
        en: 'Taking charge of implementing CI/CD automations',
        fr: 'Prise en charge de la mise en place des automatisations CI/CD'
      },
      {
        en: 'Analyze project requirements, author comprehensive technical specifications, and present sophisticated technical solutions to our clients',
        fr: 'Analyse des besoins, rédaction de spécifications techniques complètes et présentation de solutions techniques abouties aux clients'
      },
      {
        en: 'Leading the direction in establishing software architecture and pioneering new functionalities',
        fr: "Direction de la mise en place de l'architecture logicielle et de nouvelles fonctionnalités"
      },
      {
        en: 'Committed to enhancing API performance',
        fr: 'Amélioration continue de la performance des API'
      },
      {
        en: 'creation of R&D prototypes, ensuring a continuous evolution of cutting-edge solutions',
        fr: 'création de prototypes de R et D pour faire évoluer en continu des solutions de pointe'
      }
    ],
    relatedProjects: ['ax2', 'fillactive', 'monet', 'lumenpulse', 'canadiens', 'baumpub'],
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
    date: '2018/10 - 2020/04',
    title: {
      en: 'Back-end and Devops Developer',
      fr: 'Développeur back-end et DevOps'
    },
    company: { en: 'Ax2, Montreal, QC', fr: 'Ax2, Montréal, QC' },
    link: 'https://ax2.ca/',
    tasks: [
      {
        en: 'Engaging in the establishment of the software architecture for cutting-edge features',
        fr: "Participation à la mise en place de l'architecture logicielle pour des fonctionnalités de pointe"
      },
      {
        en: 'Implementing API security through JWT encryption,',
        fr: 'Sécurisation des API par chiffrement JWT'
      },
      {
        en: 'Actively contributing to the design and development of APIs',
        fr: "Contribution active à la conception et au développement d'API"
      },
      {
        en: 'Delving into the mastery of technologies associated with the dynamic realm of DevOps',
        fr: 'Montée en compétence sur les technologies du domaine DevOps'
      },
      {
        en: 'Diagramming the foundational structure of databases',
        fr: 'Modélisation de la structure de base des bases de données'
      },
      {
        en: 'Proficient in crafting and optimizing robust database architectures to ensure efficient data storage, retrieval, and management',
        fr: "Conception et optimisation d'architectures de bases de données robustes pour un stockage, une récupération et une gestion efficaces des données"
      },
      {
        en: 'Skilled in designing scalable and performance-driven database solutions, implementing data security measures, and conducting thorough database performance tuning',
        fr: 'Conception de solutions de bases de données évolutives et performantes, mise en place de mesures de sécurité des données et optimisation poussée des performances'
      }
    ],
    relatedProjects: ['monet', 'lumenpulse', 'canadiens', 'baumpub'],
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
    date: '2018/03 - 2018/09',
    title: {
      en: 'Back-end Developer (internship)',
      fr: 'Développeur back-end (stage)'
    },
    company: { en: 'Ax2, Montreal, QC', fr: 'Ax2, Montréal, QC' },
    link: 'https://ax2.ca/',
    tasks: [
      {
        en: 'Enhancement of the internal content manager as a back-end developer',
        fr: 'Amélioration du gestionnaire de contenu interne à titre de développeur back-end'
      },
      {
        en: 'Involved in tasks ranging from client-driven requirements to the meticulous maintenance and quality assurance of code',
        fr: 'Tâches allant des besoins exprimés par les clients à la maintenance minutieuse et à l’assurance qualité du code'
      },
      {
        en: 'Active participation in the diverse phases of a project coupled with the agile application of methodologies to ensure seamless integration and functionality in the backend systems',
        fr: 'Participation active aux différentes phases d’un projet et application agile des méthodologies pour assurer l’intégration et le bon fonctionnement des systèmes back-end'
      },
      {
        en: 'Contribute to the database architecture for the internal content manager',
        fr: "Contribution à l'architecture de base de données du gestionnaire de contenu interne"
      }
    ],
    relatedProjects: ['lumenpulse', 'canadiens', 'baumpub'],
    technologiesUsed: ['typescript', 'nodejs', 'restapi', 'github', 'php', 'mysql']
  },
  {
    date: '2017/05 - 2017/09',
    title: {
      en: 'Back-end Developer (internship)',
      fr: 'Développeur back-end (stage)'
    },
    company: { en: 'Timeone, Bordeaux, France', fr: 'Timeone, Bordeaux, France' },
    link: 'https://www.timeonegroup.com/en/',
    tasks: [
      {
        en: "Contributing to the enhancement of Timeone's internal platform",
        fr: "Contribution à l'amélioration de la plateforme interne de Timeone"
      },
      {
        en: 'Actively engaged in internal support to analyze and resolve bugs',
        fr: 'Soutien interne pour analyser et corriger des bogues'
      },
      {
        en: 'Fostering awareness of the various phases within a project',
        fr: "Sensibilisation aux différentes phases d'un projet"
      },
      {
        en: 'Working with Agile methodology',
        fr: 'Travail en méthodologie agile'
      }
    ]
  }
];
