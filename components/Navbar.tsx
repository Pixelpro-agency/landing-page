'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import '../lib/i18n/config';

export default function Navbar() {
  const pathname = usePathname();
  const { t, i18n } = useTranslation();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const currentLang = i18n.language?.split('-')[0].toUpperCase() || 'EN';

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#02040A]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-4">
        <div className="flex items-center">
          <Link href="/" onClick={handleLogoClick} className="cursor-pointer">
            <Image
              src="/logos/EstateVision_LogoEsteso_Bianco.svg"
              alt="EstateVision"
              width={180}
              height={40}
              className="h-[25.6px] md:h-8 w-auto transition-all"
            />
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {/* Navigation Links if needed */}
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3 text-[10px] font-mono font-bold tracking-[0.2em]">
            <button
              onClick={() => i18n.changeLanguage('it')}
              className={`${currentLang === 'IT' ? 'text-white' : 'text-gray-500'} hover:text-white transition-colors uppercase`}
            >
              IT
            </button>
            <span className="text-white/20 select-none">/</span>
            <button
              onClick={() => i18n.changeLanguage('en')}
              className={`${currentLang === 'EN' ? 'text-white' : 'text-gray-500'} hover:text-white transition-colors uppercase`}
            >
              EN
            </button>
          </div>

          <Link href="/request-access">
            <button className="bg-white text-black px-4 py-2 md:px-6 md:py-2.5 text-[10px] md:text-xs font-bold hover:bg-gray-200 transition-colors tracking-widest uppercase whitespace-nowrap">
              {t('navbar.requestAccess')}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
