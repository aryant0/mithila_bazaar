import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CartProvider } from "./contexts/CartContext";
import Preloader from "./components/Preloader";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Contact from "./pages/Contact";
import ProtectedAdmin from "./components/ProtectedAdmin";
import NotFound from "./pages/NotFound";
import { ProductProvider } from '@/contexts/ProductContext';
import { CategoryProvider } from "@/contexts/CategoryContext";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize AOS with better settings
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      disable: 'mobile', // Disable on mobile to prevent issues
      startEvent: 'DOMContentLoaded',
    });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    // Increment visitor count on app load
    // Remove: incrementVisitorCount();

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <CategoryProvider>
      <ProductProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <CartProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/order-success" element={<OrderSuccess />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                  <FloatingWhatsApp />
                </div>
              </BrowserRouter>
            </CartProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </ProductProvider>
    </CategoryProvider>
  );
};

export default App;
