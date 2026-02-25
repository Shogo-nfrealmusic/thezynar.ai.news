import type { Category } from "@/lib/types";

export interface LatestNewsItem {
  id: number;
  title: string;
  category: Category;
  summary: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
}

export const latestNews: LatestNewsItem[] = [
  {
    id: 1,
    title:
      "India's AI boom pushes firms to create new revenue streams for users",
    category: "ai",
    summary:
      "Major Indian enterprises are racing to build AI copilots and tools that unlock new productivity and subscription revenue.",
    author: "Jasmeet Singh",
    publishedAt: "6 hours ago",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Nvidia challenger AI chip startup MaxT raises $500M",
    category: "tech",
    summary:
      "MaxT claims its new accelerator can deliver better performance-per-watt for generative AI workloads than current market leaders.",
    author: "Marina Tomlin",
    publishedAt: "6 hours ago",
    imageUrl:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Self-driving truck startup Wayve raises $1.2B from automakers",
    category: "trending",
    summary:
      "Wayve partners with leading automakers as it looks to bring autonomous delivery fleets to major logistics routes.",
    author: "Kirsten Korosec",
    publishedAt: "7 hours ago",
    imageUrl:
      "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title:
      "Spanish 'noonicon' Multiverse Computing releases free compressed AI model",
    category: "ai",
    summary:
      "The quantum-inspired startup has open-sourced a highly compressed large language model aimed at edge devices.",
    author: "Anna Helen",
    publishedAt: "7 hours ago",
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    title:
      "Apple rolls out age-verification tools worldwide to comply with child safety laws",
    category: "tech",
    summary:
      "New on-device age checks are rolling out across the App Store as regulators push for stricter safeguards.",
    author: "Sarah Perez",
    publishedAt: "8 hours ago",
    imageUrl:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    title: "Uber engineers built an AI version of their boss",
    category: "ai",
    summary:
      "An internal experiment uses a digital twin of an executive to simulate strategic decisions and run scenario planning.",
    author: "Kirsten Korosec",
    publishedAt: "8 hours ago",
    imageUrl:
      "https://images.unsplash.com/photo-1516570161787-2fd917215a3d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 7,
    title: "Stripe is reportedly eyeing deal to buy some or all of PayPal",
    category: "gadget",
    summary:
      "A potential blockbuster fintech deal could reshape online payments if Stripe moves ahead with an acquisition.",
    author: "Dominic-Madori Davis",
    publishedAt: "9 hours ago",
    imageUrl:
      "https://images.unsplash.com/photo-1518544887688-4e3f7bdff1ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 8,
    title:
      "Former L3Harris Trenchant boss jailed for selling hacking tools to Russian broker",
    category: "trending",
    summary:
      "Court documents reveal new details about the sale of intrusive spyware used against journalists and activists.",
    author: "Lorenzo Franceschi-Bicchierai",
    publishedAt: "9 hours ago",
    imageUrl:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 9,
    title:
      "Google's new 1GW clean energy deal includes massive 100-hour battery",
    category: "tech",
    summary:
      "The company signed one of the largest long-duration storage contracts to decarbonize its data center footprint.",
    author: "Tim De Chant",
    publishedAt: "9 hours ago",
    imageUrl:
      "https://images.unsplash.com/photo-1542309661-8231eafa1c1b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 10,
    title: "CarGurus data breach affects 12.5 million accounts",
    category: "tech",
    summary:
      "The online car marketplace disclosed a major security incident involving customer data from multiple regions.",
    author: "Kirsten Korosec",
    publishedAt: "9 hours ago",
    imageUrl:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80",
  },
];

