import React from "react";
import { motion } from "framer-motion";
import { Button } from "./button";

interface ModalProps {
    title: string;
    image1?: string; // Optional to prevent crashes
    highlight1?: string;
    image2?: string;
    highlight2?: string;
    onClose: () => void;
}

const CultureModal: React.FC<ModalProps> = ({
    title,
    image1,
    highlight1,
    image2,
    highlight2,
    onClose,
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white text-black rounded-lg p-6 w-[90%] max-w-4xl shadow-xl relative border-4 border-gray-900"
            >
                {/* Title */}
                <div className="flex justify-center items-center border-b-4 border-black pb-2">
                    <h2 className="text-3xl font-extrabold uppercase tracking-wide text-gray-900">
                        {title}
                    </h2>
                </div>

                {/* Image and Highlights */}
                <div className="overflow-y-auto max-h-[80vh] p-4 flex flex-col gap-6">
                    {image1 && (
                        <img
                            src={image1}
                            alt="Culture Image 1"
                            className="w-full h-96 object-cover rounded-lg shadow-lg"
                        />
                    )}
                    {highlight1 && (
                        <p className="text-gray-700 text-lg font-medium p-4">
                            {highlight1}
                        </p>
                    )}
                    {image2 && (
                        <img
                            src={image2}
                            alt="Culture Image 2"
                            className="w-full h-80 object-cover rounded-lg shadow-lg"
                        />
                    )}
                    {highlight2 && (
                        <p className="text-gray-700 text-lg font-medium p-4">
                            {highlight2}
                        </p>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-between border-t-4 border-black pt-2 mt-4">
                    <Button onClick={onClose} className="bg-gray-800 text-white">
                        Exit
                    </Button>
                    <Button onClick={onClose} className="bg-gray-800 text-white">
                        Next
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default CultureModal;
