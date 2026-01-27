'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../lib/i18n/config';

const cardIds = ["ingest", "risk", "mapping", "incident"];

export default function PlatformSection() {
    const { t } = useTranslation();

    return (
        <section className="py-32 bg-[#02040A] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 text-center max-w-3xl mx-auto"
                >
                    <h2 className="text-sm font-mono text-blue-500 uppercase tracking-widest mb-4">{t('platform.badge')}</h2>
                    <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight uppercase">
                        {t('platform.title')}
                    </h3>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cardIds.map((id, idx) => (
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
                                <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-wide min-h-[56px] flex items-center justify-center">
                                    {t(`platform.cards.${id}.title`)}
                                </h4>

                                <div className="mb-4">
                                    <span className="text-[10px] font-mono text-gray-400 border border-white/5 px-2 py-1 rounded bg-black/30">
                                        {t(`platform.cards.${id}.metric`)}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-400 leading-relaxed min-h-[80px] flex items-start justify-center">
                                    {t(`platform.cards.${id}.desc`)}
                                </p>
                            </div>

                            {/* Corner accents */}
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

