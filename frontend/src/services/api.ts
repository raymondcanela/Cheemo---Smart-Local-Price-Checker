import type { Product } from '../types/product';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Pro Running Speedster',
    description: 'High-performance running shoes for professional athletes.',
    category: 'Footwear',
    currentPrice: 120.00,
    originalPrice: 160.00,
    discountPercentage: 25,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTq0m9IdoIj6AVYESAOxjq0bons6HHeXsJ8_Y3VyEKEh0lompRZI9INjQSMDLsjxqJp_dkpQiFiy2Eyptg07TKzFFlUUIYJeNpjFKAfGUjVlESv5QQF4iw79TTdDxhd085Dax3T3UrZhCawA0WSbyxpMhLrURWhv2gfZJL57n0oMrfgxR1YM-YqSkJL1mACZm9LkwaUwTpLWOOnYHMQYNpUbmNhRdVrEH6d79RJ7QPnvX3KhiDoY9YfbShCzsfNd66cjMD9lGdyd8',
    store: { id: 's1', name: 'Amazon', url: 'https://amazon.com' },
    priceHistory: [
      { date: '2024-05-20', price: 160.00 },
      { date: '2024-05-26', price: 120.00 },
    ],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Minimalist Chronograph',
    description: 'Elegant timepiece with a minimalist design.',
    category: 'Accessories',
    currentPrice: 210.00,
    originalPrice: 250.00,
    discountPercentage: 15,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhQN4Qb57VlZxcYP1se4MH7fhms8X4mFQl0f9SFlLlzyshg-KlnoVcC0Z2sUsQGaXFu50oh0RRgR8JWQrP9rUBaIvhuJFm0TtD0R5nF4xVBMA1M6o6o3F8Q4HxOPr3ah2gZAVpHfymWmFbZe4YOSeg-4uoi_Hzu53CQV8UlmuAATMfVQRvCmG10XcRwiU8TwJ06iZ6zNu48KPVZx2vSDMHtSU2fJWq_U8w5aA7WVx6djRZjovizP9Gbw92NB_9jw2QGaFtpSumnFU',
    store: { id: 's2', name: 'Nordstrom', url: 'https://nordstrom.com' },
    priceHistory: [
      { date: '2024-05-15', price: 250.00 },
      { date: '2024-05-26', price: 210.00 },
    ],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'UltraSlim Laptop 14"',
    description: 'Lightweight and powerful laptop for productivity on the go.',
    category: 'Electronics',
    currentPrice: 899.00,
    originalPrice: 1499.00,
    discountPercentage: 40,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzVO7lFs2TO0Ge-CL38Lcf1F5YBZujpExvzmcLQpc9fePuVVFJbtsdWlxsyJq4ovb8mu_XBZH348au0qBIkIEsDvwko34ZBEH3MlsCayD7bQgspz7Kvn8akoaZVCW6MSWxCE-ggvf6kYXD0poB8vMVRbPeVx8M8iBGX2NzRa2j4VE-TfqVUTS3-wh3kBbxltq909Acx4-9gN_z_b5wglEAjkJt1i7rA5IajVa6IRpmRwpOV5yQM7PTeQLupBBzVh12-R5vwdbaP20',
    store: { id: 's3', name: 'Best Buy', url: 'https://bestbuy.com' },
    priceHistory: [
      { date: '2024-05-10', price: 1499.00 },
      { date: '2024-05-26', price: 899.00 },
    ],
    lastUpdated: new Date().toISOString(),
  },
];

/**
 * Simulates an API call to fetch trending products.
 * Includes a simulated delay to mimic network latency.
 */
export const getTrendingProducts = async (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a random error 10% of the time for testing
      if (Math.random() < 0.1) {
        reject(new Error('Failed to fetch trending products. Please try again later.'));
      } else {
        resolve(MOCK_PRODUCTS);
      }
    }, 1500); // 1.5 second delay
  });
};
