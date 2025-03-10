import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

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
  <div className="absolute inset-0 flex flex-col items-center justify-center text-white -top-50">
  {/* Title on Top */}
  <h1 className="text-white text-8xl font-extrabold tracking-wide 
                 bg-opacity-20 backdrop-blur-lg 
                 px-6 py-2 rounded-lg">
    BUKIDNON
  </h1>
</div>

</header>


      {/* Choose Your Adventure */}
      <section className="text-center py-6">
        <h2 className="text-3xl font-bold">Choose Your Adventure</h2>
      </section>

      {/* Navbar at Bottom */}
      <div className="">
        <Navbar />
      </div>


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
            className="w-full h-60 object-cover rounded-lg shadow-lg"
          />

            <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold">{dest.name}</h3>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Destinations;
