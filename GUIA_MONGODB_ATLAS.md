# 🗄️ Guía: Configurar MongoDB en la Nube (MongoDB Atlas)

## ❓ ¿Por qué necesito MongoDB en la nube?

### Tu situación ACTUAL (Desarrollo):
```
Tu Computadora
├── MongoDB (localhost:27017) ← Solo funciona aquí
├── Backend (localhost:3000)
└── Frontend (localhost:5173)
```

### Situación PRODUCCIÓN (necesaria):
```
Internet
├── MongoDB Atlas (cloud.mongodb.com) ← Accesible desde cualquier lugar
├── Backend en Render (etronix.render.com)
└── Frontend en Vercel (etronix.vercel.app)
```

**Sin MongoDB en la nube, cuando despliegues tu backend NO tendrá dónde guardar los pedidos.**

---

## 🆓 Opción Recomendada: MongoDB Atlas (GRATIS)

MongoDB Atlas ofrece:
- ✅ **512 MB gratis para siempre** (suficiente para iniciar)
- ✅ Backups automáticos
- ✅ Monitoreo 24/7
- ✅ No necesitas tarjeta de crédito para plan gratis
- ✅ Fácil de configurar

---

## 📝 Paso 1: Crear Cuenta en MongoDB Atlas

1. Ir a: https://www.mongodb.com/cloud/atlas/register
2. Registrarse con:
   - Email
   - O cuenta de Google (más rápido)
3. Completar información básica

---

## 🏗️ Paso 2: Crear un Cluster (Base de Datos)

1. Después de registrarte, verás **"Create a deployment"**
2. Seleccionar opciones:

   **Tipo:** `M0` (Free)  
   **Provider:** `AWS` (recomendado)  
   **Region:** `N. Virginia (us-east-1)` o `São Paulo (sa-east-1)` (más cercano a Colombia)  
   **Cluster Name:** `etronix-store` (o el nombre que quieras)

3. Click en **"Create Deployment"**
4. Esperar 1-3 minutos mientras se crea

---

## 🔐 Paso 3: Crear Usuario de Base de Datos

Se abrirá un modal para crear usuario:

```
Username: etronix_admin
Password: [Genera uno seguro o usa el sugerido]
```

⚠️ **IMPORTANTE:** Guarda esta contraseña, la necesitarás después.

Ejemplo de contraseña generada: `Xy9mK2pQ8vL4tN6w`

---

## 🌐 Paso 4: Configurar Acceso desde Internet

1. En el modal, o ir a **"Network Access"** en el menú izquierdo
2. Click en **"Add IP Address"**
3. Opciones:

   **Opción A - Permitir TODO (más fácil, menos seguro):**
   - Click en **"Allow Access from Anywhere"**
   - IP: `0.0.0.0/0`
   - ⚠️ Esto permite acceso desde cualquier IP

   **Opción B - Solo tu servidor (más seguro):**
   - Agregar la IP de Render/Railway después del deploy
   - Por ahora usa la Opción A para probar

4. Click en **"Confirm"**

---

## 🔗 Paso 5: Obtener la URL de Conexión

1. Ir a **"Database"** en el menú izquierdo
2. En tu cluster, click en **"Connect"**
3. Seleccionar **"Drivers"**
4. Copiar la **Connection String**:

```
mongodb+srv://etronix_admin:<password>@etronix-store.abc123.mongodb.net/?retryWrites=true&w=majority
```

5. **Reemplazar `<password>`** con la contraseña que creaste:

```
mongodb+srv://etronix_admin:Xy9mK2pQ8vL4tN6w@etronix-store.abc123.mongodb.net/?retryWrites=true&w=majority
```

6. **Agregar el nombre de la base de datos** antes del `?`:

```
mongodb+srv://etronix_admin:Xy9mK2pQ8vL4tN6w@etronix-store.abc123.mongodb.net/etronix?retryWrites=true&w=majority
```

---

## ⚙️ Paso 6: Configurar en tu Aplicación

### Backend .env (local, para probar):

```bash
# MongoDB Atlas - Producción
MONGODB_URI=mongodb+srv://etronix_admin:Xy9mK2pQ8vL4tN6w@etronix-store.abc123.mongodb.net/etronix?retryWrites=true&w=majority
```

### Probar conexión:

```bash
cd backend
npm run dev
```

Deberías ver en los logs:
```
MongoDB conectado exitosamente
```

---

## 📊 Paso 7: Migrar Datos (si tienes datos locales)

Si ya tienes productos/pedidos en tu MongoDB local:

### Opción A - Exportar e Importar con mongodump/mongorestore:

```bash
# Exportar desde local
mongodump --db etronix --out ./backup

# Importar a Atlas (reemplaza con tu URL)
mongorestore --uri="mongodb+srv://usuario:password@cluster.mongodb.net/etronix" ./backup/etronix
```

### Opción B - Ejecutar seeds nuevamente:

```bash
cd backend
npm run seed:productos
```

Los productos se guardarán ahora en MongoDB Atlas.

---

## 🔒 Mejores Prácticas de Seguridad

### ✅ Hacer:
- Usar contraseñas fuertes y únicas
- Cambiar la contraseña periódicamente
- Restringir IPs cuando sea posible
- Monitorear actividad en el dashboard

### ❌ No hacer:
- Subir la URL con contraseña a GitHub
- Usar contraseñas simples como "123456"
- Compartir credenciales sin cifrar
- Dar acceso innecesario

---

## 📈 Monitoreo y Mantenimiento

### Ver actividad de la BD:

1. Dashboard de MongoDB Atlas
2. **"Metrics"** → Ver uso de almacenamiento, consultas, etc.
3. **"Collections"** → Ver datos directamente

### Backups:

El plan gratuito incluye:
- Snapshots (copias) automáticas
- Recuperación en caso de error

---

## 💰 Límites del Plan Gratuito

| Recurso | Límite |
|---------|--------|
| Almacenamiento | 512 MB |
| RAM | Compartida |
| Clusters | 1 |
| Costo | $0 / mes |

**¿512 MB es suficiente?**
- Para empezar: **SÍ**
- ~1000-5000 productos + pedidos
- Si creces, puedes upgradear

---

## 🚀 Cuando Despliegues

Recuerda actualizar `MONGODB_URI` en:

1. **Render/Railway (Backend):**
   - Variables de entorno → `MONGODB_URI`
   - Valor: URL de MongoDB Atlas

2. **NO en Frontend:**
   - El frontend NO necesita acceso directo a la BD
   - Solo el backend se conecta

---

## 🆚 Alternativas a MongoDB Atlas

| Servicio | Plan Gratis | Pros | Contras |
|----------|-------------|------|---------|
| **MongoDB Atlas** | 512 MB | Fácil, confiable | Límite de almacenamiento |
| **Railway** | $5 crédito | Backend + DB juntos | Pago después del crédito |
| **DigitalOcean** | No | Más control | Requiere configuración |
| **AWS** | 12 meses gratis | Escalable | Complejo para principiantes |

**Recomendación:** Empieza con **MongoDB Atlas** (gratis y fácil).

---

## ❓ Preguntas Frecuentes

### ¿Puedo usar MongoDB local en producción?
❌ No, tu computadora debe estar prendida 24/7 y tener IP pública.

### ¿Los datos están seguros en Atlas?
✅ Sí, MongoDB Atlas tiene cifrado y backups automáticos.

### ¿Qué pasa si excedo 512 MB?
⚠️ Tendrás que upgradear a un plan de pago (~$9/mes).

### ¿Puedo cambiar de servidor después?
✅ Sí, puedes exportar e importar los datos a otro servidor.

---

## 📞 Soporte

- Documentación: https://docs.atlas.mongodb.com/
- Soporte: https://www.mongodb.com/contact
- Comunidad: https://community.mongodb.com/

---

## ✅ Checklist Final

- [ ] Cuenta de MongoDB Atlas creada
- [ ] Cluster creado (M0 Free)
- [ ] Usuario de BD creado
- [ ] Network Access configurado
- [ ] Connection String obtenida
- [ ] Contraseña reemplazada en la URL
- [ ] Nombre de BD agregado (`/etronix`)
- [ ] `MONGODB_URI` actualizada en `.env`
- [ ] Conexión probada localmente
- [ ] Seeds ejecutados (productos cargados)

---

**¡Listo! Ahora tu base de datos está en la nube y lista para producción.** 🎉
