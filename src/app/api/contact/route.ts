import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email/resend';
import { validateContactPayload } from '@/lib/contact';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateContactPayload({
      name: body?.name ?? '',
      email: body?.email ?? '',
      subject: body?.subject ?? '',
      message: body?.message ?? '',
    });

    if (!validation.isValid) {
      return NextResponse.json({ error: 'Veuillez remplir correctement tous les champs.' }, { status: 400 });
    }

    const { cleaned } = validation;
    await sendEmail({
      to: process.env.CONTACT_TO_EMAIL || 'cipresaconsulting@gmail.com',
      subject: `Nouveau message de contact : ${cleaned.subject}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom :</strong> ${cleaned.name}</p>
        <p><strong>Email :</strong> ${cleaned.email}</p>
        <p><strong>Sujet :</strong> ${cleaned.subject}</p>
        <p><strong>Message :</strong><br />${cleaned.message.replace(/\n/g, '<br />')}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[contact] request failed', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de l’envoi du message.' }, { status: 500 });
  }
}
