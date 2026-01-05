# SwiftClick 2026 - Landing Page

Landing page moderna con el diseño visual de **swift-click-2** aplicado a la estructura tradicional de landing page de **swift-click-landing**.

## 🎨 Diseño

- **Paleta de colores:** Violeta/morado (#6a5acd, #9d8df1, #b8a9ff)
- **Efectos:** Blur, gradientes, sombras con glow
- **Tipografía:** Inter (Google Fonts)
- **Estilo:** Moderno, elegante, profesional

## 📁 Estructura del Proyecto

```
swiftclick-2026/
├── index.html          # Página principal
├── css/
│   └── style.css       # Todos los estilos
├── js/
│   └── script.js       # JavaScript para interactividad
└── images/             # Carpeta para imágenes (vacía por ahora)
```

## 🚀 Cómo usar

### Opción 1: Abrir directamente
Simplemente abre `index.html` en tu navegador.

### Opción 2: Servidor local (recomendado)
```bash
# Con Python
python -m http.server 8000

# Con Node.js (si tenés http-server instalado)
npx http-server

# Con PHP
php -S localhost:8000
```

Luego abre: `http://localhost:8000`

## 📱 Secciones de la Landing

1. **Hero** - Presentación principal con CTA
2. **Diferencial** - 4 pilares clave
3. **Filosofía** - Valores y enfoque
4. **Infraestructura** - Capacidades técnicas
5. **Visión** - Objetivos a largo plazo
6. **Integración** - Cómo trabajamos
7. **Contacto** - Formulario + información
8. **Footer** - Links y legal

## ✨ Características

- ✅ Navbar fijo con efecto al hacer scroll
- ✅ Navegación mobile responsive (hamburger menu)
- ✅ Smooth scroll entre secciones
- ✅ Animaciones fade-in al hacer scroll
- ✅ Formulario de contacto funcional
- ✅ Efectos hover en cards y botones
- ✅ Gradientes y efectos de luz del diseño original
- ✅ 100% responsive (mobile, tablet, desktop)

## 🎯 Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Variables CSS, Grid, Flexbox, animaciones
- **JavaScript Vanilla** - Sin dependencias

## 🔧 Personalización

### Colores
Editá las variables CSS en `css/style.css`:
```css
:root {
    --primary-purple: #6a5acd;
    --primary-light: #9d8df1;
    --primary-accent: #b8a9ff;
    /* ... más colores */
}
```

### Contenido
Todo el contenido está en `index.html`. Es fácil de editar porque está en HTML puro.

### Formulario
El formulario actualmente simula el envío. Para conectarlo a un backend:

1. Abrí `js/script.js`
2. Buscá la función `simulateFormSubmission`
3. Reemplazala con tu llamada API real:

```javascript
async function submitForm(data) {
    const response = await fetch('TU_ENDPOINT_API', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
}
```

## 📸 Imágenes

La carpeta `images/` está lista para que agregues:
- Logo de SwiftClick
- Favicon
- Imágenes de casos de éxito (si querés)
- Iconos personalizados

Para agregar el logo, reemplazá en `index.html`:
```html
<a href="#" class="logo">SWIFTCLICK</a>
```
por:
```html
<a href="#" class="logo">
    <img src="images/logo.svg" alt="SwiftClick">
</a>
```

## 🌐 Deploy

### GitHub Pages
1. Pusheá el código a un repo de GitHub
2. Ve a Settings → Pages
3. Seleccioná la rama main
4. ¡Listo! Tu sitio estará en `https://tuusuario.github.io/repo-name`

### Netlify / Vercel
Simplemente arrastrá la carpeta completa o conectá tu repo de GitHub.

## 📊 Performance

- ⚡ Sin frameworks pesados
- ⚡ CSS y JS optimizados
- ⚡ Carga rápida
- ⚡ SEO-friendly

## 📝 Notas

- El diseño mantiene la estética moderna de swift-click-2
- La estructura es una landing page tradicional (no paginada)
- Todo el código es limpio y comentado
- Fácil de mantener y personalizar

## 🤝 Créditos

Diseño visual basado en: **swift-click-2** (Astro)  
Estructura basada en: **swift-click-landing** (HTML/CSS/JS)  
Implementación: **GitHub Copilot** (Enero 2026)

---

**¿Necesitás ayuda?** Revisá el código, está comentado y es fácil de entender.
