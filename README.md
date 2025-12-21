# Piensa y Elige — Flip Book Interactivo (PWA)

PWA educativa con 14 historias interactivas, decisiones y finales alternativos. Funciona offline mediante Service Worker y puede instalarse en Android.

## Estructura
- `index.html`: interfaz principal.
- `css/styles.css`: estilos.
- `js/app.js`: lógica y datos de historias.
- `manifest.json`: metadatos PWA.
- `service-worker.js`: caché para uso offline.
- `assets/images/`: ilustraciones (98 archivos PNG: 14 historias × 7 páginas).
- `assets/icons/`: iconos PWA.
- `Historias_Piensa_y_Elige.xlsx`: hoja editable con historias, decisiones y finales.

## Uso en navegador
1. Servir la carpeta (`python -m http.server` o `npx serve`).
2. Abrir `index.html` y usar el botón **Instalar App**.

## Android (Trusted Web Activity)
1. Publica la PWA en HTTPS.
2. Usa Bubblewrap: `bubblewrap init` → `bubblewrap build`.
3. Instala el APK generado y prueba en dispositivo.

## Personalización
- Reemplaza las imágenes en `assets/images/` por ilustraciones definitivas.
- Edita textos/decisiones en `js/app.js` o en el Excel y sincroniza.
