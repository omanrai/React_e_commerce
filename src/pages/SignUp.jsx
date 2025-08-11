import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const SignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      // Simulate sign up - in real app, you'd make an API call
      toast.success('Account created successfully!', {
        duration: 3000,
        position: 'top-right',
      })
      setFormData({ name: '', email: '', password: '' })
      navigate('/login')
    } catch (error) {
      toast.error('Sign up failed. Please try again.', {
        duration: 4000,
        position: 'top-right',
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your details below
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-3 border-b border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-red-500 focus:z-10"
                placeholder="Name"
              />
            </div>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
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

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Create Account
            </button>
          </div>

          <div>
            <button
              type="button"
              className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <span className="mr-2">🔍</span>
              Sign up with Google
            </button>
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Already have account?{' '}
              <Link to="/login" className="font-medium text-red-600 hover:text-red-500">
                Log in
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
