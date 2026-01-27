'use client';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { X } from 'lucide-react';

export default function CookieConsent() {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            // Delay slightly for better UX
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie_consent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full z-[100] p-4 md:p-6 flex justify-center pointer-events-none">
            <div className="bg-[#0f1115]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl max-w-2xl w-full pointer-events-auto flex flex-col md:flex-row items-start md:items-center gap-6 animate-in slide-in-from-bottom duration-500 ease-out">
                <div className="flex-1 space-y-2 text-sm text-gray-300">
                    <p className="leading-relaxed">
                        {t('cookies.text')}
                    </p>
                    <p className="leading-relaxed text-gray-400">
                        {t('cookies.text2')}
                    </p>
                </div>

                <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
                    <button
                        onClick={handleAccept}
                        className="w-full md:w-32 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm"
                    >
                        {t('cookies.accept')}
                    </button>
                    <button
                        onClick={handleDecline}
                        className="w-full md:w-32 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm"
                    >
                        {t('cookies.decline')}
                    </button>
                </div>

                <div className="absolute top-4 right-4 md:hidden">
                    <button
                        onClick={handleDecline}
                        className="text-gray-500 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
