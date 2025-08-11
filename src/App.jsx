import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/ui/Navbar'
import Footer from './components/ui/Footer'
import Home from './pages/home/home'
import About from './pages/home/About'
import Contact from './pages/home/Contact'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import Login from './pages/login/Login'
import SignUp from './pages/SignUp'
import ProtectedRoute from './components/common/ProtectedRoute'

function App() {
  console.log('App component rendering');

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/login" element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            } />
            <Route path="/signup" element={
              <ProtectedRoute>
                <SignUp />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
