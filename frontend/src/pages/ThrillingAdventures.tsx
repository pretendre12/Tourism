import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Modal from '../components/ui/modal';
import Loader from './Loader';
import "../pages/Destinations.css";

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
        <div className="p-6 max-w-6xl mx-auto">
            {adventures.map((adventure) => (
                <Card key={adventure.id} className="mb-8 shadow-lg rounded-2xl bg-gray-200 dark:bg-gray-800 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    {/* Image on the left */}
                    <img
                        src={adventure.image1.startsWith("http") ? adventure.image1 : `${BACKEND_URL}${adventure.image1}`}
                        alt={adventure.title}
                        className="w-full h-64 object-cover rounded-lg"
                    />
                    {/* Text on the right */}
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">{adventure.title}</h2>
                        <p className="text-gray-700 dark:text-gray-300">{adventure.description}</p>
                        <Button onClick={() => setSelectedAdventure(adventure)} className="mt-4 bg-blue-600 text-white">Read More</Button>
                    </CardContent>
                </div>
            </Card>
            
            ))}

            {/* Read More Modal */}
            {selectedAdventure && (
                <Modal title={selectedAdventure.title} onClose={() => setSelectedAdventure(null)}>
                    <div className="p-4">
                        <img
                            src={selectedAdventure.image1.startsWith("http") ? selectedAdventure.image1 : `${BACKEND_URL}${selectedAdventure.image1}`}
                            alt="Adventure Image 1"
                            className="w-full rounded-lg mb-4"
                        />
                        <img
                            src={selectedAdventure.image2.startsWith("http") ? selectedAdventure.image2 : `${BACKEND_URL}${selectedAdventure.image2}`}
                            alt="Adventure Image 2"
                            className="w-full rounded-lg mb-4"
                        />
                        <img
                            src={selectedAdventure.image3.startsWith("http") ? selectedAdventure.image3 : `${BACKEND_URL}${selectedAdventure.image3}`}
                            alt="Adventure Image 3"
                            className="w-full rounded-lg mb-4"
                        />
                        <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">{selectedAdventure.highlights}</p>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default ThrillingAdventures;
