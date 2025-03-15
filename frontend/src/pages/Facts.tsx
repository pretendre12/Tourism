import React, { useState } from 'react';

const Facts: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-gray-200 p-10 rounded-lg shadow-md">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Curious about something?
            </h1>
            <h2 className="text-xl font-bold text-center mb-6">
                We've got the answers!
            </h2>
            <p className="text-center text-gray-600 mb-8">
                From must-visit attractions to local delicacies, indigenous culture, and travel tips—our Bukidnon FAQs cover everything you need to know for an unforgettable adventure in the 'Food Basket of Mindanao!'
            </p>

            {/* FAQ 1 */}
            <div className="mb-4">
                <button
                    className="w-full text-left p-4 border-2 border-black rounded-md flex justify-between items-center"
                    onClick={() => toggleFAQ(1)}
                >
                    What is Bukidnon known for?
                    <span className="text-xl">{openIndex === 1 ? '🔼' : '🔽'}</span>
                </button>
                {openIndex === 1 && (
                    <div className="bg-white p-4 rounded-md shadow-md mt-2">
                        Bukidnon is known as the <strong>"Food Basket of Mindanao"</strong> because of its vast agricultural lands producing pineapples, sugarcane, corn, and rice. It is also famous for its cool climate, beautiful mountain ranges, and indigenous culture.
                    </div>
                )}
            </div>

            {/* FAQ 2 */}
            <div className="mb-4">
                <button
                    className="w-full text-left p-4 border-2 border-black rounded-md flex justify-between items-center"
                    onClick={() => toggleFAQ(2)}
                >
                    What are the must-visit tourist attractions in Bukidnon?
                    <span className="text-xl">{openIndex === 2 ? '🔼' : '🔽'}</span>
                </button>
                {openIndex === 2 && (
                    <div className="bg-white p-4 rounded-md shadow-md mt-2">
                        <ul className="list-disc pl-5">
                            <li>Dahilayan Adventure Park (home to Asia’s longest dual zipline)</li>
                            <li>Mount Kitanglad Range Natural Park (great for trekking and biodiversity)</li>
                            <li>Kaamulan Festival (showcases indigenous culture)</li>
                            <li>Monastery of the Transfiguration (a peaceful retreat place)</li>
                            <li>Lake Apo (a scenic crater lake)</li>
                            <li>Del Monte Pineapple Plantation (one of the largest in the world)</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Facts;
