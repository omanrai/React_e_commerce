import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../authSlice/auth'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [loginStatus, setLoginStatus] = useState(null) // 'success', 'error', or null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginStatus(null)

    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        // Add token to the data for Redux
        const loginData = {
          ...data,
          token: data.token || 'fake-token-' + Date.now() // Fake Store API doesn't return token, so we create one
        };
        // Dispatch login success to Redux
        dispatch(loginSuccess(loginData))
        setLoginStatus('success')
        toast.success('Login successful!', {
          duration: 3000,
          position: 'top-right',
        })
        setFormData({ username: '', password: '' })
        setTimeout(() => navigate('/'), 1000)
      } else {
        setLoginStatus('error')
        toast.error('Invalid credentials', {
          duration: 4000,
          position: 'top-right',
        })
      }
    } catch (error) {
      setLoginStatus('error')
      toast.error('Login failed. Please try again.', {
        duration: 4000,
        position: 'top-right',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log in to Exclusive
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your details below
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-3 border-b border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-red-500 focus:z-10"
                placeholder="Email or Phone Number"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-3 border-b border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-red-500 focus:z-10"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative flex justify-center py-3 px-8 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : loginStatus === 'success'
                  ? 'bg-green-600 hover:bg-green-700'
                  : loginStatus === 'error'
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Logging in...
                </>
              ) : loginStatus === 'success' ? (
                'Success! Redirecting...'
              ) : (
                'Log In'
              )}
            </button>
            <div className="text-sm">
              <a href="#" className="font-medium text-red-600 hover:text-red-500">
                Forget Password?
              </a>
            </div>
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-red-600 hover:text-red-500">
                Sign up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
