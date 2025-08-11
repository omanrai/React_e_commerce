import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission here
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <div className="flex items-center mb-8">
            <div className="w-5 h-10 bg-red-500 rounded mr-4"></div>
            <span className="text-red-500 font-semibold">Contact</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-8">Get In Touch With Us</h1>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white">
                📞
              </div>
              <div>
                <h3 className="font-semibold mb-2">Call To Us</h3>
                <p className="text-gray-600 mb-1">We are available 24/7, 7 days a week.</p>
                <p className="font-semibold">Phone: +8801611112222</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white">
                ✉️
              </div>
              <div>
                <h3 className="font-semibold mb-2">Write To Us</h3>
                <p className="text-gray-600 mb-1">Fill out our form and we will contact you within 24 hours.</p>
                <p className="font-semibold">Emails: customer@exclusive.com</p>
                <p className="font-semibold">Emails: support@exclusive.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone *"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
            
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
            ></textarea>
            
            <div className="text-right">
              <button
                type="submit"
                className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
