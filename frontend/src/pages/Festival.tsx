import { motion } from "framer-motion";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";


const BACKEND_URL = "https://probable-tribble-wrxrvp4jjwgjf9j57-8000.app.github.dev";

const Festival = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/destinations/`)
      .then((response) => {
        console.log("Fetched destinations:", response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load destinations");
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-xl text-red-500 mt-10">Error: {error}</p>;

  return (
    <section className="w-screen">
      {/* First Section with Motion Fix */}
      <div className="relative w-full overflow-hidden shadow-lg">
        <img
          src={`${BACKEND_URL}/media/destinations/kaamlanf.jpeg`}
          alt="Traditional Artifacts & Crafts"
          className="w-full h-[500px] object-cover"
        />

        {/* Text Overlay with Fixed Motion Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute inset-0 flex flex-col justify-center px-5"
        >
          <h2 className="text-white tienne-black text-5xl md:text-6xl font-extrabold mb-4 text-center">
            A <span className="font-bold text-yellow-300">Tapestry</span> of <span className="font-bold text-red-500">C</span>
            <span className="font-bold text-rose-400">o</span><span className="font-bold text-orange-500">l</span>
            <span className="font-bold text-emerald-500">o</span>
            <span className="font-bold text-blue-500">r</span>
            <span className="font-bold text-yellow-500">s</span>
          </h2>
          <h6 className="text-white tienne-black ml-100 text-4xl md:text-4xl font-extrabold mb-4">
            of Bukidnon
          </h6>
        </motion.div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Second Section */}
      <div className="w-full bg-white text-black py-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Kaamulan Festival
        </h2>
        <div className="w-30 h-1 bg-black mx-auto mt-2"></div>
      </div>

      {/* Third Section - Image */}
      <div className="w-full">
        <img
          src={`${BACKEND_URL}/media/festival/kaamulan.jpeg`}
          alt="Handwoven Textiles"
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* Description Section */}
      <div className="w-full bg-gray-100 py-12 px-6 md:px-16 lg:px-20">
        <h6 className="font-serif text-lg md:text-xl leading-relaxed text-gray-900 text-justify">
          The Kaamulan Festival, celebrated every March in Malaybalay City, Bukidnon, is a vibrant showcase of the province’s seven indigenous tribes—Bukidnon, Higaonon, Manobo, Matigsalug, Talaandig, Tigwahanon, and Umayamnon. Known for its authentic tribal traditions, the festival features colorful street dances, ritual performances, ethnic music, and horse-riding contests, preserving Bukidnon’s rich cultural heritage. Visitors can witness ancestral rituals, traditional crafts, and the Laga Ta Bukidnon beauty pageant, making Kaamulan a true celebration of unity, identity, and indigenous pride in the Highland Paradise of the South.
        </h6>
      </div>


      {/* third Section */}
      <div className="w-full bg-white text-black py-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Panalawaig Ta Pulangui Festival
        </h2>
        <div className="w-30 h-1 bg-black mx-auto mt-2"></div>
      </div>

      {/* Third Section - Image */}
      <div className="w-full">
        <img
          src={`${BACKEND_URL}/media/festival/panalawaig.png`}
          alt="Handwoven Textiles"
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* Description Section */}
      <div className="w-full bg-gray-100 py-12 px-6 md:px-16 lg:px-20">
        <h6 className="font-serif text-lg md:text-xl leading-relaxed text-gray-900 text-justify">
          The Panalawaig Ta Pulangi Festival, held every January in Valencia City, Bukidnon, is a thanksgiving celebration for the Pulangi River, which sustains the province’s agriculture and livelihood. This vibrant festival features fluvial parades, cultural performances, traditional rituals, and sporting events, honoring the deep connection between the river and the local communities. It highlights unity, gratitude, and environmental awareness, making it a meaningful celebration of Bukidnon’s natural blessings and rich heritage.
        </h6>
      </div>


      {/* fourth Section */}
      <div className="w-full bg-white text-black py-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Sal’lupongan Festival
        </h2>
        <div className="w-30 h-1 bg-black mx-auto mt-2"></div>
      </div>

      {/* Third Section - Image */}
      <div className="w-full">
        <img
          src={`${BACKEND_URL}/media/festival/sal.png`}
          alt="Handwoven Textiles"
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* Description Section */}
      <div className="w-full bg-gray-100 py-12 px-6 md:px-16 lg:px-20">
        <h6 className="font-serif text-lg md:text-xl leading-relaxed text-gray-900 text-justify">
            The Sal’lupongan Festival, celebrated every September in San Fernando, Bukidnon, is a unity festival that highlights the rich culture, traditions, and resilience of indigenous communities. The festival showcases rituals, traditional dances, music, and indigenous games, reflecting the spirit of togetherness among the Talaandig, Matigsalug, Manobo, and Tigwahanon tribes. More than just a celebration, Sal’lupongan promotes cultural preservation and solidarity, strengthening the bond between indigenous peoples and their heritage.
          </h6>
      </div>


      {/* fifth Section */}
      <div className="w-full bg-white text-black py-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Aldaw Ta Impasug-ong Festival
        </h2>
        <div className="w-30 h-1 bg-black mx-auto mt-2"></div>
      </div>

      {/* Third Section - Image */}
      <div className="w-full">
        <img
          src={`${BACKEND_URL}/media/festival/Aldaw.png`}
          alt="Handwoven Textiles"
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* Description Section */}
      <div className="w-full bg-gray-100 py-12 px-6 md:px-16 lg:px-20">
        <h6 className="font-serif text-lg md:text-xl leading-relaxed text-gray-900 text-justify">
          The Aldaw Ta Impasug-ong Festival, celebrated every November in Impasug-ong, Bukidnon, honors the town’s rich cultural heritage and agricultural abundance. Known as the “Home of the Country’s Finest Cowboys,” the festival features horse-riding events, rodeo shows, tribal dances, and traditional rituals that highlight the indigenous Higaonon culture and Bukidnon’s strong equestrian traditions. It is a vibrant celebration of identity, unity, and the deep connection between the people, land, and traditions of Impasug-ong.
        </h6>
      </div>


      {/* Second Section */}
      <div className="w-full bg-white text-black py-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Musikalawaig Festival
        </h2>
        <div className="w-30 h-1 bg-black mx-auto mt-2"></div>
      </div>

      {/* Third Section - Image */}
      <div className="w-full">
        <img
          src={`${BACKEND_URL}/media/festival/musikalawaig.png`}
          alt="Handwoven Textiles"
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* Description Section */}
      <div className="w-full bg-gray-100 py-12 px-6 md:px-16 lg:px-20">
        <h6 className="font-serif text-lg md:text-xl leading-relaxed text-gray-900 text-justify">
          The Musikalawaig Festival, celebrated in Talakag, Bukidnon, is a unique music and cultural festival that showcases the town’s love for indigenous and contemporary music. Named after the Kalawaig River, the festival features live musical performances, cultural dances, and artistic expressions that highlight the rich heritage of Talakag. It brings together local talents, musicians, and the community in a vibrant celebration of music, culture, and unity, making it a must-experience event in Bukidnon.
        </h6>
      </div>
    </section>
  );
};

export default Festival;
