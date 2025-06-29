import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { products, productCategories, Product } from '@/data/products';
import { ShoppingCart, Star, Tag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import { useProductContext } from '@/contexts/ProductContext';

const Products = () => {
  const { productList } = useProductContext();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productList);
  const { addItem } = useCart();

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(productList);
    } else {
      setFilteredProducts(productList.filter(product => product.category === category));
    }
  };

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(productList);
    } else {
      setFilteredProducts(productList.filter(product => product.category === selectedCategory));
    }
  }, [productList, selectedCategory]);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      unit: product.unit
    });
  };

  const featuredProducts = productList.filter(product => product.featured);

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

  const logoImage = '/LOGOS_page-0003.png';

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

      {/* Featured Products */}
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
                  <div className={`absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                    product.inStock ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
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
      </section>

      {/* All Products with Filter */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">All Products</h2>
            <p className="text-xl text-gray-600">Browse by category</p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {productCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-7 py-3 rounded-full font-semibold transition-all duration-300 shadow-sm
                  ${selectedCategory === category
                    ? 'bg-mithila-blue text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-mithila-blue/10 hover:text-mithila-blue'
                  }`}
                whileHover={{ scale: 1.05, boxShadow: selectedCategory !== category ? "0 4px 10px rgba(0,0,0,0.08)" : undefined }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Products Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.08)" }}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 border border-gray-100"
              >
                <div className="relative">
                  <img
                    src={logoImage}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-40 object-cover object-center"
                  />
                  {product.discount && (
                    <Badge className="absolute top-2 left-2 bg-mithila-orange text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                      {product.discount}% OFF
                    </Badge>
                  )}
                  <div className={`absolute top-2 right-2 w-4 h-4 rounded-full shadow ${
                    product.inStock ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1 text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{product.unit}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-mithila-blue">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-gray-500 line-through text-sm ml-1">₹{product.originalPrice}</span>
                      )}
                    </div>
                    <motion.button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className={`p-2.5 rounded-lg transition-all duration-300 shadow-sm
                        ${product.inStock
                          ? 'bg-mithila-orange text-white hover:bg-mithila-orange/90 active:scale-90'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      whileHover={product.inStock ? { scale: 1.1 } : {}}
                      whileTap={product.inStock ? { scale: 0.9 } : {}}
                    >
                      <ShoppingCart size={18} />
                    </motion.button>
                  </div>
                  <p>ID: {product.id}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
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