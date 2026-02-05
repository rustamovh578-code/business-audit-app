import React from 'react';
import { cn } from './Button';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input: React.FC<InputProps> = ({ className, label, ...props }) => {
    return (
        <div className="space-y-2 w-full">
            {label && <label className="text-sm font-medium text-gray-400 ml-1">{label}</label>}
            <input
                className={cn(
                    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500",
                    "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200",
                    className
                )}
                {...props}
            />
        </div>
    );
};
