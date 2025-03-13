import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "../pages/Destinations.css";
import BukidnonMap from "./BukidnonMap";
import Loader from "./Loader"; 

interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
}

const BACKEND_URL = "https://probable-tribble-wrxrvp4jjwgjf9j57-8000.app.github.dev";

const Destinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Reference for BukidnonMap
  const mapRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/destinations/`)
      .then((response) => {
        console.log("Fetched destinations:", response.data);
        setDestinations(response.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load destinations");
        setLoading(false);
      });
  }, []);

  // Function to scroll to the map section
  const scrollToMap = () => {
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  // Intersection Observer
  const { ref: culturalRef, inView: culturalInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: danceRef, inView: danceInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: DiningRef, inView: DiningInView} = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: stayRef, inView: stayInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  


  // Show the loader while data is loading
  if (loading) return <Loader />;

  if (error) return <p className="text-center text-xl text-red-500 mt-10">Error: {error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="relative h-96">
        {/* Background Image */}
        <img
          src={`${BACKEND_URL}/media/destinations/collage.png`}
          alt="Bukidnon Landscape"
          className="w-full h-full object-cover"
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <img
          src={`${BACKEND_URL}/media/destinations/Bukidnon.png`}
          alt="BUKIDNON"
          className="w-auto h-80 md:h-70 object-contain"
        />
        </div>
      </header>

      {/* Choose Your Adventure */}
      <section className="text-center py-6">
        <h2 className="text-3xl font-bold">Choose Your Adventure</h2>
      </section>

      {/* Navbar at Bottom */}
      <div>
        <Navbar />
      </div>

      {/* Adventure Options */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-16 pb-6">
        <div className="relative">
        <a href="https://probable-tribble-wrxrvp4jjwgjf9j57-5173.app.github.dev/tourist-spots">
          <img
            src={`${BACKEND_URL}/media/destinations/mtmadulag.jpeg`}
            alt="Nature Escapes"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-opacity-50 flex items-end justify-start p-4">
            <h3 className="!text-white text-2xl font-bold">Nature Escapes</h3>
          </div>
          </a>
        </div>

        <div className="relative">
        <a href="https://probable-tribble-wrxrvp4jjwgjf9j57-5173.app.github.dev/thrilling-adventures">
          <img
            src={`${BACKEND_URL}/media/destinations/challenges.png`}
            alt="Thrilling Adventures"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-opacity-50 flex items-end justify-start p-4">
            <h3 className="!text-white text-2xl font-bold">Thrilling Adventures</h3>
          </div>
          </a>
        </div>
      </section>

      {/* Top Destination */}
      <section className="text-center py-6">
        <h2 className="text-2xl font-semibold">Top Destination</h2>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 md:px-16 pb-8">
        {destinations.slice(0, 4).map((dest) => (
          <div key={dest.id} className="relative">
            <img
              src={dest.image.startsWith("http") ? dest.image : `${BACKEND_URL}/media/${dest.image}`}
              alt={dest.name}
              className="w-full h-60 object-cover rounded-xl shadow-lg"
            />

            <div
              className="absolute top-2 left-2 bg-blue-100 text-blue-600 px-3 py-1 text-sm rounded-full flex items-center space-x-1 cursor-pointer"
              onClick={scrollToMap} // Added onClick event
            >
              <span>📍</span>
              <span>{dest.name}</span>
            </div>

            <a href="https://probable-tribble-wrxrvp4jjwgjf9j57-5173.app.github.dev/tourist-spots">
              <button className="absolute bottom-2 right-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-full shadow-md hover:bg-gray-300 transition">
                Discover
              </button>
            </a>

          </div>
        ))}
      </section>

      {/* Cultural Experience Section */}
      <section className="relative w-screen my-12 rounded-xl overflow-hidden shadow-lg">
        <img src={`${BACKEND_URL}/media/destinations/tribe.png`} alt="Bukidnon Festival" className="w-full h-[500px] object-cover" />

        <motion.div
          ref={culturalRef}
          initial={{ opacity: 0, x: 50 }}
          animate={culturalInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute right-0 top-0 h-full w-1/2 bg-black/50 backdrop-blur-[2px] flex flex-col justify-center px-8 md:px-16"
        >
          <h2 className="text-white text-4xl md:text-5xl font-extrabold mb-4">
            <span className="text-gray-300">Dive into Tradition:</span>
          </h2>
          <h6 className="text-white text-2xl font-extrabold mb-4">
            Bukidnon's Festivals and Exciting Festivities <span className="font-bold text-yellow-300">Await!</span>
          </h6>

          <div className="flex space-x-10 mt-6">
            <img src={`${BACKEND_URL}/media/destinations/tribe1.jpeg`} alt="Festival 1" className="w-40 h-30 object-cover" />
            <img src={`${BACKEND_URL}/media/destinations/tribe2.jpeg`} alt="Festival 2" className="w-40 h-30 object-cover" />
            <img src={`${BACKEND_URL}/media/destinations/tribe3.jpeg`} alt="Festival 3" className="w-40 h-30 object-cover" />
          </div>
          <a href="https://probable-tribble-wrxrvp4jjwgjf9j57-5173.app.github.dev/culture">
          <button className="absolute bottom-4 right-4 bg-gray-200 text-gray-700 px-6 py-2 rounded-full shadow-lg hover:bg-gray-300 transition">
            Explore
          </button>
          </a>
        </motion.div>
      </section>

      {/* Foods */}
      <section className="relative w-screen my-6 rounded-xl overflow-hidden shadow-lg">
        <img src={`${BACKEND_URL}/media/destinations/pie.png`} alt="Bukidnon Traditional Dance" className="w-full h-[500px] object-cover" />

        <motion.div
          ref={danceRef}
          initial={{ opacity: 0, x: -50 }}
          animate={danceInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute left-0 top-0 h-full w-1/2 bg-black/50 backdrop-blur-[2px] flex flex-col justify-center px-8 md:px-16"
        >
          <h2 className="tienne-black text-white text-4xl md:text-5xl font-extrabold mb-4">
            <span className="text-gray-300">SAVOR BUKIDNON</span>
          </h2>
          <h6 className="tienne-bold text-white text-2xl font-extrabold mb-4">
            A taste of <span className="font-bold text-yellow-300">TRADITIONS</span> and <span className="font-bold text-yellow-300">HERITAGE</span>
          </h6>


        </motion.div>
      </section>

      {/* Dining Spot Section */}
      <section className="relative w-screen my-6 rounded-xl overflow-hidden shadow-lg">
        <img 
          src={`${BACKEND_URL}/media/destinations/Dining.jpeg`} 
          alt="Bukidnon Dining Spot" 
          className="w-full h-[500px] object-cover" 
        />

        <motion.div
          ref={DiningRef}
          initial={{ opacity: 0, y: -50 }} // Start from top
          animate={DiningInView ? { opacity: 1, y: 0 } : {}} // Slide down
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex flex-col justify-center items-center px-8 md:px-16"
        >
          <h2 className="tienne-black text-white text-4xl md:text-5xl font-extrabold mb-4 text-center">
            Discover the Best <span className="text-gray-300">Dining Spots</span>
          </h2>
          <h6 className="tienne-bold text-white text-2xl font-extrabold mb-4 text-center">
            Indulge in <span className="font-bold text-yellow-300">Authentic</span> Flavors and <span className="font-bold text-yellow-300">Culinary Delights</span>
          </h6>

          <button className="mt-4 bg-yellow-300 text-gray-900 px-6 py-2 rounded-full shadow-lg hover:bg-yellow-400 transition">
            Explore Dining Spots
          </button>
        </motion.div>
      </section>

      {/* Stay */}
      <section className="relative w-screen my-6 rounded-xl overflow-hidden shadow-lg">
        <img 
          src={`${BACKEND_URL}/media/destinations/alpine.png`} 
          alt="Bukidnon Traditional Dance" 
          className="w-full h-[500px] object-cover" 
        />

        <motion.div
          ref={stayRef}
          initial={{ opacity: 0, y: 50 }} // Start from below
          animate={stayInView ? { opacity: 1, y: 0 } : {}} // Slide up when in view
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex flex-col justify-center px-8 md:px-16"
        >
          <h2 className="tienne-black text-white text-4xl md:text-5xl font-extrabold mb-4">
            <span className="text-gray-300">Discover the Perfect Place</span>
          </h2>
          <h2 className="tienne-black text-white text-4xl md:text-5xl font-extrabold mb-4">
            to Stay in<span className="font-bold text-yellow-300"> BUKIDNON</span>
          </h2>
        </motion.div>
      </section>

      <div ref={mapRef}>
        <BukidnonMap />
      </div>

      <section className="w-full flex flex-col items-center my-12 px-4">
      {/* Title */}
      <h2 className="text-center text-3xl font-extrabold text-black md:text-4xl font-serif">
        Featured Blog & Travel Stories
      </h2>

      {/* Description */}
      <p className="text-lg text-center text-gray-600 max-w-5xl mt-2 font-serif">
        Experience Bukidnon like never before as you uncover hidden gems, immerse in vibrant 
        festivals, and explore captivating local stories—all through the eyes of fellow travelers.
      </p>

      {/* Blog Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-6xl">
        
        {/* Kaamulan Festival Blog */}
        <div className="bg-[#D3C5AD] shadow-lg rounded-lg overflow-hidden">
          <img 
            src={`${BACKEND_URL}/media/destinations/fuck.jpeg`} 
            alt="Kaamulan Festival" 
            className="w-full h-56 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold font-serif">A First-Timer’s Guide to the Kaamulan Festival</h3>
            <p className="text-gray-700 mt-2 font-serif">
              "Experience the vibrant culture, indigenous traditions, and lively celebrations of the 
              Kaamulan Festival in the heart of Bukidnon!"
            </p>
            <p className="text-sm text-gray-500 mt-4">Read More</p>
          </div>
        </div>

        {/* Lover’s Lane Blog */}
        <div className="bg-[#B2A28E] shadow-lg rounded-lg overflow-hidden">
          <img 
            src={`${BACKEND_URL}/media/destinations/fuck1.jpeg`} 
            alt="Lover’s Lane" 
            className="w-full h-56 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-serif">Explore the Romantic Charm of Lover’s Lane!</h3>
            <p className="text-gray-700 mt-2 font-serif">
              "Escape to the enchanting beauty of Lover’s Lane—where winding paths and serene landscapes 
              create the perfect romantic getaway!"
            </p>
            <p className="text-sm text-gray-500 mt-4">Read More</p>
          </div>
        </div>

      </div>
    </section>



    </div>
  );
};

export default Destinations;
