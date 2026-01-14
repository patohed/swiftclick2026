// Test con un email alternativo
import { Resend } from 'resend';
import 'dotenv/config';

const resend = new Resend(process.env.RESEND_API_KEY);

async function testAlternative() {
  // CAMBIA ESTE EMAIL POR UNO TUYO (Gmail, Outlook, etc.)
  const emailPrueba = 'TU_EMAIL_AQUI@gmail.com';
  
  console.log('🔍 Testeando con email alternativo...');
  console.log('📧 Enviando a:', emailPrueba);
  console.log('');
  
  try {
    const data = await resend.emails.send({
      from: 'SwiftClick <contacto@swiftclick.com.ar>',
      to: [emailPrueba], // Email alternativo
      replyTo: 'test@ejemplo.com',
      subject: '[SwiftClick] Test de formulario - Email Alternativo',
      text: 'Este es un test para verificar que Resend funciona con otro email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #6a5acd;">✅ Test Exitoso</h1>
          <p>Si ves este email, significa que Resend funciona correctamente.</p>
          <p>El problema es que <strong>contacto@swiftclick.com.ar</strong> está en la lista de supresión.</p>
          <hr>
          <p style="color: #999; font-size: 12px;">Fecha: ${new Date().toLocaleString('es-AR')}</p>
        </div>
      `,
    });

    console.log('✅ Email enviado exitosamente!');
    console.log('📧 ID:', data.data?.id || data.id);
    console.log('');
    console.log('🎯 Revisa tu bandeja de entrada (y spam)');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testAlternative();
