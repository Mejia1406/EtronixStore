# 🔐 Guía: Obtener Credenciales de MercadoPago para PRODUCCIÓN

## 📋 Requisitos Previos

1. **Cuenta de MercadoPago**: El profesor debe tener una cuenta de MercadoPago Colombia
2. **Verificación**: La cuenta debe estar verificada (documento de identidad)
3. **Datos bancarios**: Cuenta bancaria vinculada para recibir pagos

---

## 🔑 Paso 1: Crear/Acceder a la Cuenta

1. Ir a: https://www.mercadopago.com.co/
2. Si no tiene cuenta: **"Crear cuenta"**
3. Si ya tiene cuenta: **"Ingresar"**

**Importante:** Debe completar TODA la verificación de identidad para poder recibir pagos reales.

---

## 🛠️ Paso 2: Acceder al Panel de Desarrolladores

1. Iniciar sesión en MercadoPago
2. Ir a: https://www.mercadopago.com.co/developers/panel
3. O bien: Menú → "Desarrolladores" → "Tus integraciones"

---

## 🔐 Paso 3: Obtener las Credenciales

### A) **Para el BACKEND (Access Token - PRIVADO)**

1. En el panel de desarrolladores, buscar **"Credenciales"**
2. Verás dos pestañas:
   - ❌ **"Credenciales de prueba"** (las que usas ahora)
   - ✅ **"Credenciales de producción"** (las que necesitas)
3. Hacer clic en **"Credenciales de producción"**
4. Copiar el **"Access Token"** (empieza con `APP_USR-...`)
   
   ```
   Ejemplo: APP_USR-1234567890123456-070123-abcdef1234567890abcdef1234567890-12345678
   ```

5. **⚠️ NUNCA compartir este token públicamente** (da acceso total a la cuenta)

### B) **Para el FRONTEND (Public Key - PÚBLICO)**

1. En la misma página de **"Credenciales de producción"**
2. Copiar la **"Public Key"** (empieza con `APP_USR-...` o `TEST-...`)
   
   ```
   Ejemplo: APP_USR-abcd1234-5678-90ef-ghij-klmnopqrstuv
   ```

3. Esta SÍ puede estar en el código del frontend (no es sensible)

---

## 📝 Paso 4: Configurar en tu Aplicación

### Backend (.env):
```bash
# MercadoPago - PRODUCCIÓN
MP_ACCESS_TOKEN=APP_USR-1234567890123456-070123-abcdef1234567890abcdef1234567890-12345678
```

### Frontend (.env):
```bash
# MercadoPago Public Key - PRODUCCIÓN
VITE_MP_PUBLIC_KEY=APP_USR-abcd1234-5678-90ef-ghij-klmnopqrstuv
```

---

## ⚠️ Diferencias TEST vs PRODUCCIÓN

| Aspecto | TEST | PRODUCCIÓN |
|---------|------|-----------|
| **Pagos** | Simulados (tarjetas de prueba) | REALES (dinero real) |
| **Cobros** | No se cobra al cliente | Sí se cobra al cliente |
| **Recepción** | No recibes dinero | Sí recibes dinero en tu cuenta |
| **Webhooks** | Funcionan igual | Funcionan igual |
| **Prefijo** | `TEST-...` | `APP_USR-...` |

---

## 🧪 Tarjetas de Prueba (solo TEST)

Estas **NO funcionan** en producción:

| Tarjeta | Número | CVV | Resultado |
|---------|--------|-----|-----------|
| Visa | 4509 9535 6623 3704 | 123 | Aprobado |
| Mastercard | 5031 7557 3453 0604 | 123 | Aprobado |

En producción solo funcionan tarjetas REALES.

---

## ✅ Paso 5: Activar Webhook en MercadoPago

Para recibir notificaciones de pagos:

1. Panel de Desarrolladores → **"Webhooks"**
2. **"Crear webhook"**
3. **URL de notificación:** `https://TU-DOMINIO.com/api/payments/webhook`
   - ⚠️ Debe ser HTTPS (no HTTP)
   - Ejemplo: `https://etronix-backend.render.com/api/payments/webhook`
4. **Eventos a suscribir:**
   - ✅ `payment` (pagos)
   - ✅ `merchant_order` (órdenes)
5. Guardar

---

## 🔒 Seguridad

### ⚠️ LO QUE NUNCA DEBES HACER:

❌ Subir el Access Token a GitHub  
❌ Compartir el Access Token por WhatsApp/email sin encriptar  
❌ Poner el Access Token en el frontend  
❌ Usar credenciales TEST en producción  

### ✅ LO QUE SÍ DEBES HACER:

✅ Guardar el Access Token en archivo `.env` (que está en `.gitignore`)  
✅ Usar variables de entorno en el servidor  
✅ Cambiar las credenciales si sospechas que fueron comprometidas  
✅ Monitorear pagos en el panel de MercadoPago  

---

## 🧪 Cómo Probar Antes de Lanzar

### 1. En ambiente TEST (desarrollo):
- Usa credenciales TEST
- Usa tarjetas de prueba
- Verifica que todo funciona

### 2. En ambiente PROD (producción):
- Cambia a credenciales PROD
- Haz UNA compra real pequeña (ej: $5.000 COP)
- Verifica que:
  - El pago se procesa correctamente
  - Recibes el webhook
  - El dinero llega a la cuenta del profesor
  - El pedido aparece en el panel admin

### 3. Después de confirmar:
- Ya puedes lanzar oficialmente
- Compartir el link con clientes reales

---

## 📞 Soporte de MercadoPago

Si tienes problemas:
- Panel de MercadoPago → "Ayuda"
- Chat en vivo: https://www.mercadopago.com.co/ayuda
- Email: developers@mercadopago.com
- Documentación: https://www.mercadopago.com.co/developers/es/docs

---

## 🎯 Resumen Rápido

```bash
# 1. Ingresar a:
https://www.mercadopago.com.co/developers/panel

# 2. Ir a "Credenciales de producción"

# 3. Copiar:
- Access Token (backend) → MP_ACCESS_TOKEN
- Public Key (frontend) → VITE_MP_PUBLIC_KEY

# 4. Configurar webhook:
https://TU-DOMINIO.com/api/payments/webhook

# 5. Probar con una compra real pequeña

# 6. ¡Lanzar! 🚀
```

---

**Última actualización:** Noviembre 2025
