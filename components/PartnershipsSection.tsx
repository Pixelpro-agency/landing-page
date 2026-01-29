'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../lib/i18n/config';

export default function PartnershipsSection() {
    const { t } = useTranslation();

    return (
        <section className="py-32 bg-[#02040A] relative overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight uppercase">
                        {t('partnerships.title')}
                    </h2>
                </motion.div>



                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Google for Startups */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="group relative bg-white/5 border border-white/10 p-10 rounded-sm overflow-hidden flex flex-col items-center text-center shadow-lg"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="relative z-10 w-full h-20 mb-8 flex items-center justify-center">
                            <Image
                                src="/images/google-startups-white.png"
                                alt="Google for Startups"
                                width={280}
                                height={56}
                                className="h-14 w-auto object-contain group-hover:scale-105 transition-all duration-500"
                            />
                        </div>

                        <div className="relative z-10">
                            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                                {t('partnerships.google.desc')}
                            </p>
                        </div>

                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </motion.div>

                    {/* SDG 11 */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="group relative bg-white/5 border border-white/10 p-10 rounded-sm overflow-hidden flex flex-col items-center text-center shadow-lg"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="relative z-10 w-full h-20 mb-8 flex items-center justify-center">
                            <Image
                                src="/images/sdg.png"
                                alt="SDG 11"
                                width={80}
                                height={80}
                                className="h-16 w-auto object-contain group-hover:scale-105 transition-all duration-500"
                            />
                        </div>

                        <div className="relative z-10">
                            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                                {t('partnerships.sdg.desc')}
                            </p>
                        </div>

                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-20 text-center"
                >
                    <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
                        {t('partnerships.footer')}
                    </p>
                </motion.div>
            </div>
        </section >
    );
}
