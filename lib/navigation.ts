export const HEADER_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Programs" },
  { href: "/team", label: "Team" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_LINK_GROUPS = [
  {
    title: "Programs",
    links: [
      { href: "/services", label: "All Programs" },
      { href: "/pricing", label: "Pricing" },
      { href: "/team", label: "Coaching Staff" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/news", label: "News" },
      { href: "/gallery", label: "Gallery" },
      { href: "/testimonials", label: "Testimonials" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/faqs", label: "FAQs" },
      { href: "/contact", label: "Contact" },
      { href: "/shop", label: "Team Shop" },
    ],
  },
] as const;
