import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;  // ✅ Accept className as a prop
}

export const Card: React.FC<CardProps> = ({ children, className }) => (
    <div className={`rounded-2xl shadow-lg bg-white p-4 ${className}`}>
        {children}
    </div>
);

export const CardContent: React.FC<CardProps> = ({ children, className }) => (
    <div className={`p-4 ${className}`}>
        {children}
    </div>
);
