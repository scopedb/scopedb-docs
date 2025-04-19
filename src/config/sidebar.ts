import type {SidebarItem} from '../interface/sidebar';

export const sidebarItems: SidebarItem[] = [
  {
    text: '开始',
    href: '/docs',
    children: [
      {text: '简介', href: '/docs/intro'},
      {text: '快速开始', href: '/docs/quickstart'},
      {text: '安装', href: '/docs/installation'},
    ],
  },
  {
    text: '核心概念',
    href: '/docs/concepts',
    children: [
      {text: '架构', href: '/docs/concepts/architecture'},
      {text: '数据模型', href: '/docs/concepts/data-model'},
      {text: '查询语言', href: '/docs/concepts/query-language'},
      {text: '存储引擎', href: '/docs/concepts/storage-engine'},
    ],
  },
  {
    text: 'API参考',
    href: '#',
    children: [
      {text: 'RESTful API', href: '/docs/api/rest'},
      {text: 'GraphQL API', href: '/docs/api/graphql'},
      {text: 'SDK', href: '/docs/api/sdk'},
    ],
  },
  {
    text: '最佳实践',
    href: '#',
    children: [
      {text: '性能优化', href: '/docs/best-practices/performance'},
      {text: '安全', href: '/docs/best-practices/security'},
      {text: '部署', href: '/docs/best-practices/deployment'},
    ],
  },
];
