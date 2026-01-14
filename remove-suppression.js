// Script para remover email de lista de supresión de Resend
import 'dotenv/config';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const emailToRemove = 'contacto@swiftclick.com.ar';

async function removeFromSuppression() {
  console.log('🔧 Removiendo de lista de supresión de Resend...');
  console.log('📧 Email:', emailToRemove);
  console.log('');
  
  try {
    // Endpoint para remover de suppression list
    const response = await fetch(`https://api.resend.com/contacts/${emailToRemove}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      console.log('✅ Email removido exitosamente de la lista de supresión!');
      console.log('');
      console.log('🧪 Ahora ejecuta: node test-resend.js');
    } else {
      const error = await response.text();
      console.log('⚠️ Respuesta del servidor:', response.status);
      console.log('Detalles:', error);
      
      if (response.status === 404) {
        console.log('\n💡 El email no está en la lista de supresión, o Resend usa otro sistema.');
        console.log('');
        console.log('🔍 VERIFICAR EN DASHBOARD:');
        console.log('1. Ve a https://resend.com/domains');
        console.log('2. Click en swiftclick.com.ar');
        console.log('3. Busca una pestaña de "Suppressions" o "Blocked emails"');
        console.log('4. Remueve manualmente contacto@swiftclick.com.ar si aparece');
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  console.log('\n📧 CONTACTAR SOPORTE (si no funciona):');
  console.log('Email: support@resend.com');
  console.log('Subject: Remove contacto@swiftclick.com.ar from suppression list');
  console.log('\nO abre un ticket en: https://resend.com/support');
}

removeFromSuppression();
