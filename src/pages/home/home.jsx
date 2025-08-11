import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../authSlice/auth'
import { toast } from 'sonner'

const Home = () => {
  console.log('Home component rendering');
  const dispatch = useDispatch();
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      toast.error('Please login to add items to cart', {
        duration: 3000,
        position: 'top-right',
      });
      return;
    }

    if (!token) {
      toast.error('Authentication token not found. Please login again.', {
        duration: 3000,
        position: 'top-right',
      });
      return;
    }

    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`, {
      duration: 2000,
      position: 'top-right',
    });
    
    console.log('Product added to cart:', product.title)
  }

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-2">Error loading products</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-48 object-contain p-4"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.title}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-3">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-green-600">${product.price}</span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home 