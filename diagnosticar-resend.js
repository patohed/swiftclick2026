// Script completo para diagnosticar y resolver el problema de suppression
import { Resend } from 'resend';
import 'dotenv/config';

const resend = new Resend(process.env.RESEND_API_KEY);
const emailToCheck = 'contacto@swiftclick.com.ar';

async function diagnosticar() {
  console.log('🔍 DIAGNÓSTICO COMPLETO\n');
  
  // 1. Verificar dominio
  console.log('1️⃣ Verificando dominio...');
  try {
    const response = await fetch('https://api.resend.com/domains', {
      headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}` }
    });
    const domains = await response.json();
    console.log('   Dominios:', JSON.stringify(domains, null, 2));
  } catch (e) {
    console.log('   Error:', e.message);
  }
  
  console.log('\n2️⃣ Enviando email de prueba...');
  try {
    const { data, error } = await resend.emails.send({
      from: 'SwiftClick <contacto@swiftclick.com.ar>',
      to: [emailToCheck],
      subject: 'Test diagnóstico',
      html: '<p>Test</p>',
    });
    
    if (error) {
      console.log('   ❌ Error:', error);
    } else {
      console.log('   ✅ Email enviado, ID:', data?.id);
      
      // Verificar el estado del email
      console.log('\n3️⃣ Verificando estado del email...');
      setTimeout(async () => {
        try {
          const statusResponse = await fetch(`https://api.resend.com/emails/${data.id}`, {
            headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}` }
          });
          const status = await statusResponse.json();
          console.log('   Estado:', JSON.stringify(status, null, 2));
          
          if (status.last_event === 'bounced' || status.last_event === 'complained') {
            console.log('\n   🔴 PROBLEMA ENCONTRADO:');
            console.log('   El email rebotó o fue marcado como spam anteriormente.');
            console.log('\n   📧 SOLUCIÓN:');
            console.log('   Contacta a soporte de Resend:');
            console.log('   https://resend.com/support');
            console.log('\n   O envía email a: support@resend.com');
            console.log('   Asunto: Remove contacto@swiftclick.com.ar from suppression');
          }
        } catch (e) {
          console.log('   No se pudo obtener el estado');
        }
      }, 2000);
    }
  } catch (e) {
    console.log('   Error:', e.message);
  }
  
  console.log('\n💡 EN EL DASHBOARD DE RESEND:');
  console.log('   Ve a: https://resend.com/emails');
  console.log('   Busca emails enviados a contacto@swiftclick.com.ar');
  console.log('   Si dice "bounced" o "complained", ese es el problema');
  console.log('   Puede haber una opción para "Remove from suppression list"');
}

diagnosticar();
