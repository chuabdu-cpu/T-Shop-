import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import Carousel from '@/components/Carousel';
import LightningDeals from '@/components/LightningDeals';
import { categories, products, lightningDeals } from '@/data/products';
import { formatPiAndUSD } from '@/lib/piConverter';
import { Heart } from 'lucide-react';

const CAROUSEL_IMAGES = [
  'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
  'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200',
  'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1200',
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">T-Shop</h1>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              🛒
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">👤</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Categories */}
        <div className="mb-8 flex gap-4 overflow-x-auto pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id === 1 ? 'all' : cat.name.toLowerCase())}
              className={`flex flex-col items-center gap-2 px-4 py-3 rounded-lg whitespace-nowrap transition ${
                (cat.id === 1 && selectedCategory === 'all') ||
                (cat.id !== 1 && selectedCategory === cat.name.toLowerCase())
                  ? 'bg-blue-600 text-white'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-sm font-medium">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Carousel Banner */}
        <div className="mb-8">
          <Carousel images={CAROUSEL_IMAGES} autoPlay interval={5000} />
        </div>

        {/* Lightning Deals */}
        <div className="mb-8">
          <LightningDeals deals={lightningDeals} />
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">المنتجات المتاحة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const { pi: piPrice, usd: usdPrice } = formatPiAndUSD(product.price);
              const isWishlisted = wishlist.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <div className="relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full transition ${
                        isWishlisted
                          ? 'bg-red-600 text-white'
                          : 'bg-white text-red-600 hover:bg-red-50'
                      }`}
                    >
                      <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                    </button>
                    {product.discount && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        -{product.discount}%
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-1 mb-3">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm font-semibold">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>

                    <div className="mb-4">
                      <p className="text-blue-600 font-bold text-lg">{piPrice}</p>
                      <p className="text-gray-500 text-xs">{usdPrice}</p>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition text-sm font-medium">
                        أضف للعربة
                      </button>
                      <button className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-lg transition text-sm font-medium">
                        التفاصيل
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">منتجات قد تعجبك</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => {
              const { pi: piPrice } = formatPiAndUSD(product.price);

              return (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-blue-600 font-bold">{piPrice}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-40">
        <button className="flex flex-col items-center gap-1 py-2 text-blue-600">
          <span className="text-2xl">🏠</span>
          <span className="text-xs">الرئيسية</span>
        </button>
        <button className="flex flex-col items-center gap-1 py-2 text-gray-600 hover:text-blue-600">
          <span className="text-2xl">🔍</span>
          <span className="text-xs">البحث</span>
        </button>
        <button className="flex flex-col items-center gap-1 py-2 text-gray-600 hover:text-blue-600">
          <span className="text-2xl">❤️</span>
          <span className="text-xs">المفضلة</span>
        </button>
        <button className="flex flex-col items-center gap-1 py-2 text-gray-600 hover:text-blue-600">
          <span className="text-2xl">👤</span>
          <span className="text-xs">الحساب</span>
        </button>
      </nav>

      <div className="h-20" />
    </div>
  );
}
