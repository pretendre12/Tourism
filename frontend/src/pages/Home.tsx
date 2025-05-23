import { useState, useEffect } from "react";
import Loader from "./Loader";
import { BACKEND_URL, FRONT_URL } from "../config/config";

console.log(BACKEND_URL); 
console.log(FRONT_URL);

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen relative">
      <div className="absolute inset-0">
        <img
          alt="A scenic view of Bukidnon's lush green mountains"
          className="w-full h-full object-cover"
          src={`${BACKEND_URL}/media/destinations/front-page.png`}
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 min-h-screen">
        
        {/* Navbar */}
        <nav className="absolute top-0 left-0 right-0 flex justify-between items-center p-3 sm:p-4">
          <img
            alt="Logo"
            className="h-14 sm:h-16"
            src={`${BACKEND_URL}/media/destinations/logo.png`}
          />
          <ul className="flex space-x-6 sm:space-x-10 text-sm sm:text-lg">
            <li><a className="hover:text-gray-300" href="#">Home</a></li>
            <li><a className="hover:text-gray-300" href={`/destinations`}>Destinations</a></li>
            <li><a className="hover:text-gray-300" href={`/blog`}>Blog</a></li>
            <li><a className="hover:text-gray-300" href={`/facts`}>FAQs</a></li>
            <li><a className="hover:text-gray-300" href={`/about`}>About Us</a></li>
          </ul>
        </nav>

        {/* Hero Section */}
        <h1 className="text-3xl sm:text-5xl dancing-script text-white mt-8">
          E x p l o r e
        </h1>

        <img
          src={`${BACKEND_URL}/media/destinations/Bukidnon.png`}
          alt="BUKIDNON"
          className="w-auto h-40 sm:h-60 md:h-70 object-contain"
        />
      </div>
    </div>
  );
};

export default Home;
