# MetalHoverLab

Playground estatico para recrear un hover metalizado exportable sobre una figura blanca usando oro, plata o bronce.

## Objetivo

Tomar:
- un fondo cualquiera
- una figura blanca en PNG o SVG con transparencia

Y producir:
- una preview interactiva con brillo metalico y hotspot siguiendo el puntero
- un snippet HTML/CSS/JS autocontenido para pegar en proyectos que permitan estilos y script inline

## Como usar

1. Abre `index.html` en el navegador.
2. Sube una imagen de fondo si quieres salir del gradiente demo.
3. Sube una figura blanca con transparencia.
4. Ajusta los 7 controles del efecto.
5. Pulsa `Exportar codigo` y copia o descarga el resultado.

## Compatibilidad de exportacion

- el snippet exportado usa `<style>` y `<script>` inline
- si el destino sanitiza esos bloques, el brillo dinamico no funcionara completo
- si cargas imagenes grandes, el HTML exportado crecera mucho porque embebe los assets como data URL

## Controles incluidos

1. Metal: oro, plata o bronce
2. Tamano
3. Luminosidad
4. Contraste
5. Ancho del brillo
6. Velocidad hover
7. Halo

## Enfoque tecnico

- El sitio de referencia inspeccionado parece usar un `.riv` de Rive sobre `canvas` con un input `Hover`.
- Este repo no depende de Rive para que el efecto sea portable.
- La figura se usa como `mask-image`.
- El metal sale de varias capas CSS: base, barrido especular, hotspot reactivo y rim light.
- La exportacion embebe la configuracion actual y las imagenes subidas si las hay.

## Nota importante

Para obtener el mejor resultado, la figura debe ser:
- PNG o SVG
- fondo transparente
- silueta clara y limpia

Si subes una imagen sin transparencia, la mascara puede cubrir mas area de la deseada.
