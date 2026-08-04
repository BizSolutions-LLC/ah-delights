export const siteConfig = {
  name: "AhDelights",
  title: "AhDelights | Handcrafted Pastries",
  tagline:
    "Handmade pastries made from scratch using premium ingredients, balanced sweetness, and Filipino-inspired flavors.",
  url: "https://ahdelights.com",
  locale: "en_US",
  ogImage: "/products/hero-pastry.jpg",
  keywords: [
    "AhDelights",
    "handcrafted pastries",
    "Filipino pastries",
    "San Francisco bakery",
    "homemade cookies",
    "ube pastries",
    "custom cakes",
  ],
  location: "San Francisco, CA",
  displayEmail: "orders@ahdelights.com",
  privacyEmail: "ahdelights30@gmail.com",
  hours: "Mon - Sat | 08:00am - 06:00pm",
  social: {
    facebook: {
      label: "Facebook: AhDelights",
      href: "https://www.facebook.com/profile.php?id=100072024782838&mibextid=wwXIfr&mibextid=wwXIfr/",
    },
    instagram: {
      label: "Instagram: @addelights",
      href: "https://www.instagram.com/addelights?utm_source=qr",
    },
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Our Treats", href: "/#our-best-seller" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
  routes: [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    {
      path: "/privacy-policy",
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
  ],
} as const;
