import { useState, useEffect } from 'react';
import { ArrowRight, Star, Users, MapPin, Phone, Mail, Eye, ShoppingBag, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Enhanced StoreGallery component
const StoreGallery = () => {
  const images = [
    "/StoreIMG1.jpg",
    "/LOGOS_page-0003.png",
    "/StoreIMG2.jpg"
  ];
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-mithila-cream">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Vibrant Store</h2>
          <div className="w-24 h-1 bg-mithila-orange mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the colorful atmosphere of Mithila Bazaar
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-xl h-[400px]">
                <motion.div
                  className="absolute inset-0 bg-mithila-orange/20"
                  style={{
                    filter: "blur(20px)",
                    transform: "scale(1.1)",
                  }}
                />
                <img 
                  src={image} 
                  alt={`Store view ${index + 1}`}
                  className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-30">
                  <h3 className="text-2xl font-bold mb-2">Mithila Bazaar Store</h3>
                  <p className="text-white/90">Experience our modern retail space</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const whatsappMessage = encodeURIComponent("Hi! I'm interested in learning more about Mithila Bazaar. Please share more details.");
  const emailSubject = encodeURIComponent("Inquiry about Mithila Bazaar");
  const emailBody = encodeURIComponent("Hi,\n\nI'm interested in learning more about Mithila Bazaar. Please provide more information.\n\nThank you!");

  const scrollToGallery = () => {
    const gallerySection = document.querySelector('#store-gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Floating product animation variants
  const floatingAnimation = {
    float: {
      y: [-10, 10],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 3,
          ease: "easeInOut"
        }
      }
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute top-20 right-10 w-16 h-16 rounded-full bg-mithila-orange/20 z-0"
        variants={floatingAnimation}
        animate="float"
      />
      <motion.div 
        className="absolute top-1/3 left-5 w-24 h-24 rounded-full bg-mithila-blue/10 z-0"
        variants={floatingAnimation}
        animate="float"
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-10 h-10 rounded-full bg-mithila-orange/30 z-0"
        variants={floatingAnimation}
        animate="float"
      />
      
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-mithila-blue/5 to-mithila-orange/5 section-padding relative overflow-hidden">
        <div className="container-custom h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)]">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="py-12"
            >
              <div className="mb-8">
                <motion.span 
                  className="px-6 py-3 bg-mithila-orange/10 text-mithila-orange rounded-full font-medium text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  MADHUBANI'S FAVORITE
                </motion.span>
              </div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight"
              >
                <span className="text-mithila-blue block mb-4">Bihar's Own Supermarket</span>
                <span className="text-mithila-orange">Now Serving Madhubani!</span>
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-2xl text-gray-600 mb-10 leading-relaxed"
              >
                Fresh groceries, trusted quality, local service – your neighborhood bazaar is now online.
              </motion.p>

              <motion.div 
                variants={fadeInUp}
                className="mb-10"
              >
                <div className="flex items-center space-x-3 text-gray-600 mb-4">
                  <MapPin className="text-mithila-orange" size={24} />
                  <p className="text-lg">
                    466, near chaiti durga mandir, ward no. 9, saurath road, jagatpur, p s - rahika, madhubani 847213
                  </p>
                </div>
                <a 
                  href="https://www.google.com/maps?q=26.3692855834961,86.0586700439453"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mithila-blue hover:text-mithila-orange transition-colors duration-300 flex items-center space-x-2"
                >
                  <span>View on Google Maps</span>
                  <ArrowRight size={16} />
                </a>
              </motion.div>
              
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-6"
              >
                <motion.button
                  onClick={scrollToGallery}
                  className="flex items-center justify-center space-x-3 text-lg px-8 py-4 rounded-xl bg-mithila-blue text-white hover:bg-mithila-blue/90 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "#1e3a8a",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye size={24} className="animate-pulse" />
                  <span>View Store Photos</span>
                </motion.button>
                
                <motion.a
                  href={`https://wa.me/+917070848333?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 text-lg px-8 py-4 rounded-xl bg-mithila-orange text-white hover:bg-mithila-orange/90 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "#f97316",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone size={24} className="animate-bounce" />
                  <span>WhatsApp Us</span>
                </motion.a>
              </motion.div>
              
              {/* Floating products animation */}
              <motion.div 
                className="mt-16 flex gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="bg-white p-4 rounded-xl shadow-lg border-2 border-mithila-orange/20"
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  >
                    <ShoppingBag className="text-mithila-orange" size={28} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: "radial-gradient(circle at center, rgba(249, 115, 22, 0.3) 0%, rgba(249, 115, 22, 0.1) 50%, transparent 70%)",
                    filter: "blur(30px)",
                    transform: "scale(1.2)",
                  }}
                />
                <img
                  src="/LOGOS_page-0002.png"
                  alt="Modern Supermarket"
                  loading="lazy"
                  className="w-full h-[600px] object-contain relative z-10 transform -translate-y-12"
                />
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="absolute -bottom-8 -left-8 bg-white p-8 rounded-xl shadow-lg border-2 border-mithila-orange/20 z-20 transform -translate-y-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <Star className="text-green-600" size={32} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-xl">4.8/5 Rating</p>
                      <p className="text-gray-600">Customer Satisfaction</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -top-8 -right-8 bg-white p-6 rounded-xl shadow-lg border-2 border-mithila-blue/20 z-20"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-mithila-blue/10 rounded-full flex items-center justify-center mb-3">
                      <Users className="text-mithila-blue" size={28} />
                    </div>
                    <p className="font-bold text-gray-900 text-xl">1000+</p>
                    <p className="text-gray-600">Happy Customers</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-sm text-gray-600 mb-2">Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="text-mithila-orange" size={28} />
          </motion.div>
        </motion.div>
      </section>

      {/* Store Gallery Section */}
      <div id="store-gallery">
        <StoreGallery />
      </div>

      {/* Why Bihar Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Madhubani Loves Us</h2>
            <div className="w-24 h-1 bg-mithila-orange mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Serving the heart of Mithila with modern retail and traditional values
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="text-center p-8 bg-gradient-to-b from-white to-mithila-cream rounded-3xl shadow-lg border border-mithila-orange/20 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-mithila-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-mithila-blue" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Local Community</h3>
              <p className="text-gray-600">
                Proudly serving Madhubani families with products that understand local tastes and preferences.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="text-center p-8 bg-gradient-to-b from-white to-mithila-cream rounded-3xl shadow-lg border border-mithila-orange/20 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-mithila-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-mithila-orange" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Strategic Location</h3>
              <p className="text-gray-600">
                Conveniently located in the heart of Madhubani for easy access and quick shopping.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="text-center p-8 bg-gradient-to-b from-white to-mithila-cream rounded-3xl shadow-lg border border-mithila-orange/20 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="text-green-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality Promise</h3>
              <p className="text-gray-600">
                Fresh products daily with quality checks ensuring the best for your family.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Explore Products CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="section-padding bg-gradient-to-r from-mithila-blue to-[#2a4a9d] text-white"
      >
        <div className="container-custom text-center">
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "20px 20px"
            }}
          />
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-6"
          >
            Explore Our Products
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="w-24 h-1 bg-mithila-orange rounded-full"></div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto"
          >
            From fresh vegetables to household essentials, discover our wide range of 
            quality products at competitive prices.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/products"
              className="inline-flex items-center bg-mithila-orange hover:bg-mithila-orange/90 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
              <span className="font-semibold">View Products</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </motion.div>
          
          <motion.div 
            className="mt-12 flex justify-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-white/10 p-4 rounded-xl backdrop-blur-sm"
                animate={{ 
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              >
                <ShoppingBag className="text-white" size={28} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Contact CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-mithila-blue to-[#2a4a9d] rounded-3xl p-12 text-white text-center relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-mithila-orange/10 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-mithila-orange/10 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-6 relative z-10"
            >
              Ready to Shop with Us?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto relative z-10"
            >
              Visit our store in Madhubani or contact us for more information about our products and services.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center space-x-3 text-blue-100 mb-4">
                <MapPin className="text-mithila-orange" size={24} />
                <p className="text-lg">
                  466, near chaiti durga mandir, ward no. 9, saurath road, jagatpur, p s - rahika, madhubani 847213
                </p>
              </div>
              <a 
                href="https://www.google.com/maps?q=26.3692855834961,86.0586700439453"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-mithila-orange transition-colors duration-300 inline-flex items-center space-x-2"
              >
                <span>View on Google Maps</span>
                <ArrowRight size={16} />
              </a>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.a
                href={`https://wa.me/+917070848333?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="mr-2 animate-pulse" size={20} />
                <span>WhatsApp Chat</span>
              </motion.a>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center bg-mithila-orange hover:bg-mithila-orange/90 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 group cursor-pointer"
                >
                  <Mail className="mr-2 animate-bounce" size={20} />
                  <span>Contact Form</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-mithila-dark text-white">
        <div className="container-custom text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center">
              <img 
                src="/LOGOS_page-0002.png" 
                alt="Mithila Bazaar Logo" 
                className="h-16 w-auto mr-3"
              />
              <div className="text-2xl font-bold">
                <span className="text-mithila-blue">MITHILA</span>
                <span className="text-orange-500"> BAZAAR</span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-400 mb-4">
            Madhubani, Bihar | Since 2023
          </p>
          
          <p className="text-gray-400">
            Your trusted local supermarket serving the Mithila community
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;