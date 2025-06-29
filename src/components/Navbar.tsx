import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { state } = useCart();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Cart', href: '/cart' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img 
              src="/LOGOS_page-0002.png" 
              alt="Mithila Bazaar Logo" 
              className="h-20 w-auto mr-2"
            />
            <h1 className="text-2xl font-bold">
              <span className="text-mithila-blue">Mithila</span>
              <span className="text-mithila-orange"> Bazaar</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 relative ${
                    isActive(item.href)
                      ? 'text-white bg-mithila-blue shadow-lg shadow-mithila-orange/30'
                      : 'text-mithila-blue hover:text-white hover:bg-mithila-blue hover:shadow-lg hover:shadow-mithila-orange/30'
                  }`}
                >
                  {item.name}
                  {item.name === 'Cart' && state.totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-mithila-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                      {state.totalItems}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Cart Icon for Desktop */}
          <div className="hidden md:flex items-center">
            <Link
              to="/cart"
              className="relative p-2 text-mithila-blue hover:text-white hover:bg-mithila-blue rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-mithila-orange/30"
            >
              <ShoppingCart size={24} />
              {state.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-mithila-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                  {state.totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 text-mithila-blue hover:text-white hover:bg-mithila-blue rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-mithila-orange/30"
            >
              <ShoppingCart size={24} />
              {state.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-mithila-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                  {state.totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-mithila-blue hover:text-white hover:bg-mithila-blue hover:shadow-lg hover:shadow-mithila-orange/30 transition-all duration-300 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-4 pb-4 space-y-3 sm:px-4 bg-white border-t">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-white bg-mithila-blue shadow-lg shadow-mithila-orange/30'
                    : 'text-mithila-blue hover:text-white hover:bg-mithila-blue hover:shadow-lg hover:shadow-mithila-orange/30'
                }`}
              >
                {item.name}
                {item.name === 'Cart' && state.totalItems > 0 && (
                  <span className="ml-2 bg-mithila-orange text-white text-xs rounded-full px-2 py-1 shadow-md">
                    {state.totalItems}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
