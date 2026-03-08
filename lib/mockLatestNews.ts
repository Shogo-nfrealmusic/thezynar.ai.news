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
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
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
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
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
  {
    id: 11,
    title: "OpenAI releases next-gen reasoning model for developers",
    category: "ai",
    summary:
      "The new model improves chain-of-thought performance and is available via API for enterprise partners.",
    author: "Frederic Lardinois",
    publishedAt: "10 hours ago",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 12,
    title: "EU regulators probe Meta over AI training data",
    category: "ai",
    summary:
      "Investigators are examining whether user data was used to train models in line with privacy rules.",
    author: "Anna Helen",
    publishedAt: "11 hours ago",
    imageUrl:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 13,
    title: "Qualcomm unveils new chips for on-device AI",
    category: "tech",
    summary:
      "Snapdragon lineup gains dedicated NPU for running large language models on phones and laptops.",
    author: "Marina Tomlin",
    publishedAt: "11 hours ago",
    imageUrl:
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 14,
    title: "Robotics startup Figure raises $675M from OpenAI and Nvidia",
    category: "ai",
    summary:
      "The humanoid robot maker will use the funds to scale production and expand into logistics.",
    author: "Kirsten Korosec",
    publishedAt: "12 hours ago",
    imageUrl:
      "https://images.unsplash.com/photo-1531746795393-6c2490d0edee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 15,
    title: "Amazon expands Bedrock with new foundation models",
    category: "tech",
    summary:
      "AWS customers can now access additional third-party models for building generative AI applications.",
    author: "Sarah Perez",
    publishedAt: "12 hours ago",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 16,
    title: "AI-generated deepfakes trigger new election rules",
    category: "trending",
    summary:
      "Several countries are introducing labeling and disclosure requirements for synthetic media.",
    author: "Lorenzo Franceschi-Bicchierai",
    publishedAt: "13 hours ago",
    imageUrl:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 17,
    title: "Microsoft Copilot gets new agentic workflows",
    category: "ai",
    summary:
      "Users can now chain multi-step tasks and connect Copilot to internal tools and data sources.",
    author: "Frederic Lardinois",
    publishedAt: "14 hours ago",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 18,
    title: "Samsung and Google deepen AI partnership for Galaxy",
    category: "gadget",
    summary:
      "Next Galaxy flagships will ship with enhanced on-device AI features powered by Gemini.",
    author: "Dominic-Madori Davis",
    publishedAt: "15 hours ago",
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 19,
    title: "Stability AI releases new image model for designers",
    category: "ai",
    summary:
      "The model focuses on consistency and control for use in branding and marketing workflows.",
    author: "Anna Helen",
    publishedAt: "16 hours ago",
    imageUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 20,
    title: "Cloud providers report record AI revenue growth",
    category: "tech",
    summary:
      "Azure, GCP, and AWS all cite demand for GPU instances and managed AI services.",
    author: "Tim De Chant",
    publishedAt: "1 day ago",
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  },
];

export function getArticleById(id: number): LatestNewsItem | undefined {
  return latestNews.find((a) => a.id === id);
}

/** アクセス数（ダミー）。Supabase/分析連携で差し替え可能 */
const accessCountById: Record<number, number> = {
  1: 12400,
  2: 9820,
  3: 8750,
  4: 7600,
  5: 6100,
  6: 5900,
  7: 5200,
  8: 4800,
  9: 4450,
  10: 4100,
  11: 3800,
  12: 3500,
  13: 3200,
  14: 2900,
  15: 2600,
  16: 2400,
  17: 2100,
  18: 1900,
  19: 1700,
  20: 1500,
};

/** 全ニュース中アクセス多い順で上位 N 件 */
export function getTrendingNews(limit = 10): LatestNewsItem[] {
  return [...latestNews]
    .sort((a, b) => (accessCountById[b.id] ?? 0) - (accessCountById[a.id] ?? 0))
    .slice(0, limit);
}

