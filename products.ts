// جميع صور المنتجات والبيانات

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number; // بالـ Pi
  discount?: number;
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  inStock: boolean;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  options: string[];
}

// صور المنتجات - استخدام URLs عامة أو محلية
const PRODUCT_IMAGES = {
  electronics: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
  ],
  fashion: [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    'https://images.unsplash.com/photo-1595777707802-221b37b3b3d3?w=500',
    'https://images.unsplash.com/photo-1539533057440-7814a3d1e340?w=500',
  ],
  supermarket: [
    'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b11?w=500',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500',
  ],
  books: [
    'https://images.unsplash.com/photo-1507842217343-583f20270319?w=500',
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500',
    'https://images.unsplash.com/photo-1507842217343-583f20270319?w=500',
  ],
  home: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500',
    'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500',
    'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500',
  ],
};

export const products: Product[] = [
  // الإلكترونيات
  {
    id: 1,
    name: 'سماعات رأس لاسلكية',
    category: 'electronics',
    price: 50,
    discount: 20,
    rating: 4.5,
    reviews: 234,
    images: [PRODUCT_IMAGES.electronics[0], PRODUCT_IMAGES.electronics[1]],
    description: 'سماعات رأس عالية الجودة مع تقنية الضوضاء النشطة',
    inStock: true,
    variants: [
      { id: 'color', name: 'اللون', options: ['أسود', 'أبيض', 'أزرق'] },
    ],
  },
  {
    id: 2,
    name: 'ساعة ذكية',
    category: 'electronics',
    price: 120,
    discount: 15,
    rating: 4.3,
    reviews: 156,
    images: [PRODUCT_IMAGES.electronics[1], PRODUCT_IMAGES.electronics[2]],
    description: 'ساعة ذكية مع مراقبة صحية متقدمة',
    inStock: true,
    variants: [
      { id: 'size', name: 'الحجم', options: ['صغير', 'متوسط', 'كبير'] },
    ],
  },
  {
    id: 3,
    name: 'كاميرا ديجيتال',
    category: 'electronics',
    price: 300,
    discount: 10,
    rating: 4.7,
    reviews: 89,
    images: [PRODUCT_IMAGES.electronics[2], PRODUCT_IMAGES.electronics[0]],
    description: 'كاميرا احترافية بدقة 4K',
    inStock: true,
  },

  // الموضة
  {
    id: 4,