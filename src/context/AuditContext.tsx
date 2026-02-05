import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { initialAuditData } from '../types';
import type { AuditData } from '../types';

interface AuditContextType {
    data: AuditData;
    updateData: (updates: Partial<AuditData>) => void;
    currentStep: number;
    nextStep: () => void;
    prevStep: () => void;
    setStep: (step: number) => void;
    resetAudit: () => void;
    currentView: 'home' | 'wizard' | 'report';
    setCurrentView: (view: 'home' | 'wizard' | 'report') => void;
}

const AuditContext = createContext<AuditContextType | undefined>(undefined);

export const AuditProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<AuditData>(initialAuditData);
    const [currentStep, setCurrentStep] = useState(0);
    const [currentView, setCurrentView] = useState<'home' | 'wizard' | 'report'>('home');

    const updateData = (updates: Partial<AuditData>) => {
        setData((prev) => ({ ...prev, ...updates }));
    };

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => Math.max(0, prev - 1));
    const setStep = (step: number) => setCurrentStep(step);

    const resetAudit = () => {
        setData(initialAuditData);
        setCurrentStep(0);
        setCurrentView('home');
    };

    return (
        <AuditContext.Provider value={{ data, updateData, currentStep, nextStep, prevStep, setStep, resetAudit, currentView, setCurrentView }}>
            {children}
        </AuditContext.Provider>
    );
};

export const useAudit = () => {
    const context = useContext(AuditContext);
    if (context === undefined) {
        throw new Error('useAudit must be used within an AuditProvider');
    }
    return context;
};
