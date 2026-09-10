import type { Skill } from '~/utils/types/skills.types';

/**
 * `level` is a self-assessed tier (core / working / familiar) — deliberately not a
 * numeric percentage (RENOVATION.md #9, item 5). `category` groups the Skills page.
 * TODO(owner): tune the tiers to your own read of each — the values below are a
 * reasonable starting point, not gospel.
 */
export const skills: Skill[] = [
  // ---- Languages ----
  {
    key: 'typescript',
    icon: 'language-typescript',
    name: 'TypeScript',
    category: 'languages',
    level: 'core',
    show: true,
    related: ['javascript']
  },
  {
    key: 'javascript',
    icon: 'language-javascript',
    name: 'JavaScript',
    category: 'languages',
    level: 'core',
    show: true,
    related: ['nodejs', 'vuejs', 'typescript']
  },
  {
    key: 'php',
    icon: 'language-php',
    name: 'PHP',
    category: 'languages',
    level: 'working',
    show: true,
    related: ['laravel']
  },
  {
    key: 'html',
    icon: 'language-html5',
    name: 'HTML',
    category: 'languages',
    level: 'core',
    show: true,
    related: ['css', 'javascript']
  },
  {
    key: 'css',
    icon: 'language-css3',
    name: 'CSS',
    category: 'languages',
    level: 'core',
    show: true,
    related: ['html']
  },
  {
    key: 'bash',
    icon: 'bash',
    name: 'Bash',
    category: 'languages',
    level: 'working',
    show: true,
    related: []
  },
  {
    key: 'java',
    icon: 'language-java',
    name: 'Java',
    category: 'languages',
    level: 'familiar',
    show: true,
    related: []
  },
  {
    key: 'csharp',
    icon: 'language-csharp',
    name: 'C#',
    category: 'languages',
    level: 'familiar',
    show: true,
    related: ['unity']
  },
  {
    key: 'python',
    icon: 'language-python',
    name: 'Python',
    category: 'languages',
    level: 'working',
    show: true,
    related: ['genai', 'llamaindex']
  },
  {
    key: 'go',
    icon: 'language-go',
    name: 'Go',
    category: 'languages',
    level: 'familiar',
    show: true,
    related: []
  },

  // ---- Frameworks & libraries ----
  {
    key: 'vuejs',
    icon: 'vuejs',
    name: 'Vue.js',
    category: 'frameworks',
    level: 'core',
    show: true,
    related: ['javascript', 'nuxt']
  },
  {
    key: 'nuxt',
    icon: 'nuxt',
    name: 'Nuxt',
    category: 'frameworks',
    level: 'core',
    show: true,
    related: ['vuejs']
  },
  {
    key: 'nodejs',
    icon: 'nodejs',
    name: 'Node.js',
    category: 'frameworks',
    level: 'core',
    show: true,
    related: ['javascript']
  },
  {
    key: 'react',
    icon: 'react',
    name: 'React',
    category: 'frameworks',
    level: 'working',
    show: true,
    related: ['javascript', 'react-native']
  },
  {
    key: 'react-native',
    icon: 'react',
    name: 'React Native',
    category: 'frameworks',
    level: 'working',
    show: true,
    related: ['react']
  },
  {
    key: 'graphql',
    icon: 'graphql',
    name: 'GraphQL',
    category: 'frameworks',
    level: 'core',
    show: true,
    related: ['apollo']
  },
  {
    key: 'restapi',
    icon: 'api',
    name: 'REST APIs',
    category: 'frameworks',
    level: 'core',
    show: true,
    related: ['graphql']
  },
  {
    key: 'laravel',
    icon: 'laravel',
    name: 'Laravel',
    category: 'frameworks',
    level: 'working',
    show: true,
    related: ['php']
  },
  {
    key: 'koa',
    icon: 'koa',
    name: 'Koa.js',
    category: 'frameworks',
    level: 'working',
    show: true,
    related: ['nodejs', 'graphql', 'apollo']
  },
  {
    key: 'apollo',
    icon: 'apollo',
    name: 'Apollo',
    category: 'frameworks',
    level: 'working',
    show: true,
    related: ['graphql']
  },
  {
    key: 'unity',
    icon: 'unity',
    name: 'Unity',
    category: 'frameworks',
    level: 'familiar',
    show: true,
    related: ['csharp']
  },
  {
    key: 'web-components',
    name: 'Web Components',
    category: 'frameworks',
    level: 'working',
    show: true,
    related: ['javascript']
  },

  // ---- AI & LLMs ----
  {
    key: 'genai',
    name: 'Generative AI',
    category: 'ai',
    level: 'core',
    show: true,
    related: ['ai-agents', 'rag', 'python']
  },
  {
    key: 'ai-agents',
    name: 'AI agents',
    category: 'ai',
    level: 'core',
    show: true,
    related: ['genai', 'rag']
  },
  {
    key: 'rag',
    name: 'RAG',
    category: 'ai',
    level: 'working',
    show: true,
    related: ['genai', 'llamaindex']
  },
  {
    key: 'llamaindex',
    name: 'LlamaIndex',
    category: 'ai',
    level: 'working',
    show: true,
    related: ['rag', 'python']
  },
  {
    key: 'vertexai',
    name: 'Vertex AI',
    category: 'ai',
    level: 'working',
    show: true,
    related: ['gcp', 'genai']
  },
  {
    key: 'langfuse',
    name: 'Langfuse',
    category: 'ai',
    level: 'familiar',
    show: true,
    related: ['ai-agents']
  },
  {
    key: 'agentic-dev',
    name: 'Agentic development',
    category: 'ai',
    level: 'core',
    show: true,
    related: ['claude-code', 'mcp', 'ai-agents']
  },
  {
    key: 'claude-code',
    name: 'Claude Code',
    category: 'ai',
    level: 'core',
    show: true,
    related: ['agentic-dev', 'mcp']
  },
  {
    key: 'mcp',
    name: 'MCP',
    category: 'ai',
    level: 'working',
    show: true,
    related: ['agentic-dev', 'ai-agents']
  },

  // ---- Data & messaging ----
  {
    key: 'db',
    icon: 'database',
    name: 'Databases',
    category: 'data',
    level: 'core',
    show: true,
    related: ['mysql', 'neo4j', 'redis']
  },
  { key: 'mysql', name: 'MySQL', category: 'data', level: 'core', show: true, related: ['db'] },
  { key: 'redis', name: 'Redis', category: 'data', level: 'core', show: true, related: ['db'] },
  {
    key: 'mongodb',
    name: 'MongoDB',
    category: 'data',
    level: 'working',
    show: true,
    related: ['db']
  },
  {
    key: 'elasticsearch',
    name: 'Elasticsearch',
    category: 'data',
    level: 'working',
    show: true,
    related: []
  },
  {
    key: 'rabbitmq',
    name: 'RabbitMQ',
    category: 'data',
    level: 'working',
    show: true,
    related: []
  },
  {
    key: 'neo4j',
    icon: 'neo4j',
    name: 'Neo4j',
    category: 'data',
    level: 'familiar',
    show: true,
    related: ['db']
  },

  // ---- Platforms & DevOps ----
  {
    key: 'devops',
    name: 'DevOps',
    category: 'platforms',
    level: 'core',
    show: true,
    related: ['docker', 'kubernetes', 'gcp']
  },
  {
    key: 'docker',
    icon: 'docker',
    name: 'Docker',
    category: 'platforms',
    level: 'core',
    show: true,
    related: ['kubernetes']
  },
  {
    key: 'kubernetes',
    icon: 'kubernetes',
    name: 'Kubernetes',
    category: 'platforms',
    level: 'core',
    show: true,
    related: ['docker', 'gcp', 'devops']
  },
  {
    key: 'git',
    icon: 'git',
    name: 'Git',
    category: 'platforms',
    level: 'core',
    show: true,
    related: ['github', 'gitlab']
  },
  {
    key: 'github',
    icon: 'github',
    name: 'GitHub',
    category: 'platforms',
    level: 'core',
    show: true,
    related: ['git']
  },
  {
    key: 'npm',
    icon: 'npm',
    name: 'npm',
    category: 'platforms',
    level: 'core',
    show: true,
    related: ['yarn']
  },
  { key: 'yarn', name: 'Yarn', category: 'platforms', level: 'core', show: true, related: ['npm'] },
  {
    key: 'gcp',
    icon: 'google-cloud',
    name: 'Google Cloud',
    category: 'platforms',
    level: 'working',
    show: true,
    related: ['kubernetes']
  },
  {
    key: 'azure',
    icon: 'microsoft-azure',
    name: 'Microsoft Azure',
    category: 'platforms',
    level: 'working',
    show: true,
    related: ['kubernetes']
  },
  {
    key: 'digital-ocean',
    icon: 'digital-ocean',
    name: 'DigitalOcean',
    category: 'platforms',
    level: 'working',
    show: true,
    related: ['kubernetes']
  },
  {
    key: 'gitlab',
    icon: 'gitlab',
    name: 'GitLab',
    category: 'platforms',
    level: 'working',
    show: true,
    related: ['git']
  },
  {
    key: 'composer',
    icon: 'composer',
    name: 'Composer',
    category: 'platforms',
    level: 'working',
    show: true,
    related: ['php']
  },

  // ---- Testing ----
  {
    key: 'testing',
    icon: 'test-tube',
    name: 'Automated testing',
    category: 'testing',
    level: 'working',
    show: true,
    related: ['mocha', 'cypress']
  },
  {
    key: 'cypress',
    icon: 'cypress',
    name: 'Cypress',
    category: 'testing',
    level: 'working',
    show: true,
    related: ['javascript', 'mocha']
  },
  {
    key: 'mocha',
    icon: 'mocha',
    name: 'Mocha',
    category: 'testing',
    level: 'working',
    show: true,
    related: ['javascript', 'cypress']
  }
];
