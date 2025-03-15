import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Modal from "../components/ui/dining-modal";
import Loader from "./Loader";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "../components/Navbar"

interface DiningProps {
  id: number;
  title: string;
  description: string;
  image1: string;
  image2?: string;
  image3?: string;
  image4?: string;
  location: string;
}

const BACKEND_URL = "https://vigilant-halibut-gvj64vj9prw394p-8000.app.github.dev/";

const Dining: React.FC = () => {
  const [dinings, setDinings] = useState<DiningProps[]>([]);
  const [selectedDining, setSelectedDining] = useState<DiningProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}api/dining/`)
      .then((response) => {
        setDinings(response.data);
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
    <div className="mt-0">
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
          <h2 className="text-white text-4xl md:text-5xl">
          <span className="font-serif font-extrabold">Bukidnon’s Ultimate</span> 
          <span className="font-serif font-extrabold text-yellow-300">Dining Haven</span>
          </h2>
        </motion.div>
      </div>

      {/* Navbar at Bottom */}
      <div>
          <Navbar />
      </div>


      <div className="space-y-6">
        {dinings.map((dining) => (
          <motion.div
            key={dining.id}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex gap-6 bg-white shadow-lg rounded-lg overflow-hidden px-8 py-4"
          >
            <img
              src={`${BACKEND_URL}${dining.image1}`}
              alt={dining.title}
              className="w-2/5 h-60 object-cover rounded-lg"
            />
            <div className="flex-1 pt-2 p-4 flex flex-col justify-start">
              <h1 className="text-xl font-bold">{dining.title}</h1>
              <h6 className="text-gray-600">{dining.description}</h6>
              <button
                onClick={() => setSelectedDining(dining)}
                className="mt-2 self-start bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-500"
              >
                More
              </button>
            </div>
          </motion.div>
        ))}

        {selectedDining && (
          <Modal 
            title="Dining" 
            onClose={() => setSelectedDining(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col lg:flex-row gap-6 max-w-screen-2xl mx-auto px-5"
            >
              <div className="lg:w-2/3">
                {selectedDining.image2 && (
                  <img
                    src={`${BACKEND_URL}${selectedDining.image2}`}
                    alt={selectedDining.title}
                    className="w-full h-[400px] object-cover rounded-lg shadow-lg"
                  />
                )}
              </div>
              <div className="lg:w-1/3 flex flex-col gap-4">
                {selectedDining.image3 && (
                  <img
                    src={`${BACKEND_URL}${selectedDining.image3}`}
                    alt={selectedDining.title}
                    className="w-full h-[200px] object-cover rounded-lg shadow-md"
                  />
                )}
                {selectedDining.image4 && (
                  <img
                    src={`${BACKEND_URL}${selectedDining.image4}`}
                    alt={selectedDining.title}
                    className="w-full h-[200px] object-cover rounded-lg shadow-md"
                  />
                )}
              </div>
            </motion.div>
            <h4 className="text-gray-700 pt-4 font-extrabold">{selectedDining.title}</h4>
            <h6 className="text-gray-700 pt-2">{selectedDining.description}</h6>
            <div className="flex items-center pt-2">
              <FaMapMarkerAlt className="text-red-500 mr-2" />
              <p className="text-gray-500 text-2xl">{selectedDining.location}</p>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Dining;
