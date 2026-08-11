export interface Store {
  store_id: number;
  store_name: string;
}

export interface PricePoint {
  price_id: number;
  product_id: number;
  price: number;
  recorded_at: string;
}

export interface Product {
  product_id: number;
  title: string;
  main_category: string;
  description: string;
  average_rating: number;
  image_url: string;
  store: Store;
  price: number;
  recorded_at: string;
  created_at: string;
}

export interface ProductListResponse {
  items: Product[];
  page: number;
  limit: number;
  total: number;
}