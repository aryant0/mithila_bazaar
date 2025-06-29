
import { useState } from 'react';
import { Store, Users, TrendingUp, Award, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Franchise = () => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    phone: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest. We'll contact you soon.",
    });
    setFormData({ name: '', city: '', phone: '', message: '' });
  };

  const benefits = [
    {
      icon: <Store className="text-mithila-blue" size={32} />,
      title: "Complete Store Setup",
      description: "End-to-end support for store design, setup, and launch"
    },
    {
      icon: <Users className="text-mithila-orange" size={32} />,
      title: "Training & Support",
      description: "Comprehensive training for you and your staff"
    },
    {
      icon: <TrendingUp className="text-green-600" size={32} />,
      title: "Marketing Support",
      description: "Regional and local marketing campaigns to drive customers"
    },
    {
      icon: <Award className="text-purple-600" size={32} />,
      title: "Proven Business Model",
      description: "Tested strategies with track record of success"
    }
  ];

  const requirements = [
    "Minimum 1000-2000 sq ft space",
    "Initial investment of ₹15-25 lakhs",
    "Local market knowledge and connections",
    "Commitment to quality and service standards",
    "Legal compliance and documentation"
  ];

  const whatsappMessage = encodeURIComponent("Hi! I'm interested in Mithila Bazaar franchise opportunities. Please share more details about investment, requirements, and support.");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-mithila-cream via-white to-blue-50 section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                <span className="text-gradient">Partner With Us</span><br />
                Franchise Opportunities
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join the Mithila Bazaar family and be part of Bihar's retail revolution. 
                Build a successful business while serving your community with our proven 
                franchise model.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`https://wa.me/+919876543210?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center justify-center space-x-2"
                >
                  <Phone size={20} />
                  <span>Discuss Opportunity</span>
                </a>
                <a
                  href="#franchise-form"
                  className="btn-accent flex items-center justify-center space-x-2"
                >
                  <Mail size={20} />
                  <span>Apply Now</span>
                </a>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000"
                alt="Franchise Partnership"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Partner With Mithila Bazaar?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our franchise model is designed for success, offering comprehensive support 
              and proven strategies for sustainable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl card-hover">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment & Requirements */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Investment Details</h2>
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b pb-4">
                    <span className="font-medium text-gray-700">Franchise Fee</span>
                    <span className="text-xl font-bold text-mithila-blue">₹5 Lakhs</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-4">
                    <span className="font-medium text-gray-700">Store Setup</span>
                    <span className="text-xl font-bold text-mithila-blue">₹10-15 Lakhs</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-4">
                    <span className="font-medium text-gray-700">Initial Inventory</span>
                    <span className="text-xl font-bold text-mithila-blue">₹5-8 Lakhs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Total Investment</span>
                    <span className="text-2xl font-bold text-mithila-orange">₹20-28 Lakhs</span>
                  </div>
                </div>
                <div className="mt-8 p-4 bg-green-50 rounded-lg">
                  <p className="text-green-800 font-medium">
                    💡 ROI typically achieved within 18-24 months
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Requirements</h2>
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <ul className="space-y-4">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 p-4 bg-mithila-blue/5 rounded-lg">
                  <p className="text-mithila-blue font-medium">
                    📍 Currently expanding in: Patna, Muzaffarpur, Darbhanga, Bhagalpur, and Gaya
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support & Training */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Support System</h2>
            <p className="text-xl text-gray-600">
              We're with you every step of the way, from setup to success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-mithila-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-mithila-blue">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Pre-Launch Phase</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Site selection assistance</li>
                <li>• Store design and layout</li>
                <li>• Equipment procurement</li>
                <li>• Initial inventory planning</li>
              </ul>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-mithila-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-mithila-orange">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Training & Launch</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 2-week training program</li>
                <li>• Staff training support</li>
                <li>• Grand opening marketing</li>
                <li>• Operations manual</li>
              </ul>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ongoing Support</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Regular business reviews</li>
                <li>• Marketing campaigns</li>
                <li>• Supply chain support</li>
                <li>• Performance optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="franchise-form" className="section-padding bg-mithila-cream">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Apply for Franchise</h2>
              <p className="text-xl text-gray-600">
                Take the first step towards building your own successful retail business
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mithila-blue focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mithila-blue focus:border-transparent"
                    placeholder="Enter preferred city"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mithila-blue focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mithila-blue focus:border-transparent"
                    placeholder="Tell us about your experience, investment capacity, or any questions"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary text-lg py-4"
                >
                  Submit Application
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Prefer to discuss directly?</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href={`https://wa.me/+919876543210?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      <Phone className="mr-2" size={20} />
                      WhatsApp: +91 98765 43210
                    </a>
                    <a
                      href="mailto:franchise@mithilabazaar.com"
                      className="inline-flex items-center justify-center bg-mithila-orange text-white px-6 py-3 rounded-lg font-medium hover:bg-mithila-orange/90 transition-colors"
                    >
                      <Mail className="mr-2" size={20} />
                      franchise@mithilabazaar.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Franchise;
