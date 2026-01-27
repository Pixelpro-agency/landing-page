'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Send, CheckCircle2, Shield, Globe, Zap, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n/config';

export default function RequestAccessPage() {
    const { t } = useTranslation();
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        countryCode: '+39',
        phone: '',
        company: '',
        persona: '',
        acceptedTerms: false
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.countryCode.trim()) {
            newErrors.countryCode = 'Prefix required';
        } else if (!/^\+\d+$/.test(formData.countryCode)) {
            newErrors.countryCode = 'Invalid prefix (e.g. +39)';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Number required';
        } else if (!/^\d+$/.test(formData.phone)) {
            newErrors.phone = 'Numbers only';
        }

        if (!formData.company.trim()) newErrors.company = 'Organization is required';
        if (!formData.persona) newErrors.persona = 'Role is required';
        if (!formData.acceptedTerms) newErrors.acceptedTerms = 'You must accept the terms';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setStatus('submitting');


        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send request');
            }

            setStatus('success');
            setFormData({
                name: '',
                email: '',
                countryCode: '+39',
                phone: '',
                company: '',
                persona: '',
                acceptedTerms: false
            });
        } catch (error) {
            console.error('Submission error:', error);
            // Qui potresti voler settare uno stato di errore visibile user-friendly
            setStatus('idle'); // Per ora resettiamo
            alert('Qualcosa è andato storto. Riprova più tardi.');
        }

    };

    return (
        <div className="min-h-screen bg-[#02040A] text-white selection:bg-blue-500/30 font-sans">
            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.05)_0%,transparent_50%)]"></div>
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(239,68,68,0.05)_0%,transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
            </div>

            <nav className="relative z-50 border-b border-white/5 bg-black/20 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2 group">
                        <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                        <span className="text-sm font-mono text-gray-400 group-hover:text-white transition-colors">{t('requestAccess.back')}</span>
                    </Link>
                    <Link href="/">
                        <Image
                            src="/logos/EstateVision_LogoEsteso_Bianco.svg"
                            alt="EstateVision"
                            width={140}
                            height={32}
                            className="h-6 w-auto cursor-pointer"
                        />
                    </Link>
                    <div className="w-20"></div> {/* Spacer for symmetry */}
                </div>
            </nav>

            <main className="relative z-10 max-w-6xl mx-auto px-6 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-20">

                {/* Left side: Context & Trust */}
                <div className="flex flex-col justify-center">
                    <div className="inline-flex items-center space-x-2 mb-6 px-3 py-1 border border-blue-500/30 bg-blue-900/10 rounded-full w-fit">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-mono text-blue-400 tracking-widest uppercase">{t('requestAccess.trust.encryption')}</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 leading-tight">
                        {t('requestAccess.title').split('.')[0]}.<br />{t('requestAccess.title').split('.')[1]}
                    </h1>

                    <p className="text-lg text-gray-400 mb-12 max-w-md leading-relaxed">
                        {t('requestAccess.description')}
                    </p>

                    <div className="space-y-6">
                        {[
                            { icon: Shield, title: t('requestAccess.trust.vetted'), desc: t('requestAccess.trust.vettedDesc') },
                            { icon: Zap, title: t('requestAccess.trust.deployment'), desc: t('requestAccess.trust.deploymentDesc') },
                            { icon: Terminal, title: t('requestAccess.trust.api'), desc: t('requestAccess.trust.apiDesc') }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start space-x-4">
                                <div className="p-2 bg-white/5 border border-white/10 rounded-lg text-blue-400">
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">{item.title}</h3>
                                    <p className="text-xs text-gray-500 font-mono">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right side: Form */}
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/10 blur-[100px] opacity-20"></div>

                    <AnimatePresence mode="wait">
                        {status !== 'success' ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="relative bg-[#0a0a0a] border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl"
                            >
                                <h2 className="text-2xl font-bold mb-8 flex items-center">
                                    <span className="w-2 h-8 bg-blue-600 mr-4 rounded-full"></span>
                                    {t('requestAccess.form.title')}
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">{t('requestAccess.form.fullName')}</label>
                                            <input
                                                required
                                                type="text"
                                                className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors`}
                                                value={formData.name}
                                                onChange={e => {
                                                    setFormData({ ...formData, name: e.target.value });
                                                    if (errors.name) setErrors({ ...errors, name: '' });
                                                }}
                                            />
                                            {errors.name && <p className="text-red-500 text-[10px] font-mono mt-1">{errors.name}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">{t('requestAccess.form.email')}</label>
                                            <input
                                                required
                                                type="email"
                                                placeholder="name@company.com"
                                                className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors`}
                                                value={formData.email}
                                                onChange={e => {
                                                    setFormData({ ...formData, email: e.target.value });
                                                    if (errors.email) setErrors({ ...errors, email: '' });
                                                }}
                                            />
                                            {errors.email && <p className="text-red-500 text-[10px] font-mono mt-1">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">{t('requestAccess.form.org')}</label>
                                        <input
                                            required
                                            type="text"
                                            className={`w-full bg-white/5 border ${errors.company ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors`}
                                            value={formData.company}
                                            onChange={e => {
                                                setFormData({ ...formData, company: e.target.value });
                                                if (errors.company) setErrors({ ...errors, company: '' });
                                            }}
                                        />
                                        {errors.company && <p className="text-red-500 text-[10px] font-mono mt-1">{errors.company}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">{t('requestAccess.form.phone')}</label>
                                        <div className="flex gap-2 w-full">
                                            <input
                                                required
                                                type="text"
                                                placeholder="+39"
                                                className={`w-20 bg-white/5 border ${errors.countryCode ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-2 py-3 text-center text-sm focus:outline-none focus:border-blue-500 transition-colors`}
                                                value={formData.countryCode}
                                                onChange={e => {
                                                    setFormData({ ...formData, countryCode: e.target.value });
                                                    if (errors.countryCode) setErrors({ ...errors, countryCode: '' });
                                                }}
                                            />
                                            <input
                                                required
                                                type="tel"
                                                placeholder="000 0000000"
                                                className={`flex-1 min-w-0 bg-white/5 border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors`}
                                                value={formData.phone}
                                                onChange={e => {
                                                    setFormData({ ...formData, phone: e.target.value });
                                                    if (errors.phone) setErrors({ ...errors, phone: '' });
                                                }}
                                            />
                                        </div>
                                        {(errors.countryCode || errors.phone) && (
                                            <p className="text-red-500 text-[10px] font-mono mt-1">
                                                {errors.countryCode || errors.phone}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">{t('requestAccess.form.role')}</label>
                                        <div className="relative">
                                            <select
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                                                value={formData.persona}
                                                onChange={e => setFormData({ ...formData, persona: e.target.value })}
                                            >
                                                <option value="" disabled className="bg-[#0a0a0a]">{t('requestAccess.form.roles.placeholder')}</option>
                                                <option value="asset_manager" className="bg-[#0a0a0a]">{t('requestAccess.form.roles.assetManager')}</option>
                                                <option value="security_manager" className="bg-[#0a0a0a]">{t('requestAccess.form.roles.securityManager')}</option>
                                                <option value="other" className="bg-[#0a0a0a]">{t('requestAccess.form.roles.other')}</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                        {errors.persona && <p className="text-red-500 text-[10px] font-mono mt-1">{errors.persona}</p>}
                                    </div>

                                    <div className="flex items-center space-x-group cursor-pointer" onClick={() => setFormData({ ...formData, acceptedTerms: !formData.acceptedTerms })}>
                                        <div className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${formData.acceptedTerms ? 'bg-blue-600 border-blue-600' : 'bg-white/5 border-white/10 group-hover:border-white/30'}`}>
                                            {formData.acceptedTerms && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}
                                        </div>
                                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest select-none ml-3">
                                            {t('requestAccess.form.accept')} <Link href="/terms-conditions" className="underline hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>{t('requestAccess.form.terms')}</Link>
                                        </span>
                                    </div>
                                    {errors.acceptedTerms && <p className="text-red-500 text-[10px] font-mono mt-1">{errors.acceptedTerms}</p>}

                                    <div className="pt-4">
                                        <button
                                            disabled={status === 'submitting'}
                                            type="submit"
                                            className={`w-full h-14 bg-white hover:bg-gray-200 text-black font-bold tracking-[0.2em] uppercase text-xs transition-all flex items-center justify-center space-x-3 ${status === 'submitting' ? 'opacity-70 cursor-wait' : ''}`}
                                        >
                                            {status === 'submitting' ? (
                                                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                                            ) : (
                                                <>
                                                    <span>{t('requestAccess.form.submit')}</span>
                                                    <Send className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <p className="text-[9px] text-gray-600 font-mono text-center tracking-widest leading-relaxed">
                                        {t('requestAccess.form.consent').split('.')[0]}. <br />
                                        {t('requestAccess.form.consent').split('.')[1]}.
                                    </p>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative bg-[#0a0a0a] border border-green-500/20 p-12 rounded-2xl shadow-2xl flex flex-col items-center text-center py-20"
                            >
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-8 border border-green-500/30">
                                    <CheckCircle2 className="w-10 h-10 text-green-400" />
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-4">{t('requestAccess.success.title')}</h2>
                                <p className="text-gray-400 mb-8 max-w-sm">
                                    {t('requestAccess.success.desc')}
                                </p>
                                <div className="w-full h-px bg-white/5 mb-8"></div>
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="px-8 py-3 bg-white/5 border border-white/10 rounded text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
                                >
                                    {t('requestAccess.success.button')}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <footer className="relative z-10 border-t border-white/5 py-12 bg-black/40">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center opacity-40 grayscale">
                    <Image
                        src="/logos/EstateVision_LogoEsteso_Bianco.svg"
                        alt="EstateVision"
                        width={100}
                        height={20}
                        className="mb-8 md:mb-0"
                    />
                    <div className="flex space-x-8 text-[10px] font-mono uppercase tracking-[0.2em]">
                        <span>{t('footer.secureLink')}</span>
                        <span>EstateVision v2.6</span>
                        <span>© 2026</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
