import React from "react";
import { motion } from "framer-motion";

interface ModalProps {
    title: string;
    images?: string[]; // Optional images array
    children: React.ReactNode;
    onClose: () => void;
}

const dining : React.FC<ModalProps> = ({ title, images = [], children, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white text-black rounded-lg p-6 w-[95%] max-w-5xl shadow-2xl relative border-4 border-gray-900"
            >
                {/* Image Layout */}
                {images.length >= 3 && (
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        {/* Left Images (Image 3 & Image 4) */}
                        <div className="flex flex-col gap-2">
                            <img 
                                src={images[1]} 
                                alt="Image 3" 
                                className="w-full h-40 object-cover rounded-lg border border-gray-400"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/150";
                                }}
                            />
                            <img 
                                src={images[2]} 
                                alt="Image 4" 
                                className="w-full h-40 object-cover rounded-lg border border-gray-400"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/150";
                                }}
                            />
                        </div>

                        {/* Right Image (Image 2 - Larger) */}
                        <img 
                            src={images[0]} 
                            alt="Main Image" 
                            className="col-span-2 w-full h-[320px] object-cover rounded-lg border border-gray-400"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/300";
                            }}
                        />
                    </div>
                )}

                {/* Title */}
                <div className="text-center text-3xl font-extrabold uppercase tracking-wide text-gray-900 mb-4">
                    {title}
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[60vh] px-4">
                    {children}
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center border-t-4 border-black pt-2 mt-4">
                    <button 
                        onClick={onClose} 
                        className="bg-gray-800 text-white px-8 py-2 rounded-lg shadow-md hover:bg-gray-700"
                    >
                        Exit
                    </button>
                    <button 
                        className="bg-gray-200 text-black px-8 py-2 rounded-lg shadow-md hover:bg-gray-300"
                    >
                        Next
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default dining;
