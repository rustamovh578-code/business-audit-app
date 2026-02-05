import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, PieChart, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAudit } from '../context/AuditContext';

const Home = () => {
    const { setCurrentView } = useAudit();

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl w-full mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">

                {/* Text Content */}
                <div className="flex-1 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-primary mb-6">
                            Professional Audit Tool
                        </span>
                        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                            Biznesingiz uchun <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                                Marketing va Moliya Auditi
                            </span>
                        </h1>
                        <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed">
                            Muammolarni aniqlang, optimal byudjetni hisoblang va daromadingizni oshirish uchun aniq tavsiyalarni oling.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Button size="lg" onClick={() => setCurrentView('wizard')} className="group">
                                Auditni Boshlash
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Hero Visual */}
                <div className="flex-1 w-full max-w-[500px]">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <Card className="bg-black/40 backdrop-blur-2xl border-white/10 relative z-10 overflow-hidden transform md:rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
                            <div className="p-4 border-b border-white/5 flex items-center justify-between">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/20" />
                                </div>
                                <div className="text-xs text-gray-500 uppercase tracking-widest">Audit Score</div>
                            </div>
                            <div className="p-8 flex flex-col items-center">
                                <div className="w-40 h-40 rounded-full border-8 border-primary/20 flex items-center justify-center relative mb-6">
                                    <div className="absolute inset-0 rounded-full border-8 border-primary border-t-transparent animate-spin-slow rotate-45" />
                                    <span className="text-4xl font-bold">92%</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <div className="bg-white/5 rounded-lg p-3 text-center">
                                        <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                                        <div className="text-xs text-gray-400">O'sish</div>
                                        <div className="font-bold text-green-400">+24%</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3 text-center">
                                        <BarChart3 className="w-6 h-6 text-primary mx-auto mb-2" />
                                        <div className="text-xs text-gray-400">Daromad</div>
                                        <div className="font-bold text-primary">$12.5k</div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -top-8 -right-8 z-20"
                        >
                            <Card className="p-4 flex items-center gap-3 !bg-[#1c1c20]">
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                    <PieChart className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400">Samaradorlik</div>
                                    <div className="font-bold">Yuqori darajada</div>
                                </div>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Home;
