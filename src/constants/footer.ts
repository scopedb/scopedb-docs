import type { FooterSection } from '../types/footer';

// TODO: replace with actual content
export const footerSections: FooterSection[] = [
  {
    title: "Get Started",
    links: [
      { text: "Book a demo", href: "/demo" },
      { text: "Visit ScopeDB", href: "/guide" },
    ]
  },
  {
    title: "Product",
    links: [
      { text: "Documentation", href: "/docs" },
      { text: "Changelog", href: "/changlog" },
      { text: "Pricing", href: "/price" },
      { text: "Community", href: "/community" }
    ]
  },
  {
    title: "Company",
    links: [
      { text: "About", href: "/about" },
      { text: "Blog", href: "/careers" },
      { text: "Terms of Service", href: "/service" },
      { text:"Privacy Policy", href: "/privacy" }
    ]
  },
  {
    title: "Connect",
    links: [
      { text: "Contact us", href: "/privacy" },
      { text: "Github", href: "/github" },
      { text: "Discord", href: "/discord" },
    ]
  }
];