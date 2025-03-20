import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Modal from '../components/ui/modal';
import Loader from './Loader';
import { motion } from 'framer-motion';
import "../pages/Destinations.css";
import Navbar from "../components/Navbar";

const BACKEND_URL = "https://effective-train-4p56jp54x67h7v9p-8000.app.github.dev/";

interface Adventure {
    id: number;
    title: string;
    description: string;
    image1: string;
    image2: string;
    image3: string;
    highlights: string;
}

const ThrillingAdventures = () => {
    const [adventures, setAdventures] = useState<Adventure[]>([]);
    const [selectedAdventure, setSelectedAdventure] = useState<Adventure | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/thrilling-adventures`)
            .then((response) => {
                setAdventures(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError("Failed to load thrilling adventures");
                setLoading(false);
            });
    }, []);

    if (loading) return <Loader />;
    if (error) return <p className="text-center text-xl text-red-500 mt-10">Error: {error}</p>;

    return (
        <div>
            <header className="relative h-96 pb-4"> 
                <motion.img
                    src={`${BACKEND_URL}/media/destinations/dahilayan11.jpeg`}
                    alt="Bukidnon Landscape"
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <motion.h1 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-8xl font-serif"
                    >
                        Conquer the Wild!
                    </motion.h1>
                    <motion.h6 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-4xl font-serif"
                    >
                        Chase the <span className="font-bold text-yellow-300">Wonder</span>
                    </motion.h6>
                </div>
            </header>

            <div>
                <Navbar />
            </div>

            <div className="p-6 max-w-6xl mx-auto">
                {adventures.map((adventure, index) => (
                    <motion.div
                        key={adventure.id}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <Card className="mb-8 shadow-lg rounded-2xl bg-gray-200 dark:bg-gray-100 p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <img
                                    src={adventure.image1.startsWith("http") ? adventure.image1 : `${BACKEND_URL}${adventure.image1}`}
                                    alt={adventure.title}
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                                <CardContent className="p-6">
                                    <h2 className="font-serif text-2xl font-bold mb-2 dark:text-black-300">{adventure.title}</h2>
                                    <p className="font-serif text-gray-700 dark:text-gray-300 pb-4">{adventure.description}</p>
                                    <Button 
                                        onClick={() => setSelectedAdventure(adventure)} 
                                        className="mt-4 bg-blue-600 text-white"
                                    >
                                        Read More
                                    </Button>
                                </CardContent>
                            </div>
                        </Card>
                    </motion.div>
                ))}

                {selectedAdventure && (
                    <Modal title={selectedAdventure.title} onClose={() => setSelectedAdventure(null)}>
                        <motion.div
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="flex flex-col lg:flex-row gap-6 max-w-screen-2xl mx-auto px-5"
                        >
                            <div className="lg:w-2/3">
                                {selectedAdventure.image1 && (
                                    <img
                                        src={selectedAdventure.image1.startsWith("http") ? selectedAdventure.image1 : `${BACKEND_URL}/${selectedAdventure.image1}`}
                                        alt={selectedAdventure.title}
                                        className="w-full h-[500px] object-cover rounded-lg shadow-lg"
                                    />
                                )}
                            </div>
                            <div className="lg:w-1/3 flex flex-col gap-4">
                                {selectedAdventure.image2 && (
                                    <img
                                        src={selectedAdventure.image2.startsWith("http") ? selectedAdventure.image2 : `${BACKEND_URL}/${selectedAdventure.image2}`}
                                        alt={selectedAdventure.title}
                                        className="w-full h-[240px] object-cover rounded-lg shadow-md"
                                    />
                                )}
                                {selectedAdventure.image3 && (
                                    <img
                                        src={selectedAdventure.image3.startsWith("http") ? selectedAdventure.image3 : `${BACKEND_URL}/${selectedAdventure.image3}`}
                                        alt={selectedAdventure.title}
                                        className="w-full h-[240px] object-cover rounded-lg shadow-md"
                                    />
                                )}
                            </div>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="font-serif whitespace-pre-line text-gray-700 dark:text-gray-300 mt-4"
                        >
                            {selectedAdventure.highlights}
                        </motion.p>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default ThrillingAdventures;
