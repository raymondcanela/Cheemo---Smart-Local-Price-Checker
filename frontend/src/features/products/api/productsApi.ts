// TODO: when backend is ready, replace mock logic below with:
// const response = await fetch(`${API_BASE_URL}/products?page=${page}&limit=${limit}`);
// import { API_BASE_URL } from '../../../lib/config';

import type { Product, ProductListResponse } from '../types/product';

const MOCK_PRODUCTS: Product[] = [
  {
    product_id: 1,
    title: 'Pro Running Speedster',
    main_category: 'Footwear',
    description: 'High-performance running shoes for professional athletes.',
    average_rating: 4.5,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTq0m9IdoIj6AVYESAOxjq0bons6HHeXsJ8_Y3VyEKEh0lompRZI9INjQSMDLsjxqJp_dkpQiFiy2Eyptg07TKzFFlUUIYJeNpjFKAfGUjVlESv5QQF4iw79TTdDxhd085Dax3T3UrZhCawA0WSbyxpMhLrURWhv2gfZJL57n0oMrfgxR1YM-YqSkJL1mACZm9LkwaUwTpLWOOnYHMQYNpUbmNhRdVrEH6d79RJ7QPnvX3KhiDoY9YfbShCzsfNd66cjMD9lGdyd8',
    store: { store_id: 1, store_name: 'Amazon' },
    price: 120.00,
    recorded_at: '2026-08-06T10:00:00Z',
    created_at: '2026-01-10T08:00:00Z',
  },
  {
    product_id: 2,
    title: 'Minimalist Chronograph',
    main_category: 'Accessories',
    description: 'Elegant timepiece with a minimalist design.',
    average_rating: 4.2,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhQN4Qb57VlZxcYP1se4MH7fhms8X4mFQl0f9SFlLlzyshg-KlnoVcC0Z2sUsQGaXFu50oh0RRgR8JWQrP9rUBaIvhuJFm0TtD0R5nF4xVBMA1M6o6o3F8Q4HxOPr3ah2gZAVpHfymWmFbZe4YOSeg-4uoi_Hzu53CQV8UlmuAATMfVQRvCmG10XcRwiU8TwJ06iZ6zNu48KPVZx2vSDMHtSU2fJWq_U8w5aA7WVx6djRZjovizP9Gbw92NB_9jw2QGaFtpSumnFU',
    store: { store_id: 2, store_name: 'Nordstrom' },
    price: 210.00,
    recorded_at: '2026-08-06T10:00:00Z',
    created_at: '2026-01-12T08:00:00Z',
  },
  {
    product_id: 3,
    title: 'UltraSlim Laptop 14"',
    main_category: 'Electronics',
    description: 'Lightweight and powerful laptop for productivity on the go.',
    average_rating: 4.7,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzVO7lFs2TO0Ge-CL38Lcf1F5YBZujpExvzmcLQpc9fePuVVFJbtsdWlxsyJq4ovb8mu_XBZH348au0qBIkIEsDvwko34ZBEH3MlsCayD7bQgspz7Kvn8akoaZVCW6MSWxCE-ggvf6kYXD0poB8vMVRbPeVx8M8iBGX2NzRa2j4VE-TfqVUTS3-wh3kBbxltq909Acx4-9gN_z_b5wglEAjkJt1i7rA5IajVa6IRpmRwpOV5yQM7PTeQLupBBzVh12-R5vwdbaP20',
    store: { store_id: 3, store_name: 'Best Buy' },
    price: 899.00,
    recorded_at: '2026-08-06T10:00:00Z',
    created_at: '2026-01-15T08:00:00Z',
  },
  {
    product_id: 4,
    title: 'Wireless Noise-Cancelling Headphones',
    main_category: 'Electronics',
    description: 'Over-ear headphones with active noise cancellation.',
    average_rating: 4.6,
    image_url: 'https://picsum.photos/seed/headphones/400/300',
    store: { store_id: 3, store_name: 'Best Buy' },
    price: 179.99,
    recorded_at: '2026-08-05T10:00:00Z',
    created_at: '2026-02-01T08:00:00Z',
  },
  {
    product_id: 5,
    title: 'Leather Crossbody Bag',
    main_category: 'Accessories',
    description: 'Genuine leather bag with adjustable strap.',
    average_rating: 4.3,
    image_url: 'https://picsum.photos/seed/bag/400/300',
    store: { store_id: 2, store_name: 'Nordstrom' },
    price: 95.00,
    recorded_at: '2026-08-05T10:00:00Z',
    created_at: '2026-02-03T08:00:00Z',
  },
  {
    product_id: 6,
    title: 'Trail Running Backpack 20L',
    main_category: 'Outdoor',
    description: 'Lightweight hiking backpack with hydration compatibility.',
    average_rating: 4.4,
    image_url: 'https://picsum.photos/seed/backpack/400/300',
    store: { store_id: 1, store_name: 'Amazon' },
    price: 65.00,
    recorded_at: '2026-08-04T10:00:00Z',
    created_at: '2026-02-05T08:00:00Z',
  },
  {
    product_id: 7,
    title: 'Stainless Steel Cookware Set',
    main_category: 'Home',
    description: '10-piece cookware set, dishwasher safe.',
    average_rating: 4.1,
    image_url: 'https://picsum.photos/seed/cookware/400/300',
    store: { store_id: 4, store_name: 'Target' },
    price: 149.99,
    recorded_at: '2026-08-04T10:00:00Z',
    created_at: '2026-02-08T08:00:00Z',
  },
  {
    product_id: 8,
    title: 'Smart LED Desk Lamp',
    main_category: 'Home',
    description: 'Adjustable brightness, USB-C charging port.',
    average_rating: 4.0,
    image_url: 'https://picsum.photos/seed/lamp/400/300',
    store: { store_id: 4, store_name: 'Target' },
    price: 34.99,
    recorded_at: '2026-08-03T10:00:00Z',
    created_at: '2026-02-10T08:00:00Z',
  },
  {
    product_id: 9,
    title: 'Mechanical Gaming Keyboard',
    main_category: 'Electronics',
    description: 'RGB backlit keyboard with tactile switches.',
    average_rating: 4.8,
    image_url: 'https://picsum.photos/seed/keyboard/400/300',
    store: { store_id: 3, store_name: 'Best Buy' },
    price: 89.99,
    recorded_at: '2026-08-03T10:00:00Z',
    created_at: '2026-02-12T08:00:00Z',
  },
  {
    product_id: 10,
    title: 'Insulated Water Bottle 32oz',
    main_category: 'Outdoor',
    description: 'Keeps drinks cold for 24 hours or hot for 12.',
    average_rating: 4.5,
    image_url: 'https://picsum.photos/seed/bottle/400/300',
    store: { store_id: 1, store_name: 'Amazon' },
    price: 24.99,
    recorded_at: '2026-08-02T10:00:00Z',
    created_at: '2026-02-14T08:00:00Z',
  },
  {
    product_id: 11,
    title: "Men's Slim Fit Denim Jacket",
    main_category: 'Apparel',
    description: 'Classic denim jacket with a modern slim fit.',
    average_rating: 4.2,
    image_url: 'https://picsum.photos/seed/jacket/400/300',
    store: { store_id: 2, store_name: 'Nordstrom' },
    price: 79.99,
    recorded_at: '2026-08-02T10:00:00Z',
    created_at: '2026-02-16T08:00:00Z',
  },
  {
    product_id: 12,
    title: 'Ceramic Non-Stick Frying Pan',
    main_category: 'Home',
    description: '12-inch frying pan, PFOA-free ceramic coating.',
    average_rating: 4.3,
    image_url: 'https://picsum.photos/seed/pan/400/300',
    store: { store_id: 4, store_name: 'Target' },
    price: 29.99,
    recorded_at: '2026-08-01T10:00:00Z',
    created_at: '2026-02-18T08:00:00Z',
  },
  {
    product_id: 13,
    title: 'Bluetooth Portable Speaker',
    main_category: 'Electronics',
    description: 'Waterproof speaker with 12-hour battery life.',
    average_rating: 4.4,
    image_url: 'https://picsum.photos/seed/speaker/400/300',
    store: { store_id: 3, store_name: 'Best Buy' },
    price: 49.99,
    recorded_at: '2026-08-01T10:00:00Z',
    created_at: '2026-02-20T08:00:00Z',
  },
  {
    product_id: 14,
    title: 'Yoga Mat with Carrying Strap',
    main_category: 'Outdoor',
    description: 'Non-slip, 6mm thick, eco-friendly material.',
    average_rating: 4.6,
    image_url: 'https://picsum.photos/seed/yogamat/400/300',
    store: { store_id: 1, store_name: 'Amazon' },
    price: 22.00,
    recorded_at: '2026-07-31T10:00:00Z',
    created_at: '2026-02-22T08:00:00Z',
  },
  {
    product_id: 15,
    title: 'Wool Blend Winter Scarf',
    main_category: 'Accessories',
    description: 'Soft wool blend scarf, one size fits all.',
    average_rating: 4.0,
    image_url: 'https://picsum.photos/seed/scarf/400/300',
    store: { store_id: 2, store_name: 'Nordstrom' },
    price: 18.50,
    recorded_at: '2026-07-31T10:00:00Z',
    created_at: '2026-02-24T08:00:00Z',
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  store?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price' | 'average_rating';
  sortOrder?: 'asc' | 'desc';
}

// Derived from mock data now; later these could come from their own endpoints
// (e.g. GET /categories, GET /stores) once the backend supports it.
export const AVAILABLE_CATEGORIES = Array.from(
  new Set(MOCK_PRODUCTS.map((p) => p.main_category))
).sort();

export const AVAILABLE_STORES = Array.from(
  new Set(MOCK_PRODUCTS.map((p) => p.store.store_name))
).sort();

export const getProducts = async (
  params: ProductQueryParams = {}
): Promise<ProductListResponse> => {
  const {
    page = 1,
    limit = 20,
    search,
    category,
    store,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder = 'asc',
  } = params;

  await delay(800);

  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch products. Please try again later.');
  }

  let filtered = [...MOCK_PRODUCTS];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter((p) => p.title.toLowerCase().includes(q));
  }
  if (category) {
    filtered = filtered.filter((p) => p.main_category === category);
  }
  if (store) {
    filtered = filtered.filter((p) => p.store.store_name === store);
  }
  if (minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= minPrice);
  }
  if (maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= maxPrice);
  }

  if (sortBy) {
    filtered.sort((a, b) => {
      const diff = a[sortBy] - b[sortBy];
      return sortOrder === 'asc' ? diff : -diff;
    });
  }

  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    items: filtered.slice(start, end),
    page,
    limit,
    total: filtered.length,
  };
};

/**
 * Simulates GET /products/{id}.
 */
export const getProductById = async (id: number): Promise<Product> => {
  await delay(500);

  const product = MOCK_PRODUCTS.find((p) => p.product_id === id);
  if (!product) {
    throw new Error(`Product ${id} not found.`);
  }

  return product;
};