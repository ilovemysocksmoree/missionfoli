"use client"

import React from "react"
import { usePathname } from "next/navigation"
import "../styles/global.css"
import { ShellProvider } from "../utils/shellProvider"
import { ThemeProvider } from "../utils/themeProvider"
import { ConfirmProvider } from "../components/context/ConfirmContext"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Head from "next/head"
import Script from "next/script"

const GA_MEASUREMENT_ID = "G-T5C9YBKNWF";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const metadata = {
    "/": {
      title: "A Storytelling Company | Diya Karmacharya | Enter the unknown",
      description:
        "As an AI-born storytelling company, The Diya Karmacharya Studios craft tales that reshape reality. Our stories live vividly in the imagination. We're actively looking for singularities.",
    },
    "/me": {
      title: "A Storytelling Company | Diya Karmacharya | Me",
      description:
        "Meet me, Diya Karmacharya: A story-weaver fusing Japanese delicacy with American innovation. Discover the path tread by a soul seeking the transformative power of storytelling.",
    },
    "/mycrew": {
      title: "A Storytelling Company | Diya Karmacharya | My Crew",
      description:
        "Enlighten yourself with my crew: A constellation of creative counterparts, elevating worldly narratives through consistent collaborations.",
    },
    "/research-projects": {
      title: "A Storytelling Company | Diya Karmacharya | Research & Projects",
      description:
        "Explore Diya Karmacharya's Research & Projects: A collection of innovative research work and creative projects that push the boundaries of storytelling and technology.",
    },
    "/dontbeshy": {
      title: "A Storytelling Company | Diya Karmacharya | Don't Be Shy",
      description:
        "Let us imbibe a hot steaming cup of conversation, reach me out to with my crew for crafting chapters untold, yet eager to be heard.",
    },
  };

  const currentMetadata = metadata[pathname] || metadata["/"];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Diya Karmacharya Studio",
    url: "https://thehanasachikocompany.com",
    description: "A Storytelling Company.",
    image:
      "https://thehanasachikocompany.com/_next/image?url=%2FHanaSachikoBrand.jpg&w=640&q=75",
    creator: {
      "@type": "Person",
      name: "Diya Karmacharya",
    },
    sameAs: [
      "https://www.facebook.com/hanasachikostudio",
      "https://www.instagram.com/hanasachikostudio",
      "https://www.pinterest.com/hanasachikostudio",
      "https://twitter.com/hanasachikostudio",
    ],
  };

  const Global = ({ children }: { children: React.ReactNode }) => (
    <div className="relative z-0 flex h-full w-full overflow-hidden overflow-y-scroll">
      {children}
    </div>
  );

  return (
    <html lang="en">
      <Head>
        <title>{currentMetadata.title}</title>
        <meta name="description" content={currentMetadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, viewport-fit=cover" />
        <link rel="canonical" href={`https://www.thehanasachikocompany.com${pathname}`} />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={currentMetadata.title} />
        <meta property="og:description" content={currentMetadata.description} />
        <meta property="og:url" content={`https://www.thehanasachikocompany.com${pathname}`} />
        <meta property="og:image" content={structuredData.image} />
        <meta property="og:site_name" content="Diya Karmacharya Studio" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentMetadata.title} />
        <meta name="twitter:description" content={currentMetadata.description} />
        <meta name="twitter:image" content={structuredData.image} />
        <meta name="twitter:site" content="@daedalium" />
        <meta name="twitter:creator" content="@daedalium" />

        <meta name="keywords" content="Storytelling company, Storytelling, Creative Studio, Diya Karmacharya, AI, storytellers, Words, Narrative" />

        {/* Structured Data */}
      </Head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          strategy="afterInteractive"
        />

        {/* Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}></script>
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      <body suppressHydrationWarning={true}>
        <Global>
          <ThemeProvider>
            <ShellProvider>
              <ConfirmProvider>{children}</ConfirmProvider>
            </ShellProvider>
          </ThemeProvider>
        </Global>
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
