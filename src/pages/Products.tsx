import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Tag, Search, List } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { getProducts } from '@/services/productServices';
import { getCategoriesByCatName } from '@/services/categoryServices';
import { CategoryResponse, CategoryValue } from '@/models/category';
import { ProductResponse } from '@/models/product';
import { Item } from '@/models/product';


const Products = () => {
  // Product & category data
  const [categories, setCategories] = useState<CategoryValue[]>([]);
  const [allProducts, setAllProducts] = useState<Item[]>([]);

  // Search & filter
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // UI state
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Suggestions logic
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const { addItem } = useCart();

  const DEFAULT_PER_PAGE = 24;

// Fetch categories and products on initial mount
useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    await fetchCategories();
    await fetchProducts();
    setLoading(false);
  };
  fetchData();
}, []);

const fetchCategories = async () => {
  try {
    const data: CategoryResponse = await getCategoriesByCatName('Cat2');
    setCategories(data.categoryValues || []);
  } catch (e) {
    console.error('Error fetching categories:', e);
  }
};

const fetchProducts = async () => {
  try {
    const data: ProductResponse = await getProducts();
    setAllProducts(data.items);
  } catch (e) {
    console.error('Error fetching products:', e);
  }
};

// Filter products by search + category
const filteredProducts = useMemo(() => {
  let result = allProducts;

  if (search) {
    result = result.filter(item =>
      item.itemName.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category) {
    result = result.filter(item =>
      item.stock?.[0]?.cat2 === category
    );
  }

  return result;
}, [allProducts, search, category]);

// Paginated visible products
const products = useMemo(() => {
  const start = (currentPage - 1) * DEFAULT_PER_PAGE;
  return filteredProducts.slice(start, start + DEFAULT_PER_PAGE);
}, [filteredProducts, currentPage]);

// Reset page on search or category change
useEffect(() => {
  setCurrentPage(1);
}, [search, category]);

// Update total pages whenever filtered data changes
useEffect(() => {
  const total = Math.ceil(filteredProducts.length / DEFAULT_PER_PAGE);
  setTotalPages(total || 1);
}, [filteredProducts]);

// Scroll to top on page change
useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, [currentPage]);

// Extract item names for suggestions
const allProductNames = useMemo(() => {
  const filtered = category
    ? allProducts.filter(item => item.stock?.[0]?.cat2 === category)
    : allProducts;

  return filtered.map(item => item.itemName);
}, [allProducts, category]);

// Generate autocomplete suggestions
useEffect(() => {
  const trimmed = search.trim().toLowerCase();

  if (!trimmed) {
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    return;
  }

  const handler = setTimeout(() => {
    const matches = allProductNames
      .filter(name => {
        const lower = name.toLowerCase();
        return lower === trimmed || lower.startsWith(trimmed);
      })
      .sort((a, b) => {
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();
        if (aLower === trimmed) return -1;
        if (bLower === trimmed) return 1;
        return aLower.localeCompare(bLower);
      })
      .slice(0, 5);

    setSuggestions(matches);
    setShowSuggestions(true);
    setSelectedSuggestionIndex(-1);
  }, 300); //Debounce delay

  return () => clearTimeout(handler); //Cancel if user types again
}, [search, allProductNames]);

// Handle category selection
const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setCategory(e.target.value);
};

// Handle search input changes
const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearch(e.target.value);
};

// Keyboard navigation for suggestions
const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    if (selectedSuggestionIndex >= 0) {
      handleSuggestionClick(suggestions[selectedSuggestionIndex]);
    } else {
      setShowSuggestions(false);
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    setSelectedSuggestionIndex(prev =>
      prev < suggestions.length - 1 ? prev + 1 : prev
    );
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    setSelectedSuggestionIndex(prev =>
      prev > 0 ? prev - 1 : -1
    );
  } else if (e.key === 'Escape') {
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  }
};

// Handle clicking on a suggestion
const handleSuggestionClick = (suggestion: string) => {
  setSearch(suggestion);
  setShowSuggestions(false);
  setSelectedSuggestionIndex(-1);
  setCurrentPage(1);
};

// Focus/Blur events for suggestions
const handleSearchFocus = () => {
  if (search.trim() && suggestions.length) {
    setShowSuggestions(true);
  }
};

const handleSearchBlur = () => {
  setTimeout(() => {
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  }, 200);
};

  // Add-to-cart logic remains the same
  const handleAddToCart = useCallback((product: Item) => {
    const availableStock = product.stock.find(s => s.stock > 0);
    if (!availableStock) return;
    addItem({
      id: product.itemId.toString(),
      name: product.itemName,
      price: availableStock.salePrice ?? availableStock.mrp ?? 0,
      image: availableStock.cat4,
      unit: availableStock.cat5
    });
  }, [addItem]);

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
  const ProductCard = React.memo(({ product, onAddToCart }: { product: Item, onAddToCart: (product: Item) => void }) => {
    const availableStock = product.stock.find(s => s.stock > 0);
    return (
      <motion.div
        key={product.itemId}
        variants={itemVariants}
        whileHover={{ scale: 1.05, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
        className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 border border-gray-100 flex flex-col justify-between min-h-[280px] group hover:shadow-xl"
      >
        <div className="flex-1 flex flex-col items-center justify-start w-full px-3 pt-4 pb-2">
          <div className="w-16 h-16 max-h-16 flex items-center justify-center mb-4 overflow-hidden flex-shrink-0">
            <img src="/mbazaar.ico" alt="Product" className="w-12 h-12 object-contain rounded-xl" />
          </div>
          <h3 className="font-bold text-gray-900 text-sm sm:text-base text-center mb-1 group-hover:text-mithila-blue transition-colors w-full leading-tight break-words">{product.itemName}</h3>
          {availableStock ? (
            <>
              <p className="text-xs text-gray-500 mb-2 text-center w-full leading-tight break-words">{availableStock.cat5}</p>
              <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
                <span className="text-lg sm:text-xl font-bold text-mithila-blue">₹{availableStock.salePrice}</span>
                {(availableStock.mrp && availableStock.mrp < availableStock.salePrice) && (
                  <span className="text-gray-400 line-through text-sm">₹{availableStock.mrp}</span>
                )}
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold mb-2 bg-green-100 text-green-700">In Stock</span>
            </>
          ) : (
            <>
              <p className="text-xs text-gray-500 mb-2 text-center w-full leading-tight break-words">No variant available</p>
              <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
                <span className="text-lg sm:text-xl font-bold text-mithila-blue">--</span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold mb-2 bg-red-100 text-red-700">Out of Stock</span>
            </>
          )}
        </div>
        <div className="px-3 pb-4 flex-shrink-0">
          <button
            onClick={() => availableStock && onAddToCart({ ...product, stock: [availableStock] })}
            disabled={!availableStock}
            className={`w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 text-sm
              ${availableStock
                ? 'bg-mithila-orange text-white hover:bg-mithila-orange/90 active:scale-95 shadow'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
            `}
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </motion.div>
    );
  });

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
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="w-full bg-white rounded-2xl shadow-lg mb-10 px-4 py-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </span>
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              onKeyPress={handleSearchKeyPress}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              placeholder="Search products..."
              className="pl-10 pr-10 py-3 border border-gray-300 rounded-lg w-full text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-mithila-blue bg-gray-50"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch('');
                  setCurrentPage(1);
                  setShowSuggestions(false);
                  setSelectedSuggestionIndex(-1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                type="button"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}

            {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-center gap-3
                      ${index === selectedSuggestionIndex ? 'bg-mithila-blue text-white' : ''}
                    `}
                    type="button"
                  >
                    <Search size={16} className="text-gray-400 flex-shrink-0" />
                    <span className="text-gray-700 truncate">{suggestion}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative w-full sm:w-64 flex items-center">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <List size={20} />
            </span>
            <select
              id="category-select"
              value={category}
              onChange={handleCategoryChange}
              className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full text-base sm:text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-mithila-blue bg-gray-50"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.categoryValueId} value={cat.categoryValueName}>{cat.categoryValueName}</option>
              ))}
            </select>
          </div>
          <button
            // onClick={() => fetchProducts()}
            className="bg-mithila-blue text-white px-6 sm:px-8 py-3 rounded-lg font-semibold shadow hover:bg-blue-800 transition-colors w-full sm:w-auto text-base sm:text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            style={{ minWidth: 120 }}
          >
            {loading ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                Searching...
              </>
            ) : (
              <>
                <Search size={20} className="inline-block mr-1" />
                Search
              </>
            )}
          </button>
        </div>
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
          {/* Results Counter */}
          {!loading && search && filteredProducts.length > 0 && (
            <div className="mb-6 text-center sm:text-left">
              <p className="text-gray-600">
                {`Found ${filteredProducts.length} product${products.length === 1 ? '' : 's'}`}
                {search && ` matching "${search}"`}
                {category && ` in ${category}`}
              </p>
              {search && (
                <p className="text-sm text-gray-500 mt-1">
                  Showing exact matches and products starting with "{search}"
                </p>
              )}
            </div>
          )}

          {/* Products Grid */}
          {(loading) ? (
            <div className="text-center py-20">
              <div className="animate-spin h-10 w-10 mx-auto rounded-full border-4 border-t-transparent border-mithila-blue"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : (
            <>
              <motion.div
                key={category}
                variants={containerVariants}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6"
              >
                {products.map((product) => (
                  <ProductCard key={product.itemId} product={product} onAddToCart={handleAddToCart} />
                ))}
              </motion.div>
              {/* Pagination Controls */}
              {!loading && totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded bg-gray-200 text-gray-700 font-semibold disabled:opacity-50"
                  >
                    Prev
                  </button>
                  {/* Sliding window of page numbers */}
                  {(() => {
                    const windowSize = 10; // Max window size here
                    let start = Math.max(1, currentPage - Math.floor(windowSize / 2));
                    let end = Math.min(totalPages, start + windowSize - 1);

                    // Re-adjust start if we're near the end
                    start = Math.max(1, end - windowSize + 1);

                    const pages = [];
                    for (let i = start; i <= end; i++) {
                      pages.push(i);
                    }
                    return pages.map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 rounded font-semibold ${page === currentPage
                          ? 'bg-mithila-blue text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-mithila-blue hover:text-white'
                          }`}
                      >
                        {page}
                      </button>
                    ));
                  })()}
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded bg-gray-200 text-gray-700 font-semibold disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}

          {!(loading) && products.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <Tag className="text-gray-400 mx-auto mb-4" size={48} />
              <p className="text-xl text-gray-600">
                {search || category
                  ? 'No products found matching your criteria. Try adjusting your search or category filter.'
                  : 'No products available at the moment.'
                }
              </p>
            </motion.div>
          )}

        </div>
      </section>
    </div>
  );
};

export default Products;