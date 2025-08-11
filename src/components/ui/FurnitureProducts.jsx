import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../authSlice/auth';
import { toast } from 'sonner';
import { ShoppingCart } from 'lucide-react';

const FurnitureProducts = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const furnitureProducts = [
    {
      id: 1,
      title: "DuoComfort Sofa Premium",
      description: "Premium comfort sofa with ergonomic design and high-quality fabric. Perfect for living rooms.",
      price: 20.00,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
      category: "Sofa"
    },
    {
      id: 2,
      title: "IronOne Desk",
      description: "Modern iron desk with clean lines and spacious surface. Ideal for home office or study.",
      price: 25.00,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      category: "Desk"
    },
    {
      id: 3,
      title: "Elegant Dining Table",
      description: "Beautiful wooden dining table with seating for 6. Perfect for family gatherings.",
      price: 35.00,
      image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=400&h=300&fit=crop",
      category: "Dining"
    },
    {
      id: 4,
      title: "Comfort King Bed",
      description: "Luxurious king-size bed with premium mattress and elegant headboard design.",
      price: 45.00,
      image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop",
      category: "Bedroom"
    },
    {
      id: 5,
      title: "Modern Coffee Table",
      description: "Contemporary coffee table with glass top and metal legs. Perfect for living room centerpiece.",
      price: 15.00,
      image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&h=300&fit=crop",
      category: "Coffee Table"
    },
    {
      id: 6,
      title: "Ergonomic Office Chair",
      description: "Professional office chair with adjustable height and lumbar support for maximum comfort.",
      price: 30.00,
      image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=300&fit=crop",
      category: "Office"
    }
  ];

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      toast.error('Please login to add items to cart');
      return;
    }

    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">FURNEST Collection</h1>
        <p className="text-lg text-gray-600">Discover our premium furniture collection</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {furnitureProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-green-600">${product.price}</span>
                  <span className="text-sm text-gray-500 ml-2">Free Shipping</span>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FurnitureProducts; 