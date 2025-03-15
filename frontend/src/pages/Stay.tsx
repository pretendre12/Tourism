import { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Loader from "./Loader"; // Import Loader component
import Navbar from "../components/Navbar"

interface Stay {
  id: number;
  title: string;
  location: string;
  image1: string;
}

const BACKEND_URL = "https://vigilant-halibut-gvj64vj9prw394p-8000.app.github.dev/";


const Stay = () => {
  const [stays, setStays] = useState<Stay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/stay/`)
      .then((response) => {
        setStays(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-xl text-red-500 mt-10">Error: {error}</p>;

  return (
    <div>
      {/* First Section */}
      <div className="relative w-full overflow-hidden shadow-lg">
        <img
          src={`${BACKEND_URL}/media/stay/stay.png`}
          alt="Traditional Artifacts & Crafts"
          className="w-full h-[500px] object-cover"
        />

        {/* Text Overlay with Gradient Blur at Bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0 flex flex-col justify-center px-5 text-center"
        >
          <h2 className="text-white text-4xl md:text-5xl ">
            The Ultimate <span className="font-serif font-extrabold text-yellow-300">Stay</span> in <span className="font-serif font-extrabold">Bukidnon!</span>
          </h2>
        </motion.div>
      </div>

      {/* Navbar at Bottom */}
      <div>
        <Navbar />
      </div>

      {/* Stay Section */}
      <div className="w-full min-h-[60vh] bg-white px-6 py-6">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {stays.map((stay) => (
            <div key={stay.id} className="bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden">
              {/* Image */}
              <img
                src={stay.image1.startsWith("/media") ? `${BACKEND_URL}${stay.image1}` : stay.image1}
                alt={stay.title}
                className="w-full h-60 object-cover"
              />
              {/* Content */}
              <div className="p-4">
                <h2 className="text-xl font-bold">{stay.title}</h2>
                <div className="flex items-center text-gray-600 mt-2">
                  <FaMapMarkerAlt className="text-red-500 mr-2" />
                  <p className="italic">{stay.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stay;
