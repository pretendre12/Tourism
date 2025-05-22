// src/pages/Nature.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Modal from "../components/ui/nature";
import Loader from "./Loader";
import axios from "axios";
import Navbar from "../components/Navbar";
import { BACKEND_URL } from "../config/config";
import { useAuth } from "../context/AuthContext";

interface NatureProps {
  id: number;
  title: string;
  description: string;
  image1: string;
  image2?: string;
  image3?: string;
  highlights: string;
  is_favorite?: boolean;
}

const Nature: React.FC = () => {
  const [natureSpots, setNatureSpots] = useState<NatureProps[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<NatureProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { token, user } = useAuth(); // Get token and user from Auth context

  const fetchNatureSpots = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}api/nature/`, {
        headers: token ? {
          'Authorization': `Bearer ${token}`
        } : {}
      });
      setNatureSpots(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching nature spots:", err);
      setError(err.message || "Failed to load nature spots");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNatureSpots();
  }, [token]); // Re-fetch when token changes

  const toggleFavorite = async (spotId: number) => {
    if (!token || !user) {
      alert("Please log in to add favorites");
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}api/nature/${spotId}/toggle_favorite/`,
        {},
        {
          headers: {
            'Authorization': `JWT ${token}`
          }
        }
      );
      
      // Update the local state to reflect the change
      setNatureSpots(spots => 
        spots.map(spot => 
          spot.id === spotId 
            ? { ...spot, is_favorite: response.data.status === 'added to favorites' } 
            : spot
        )
      );
      
      console.log("Favorite status updated:", response.data.status);
    } catch (err) {
      console.error("Error toggling favorite:", err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        alert("Your session has expired. Please log in again.");
      } else {
        alert("Failed to update favorite status");
      }
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-xl text-red-500 mt-10">Error: {error}</p>;

  return (
    <div className="mt-0">
      <div className="relative w-full overflow-hidden shadow-lg">
        <img
          src={`${BACKEND_URL}media/Nature/nature.png`}
          alt="Nature Adventure"
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0 flex flex-col justify-center px-5 text-center"
        >
          <h1 className="text-white text-4xl md:text-6xl">
            <span className="font-serif font-extrabold">Bukidnon's<span className="text-green-300"> Nature </span>Escapes</span>
          </h1>
          <h2 className="mt-6">
            <span className="font-serif text-2xl md:text-4xl italic text-white">Where Adventure Meets Serenity</span>
          </h2>
        </motion.div>
      </div>

      <div>
        <Navbar />
      </div>

      <div className="space-y-6">
        {natureSpots.map((spot) => (
          <motion.div
            key={spot.id}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex gap-6 bg-white shadow-lg rounded-lg overflow-hidden px-8 py-4"
          >
            <img
              src={`${BACKEND_URL}${spot.image1}`}
              alt={spot.title}
              className="w-2/5 h-80 object-cover rounded-lg"
            />
            <div className="flex-1 pt-2 p-4 flex flex-col justify-start">
              <h1 className="text-xl font-bold">{spot.title}</h1>
              <h6 className="text-gray-600">{spot.description}</h6>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setSelectedSpot(spot)}
                  className="self-start bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-500"
                >
                  More
                </button>
                <button 
                  onClick={() => toggleFavorite(spot.id)}
                  className={`self-start ${spot.is_favorite ? 'bg-red-500' : 'bg-green-600'} text-white px-3 py-1 rounded text-sm hover:opacity-80`}
                >
                  {spot.is_favorite ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {selectedSpot && (
          <Modal title={selectedSpot.title} onClose={() => setSelectedSpot(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col lg:flex-row gap-6 max-w-screen-2xl mx-auto px-5"
            >
              <div className="lg:w-2/3">
                {selectedSpot.image1 && (
                  <img
                    src={`${BACKEND_URL}${selectedSpot.image1}`}
                    alt={selectedSpot.title}
                    className="w-full h-[400px] object-cover rounded-lg shadow-lg"
                  />
                )}
              </div>
              <div className="lg:w-1/3 flex flex-col gap-4">
                {selectedSpot.image2 && (
                  <img
                    src={`${BACKEND_URL}${selectedSpot.image2}`}
                    alt={selectedSpot.title}
                    className="w-full h-[200px] object-cover rounded-lg shadow-md"
                  />
                )}
                {selectedSpot.image3 && (
                  <img
                    src={`${BACKEND_URL}${selectedSpot.image3}`}
                    alt={selectedSpot.title}
                    className="w-full h-[200px] object-cover rounded-lg shadow-md"
                  />
                )}
              </div>
            </motion.div>
            <h6 className="text-gray-700 pt-2">{selectedSpot.highlights}</h6>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Nature;