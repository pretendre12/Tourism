import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Loader from "./Loader";
import Navbar from "../components/Navbar";
import client from "../service/middleware/client-instance";
import { BACKEND_URL, FRONT_URL } from "../config/config";

console.log(BACKEND_URL);
console.log(FRONT_URL);

interface Stay {
  id: number;
  title: string;
  location: string;
  image1: string;
}

const Stay = () => {
  const [stays, setStays] = useState<Stay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStays = async () => {
      try {
        const response = await client.get("/api/stay/");
        setStays(response.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchStays();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-xl text-red-500 mt-10">Error: {error}</p>;

  return (
    <div>
      {/* First Section */}
      <div className="relative w-full overflow-hidden shadow-lg">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          src={`${BACKEND_URL}/media/stay/stay.png`}
          alt="Traditional Artifacts & Crafts"
          className="w-full h-[500px] object-cover"
        />

        {/* Text Overlay with Gradient Blur at Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
          className="absolute inset-0 flex flex-col justify-center px-5 text-center"
        >
          <h2 className="text-white text-4xl md:text-5xl ">
            The Ultimate <span className="font-serif font-extrabold text-yellow-300">Stay</span> in{" "}
            <span className="font-serif font-extrabold">Bukidnon!</span>
          </h2>
        </motion.div>
      </div>

      {/* Navbar at Bottom */}
      <Navbar />

      {/* Stay Section */}
      <div className="w-full min-h-[60vh] bg-white px-6 py-6">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {stays.map((stay, index) => (
            <motion.div
              key={stay.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden hover:scale-105 transition-transform duration-300"
            >
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stay;
