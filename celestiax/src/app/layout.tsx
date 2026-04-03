import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CelestiaX",
    template: "%s | CelestiaX",
  },
  description:
    "Explorá el cielo en tiempo real desde cualquier lugar. Visualización astronómica 3D interactiva con estrellas, planetas y satélites.",
  
  keywords: [
    "astronomía",
    "cielo en tiempo real",
    "estrellas",
    "planetas",
    "ISS",
    "visualización 3D",
    "space",
    "astronomy app",
  ],

  authors: [{ name: "Angel Gambotto" }],

  creator: "Angel Gambotto",

  metadataBase: new URL("https://celestiax.app"), // cambiar cuando deployes

  openGraph: {
    title: "CelestiaX — Explorá el cielo en tiempo real",
    description:
      "Visualizá estrellas, planetas y satélites en una experiencia 3D interactiva.",
    url: "https://celestiax.app",
    siteName: "CelestiaX",
    images: [
      {
        url: "/og-image.png", // la generamos abajo
        width: 1200,
        height: 630,
        alt: "CelestiaX preview",
      },
    ],
    locale: "es_AR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "CelestiaX",
    description:
      "Explorá el cielo en tiempo real con visualización 3D interactiva.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  themeColor: "#020617", // dark space vibe
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
