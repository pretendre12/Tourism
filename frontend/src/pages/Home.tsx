import { useEffect, useState } from "react";
import axios from "axios";


interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
}

const BACKEND_URL = "https://probable-tribble-wrxrvp4jjwgjf9j57-8000.app.github.dev";

const Home = () => {
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
    <div className="bg-gray-900 text-white min-h-screen relative">
      <div className="absolute inset-0">
        <img
          alt="A scenic view of Bukidnon's lush green mountains"
          className="w-full h-full object-cover"
          src={`${BACKEND_URL}/media/destinations/front-page.png`}
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 min-h-screen">
        <nav className="absolute top-0 left-0 right-0 flex justify-between items-center p-4">
          <img
            alt="Logo"
            className="h-20"
            src="https://probable-tribble-wrxrvp4jjwgjf9j57-8000.app.github.dev/media/destinations/logo.png"
          />
          <ul className="flex space-x-10 text-lg">
            <li><a className="hover:text-gray-300" href="#">Home</a></li>
            <li><a className="hover:text-gray-300" href="https://probable-tribble-wrxrvp4jjwgjf9j57-5173.app.github.dev/destinations">Destinations</a></li>
            <li><a className="hover:text-gray-300" href="#">Blog</a></li>
            <li><a className="hover:text-gray-300" href="#">FAQs</a></li>
            <li><a className="hover:text-gray-300" href="#">About Us</a></li>
          </ul>
        </nav>
        <h1 className="text-6xl dancing-script text-white">E x p l o r e</h1>

        <img
          src={`${BACKEND_URL}/media/destinations/Bukidnon.png`}
          alt="BUKIDNON"
          className="w-auto h-80 md:h-70 object-contain"
        />
      </div>
    </div>
  );  
};

export default Home;
