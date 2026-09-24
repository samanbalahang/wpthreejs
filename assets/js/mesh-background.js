/* ==========================================================================
   mesh-background.js — fixed woven-mesh background (three.js)

   • Warp (vertical) and weft (horizontal) threads drift like waves.
   • The mesh bulges toward the viewer: squares are biggest and sharpest at the
     centre and get smaller / more compressed toward the edges (real perspective).
   • A circular fade dissolves the net away from the centre.
   • Canvas is position:fixed behind the page and ignores pointer events.

   Needs the same import map you already use:  "three": "./assets/js/three.module.js"
   ========================================================================== */
import * as THREE from 'three';

// ─────────────────────────── settings you can edit ───────────────────────────
const CONFIG = {
  warpColor:   '#e2bd76',  // vertical threads
  weftColor:   '#8ea6d6',  // horizontal threads
  opacity:     0.8,        // overall strength of the mesh (0–1)

  cellSize:    46,         // px – size of the square at the very centre
  cellSizeSm:  34,         // px – same, on screens narrower than 768px
  threadWidth: 1.15,       // px – thickness of a thread

  bulge:       0.66,       // 0–0.8  how much closer the centre is (perspective strength)
  bulgeWidth:  0.50,       // how wide the raised centre is (smaller = tighter dome)
  recede:      0.08,       // how far the outer area sinks behind the flat plane

  fadeRadius:  1.05,       // size of the visible circle (1 ≈ average of screen w/h)
  fadeStart:   0.16,       // 0–1 where the fade begins (0 = fades from the very centre)
  fadeCurve:   1.6,        // >1 = clear centre for longer, then a quicker fade

  waveSpeed:   0.55,       // animation speed (0 = still)
  sway:        0.34,       // in-plane drift of threads, in squares
  depthWave:   0.045,      // depth ripple, as a fraction of camera distance

  maxPixelRatio: 2,
};
// ─────────────────────────────────────────────────────────────────────────────

if (!window.__meshBackground) {
  window.__meshBackground = true;
  init();
}

function init() {
  const CAM_DIST = 10;
  const FOV = 40;
  const SEGMENTS = 220;

  // ---------- canvas ----------
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.id = 'meshBackground';
  Object.assign(canvas.style, {
    position: 'fixed', top: '0', left: '0',
    width: '100%', height: '100vh',
    zIndex: '-1', pointerEvents: 'none', display: 'block',
  });
  // 100lvh = height with the mobile address bar hidden, so the canvas never
  // resizes (and the mesh never jumps) while the browser toolbar shows/hides.
  if (window.CSS && CSS.supports && CSS.supports('height', '100lvh')) canvas.style.height = '100lvh';
  // Make <body> its own stacking context so the canvas (z-index:-1) always sits
  // ABOVE the body/page background but BELOW all page content, even when both
  // <html> and <body> have a background colour.
  document.body.style.isolation = 'isolate';
  document.body.prepend(canvas);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'low-power' });
  } catch (e) {
    canvas.remove();           // no WebGL → page simply shows no mesh
    return;
  }
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
  camera.position.set(0, 0, CAM_DIST);

  // ---------- material ----------
  const uniforms = {
    uTime:    { value: 0 },
    uHalf:    { value: 10 },    // half size of the mesh (world units)
    uRw:      { value: 5 },     // world radius used to scale the dome and waves
    uCell:    { value: 0.3 },   // world size of one square
    uZc:      { value: CONFIG.bulge * CAM_DIST },
    uBw:      { value: CONFIG.bulgeWidth },
    uRecede:  { value: CONFIG.recede },
    uSway:    { value: 0.1 },
    uWaveZ:   { value: CONFIG.depthWave * CAM_DIST },

    uWarp:    { value: new THREE.Color(CONFIG.warpColor) },
    uWeft:    { value: new THREE.Color(CONFIG.weftColor) },
    uOpacity: { value: CONFIG.opacity },
    uWidth:   { value: CONFIG.threadWidth },
    uDpr:     { value: 1 },
    uRes:     { value: new THREE.Vector2(1, 1) },
    uRpx:     { value: 500 },
    uFadeStart: { value: CONFIG.fadeStart },
    uFadeCurve: { value: CONFIG.fadeCurve },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    side: THREE.DoubleSide,

    vertexShader: /* glsl */`
      uniform float uTime, uHalf, uRw, uCell, uZc, uBw, uRecede, uSway, uWaveZ;
      varying vec2  vGrid;
      varying float vSheen;

      void main() {
        // position on the un-deformed cloth, in world units
        vec2 p = (uv - 0.5) * 2.0 * uHalf;
        vec2 n = p / uRw;
        float t = uTime;

        // warp threads (vertical) sway sideways, weft threads (horizontal) sway up/down
        vec2 q = p;
        q.x += uSway * (sin(n.y * 3.0 + t * 0.90) + 0.5 * sin(n.y * 7.0 - t * 1.30 + n.x * 2.0));
        q.y += uSway * (sin(n.x * 2.6 - t * 0.80) + 0.5 * sin(n.x * 6.4 + t * 1.10 + n.y * 2.0));

        // dome: centre pushed toward the camera, outskirts sink away
        float r    = length(q) / uRw;
        float dome = uZc * (1.0 / (1.0 + (r / uBw) * (r / uBw)) - uRecede);

        // slow ripple travelling across the cloth
        float wave = 0.6 * sin(n.x * 2.3 + n.y * 1.7 - t) + 0.4 * sin(n.y * 3.6 - n.x * 1.2 + t * 0.7);

        vGrid  = p / uCell + 0.5;      // +0.5 → the very centre sits in the middle of a square
        vSheen = wave;
        gl_Position = projectionMatrix * viewMatrix * vec4(q, dome + uWaveZ * wave, 1.0);
      }
    `,

    fragmentShader: /* glsl */`
      uniform vec3  uWarp, uWeft;
      uniform float uOpacity, uWidth, uDpr, uRpx, uFadeStart, uFadeCurve;
      uniform vec2  uRes;
      varying vec2  vGrid;
      varying float vSheen;

      float thread(float d, float hw) {
        return 1.0 - smoothstep(hw - 0.75, hw + 0.75, d);
      }

      void main() {
        vec2 fw = fwidth(vGrid);                          // grid units per device pixel
        vec2 d  = abs(fract(vGrid + 0.5) - 0.5) / fw;     // device px to nearest thread
        float hw = 0.5 * uWidth * uDpr;

        float warp = thread(d.x, hw);                     // vertical threads
        float weft = thread(d.y, hw);                     // horizontal threads

        // squares squeezed below a few px would shimmer / moiré → let them melt away
        float cellPx  = 1.0 / max(fw.x, fw.y);
        float density = smoothstep(2.5 * uDpr, 8.0 * uDpr, cellPx);

        // circular fade, measured on screen so it stays round on every aspect ratio
        float rr   = length(gl_FragCoord.xy - 0.5 * uRes) / uRpx;
        float fade = pow(1.0 - smoothstep(uFadeStart, 1.0, rr), uFadeCurve);

        float knot = warp * weft;                         // where threads cross
        float a    = 1.0 - (1.0 - warp) * (1.0 - weft);
        vec3 col   = (uWarp * warp + uWeft * weft) / max(warp + weft, 1e-3);
        col = mix(col, vec3(1.0), knot * 0.45);           // tiny highlight at each crossing

        float sheen = 0.8 + 0.2 * vSheen;                 // light rolls along the waves
        gl_FragColor = vec4(col, a * density * fade * sheen * uOpacity);

        #include <colorspace_fragment>
      }
    `,
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, SEGMENTS, SEGMENTS), material);
  mesh.frustumCulled = false;        // its real shape is made in the vertex shader
  scene.add(mesh);

  // ---------- layout ----------
  const zAt = (r) => CONFIG.bulge * CAM_DIST *
    (1 / (1 + (r / CONFIG.bulgeWidth) ** 2) - CONFIG.recede);

  function layout() {
    const W = canvas.clientWidth  || window.innerWidth;
    const H = canvas.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, CONFIG.maxPixelRatio);

    renderer.setPixelRatio(dpr);
    renderer.setSize(W, H, false);            // false → keep our CSS sizing
    camera.aspect = W / H;
    camera.updateProjectionMatrix();

    const viewH  = 2 * CAM_DIST * Math.tan(THREE.MathUtils.degToRad(FOV) / 2);
    const pxPerU = H / viewH;                 // px per world unit on the z = 0 plane

    const Rpx = 0.5 * Math.sqrt(W * H) * CONFIG.fadeRadius;
    const Rw  = Rpx / pxPerU;

    // one square at the centre = cellSize px on screen (account for perspective zoom)
    const cellPx  = W < 768 ? CONFIG.cellSizeSm : CONFIG.cellSize;
    const zoom0   = CAM_DIST / (CAM_DIST - zAt(0));
    const cellW   = cellPx / (pxPerU * zoom0);

    // make the cloth just big enough to fill the visible circle
    let r = 1;
    while (r < 6) {
      const screenR = (r * Rw * pxPerU * CAM_DIST) / (CAM_DIST - zAt(r));
      if (screenR >= Rpx * 1.15) break;
      r += 0.05;
    }

    uniforms.uRw.value   = Rw;
    uniforms.uHalf.value = r * Rw;
    uniforms.uCell.value = cellW;
    uniforms.uSway.value = CONFIG.sway * cellW;
    uniforms.uDpr.value  = dpr;
    uniforms.uRes.value.set(W * dpr, H * dpr);
    uniforms.uRpx.value  = Rpx * dpr;

    renderer.render(scene, camera);           // keeps reduced-motion / resize frames current
  }

  // ---------- loop ----------
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let last = performance.now();
  let time = 4.0;                              // starting phase (looks nicer than t = 0)

  function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    time += dt * CONFIG.waveSpeed;
    uniforms.uTime.value = time;
    renderer.render(scene, camera);
  }

  function updateLoop() {
    if (reduceMotion.matches || CONFIG.waveSpeed === 0) {
      renderer.setAnimationLoop(null);
      uniforms.uTime.value = time;
      renderer.render(scene, camera);
    } else {
      last = performance.now();
      renderer.setAnimationLoop(frame);
    }
  }
  reduceMotion.addEventListener?.('change', updateLoop);

  new ResizeObserver(layout).observe(canvas);
  layout();
  updateLoop();
}
