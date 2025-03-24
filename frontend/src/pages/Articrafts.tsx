import { motion } from "framer-motion";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { BACKEND_URL, FRONT_URL } from "../config/config";

console.log(BACKEND_URL); 
console.log(FRONT_URL);

const Articrafts = () => {
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
      {/* First Section */}
      <div className="relative w-full rounded-xl overflow-hidden shadow-lg">
        <img
          src={`${BACKEND_URL}/media/destinations/hinabol.jpeg`}
          alt="Traditional Artifacts & Crafts"
          className="w-full h-[500px] object-cover"
        />

        {/* Text Overlay with Gradient Blur at Bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0 flex flex-col justify-center px-5 text-center"
        >
          <h2 className="text-white text-2xl md:text-4xl font-bold">Traditional</h2>
          <h2 className="text-white text-4xl md:text-5xl font-extrabold">
            Artifacts <span className="text-yellow-300">&</span> Crafts
          </h2>
        </motion.div>
      </div>

      {/* Navbar */}
      <div>
        <Navbar />
      </div>

      {/* Second Section */}
      <div className="w-full bg-white text-black py-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          HANDWOVEN TEXTILES & EMBROIDERY
        </h2>
        <div className="w-30 h-1 bg-black mx-auto mt-2"></div>
      </div>

      {/* Third Section - Image */}
      <div className="w-full">
        <img
          src={`${BACKEND_URL}/media/articrafts/bluewo.png`}
          alt="Handwoven Textiles"
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* Description Section */}
      <div className="w-full bg-gray-100 py-12 px-6 md:px-16 lg:px-20">
        <h6 className="font-serif">
        &nbsp;&nbsp;&nbsp;&nbsp;The handwoven textiles and embroidery of Bukidnon are a dazzling testament to the artistry and heritage of its indigenous communities. At the heart of this tradition is Panubok, the intricate embroidery of the Panay Bukidnon, where skilled artisans, known as Manugtubok, meticulously stitch vibrant patterns onto fine Iloilo cotton. Inspired by nature and ancestral traditions, Panubok features striking motifs like Binangkaw (spear tips), Sudikama (python skin), Sikag (fish bones), Matangpunay (the keen eyes of the Punay bird), and Binunghay (fern-like patterns), each symbolizing the tribe’s deep connection to their surroundings. Meanwhile, Bukidnon’s rich weaving tradition shines through Pinangabol, a handwoven abaca textile crafted using age-old techniques on vertical looms, resulting in mesmerizing ikat patterns. More than just fabric, these masterpieces are woven with stories, rituals, and a deep respect for the land, ensuring that the legacy of Bukidnon’s artisans continues to thrive.
        </h6>
        

      </div>


      {/* third Section */}
      <div className="w-full bg-white text-black py-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">
            BEADED ACCESSORIES & ORNAMENTS
        </h2>
        <div className="w-30 h-1 bg-black mx-auto mt-2"></div>
      </div>

      {/* Third Section - Image */}
      <div className="w-full">
        <img
          src={`${BACKEND_URL}/media/articrafts/ormamens.jpeg`}
          alt="Handwoven Textiles"
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* Description Section */}
      <div className="w-full bg-gray-100 py-12 px-6 md:px-16 lg:px-20">
        <h6 className="font-serif">
        &nbsp;&nbsp;&nbsp;&nbsp;In the heart of Bukidnon, the bali-og stands as a dazzling symbol of heritage and identity, worn proudly by the Higaonon, Talaandig, and Manobo tribes during grand celebrations and sacred ceremonies. These exquisite layered necklaces, crafted from vibrant glass beads, shimmering metal pieces, delicate seashells, and other natural elements, are more than just accessories—they tell stories of tradition, status, and artistry. Intricately designed with colorful bead fringes, bali-og is often worn in multiple layers, making a bold and striking statement. Beyond necklaces, Bukidnon’s beadwork extends to elegant earrings, ornate headdresses adorned with intricate bead patterns for festivals, and even beaded belts that add a touch of tradition to their attire. Each piece reflects the skillful craftsmanship of Bukidnon’s indigenous artisans, ensuring that their cultural legacy shines brightly for generations to come.
        </h6>
        

      </div>


      {/* Second Section */}
      <div className="w-full bg-white text-black py-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">
            TALAANDING SOIL PAINTING
        </h2>
        <div className="w-30 h-1 bg-black mx-auto mt-2"></div>
      </div>

      {/* Third Section - Image */}
      <div className="w-full">
        <img
          src={`${BACKEND_URL}/media/articrafts/talaanding.png`}
          alt="Handwoven Textiles"
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* Description Section */}
      <div className="w-full bg-gray-100 py-12 px-6 md:px-16 lg:px-20">
        <h6 className="font-serif">
        &nbsp;&nbsp;&nbsp;&nbsp;Talaandig soil painting is a unique and powerful art form that uses the earth itself as a medium to illustrate the rich traditions, deep beliefs, and profound connection to nature of the Talaandig people in Bukidnon, Northern Mindanao. More than just visual storytelling, this indigenous art preserves cultural identity while inspiring future generations. Renowned artists like Salima Saway, who gathers soil from her home in Mt. Kitanglad, have showcased this art globally, with exhibitions in Germany, Guam, Singapore, and the United States. Rodelio "Waway" Saway, a respected tribal leader, envisions Bukidnon as the "Soil Painting Capital of the World," while artists like Soliman Poonon and RJ Sumingsang Borja Saway continue to innovate and integrate music and earth-based mediums into their craft. Beyond artistic expression, soil painting plays a vital role in empowering out-of-school youth, helping them rediscover confidence and purpose through creativity. Organizations like the Bukidnon Local Artist Kulektib (BULAK) actively promote this indigenous tradition through workshops and events, ensuring that soil painting remains a thriving symbol of Bukidnon’s cultural and artistic legacy.
        </h6>
        

      </div>

      {/* fourth Section */}
      <div className="w-full bg-white text-black py-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">
            HAND-CARVED WOODCRAFTS
        </h2>
        <div className="w-30 h-1 bg-black mx-auto mt-2"></div>
      </div>

      {/* Third Section - Image */}
      <div className="w-full">
        <img
          src={`${BACKEND_URL}/media/articrafts/hand-carved.png`}
          alt="Handwoven Textiles"
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* Description Section */}
      <div className="w-full bg-gray-100 py-12 px-6 md:px-16 lg:px-20">
        <h6 className="font-serif">
        &nbsp;&nbsp;&nbsp;&nbsp;Hand-carved woodcrafts in Bukidnon are a striking testament to the skill, creativity, and cultural heritage of its indigenous artisans. Crafted with precision and deep symbolism, these intricate wooden pieces often depict ancestral spirits, nature-inspired patterns, and tribal motifs that reflect the beliefs and traditions of the Bukidnon, Talaandig, and Higaonon peoples. Using locally sourced hardwood, artisans meticulously carve sculptures, ritual objects, furniture, and household items, each carrying a unique story passed down through generations. These woodcrafts are more than just decorative pieces—they serve as cultural markers, preserving indigenous identity and artistry while supporting sustainable livelihoods. Whether it’s a finely carved bulul (guardian figure), a traditional musical instrument, or a beautifully detailed household ornament, Bukidnon’s woodcrafts stand as timeless expressions of craftsmanship and tradition, keeping the spirit of indigenous artistry alive.
        </h6>
        

      </div>


      {/* five Section */}
      <div className="w-full bg-white text-black py-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">
            HANDCRAFTED INDIGENOUS
        </h2>
        <h2 className="text-3xl md:text-4xl font-extrabold">
            MUSICAL INSTRUMENT
        </h2>
        <div className="w-30 h-1 bg-black mx-auto mt-2"></div>
      </div>

      {/* Third Section - Image */}
      <div className="w-full">
        <img
          src={`${BACKEND_URL}/media/articrafts/handcrafted.png`}
          alt="Handwoven Textiles"
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* Description Section */}
      <div className="w-full bg-gray-100 py-12 px-6 md:px-16 lg:px-20">
        <h6 className="font-serif">
        &nbsp;&nbsp;&nbsp;&nbsp;The Panay Bukidnon people of the Philippines have a deep musical tradition rooted in the craftsmanship of handcrafted bamboo instruments, each playing a vital role in storytelling, rituals, and cultural celebrations. These instruments, including the tulali (flute), suganggang (bamboo buzzer), tikumbo (zither-percussion hybrid), subing (jaw’s harp), and litgit (bowed instrument), are made from untreated bamboo, giving them a raw, rustic charm often enhanced by intricate carvings and natural patterns. Beyond their musical function, these instruments serve as vessels of history and emotion—evoking memories, sharing folk tales, and even stirring feelings of resentment or shame in traditional epics. Whether used to accompany dances, narrate age-old legends, or bring humor to gatherings, the bamboo instruments of the Panay Bukidnon are a living testament to their rich heritage and artistic ingenuity.
        </h6>
        

      </div>


      {/* sixth Section */}
      <div className="w-full bg-white text-black py-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">
            BAMBOO & RATTAN CRAFTS
        </h2>
        <div className="w-30 h-1 bg-black mx-auto mt-2"></div>
      </div>

      {/* Third Section - Image */}
      <div className="w-full">
        <img
          src={`${BACKEND_URL}/media/articrafts/bamboo.png`}
          alt="Handwoven Textiles"
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* Description Section */}
      <div className="w-full bg-gray-100 py-12 px-6 md:px-16 lg:px-20">
        <h6 className="font-serif">
        &nbsp;&nbsp;&nbsp;&nbsp;Bukidnon's bamboo and rattan crafts showcase the incredible skill and resourcefulness of its indigenous artisans, transforming natural materials into beautifully handcrafted masterpieces. Woven with precision and cultural significance, these crafts range from intricate baskets and furniture to everyday household items and decorative pieces. Using sustainably sourced bamboo and rattan, artisans create sturdy yet elegant works of art, often adorned with intricate weaves and indigenous patterns that reflect the traditions of the Bukidnon, Talaandig, and Higaonon communities. More than just functional objects, these crafts embody the deep connection between the people and their environment, preserving age-old weaving techniques while supporting sustainable livelihoods. Whether it's a finely woven storage basket, a handcrafted rattan chair, or an ornately designed wall hanging, Bukidnon’s bamboo and rattan crafts stand as timeless symbols of tradition, artistry, and indigenous heritage.
        </h6>
        

      </div>


      {/* seven Section */}
      <div className="w-full bg-white text-black py-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">
            TRADITIONAL WEAPONS
        </h2>
        <h2 className="text-3xl md:text-4xl font-extrabold">
         &
        </h2>
        <h2 className="text-3xl md:text-4xl font-extrabold">
            HUNTING TOOLS
        </h2>
        <div className="w-30 h-1 bg-black mx-auto mt-2"></div>
      </div>

      {/* Third Section - Image */}
      <div className="w-full">
        <img
          src={`${BACKEND_URL}/media/articrafts/traditional.png`}
          alt="Handwoven Textiles"
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* Description Section */}
      <div className="w-full bg-gray-100 py-12 px-6 md:px-16 lg:px-20">
        <h6 className="font-serif">
        &nbsp;&nbsp;&nbsp;&nbsp;Bukidnon's traditional weapons and hunting tools reflect the warrior spirit, survival skills, and cultural heritage of its indigenous tribes. Among these are the lambitan, a weapon wielded by highland warriors, and the landag and kara, both combat swords featuring recurved blades—landag with a narrow tip for precision strikes and kara with a broader belly for powerful chopping. The badi, a short, crescent-shaped blade, serves multiple purposes, from clearing brush to bush-crafting and even combat. Hunting tools also play a significant role in daily life, with the falfeg, a single-barbed blade, and the hinolgot, a multiple-barbed weapon, both used for hunting and warfare. Spears, essential for both hunting and battle, hold deeper meaning as symbols of status and animistic beliefs. These traditional weapons and tools are not just instruments of survival but also testaments to the ingenuity, craftsmanship, and warrior traditions of Bukidnon’s indigenous peoples.
        </h6>
        

      </div>


      {/* eight Section */}
      <div className="w-full bg-white text-black py-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">
            CERAMICS & POTTERY
        </h2>
        <div className="w-30 h-1 bg-black mx-auto mt-2"></div>
      </div>

      {/* Third Section - Image */}
      <div className="w-full">
        <img
          src={`${BACKEND_URL}/media/articrafts/ceramic.jpeg`}
          alt="Handwoven Textiles"
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* Description Section */}
      <div className="w-full bg-gray-100 py-12 px-6 md:px-16 lg:px-20">
        <h6 className="font-serif">
        &nbsp;&nbsp;&nbsp;&nbsp;Bukidnon’s ceramics and pottery traditions showcase the rich craftsmanship and deep cultural connections of its indigenous communities. Using locally sourced clay, artisans meticulously shape, mold, and fire a variety of handcrafted pieces, ranging from cooking pots and storage jars to decorative vessels and ritual objects. These creations often feature intricate patterns, textured finishes, and earthy tones, reflecting the natural beauty of Bukidnon’s landscapes. More than just functional items, these ceramic works hold cultural and spiritual significance—some are used in traditional ceremonies, while others serve as heirlooms passed down through generations. The pottery-making process itself is a testament to sustainability and time-honored techniques, ensuring that each piece embodies both history and artistry. With every handcrafted jar, pot, or ornamental piece, Bukidnon’s pottery tradition continues to preserve indigenous identity while adapting to modern creative expressions.
        </h6>
        

      </div>


      {/* nine Section */}
      <div className="w-full bg-white text-black py-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">
            FESTIVE & RITUAL COSTUMES
        </h2>
        <div className="w-30 h-1 bg-black mx-auto mt-2"></div>
      </div>

      {/* Third Section - Image */}
      <div className="w-full">
        <img
          src={`${BACKEND_URL}/media/articrafts/festive.png`}
          alt="Handwoven Textiles"
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* Description Section */}
      <div className="w-full bg-gray-100 py-12 px-6 md:px-16 lg:px-20">
        <h6 className="font-serif">
         Traditional indigenous costumes in Bukidnon are a stunning representation of the region’s rich cultural heritage, embodying the artistry, identity, and traditions of its indigenous communities. These garments are often adorned with intricate beadwork, bold color combinations of red, yellow, and black, and a variety of ornaments such as anklets, earrings, necklaces, leglets, headdresses, and amulets. Each piece carries deep cultural significance, with patterns and designs reflecting the stories, beliefs, and way of life of Bukidnon’s indigenous tribes. These traditional costumes are not only worn during rituals, ceremonies, and celebrations but also serve as a visual expression of tribal identity, strength, and unity. Whether in festivals, dances, or sacred gatherings, these elaborate ensembles continue to preserve and showcase the artistic legacy of Bukidnon’s indigenous communities, keeping their customs alive for future generations.
        </h6>
        

      </div>

    </section>
  );
};

export default Articrafts;
