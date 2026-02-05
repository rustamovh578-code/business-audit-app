import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAudit } from '../context/AuditContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const questions = [
    { id: 'isBusinessOwner', type: 'boolean', question: 'Siz biznes egasimisiz?' },
    { id: 'hasCrm', type: 'boolean', question: 'Sizda CRM tizimi mavjudmi?' },
    { id: 'hasSalesTeam', type: 'boolean', question: "Alohida sotuv bo'limi (Menejerlar) bormi?" },
    { id: 'socialMediaStatus', type: 'select', question: 'Ijtimoiy tarmoqlaringiz holati? (Upakovka)', options: ['bad', 'average', 'good', 'excellent'] },
    { id: 'businessNiche', type: 'text', question: 'Biznesingiz qaysi sohada?' },
    { id: 'adPlatform', type: 'text', question: 'Asosiy reklama platformangiz?' },
    { id: 'revenueGoal', type: 'number', question: 'Oylik DAROMAD maqsadingiz? ($ da)' },
    { id: 'averageCheck', type: 'number', question: "O'rtacha chek qancha? ($ da)" },
    { id: 'conversionRate', type: 'number', question: 'Sotuv konversiyasi necha foiz?' },
];

const Wizard = () => {
    const { data, updateData, currentStep, nextStep, prevStep, setCurrentView } = useAudit();
    const [inputValue, setInputValue] = useState('');

    const currentQuestion = questions[currentStep];
    const isLastStep = currentStep === questions.length - 1;

    // Sync input value with context when step changes
    useEffect(() => {
        if (!currentQuestion) return;
        const val = data[currentQuestion.id as keyof typeof data];

        if (currentQuestion.type === 'number' && val === 0) {
            setInputValue('');
        } else {
            setInputValue(val !== null && val !== undefined ? String(val) : '');
        }
    }, [currentStep, currentQuestion, data]);

    const handleNext = () => {
        // Validate
        if (!inputValue && currentQuestion.type !== 'boolean') return;

        // Save data
        let val: any = inputValue;
        if (currentQuestion.type === 'number') val = Number(inputValue);

        // For boolean, we handle it immediately on click usually, but if using Next button:
        if (currentQuestion.type === 'boolean') {
            // usually handled by option buttons, but if we are here via Next?
            // Let's assume boolean questions auto-advance or require selection first.
        }

        updateData({ [currentQuestion.id]: val });

        if (isLastStep) {
            setCurrentView('report');
        } else {
            nextStep();
        }
    };

    const handleOptionSelect = (val: any) => {
        updateData({ [currentQuestion.id]: val });
        if (isLastStep) {
            setCurrentView('report');
        } else {
            setTimeout(() => nextStep(), 200); // Slight delay for visual feedback
        }
    };

    if (!currentQuestion) return null;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep) / questions.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            <div className="absolute inset-0 bg-background z-[-1]" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

            <Card className="max-w-xl w-full relative z-10 min-h-[400px] flex flex-col justify-between">
                <div className="mb-8">
                    <Button variant="ghost" size="sm" onClick={() => currentStep > 0 ? prevStep() : setCurrentView('home')} className="mb-4 -ml-2 text-gray-400">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Orqaga
                    </Button>

                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="text-sm text-primary mb-2 font-medium">{currentStep + 1}-qadam (Jami {questions.length})</div>
                        <h2 className="text-3xl font-bold mb-8">{currentQuestion.question}</h2>

                        {currentQuestion.type === 'boolean' && (
                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    variant="secondary"
                                    className="h-32 text-xl hover:border-primary hover:bg-primary/10"
                                    onClick={() => handleOptionSelect(true)}
                                >
                                    Ha
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="h-32 text-xl hover:border-primary hover:bg-primary/10"
                                    onClick={() => handleOptionSelect(false)}
                                >
                                    Yo'q
                                </Button>
                            </div>
                        )}

                        {currentQuestion.type === 'select' && (
                            <div className="grid grid-cols-1 gap-3">
                                {currentQuestion.options?.map((opt) => {
                                    const labels: Record<string, string> = {
                                        'bad': 'Yomon',
                                        'average': "O'rtacha",
                                        'good': 'Yaxshi',
                                        'excellent': "A'lo"
                                    };
                                    return (
                                        <Button
                                            key={opt}
                                            variant="secondary"
                                            className="h-16 justify-between px-6 hover:border-primary hover:bg-primary/10 capitalize text-lg"
                                            onClick={() => handleOptionSelect(opt)}
                                        >
                                            {labels[opt] || opt}
                                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                                        </Button>
                                    );
                                })}
                            </div>
                        )}

                        {(currentQuestion.type === 'text' || currentQuestion.type === 'number') && (
                            <div className="space-y-6">
                                <Input
                                    autoFocus
                                    type={currentQuestion.type}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                                    placeholder="Javobingizni yozing..."
                                    className="text-xl py-4"
                                />
                                <Button onClick={handleNext} className="w-full" disabled={!inputValue}>
                                    {isLastStep ? 'Auditni Yakunlash' : 'Keyingi Savol'}
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </div>
            </Card>
        </div>
    );
};

export default Wizard;
