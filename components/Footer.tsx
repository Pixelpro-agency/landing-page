'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import '../lib/i18n/config';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-black border-t border-white/10 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col items-start space-y-8 md:flex-row md:justify-between md:items-center md:space-y-0">
        <Link href="/" className="flex items-center space-x-3 group">
          <Image
            src="/logos/logo_blue.png"
            alt="EstateVision"
            width={32}
            height={32}
            className="h-8 w-auto cursor-pointer"
          />
          <span className="text-2xl md:text-3xl font-bold tracking-tighter text-white">EstateVision</span>
        </Link>

        <div className="flex space-x-4">
          <a href="https://x.com/properlytix/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
            <span className="sr-only">X (Twitter)</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
          </a>
          <a href="https://www.linkedin.com/company/estatevisonai/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
            <span className="sr-only">LinkedIn</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
          </a>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <div className="mb-4 md:mb-0 font-mono">© 2026 ESTATEVISION. {t('footer.rights')}</div>
        <div className="flex space-x-8">
          <Link href="/privacy-policy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
          <Link href="/terms-conditions" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
        </div>
      </div>
    </footer>
  );
}

