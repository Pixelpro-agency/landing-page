'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Landmark } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import '../../lib/i18n/config';

export default function TermsConditionsPage() {
    const { t } = useTranslation();

    const content = t('terms.content');

    return (
        <div className="min-h-screen bg-[#02040A] text-white selection:bg-blue-500/30 font-sans">
            <nav className="border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2 group">
                        <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                        <span className="text-sm font-mono text-gray-400 group-hover:text-white transition-colors uppercase tracking-widest">{t('terms.back')}</span>
                    </Link>
                    <div className="text-sm font-bold tracking-tighter uppercase">{t('terms.legal')}</div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-20 lg:py-32">
                <div className="flex items-center space-x-4 mb-12">
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                        <Landmark className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{t('terms.title')}</h1>
                        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest mt-2">System Protocol Version: 2.4.0</p>
                    </div>
                </div>

                <div className="prose prose-invert prose-lg max-w-none text-gray-400">
                    <ReactMarkdown
                        components={{
                            h1: ({ ...props }) => <h1 className="text-3xl font-bold text-white uppercase tracking-wider mt-12 mb-6 pb-2 border-b border-white/10" {...props} />,
                            h2: ({ ...props }) => <h2 className="text-2xl font-bold text-white uppercase tracking-wider mt-12 mb-6 pb-2 border-b border-white/10" {...props} />,
                            h3: ({ ...props }) => <h3 className="text-xl font-bold text-white mt-8 mb-4" {...props} />,
                            h4: ({ ...props }) => <h4 className="text-lg font-semibold text-white/90 mt-6 mb-3" {...props} />,
                            p: ({ ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                            ul: ({ ...props }) => <ul className="list-disc pl-6 space-y-2 mb-6 text-base" {...props} />,
                            li: ({ ...props }) => <li className="pl-2" {...props} />,
                            strong: ({ ...props }) => <strong className="font-bold text-white" {...props} />,
                            a: ({ ...props }) => <a className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors" {...props} />,
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>

                <div className="pt-12 mt-12 border-t border-white/5">
                    <p className="text-sm font-mono uppercase tracking-[0.2em] text-gray-600">
                        System Authorization Required // Access Code: 0x99212
                    </p>
                </div>
            </main>
        </div>
    );
}
