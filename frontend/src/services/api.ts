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
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getProducts = async (
  page = 1,
  limit = 20
): Promise<ProductListResponse> => {
  await delay(800);

  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch products. Please try again later.');
  }

  return {
    items: MOCK_PRODUCTS,
    page,
    limit,
    total: MOCK_PRODUCTS.length,
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