export interface PricePoint {
  date: string;
  price: number;
}

export interface Store {
  id: string;
  name: string;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  currentPrice: number;
  originalPrice: number;
  discountPercentage: number;
  imageUrl: string;
  store: Store;
  priceHistory: PricePoint[];
  lastUpdated: string;
}
