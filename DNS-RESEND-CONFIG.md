# 🌐 Configuración DNS para Resend

## Estado Actual
Tu dominio tiene registros de **Amazon SES** y **Resend** mezclados, lo que causa conflictos.

## ✅ Registros DNS Correctos para Resend

### 1. SPF (Reemplazar el actual)
```
Type: TXT
Name: swiftclick.com.ar
Value: v=spf1 include:_spf.resend.com ~all
TTL: 14400
```

**Actual (INCORRECTO):**
```
v=spf1 ip4:204.93.224.178 +a +mx include:relay.mailchannels.net ~all
```

### 2. DKIM (Ya lo tienes - ✅ CORRECTO)
```
Type: TXT
Name: resend._domainkey.swiftclick.com.ar
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8aYtNbcc/4wWjVsvDRO36QXnWdvA1eT84N5BQpNrZ82eWomd+s1481jaJeMV/lrUNUccLX3dU/gJa0RSW7H2Ie3Um0KnWz6YHv2C7jyUDTZaoaQ7TKClsEeYPt33G8xPUzxjEsAnaFISfKqqJCpxTLbl1Am1La5Q28+VZXlDekwIDAQAB
TTL: 14400
```

### 3. DMARC (Ya lo tienes - ✅ CORRECTO)
```
Type: TXT
Name: _dmarc.swiftclick.com.ar
Value: v=DMARC1; p=none;
TTL: 14400
```

### 4. MX Records (OPCIONAL para Resend)
**No necesitas cambiar los MX** si solo usas Resend para ENVIAR emails.
Los MX son para RECIBIR emails en tu buzón contacto@swiftclick.com.ar.

Si usas cPanel/Amazon SES para recibir emails, déjalos como están.

---

## 🔧 Cambios Necesarios

### CAMBIO 1: Actualizar SPF
En tu panel de DNS (donde tienes los registros), **edita** el registro TXT de SPF:

**De:**
```
v=spf1 ip4:204.93.224.178 +a +mx include:relay.mailchannels.net ~all
```

**A:**
```
v=spf1 include:_spf.resend.com include:relay.mailchannels.net ~all
```

> ⚠️ **Nota:** Si no usas mailchannels, puedes simplificar a:
> `v=spf1 include:_spf.resend.com ~all`

### CAMBIO 2: Verificar dominio en Resend
1. Ve a https://resend.com/domains
2. Agrega `swiftclick.com.ar`
3. Resend verificará automáticamente los registros DNS
4. Espera a que aparezca como "Verified" ✅

---

## 📊 Resumen de Acciones

- [ ] Cambiar registro SPF (TXT) de `swiftclick.com.ar`
- [ ] Verificar dominio en dashboard de Resend
- [ ] Esperar propagación DNS (5-30 minutos)
- [ ] Probar con `node test-resend.js`

---

## 🧪 Después de los cambios

Una vez que actualices el SPF y verifiques en Resend, ejecuta:

```bash
node test-resend.js
```

El email debería llegar SIN el estado "suppressed".

---

## ❓ ¿Necesitas recibir emails en contacto@swiftclick.com.ar?

Si **SÍ** → Mantén los registros MX de Amazon SES o cPanel como están
Si **NO** → Puedes crear un email forwarding o alias en tu hosting

Resend es solo para **enviar** emails desde tu dominio, no para recibirlos.
