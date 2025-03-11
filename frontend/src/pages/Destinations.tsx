import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "../pages/Destinations.css";

interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
}

const BACKEND_URL = "https://probable-tribble-wrxrvp4jjwgjf9j57-8000.app.github.dev";

const Destinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/destinations/`)
      .then((response) => {
        console.log("Fetched destinations:", response.data);
        setDestinations(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Intersection Observer
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

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
          <h1 className="text-white text-8xl font-extrabold tracking-wide bg-opacity-20 backdrop-blur-lg px-6 py-2 rounded-lg">
            BUKIDNON
          </h1>
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
          <img
            src={`${BACKEND_URL}/media/destinations/mtmadulag.jpeg`}
            alt="Nature Escapes"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-opacity-50 flex items-end justify-start p-4">
            <h3 className="!text-white text-2xl font-bold">Nature Escapes</h3>
          </div>
        </div>

        <div className="relative">
          <img
            src={`${BACKEND_URL}/media/destinations/challenges.png`}
            alt="Thrilling Adventures"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-opacity-50 flex items-end justify-start p-4">
            <h3 className="!text-white text-2xl font-bold">Thrilling Adventures</h3>
          </div>
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

            <div className="absolute top-2 left-2 bg-blue-100 text-blue-600 px-3 py-1 text-sm rounded-full flex items-center space-x-1">
              <span>📍</span>
              <span>{dest.name}</span>
            </div>

            <button className="absolute bottom-2 right-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-full shadow-md hover:bg-gray-300 transition">
              Discover
            </button>
          </div>
        ))}
      </section>

      {/* Cultural Experience Section */}
      <section className="relative w-screen my-12 rounded-xl overflow-hidden shadow-lg">
        {/* Background Image */}
        <img
          src={`${BACKEND_URL}/media/destinations/tribe.png`}
          alt="Bukidnon Festival"
          className="w-full h-[500px] object-cover"
        />

        {/* Animated Overlay Content */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute right-0 top-0 h-full w-1/2 bg-black/50 backdrop-blur-[2px] 
                     flex flex-col justify-center px-8 md:px-16"
        >
          <h2 className="text-white text-4xl md:text-5xl font-extrabold mb-4">
            <span className="text-gray-300">Dive into Tradition:</span>
          </h2>
          <h6 className="text-white text-2xl md:text-2xl font-extrabold mb-4 pl-4 md:pl-30">
            Bukidnon's Festivals and Exciting Festivities{" "}
            <span className="font-bold text-yellow-300">Await!</span>
          </h6>

          {/* Image Gallery */}
          <div className="flex space-x-10 mt-6">
            <img
              src={`${BACKEND_URL}/media/destinations/tribe1.jpeg`}
              alt="Festival 1"
              className="w-40 h-30 object-cover"
            />
            <img
              src={`${BACKEND_URL}/media/destinations/tribe2.jpeg`}
              alt="Festival 2"
              className="w-40 h-30 object-cover"
            />
            <img
              src={`${BACKEND_URL}/media/destinations/tribe3.jpeg`}
              alt="Festival 3"
              className="w-40 h-30 object-cover"
            />
          </div>

          {/* Explore Button */}
          <button className="absolute bottom-4 right-4 bg-gray-200 text-gray-700 px-6 py-2 rounded-full shadow-lg hover:bg-gray-300 transition">
            Explore
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default Destinations;
