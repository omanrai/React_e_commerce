import React from 'react'
import { Link } from 'react-router-dom'
import { User, Menu, LogOut } from 'lucide-react'
import { toast } from 'sonner'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../authSlice/auth'
import CartIcon from './CartIcon'

const Navbar = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    try {
      dispatch(logout());
      toast.success('Logged out successfully', {
        duration: 3000,
        position: 'top-right',
      });
    } catch (error) {
      toast.error('Failed to logout', {
        duration: 4000,
        position: 'top-right',
      });
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold text-gray-900">E-Store</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-red-500 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-red-500 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-red-500 transition-colors">
              Contact
            </Link>
          </div>

          {/* Right side icons and auth buttons */}
          <div className="flex items-center space-x-4">
            {/* Cart icon - visible on all screens */}
            <CartIcon />
            
            {/* Auth buttons - hidden on mobile */}
            <div className="hidden md:flex items-center space-x-2">
              {!isLoggedIn ? (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-700 hover:text-red-500 transition-colors px-3 py-2 text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user?.name || user?.email || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-red-500 transition-colors px-3 py-2 text-sm font-medium flex items-center space-x-1"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
            
            {/* User icon - visible on all screens */}
            {!isLoggedIn ? (
              <Link to="/login" className="p-2 text-gray-700 hover:text-red-500 transition-colors">
                <User className="h-5 w-5" />
              </Link>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-700 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            )}

            <button className="md:hidden p-2 text-gray-700 hover:text-red-500 transition-colors">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 