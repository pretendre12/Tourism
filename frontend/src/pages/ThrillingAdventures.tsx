import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Modal from '../components/ui/modal';
import Loader from './Loader';
import "../pages/Destinations.css";
import Navbar from "../components/Navbar";

const BACKEND_URL = "https://probable-tribble-wrxrvp4jjwgjf9j57-8000.app.github.dev";

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
            {/* Hero Section */}
            <header className="relative h-96 pb-4"> 
                <img
                    src={`${BACKEND_URL}/media/destinations/dahilayan11.jpeg`}
                    alt="Bukidnon Landscape"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h1 className="text-8xl font-serif">Conquer the Wild!</h1>
                <h6 className="text-4xl font-serif">Chase the <span className="font-bold text-yellow-300">Wonder</span> </h6>

                </div>
            </header>

            {/* Navbar at Bottom */}
                  <div>
                    <Navbar />
                  </div>

        <div className="p-6 max-w-6xl mx-auto">
            {adventures.map((adventure) => (
                <Card key={adventure.id} className="mb-8 shadow-lg rounded-2xl bg-gray-2 dark:bg-gray-100 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    {/* Image on the left */}
                    <img
                        src={adventure.image1.startsWith("http") ? adventure.image1 : `${BACKEND_URL}${adventure.image1}`}
                        alt={adventure.title}
                        className="w-full h-64 object-cover rounded-lg"
                    />
                    {/* Text on the right */}
                    <CardContent className="p-6">
                        <h2 className="font-serif text-2xl font-bold mb-2 dark:text-black-300">{adventure.title}</h2>
                        <p className="font-serif text-gray-700 dark:text-gray-300 pb-4">{adventure.description}</p>
                        <Button onClick={() => setSelectedAdventure(adventure)} className="mt-4 bg-blue-600 text-white">Read More</Button>
                    </CardContent>
                </div>
            </Card>
            ))}

            {/* Read More Modal */}
            {selectedAdventure && (
                <Modal title={selectedAdventure.title} onClose={() => setSelectedAdventure(null)}>
                    <div className="flex flex-col lg:flex-row gap-6 max-w-screen-2xl mx-auto px-5">
                        {/* Large Left Image */}
                        <div className="lg:w-2/3">
                            {selectedAdventure.image1 && (
                                <img
                                    src={selectedAdventure.image1.startsWith("http") ? selectedAdventure.image1 : `${BACKEND_URL}/${selectedAdventure.image1}`}
                                    alt={selectedAdventure.title}
                                    className="w-full h-[500px] object-cover rounded-lg shadow-lg"
                                />
                            )}
                        </div>
                        {/* Two Small Right Images */}
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
                    </div>
                    {/* Highlights Section */}
                    <p className="font-serif whitespace-pre-line text-gray-700 dark:text-gray-300 mt-4">{selectedAdventure.highlights}</p>
                </Modal>
            )}
        </div>
    </div>
    );
};

export default ThrillingAdventures;
