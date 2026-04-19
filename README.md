# MetalHoverLab

ES | EN

## ES

Playground estático para relieves blancos o mármol que el cursor metaliza con oro, plata, bronce o cualquier color libre manteniendo la sensación de volumen.

Incluye presets reales, control de intensidad de mármol base y export tanto HTML como React/Next.

### Objetivo

Tomar una imagen tipo bajorrelieve y producir:
- una preview donde el relieve siga viéndose 3D
- un foco que el cursor mueve y que añade color metálico, brillo especular y luminosidad
- un snippet HTML/CSS/JS autocontenido para integrarlo en otras webs o apps

### Cómo usar

1. Abre `index.html` o entra en GitHub Pages.
2. Sube una imagen clara de relieve.
3. Usa la demo interna o los presets `Bisonte I` y `Bisonte II`.
4. Elige oro, plata, bronce o `Color libre`.
5. Ajusta los controles del foco, la base mármol y el material.
6. Pulsa `Actualizar export`.
7. Copia el snippet, copia el HTML completo, copia el export React/Next o descarga el archivo final.

### Controles incluidos

1. Metal o color libre
2. Base mármol
3. Radio de luz
4. Profundidad
5. Altura de luz
6. Especular
7. Tinte metálico
8. Halo
9. Aislamiento figuras

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

1. Usa el bloque `Export React / Next`.
2. Pega el componente en un archivo cliente del proyecto.
3. Si quieres, mueve el runtime a un helper compartido en lugar de dejarlo inline.
4. Mantén el asset de escena como `data URL`, import estático o URL remota.

### Recomendaciones de imagen

- mejor con relieves blancos, marfil o gris muy claro
- mejor con fondo relativamente limpio
- cuanto más claras sean las sombras del relieve, más convincente resultará el relight

## EN

Static playground for white or marble relief scenes that the cursor turns into gold, silver, bronze, or any custom color while preserving depth and volume.

It includes real presets, base marble intensity control, and both HTML and React/Next exports.

### Goal

Take a bas-relief style image and produce:
- a preview where the relief still looks 3D
- a cursor-driven light source that adds metallic color, specular response, and glow
- a self-contained HTML/CSS/JS snippet that can be integrated into other websites or apps

### How to use

1. Open `index.html` or use GitHub Pages.
2. Upload a bright relief image.
3. Use the built-in demo or the `Bisonte I` and `Bisonte II` presets.
4. Choose gold, silver, bronze, or `Custom color`.
5. Adjust the light, marble base, and material controls.
6. Click `Actualizar export`.
7. Copy the snippet, copy the full HTML, copy the React/Next export, or download the final file.

### Included controls

1. Metal or custom color
2. Marble base
3. Light radius
4. Depth
5. Light height
6. Specular
7. Metallic tint
8. Glow
9. Figure isolation

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

1. Use the `React / Next export` block.
2. Paste the component into a client-side file.
3. Optionally move the runtime into a shared helper instead of keeping it inline.
4. Keep the relief scene as a `data URL`, a static import, or a remote URL.

### Image recommendations

- best with white, ivory, or very light gray relief scenes
- better with relatively clean backgrounds
- the clearer the shadow structure, the more convincing the relight result
