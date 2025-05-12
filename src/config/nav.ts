export interface NavItem {
  text: string;
  link: string;
}

export interface NavbarProps {
  pathname: string;
}

export const docOrHomeNavItems: NavItem[] = [
  {text: 'Developer', link: '/developer'},
  {text: 'Reference', link: '/reference'},
  {text: 'Releases', link: '/releases'},
  {text: 'Tutorials', link: '/tutorials'},
  {text: 'Developer', link: '/developer-duplicate?'},
  {text: 'Open Catalog', link: '/open-catalog'},
];

export const otherNavItems: NavItem[] = [
  {text: 'Products', link: '/products'},
  {text: 'Reference', link: '/reference'},
  {text: 'Blog', link: '/blog'},
  {text: 'Contact', link: '/contact'},
  {text: 'Changelog', link: '/changelog'},
];
