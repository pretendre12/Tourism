import { useEffect, useState } from "react";
import axios from "axios";
import "./Destinations.css"; // Import CSS for styling

interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
}

const BACKEND_URL = "https://probable-tribble-wrxrvp4jjwgjf9j57-8000.app.github.dev"; // Adjust if needed

const Destinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/destinations/`)
      .then(response => setDestinations(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container">
      <h2 className="title">Tourist Destinations</h2>
      <ul className="destinations-list">
        {destinations.map(dest => (
          <li key={dest.id} className="destination-card">
            <h3>{dest.name}</h3>
            <p>{dest.description}</p>
            <img 
              src={`${BACKEND_URL}${dest.image}`} // Ensures correct image path
              alt={dest.name} 
              className="destination-image"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Destinations;
