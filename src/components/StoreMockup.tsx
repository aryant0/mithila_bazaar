
import { MapPin, Users, ShoppingCart } from 'lucide-react';

const StoreMockup = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-mithila-cream to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Visualize Your Future <span className="text-gradient">Mithila Bazaar</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Modern retail spaces designed for Bihar's growing communities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Store Mockup Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-orange-50 rounded-2xl p-8 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000"
                alt="Modern Supermarket Interior"
                className="rounded-xl w-full h-80 object-cover shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Coming Soon</span>
                </div>
              </div>
            </div>
          </div>

          {/* Store Features */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-mithila-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <ShoppingCart className="text-mithila-blue" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Modern Shopping Experience</h3>
                <p className="text-gray-600">
                  Wide aisles, organized sections, and easy navigation for families
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-mithila-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="text-mithila-orange" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Community Focused</h3>
                <p className="text-gray-600">
                  Designed for local preferences with Bihar's favorite brands and products
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Strategic Locations</h3>
                <p className="text-gray-600">
                  Prime spots in growing neighborhoods across Bihar
                </p>
              </div>
            </div>

            <div className="pt-4">
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-mithila-blue">
                <h4 className="font-bold text-gray-900 mb-2">Store Size: 3,000-5,000 sq ft</h4>
                <p className="text-gray-600 text-sm">
                  Optimized for Indian shopping patterns with dedicated sections for 
                  fresh produce, dairy, groceries, and household essentials
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreMockup;
