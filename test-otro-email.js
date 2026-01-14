// Test con otro email para verificar que Resend funciona
import { Resend } from 'resend';
import 'dotenv/config';

const resend = new Resend(process.env.RESEND_API_KEY);

async function testOtroEmail() {
  // Probamos con info@swiftclick.com.ar
  const emailPrueba = 'info@swiftclick.com.ar';
  
  console.log('🔍 Testeando con otro email del dominio...');
  console.log('📧 Enviando a:', emailPrueba);
  console.log('');
  
  try {
    const data = await resend.emails.send({
      from: 'SwiftClick <contacto@swiftclick.com.ar>',
      to: [emailPrueba],
      replyTo: 'test@ejemplo.com',
      subject: '[SwiftClick] Test alternativo',
      text: 'Test con info@ en lugar de contacto@',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="color: #6a5acd;">✅ Test con email alternativo</h1>
          <p>Si ves este email, significa que el problema es específico de contacto@</p>
        </div>
      `,
    });

    console.log('✅ Email enviado!');
    console.log('📧 ID:', data.data?.id || data.id);
    console.log('📊 Response:', JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testOtroEmail();
