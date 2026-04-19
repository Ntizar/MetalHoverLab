# MetalHoverLab

ES | EN

## ES

Playground estático para relieves blancos o mármol que el cursor metaliza con oro, plata, bronce o cualquier color libre manteniendo la sensación de volumen.

### Objetivo

Tomar una imagen tipo bajorrelieve y producir:
- una preview donde el relieve siga viéndose 3D
- un foco que el cursor mueve y que añade color metálico, brillo especular y luminosidad
- un snippet HTML/CSS/JS autocontenido para integrarlo en otras webs o apps

### Cómo usar

1. Abre `index.html` o entra en GitHub Pages.
2. Sube una imagen clara de relieve.
3. Elige oro, plata, bronce o `Color libre`.
4. Ajusta los controles del foco y del material.
5. Pulsa `Actualizar export`.
6. Copia el snippet, copia el HTML completo o descarga el archivo final.

### Controles incluidos

1. Metal o color libre
2. Radio de luz
3. Profundidad
4. Altura de luz
5. Especular
6. Tinte metálico
7. Halo
8. Aislamiento figuras

### Enfoque técnico

- La referencia inspeccionada parece usar un `.riv` sobre `canvas` con input `Hover`.
- Este repo no depende de Rive para poder exportar el efecto.
- El renderer usa la imagen original como base visual y deriva un relieve útil desde luminancia, gradientes y contrastes locales.
- El cursor mueve una luz localizada que recalcula sombreado, especular y tinte metálico sobre las zonas con relieve.

### Compatibilidad de exportación

- el snippet usa `<canvas>` y `<script>` inline
- si el destino sanitiza esos bloques, el efecto no funcionará completo
- si subes imágenes grandes, el export crecerá bastante porque embebe el asset como data URL

### Cómo incluir el efecto en una web o proyecto

#### Opción 1. HTML estático o landing simple

1. Exporta el snippet desde la herramienta.
2. Pégalo directamente en tu HTML.
3. Si necesitas cambiar tamaño, ajusta estas variables en la raíz exportada:

```html
<style>
  .hero-relief [id^="metal-relief-"] {
    --mhl-max-width: 960px;
    --mhl-padding: 12px;
    --mhl-radius: 22px;
  }
</style>
```

#### Opción 2. CMS o builder con soporte de script inline

1. Usa `Copiar snippet`.
2. Pega el bloque en un embed HTML.
3. Verifica que el editor no elimine `<script>`.

#### Opción 3. React, Next, Vue o proyectos con bundler

1. Usa el export como referencia.
2. Mueve el runtime JS a un archivo del proyecto.
3. Renderiza el contenedor desde tu componente y monta el renderer al cargar.
4. Mantén el asset de escena como `data URL`, import estático o URL remota.

### Recomendaciones de imagen

- mejor con relieves blancos, marfil o gris muy claro
- mejor con fondo relativamente limpio
- cuanto más claras sean las sombras del relieve, más convincente resultará el relight

## EN

Static playground for white or marble relief scenes that the cursor turns into gold, silver, bronze, or any custom color while preserving depth and volume.

### Goal

Take a bas-relief style image and produce:
- a preview where the relief still looks 3D
- a cursor-driven light source that adds metallic color, specular response, and glow
- a self-contained HTML/CSS/JS snippet that can be integrated into other websites or apps

### How to use

1. Open `index.html` or use GitHub Pages.
2. Upload a bright relief image.
3. Choose gold, silver, bronze, or `Custom color`.
4. Adjust the light and material controls.
5. Click `Actualizar export`.
6. Copy the snippet, copy the full HTML, or download the final file.

### Included controls

1. Metal or custom color
2. Light radius
3. Depth
4. Light height
5. Specular
6. Metallic tint
7. Glow
8. Figure isolation

### Technical approach

- The inspected reference appears to use a `.riv` file on top of `canvas` with a `Hover` input.
- This repo does not depend on Rive so the effect can be exported more easily.
- The renderer keeps the original image as the visual base and derives a usable relief model from luminance, gradients, and local contrast.
- The cursor moves a localized light source that recalculates shading, specular response, and metallic tint over the relief areas.

### Export compatibility

- the exported snippet uses inline `<canvas>` and `<script>`
- if the target environment sanitizes those blocks, the effect will not work completely
- if you upload large images, the exported payload will grow because the asset is embedded as a data URL

### How to include the effect in a website or project

#### Option 1. Static HTML or simple landing page

1. Export the snippet from the tool.
2. Paste it directly into your HTML.
3. If you need to resize it, adjust these variables on the exported root:

```html
<style>
  .hero-relief [id^="metal-relief-"] {
    --mhl-max-width: 960px;
    --mhl-padding: 12px;
    --mhl-radius: 22px;
  }
</style>
```

#### Option 2. CMS or builder with inline script support

1. Use `Copiar snippet`.
2. Paste the block into an HTML embed.
3. Make sure the editor does not strip `<script>`.

#### Option 3. React, Next, Vue, or bundled apps

1. Use the export as a reference.
2. Move the runtime JS into a project file.
3. Render the container from your component and mount the renderer on load.
4. Keep the relief scene as a `data URL`, a static import, or a remote URL.

### Image recommendations

- best with white, ivory, or very light gray relief scenes
- better with relatively clean backgrounds
- the clearer the shadow structure, the more convincing the relight result
