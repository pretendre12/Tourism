import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';

export default function Modal({ title, children, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white dark:bg-black text-black dark:text-white rounded-2xl p-6 w-full max-w-2xl shadow-lg relative"
            >
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <div className="overflow-y-auto max-h-[80vh]">
                    {children}
                </div>
                <Button onClick={onClose} className="absolute top-4 right-4">Close</Button>
            </motion.div>
        </div>
    );
}
