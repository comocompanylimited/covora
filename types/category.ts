export interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: {
    id: number;
    src: string;
    alt: string;
    name: string;
  } | null;
  count: number;
  acf?: {
    hero_image?: string;
    subtitle?: string;
  };
}

export interface CategoryTree extends Category {
  children: CategoryTree[];
}
