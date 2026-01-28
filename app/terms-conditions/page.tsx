'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Landmark } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import '../../lib/i18n/config';

export default function TermsConditionsPage() {
    const { t } = useTranslation();

    const content = `
Welcome to Estate Vision! These Terms of Service (the "Terms") govern your access to and use of the Estate Vision mobile and web applications, website, and any related services (collectively, the "Services"). By accessing or using the Services, you agree to be bound by these Terms. If you do not agree, you may not use the Services.

## 1. Acceptance of Terms
By creating an account, accessing, or using Estate Vision, you acknowledge that you have read, understood, and agree to be legally bound by these Terms and our Privacy Policy. If you do not agree with these Terms, you must immediately discontinue your use of the Services.

## 2. Eligibility
- **Minimum Age:** You must be at least 18 years of age, or the age of majority in your jurisdiction, to use the Services.
- **Authority:** By using the Services on behalf of a company or other entity, you represent and warrant that you have the authority to bind such entity to these Terms.
- **Compliance:** You represent that all information you submit is accurate and you will keep it updated. You also agree to comply with all applicable laws while using the Services.

## 3. Description of Services
Estate Vision provides digital estate planning, property management, and related services (the "Services"). We may modify, update, or discontinue certain features at any time without notice, at our sole discretion.

## 4. Account Registration
- **Account Creation:** To access certain features, you may be required to register for an account. You agree to provide and maintain truthful, accurate, and up-to-date information.
- **Account Security:** You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.
- **Account Use:** You agree not to impersonate any individual or entity, or misrepresent your affiliation with any individual or entity.

## 5. Fees and Payment
- **Subscription Plans:** Some features of Estate Vision may require payment (e.g., subscription fees). The applicable fees, duration, and payment terms will be provided at the point of purchase.
- **Payment Method:** You must provide a valid payment method and authorize us to charge that payment method for any purchased Services.
- **Refunds:** All fees are typically non-refundable unless required by law or stated otherwise in writing by Estate Vision.

## 6. User Conduct and Prohibited Activities
- **Lawful Use:** You agree not to use the Services in any way that violates any applicable law or regulation.
- **Prohibited Content:** You agree not to upload, post, or transmit any content that is unlawful, defamatory, harassing, threatening, obscene, or otherwise objectionable.
- **No Unauthorized Access:** You must not access or attempt to access non-public areas of Estate Vision.

## 7. Intellectual Property
Estate Vision and its licensors own all rights, titles, and interests in and to the Services, including all software, text, media, and trademarks used within them.

## 8. Privacy
Your privacy is important to us. Please review our Privacy Policy for information about how we collect, use, and disclose your personal data in connection with the Services.

## 9. Disclaimers
- **No Legal Advice:** Estate Vision is not a law firm and does not provide legal advice. Any materials or information provided through the Services are for informational purposes only.
- **As Is, As Available:** The Services are provided "as is" and "as available" without warranties of any kind, either express or implied.

## 10. Limitation of Liability
To the fullest extent permitted by law, Estate Vision shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill.

## 11. Contact Us
If you have any questions about these Terms, please contact us at:

**Estate Vision**  
support@estatevision.ai`;

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
