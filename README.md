# MetalHoverLab

Playground estatico para relieves blancos o marmol que el cursor metaliza con oro, plata o bronce manteniendo la sensacion de volumen.

## Objetivo

Tomar una imagen tipo bajorrelieve y producir:
- una preview donde el relieve siga viendose 3D
- un foco que el cursor mueve y que anade color metalico, brillo especular y luminosidad
- un snippet HTML/CSS/JS autocontenido para integrarlo en otras webs o apps

## Como usar

1. Abre `index.html` o entra en GitHub Pages.
2. Sube una imagen clara de relieve.
3. Ajusta los controles del foco y del material.
4. Pulsa `Exportar codigo` y copia o descarga el resultado.

## Controles incluidos

1. Metal
2. Radio de luz
3. Profundidad
4. Altura de luz
5. Especular
6. Tinte metalico
7. Halo
8. Aislamiento figuras

## Enfoque tecnico

- La referencia inspeccionada parece usar un `.riv` sobre `canvas` con input `Hover`.
- Este repo no depende de Rive para poder exportar el efecto.
- El renderer usa la imagen original como base visual y deriva un relieve util desde luminancia, gradientes y contrastes locales.
- El cursor mueve una luz localizada que recalcula sombreado, especular y tinte metalico sobre las zonas con relieve.

## Compatibilidad de exportacion

- el snippet usa `<canvas>` y `<script>` inline
- si el destino sanitiza esos bloques, el efecto no funcionara completo
- si subes imagenes grandes, el export crecera bastante porque embebe el asset como data URL

## Recomendaciones de imagen

- mejor con relieves blancos, marfil o gris muy claro
- mejor con fondo relativamente limpio
- cuanto mas claras sean las sombras del relieve, mas convincente resultara el relight
