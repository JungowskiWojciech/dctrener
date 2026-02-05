
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API Key (Needs Env Variable)
// For dev, we will log if key is missing
const resend = new Resend(process.env.RESEND_API_KEY || 're_123'); // Fallback for build not to crash

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, goal, message } = body;

        // Validation
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Brak wymaganych danych' },
                { status: 400 }
            );
        }

        // Mock sending if no API key in env (for demo purposes if user doesn't add keys)
        if (!process.env.RESEND_API_KEY) {
            console.log('MOCK EMAIL SEND:', { name, email, goal, message });
            return NextResponse.json({ success: true, message: 'Wiadomość wysłana (MOCK)' });
        }

        const data = await resend.emails.send({
            from: 'Trener Contact Form <onboarding@resend.dev>', // Free tier uses this sender or verified domain
            to: ['dc.trener.chlewicki@gmail.com'], // Replace with trainer's email via ENV
            subject: `Nowe zgłoszenie: ${name} - ${goal}`,
            html: `
        <h1>Nowe zgłoszenie z Landing Page</h1>
        <p><strong>Imię:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Cel:</strong> ${goal}</p>
        <p><strong>Wiadomość:</strong> ${message}</p>
      `,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json(
            { error: 'Błąd wysyłki' },
            { status: 500 }
        );
    }
}
