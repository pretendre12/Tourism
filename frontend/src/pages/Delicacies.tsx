import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

interface Delicacy {
  id: number;
  title: string;
  description: string;
  image1?: string;
}

const BACKEND_URL = "https://effective-train-4p56jp54x67h7v9p-8000.app.github.dev/";

const Delicacies = () => {
  const [delicacies, setDelicacies] = useState<Delicacy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/delicacies/`)
      .then((response) => {
        setDelicacies(response.data);
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
    <div>
      <div className="relative w-full overflow-hidden shadow-lg">
        <img
          src={`${BACKEND_URL}/media/delicacies/pineaple.jpeg`}
          alt="Traditional Artifacts & Crafts"
          className="w-full h-[500px] object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0 flex flex-col justify-center px-5 text-center"
        >
          <h2 className="text-white text-4xl md:text-5xl ">
            <span className="font-serif font-extrabold"> Bukidnon’s Finest</span>
            <span className="text-yellow-300 italic"> Delicacies</span>
          </h2>
        </motion.div>
      </div>

      <div>
        <Navbar />
      </div>

      <div className="w-full min-h-screen bg-white px-6 py-5">
        <div className="max-w-screen-xl mx-auto space-y-5">
          {delicacies.map((delicacy, index) => (
            <motion.div
              key={delicacy.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.03, rotate: 0 }}
              className="flex flex-col md:flex-row items-center bg-gradient-to-br from-gray-300 to-gray-100 rounded-lg shadow-xl overflow-hidden p-6 border border-gray-200"
            >
              <div className="w-full md:w-1/3 flex justify-center">
                <img
                  src={
                    delicacy.image1 && delicacy.image1.startsWith("http")
                      ? delicacy.image1
                      : `${BACKEND_URL}/${delicacy.image1 || "default-image.jpg"}`
                  }
                  alt={delicacy.title}
                  className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-md"
                />
              </div>

              <div className="w-full md:w-2/3 mt-6 md:mt-0 md:ml-6 text-center md:text-left">
                <h2 className="text-4xl font-serif font-bold">{delicacy.title}</h2>
                <h6 className="text-gray-700 font-serif mt-2 leading-relaxed"> &nbsp;&nbsp;&nbsp;&nbsp;{delicacy.description}</h6>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Delicacies;
