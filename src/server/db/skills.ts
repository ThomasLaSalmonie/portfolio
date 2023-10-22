import { Skill } from '~/utils/types/skills.types';

const skills: Skill[] = [
  {
    key: 'devops',
    icon: '',
    name: 'Dev Ops',
    show: true,
    related: ['docker', 'gcp', 'kubernetes']
  },
  {
    key: 'php',
    icon: 'language-php',
    name: 'Php',
    progress: 70,
    show: true,
    related: ['laravel']
  },
  {
    key: 'javascript',
    icon: 'language-javascript',
    name: 'Javascript',
    progress: 10,
    show: true,
    related: ['nodejs', 'vuejs', 'typescript']
  },
  {
    key: 'db',
    icon: 'database',
    name: 'Database',
    show: true,
    related: ['mysql', 'neo4j', 'redis']
  },
  {
    key: 'vuejs',
    icon: 'vuejs',
    name: 'Vue.js',
    progress: 30,
    show: true,
    related: ['javascript']
  },
  {
    key: 'elastic',
    icon: 'elastic',
    name: 'Elasticsearch',
    progress: 90,
    show: true,
    related: []
  },
  {
    key: 'typescript',
    icon: 'language-typescript',
    name: 'Typescript',
    progress: 90,
    show: true,
    related: ['javascript']
  },
  {
    key: 'yarn',
    icon: 'yarn',
    name: 'Yarn',
    progress: 90,
    show: true,
    related: ['npm']
  },
  {
    key: 'testing',
    icon: 'test-tube',
    name: 'Testing',
    show: true,
    related: ['mocha', 'cypress']
  },
  {
    key: 'git',
    icon: 'git',
    name: 'Git',
    progress: 90,
    show: true,
    related: []
  },
  {
    key: 'nodejs',
    icon: 'nodejs',
    name: 'Node.js',
    progress: 50,
    show: true,
    related: ['javascript']
  },
  {
    key: 'java',
    icon: 'language-java',
    name: 'Java',
    progress: 90,
    show: true,
    related: []
  },
  {
    key: 'apollo',
    icon: 'apollo',
    name: 'Apollo',
    progress: 90,
    show: true,
    related: ['graphql']
  },
  {
    key: 'css',
    icon: 'language-css3',
    name: 'Css',
    progress: 90,
    show: true,
    related: ['html']
  },
  {
    key: 'cypress',
    icon: 'cypress',
    name: 'Cypress',
    progress: 90,
    show: true,
    related: ['javascript', 'mocha']
  },
  {
    key: 'docker',
    icon: 'docker',
    name: 'Docker',
    progress: 90,
    show: true,
    related: ['kubernetes']
  },
  {
    key: 'gcp',
    icon: 'google-cloud',
    name: 'Google cloud',
    progress: 90,
    show: true,
    related: ['kubernetes']
  },
  {
    key: 'digital-ocean',
    icon: 'digital-ocean',
    name: 'Digital ocean',
    progress: 90,
    show: true,
    related: ['kubernetes']
  },
  {
    key: 'graphql',
    icon: 'graphql',
    name: 'Graphql Api',
    progress: 90,
    show: true,
    related: ['apollo']
  },
  {
    key: 'html',
    icon: 'language-html5',
    name: 'Html',
    progress: 90,
    show: true,
    related: ['css', 'javascript']
  },
  {
    key: 'koa',
    icon: 'koa',
    name: 'Koa.js',
    progress: 90,
    show: true,
    related: ['nodejs', 'graphql', 'apollo', 'javascript']
  },
  {
    key: 'kubernetes',
    icon: 'kubernetes',
    name: 'Kubernetes',
    progress: 90,
    show: true,
    related: ['gcp', 'docker', 'devops']
  },
  {
    key: 'laravel',
    icon: 'laravel',
    name: 'Laravel',
    show: true,
    progress: 90,
    related: ['php']
  },
  {
    key: 'composer',
    icon: 'composer',
    name: 'Composer',
    show: true,
    progress: 90,
    related: ['php']
  },
  {
    key: 'mocha',
    icon: 'mocha',
    name: 'Mocha',
    show: true,
    progress: 90,
    related: ['javascript', 'cypress']
  },
  {
    key: 'mysql',
    icon: 'mysql',
    name: 'Mysql',
    progress: 90,
    show: true,
    related: ['db']
  },
  {
    key: 'neo4j',
    icon: 'neo4j',
    name: 'Neo4j',
    progress: 90,
    show: true,
    related: ['db']
  },
  {
    key: 'npm',
    icon: 'npm',
    name: 'Npm',
    show: true,
    progress: 90,
    related: ['yarn']
  },
  {
    key: 'restapi',
    icon: 'api',
    name: 'Rest Api',
    progress: 90,
    show: true,
    related: ['graphql', 'koajs']
  },
  {
    key: 'redis',
    icon: 'redis',
    name: 'Redis',
    show: true,
    progress: 90,
    related: []
  }
];

export default skills;
