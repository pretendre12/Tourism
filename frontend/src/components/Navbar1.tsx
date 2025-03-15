import React from 'react';
import "../pages/Destinations.css";

const Navbar: React.FC = () => {
  return (
    <nav className="absolute top-0 left-80 w-[calc(100%-20rem)] text-white font-extrabold bg-opacity-50 py-4">
      <div className="container mx-auto flex justify-end items-center px-6">
        
        {/* Navigation Links - Now Aligned to the Right with Responsiveness */}
        <div className="flex space-x-10 md:space-x-20">
          <a href="/" className="hover:text-yellow-300 transition duration-300">Home</a>
          <a href="/destinations" className="hover:text-yellow-300 transition duration-300">Destinations</a>
          <a href="/blog" className="hover:text-yellow-300 transition duration-300">Blog</a>
          <a href="/faqs" className="hover:text-yellow-300 transition duration-300">FAQs</a>
          <a href="/about" className="hover:text-yellow-300 transition duration-300">About Us</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
