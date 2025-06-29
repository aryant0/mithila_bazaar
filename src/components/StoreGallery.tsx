
import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, MapPin } from 'lucide-react';

const StoreGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const storeImages = [
    {
      src: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=800",
      alt: "Mithila Bazaar Main Entrance",
      location: "Madhubani Main Branch",
      loading: "lazy" as const
    },
    {
      src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800",
      alt: "Fresh Produce Section",
      location: "Fruits & Vegetables Aisle",
      loading: "lazy" as const
    },
    {
      src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800",
      alt: "Grocery Aisles",
      location: "Packaged Goods Section",
      loading: "lazy" as const
    },
    {
      src: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800",
      alt: "Dairy Products Section",
      location: "Dairy & Beverages",
      loading: "lazy" as const
    },
    {
      src: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800",
      alt: "Checkout Counter",
      location: "Billing Counter",
      loading: "lazy" as const
    },
    {
      src: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800",
      alt: "Store Interior",
      location: "Shopping Area",
      loading: "lazy" as const
    }
  ];

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

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Mithila Bazaar Store – <span className="text-mithila-blue">Glimpses from Madhubani</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take a virtual tour of our modern store serving the heart of Bihar
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {storeImages.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading={image.loading}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span className="font-medium">{image.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X size={32} />
              </button>
              <img
                src={storeImages[selectedImage].src}
                alt={storeImages[selectedImage].alt}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 rounded-b-lg">
                <div className="flex items-center space-x-2">
                  <MapPin size={16} />
                  <span>{storeImages[selectedImage].location}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default StoreGallery;
