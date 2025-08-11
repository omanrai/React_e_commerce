import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. Your order has been successfully placed and is being processed.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
          <div className="space-y-3 text-left">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium">#ORD-{Date.now().toString().slice(-8)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order Date:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Delivery:</span>
              <span className="font-medium">3-5 business days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium">Cash on Delivery</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            You will receive an email confirmation with your order details and tracking information.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Continue Shopping</span>
            </button>
            
            <button
              onClick={() => navigate('/cart')}
              className="flex items-center justify-center space-x-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>View Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 