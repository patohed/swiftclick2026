# 📧 Configuración de Email con Resend

Sistema de envío de emails configurado con Resend y Vercel Functions (100% gratuito).

## 🚀 Deployment en Vercel

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variable de entorno en Vercel

Ve a tu proyecto en [Vercel Dashboard](https://vercel.com):

1. **Settings** → **Environment Variables**
2. Agregar variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Tu API key de Resend (obtenerla en https://resend.com/api-keys)
   - **Environments:** Seleccionar Production, Preview y Development

### 3. Deploy
```bash
git push
```

Vercel automáticamente detectará la API en `/api/send-email.js` y la desplegará.

## 🔑 Obtener tu API Key de Resend

1. Crea una cuenta en https://resend.com (gratis)
2. Ve a **API Keys** → **Create API Key**
3. Copia la key (formato: `re_xxxxx`)
4. Agrégala en Vercel como variable de entorno

## 📝 Plan Gratuito de Resend

- ✅ 100 emails/día gratis
- ✅ 3,000 emails/mes gratis
- ✅ Sin tarjeta de crédito requerida

## 🔧 Verificar dominio (Opcional pero recomendado)

Para usar tu propio dominio (`contacto@swiftclick.com.ar`):

1. En Resend: **Domains** → **Add Domain**
2. Agregar `swiftclick.com.ar`
3. Configurar registros DNS (MX, TXT, CNAME)
4. Esperar verificación (5-15 min)
5. Actualizar `from:` en [api/send-email.js](api/send-email.js#L24):
   ```js
   from: 'SwiftClick <noreply@swiftclick.com.ar>',
   ```

Mientras tanto, el sistema funciona con `onboarding@resend.dev`.

## 🧪 Testing Local

```bash
# Instalar Vercel CLI
npm i -g vercel

# Crear archivo .env
cp .env.example .env
# Editar .env y agregar tu RESEND_API_KEY

# Ejecutar localmente
vercel dev
```

Abrir: http://localhost:3000

## ✅ Funcionalidades

- ✅ Validación de campos obligatorios
- ✅ Email HTML con diseño profesional
- ✅ Mensajes de éxito/error al usuario
- ✅ Loading state en botón
- ✅ Respuesta rápida (serverless)
- ✅ 100% gratuito

## 📧 Email de destino

Los emails llegarán a: **contacto@swiftclick.com.ar**

## 🆘 Troubleshooting

- **Error 500:** Verificar que `RESEND_API_KEY` esté configurada en Vercel
- **Email no llega:** Revisar spam/promotions
- **Error local:** Verificar archivo `.env` existe y tiene la API key
