export type Tour = {
  id: string;
  slug: string;
  category_id: string | null;
  title: string;
  title_english: string | null;
  description: string;
  description_english: string | null;
  price: number;
  image_url: string | null;
  destination: string;
  duration: string | null;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};