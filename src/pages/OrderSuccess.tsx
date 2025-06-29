
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, Calendar, CreditCard, ArrowRight } from 'lucide-react';

const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container-custom py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-8">We couldn't find your order details.</p>
          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-600" size={48} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
            <p className="text-xl text-gray-600">
              Thank you for shopping with Mithila Bazaar. Your order has been confirmed.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <Package className="text-mithila-blue mx-auto mb-2" size={32} />
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-bold text-gray-900">{order.id}</p>
              </div>
              <div className="text-center">
                <Calendar className="text-mithila-blue mx-auto mb-2" size={32} />
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-bold text-gray-900">
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-center">
                <CreditCard className="text-mithila-blue mx-auto mb-2" size={32} />
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-bold text-gray-900">
                  {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI Payment'}
                </p>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="border-t pt-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Name:</p>
                  <p className="font-medium text-gray-900">{order.customer.fullName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Phone:</p>
                  <p className="font-medium text-gray-900">{order.customer.phone}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email:</p>
                  <p className="font-medium text-gray-900">{order.customer.email}</p>
                </div>
                <div>
                  <p className="text-gray-600">Address:</p>
                  <p className="font-medium text-gray-900">{order.customer.address}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
              <div className="space-y-3">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex items-center space-x-3 py-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity} | {item.unit}</p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="border-t mt-6 pt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>₹{order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (10%):</span>
                    <span>₹{order.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery:</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                    <span>Total:</span>
                    <span>₹{order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Next?</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• You will receive a confirmation call within 2 hours</li>
              <li>• Your order will be prepared and packed fresh</li>
              <li>• Estimated delivery time: 2-4 hours</li>
              <li>• Our delivery executive will contact you before delivery</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight size={20} />
            </Link>
            <a
              href={`https://wa.me/+919876543210?text=Hi, I placed an order (${order.id}) and wanted to check the status.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent flex items-center justify-center space-x-2"
            >
              <span>Track Order on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
