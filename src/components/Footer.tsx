import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    scrollToTop();
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/LOGOS_page-0002.png" 
                alt="Mithila Bazaar Logo" 
                className="h-16 w-auto"
              />
              <div>
                <h3 className="text-xl font-bold">
                  <span className="text-mithila-blue">MITHILA</span>
                  <span className="text-mithila-orange"> BAZAAR</span>
                </h3>
                <p className="text-sm text-gray-400">आपका अपना मिथिला बाज़ार</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Bihar's trusted supermarket chain providing fresh groceries, quality products, 
              and exceptional service to communities across the region.
            </p>
            <p className="text-mithila-orange mb-6 font-medium">
              Currently serving Madhubani. Expanding soon to nearby districts in Bihar.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/mithilabazaar7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-mithila-orange transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/mithilabazaar7?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-mithila-orange transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.youtube.com/@mithilabazaar7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-mithila-orange transition-colors"
              >
                <Youtube size={20} />
              </a>
              <a 
                href="https://pin.it/7EVUVEvDk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-mithila-orange transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.372 0 12 0 17.084 2.847 21.515 6.932 23.246c-.096-.854-.18-2.165.037-3.1.196-.847 1.267-5.371 1.267-5.371s-.324-.648-.324-1.606c0-1.504.87-2.625 1.956-2.625.923 0 1.369.692 1.369 1.522 0 .928-.593 2.314-.898 3.597-.255 1.075.538 1.951 1.597 1.951 1.918 0 3.392-2.023 3.392-4.938 0-2.58-1.854-4.387-4.503-4.387-3.066 0-4.87 2.299-4.87 4.676 0 .926.357 1.923.802 2.462.088.107.101.2.074.309-.08.33-.258 1.05-.293 1.196-.047.188-.154.228-.355.137-1.279-.595-2.077-2.462-2.077-3.965 0-3.398 2.467-6.518 7.124-6.518 3.741 0 6.647 2.665 6.647 6.227 0 3.715-2.342 6.704-5.591 6.704-1.092 0-2.12-.568-2.468-1.247 0 0-.54 2.058-.672 2.56-.243.952-.9 2.141-1.339 2.87C9.644 23.761 10.8 24 12 24c6.627 0 12-5.373 12-12C24 5.372 18.627.001 12.001.001z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => handleNavigation('/')}
                  className="text-gray-300 hover:text-mithila-orange transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/about')}
                  className="text-gray-300 hover:text-mithila-orange transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/products')}
                  className="text-gray-300 hover:text-mithila-orange transition-colors"
                >
                  Products
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/cart')}
                  className="text-gray-300 hover:text-mithila-orange transition-colors"
                >
                  Cart
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/contact')}
                  className="text-gray-300 hover:text-mithila-orange transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-mithila-orange mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  466, near chaiti durga mandir, ward no. 9,<br />
                  saurath road, jagatpur, p s - rahika,<br />
                  madhubani 847213
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-mithila-orange flex-shrink-0" />
                <a 
                  href="tel:+917070848333"
                  className="text-gray-300 text-sm hover:text-mithila-orange transition-colors"
                >
                  +91 7070848333
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-mithila-orange flex-shrink-0" />
                <a 
                  href="mailto:mithilabazaar7@gmail.com"
                  className="text-gray-300 text-sm hover:text-mithila-orange transition-colors"
                >
                  mithilabazaar7@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Mithila Bazaar. All rights reserved. | Proudly serving Madhubani, Bihar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
