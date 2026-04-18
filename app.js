const DEFAULT_FIGURE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 620" fill="none">
  <g fill="#ffffff">
    <circle cx="210" cy="82" r="54" />
    <path d="M141 150c16-16 39-26 69-26s53 10 69 26c22 22 34 48 34 75v30c0 18-9 35-23 46v19c0 44 14 86 40 119l28 34c21 25 32 56 32 88v31H30v-31c0-32 11-63 32-88l28-34c26-33 40-75 40-119v-19c-14-11-23-28-23-46v-30c0-27 12-53 34-75Z" />
    <path d="M120 230c0-24 19-43 43-43h94c24 0 43 19 43 43v46c0 24-19 43-43 43h-94c-24 0-43-19-43-43v-46Z" />
    <rect x="146" y="296" width="128" height="160" rx="54" />
    <rect x="170" y="438" width="80" height="136" rx="28" />
    <circle cx="158" cy="250" r="14" />
    <circle cx="262" cy="250" r="14" />
    <path d="M178 88c9 9 20 14 32 14 12 0 23-5 32-14 0 37-17 55-32 55-15 0-32-18-32-55Z" />
  </g>
</svg>`;

const DEFAULT_FIGURE_DATA_URL = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(DEFAULT_FIGURE_SVG)}`;

const DEFAULT_BACKDROP = "radial-gradient(circle at 18% 16%, rgba(255, 255, 255, 0.62) 0%, rgba(255, 255, 255, 0.18) 12%, transparent 32%), radial-gradient(circle at 74% 26%, rgba(255, 255, 255, 0.28) 0%, transparent 24%), linear-gradient(135deg, #efe3c3 0%, #ccb27b 28%, #7f90a7 60%, #273247 100%)";

const PRESETS = {
  gold: {
    label: "Oro",
    light: "#fff2b0",
    mid: "#d8a73c",
    shadow: "#6b4307",
    glow: "rgba(255, 209, 107, 0.42)",
    accent: "#f0d48f"
  },
  silver: {
    label: "Plata",
    light: "#ffffff",
    mid: "#c5ccd5",
    shadow: "#5e6978",
    glow: "rgba(236, 240, 255, 0.38)",
    accent: "#d8dde6"
  },
  bronze: {
    label: "Bronce",
    light: "#f3ccae",
    mid: "#b97843",
    shadow: "#5b2f14",
    glow: "rgba(233, 151, 91, 0.34)",
    accent: "#e0b590"
  }
};

const state = {
  metal: "silver",
  scale: 88,
  brightness: 118,
  contrast: 114,
  sweepWidth: 16,
  speed: 0.82,
  glow: 16,
  backgroundSrc: "",
  figureSrc: DEFAULT_FIGURE_DATA_URL,
  backgroundName: "Gradiente demo",
  figureName: "Placeholder"
};

const rootStyle = document.documentElement.style;

const controls = {
  backgroundUpload: document.querySelector("#backgroundUpload"),
  figureUpload: document.querySelector("#figureUpload"),
  metalPreset: document.querySelector("#metalPreset"),
  scale: document.querySelector("#scale"),
  brightness: document.querySelector("#brightness"),
  contrast: document.querySelector("#contrast"),
  sweepWidth: document.querySelector("#sweepWidth"),
  speed: document.querySelector("#speed"),
  glow: document.querySelector("#glow"),
  generateExport: document.querySelector("#generateExport"),
  copyExport: document.querySelector("#copyExport"),
  downloadExport: document.querySelector("#downloadExport"),
  exportCode: document.querySelector("#exportCode"),
  assetStatus: document.querySelector("#assetStatus"),
  copyFeedback: document.querySelector("#copyFeedback"),
  stage: document.querySelector("#stage"),
  stageBackdrop: document.querySelector("#stageBackdrop"),
  scaleValue: document.querySelector("#scaleValue"),
  brightnessValue: document.querySelector("#brightnessValue"),
  contrastValue: document.querySelector("#contrastValue"),
  sweepWidthValue: document.querySelector("#sweepWidthValue"),
  speedValue: document.querySelector("#speedValue"),
  glowValue: document.querySelector("#glowValue")
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function setMask(styleTarget, source) {
  styleTarget.setProperty("--mask-image", `url("${source}")`);
}

function setPointer(styleTarget, x, y) {
  styleTarget.setProperty("--pointer-x", `${x}%`);
  styleTarget.setProperty("--pointer-y", `${y}%`);
}

function resetPointer(styleTarget = rootStyle) {
  setPointer(styleTarget, 54, 33);
}

function setSweepStops(styleTarget, width) {
  const outer = clamp(Number(width), 8, 26);
  const inner = Number((outer * 0.36).toFixed(2));
  styleTarget.setProperty("--sweep-start", `${50 - outer}%`);
  styleTarget.setProperty("--sweep-core-start", `${50 - inner}%`);
  styleTarget.setProperty("--sweep-core-end", `${50 + inner}%`);
  styleTarget.setProperty("--sweep-end", `${50 + outer}%`);
}

function applyBackdrop() {
  if (state.backgroundSrc) {
    controls.stageBackdrop.style.backgroundImage = `linear-gradient(180deg, rgba(9, 11, 16, 0.08), rgba(9, 11, 16, 0.28)), url("${state.backgroundSrc}")`;
  } else {
    controls.stageBackdrop.style.backgroundImage = DEFAULT_BACKDROP;
  }
}

function applyPreset() {
  const preset = PRESETS[state.metal];
  rootStyle.setProperty("--accent", preset.accent);
  rootStyle.setProperty("--metal-light", preset.light);
  rootStyle.setProperty("--metal-mid", preset.mid);
  rootStyle.setProperty("--metal-shadow", preset.shadow);
  rootStyle.setProperty("--metal-glow", preset.glow);
}

function updateOutputs() {
  controls.scaleValue.textContent = `${state.scale}%`;
  controls.brightnessValue.textContent = `${state.brightness}%`;
  controls.contrastValue.textContent = `${state.contrast}%`;
  controls.sweepWidthValue.textContent = `${state.sweepWidth}%`;
  controls.speedValue.textContent = `${Number(state.speed).toFixed(2)}s`;
  controls.glowValue.textContent = `${state.glow}px`;
}

function updateAssetStatus() {
  const backgroundStatus = state.backgroundSrc ? `Fondo: ${state.backgroundName}` : "Gradiente demo";
  const figureStatus = state.figureSrc === DEFAULT_FIGURE_DATA_URL ? "placeholder" : state.figureName;
  controls.assetStatus.textContent = `${backgroundStatus} + ${figureStatus}`;
}

function applyStateToPreview() {
  applyPreset();
  rootStyle.setProperty("--artifact-scale", (state.scale / 100).toFixed(2));
  rootStyle.setProperty("--artifact-brightness", (state.brightness / 100).toFixed(2));
  rootStyle.setProperty("--artifact-contrast", (state.contrast / 100).toFixed(2));
  rootStyle.setProperty("--artifact-glow", `${state.glow}px`);
  rootStyle.setProperty("--sweep-duration", `${Number(state.speed).toFixed(2)}s`);
  setSweepStops(rootStyle, state.sweepWidth);
  setMask(rootStyle, state.figureSrc);
  applyBackdrop();
  updateOutputs();
  updateAssetStatus();
}

function updatePointerFromEvent(event, styleTarget = rootStyle, element = controls.stage) {
  const rect = element.getBoundingClientRect();
  const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 4, 96);
  const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 4, 96);
  setPointer(styleTarget, x, y);
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function showFeedback(message, isError = false) {
  controls.copyFeedback.textContent = message;
  const exportField = document.querySelector("#exportField");
  exportField.classList.toggle("field--error", isError);

  window.setTimeout(() => {
    controls.copyFeedback.textContent = "";
    exportField.classList.remove("field--error");
  }, isError ? 3200 : 1800);
}

function warnIfLargeAsset(file, label) {
  const sizeInMb = file.size / (1024 * 1024);
  if (sizeInMb >= 1.5) {
    showFeedback(`${label} pesado: ${sizeInMb.toFixed(1)} MB en el export`, false);
  }
}

function buildExportSnippet() {
  const exportId = `metal-hover-${Math.random().toString(36).slice(2, 8)}`;
  const config = {
    metal: state.metal,
    scale: Number(state.scale),
    brightness: Number(state.brightness),
    contrast: Number(state.contrast),
    sweepWidth: Number(state.sweepWidth),
    speed: Number(Number(state.speed).toFixed(2)),
    glow: Number(state.glow),
    backgroundSrc: state.backgroundSrc,
    figureSrc: state.figureSrc
  };

  return `<!-- MetalHoverLab export -->
<section id="${exportId}" class="mhl-stage">
  <div class="mhl-stage__backdrop"></div>
  <div class="mhl-stage__grain"></div>
  <div class="mhl-artifact">
    <div class="mhl-layer mhl-base"></div>
    <div class="mhl-layer mhl-sheen"></div>
    <div class="mhl-layer mhl-pointer"></div>
    <div class="mhl-rim"></div>
  </div>
</section>

<style>
  #${exportId} {
    --metal-light: #ffffff;
    --metal-mid: #c5ccd5;
    --metal-shadow: #5e6978;
    --metal-glow: rgba(236, 240, 255, 0.38);
    --artifact-scale: 0.88;
    --artifact-brightness: 1.18;
    --artifact-contrast: 1.14;
    --artifact-glow: 16px;
    --pointer-x: 54%;
    --pointer-y: 33%;
    --sweep-duration: 0.82s;
    --sweep-start: 34%;
    --sweep-core-start: 44.24%;
    --sweep-core-end: 55.76%;
    --sweep-end: 66%;
    --mask-image: none;
    position: relative;
    min-height: 540px;
    border-radius: 28px;
    overflow: hidden;
    isolation: isolate;
    background: #171b24;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 28px 70px rgba(0, 0, 0, 0.24);
  }

  #${exportId}::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(17, 21, 29, 0.02), rgba(7, 10, 16, 0.4)), radial-gradient(circle at 18% 16%, rgba(255, 255, 255, 0.22), transparent 18%), radial-gradient(circle at 72% 18%, rgba(255, 255, 255, 0.12), transparent 22%);
    pointer-events: none;
    z-index: 1;
  }

  #${exportId} .mhl-stage__backdrop,
  #${exportId} .mhl-stage__grain,
  #${exportId} .mhl-artifact {
    position: absolute;
  }

  #${exportId} .mhl-stage__backdrop,
  #${exportId} .mhl-stage__grain {
    inset: 0;
  }

  #${exportId} .mhl-stage__backdrop {
    background-position: center;
    background-size: cover;
    transform: scale(1.02);
    filter: saturate(1.02) contrast(1.03);
  }

  #${exportId} .mhl-stage__grain {
    z-index: 2;
    pointer-events: none;
    opacity: 0.2;
    background-image: linear-gradient(transparent, rgba(255, 255, 255, 0.04)), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0, rgba(255, 255, 255, 0.05) 1px, transparent 1px, transparent 5px);
    mix-blend-mode: soft-light;
  }

  #${exportId} .mhl-artifact {
    z-index: 3;
    right: clamp(1rem, 4vw, 3.2rem);
    bottom: clamp(1rem, 4vw, 2.4rem);
    width: min(38vw, 460px);
    aspect-ratio: 0.68 / 1;
    transform: scale(var(--artifact-scale));
    transform-origin: bottom center;
    transition: transform 0.22s ease, filter 0.22s ease;
    filter: drop-shadow(0 24px 48px rgba(0, 0, 0, 0.36)) drop-shadow(0 0 var(--artifact-glow) var(--metal-glow));
    isolation: isolate;
  }

  #${exportId}:hover .mhl-artifact {
    transform: scale(calc(var(--artifact-scale) + 0.03));
  }

  #${exportId} .mhl-layer,
  #${exportId} .mhl-rim {
    position: absolute;
    inset: 0;
    -webkit-mask-image: var(--mask-image);
    mask-image: var(--mask-image);
    -webkit-mask-position: center;
    mask-position: center;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-mode: alpha;
    mask-mode: alpha;
  }

  #${exportId} .mhl-base {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.22), transparent 28%), radial-gradient(circle at var(--pointer-x) var(--pointer-y), rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.16) 12%, transparent 34%), linear-gradient(120deg, var(--metal-shadow) 0%, var(--metal-mid) 15%, var(--metal-light) 28%, #ffffff 33%, var(--metal-mid) 44%, var(--metal-shadow) 61%, var(--metal-light) 76%, var(--metal-mid) 88%, var(--metal-shadow) 100%);
    filter: brightness(var(--artifact-brightness)) contrast(var(--artifact-contrast)) saturate(1.18);
  }

  #${exportId} .mhl-sheen {
    background: linear-gradient(108deg, transparent var(--sweep-start), rgba(255, 255, 255, 0.12) var(--sweep-core-start), rgba(255, 255, 255, 0.92) 50%, rgba(255, 255, 255, 0.16) var(--sweep-core-end), transparent var(--sweep-end));
    transform: translateX(-118%);
    opacity: 0.95;
    filter: blur(1px);
    mix-blend-mode: screen;
    transition: transform var(--sweep-duration) cubic-bezier(0.2, 0.72, 0.3, 1), opacity 0.24s ease;
  }

  #${exportId}:hover .mhl-sheen {
    transform: translateX(118%);
  }

  #${exportId} .mhl-pointer {
    background: radial-gradient(circle at var(--pointer-x) var(--pointer-y), rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0.28) 12%, rgba(255, 255, 255, 0.08) 22%, transparent 40%);
    filter: blur(1.4px);
    mix-blend-mode: screen;
    opacity: 0.72;
    transition: opacity 0.2s ease;
  }

  #${exportId}:not(:hover) .mhl-pointer {
    opacity: 0.46;
  }

  #${exportId} .mhl-rim {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.48), transparent 18%, transparent 82%, rgba(0, 0, 0, 0.18)), linear-gradient(90deg, rgba(255, 255, 255, 0.16), transparent 18%, transparent 82%, rgba(0, 0, 0, 0.18));
    mix-blend-mode: soft-light;
  }

  @media (max-width: 720px) {
    #${exportId} {
      min-height: 420px;
      border-radius: 22px;
    }

    #${exportId} .mhl-artifact {
      width: min(64vw, 300px);
      right: 10px;
      bottom: 10px;
    }
  }
</style>

<script>
  (() => {
    const root = document.getElementById(${JSON.stringify(exportId)});
    if (!root) return;

    const config = ${JSON.stringify(config, null, 2)};
    const presets = ${JSON.stringify(PRESETS, null, 2)};
    const fallbackBackdrop = ${JSON.stringify(DEFAULT_BACKDROP)};
    const backdrop = root.querySelector(".mhl-stage__backdrop");
    const style = root.style;
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const setPointer = (x, y) => {
      style.setProperty("--pointer-x", \`\${x}%\`);
      style.setProperty("--pointer-y", \`\${y}%\`);
    };
    const setSweepStops = (width) => {
      const outer = clamp(Number(width), 8, 26);
      const inner = Number((outer * 0.36).toFixed(2));
      style.setProperty("--sweep-start", \`\${50 - outer}%\`);
      style.setProperty("--sweep-core-start", \`\${50 - inner}%\`);
      style.setProperty("--sweep-core-end", \`\${50 + inner}%\`);
      style.setProperty("--sweep-end", \`\${50 + outer}%\`);
    };
    const applyConfig = () => {
      const preset = presets[config.metal];
      style.setProperty("--metal-light", preset.light);
      style.setProperty("--metal-mid", preset.mid);
      style.setProperty("--metal-shadow", preset.shadow);
      style.setProperty("--metal-glow", preset.glow);
      style.setProperty("--artifact-scale", (config.scale / 100).toFixed(2));
      style.setProperty("--artifact-brightness", (config.brightness / 100).toFixed(2));
      style.setProperty("--artifact-contrast", (config.contrast / 100).toFixed(2));
      style.setProperty("--artifact-glow", \`\${config.glow}px\`);
      style.setProperty("--sweep-duration", \`\${Number(config.speed).toFixed(2)}s\`);
      style.setProperty("--mask-image", \`url("\${config.figureSrc}")\`);
      setSweepStops(config.sweepWidth);
      backdrop.style.backgroundImage = config.backgroundSrc ? \`linear-gradient(180deg, rgba(9, 11, 16, 0.08), rgba(9, 11, 16, 0.28)), url("\${config.backgroundSrc}")\` : fallbackBackdrop;
      setPointer(54, 33);
    };
    const handlePointer = (event) => {
      const rect = root.getBoundingClientRect();
      const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 4, 96);
      const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 4, 96);
      setPointer(x, y);
    };
    root.addEventListener("pointerenter", handlePointer);
    root.addEventListener("pointermove", handlePointer);
    root.addEventListener("pointerleave", () => setPointer(54, 33));
    applyConfig();
  })();
</script>`;
}

function updateExportField(focus = false) {
  controls.exportCode.value = buildExportSnippet();
  if (focus) {
    controls.exportCode.focus();
    controls.exportCode.setSelectionRange(0, 0);
  }
}

async function copyExportCode() {
  const text = controls.exportCode.value;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      controls.exportCode.focus();
      controls.exportCode.select();
      document.execCommand("copy");
      controls.exportCode.setSelectionRange(0, 0);
    }

    showFeedback("Copiado");
  } catch (error) {
    showFeedback("Copia manual desde el textarea", true);
  }
}

function downloadStandaloneHtml() {
  const documentHtml = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>MetalHoverLab export</title>
  <style>
    html, body {
      margin: 0;
      min-height: 100%;
      background: #0d1016;
      font-family: Inter, Segoe UI, sans-serif;
    }
    body {
      padding: 24px;
    }
  </style>
</head>
<body>
${controls.exportCode.value}
</body>
</html>`;

  const blob = new Blob([documentHtml], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "metal-hover-export.html";
  anchor.click();
  URL.revokeObjectURL(url);
}

function bindRange(id, parser = Number) {
  controls[id].addEventListener("input", (event) => {
    state[id] = parser(event.target.value);
    applyStateToPreview();
    updateExportField();
  });
}

controls.metalPreset.addEventListener("change", (event) => {
  state.metal = event.target.value;
  applyStateToPreview();
  updateExportField();
});

bindRange("scale");
bindRange("brightness");
bindRange("contrast");
bindRange("sweepWidth");
bindRange("speed", Number);
bindRange("glow");

controls.backgroundUpload.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    warnIfLargeAsset(file, "Fondo");
    state.backgroundSrc = await fileToDataUrl(file);
    state.backgroundName = file.name;
    applyStateToPreview();
    updateExportField();
  } catch (error) {
    showFeedback("No se pudo leer el fondo", true);
  }
});

controls.figureUpload.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    warnIfLargeAsset(file, "Figura");
    state.figureSrc = await fileToDataUrl(file);
    state.figureName = file.name;
    applyStateToPreview();
    updateExportField();
  } catch (error) {
    showFeedback("No se pudo leer la figura", true);
  }
});

controls.generateExport.addEventListener("click", () => {
  updateExportField(true);
});

controls.copyExport.addEventListener("click", copyExportCode);
controls.downloadExport.addEventListener("click", downloadStandaloneHtml);

controls.stage.addEventListener("pointerenter", (event) => updatePointerFromEvent(event));
controls.stage.addEventListener("pointermove", (event) => updatePointerFromEvent(event));
controls.stage.addEventListener("pointerleave", () => resetPointer());

applyStateToPreview();
resetPointer();
updateExportField();
