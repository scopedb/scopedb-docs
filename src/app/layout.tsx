import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Inter, Roboto_Mono } from "next/font/google";
import Header from "@/components/Header";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable} antialiased`}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script async defer data-domain="docs.scopedb.io" src="https://plausible.io/js/script.js" />
      </head>

      <body>
        <AntdRegistry>
          <header>
            <Header />
          </header>
          <main className="pt-[108px] md:pt-[140px]">
            {children}
          </main>
        </AntdRegistry>
      </body>
    </html>
  );
}
