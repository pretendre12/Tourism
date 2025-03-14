import React, { useState, useEffect } from "react";
import Modal from "../components/ui/dining-modal"; // Ensure the correct import path
import Loader from "./Loader"; // Importing Loader component
import axios from "axios";

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

const BACKEND_URL = "https://probable-tribble-wrxrvp4jjwgjf9j57-8000.app.github.dev";

const Dining: React.FC = () => {
  const [dinings, setDinings] = useState<DiningProps[]>([]);
  const [selectedDining, setSelectedDining] = useState<DiningProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/dining/`) // Ensure the API endpoint is correct
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
    <div className="space-y-6">
      {dinings.map((dining) => (
        <div key={dining.id} className="flex gap-6 bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Image on the Left */}
          <img
            src={`${BACKEND_URL}/${dining.image1}`}
            alt={dining.title}
            className="w-1/3 h-48 object-cover rounded-l-lg"
          />

          {/* Content on the Right */}
          <div className="flex-1 p-4 flex flex-col justify-center">
            <h2 className="text-xl font-bold">{dining.title}</h2>
            <p className="text-gray-600">{dining.description}</p>
            <button
              onClick={() => setSelectedDining(dining)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
            >
              More
            </button>
          </div>
        </div>
      ))}

      {/* Modal */}
      {selectedDining && (
        <div className="max-h-[70vh] overflow-auto">
          <Modal 
            title={selectedDining.title.toUpperCase()} 
            onClose={() => setSelectedDining(null)}
          >
            <div className="flex justify-center items-center gap-16">
              {selectedDining.image2 && (
                <img 
                  src={`${BACKEND_URL}/${selectedDining.image2}`} 
                  alt={selectedDining.title} 
                  className="w-1/3 h-64 object-cover rounded-lg"
                />
              )}
              {selectedDining.image3 && (
                <img 
                  src={`${BACKEND_URL}/${selectedDining.image3}`} 
                  alt={selectedDining.title} 
                  className="w-1/3 h-64 object-cover rounded-lg"
                />
              )}
              {selectedDining.image4 && (
                <img 
                  src={`${BACKEND_URL}/${selectedDining.image4}`} 
                  alt={selectedDining.title} 
                  className="w-1/3 h-64 object-cover rounded-lg"
                />
              )}
            </div>
            <p className="text-gray-700 text-lg mb-2">{selectedDining.description}</p>
            <p className="text-gray-500">📍 {selectedDining.location}</p>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Dining;