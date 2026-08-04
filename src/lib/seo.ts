import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type CreateMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL);
  }

  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }

  return new URL(siteConfig.url);
}

export function createMetadata({
  title,
  description = siteConfig.tagline,
  path = "/",
  image = siteConfig.ogImage,
  noIndex = false,
}: CreateMetadataOptions = {}): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const pageTitle = title ?? siteConfig.title;
  const ogTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.title;

  return {
    title: title
      ? title
      : {
          absolute: siteConfig.title,
        },
    description,
    keywords: [...siteConfig.keywords],
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteUrl.origin }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: siteUrl,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: canonicalPath,
      siteName: siteConfig.name,
      title: ogTitle,
      description,
      images: [
        {
          url: image,
          alt: `${siteConfig.name} pastries`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
