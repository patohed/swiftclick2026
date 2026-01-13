import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { nombre, email, telefono, empresa, mensaje } = req.body;

    // Validación básica
    if (!nombre || !email || !empresa || !mensaje) {
      return res.status(400).json({ 
        error: 'Faltan campos obligatorios' 
      });
    }

    // Enviar email con Resend
    const data = await resend.emails.send({
      from: 'SwiftClick <noreply@swiftclick.com.ar>',
      to: ['contacto@swiftclick.com.ar'],
      replyTo: email,
      subject: `[SwiftClick] Nuevo contacto: ${empresa} - ${nombre}`,
      text: `
Nuevo contacto desde SwiftClick

Nombre: ${nombre}
Email: ${email}
${telefono ? `Teléfono: ${telefono}` : ''}
Empresa: ${empresa}

Mensaje:
${mensaje}

Fecha: ${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background: linear-gradient(135deg, #6a5acd 0%, #4a3fa8 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🚀 Nuevo Contacto</h1>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #6a5acd; margin-top: 0;">Información del Contacto</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>👤 Nombre:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${nombre}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>📧 Email:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              ${telefono ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>📱 Teléfono:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${telefono}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>🏢 Empresa:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${empresa}</td>
              </tr>
            </table>
            
            <div style="margin-top: 25px;">
              <h3 style="color: #6a5acd; margin-bottom: 10px;">💬 Mensaje</h3>
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #6a5acd;">
                ${mensaje.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee; text-align: center; color: #999; font-size: 12px;">
              <p>Enviado desde el formulario de contacto de SwiftClick</p>
              <p>Fecha: ${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}</p>
            </div>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Email enviado correctamente',
      id: data.id 
    });

  } catch (error) {
    console.error('Error enviando email:', error);
    return res.status(500).json({ 
      error: 'Error al enviar el email',
      details: error.message 
    });
  }
}
