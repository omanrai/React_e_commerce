import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { placeOrder } from '../authSlice/auth';
import { ArrowLeft, ArrowRight, Check, Lock, Tag, Truck } from 'lucide-react';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, isLoggedIn } = useSelector((state) => state.auth);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    state: '',
    zipCode: '',
    address: '',
    shippingMethod: 'delivery'
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const shippingCost = shippingInfo.shippingMethod === 'delivery' ? 5.00 : 0;
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const total = subtotal + shippingCost - appliedDiscount;

  const handleShippingInfoChange = (field, value) => {
    setShippingInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const applyDiscount = () => {
    if (discountCode.toLowerCase() === 'welcome10') {
      setAppliedDiscount(10);
      toast.success('Discount code applied!');
    } else {
      toast.error('Invalid discount code');
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (cart.length === 0) {
        toast.error('Your cart is empty');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.phone) {
        toast.error('Please fill in all required fields');
        return;
      }
      setCurrentStep(3);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePayment = () => {
    if (!termsAccepted) {
      toast.error('Please accept the terms and conditions');
      return;
    }
    
    if (paymentMethod === 'cod') {
      // Cash on Delivery
      toast.loading('Placing your order...');
      setTimeout(() => {
        toast.dismiss();
        dispatch(placeOrder());
        toast.success('Order placed successfully! Pay on delivery.');
        navigate('/order-confirmation');
      }, 2000);
    } else if (paymentMethod === 'qr') {
      // QR Code Payment
      toast.loading('Generating QR code...');
      setTimeout(() => {
        toast.dismiss();
        // Here you would typically show a QR code modal
        toast.success('QR Code generated! Scan to complete payment.');
        setTimeout(() => {
          dispatch(placeOrder());
          toast.success('Payment successful! Order placed.');
          navigate('/order-confirmation');
        }, 1000);
      }, 2000);
    } else {
      // eSewa or Khalti
      const paymentProvider = paymentMethod === 'esewa' ? 'eSewa' : 'Khalti';
      toast.loading(`Redirecting to ${paymentProvider}...`);
      setTimeout(() => {
        toast.dismiss();
        // Here you would typically redirect to payment gateway
        toast.success(`${paymentProvider} payment successful! Order placed.`);
        dispatch(placeOrder());
        navigate('/order-confirmation');
      }, 2000);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Please Login</h1>
          <p className="text-gray-600">You need to be logged in to checkout.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          <div className={`flex items-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              currentStep >= 1 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300'
            }`}>
              {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <span className="ml-2 font-medium">Cart</span>
          </div>
          <div className={`w-16 h-0.5 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div className={`flex items-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              currentStep >= 2 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300'
            }`}>
              {currentStep > 2 ? <Check className="w-4 h-4" /> : '2'}
            </div>
            <span className="ml-2 font-medium">Review</span>
          </div>
          <div className={`w-16 h-0.5 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div className={`flex items-center ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              currentStep >= 3 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300'
            }`}>
              3
            </div>
            <span className="ml-2 font-medium">Checkout</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Shipping Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Shipping Information</h2>
          
          {/* Shipping Method */}
          <div>
            <label className="block text-sm font-medium mb-3">Shipping Method</label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="shippingMethod"
                  value="delivery"
                  checked={shippingInfo.shippingMethod === 'delivery'}
                  onChange={(e) => handleShippingInfoChange('shippingMethod', e.target.value)}
                  className="text-blue-600"
                />
                <Truck className="w-5 h-5 text-gray-500" />
                <span>Delivery</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="shippingMethod"
                  value="pickup"
                  checked={shippingInfo.shippingMethod === 'pickup'}
                  onChange={(e) => handleShippingInfoChange('shippingMethod', e.target.value)}
                  className="text-blue-600"
                />
                <span>Pick up</span>
              </label>
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full name *</label>
              <input
                type="text"
                value={shippingInfo.fullName}
                onChange={(e) => handleShippingInfoChange('fullName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email address *</label>
              <input
                type="email"
                value={shippingInfo.email}
                onChange={(e) => handleShippingInfoChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone number *</label>
            <div className="flex">
              <div className="flex items-center px-3 py-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">
                <span className="text-sm">🇳🇵</span>
                <select className="ml-2 bg-transparent focus:outline-none">
                  <option>+977</option>
                </select>
              </div>
              <input
                type="tel"
                value={shippingInfo.phone}
                onChange={(e) => handleShippingInfoChange('phone', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">City *</label>
            <select
              value={shippingInfo.country}
              onChange={(e) => handleShippingInfoChange('country', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose city</option>
              <option value="Kathmandu">Kathmandu</option>
              <option value="Itahari">Itahari</option>
              <option value="Jhapa">Jhapa</option>
              <option value="Dharan">Dharan</option>
              <option value="Pokhara">Pokhara</option>
              <option value="Biratnagar">Biratnagar</option>
              <option value="Lalitpur">Lalitpur</option>
              <option value="Bhaktapur">Bhaktapur</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <input
                type="text"
                value={shippingInfo.city}
                onChange={(e) => handleShippingInfoChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter city"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">State</label>
              <input
                type="text"
                value={shippingInfo.state}
                onChange={(e) => handleShippingInfoChange('state', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter state"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">ZIP Code</label>
              <input
                type="text"
                value={shippingInfo.zipCode}
                onChange={(e) => handleShippingInfoChange('zipCode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter ZIP code"
              />
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Method</h3>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-blue-600"
                />
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">₹</span>
                  </div>
                  <div>
                    <span className="font-medium">Cash on Delivery</span>
                    <p className="text-sm text-gray-600">Pay when you receive your order</p>
                  </div>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="esewa"
                  checked={paymentMethod === 'esewa'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-blue-600"
                />
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-sm">E</span>
                  </div>
                  <div>
                    <span className="font-medium">eSewa</span>
                    <p className="text-sm text-gray-600">Digital wallet payment</p>
                  </div>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="khalti"
                  checked={paymentMethod === 'khalti'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-blue-600"
                />
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-sm">K</span>
                  </div>
                  <div>
                    <span className="font-medium">Khalti</span>
                    <p className="text-sm text-gray-600">Digital payment solution</p>
                  </div>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="qr"
                  checked={paymentMethod === 'qr'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-blue-600"
                />
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">QR</span>
                  </div>
                  <div>
                    <span className="font-medium">QR Code Payment</span>
                    <p className="text-sm text-gray-600">Scan QR code to pay</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 text-blue-600"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I have read and agree to the Terms and Conditions.
            </label>
          </div>
        </div>

        {/* Right Section - Review Cart */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Review your cart</h2>
          
          {/* Cart Items */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.quantity}x</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Discount Code */}
          <div>
            <label className="block text-sm font-medium mb-2">Discount Code</label>
            <div className="flex">
              <div className="flex-1 relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Discount code"
                />
              </div>
              <button
                onClick={applyDiscount}
                className="px-4 py-2 bg-gray-800 text-white rounded-r-md hover:bg-gray-700 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-3">
            <h3 className="font-semibold text-lg">Order Summary</h3>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            {appliedDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${appliedDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Pay Now Button */}
          <button
            onClick={currentStep === 3 ? handlePayment : handleNextStep}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            {currentStep === 3 ? (
              <>
                <Lock className="w-5 h-5" />
                <span>
                  {paymentMethod === 'cod' ? 'Place Order (Cash on Delivery)' :
                   paymentMethod === 'esewa' ? 'Pay with eSewa' :
                   paymentMethod === 'khalti' ? 'Pay with Khalti' :
                   paymentMethod === 'qr' ? 'Show QR Code' : 'Pay Now'}
                </span>
              </>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Security Info */}
          <div className="text-center text-sm text-gray-600">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Lock className="w-4 h-4" />
              <span>Secure Checkout - SSL Encrypted</span>
            </div>
            <p>Ensuring your financial and personal details are secure during every transaction.</p>
          </div>

          {/* Navigation */}
          {currentStep > 1 && (
            <button
              onClick={handlePreviousStep}
              className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to previous step</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout; 