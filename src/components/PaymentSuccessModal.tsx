
import { useState, useEffect } from 'react';
import { CheckCircle, X, Star } from 'lucide-react';

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentId?: string;
}

const PaymentSuccessModal = ({ isOpen, onClose, paymentId }: PaymentSuccessModalProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 animate-scale-in relative overflow-hidden">
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-mithila-orange rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={40} />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Token Booked Successfully! 🎉
          </h2>

          <p className="text-gray-600 mb-6">
            Thank you for booking your early token with Mithila Bazaar! 
            Our team will contact you within 24 hours.
          </p>

          {paymentId && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">Payment ID:</p>
              <p className="font-mono text-sm text-mithila-blue">{paymentId}</p>
            </div>
          )}

          <div className="bg-gradient-to-r from-mithila-blue to-blue-700 text-white rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Star className="text-yellow-400" size={20} />
              <span className="font-bold">What's Next?</span>
              <Star className="text-yellow-400" size={20} />
            </div>
            <ul className="text-sm space-y-1">
              <li>✓ Priority access to store openings</li>
              <li>✓ Exclusive launch offers</li>
              <li>✓ First to know about new locations</li>
            </ul>
          </div>

          <button
            onClick={onClose}
            className="w-full btn-primary"
          >
            Continue Exploring
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
