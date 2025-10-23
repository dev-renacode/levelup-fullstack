# Configuración de EmailJS para Envío de Boletas

## 📧 Configuración de EmailJS

Para habilitar el envío real de emails, necesitas configurar EmailJS siguiendo estos pasos:

### 1. Crear cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita
3. Verifica tu email

### 2. Configurar el servicio de email

1. En el dashboard de EmailJS, ve a **Email Services**
2. Agrega tu proveedor de email (Gmail, Outlook, etc.)
3. Sigue las instrucciones para conectar tu cuenta
4. Anota el **Service ID** generado

### 3. Crear templates de email

#### Template para Boletas (`template_boleta`)

Crea un template con estos campos:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Boleta de Compra - Level-UP Gamers</title>
</head>
<body>
    <h1>¡Gracias por tu compra!</h1>
    
    <p>Hola {{customer_name}},</p>
    
    <p>Tu compra ha sido procesada exitosamente. Aquí están los detalles:</p>
    
    <h2>Información de la Orden</h2>
    <ul>
        <li><strong>Número de Orden:</strong> {{order_number}}</li>
        <li><strong>ID:</strong> {{order_id}}</li>
        <li><strong>Fecha:</strong> {{order_date}}</li>
        <li><strong>Total:</strong> {{total_amount}}</li>
        <li><strong>Items:</strong> {{total_items}}</li>
    </ul>
    
    <h2>Dirección de Entrega</h2>
    <p>{{shipping_address}}</p>
    
    <p>Tu boleta en PDF se adjuntará en un email separado.</p>
    
    <p>Para consultas, contacta a {{company_email}}</p>
    
    <p>¡Gracias por elegir {{company_name}}!</p>
</body>
</html>
```

#### Template para Confirmación (`template_confirmacion`)

```html
<!DOCTYPE html>
<html>
<head>
    <title>Confirmación de Compra - Level-UP Gamers</title>
</head>
<body>
    <h1>Compra Confirmada</h1>
    
    <p>Hola {{customer_name}},</p>
    
    <p>Tu compra {{order_number}} ha sido confirmada.</p>
    
    <p>Total: {{total_amount}}</p>
    
    <p>Gracias por tu compra en {{company_name}}!</p>
</body>
</html>
```

### 4. Obtener las claves

1. Ve a **Account** > **General**
2. Copia tu **Public Key**
3. Anota tu **Service ID** y **Template IDs**

### 5. Configurar en el código

Actualiza el archivo `src/config/emailService.js`:

```javascript
// Reemplaza estos valores con los tuyos
const EMAILJS_SERVICE_ID = 'tu_service_id_aqui';
const EMAILJS_TEMPLATE_ID = 'tu_template_id_aqui';
const EMAILJS_PUBLIC_KEY = 'tu_public_key_aqui';
```

### 6. Variables del template

El sistema envía estas variables automáticamente:

- `{{to_email}}` - Email del destinatario
- `{{customer_name}}` - Nombre completo del cliente
- `{{order_number}}` - Número de orden
- `{{order_id}}` - ID de Firebase
- `{{order_date}}` - Fecha de la orden
- `{{total_amount}}` - Total formateado en CLP
- `{{total_items}}` - Cantidad de items
- `{{shipping_address}}` - Dirección de entrega
- `{{company_name}}` - Nombre de la empresa
- `{{company_email}}` - Email de contacto
- `{{company_phone}}` - Teléfono de contacto
- `{{website_url}}` - URL del sitio web

## 🚀 Modo de Desarrollo

Si no configuras EmailJS, el sistema usará un modo de simulación que:

- Muestra mensajes de "Email enviado" en la consola
- No envía emails reales
- Permite probar la funcionalidad sin configuración

## 📝 Notas Importantes

1. **Límites gratuitos**: EmailJS tiene límites en el plan gratuito
2. **Seguridad**: Nunca expongas tus claves en el código de producción
3. **Variables de entorno**: En producción, usa variables de entorno
4. **Testing**: Siempre prueba en modo desarrollo primero

## 🔧 Solución de Problemas

### Error: "EmailJS no está configurado"
- Verifica que las claves estén correctas
- Asegúrate de que el Service ID y Template ID existan

### Error: "Template not found"
- Verifica que el Template ID sea correcto
- Asegúrate de que el template esté publicado

### Error: "Service not found"
- Verifica que el Service ID sea correcto
- Asegúrate de que el servicio esté activo

## 📞 Soporte

Para problemas con EmailJS:
- [Documentación oficial](https://www.emailjs.com/docs/)
- [Comunidad](https://github.com/emailjs-com/emailjs-sdk)
