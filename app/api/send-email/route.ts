import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';

type FormBody = {
    name: string;
    email: string;
    company: string;
    persona: string;
    countryCode?: string;
    phone?: string;
    acceptedTerms: boolean;
};

function prettifyPersona(persona: unknown): string {
    return String(persona ?? '')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (l: string) => l.toUpperCase());
}

export async function POST(request: Request) {
    try {
        const body: FormBody = await request.json();
        const { name, email, countryCode, phone, company, persona, acceptedTerms } = body;

        // Validazione
        if (!name || !email || !company || !persona || !acceptedTerms) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const personaPretty = prettifyPersona(persona);
        const logoPath = path.join(process.cwd(), 'public', 'logos', 'logo_blue.png');

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
Primary Role: ${personaPretty}
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
            <p style="font-size: 16px; color: #1e293b; margin: 0; font-weight: 500;">${personaPretty}</p>
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

        // Email di conferma per l'utente
        const confirmationMailOptions = {
            from: `"EstateVision" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: `Your Access Request Has Been Received — EstateVision`,
            text: `
Hi ${name},

Thank you for requesting access to EstateVision.

We've received your request and our team is currently reviewing your application.

Here's a summary of your submission:
- Full Name: ${name}
- Email: ${email}
- Organization: ${company}
- Phone: ${countryCode} ${phone}
- Role: ${personaPretty}

What happens next?
Your account will be activated within 24-48 business hours. Once approved, you'll receive a welcome email with your login credentials and onboarding instructions.

If you have any questions or issues, please contact us at support@estatevision.ai

Best regards,
The EstateVision Team
            `,
            attachments: [{
                filename: 'logo_blue.png',
                path: logoPath,
                cid: 'estatevision-logo'
            }],
            html: `
<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; border-radius: 12px; overflow: hidden; border: 1px solid #1e293b;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px 40px; text-align: center; border-bottom: 1px solid #334155;">
        <div style="display: inline-flex; align-items: center; vertical-align: middle;">
            <img src="cid:estatevision-logo" alt="EstateVision" style="height: 40px; width: auto; margin-right: 15px; vertical-align: middle;" />
            <span style="color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: 2px; vertical-align: middle;">ESTATEVISION</span>
        </div>
        <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 600; letter-spacing: -0.5px;">Request Received</h1>
        <p style="color: #64748b; font-size: 14px; margin-top: 8px; font-weight: 400;">We're reviewing your application</p>
    </div>
    
    <!-- Content -->
    <div style="padding: 40px;">
        <p style="color: #f1f5f9; font-size: 16px; margin: 0 0 25px 0; line-height: 1.6;">
            Hi <strong>${name}</strong>,
        </p>
        
        <p style="color: #94a3b8; font-size: 15px; margin: 0 0 30px 0; line-height: 1.7;">
            Thank you for requesting access to EstateVision. We've received your application and our team is currently reviewing it.
        </p>

        <!-- Summary Card -->
        <div style="background-color: #111827; border: 1px solid #1e293b; border-radius: 10px; padding: 25px; margin-bottom: 30px;">
            <h3 style="color: #3b82f6; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 20px 0;">Submission Summary</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 40%;">Full Name</td>
                    <td style="padding: 8px 0; color: #e2e8f0; font-size: 13px; font-weight: 500;">${name}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Email</td>
                    <td style="padding: 8px 0; color: #3b82f6; font-size: 13px;">${email}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Organization</td>
                    <td style="padding: 8px 0; color: #e2e8f0; font-size: 13px; font-weight: 500;">${company}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Phone</td>
                    <td style="padding: 8px 0; color: #e2e8f0; font-size: 13px; font-family: monospace;">${countryCode} ${phone}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Role</td>
                    <td style="padding: 8px 0; color: #e2e8f0; font-size: 13px; font-weight: 500;">${personaPretty}</td>
                </tr>
            </table>
        </div>

        <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 10px; padding: 25px; margin-bottom: 30px;">
            <h3 style="color: #f1f5f9; font-size: 16px; font-weight: 600; margin: 0 0 15px 0;">What happens next?</h3>
            <p style="color: #94a3b8; font-size: 14px; margin: 0; line-height: 1.7;">
                Your account will be <strong style="color: #3b82f6;">activated within 24-48 business hours</strong>. Once approved, you'll receive a welcome email with your login credentials and onboarding instructions.
            </p>
        </div>

        <p style="color: #64748b; font-size: 14px; margin: 0; line-height: 1.6;">
            If you have any questions or issues, please contact us at <a href="mailto:support@estatevision.ai" style="color: #3b82f6; text-decoration: none;">support@estatevision.ai</a>.
        </p>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #0f172a; padding: 25px 40px; text-align: center; border-top: 1px solid #1e293b;">
        <p style="color: #475569; font-size: 12px; margin: 0 0 8px 0;">© 2026 EstateVision. All rights reserved.</p>
        <p style="color: #334155; font-size: 11px; margin: 0;">This is an automated message. Please do not reply directly.</p>
    </div>
</div>
            `,
        };

        // Invia entrambe le email
        await Promise.all([
            transporter.sendMail(mailOptions),
            transporter.sendMail(confirmationMailOptions)
        ]);

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error('Errore invio email:', error);
        return NextResponse.json(
            { error: 'Errore durante l\'invio della email' },
            { status: 500 }
        );
    }
}
