import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const locations = [
  { id: 1, name: "Dahilayan Adventure Park", position: [8.2524, 124.8141] },
  { id: 2, name: "Lake Apo", position: [8.0401, 125.0859] },
  { id: 3, name: "Monastery of Transfiguration", position: [7.9476, 125.0552] },
  { id: 4, name: "Kaamulan Park", position: [8.1608, 125.1226] },
  { id: 5, name: "Bukidnon Pineapple Plantation", position: [8.1459, 124.9917] },
  { id: 6, name: "Communal Ranch", position: [8.2451, 125.0923] }
];

const BukidnonMap: React.FC = () => {
  return (
    <section className="w-full flex flex-col items-center my-12 px-4">
      {/* Title */}
      <h1 className="text-center text-4xl font-extrabold text-black md:text-5xl">
        EXPLORE BUKIDNON
      </h1>

      {/* Description */}
      <h6 className="text-xl text-center text-gray-600 md:text-2xl mt-2 max-w-3xl mx-auto">
        Discover breathtaking nature spots, adventure parks, and cultural landmarks in Bukidnon. 
        Click on the map to explore destinations and get directions!
      </h6>



      {/* Map Container */}
      <div className="w-full max-w-[900px] h-[400px] bg-gray-300 mt-6 shadow-lg rounded-lg overflow-hidden">
        <MapContainer 
          center={[8.051, 125.135]} 
          zoom={10} 
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
           
          />

          {/* Multiple Markers */}
          {locations.map((loc) => (
            <Marker key={loc.id} position={loc.position}>
              <Popup>{loc.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default BukidnonMap;
