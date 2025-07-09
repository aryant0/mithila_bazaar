import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ShoppingCart, Star, Tag, Search, List } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import { useProductContext } from '@/contexts/ProductContext';
import { getProducts } from '@/services/productServices';
import { getCategoriesByCatName } from '@/services/categoryServices';
import { CategoryValue } from '@/models/category';
import { ProductResponse } from '@/models/product';
import { Item } from '@/models/product';


const Products = () => {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Item[]>([]);
  const [categories, setCategories] = useState<CategoryValue[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(8); // default to desktop

  // Responsive perPage based on screen size
  useEffect(() => {
    function updatePerPage() {
      if (window.matchMedia('(max-width: 640px)').matches) {
        setPerPage(4); // mobile
      } else {
        setPerPage(8); // desktop/tablet
      }
    }
    updatePerPage();
    window.addEventListener('resize', updatePerPage);
    return () => window.removeEventListener('resize', updatePerPage);
  }, []);

  // Fetch categories on mount
  useEffect(() => {
    getCategoriesByCatName('MAIN-CATEGORY').then(res => {
      setCategories(res.categoryValues || []);
    });
  }, []);

  // Fetch products from backend
  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const data: ProductResponse = await getProducts({ search, category, page, limit: perPage });
      setProducts(data.items);
      setCurrentPage(data.current_page || 1);
      setTotalPages(data.total_pages || 1);
    } catch (e) {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
    // eslint-disable-next-line
  }, []);

  // Add-to-cart logic remains the same
  const handleAddToCart = useCallback((product: Item) => {
    addItem({
      id: product.itemId.toString(),
      name: product.itemName,
      price: product.stock.salePrice ?? product.stock.mrp ?? 0,
      image: product.stock.cat4,
      unit: product.stock.cat5
    });
  }, [addItem]);

  //const featuredProducts = productList.filter(product => product.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Update ProductCard for beautiful square cards
  const ProductCard = React.memo(({ product, onAddToCart }: { product: Item, onAddToCart: (product: Item) => void }) => (
    <motion.div
      key={product.itemId}
      variants={itemVariants}
      whileHover={{ scale: 1.05, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
      className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 border border-gray-100 flex flex-col justify-between h-64 group hover:shadow-xl"
    >
      <div className="flex-1 flex flex-col items-center justify-start w-full px-2 pt-4 pb-2 min-h-0">
        <div className="w-16 h-16 max-h-16 flex items-center justify-center mb-4 overflow-hidden">
          <img src="/mbazaar.ico" alt="Product" className="w-12 h-12 object-contain rounded-xl" />
        </div>
        <h3 className="font-bold text-gray-900 text-lg text-center mb-1 group-hover:text-mithila-blue transition-colors truncate w-full">{product.itemName}</h3>
        <p className="text-xs text-gray-500 mb-2 text-center truncate w-full">{product.stock.cat5}</p>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-xl font-bold text-mithila-blue">₹{product.stock.salePrice}</span>
          {(product.stock.mrp && product.stock.mrp < product.stock.salePrice) && (
            <span className="text-gray-400 line-through text-sm">₹{product.stock.mrp}</span>
          )}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold mb-2 ${product.stock.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{product.stock.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
      </div>
      <div className="px-2 pb-4">
        <button
          onClick={() => onAddToCart(product)}
          disabled={product.stock.stock === 0}
          className={`w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200
            ${product.stock.stock > 0
              ? 'bg-mithila-orange text-white hover:bg-mithila-orange/90 active:scale-95 shadow'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
          `}
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </motion.div>
  ));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-mithila-blue to-blue-800 section-padding relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          {/* Subtle background pattern/texture can go here if desired */}
        </div>
        <div className="container-custom text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-md"
          >
            Our <span className="text-mithila-orange">Products</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8"
          >
            Discover our wide range of fresh, quality products carefully selected
            for Madhubani families.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center bg-mithila-orange text-white px-6 py-3 rounded-full shadow-lg"
          >
            <ShoppingCart className="mr-2" size={20} />
            <span className="font-medium">Shop Online Now Available!</span>
          </motion.div>
        </div>
      </section>
      {/* Modern, full-width search bar section */}
      <div className="w-full bg-white rounded-2xl shadow-lg mb-10 px-4 py-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={22} />
          </span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="pl-11 pr-4 py-3 border border-gray-300 rounded-lg w-full text-lg focus:outline-none focus:ring-2 focus:ring-mithila-blue bg-gray-50"
          />
        </div>
        <div className="relative w-full sm:w-64 flex items-center">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <List size={22} />
          </span>
          <select
            id="category-select"
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="pl-11 pr-4 py-3 border border-gray-300 rounded-lg w-full text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-mithila-blue bg-gray-50"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.categoryValueId} value={cat.categoryValueName}>{cat.categoryValueName}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => fetchProducts(1)}
          className="bg-mithila-blue text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-blue-800 transition-colors w-full sm:w-auto text-lg flex items-center justify-center gap-2"
          disabled={loading}
          style={{ minWidth: 120 }}
        >
          <Search size={22} className="inline-block mr-1" />
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Featured Products
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Our most popular items this week</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -8, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-all duration-300 border border-gray-100"
              >
                <div className="relative">
                  <img
                    src={logoImage}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-48 object-cover object-center"
                  />
                  {product.discount && (
                    <Badge className="absolute top-4 left-4 bg-mithila-orange text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
                      {product.discount}% OFF
                    </Badge>
                  )}
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 p-2 rounded-full shadow">
                    <Star size={16} fill="currentColor" />
                  </div>
                  <div className={`absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${product.inStock ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                    {product.inStock ? 'In Stock' : 'Low Stock'}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 text-base leading-relaxed">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-mithila-blue">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-gray-500 line-through ml-2 text-lg">₹{product.originalPrice}</span>
                      )}
                      <p className="text-sm text-gray-500 mt-1">{product.unit}</p>
                    </div>
                    <motion.button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 shadow-md
                        ${product.inStock
                          ? 'bg-mithila-orange text-white hover:bg-mithila-orange/90 active:scale-95'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      whileHover={product.inStock ? { scale: 1.05 } : {}}
                      whileTap={product.inStock ? { scale: 0.95 } : {}}
                    >
                      <ShoppingCart size={20} />
                      <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                    </motion.button>
                  </div>
                  <p>ID: {product.id}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* All Products with Filter */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">All Products</h2>
            <p className="text-xl text-gray-600">Browse by category</p>
          </motion.div>

          {/* Category Filter */}
          {/* The category button group is removed as per the edit hint */}

          {/* Products Grid */}
          {(loading) ? (
            <div className="text-center py-20">
              <div className="animate-spin h-10 w-10 mx-auto rounded-full border-4 border-t-transparent border-mithila-blue"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : (
            <motion.div
              key={category}
              variants={containerVariants}
              className="grid grid-cols-3 lg:grid-cols-6 gap-6"
            >
              {products.map((product) => (
                <ProductCard key={product.itemId} product={product} onAddToCart={handleAddToCart} />
              ))}
            </motion.div>
          )}

          {!(loading) && products.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <Tag className="text-gray-400 mx-auto mb-4" size={48} />
              <p className="text-xl text-gray-600">No products found in this category. Try another filter!</p>
            </motion.div>
          )}

        </div>
      </section>
    </div>
  );
};

export default Products;