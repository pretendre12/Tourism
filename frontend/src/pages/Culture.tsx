import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Loader from './Loader';
import Navbar from "../components/Navbar";
import Modal from "../components/ui/culture-modal";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const BACKEND_URL = "https://probable-tribble-wrxrvp4jjwgjf9j57-8000.app.github.dev";

interface Culture {
    id: number;
    title: string;
    description: string;
    image1: string;
    image2: string;
    highlights1: string;
    highlights2: string;
}

const Culture = () => {
    const [cultures, setCultures] = useState<Culture[]>([]);
    const [selectedCulture, setSelectedCulture] = useState<Culture | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/culture/`)
            .then((response) => {
                setCultures(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError("Failed to load culture data");
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
                if (scrollRef.current.scrollLeft + scrollRef.current.clientWidth >= scrollRef.current.scrollWidth) {
                    scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
                }
            }
        }, 3000); // Moves every 3 seconds

        return () => clearInterval(interval);
    }, []);


    // Intersection Observer
  const { ref: DiningRef, inView: DiningInView} = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: stayRef, inView: stayInView } = useInView({ triggerOnce: true, threshold: 0.2 });



    if (loading) return <Loader />;
    if (error) return <p className="text-center text-xl text-red-500 mt-10">Error: {error}</p>;

    return (
        <div>
            <header className="relative h-96 pb-4 overflow-hidden"> 
                <img
                    src={`${BACKEND_URL}/media/destinations/highlands.jpeg`}
                    alt="Cultural Heritage"
                    className="w-full h-full object-cover blur-[2px] bg-black/10"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-center text-white ml-50 mt-[-50px]">
                    <h1 className="text-6xl font-serif font-bold [text-shadow:2px_2px_0px_black, -2px_-2px_0px_black, -2px_2px_0px_black, 2px_-2px_0px_black]">
                        Vibrant <span className="font-bold text-yellow-300">Culture</span> overflow
                    </h1>
                    <h6 className="text-5xl font-serif font-bold [text-shadow:2px_2px_0px_black, -2px_-2px_0px_black, -2px_2px_0px_black, 2px_-2px_0px_black]">
                        Bukidnon Highlands
                    </h6>
                </div>

            </header>

            <Navbar />

            <h2 className="text-4xl font-bold text-center mt-10">The Indigenous Legacy</h2>

            <div className="relative max-w-7xl mx-auto p-6">
                <div ref={scrollRef} className="flex space-x-6 overflow-x-auto scrollbar-hide p-4">
                    {cultures.map((culture) => (
                        <Card key={culture.id} className="shadow-lg rounded-lg overflow-hidden bg-gray-100 flex-none w-80">
                            <div className="bg-gray-700 text-white p-4">
                                <h2 className="text-2xl font-bold">{culture.title}</h2>
                            </div>
                            <img
                                src={`${BACKEND_URL}${culture.image1}`}
                                alt={culture.title}
                                className="w-full h-56 object-cover"
                            />
                            <CardContent className="p-4">
                                <p className="text-gray-600 mb-4 leading-relaxed text-justify">
                                    {culture.description}
                                </p>
                                <Button onClick={() => setSelectedCulture(culture)} className="bg-gray-800 text-white">Learn More</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {selectedCulture && (
                <div className="max-h-[70vh] overflow-auto">
                    <Modal 
                        title={selectedCulture.title.toUpperCase()} 
                        onClose={() => setSelectedCulture(null)}
                    >
                        <div className="flex justify-center items-center gap-16">
                            <img 
                                src={`${BACKEND_URL}/${selectedCulture.image1}`} 
                                alt={selectedCulture.title} 
                                className="w-1/3 h-64 object-cover rounded-lg"
                            />
                            <img 
                                src={`${BACKEND_URL}/${selectedCulture.image2}`} 
                                alt={selectedCulture.title} 
                                className="w-1/3 h-64 object-cover rounded-lg"
                            />
                        </div>
                        <p className="text-gray-800 text-lg leading-relaxed mt-4">
                            {selectedCulture.highlights1}
                        </p>
                        <p className="text-gray-800 text-lg leading-relaxed mt-4">
                            {selectedCulture.highlights2}
                        </p>
                    </Modal>
                </div>
            )}

            {/* Artifacts & Crafts */}
            <section className="relative w-screen my-6 rounded-xl overflow-hidden shadow-lg">
                <img 
                src={`${BACKEND_URL}/media/destinations/hinabol.jpeg`} 
                alt="Bukidnon Dining Spot" 
                className="w-full h-[500px] object-cover" 
                />

                <motion.div
                ref={DiningRef}
                initial={{ opacity: 0, y: -50 }} // Start from top
                animate={DiningInView ? { opacity: 1, y: 0 } : {}} // Slide down
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex flex-col justify-center items-center px-8 md:px-16"
                >
                <h2 className="tienne-black text-white text-4xl md:text-5xl font-extrabold mb-4 text-center">
                Traditional <span className="font-bold text-yellow-300">Artifacts </span>  & <span className="font-bold text-red-300">Crafts</span>
                </h2>
                <a href="https://probable-tribble-wrxrvp4jjwgjf9j57-5173.app.github.dev/articrafts">
                <button className="mt-4 bg-white text-gray-900 px-6 py-2 rounded-full shadow-lg hover:bg-yellow-400 transition">
                    Explore 
                </button>
                </a>
                </motion.div>
            </section>

            {/* Stay */}
            <section className="relative w-screen my-6 rounded-xl overflow-hidden shadow-lg">
                <img 
                    src={`${BACKEND_URL}/media/destinations/kaamlanf.jpeg`} 
                    alt="Bukidnon Traditional Dance" 
                    className="w-full h-[500px] object-cover" 
                />

                {/* Blur only at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                <motion.div
                    ref={stayRef}
                    initial={{ opacity: 0, y: 50 }} 
                    animate={stayInView ? { opacity: 1, y: 0 } : {}} 
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col justify-center px-5"
                >
                    <h2 className="text-white tienne-black text-4xl md:text-5xl font-extrabold mb-4 text-center">
                        F E S T I V A L S
                    </h2>
                    <a href="https://probable-tribble-wrxrvp4jjwgjf9j57-5173.app.github.dev/festival">
                        <button className="mt-4 bg-white text-gray-900 px-5 py-0.5 rounded-full shadow-lg hover:bg-yellow-400 transition text-lg w-fit ml-175">
                            Explore
                        </button>
                    </a>
                </motion.div>
            </section>

        </div>
    );
};

export default Culture;
