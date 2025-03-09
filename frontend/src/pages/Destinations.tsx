import { useEffect, useState } from "react";
import axios from "axios";

interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;  // Changed from image_url to image
}

const Destinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    fetch("https://ominous-doodle-x5x574qqjr93vggx-8001.app.github.dev/api/destinations/")
      .then(response => response.json())
      .then(data => setDestinations(data))
      .catch(error => console.error("Error:", error));
  }, []);
  
  

  return (
    <div>
      <h2>Tourist Destinations</h2>
      <ul>
        {destinations.map(dest => (
          <li key={dest.id}>
            <h3>{dest.name}</h3>
            <p>{dest.description}</p>
            <img src={dest.image} alt={dest.name} width="200px" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Destinations;
