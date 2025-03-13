import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Loader from './Loader';
import Navbar from "../components/Navbar";
import Modal from "../components/ui/modal";

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
            <header className="relative h-96 pb-4 overflow-hidden"> 
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
                            <p className="text-gray-600 mb-4 leading-relaxed text-justify">
                                {culture.description}
                            </p>
                            <Button onClick={() => setSelectedCulture(culture)} className="bg-gray-800 text-white">Learn More</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {selectedCulture && (
            <div className="max-h-[70vh] overflow-auto ">
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
        </div>
    );
};

export default Culture;
