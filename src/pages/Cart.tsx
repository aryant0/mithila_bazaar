
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, ShoppingBag, X, Send } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { sendOrderEmail, OrderData } from '@/services/emailService';

const Cart = () => {
  const { state, updateQuantity, removeItem, clearCart } = useCart();
  const { toast } = useToast();
  
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderForm, setOrderForm] = useState({
    fullName: '',
    phoneNumber: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!orderForm.fullName.trim()) {
      toast({
        title: "Validation Error",
        description: "Full Name is required.",
        variant: "destructive"
      });
      return false;
    }
    
    if (!orderForm.phoneNumber.trim()) {
      toast({
        title: "Validation Error",
        description: "Phone Number is required.",
        variant: "destructive"
      });
      return false;
    }
    
    if (!/^\d{10}$/.test(orderForm.phoneNumber)) {
      toast({
        title: "Validation Error",
        description: "Phone Number must be exactly 10 digits.",
        variant: "destructive"
      });
      return false;
    }
    
    if (!orderForm.address.trim()) {
      toast({
        title: "Validation Error",
        description: "Address is required.",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const orderData: OrderData = {
        fullName: orderForm.fullName,
        phoneNumber: orderForm.phoneNumber,
        address: orderForm.address,
        items: state.items,
        totalItems: state.totalItems,
        subtotal: state.subtotal,
        tax: state.tax,
        total: state.total,
        orderDate: new Date().toISOString()
      };

      await sendOrderEmail(orderData);
      
      // Clear cart after successful order
      clearCart();
      
      // Close modal and show success message
      setShowOrderModal(false);
      setOrderForm({ fullName: '', phoneNumber: '', address: '' });
      
      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been submitted. We'll contact you soon to confirm.",
      });
      
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Order Failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container-custom py-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="mx-auto mb-6 text-gray-400" size={80} />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet. 
              Start shopping to fill it up!
            </p>
            <Link
              to="/products"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <ShoppingCart size={20} />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center space-x-3">
            <ShoppingCart size={36} />
            <span>Shopping Cart</span>
          </h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium flex items-center space-x-2"
          >
            <Trash2 size={20} />
            <span>Clear Cart</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-gray-600">{item.unit}</p>
                    <p className="text-xl font-bold text-mithila-blue">₹{item.price}</p>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-semibold text-lg">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-mithila-blue text-white flex items-center justify-center hover:bg-mithila-blue/90 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700 text-sm flex items-center space-x-1 mt-1"
                    >
                      <Trash2 size={14} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
                <div className="space-y-2">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x {item.quantity}</span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹{state.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax (10%)</span>
                      <span>₹{state.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg mt-2">
                      <span>Total ({state.totalItems} items)</span>
                      <span>₹{state.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={() => setShowOrderModal(true)}
                className="w-full bg-mithila-orange text-white py-3 px-6 rounded-lg font-semibold hover:bg-mithila-orange/90 transition-colors flex items-center justify-center space-x-2 mb-4"
              >
                <Send size={20} />
                <span>Place Order</span>
              </button>

              <Link
                to="/products"
                className="w-full btn-accent flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>Continue Shopping</span>
              </Link>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-green-800 text-sm font-medium">
                  🚚 Free delivery on orders above ₹500
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Place Your Order</h2>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={orderForm.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mithila-blue focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={orderForm.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mithila-blue focus:border-transparent"
                    placeholder="Enter 10-digit phone number"
                    pattern="[0-9]{10}"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={orderForm.address}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mithila-blue focus:border-transparent resize-none"
                    placeholder="Enter your complete delivery address"
                    required
                  />
                </div>

                {/* Order Summary in Modal */}
                <div className="bg-gray-50 rounded-lg p-4 mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.name} x {item.quantity}</span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total ({state.totalItems} items)</span>
                        <span>₹{state.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowOrderModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-mithila-orange text-white py-2 px-4 rounded-lg font-semibold hover:bg-mithila-orange/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Placing Order...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Submit Order</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
