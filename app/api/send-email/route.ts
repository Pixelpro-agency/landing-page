import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, countryCode, phone, company, persona, acceptedTerms } = body;

        // Validazione
        if (!name || !email || !company || !persona || !acceptedTerms) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Configurazione Trasporto Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.GMAIL_USER, // La tua mail che invia
                clientId: process.env.GMAIL_CLIENT_ID,
                clientSecret: process.env.GMAIL_CLIENT_SECRET,
                refreshToken: process.env.GMAIL_REFRESH_TOKEN,
            },
        });

        // Contenuto Email
        const mailOptions = {
            from: `"${name}" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_RECIPIENT,
            replyTo: email,
            subject: `New Access Request from ${name} - ${company}`,
            text: `
New Access Request Details:

Full Name: ${name}
Corporate Email: ${email}
Organization / Enterprise: ${company}
Phone Number: ${countryCode} ${phone}
Primary Role: ${persona}
Terms Accepted: Yes
            `,
            html: `
<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
    <!-- Header -->
    <div style="background-color: #0f172a; padding: 30px 40px; text-align: center;">
        <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 1px;">New Access Request</h2>
        <p style="color: #94a3b8; font-size: 14px; margin-top: 5px;">EstateVision Landing Page</p>
    </div>
    
    <!-- Content -->
    <div style="padding: 40px;">
        
        <!-- Full Name -->
        <div style="margin-bottom: 25px;">
            <p style="text-transform: uppercase; font-size: 11px; color: #64748b; font-weight: 700; letter-spacing: 0.05em; margin: 0 0 5px 0;">Full Name</p>
            <p style="font-size: 16px; color: #1e293b; margin: 0; font-weight: 500;">${name}</p>
        </div>

        <!-- Email -->
        <div style="margin-bottom: 25px;">
            <p style="text-transform: uppercase; font-size: 11px; color: #64748b; font-weight: 700; letter-spacing: 0.05em; margin: 0 0 5px 0;">Corporate Email</p>
            <p style="font-size: 16px; color: #1e293b; margin: 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></p>
        </div>

        <!-- Organization -->
        <div style="margin-bottom: 25px;">
            <p style="text-transform: uppercase; font-size: 11px; color: #64748b; font-weight: 700; letter-spacing: 0.05em; margin: 0 0 5px 0;">Organization / Enterprise</p>
            <p style="font-size: 16px; color: #1e293b; margin: 0; font-weight: 500;">${company}</p>
        </div>

        <!-- Phone -->
        <div style="margin-bottom: 25px;">
            <p style="text-transform: uppercase; font-size: 11px; color: #64748b; font-weight: 700; letter-spacing: 0.05em; margin: 0 0 5px 0;">Phone Number</p>
            <div style="display: flex; align-items: center;">
                <span style="background-color: #f1f5f9; color: #475569; padding: 2px 8px; border-radius: 4px; font-size: 14px; font-family: monospace; margin-right: 8px;">${countryCode}</span>
                <span style="font-size: 16px; color: #1e293b; font-family: monospace;">${phone}</span>
            </div>
        </div>

        <!-- Role -->
        <div style="margin-bottom: 30px;">
            <p style="text-transform: uppercase; font-size: 11px; color: #64748b; font-weight: 700; letter-spacing: 0.05em; margin: 0 0 5px 0;">Primary Role (Buyer Persona)</p>
            <p style="font-size: 16px; color: #1e293b; margin: 0; font-weight: 500;">${persona.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
}</p>
        </div>

        <!-- Footer Info -->
        <div style="border-top: 1px solid #f1f5f9; padding-top: 20px; margin-top: 30px;">
            <p style="text-transform: uppercase; font-size: 11px; color: #64748b; font-weight: 700; letter-spacing: 0.05em; margin: 0 0 5px 0;">Terms & Conditions</p>
            <p style="font-size: 14px; color: #15803d; margin: 0; font-weight: 600;">Accepted ✅</p>
        </div>

    </div>
    
    <!-- Footer -->
    <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="color: #94a3b8; font-size: 12px; margin: 0;">Sent automatically from EstateVision Landing Page form.</p>
    </div>
</div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error('Errore invio email:', error);
        return NextResponse.json(
            { error: 'Errore durante l\'invio della email' },
            { status: 500 }
        );
    }
}
