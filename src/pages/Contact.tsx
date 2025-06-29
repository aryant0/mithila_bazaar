import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent Successfully! 📧",
      description: "Thanks! Our team will reach out within 24 hours. You'll receive a confirmation email shortly.",
      duration: 5000,
    });
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => {
      toast({
        title: "Confirmation Email Sent ✉️",
        description: `A confirmation has been sent to ${formData.email}`,
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <MapPin className="text-mithila-blue" size={24} />,
      title: "Address",
      details: [
        "466, near chaiti durga mandir, ward no. 9, saurath road, jagatpur, p s - rahika, madhubani 847213",
        <a 
          key="map"
          href="https://www.google.com/maps?q=26.3692855834961,86.0586700439453"
          target="_blank"
          rel="noopener noreferrer"
          className="text-mithila-blue hover:text-mithila-orange transition-colors duration-300 flex items-center justify-center space-x-2 mt-2"
        >
          <span>View on Google Maps</span>
          <ArrowRight size={16} />
        </a>
      ]
    },
    {
      icon: <Phone className="text-mithila-orange" size={24} />,
      title: "Phone",
      details: ["+91 7070848333", "WhatsApp Available"]
    },
    {
      icon: <Mail className="text-green-600" size={24} />,
      title: "Email",
      details: ["mithilabazaar7@gmail.com", "support@mithilabazaar.com"]
    },
    {
      icon: <Clock className="text-purple-600" size={24} />,
      title: "Business Hours",
      details: ["Mon - Sun: 8:00 AM - 10:00 PM", "All 365 days"]
    }
  ];

  const whatsappMessage = encodeURIComponent("Hi! I'm interested in Mithila Bazaar. I have some questions about your products and services.");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-mithila-cream via-white to-blue-50 section-padding">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            <span className="text-gradient">Contact Us</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We're here to help! Reach out to us for any questions, feedback, or support. 
            Our team is always ready to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/+917070848333?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <Phone size={20} />
              <span>WhatsApp Now</span>
            </a>
            <a
              href="mailto:mithilabazaar7@gmail.com"
              className="btn-accent flex items-center justify-center space-x-2"
            >
              <Mail size={20} />
              <span>Send Email</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl card-hover">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mithila-blue focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mithila-blue focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mithila-blue focus:border-transparent"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <Send size={20} />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Map Section */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Find Us</h2>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[500px] relative group">
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
              </div>

              {/* Quick Contact Options */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={`https://wa.me/+917070848333?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white p-4 rounded-lg text-center hover:bg-green-700 transition-colors transform hover:scale-105"
                >
                  <Phone className="mx-auto mb-2" size={24} />
                  <p className="font-medium">WhatsApp</p>
                  <p className="text-sm">+91 7070848333</p>
                </a>
                <a
                  href="mailto:mithilabazaar7@gmail.com"
                  className="bg-mithila-orange text-white p-4 rounded-lg text-center hover:bg-mithila-orange/90 transition-colors transform hover:scale-105"
                >
                  <Mail className="mx-auto mb-2" size={24} />
                  <p className="font-medium">Email</p>
                  <p className="text-sm">mithilabazaar7@gmail.com</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
