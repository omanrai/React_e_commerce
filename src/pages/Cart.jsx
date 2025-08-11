import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeFromCart, updateCartQuantity, clearCart } from '../authSlice/auth'
import { toast } from 'sonner'
import { Trash2, Plus, Minus } from 'lucide-react'

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, isLoggedIn } = useSelector((state) => state.auth);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    toast.success('Item removed from cart');
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    dispatch(updateCartQuantity({ productId, quantity: newQuantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Cart cleared');
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Please Login</h1>
          <p className="text-gray-600">You need to be logged in to view your cart.</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Shopping Cart</h1>
        <div className="text-center">
          <p className="text-gray-600">Your cart is empty</p>
          <p className="text-sm text-gray-500 mt-2">Add some products from the home page!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <button
          onClick={handleClearCart}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Clear Cart
        </button>
      </div>
      
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-20 h-20 object-contain"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600">${item.price}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="text-right">
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="text-red-500 hover:text-red-700 mt-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Total: ${calculateTotal().toFixed(2)}</h2>
          <button 
            onClick={handleProceedToCheckout}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart 