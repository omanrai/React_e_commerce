import React from 'react'

const About = () => {
  const stats = [
    { number: "10.5k", label: "Sellers active on our site" },
    { number: "33k", label: "Monthly Product Sale" },
    { number: "45.5k", label: "Customer active in our site" },
    { number: "25k", label: "Annual gross sale in our site" }
  ]

  const team = [
    { name: "Tom Cruise", role: "Founder & Chairman", image: "👨‍💼" },
    { name: "Emma Watson", role: "Managing Director", image: "👩‍💼" },
    { name: "Will Smith", role: "Product Designer", image: "👨‍🎨" }
  ]

  const services = [
    {
      icon: "🚚",
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140"
    },
    {
      icon: "🎧",
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support"
    },
    {
      icon: "✅",
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      {/* Our Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <div>
          <div className="flex items-center mb-8">
            <div className="w-5 h-10 bg-red-500 rounded mr-4"></div>
            <span className="text-red-500 font-semibold">Our Story</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-6">Our Story</h1>
          
          <div className="space-y-4 text-gray-600">
            <p>
              Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 millions customers across the region.
            </p>
            <p>
              Exclusive has more than 1 Million products to offer, growing at a very fast pace. Exclusive offers a diverse assortment in categories ranging from consumer electronics to household goods, toys, fashion, sports equipment and more.
            </p>
          </div>
        </div>
        
        <div className="flex justify-center items-center">
          <div className="w-full h-96 bg-gradient-to-r from-pink-400 to-red-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-6xl">🛍️</span>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {stats.map((stat, index) => (
          <div key={index} className="border-2 border-gray-200 rounded-lg p-8 text-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏪</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">{stat.number}</h3>
            <p className="text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">{member.image}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-gray-600 mb-4">{member.role}</p>
              <div className="flex justify-center space-x-3">
                <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-500 hover:text-white">📧</span>
                <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-500 hover:text-white">🐦</span>
                <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-500 hover:text-white">💼</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">{service.icon}</span>
            </div>
            <h3 className="font-bold mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default About
