import type {Sidebar} from '../interface/sidebar';

export const sidebarItems = [
  {
    text: '开始',
    base: '/reference/',
    items: [
      {text: '简介', link: 'overview'},
      {text: '快速开始', link: 'datatypes-variant'},
      {text: '安装', link: 'datatypes-overview'},
    ],
  },
  {
    text: '核心概念',
    base: '/concepts',
    items: [
      {text: '架构', link: 'architecture'},
      {text: '数据模型', link: 'data-model'},
      {text: '查询语言', link: 'query-language'},
      {text: '存储引擎', link: 'storage-engine'},
    ],
  },
  {
    text: 'API参考',
    base: '/api',
    items: [
      {text: 'RESTful API', link: '/rest'},
      {text: 'GraphQL API', link: '/graphql'},
      {text: 'SDK', link: '/sdk'},
    ],
  },
  {
    text: '最佳实践',
    base: '/best-practices',
    items: [
      {text: '性能优化', link: '/performance'},
      {text: '安全', link: '/security'},
      {text: '部署', link: '/deployment'},
    ],
  },
];

export const sidebar: Sidebar = {
  '/reference': sidebarItems,
};
