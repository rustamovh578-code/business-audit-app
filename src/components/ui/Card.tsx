import React from 'react';
import { cn } from './Button';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ className, children, hoverEffect = false, ...props }) => {
    return (
        <div
            className={cn(
                "bg-surface/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6",
                hoverEffect && "transition-all duration-300 hover:bg-surface/80 hover:border-white/20 hover:translate-y-[-2px]",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};
