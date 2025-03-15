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
            <p className="text-center mb-8">
                From must-visit attractions to local delicacies, indigenous culture, and travel tips—our Bukidnon FAQs cover everything you need to know for an unforgettable adventure in the 'Food Basket of Mindanao!'
            </p>

            {/* FAQ 1 */}
            <div className="mb-4">
                <button
                    className="w-full text-left p-4 border-2 border-black rounded-md flex justify-between items-center"
                    onClick={() => toggleFAQ(1)}
                >
                    What is Bukidnon known for?
                    <span className="text-xl">{openIndex === 1 ? '⇈' : '⇊'}</span>
                </button>
                {openIndex === 1 && (
                    <div className="bg-white p-4 rounded-md shadow-md mt-2" style={{ whiteSpace: 'pre-line' }}>
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
                    <span className="text-xl">{openIndex === 2 ? '⇈' : '⇊'}</span>
                </button>
                {openIndex === 2 && (
                    <div className="bg-white p-4 rounded-md shadow-md mt-2" style={{ whiteSpace: 'pre-line' }}>
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

            {/* FAQ 3 */}
            <div className="mb-4">
                <button
                    className="w-full text-left p-4 border-2 border-black rounded-md flex justify-between items-center"
                    onClick={() => toggleFAQ(3)}
                >
                    How do I get to Bukidnon?
                    <span className="text-xl">{openIndex === 3 ? '⇈' : '⇊'}</span>
                </button>
                {openIndex === 3 && (
                    <div className="bg-white p-4 rounded-md shadow-md mt-2" style={{ whiteSpace: 'pre-line' }}>
                        By Air: The nearest airport is Laguindingan Airport (Cagayan de Oro). From there, take a bus or van to Bukidnon.
                        <br />By Land: Buses from Cagayan de Oro, Davao, or other Mindanao cities connect to Malaybalay, the capital of Bukidnon.
                    </div>
                )}
            </div>

            {/* FAQ 4 */}
            <div className="mb-4">
                <button
                    className="w-full text-left p-4 border-2 border-black rounded-md flex justify-between items-center"
                    onClick={() => toggleFAQ(4)}
                >
                    The best time to visit is from December to May, when the weather is cooler and drier. If you want to witness the Kaamulan Festival, visit between March and April.
                    <span className="text-xl">{openIndex === 4 ? '⇈' : '⇊'}</span>
                </button>
                {openIndex === 4 && (
                    <div className="bg-white p-4 rounded-md shadow-md mt-2" style={{ whiteSpace: 'pre-line' }}>
                        By Air: The nearest airport is Laguindingan Airport (Cagayan de Oro). From there, take a bus or van to Bukidnon.

                        <br />By Land: Buses from Cagayan de Oro, Davao, or other Mindanao cities connect to Malaybalay, the capital of Bukidnon.
                    </div>
                )}
            </div>

            {/* FAQ 5 */}
            <div className="mb-4">
                <button
                    className="w-full text-left p-4 border-2 border-black rounded-md flex justify-between items-center"
                    onClick={() => toggleFAQ(5)}
                >
                    Is Bukidnon safe for tourists?
                    <span className="text-xl">{openIndex === 5 ? '⇈' : '⇊'}</span>
                </button>
                {openIndex === 5 && (
                    <div className="bg-white p-4 rounded-md shadow-md mt-2" style={{ whiteSpace: 'pre-line' }}>
                        Yes, Bukidnon is generally safe for tourists. However, like any travel destination, it's best to stay updated on local advisories, avoid remote areas at night, and follow basic safety precautions.
                    </div>
                )}
            </div>

            {/* FAQ 6 */}
            <div className="mb-4">
                <button
                    className="w-full text-left p-4 border-2 border-black rounded-md flex justify-between items-center"
                    onClick={() => toggleFAQ(6)}
                >
                    What activities can I do in Bukidnon?
                    <span className="text-xl">{openIndex === 6 ? '⇈' : '⇊'}</span>
                </button>
                {openIndex === 6 && (
                    <div className="bg-white p-4 rounded-md shadow-md mt-2" style={{ whiteSpace: 'pre-line' }}>
                        Aside from outdoor adventures like hiking and swimming, Bukidnon offers ATV rides in Dahilayan, cultural experiences with indigenous communities, coffee farm tours, and spiritual retreats at monasteries. Visitors can also explore scenic farm tours for a taste of fresh local produce.
                    </div>
                )}
            </div>

            {/* FAQ 7 */}
            <div className="mb-4">
                <button
                    className="w-full text-left p-4 border-2 border-black rounded-md flex justify-between items-center"
                    onClick={() => toggleFAQ(7)}
                >
                    Is Bukidnon a good destination for adventure seekers?
                    <span className="text-xl">{openIndex === 7 ? '⇈' : '⇊'}</span>
                </button>
                {openIndex === 7 && (
                    <div className="bg-white p-4 rounded-md shadow-md mt-2" style={{ whiteSpace: 'pre-line' }}>
                        Yes! Bukidnon offers thrilling adventures like zip-lining, ATV rides, and mountain climbing, making it a great place for adrenaline junkies.
                    </div>
                )}
            </div>

            {/* FAQ 8 */}
            <div className="mb-4">
                <button
                    className="w-full text-left p-4 border-2 border-black rounded-md flex justify-between items-center"
                    onClick={() => toggleFAQ(8)}
                >
                    Can I experience indigenous culture in Bukidnon?
                    <span className="text-xl">{openIndex === 8 ? '⇈' : '⇊'}</span>
                </button>
                {openIndex === 8 && (
                    <div className="bg-white p-4 rounded-md shadow-md mt-2" style={{ whiteSpace: 'pre-line' }}>
                        Absolutely! The Kaamulan Festival is the best time to witness traditional dances, rituals, and indigenous customs of Bukidnon’s seven tribes. You can also visit local communities to learn about their way of life.
                    </div>
                )}
            </div>

            {/* FAQ 9 */}
            <div className="mb-4">
                <button
                    className="w-full text-left p-4 border-2 border-black rounded-md flex justify-between items-center"
                    onClick={() => toggleFAQ(9)}
                >
                    What souvenirs can I buy in Bukidnon?
                    <span className="text-xl">{openIndex === 9 ? '⇈' : '⇊'}</span>
                </button>
                {openIndex === 9 && (
                    <div className="bg-white p-4 rounded-md shadow-md mt-2" style={{ whiteSpace: 'pre-line' }}>
                        Handwoven products and traditional crafts from indigenous tribes
                        <br />Fresh pineapples and pineapple-based products
                        <br />Local coffee and native delicacies
                        <br />Handmade jewelry and woodcrafts
                    </div>
                )}
            </div>

        </div>
    );
};

export default Facts;
