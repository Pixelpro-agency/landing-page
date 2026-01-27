'use client';
import React from 'react';
import { Building2, Zap, Landmark, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../lib/i18n/config';

export default function UseCasesSection() {
    const { t } = useTranslation();

    const industryCases = [
        {
            id: "governments",
            icon: <Building2 className="w-5 h-5" />,
            items: ["stability", "protection", "crisis"]
        },
        {
            id: "utilities",
            icon: <Zap className="w-5 h-5" />,
            items: ["forecasting", "vulnerability", "outage"]
        },
        {
            id: "financial",
            icon: <Landmark className="w-5 h-5" />,
            items: ["underwriting", "portfolio", "sovereign"]
        },
        {
            id: "assetManager",
            icon: <Activity className="w-5 h-5" />,
            items: ["maintenance", "energy", "uptime"]
        }
    ];

    return (
        <>
            {/* ---------------------------------------------------------------------------
               SECTION 1: INDUSTRY (Grid / Dashboard / Neutral) 
               --------------------------------------------------------------------------- */}
            <section className="py-32 bg-[#02040A] border-t border-white/5 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-20 text-center"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight uppercase">{t('useCases.title')}</h2>
                        <p className="text-gray-400">{t('useCases.subtitle')}</p>
                    </motion.div>

                    {/* Spaced Grid Layout matching Core Capabilities */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {industryCases.map((uc, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                whileHover={{ y: -5, borderColor: 'rgba(59,130,246,0.5)' }}
                                className="group relative bg-white/5 border border-white/10 p-6 rounded-sm overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="relative z-10 flex flex-col items-center text-center h-full w-full">
                                    <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide min-h-[56px] flex items-center justify-center">
                                        {t(`useCases.${uc.id}`)}
                                    </h3>

                                    <ul className="space-y-3 flex flex-col items-center mb-6 min-h-[100px]">
                                        {uc.items.map((itemKey, i) => (
                                            <li key={i} className="flex items-center text-gray-400 text-xs">
                                                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-blue-500 transition-colors flex-shrink-0"></div>
                                                {t(`useCases.items.${itemKey}`)}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-auto pt-4 border-t border-dashed border-white/10 flex justify-center items-center opacity-30 group-hover:opacity-100 transition-opacity w-full h-10">
                                        <span className="text-[10px] font-mono text-gray-500">
                                            {t(`useCases.${uc.id}`).toUpperCase().replace(' ', '_')}
                                        </span>
                                    </div>
                                </div>

                                {/* Corner accents */}
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


        </>
    );
}
