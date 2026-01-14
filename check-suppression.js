// Verificar si un email está suprimido en Resend
import 'dotenv/config';

const RESEND_API_KEY = process.env.RESEND_API_KEY;

async function checkSuppression() {
  console.log('🔍 Verificando lista de supresión de Resend...\n');
  
  try {
    const response = await fetch('https://api.resend.com/audiences/78f74fe1-1c4e-4a86-bfa4-6d3cb570498c/contacts', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Intentar obtener emails suprimidos
    const suppressResponse = await fetch('https://api.resend.com/emails?status=bounced', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      }
    });

    if (suppressResponse.ok) {
      const data = await suppressResponse.json();
      console.log('📊 Emails con problemas:', JSON.stringify(data, null, 2));
    }

  } catch (error) {
    console.error('Error:', error.message);
  }

  // Solución: enviar a un email diferente para probar
  console.log('\n💡 SOLUCIÓN:');
  console.log('1. Revisa el dashboard de Resend: https://resend.com/emails');
  console.log('2. Ve a "Suppressions" o "Bounces" para ver si contacto@swiftclick.com.ar está bloqueado');
  console.log('3. Opciones:');
  console.log('   a) Eliminar contacto@swiftclick.com.ar de la lista de supresión');
  console.log('   b) Usar otro email temporal para probar (ej: otro@swiftclick.com.ar)');
  console.log('   c) Verificar que contacto@swiftclick.com.ar sea un buzón válido y funcional');
}

checkSuppression();
