import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

interface TouristSpot {
  id: number;
  title: string;
  description: string;
  image1: string;
  image2?: string;
  image3?: string;
  activities: string;
  cultural_significance: string;
  travel_tips: string;
}

const BACKEND_URL = "https://probable-tribble-wrxrvp4jjwgjf9j57-8000.app.github.dev";

const TouristSpots = () => {
  const [spots, setSpots] = useState<TouristSpot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSpotIndex, setCurrentSpotIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/tourist-spots/`)
      .then((response) => {
        console.log("Fetched tourist spots:", response.data);
        setSpots(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />; // Show the loader until data is loaded
  if (error) return <p className="text-center text-xl text-red-500 mt-10">Error: {error}</p>;

  const spot = spots[currentSpotIndex];

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col">
      {/* Title */}
      <h1 className="text-5xl font-bold text-center mt-6">{spot.title.toUpperCase()}</h1>

      {/* Image Layout */}
      <div className="flex flex-col lg:flex-row gap-6 max-w-screen-2xl mx-auto p-6">
        {/* Large Left Image */}
        <div className="lg:w-2/3">
          {spot.image1 && (
            <img
              src={spot.image1.startsWith("http") ? spot.image1 : `${BACKEND_URL}/${spot.image1}`}
              alt={spot.title}
              className="w-full h-[500px] object-cover rounded-lg shadow-lg"
            />
          )}
        </div>

        {/* Two Small Right Images */}
        <div className="lg:w-1/3 flex flex-col gap-4">
          {spot.image2 && (
            <img
              src={spot.image2.startsWith("http") ? spot.image2 : `${BACKEND_URL}/${spot.image2}`}
              alt={spot.title}
              className="w-full h-[240px] object-cover rounded-lg shadow-md"
            />
          )}
          {spot.image3 && (
            <img
              src={spot.image3.startsWith("http") ? spot.image3 : `${BACKEND_URL}/${spot.image3}`}
              alt={spot.title}
              className="w-full h-[240px] object-cover rounded-lg shadow-md"
            />
          )}
        </div>
      </div>

      {/* Text Content */}
      <div className="max-w-screen-lg mx-auto px-6">
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">About</h2>
          <p className="text-gray-700 mt-2 leading-relaxed">{spot.description}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Things to Do at {spot.title.toUpperCase()}</h2>
          <p className="text-gray-700 mt-2 leading-relaxed">{spot.activities}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Cultural and Historical Significance</h2>
          <p className="text-gray-700 mt-2 leading-relaxed">{spot.cultural_significance}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Plan Your Visit</h2>
          <p className="text-gray-700 mt-2 leading-relaxed">{spot.travel_tips}</p>
        </section>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between max-w-screen-lg mx-auto p-6 mt-6 gap-50">
        <button
          onClick={() => setCurrentSpotIndex((prev) => Math.max(prev - 1, 0))}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-700 disabled:bg-gray-300"
          disabled={currentSpotIndex === 0}
        >
          Back
        </button>
        <button
          onClick={() => {
            // Scroll to the top of the page
            window.scrollTo(0, 0);
            setCurrentSpotIndex((prev) => Math.min(prev + 1, spots.length - 1));
          }}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-700 disabled:bg-gray-300"
          disabled={currentSpotIndex === spots.length - 1}
        >
          Next
        </button>

      </div>
    </div>
  );
};

export default TouristSpots;
