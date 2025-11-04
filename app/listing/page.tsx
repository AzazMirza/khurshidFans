"use client";
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const App = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  // Mock product data
  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      description: "Titanium. So strong. So light. So Pro.",
      price: "$999",
      image: "https://placehold.co/400x400/1a1a1a/ffffff?text=iPhone+15+Pro",
      features: ["A17 Pro chip", "48MP main camera", "USB-C"]
    },
    {
      id: 2,
      name: "MacBook Air",
      description: "Supercharged by M2.",
      price: "$1,099",
      image: "https://placehold.co/400x400/1a1a1a/ffffff?text=MacBook+Air",
      features: ["M2 chip", "13.6-inch Liquid Retina", "All-day battery"]
    },
    {
      id: 3,
      name: "Apple Watch Series 9",
      description: "A healthy leap ahead.",
      price: "$399",
      image: "https://placehold.co/400x400/1a1a1a/ffffff?text=Apple+Watch",
      features: ["S9 chip", "Double tap gesture", "Brighter display"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <motion.div 
                className="text-2xl font-bold"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Apple
              </motion.div>
              <div className="hidden md:flex space-x-6">
                <a href="#" className="hover:text-gray-300 transition-colors">Store</a>
                <a href="#" className="hover:text-gray-300 transition-colors">Mac</a>
                <a href="#" className="hover:text-gray-300 transition-colors">iPad</a>
                <a href="#" className="hover:text-gray-300 transition-colors">iPhone</a>
                <a href="#" className="hover:text-gray-300 transition-colors">Watch</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="hover:text-gray-300 transition-colors">Search</button>
              <button className="hover:text-gray-300 transition-colors">Bag</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"
          animate={{ 
            background: [
              "linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)",
              "linear-gradient(90deg, rgba(147, 51, 234, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
              "linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
        
        <motion.div 
          style={{ opacity, scale }}
          className="text-center z-10 px-4"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            iPhone 15 Pro
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Titanium. So strong. So light. So Pro.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors transform hover:scale-105">
              Buy
            </button>
            <button className="border border-white/30 px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
              Learn more
            </button>
          </motion.div>
        </motion.div>

        {/* Floating Product Image */}
        <motion.div 
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
          style={{ opacity }}
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="relative">
            <img 
              src="https://placehold.co/500x600/1a1a1a/ffffff?text=iPhone+15+Pro" 
              alt="iPhone 15 Pro" 
              className="w-80 h-auto rounded-3xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl" />
          </div>
        </motion.div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured Products
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-300 mb-4">{product.description}</p>
                
                <div className="mb-4">
                  {product.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="inline-block bg-white/10 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">{product.price}</span>
                  <motion.button 
                    className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Experience the future today
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover the latest innovations in technology with our premium products.
          </motion.p>
          <motion.button 
            className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-colors transform hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Shop and Learn</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Store</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mac</a></li>
                <li><a href="#" className="hover:text-white transition-colors">iPad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">iPhone</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Apple Music</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Apple TV+</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Apple Fitness+</a></li>
                <li><a href="#" className="hover:text-white transition-colors">iCloud</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Apple Store</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Find a Store</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Genius Bar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Today at Apple</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Apple Camp</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">About Apple</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Newsroom</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Apple Leadership</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Opportunities</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Investors</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-500">
            <p>© 2024 Apple Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
