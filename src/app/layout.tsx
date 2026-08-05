import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Inter, Roboto_Mono } from "next/font/google";
import type { Metadata } from "next";
import Header from "@/components/Header";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/utils/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ScopeDB Docs — serverless database for event analytics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${robotoMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script async defer data-domain="docs.scopedb.io" src="https://plausible.io/js/script.js" />
      </head>

      <body>
        <AntdRegistry>
          <header>
            <Header />
          </header>
          <main className="pt-[108px] md:pt-[140px] max-w-[1440px] mx-auto">
            {children}
          </main>
        </AntdRegistry>
      </body>
    </html>
  );
}
