'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import it from './locales/it.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            it: { translation: it }
        },
        fallbackLng: 'en',
        lng: 'en', // Force default to EN as requested
        interpolation: {
            escapeValue: false // react already safes from xss
        },
        detection: {
            order: ['localStorage', 'cookie', 'navigator'],
            caches: ['localStorage', 'cookie']
        }
    });

export default i18n;
