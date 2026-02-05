import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAudit } from '../context/AuditContext';
import { calculateAuditResults } from '../utils/auditLogic';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { AlertTriangle, CheckCircle2, DollarSign, Users, Target, RefreshCw, TrendingUp } from 'lucide-react';

const Report = () => {
    const { data, resetAudit } = useAudit();

    const results = useMemo(() => calculateAuditResults(data), [data]);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const containerVariants = {
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8 relative overflow-x-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                className="max-w-6xl mx-auto relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={cardVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Audit Hisoboti</h1>
                        <p className="text-gray-400">Yaratilgan vaqt: {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="secondary" onClick={window.print}>PDF Saqlash</Button>
                        <Button onClick={resetAudit} className="bg-white/10 hover:bg-white/20 text-white">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Yangi Audit
                        </Button>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Health Score */}
                    <motion.div variants={cardVariants} className="md:col-span-1">
                        <Card className="h-full flex flex-col items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                            <span className="text-gray-400 text-sm uppercase tracking-wider mb-4 relative z-10">Biznes Salomatlik Ko'rsatkichi</span>

                            <div className="relative z-10 w-48 h-48 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                                    <motion.circle
                                        cx="96" cy="96" r="88"
                                        stroke="currentColor" strokeWidth="12"
                                        fill="transparent"
                                        className={results.healthScore > 80 ? "text-green-500" : results.healthScore > 50 ? "text-yellow-500" : "text-red-500"}
                                        strokeDasharray={2 * Math.PI * 88}
                                        initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                                        animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - results.healthScore / 100) }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-5xl font-bold">{results.healthScore}</span>
                                    <span className="text-sm text-gray-400">/ 100</span>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* KPI Summary */}
                    <motion.div variants={cardVariants} className="md:col-span-2 grid grid-cols-2 gap-4">
                        <Card className="flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-green-500/20 rounded-lg text-green-500"><Target className="w-6 h-6" /></div>
                                <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">Maqsad</span>
                            </div>
                            <div>
                                <div className="text-2xl font-bold mb-1">${data.revenueGoal?.toLocaleString()}</div>
                                <div className="text-sm text-gray-400">Oylik Daromad Maqsadi</div>
                            </div>
                        </Card>
                        <Card className="flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-500"><Users className="w-6 h-6" /></div>
                                <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">Hajm</span>
                            </div>
                            <div>
                                <div className="text-2xl font-bold mb-1">{results.clientsNeeded.toLocaleString()}</div>
                                <div className="text-sm text-gray-400">Kerakli Mijozlar</div>
                            </div>
                        </Card>
                        <Card className="flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-500"><TrendingUp className="w-6 h-6" /></div>
                                <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">Funnel</span>
                            </div>
                            <div>
                                <div className="text-2xl font-bold mb-1">{results.leadsNeeded.toLocaleString()}</div>
                                <div className="text-sm text-gray-400">Kerakli Lidlar</div>
                            </div>
                        </Card>
                        <Card className="flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-500"><DollarSign className="w-6 h-6" /></div>
                                <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">Byudjet</span>
                            </div>
                            <div>
                                <div className="text-2xl font-bold mb-1">${results.optimalBudget.toLocaleString()}</div>
                                <div className="text-sm text-gray-400">Taxminiy Byudjet</div>
                            </div>
                        </Card>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Budget Analysis */}
                    <motion.div variants={cardVariants}>
                        <Card className="h-full">
                            <h3 className="text-xl font-bold mb-6 flex items-center">
                                <DollarSign className="w-5 h-5 mr-2 text-primary" />
                                Byudjet Tahlili
                            </h3>

                            <div className="space-y-6">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex justify-between items-center relative z-10">
                                        <div>
                                            <div className="text-sm text-gray-400 mb-1">Minimal Boshlang'ich Byudjet</div>
                                            <div className="text-2xl font-bold">${results.minBudget.toLocaleString()}</div>
                                        </div>
                                        <div className="text-right text-xs text-gray-500">
                                            $0.8 CPL asosida
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-white/5 border border-primary/30 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-primary/10" />
                                    <div className="flex justify-between items-center relative z-10">
                                        <div>
                                            <div className="text-sm text-primary mb-1">Optimal Byudjet</div>
                                            <div className="text-2xl font-bold text-white">${results.optimalBudget.toLocaleString()}</div>
                                        </div>
                                        <div className="text-right text-xs text-gray-400">
                                            $1.5 CPL asosida
                                        </div>
                                    </div>
                                </div>

                                {results.lostBudget > 0 && (
                                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start">
                                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-1" />
                                        <div>
                                            <div className="text-red-400 font-medium mb-1">Byudjet Yo'qotish Ogohlantirishi</div>
                                            <p className="text-sm text-gray-400">
                                                CRM yoki Sotuv bo'limi yo'qligi sababli, har oy taxminan <span className="text-white font-bold">${results.lostBudget.toLocaleString()}</span> marketing byudjetini samaradorlik pastligi tufayli yo'qotishingiz mumkin.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </motion.div>

                    {/* Recommendations */}
                    <motion.div variants={cardVariants}>
                        <Card className="h-full">
                            <h3 className="text-xl font-bold mb-6 flex items-center">
                                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                                Asosiy Tavsiyalar
                            </h3>

                            <div className="space-y-4">
                                {results.recommendations.length > 0 ? results.recommendations.map((rec, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + i * 0.1 }}
                                        className="p-4 rounded-xl bg-white/5 border border-white/5 flex gap-3"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0 mt-0.5">
                                            {i + 1}
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed">{rec}</p>
                                    </motion.div>
                                )) : (
                                    <div className="text-center py-8 text-gray-500">
                                        Ajoyib! Biznesingiz infratuzilmasi mustahkam.
                                    </div>
                                )}

                                {data.socialMediaStatus === 'excellent' && (
                                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                                        <p className="text-green-400 text-sm">✅ Ijtimoiy tarmoqlar a'lo darajada. Bu reklama narxini sezilarli pasaytiradi.</p>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </motion.div>
                </div>

            </motion.div>
        </div>
    );
};

export default Report;
