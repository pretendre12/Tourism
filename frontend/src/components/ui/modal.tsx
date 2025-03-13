import React from "react";
import { motion } from "framer-motion";

interface ModalProps {
    title: string;
    images?: string[]; // Make images optional
    children: React.ReactNode;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, images = [], children, onClose }) => {
    return (
        <div className="overflow-auto fixed inset-0 bg-opacity-70 flex bg-black/50 backdrop-blur-md items-center justify-center z-50">
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white text-black rounded-lg p-6 w-[90%] max-w-4xl shadow-xl relative border-4 border-gray-900"
            >
                {/* Image Collage */}
                {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        {images.map((image, index) => (
                            <img key={index} src={image} alt={`Image ${index + 1}`} className="w-full h-40 object-cover rounded-lg" />
                        ))}
                    </div>
                )}
                
                {/* Title */}
                <div className="flex justify-center items-center border-b-4 border-black pb-2">
                    <h2 className="text-3xl font-extrabold uppercase tracking-wide text-gray-900">{title}</h2>
                </div>
                
                {/* Content */}
                <div className="overflow-y-auto max-h-[80vh] p-4">
                    {children}
                </div>
                
                {/* Buttons */}
                <div className="flex justify-between items-center border-t-4 border-black pt-2 mt-4">
                    <button onClick={onClose} className="bg-gray-800 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-gray-700">
                        Exit
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Modal;
