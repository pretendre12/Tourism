import React from 'react';
import { motion } from "framer-motion";
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

const BACKEND_URL = "https://vigilant-halibut-gvj64vj9prw394p-8000.app.github.dev/";

const About: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        axios
          .get(`${BACKEND_URL}/api/destinations/`)
          .then((response) => {
            console.log("Fetched destinations:", response.data);
            setLoading(false); // Set loading to false after data is fetched
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setError("Failed to load destinations");
            setLoading(false);
          });
      }, []);
    
    // Show the loader while data is loading
if (loading) return <Loader />;
    
if (error) return <p className="text-center text-xl text-red-500 mt-10">Error: {error}</p>;


  return (
    <div className="bg-white text-gray-800 min-h-screen font-roboto">
      
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden shadow-lg">
        <img
          src={`${BACKEND_URL}media/Dining/dining.png`}
          alt="Delicious Dining Experience"
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0 flex flex-col justify-center px-5 text-center"
        >
          <h2 className="text-white text-4xl md:text-5xl leading-snug">
            <span className="font-serif font-extrabold">Bukidnon’s Ultimate </span>
            <span className="font-serif font-extrabold text-yellow-300">Dining Haven</span>
          </h2>
        </motion.div>
      </div>

        <Navbar />

      {/* WHO WE ARE Section */}
      <div className="px-8 py-16">
        <div className="text-center mb-20">
          <div className="border-4 border-black py-2 px-6 rounded-lg inline-block mb-4">
            <h1 className="text-4xl md:text-5xl font-bold">WHO WE ARE</h1>
          </div>
          <h4 className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            We are a team of passionate locals and travel enthusiasts dedicated to showcasing 
            Bukidnon's breathtaking landscapes, rich culture, and hidden gems. From misty mountains 
            to vibrant festivals, we bring you the best of Bukidnon, inspiring you to explore, 
            experience, and fall in love with its beauty!
          </h4>
        </div>

        {/* MISSION Section */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-center mb-20">
          {/* Left Side - Mission Content */}
          <div className="md:w-1/2 p-4 relative">
          {/* Right Side - Mission Title in Border */}
          <div className="md:w-1/2 p-4 flex items-center justify-start md:justify-start">
            <div className="border-4 border-black py-2 px-6 rounded-lg inline-block">
            <h2 className="text-4xl md:text-5xl font-bold">MISSION</h2>
            </div>
          </div>
            <h6 className="text-lg leading-relaxed">
              Our mission is to showcase the best of Bukidnon—its natural wonders, rich culture, 
              and local experiences. This website serves as your ultimate travel guide, helping 
              you discover hidden gems, must-visit attractions, and insider tips for an unforgettable adventure.
            </h6>

            {/* Corner Borders */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-black"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-black"></div>
          </div>

          
        </div>

        {/* OUR TEAM Section */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Our Team</h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">

            {/* Team Member 1 */}
            <div className="text-center">
              <p className="text-lg font-bold mb-5">Designer</p>
              <img
                src={`${BACKEND_URL}media/destinations/cydney.png`}
                alt="Portrait of Cydney S. Ruelo"
                className="rounded-full mx-auto mb-3 border-4 border-black shadow-lg"
                style={{ width: '150px', height: '150px' }}
              />
              <p className="text-lg font-bold">Cydney S. Ruelo</p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <p className="text-lg font-bold">Full Stack</p>
              <p className="text-lg font-bold mb-1">Programmer</p>
              <img
                src={`${BACKEND_URL}media/destinations/master.png`}
                alt="Portrait of Jeranch Quibra"
                className="rounded-full mx-auto mb-3 border-4 border-black shadow-lg"
                style={{ width: '150px', height: '150px' }}
              />
              <p className="text-lg font-bold">Jeranch Quibra</p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <p className="text-lg font-bold mb-5">Researcher</p>
              <img
                src={`${BACKEND_URL}media/destinations/jiane.png`}
                alt="Portrait of Jiane Rackyle Sarting"
                className="rounded-full mx-auto mb-3 border-4 border-black shadow-lg"
                style={{ width: '150px', height: '150px' }}
              />
              <p className="text-lg font-bold">Jiane Rackyle Sarting</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
