import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Loader from './Loader';
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const BACKEND_URL = "https://probable-tribble-wrxrvp4jjwgjf9j57-8000.app.github.dev";

interface Culture {
    id: number;
    title: string;
    description: string;
    image1: string;
    image2: string;
    highlight1: string;
    highlight2: string;
}

const Culture = () => {
    const [cultures, setCultures] = useState<Culture[]>([]);
    const [selectedCulture, setSelectedCulture] = useState<Culture | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    if (loading) return <Loader />;
    if (error) return <p className="text-center text-xl text-red-500 mt-10">Error: {error}</p>;

    return (
        <div>
            <header className="relative h-96 pb-4"> 
                <img
                    src={`${BACKEND_URL}/media/destinations/highlands.jpeg`}
                    alt="Cultural Heritage"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h1 className="text-6xl font-bold">The Indigenous Legacy</h1>
                </div>
            </header>

            <Navbar />

            <h2 className="text-4xl font-bold text-center mt-10">The Indigenous Legacy</h2>

            <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cultures.map((culture) => (
                    <Card key={culture.id} className="shadow-lg rounded-lg overflow-hidden bg-white text-center">
                        <div className="bg-gray-700 text-white p-4">
                            <h2 className="text-2xl font-bold">{culture.title}</h2>
                        </div>
                        <img
                            src={`${BACKEND_URL}${culture.image1}`}
                            alt={culture.title}
                            className="w-full h-56 object-cover"
                        />
                        <CardContent className="p-4">
                            <p className="text-gray-600 mb-4">{culture.description}</p>
                            <Button onClick={() => setSelectedCulture(culture)} className="bg-gray-800 text-white">Learn More</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {selectedCulture && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white text-black rounded-lg w-[90%] max-w-4xl shadow-xl relative border-4 border-gray-900 overflow-hidden"
                    >
                        <div className="bg-black text-white text-4xl font-bold text-center py-4">
                            {selectedCulture.title}
                        </div>
                        <div className="flex flex-col items-center gap-6 p-4">
                            <img src={`${BACKEND_URL}/${selectedCulture.image1}`} alt={selectedCulture.title} className="w-full h-72 object-cover rounded-lg border-2 border-gray-800" />
                            <p className="text-lg text-gray-800 bg-gray-100 p-4 rounded-lg shadow-md border-l-4 border-gray-900 w-full">
                                {selectedCulture.highlight1}
                            </p>
                            <img src={`${BACKEND_URL}/${selectedCulture.image2}`} alt={selectedCulture.title} className="w-full h-72 object-cover rounded-lg border-2 border-gray-800" />
                            <p className="text-lg text-gray-900 bg-gray-200 p-6 rounded-lg shadow-md border-l-8 border-gray-900 w-full">
                                {selectedCulture.highlight2}
                            </p>
                        </div>
                        <div className="flex justify-center p-4 bg-gray-100 border-t-4 border-black">
                            <button onClick={() => setSelectedCulture(null)} className="bg-gray-800 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-gray-700">
                                Exit
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Culture;
