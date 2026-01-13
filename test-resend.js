// Test directo de Resend API
import { Resend } from 'resend';
import 'dotenv/config';

const resend = new Resend(process.env.RESEND_API_KEY);

async function testResend() {
  console.log('🔍 Testeando Resend API...');
  console.log('API Key:', process.env.RESEND_API_KEY ? '✅ Configurada' : '❌ No configurada');
  
  try {
    const data = await resend.emails.send({
      from: 'SwiftClick <noreply@swiftclick.com.ar>',
      to: ['contacto@swiftclick.com.ar'],
      replyTo: 'test@ejemplo.com',
      subject: '[SwiftClick] Test de formulario de contacto',
      text: 'Este es un email de prueba enviado directamente desde Node.js para verificar Resend',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #6a5acd;">🧪 Test Email</h1>
          <p>Este es un test directo de la API de Resend.</p>
          <p><strong>Nombre:</strong> Test desde Node.js</p>
          <p><strong>Email:</strong> test@ejemplo.com</p>
          <p><strong>Empresa:</strong> SwiftClick Debug</p>
          <p><strong>Mensaje:</strong> Verificando que Resend funciona correctamente</p>
          <hr>
          <p style="color: #999; font-size: 12px;">Fecha: ${new Date().toLocaleString('es-AR')}</p>
        </div>
      `,
    });

    console.log('✅ Email enviado exitosamente!');
    console.log('📧 ID:', data.id);
    console.log('📊 Data completa:', JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('❌ Error al enviar email:');
    console.error('Tipo:', error.name);
    console.error('Mensaje:', error.message);
    console.error('Detalles:', error);
  }
}

testResend();
