export type Category =
  | "latest"
  | "ai"
  | "tech"
  | "gadget"
  | "trending";

export interface Article {
  title: string;
  url: string;
  category: Category;
}
