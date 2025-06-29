import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, MapPin, Users, Truck, ShoppingBag, Star, ChevronDown, ArrowRight } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Animation variants
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
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-mithila-cream to-white">
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
      <section className="bg-gradient-to-br from-mithila-blue/5 to-mithila-orange/5 section-padding pt-32">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.h1 
              className="text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              About <span className="text-gradient bg-gradient-to-r from-mithila-blue to-mithila-orange bg-clip-text text-transparent">Mithila Bazaar</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Bringing modern retail excellence to Bihar with deep-rooted cultural values 
              and commitment to community development.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <img
                  src="/StoreIMG2.jpg"
                  alt="Mithila Bazaar Store"
                  className="rounded-2xl shadow-2xl w-full h-[500px] object-cover border-4 border-white"
                />
                <motion.div 
                  className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg border-2 border-mithila-orange/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-mithila-blue/10 rounded-full flex items-center justify-center">
                      <ShoppingBag className="text-mithila-blue" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">2000+</p>
                      <p className="text-sm text-gray-600">Products Available</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <motion.p 
                className="text-gray-600 mb-6 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Founded with a vision to revolutionize retail in Bihar, Mithila Bazaar represents 
                the perfect fusion of traditional values and modern convenience. We understand 
                the unique needs of Bihar's diverse communities and strive to serve them with 
                dedication and authenticity.
              </motion.p>
              <motion.p 
                className="text-gray-600 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                From humble beginnings in Patna, we've grown to become a trusted name across 
                Bihar, always maintaining our commitment to quality, affordability, and 
                community engagement. Our stores are more than just retail outlets – they're 
                community hubs where neighbors meet and families shop with confidence.
              </motion.p>

              <motion.div 
                className="mt-8 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
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
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {["Madhubani"].map((city, i) => (
                  <motion.span
                    key={i}
                    className="px-4 py-2 bg-mithila-blue/10 text-mithila-blue rounded-full font-medium"
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "#1e3a8a",
                      color: "white"
                    }}
                  >
                    {city}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Principles</h2>
            <div className="w-24 h-1 bg-mithila-orange mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The foundation of everything we do at Mithila Bazaar
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
                <Target className="text-mithila-blue" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide Bihar's families with access to fresh, quality products at 
                fair prices while supporting local communities and creating employment 
                opportunities across the region.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="text-center p-8 bg-gradient-to-b from-white to-mithila-cream rounded-3xl shadow-lg border border-mithila-orange/20 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-mithila-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="text-mithila-orange" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become Bihar's most loved and trusted supermarket chain, setting 
                new standards in retail excellence while preserving our cultural 
                heritage and community values.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="text-center p-8 bg-gradient-to-b from-white to-mithila-cream rounded-3xl shadow-lg border border-mithila-orange/20 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-green-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Values</h3>
              <p className="text-gray-600 leading-relaxed">
                Trust, Quality, Community, and Respect form the foundation of everything 
                we do. We believe in honest business practices and treating every 
                customer like family.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Store Plan & Philosophy */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Store Philosophy</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Each Mithila Bazaar store is designed with the local community in mind. We 
                understand that shopping habits vary across different regions of Bihar, and 
                our stores reflect this understanding through thoughtful layout and product 
                selection.
              </p>
              <div className="space-y-4">
                {[
                  "Wide aisles for comfortable family shopping",
                  "Fresh produce sections with local varieties",
                  "Dedicated sections for traditional and modern products",
                  "Community space for local events and gatherings"
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className="w-6 h-6 bg-mithila-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-gray-600">{item}</p>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <a
                  href="#"
                  className="inline-flex items-center text-mithila-orange font-medium group"
                >
                  <span>View store layouts</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </a>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="/LOGOS_page-0003.png"
                  alt="Store Interior"
                  className="rounded-2xl shadow-2xl w-full h-[500px] object-cover border-4 border-white"
                />
                <motion.div 
                  className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border-2 border-mithila-blue/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-mithila-orange/10 rounded-full flex items-center justify-center">
                      <Star className="text-mithila-orange" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">4.9/5 Rating</p>
                      <p className="text-sm text-gray-600">Customer Experience</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="section-padding bg-gradient-to-r from-mithila-blue to-[#2a4a9d] text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Impact in Bihar</h2>
            <div className="w-24 h-1 bg-mithila-orange mx-auto mb-6 rounded-full"></div>
            <p className="text-xl max-w-3xl mx-auto">
              We're proud to contribute to Bihar's economic growth and community development
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
              className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">100+</h3>
              <p className="font-medium">Local Jobs Created</p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">200+</h3>
              <p className="font-medium">Local Suppliers</p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">100+</h3>
              <p className="font-medium">Happy Families Served</p>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="#"
              className="inline-flex items-center bg-mithila-orange hover:bg-mithila-orange/90 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
              <span className="font-semibold">Join Our Team</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Location Map */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Us in Bihar</h2>
            <div className="w-24 h-1 bg-mithila-orange mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-gray-600">
              Currently serving major cities across Bihar with plans for expansion
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-lg overflow-hidden h-[500px] relative group"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-mithila-blue/10 to-mithila-orange/10 flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="text-mithila-blue mx-auto mb-4" size={64} />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Mithila Bazaar</h3>
                <p className="text-gray-600 mb-4">
                  466, near chaiti durga mandir, ward no. 9,<br />
                  saurath road, jagatpur, p s - rahika,<br />
                  madhubani 847213
                </p>
                <a 
                  href="https://www.google.com/maps?q=26.3692855834961,86.0586700439453"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-mithila-blue hover:text-mithila-orange transition-colors duration-300"
                >
                  <span>View on Google Maps</span>
                  <ArrowRight className="ml-2" size={16} />
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-wrap justify-center gap-4">
              {["Madhubani"].map((city, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 bg-mithila-blue/10 text-mithila-blue rounded-full font-medium"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "#1e3a8a",
                    color: "white"
                  }}
                >
                  {city}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-mithila-dark text-white">
        <div className="container-custom text-center">
          <div className="flex justify-center mb-6">
            <div className="text-2xl font-bold">
              <span className="text-mithila-blue">MITHILA</span>
              <span className="text-orange-500"> BAZAAR</span>
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

export default About;