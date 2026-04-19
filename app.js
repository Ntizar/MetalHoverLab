const DEFAULT_SCENE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 920" fill="none">
  <defs>
    <linearGradient id="wall" x1="0" y1="0" x2="1400" y2="920" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F2EEE7"/>
      <stop offset="0.45" stop-color="#EAE4DA"/>
      <stop offset="1" stop-color="#DDD4C7"/>
    </linearGradient>
    <linearGradient id="relief" x1="220" y1="120" x2="1180" y2="760" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FCFBF7"/>
      <stop offset="0.34" stop-color="#F0EBE1"/>
      <stop offset="0.68" stop-color="#E1D6C8"/>
      <stop offset="1" stop-color="#CCC0B2"/>
    </linearGradient>
    <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="10" dy="16" stdDeviation="18" flood-color="#9F927E" flood-opacity="0.25"/>
      <feDropShadow dx="-6" dy="-8" stdDeviation="10" flood-color="#FFFFFF" flood-opacity="0.7"/>
    </filter>
  </defs>
  <rect width="1400" height="920" fill="url(#wall)"/>
  <path d="M116 176C116 153.909 133.909 136 156 136H1244C1266.09 136 1284 153.909 1284 176V744C1284 766.091 1266.09 784 1244 784H156C133.909 784 116 766.091 116 744V176Z" fill="#ECE6DB"/>
  <g filter="url(#softShadow)" fill="url(#relief)">
    <path d="M292 666C262 640 248 607 248 570C248 516 282 468 334 454C350 408 390 376 442 376C497 376 543 413 556 465C617 484 660 540 660 605C660 679 600 740 526 740H410C363 740 321 713 292 666Z"/>
    <circle cx="446" cy="304" r="104"/>
    <path d="M348 304C376 264 417 240 446 240C475 240 515 264 544 304C523 334 486 360 446 360C406 360 368 334 348 304Z" fill="#F8F5EE"/>
    <path d="M756 690C734 670 724 640 724 608V356C724 304 766 262 818 262H824C878 262 922 306 922 360V610C922 652 910 684 884 706L854 732C832 751 801 751 779 732L756 690Z"/>
    <circle cx="821" cy="184" r="88"/>
    <path d="M988 700C968 682 958 656 958 626V506C958 450 1002 406 1058 406H1080C1135 406 1180 451 1180 506V628C1180 690 1129 740 1067 740C1038 740 1010 726 988 700Z"/>
    <path d="M1048 424C1011 374 1000 334 1000 292C1000 232 1048 184 1108 184C1168 184 1216 232 1216 292C1216 352 1168 400 1108 400C1084 400 1062 408 1048 424Z"/>
    <path d="M228 716C228 708 235 702 243 702H1174C1182 702 1189 708 1189 716V732H228V716Z" fill="#D9CFC0"/>
    <path d="M1017 330C987 313 962 285 946 250C928 212 908 191 877 176C846 161 826 166 810 176C819 129 864 94 914 94C964 94 1016 129 1046 181C1070 223 1066 281 1017 330Z" fill="#F8F5EE"/>
    <path d="M274 238L302 216L338 245L368 204L410 226L388 268L430 296L396 324L408 372L358 364L334 410L294 382L248 394L250 346L208 322L244 290L226 244L274 238Z" fill="#F4F0E8"/>
  </g>
</svg>`;

const DEFAULT_SCENE_DATA_URL = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(DEFAULT_SCENE_SVG)}`;
const DEFAULT_CUSTOM_COLOR = "#2563EB";
const SCENE_PRESETS = {
  demo: {
    src: DEFAULT_SCENE_DATA_URL,
    name: "Demo relief"
  },
  bisonte1: {
    src: "assets/reliefs/bisonte.jpg",
    name: "bisonte.jpg"
  },
  bisonte2: {
    src: "assets/reliefs/bisonte2.jpg",
    name: "bisonte2.jpg"
  }
};

const PRESETS = {
  gold: {
    label: "Oro",
    accent: "#F0D48F",
    metal: { r: 236, g: 190, b: 92 }
  },
  silver: {
    label: "Plata",
    accent: "#D8DDE6",
    metal: { r: 214, g: 221, b: 233 }
  },
  bronze: {
    label: "Bronce",
    accent: "#E0B590",
    metal: { r: 201, g: 139, b: 89 }
  }
};

const state = {
  sceneSrc: DEFAULT_SCENE_DATA_URL,
  sceneName: "Demo relief",
  scenePreset: "demo",
  metalPreset: "silver",
  customColor: DEFAULT_CUSTOM_COLOR,
  marble: 46,
  radius: 32,
  depth: 58,
  lightHeight: 74,
  specular: 76,
  tint: 64,
  glow: 34,
  isolate: 68
};

const controls = {
  sceneUpload: document.querySelector("#sceneUpload"),
  presetDemo: document.querySelector("#presetDemo"),
  presetBisonte1: document.querySelector("#presetBisonte1"),
  presetBisonte2: document.querySelector("#presetBisonte2"),
  metalPreset: document.querySelector("#metalPreset"),
  customColorField: document.querySelector("#customColorField"),
  customColor: document.querySelector("#customColor"),
  customHex: document.querySelector("#customHex"),
  customColorValue: document.querySelector("#customColorValue"),
  marble: document.querySelector("#marble"),
  radius: document.querySelector("#radius"),
  depth: document.querySelector("#depth"),
  lightHeight: document.querySelector("#lightHeight"),
  specular: document.querySelector("#specular"),
  tint: document.querySelector("#tint"),
  glow: document.querySelector("#glow"),
  isolate: document.querySelector("#isolate"),
  marbleValue: document.querySelector("#marbleValue"),
  radiusValue: document.querySelector("#radiusValue"),
  depthValue: document.querySelector("#depthValue"),
  lightHeightValue: document.querySelector("#lightHeightValue"),
  specularValue: document.querySelector("#specularValue"),
  tintValue: document.querySelector("#tintValue"),
  glowValue: document.querySelector("#glowValue"),
  isolateValue: document.querySelector("#isolateValue"),
  generateExport: document.querySelector("#generateExport"),
  copyExport: document.querySelector("#copyExport"),
  copyStandalone: document.querySelector("#copyStandalone"),
  copyReactExport: document.querySelector("#copyReactExport"),
  copyGuideCode: document.querySelector("#copyGuideCode"),
  downloadExport: document.querySelector("#downloadExport"),
  exportCode: document.querySelector("#exportCode"),
  reactExportCode: document.querySelector("#reactExportCode"),
  guideCode: document.querySelector("#guideCode"),
  assetStatus: document.querySelector("#assetStatus"),
  copyFeedback: document.querySelector("#copyFeedback"),
  exportField: document.querySelector("#exportField"),
  stageMount: document.querySelector("#stageMount")
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function mix(start, end, amount) {
  return start + (end - start) * amount;
}

function smoothstep(edge0, edge1, value) {
  const x = clamp((value - edge0) / (edge1 - edge0 || 1), 0, 1);
  return x * x * (3 - 2 * x);
}

function fitImageSize(width, height, maxLongEdge) {
  const longEdge = Math.max(width, height);
  if (longEdge <= maxLongEdge) {
    return { width, height };
  }

  const scale = maxLongEdge / longEdge;

  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale))
  };
}

function loadImageElement(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("No se pudo cargar la imagen"));
    image.src = src;
  });
}

function blurGrayMap(grayImageData, width, height, radiusPx) {
  const sourceCanvas = document.createElement("canvas");
  sourceCanvas.width = width;
  sourceCanvas.height = height;
  sourceCanvas.getContext("2d", { willReadFrequently: true }).putImageData(grayImageData, 0, 0);

  const outputCanvas = document.createElement("canvas");
  outputCanvas.width = width;
  outputCanvas.height = height;

  const outputContext = outputCanvas.getContext("2d", { willReadFrequently: true });
  if (typeof outputContext.filter === "string") {
    outputContext.filter = `blur(${radiusPx}px)`;
  }
  outputContext.drawImage(sourceCanvas, 0, 0);
  outputContext.filter = "none";

  const blurredData = outputContext.getImageData(0, 0, width, height).data;
  const map = new Float32Array(width * height);
  for (let index = 0, offset = 0; index < map.length; index += 1, offset += 4) {
    map[index] = blurredData[offset] / 255;
  }

  return map;
}

async function buildReliefBuffers(sceneSrc) {
  const image = await loadImageElement(sceneSrc);
  const fitted = fitImageSize(image.naturalWidth || image.width, image.naturalHeight || image.height, 1280);
  const width = fitted.width;
  const height = fitted.height;

  const baseCanvas = document.createElement("canvas");
  baseCanvas.width = width;
  baseCanvas.height = height;

  const baseContext = baseCanvas.getContext("2d", { willReadFrequently: true });
  baseContext.drawImage(image, 0, 0, width, height);
  const baseImageData = baseContext.getImageData(0, 0, width, height);

  const grayImageData = baseContext.createImageData(width, height);
  const grayMap = new Float32Array(width * height);

  for (let index = 0, offset = 0; index < grayMap.length; index += 1, offset += 4) {
    const r = baseImageData.data[offset];
    const g = baseImageData.data[offset + 1];
    const b = baseImageData.data[offset + 2];
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    const grayByte = Math.round(luminance * 255);

    grayMap[index] = luminance;
    grayImageData.data[offset] = grayByte;
    grayImageData.data[offset + 1] = grayByte;
    grayImageData.data[offset + 2] = grayByte;
    grayImageData.data[offset + 3] = 255;
  }

  const blurSmall = blurGrayMap(grayImageData, width, height, 3);
  const blurLarge = blurGrayMap(grayImageData, width, height, 20);

  const seedImageData = baseContext.createImageData(width, height);
  const gradX = new Float32Array(width * height);
  const gradY = new Float32Array(width * height);
  const detail = new Float32Array(width * height);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = y * width + x;
      const leftIndex = y * width + Math.max(0, x - 1);
      const rightIndex = y * width + Math.min(width - 1, x + 1);
      const topIndex = Math.max(0, y - 1) * width + x;
      const bottomIndex = Math.min(height - 1, y + 1) * width + x;

      const gx = (blurSmall[rightIndex] - blurSmall[leftIndex]) * 0.5;
      const gy = (blurSmall[bottomIndex] - blurSmall[topIndex]) * 0.5;
      const gradientMagnitude = Math.min(1, Math.sqrt(gx * gx + gy * gy) * 7.2);
      const localContrast = Math.min(1, Math.abs(grayMap[index] - blurLarge[index]) * 5.8);
      const seed = Math.min(1, localContrast * 0.95 + gradientMagnitude * 0.82);
      const seedByte = Math.round(seed * 255);
      const offset = index * 4;

      gradX[index] = gx;
      gradY[index] = gy;
      detail[index] = gradientMagnitude;
      seedImageData.data[offset] = seedByte;
      seedImageData.data[offset + 1] = seedByte;
      seedImageData.data[offset + 2] = seedByte;
      seedImageData.data[offset + 3] = 255;
    }
  }

  const expandedSeed = blurGrayMap(seedImageData, width, height, 30);
  const reliefMask = new Float32Array(width * height);

  for (let index = 0; index < reliefMask.length; index += 1) {
    reliefMask[index] = smoothstep(0.035, 0.25, expandedSeed[index]);
  }

  return {
    width,
    height,
    base: baseImageData.data,
    gray: grayMap,
    gradX,
    gradY,
    detail,
    mask: reliefMask
  };
}

function paintReliefFrame(context, frame, buffers, config, pointer) {
  const { width, height, base, gray, gradX, gradY, detail, mask } = buffers;
  const pixels = frame.data;
  const lightX = pointer.inside ? pointer.x * width : width * 0.58;
  const lightY = pointer.inside ? pointer.y * height : height * 0.4;
  const pointerStrength = pointer.inside ? 1 : 0;
  const minimumDimension = Math.min(width, height);
  const radiusPx = minimumDimension * (config.radius / 100);
  const reliefScale = mix(0.45, 2.65, config.depth / 100);
  const lightHeight = mix(0.5, 2.6, config.lightHeight / 100);
  const specularAmount = mix(0.18, 1.55, config.specular / 100);
  const tintAmount = mix(0.1, 0.82, config.tint / 100);
  const glowAmount = mix(0, 0.38, config.glow / 100);
  const focusPower = mix(2.8, 0.85, config.isolate / 100);
  const shininess = mix(16, 88, config.specular / 100);
  const marbleAmount = config.marble / 100;
  const metal = config.metal;

  const baseLightX = -0.28;
  const baseLightY = -0.36;
  const baseLightZ = 0.89;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = y * width + x;
      const offset = index * 4;
      const baseR = base[offset];
      const baseG = base[offset + 1];
      const baseB = base[offset + 2];

      let nx = -gradX[index] * reliefScale;
      let ny = -gradY[index] * reliefScale;
      const normalLength = Math.hypot(nx, ny, 1);
      nx /= normalLength;
      ny /= normalLength;
      const nz = 1 / normalLength;

      const baseDiffuse = Math.max(0, nx * baseLightX + ny * baseLightY + nz * baseLightZ);
      const focusMask = Math.pow(mask[index], focusPower);
      const cavity = (1 - gray[index]) * focusMask;
      const reliefBoost = focusMask * mix(0.08, 0.28, config.depth / 100);
      const edgeBoost = detail[index] * focusMask * 0.12;

      const marbleBase = mix(1, 0.78, marbleAmount);
      let r = baseR * (marbleBase + baseDiffuse * reliefBoost + edgeBoost) - cavity * (8 + marbleAmount * 12);
      let g = baseG * (marbleBase + baseDiffuse * reliefBoost + edgeBoost) - cavity * (6 + marbleAmount * 10);
      let b = baseB * (marbleBase + baseDiffuse * reliefBoost + edgeBoost) - cavity * (5 + marbleAmount * 9);

      r = mix(r, baseR * 0.98 + 16, marbleAmount * 0.12);
      g = mix(g, baseG * 0.98 + 12, marbleAmount * 0.12);
      b = mix(b, baseB * 0.99 + 9, marbleAmount * 0.12);

      if (pointerStrength > 0 && radiusPx > 0) {
        const dx = (lightX - x) / radiusPx;
        const dy = (lightY - y) / radiusPx;
        const distanceSquared = dx * dx + dy * dy;

        if (distanceSquared < 1.45) {
          const influence = Math.pow(Math.max(0, 1 - distanceSquared / 1.45), 2.15) * focusMask;
          const lx = dx;
          const ly = dy;
          const lz = lightHeight;
          const lightLength = Math.hypot(lx, ly, lz);
          const lightDirX = lx / lightLength;
          const lightDirY = ly / lightLength;
          const lightDirZ = lz / lightLength;
          const diffuse = Math.max(0, nx * lightDirX + ny * lightDirY + nz * lightDirZ);

          const halfX = lightDirX;
          const halfY = lightDirY;
          const halfZ = lightDirZ + 1;
          const halfLength = Math.hypot(halfX, halfY, halfZ);
          const halfDirX = halfX / halfLength;
          const halfDirY = halfY / halfLength;
          const halfDirZ = halfZ / halfLength;
          const specular = Math.pow(Math.max(0, nx * halfDirX + ny * halfDirY + nz * halfDirZ), shininess);

          const tintMix = influence * tintAmount * (0.2 + diffuse * 0.8);
          const glowMix = influence * glowAmount * (0.35 + diffuse * 0.65);
          const reliefLight = 1 + influence * (0.12 + glowAmount * 0.16);

          r = r * reliefLight * (1 - tintMix * 0.42) + metal.r * tintMix;
          g = g * reliefLight * (1 - tintMix * 0.42) + metal.g * tintMix;
          b = b * reliefLight * (1 - tintMix * 0.42) + metal.b * tintMix;

          const glowLift = 255 * glowMix;
          const specLift = 255 * specular * specularAmount * influence;
          r += glowLift * (metal.r / 255) + specLift;
          g += glowLift * (metal.g / 255) + specLift;
          b += glowLift * (metal.b / 255) + specLift;
        }
      }

      pixels[offset] = clamp(Math.round(r), 0, 255);
      pixels[offset + 1] = clamp(Math.round(g), 0, 255);
      pixels[offset + 2] = clamp(Math.round(b), 0, 255);
      pixels[offset + 3] = 255;
    }
  }

  context.putImageData(frame, 0, 0);
}

function mountReliefRenderer(container, payload) {
  const canvas = document.createElement("canvas");
  const status = document.createElement("div");
  const context = canvas.getContext("2d", { alpha: false, willReadFrequently: true });

  canvas.setAttribute("aria-hidden", "true");
  status.className = "stage__status";
  status.textContent = "Procesando relieve...";

  container.innerHTML = "";
  container.append(canvas, status);

  let buffers = null;
  let frame = null;
  let renderScheduled = false;
  let activeConfig = { ...payload.config };
  let pointer = { inside: false, x: 0.58, y: 0.4 };

  function scheduleRender() {
    if (!buffers || renderScheduled) {
      return;
    }

    renderScheduled = true;
    requestAnimationFrame(() => {
      renderScheduled = false;
      paintReliefFrame(context, frame, buffers, activeConfig, pointer);
    });
  }

  function updateFromPointerEvent(event) {
    if (!buffers) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    pointer = {
      inside: true,
      x: clamp((event.clientX - rect.left) / rect.width, 0, 1),
      y: clamp((event.clientY - rect.top) / rect.height, 0, 1)
    };
    scheduleRender();
  }

  container.addEventListener("pointerenter", updateFromPointerEvent);
  container.addEventListener("pointermove", updateFromPointerEvent);
  container.addEventListener("pointerleave", () => {
    pointer = { inside: false, x: 0.58, y: 0.4 };
    scheduleRender();
  });

  async function setScene(sceneSrc) {
    status.hidden = false;
    status.textContent = "Procesando relieve...";

    try {
      buffers = await buildReliefBuffers(sceneSrc);
      canvas.width = buffers.width;
      canvas.height = buffers.height;
      frame = context.createImageData(buffers.width, buffers.height);
      status.hidden = true;
      scheduleRender();
    } catch (error) {
      status.hidden = false;
      status.textContent = "No se pudo procesar la imagen.";
      throw error;
    }
  }

  function setConfig(nextConfig) {
    activeConfig = { ...activeConfig, ...nextConfig };
    scheduleRender();
  }

  if (payload.sceneSrc) {
    setScene(payload.sceneSrc).catch(() => {});
  }

  return {
    setScene,
    setConfig
  };
}

function normalizeHex(value) {
  const compact = value.trim();
  if (!compact) {
    return null;
  }

  const prefixed = compact.startsWith("#") ? compact : `#${compact}`;
  if (/^#[0-9a-fA-F]{6}$/.test(prefixed)) {
    return prefixed.toUpperCase();
  }

  if (/^#[0-9a-fA-F]{3}$/.test(prefixed)) {
    const [, a, b, c] = prefixed;
    return `#${a}${a}${b}${b}${c}${c}`.toUpperCase();
  }

  return null;
}

function hexToRgb(hex) {
  const normalized = normalizeHex(hex);
  if (!normalized) {
    return null;
  }

  return {
    r: parseInt(normalized.slice(1, 3), 16),
    g: parseInt(normalized.slice(3, 5), 16),
    b: parseInt(normalized.slice(5, 7), 16)
  };
}

function getMaterialConfig() {
  if (state.metalPreset === "custom") {
    const metal = hexToRgb(state.customColor) || hexToRgb(DEFAULT_CUSTOM_COLOR);
    return {
      label: `Color libre ${state.customColor}`,
      accent: state.customColor,
      metal
    };
  }

  return PRESETS[state.metalPreset];
}

function getConfigForRenderer() {
  return {
    marble: Number(state.marble),
    radius: Number(state.radius),
    depth: Number(state.depth),
    lightHeight: Number(state.lightHeight),
    specular: Number(state.specular),
    tint: Number(state.tint),
    glow: Number(state.glow),
    isolate: Number(state.isolate),
    metal: { ...getMaterialConfig().metal }
  };
}

const renderer = mountReliefRenderer(controls.stageMount, {
  sceneSrc: state.sceneSrc,
  config: getConfigForRenderer()
});

function updateOutputs() {
  controls.marbleValue.textContent = `${state.marble}%`;
  controls.radiusValue.textContent = `${state.radius}%`;
  controls.depthValue.textContent = `${state.depth}%`;
  controls.lightHeightValue.textContent = `${state.lightHeight}%`;
  controls.specularValue.textContent = `${state.specular}%`;
  controls.tintValue.textContent = `${state.tint}%`;
  controls.glowValue.textContent = `${state.glow}%`;
  controls.isolateValue.textContent = `${state.isolate}%`;
  controls.customColorValue.textContent = state.customColor;
}

function updateCustomColorInputs() {
  controls.customColor.value = state.customColor;
  controls.customHex.value = state.customColor;
  controls.customColorValue.textContent = state.customColor;
}

function updateCustomColorVisibility() {
  controls.customColorField.hidden = state.metalPreset !== "custom";
}

function updateAssetStatus() {
  const material = getMaterialConfig();
  controls.assetStatus.textContent = `${state.sceneName} · ${material.label}`;

  document.documentElement.style.setProperty("--accent", material.accent);
  document.documentElement.style.setProperty("--material-accent", material.accent);
  document.documentElement.style.setProperty("--material-rgb", `${material.metal.r}, ${material.metal.g}, ${material.metal.b}`);
  controls.assetStatus.style.background = `linear-gradient(135deg, rgba(255, 255, 255, 0.94), rgba(${material.metal.r}, ${material.metal.g}, ${material.metal.b}, 0.58))`;
}

function updatePresetButtons() {
  const buttons = [
    [controls.presetDemo, "demo"],
    [controls.presetBisonte1, "bisonte1"],
    [controls.presetBisonte2, "bisonte2"]
  ];

  for (const [button, preset] of buttons) {
    button.classList.toggle("button--primary", state.scenePreset === preset);
  }
}

function refreshPreview() {
  renderer.setConfig(getConfigForRenderer());
  updateCustomColorVisibility();
  updateCustomColorInputs();
  updateOutputs();
  updateAssetStatus();
  updatePresetButtons();
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
  controls.exportField.classList.toggle("field--error", isError);

  window.setTimeout(() => {
    controls.copyFeedback.textContent = "";
    controls.exportField.classList.remove("field--error");
  }, isError ? 3200 : 1800);
}

function warnIfLargeAsset(file) {
  const sizeInMb = file.size / (1024 * 1024);
  if (sizeInMb >= 2) {
    showFeedback(`Imagen pesada: ${sizeInMb.toFixed(1)} MB en el export`, false);
  }
}

async function writeClipboard(text, successMessage) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const helper = document.createElement("textarea");
      helper.value = text;
      helper.setAttribute("readonly", "true");
      helper.style.position = "fixed";
      helper.style.opacity = "0";
      document.body.appendChild(helper);
      helper.focus();
      helper.select();
      const copied = document.execCommand("copy");
      document.body.removeChild(helper);
      if (!copied) {
        throw new Error("No se pudo copiar");
      }
    }

    showFeedback(successMessage);
  } catch (error) {
    showFeedback("Copia manual desde el textarea", true);
  }
}

function buildRuntimeSource() {
  return [
    clamp.toString(),
    mix.toString(),
    smoothstep.toString(),
    fitImageSize.toString(),
    loadImageElement.toString(),
    blurGrayMap.toString(),
    buildReliefBuffers.toString(),
    paintReliefFrame.toString(),
    mountReliefRenderer.toString()
  ].join("\n\n");
}

function buildExportPayload() {
  return {
    sceneSrc: state.sceneSrc,
    config: getConfigForRenderer()
  };
}

function buildReactExport() {
  const runtime = buildRuntimeSource();
  const payload = JSON.stringify(buildExportPayload(), null, 2);

  return `'use client';

import { useEffect, useRef } from 'react';

${runtime}

export default function ReliefHover() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const renderer = mountReliefRenderer(mountRef.current, ${payload});
    return () => {
      if (mountRef.current) {
        mountRef.current.innerHTML = '';
      }
    };
  }, []);

  return <div ref={mountRef} />;
}`;
}

function buildExportSnippet() {
  const exportId = `metal-relief-${Math.random().toString(36).slice(2, 8)}`;
  const runtime = buildRuntimeSource();
  const payload = buildExportPayload();

  return `<!-- MetalHoverLab relief export -->
<section id="${exportId}" class="mhl-relief-stage"></section>

<style>
  #${exportId} {
    --mhl-max-width: 1240px;
    --mhl-padding: clamp(14px, 2vw, 24px);
    --mhl-radius: 28px;
    --mhl-surface: radial-gradient(circle at top left, rgba(255, 255, 255, 0.32), transparent 20%), linear-gradient(180deg, #f2efe9, #e8e3da 38%, #e4ded2 100%);
    --mhl-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72), inset 0 -24px 48px rgba(186, 176, 160, 0.22), 0 28px 70px rgba(0, 0, 0, 0.18);
    position: relative;
    width: min(100%, var(--mhl-max-width));
    margin: 0 auto;
    padding: var(--mhl-padding);
    border-radius: var(--mhl-radius);
    overflow: hidden;
    background: var(--mhl-surface);
    box-shadow: var(--mhl-shadow);
  }

  #${exportId} canvas {
    display: block;
    width: 100%;
    height: auto;
    border-radius: calc(var(--mhl-radius) - 6px);
    box-shadow: 0 18px 50px rgba(130, 118, 98, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.55);
  }

  #${exportId} .stage__status {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 68px;
    padding: 14px 18px;
    border-radius: 999px;
    border: 1px solid rgba(110, 98, 83, 0.16);
    background: rgba(248, 244, 236, 0.68);
    color: #5b544b;
    backdrop-filter: blur(18px);
    box-shadow: 0 18px 48px rgba(131, 120, 103, 0.14);
  }

  @media (max-width: 720px) {
    #${exportId} {
      --mhl-radius: 22px;
      --mhl-padding: 12px;
    }
  }
</style>

<script>
${runtime}
mountReliefRenderer(document.getElementById(${JSON.stringify(exportId)}), ${JSON.stringify(payload, null, 2)});
</script>`;
}

function buildStandaloneHtml() {
  return `<!doctype html>
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
}

function buildGuideSnippet() {
  return `<section class="hero-relief">
  <!-- Pega aqui el snippet exportado por MetalHoverLab -->
</section>

<style>
  .hero-relief [id^="metal-relief-"] {
    --mhl-max-width: 960px;
    --mhl-padding: 12px;
    --mhl-radius: 22px;
    margin-inline: auto;
  }

  @media (min-width: 1200px) {
    .hero-relief [id^="metal-relief-"] {
      --mhl-max-width: 1280px;
      --mhl-padding: 18px;
    }
  }
</style>`;
}

function updateExportField(focus = false) {
  controls.exportCode.value = buildExportSnippet();
  controls.reactExportCode.value = buildReactExport();
  if (focus) {
    controls.exportCode.focus();
    controls.exportCode.setSelectionRange(0, 0);
  }
}

function updateGuideSnippet() {
  controls.guideCode.textContent = buildGuideSnippet();
}

async function copyExportCode() {
  await writeClipboard(controls.exportCode.value, "Snippet copiado");
}

async function copyStandaloneHtml() {
  await writeClipboard(buildStandaloneHtml(), "HTML completo copiado");
}

async function copyReactExport() {
  await writeClipboard(controls.reactExportCode.value, "Export React/Next copiado");
}

async function copyGuideSnippet() {
  await writeClipboard(controls.guideCode.textContent, "Ejemplo copiado");
}

function downloadStandaloneHtml() {
  const blob = new Blob([buildStandaloneHtml()], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "metal-relief-export.html";
  anchor.click();
  URL.revokeObjectURL(url);
}

function bindRangeControl(id) {
  controls[id].addEventListener("input", (event) => {
    state[id] = Number(event.target.value);
    refreshPreview();
    updateExportField();
  });
}

function applyCustomHex(value, notify = true) {
  const normalized = normalizeHex(value);
  if (!normalized) {
    if (notify) {
      showFeedback("Color hexadecimal invalido", true);
    }
    controls.customHex.value = state.customColor;
    return;
  }

  state.customColor = normalized;
  refreshPreview();
  updateExportField();
}

async function applyScenePreset(presetKey) {
  const preset = SCENE_PRESETS[presetKey];
  if (!preset) {
    return;
  }

  try {
    state.scenePreset = presetKey;
    state.sceneSrc = preset.src;
    state.sceneName = preset.name;
    await renderer.setScene(state.sceneSrc);
    refreshPreview();
    updateExportField();
  } catch (error) {
    showFeedback("No se pudo cargar el preset", true);
  }
}

controls.presetDemo.addEventListener("click", () => {
  applyScenePreset("demo");
});

controls.presetBisonte1.addEventListener("click", () => {
  applyScenePreset("bisonte1");
});

controls.presetBisonte2.addEventListener("click", () => {
  applyScenePreset("bisonte2");
});

controls.metalPreset.addEventListener("change", (event) => {
  state.metalPreset = event.target.value;
  refreshPreview();
  updateExportField();
});

controls.customColor.addEventListener("input", (event) => {
  state.customColor = event.target.value.toUpperCase();
  refreshPreview();
  updateExportField();
});

controls.customHex.addEventListener("input", (event) => {
  event.target.value = event.target.value.toUpperCase();
});

controls.customHex.addEventListener("change", (event) => {
  applyCustomHex(event.target.value);
});

controls.sceneUpload.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  try {
    warnIfLargeAsset(file);
    state.scenePreset = "upload";
    state.sceneSrc = await fileToDataUrl(file);
    state.sceneName = file.name;
    await renderer.setScene(state.sceneSrc);
    refreshPreview();
    updateExportField();
  } catch (error) {
    showFeedback("No se pudo leer la imagen", true);
  }
});

bindRangeControl("marble");
bindRangeControl("radius");
bindRangeControl("depth");
bindRangeControl("lightHeight");
bindRangeControl("specular");
bindRangeControl("tint");
bindRangeControl("glow");
bindRangeControl("isolate");

controls.generateExport.addEventListener("click", () => {
  updateExportField(true);
});
controls.copyExport.addEventListener("click", copyExportCode);
controls.copyStandalone.addEventListener("click", copyStandaloneHtml);
controls.copyReactExport.addEventListener("click", copyReactExport);
controls.copyGuideCode.addEventListener("click", copyGuideSnippet);
controls.downloadExport.addEventListener("click", downloadStandaloneHtml);

refreshPreview();
updateGuideSnippet();
updateExportField();
