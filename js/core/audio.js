/* =====================================================================
   山河十四卷 v1.0 · 零体积纯前端 Web Audio API 国风音效与五声雅乐引擎
   支持：刀剑破空 / 拳掌气劲 / 点穴金石 / 会心铜钲 / 古琴泛音 / 落子清响 / 雅乐开关
   ===================================================================== */
(function (root) {
  "use strict";
  const JY = (root.JY = root.JY || {});
  const AUDIO_KEY = "jyjh_v3_audio";

  let ctx = null;
  let bgmTimer = null;
  let bgmStep = 0;

  // mode: "all" (音效+雅乐) | "sfx" (仅音效，默认最清爽) | "mute" (静音)
  let mode = "sfx";
  try {
    const saved = localStorage.getItem(AUDIO_KEY);
    if (saved === "all" || saved === "sfx" || saved === "mute") mode = saved;
  } catch (e) {}

  function ensureCtx() {
    if (mode === "mute") return null;
    try {
      if (!ctx) {
        const AC = root.AudioContext || root.webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
      }
      if (ctx.state === "suspended") ctx.resume().catch(() => {});
      return ctx;
    } catch (e) {
      return null;
    }
  }

  function tone(freq, dur, opts) {
    const ac = ensureCtx();
    if (!ac) return;
    try {
      const o = opts || {};
      const now = ac.currentTime + (o.delay || 0);
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = o.type || "sine";
      osc.frequency.setValueAtTime(freq, now);
      if (o.endFreq) osc.frequency.exponentialRampToValueAtTime(Math.max(20, o.endFreq), now + dur);
      const vol = o.vol || 0.08;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(vol, now + Math.min(0.015, dur * 0.2));
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start(now);
      osc.stop(now + dur + 0.02);
    } catch (e) {}
  }

  function noiseBurst(dur, opts) {
    const ac = ensureCtx();
    if (!ac) return;
    try {
      const o = opts || {};
      const now = ac.currentTime + (o.delay || 0);
      const len = Math.max(1, Math.floor(ac.sampleRate * dur));
      const buf = ac.createBuffer(1, len, ac.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, o.decay || 1.8);
      const src = ac.createBufferSource();
      src.buffer = buf;
      const filter = ac.createBiquadFilter();
      filter.type = o.filterType || "bandpass";
      filter.frequency.setValueAtTime(o.freq || 1400, now);
      if (o.endFreq) filter.frequency.exponentialRampToValueAtTime(o.endFreq, now + dur);
      filter.Q.value = o.q || 1.6;
      const gain = ac.createGain();
      gain.gain.setValueAtTime(o.vol || 0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      src.connect(filter);
      filter.connect(gain);
      gain.connect(ac.destination);
      src.start(now);
      src.stop(now + dur + 0.02);
    } catch (e) {}
  }

  // 五声音阶（宫商角徵羽：D4 E4 F#4 A4 B4 D5 E5 F#5 A5）
  const PENTA = [293.66, 329.63, 369.99, 440.00, 493.88, 587.33, 659.25, 739.99, 880.00];
  const MELODY = [0, 2, 3, 5, 3, 2, 1, 0, 3, 4, 5, 7, 5, 4, 3, 2];

  function playGuqinNote(freq, delay, vol) {
    tone(freq, 0.95, { type: "triangle", delay: delay || 0, vol: vol || 0.055, endFreq: freq * 0.996 });
    tone(freq * 2, 0.42, { type: "sine", delay: (delay || 0) + 0.01, vol: (vol || 0.055) * 0.45 });
  }

  function startAmbientLoop() {
    stopAmbientLoop();
    if (mode !== "all") return;
    bgmTimer = setInterval(() => {
      if (mode !== "all" || !ctx || ctx.state !== "running") return;
      const isCombat = JY.Combat && JY.Combat.active;
      const idx = MELODY[bgmStep++ % MELODY.length];
      const f = PENTA[idx] * (isCombat ? 1.25 : 0.75);
      playGuqinNote(f, 0, isCombat ? 0.028 : 0.024);
      if (bgmStep % 3 === 0) playGuqinNote(PENTA[(idx + 3) % PENTA.length] * 0.5, 0.36, 0.018);
    }, 1850);
  }

  function stopAmbientLoop() {
    if (bgmTimer) { clearInterval(bgmTimer); bgmTimer = null; }
  }

  JY.Audio = {
    getMode: () => mode,
    label: () => mode === "all" ? "🎵 雅乐" : mode === "sfx" ? "🔊 音效" : "🔇 静音",
    cycleMode() {
      mode = mode === "sfx" ? "all" : mode === "all" ? "mute" : "sfx";
      try { localStorage.setItem(AUDIO_KEY, mode); } catch (e) {}
      if (mode === "mute") {
        stopAmbientLoop();
      } else {
        ensureCtx();
        JY.Audio.play("click");
        if (mode === "all") startAmbientLoop();
        else stopAmbientLoop();
      }
      if (JY.UI && JY.UI.renderTopbar && JY.S) JY.UI.renderTopbar();
      if (JY.UI && JY.UI.toast) {
        const msg = mode === "all" ? "已开启：国风音效 + 古琴五声雅乐" : mode === "sfx" ? "已切换：仅开启招式与交互音效" : "已静音";
        JY.UI.toast(msg, "sys");
      }
    },
    unlock() {
      if (mode === "mute") return;
      ensureCtx();
      if (mode === "all" && !bgmTimer) startAmbientLoop();
    },
    play(kind) {
      if (mode === "mute") return;
      switch (kind) {
        case "click":
          tone(520, 0.045, { type: "triangle", endFreq: 380, vol: 0.032 });
          break;
        case "sword":
          noiseBurst(0.14, { freq: 2600, endFreq: 900, q: 2.8, vol: 0.08 });
          tone(980, 0.12, { type: "sawtooth", endFreq: 420, vol: 0.045 });
          break;
        case "palm":
          noiseBurst(0.18, { filterType: "lowpass", freq: 480, endFreq: 140, q: 1.2, vol: 0.11 });
          tone(150, 0.19, { type: "sine", endFreq: 58, vol: 0.095 });
          break;
        case "acupoint":
          tone(1174.66, 0.16, { type: "sine", endFreq: 880, vol: 0.07 });
          tone(1760, 0.22, { type: "triangle", delay: 0.04, vol: 0.055 });
          break;
        case "crit":
          noiseBurst(0.20, { freq: 1800, endFreq: 520, q: 1.8, vol: 0.10 });
          tone(220, 0.36, { type: "triangle", endFreq: 110, vol: 0.09 });
          tone(659.25, 0.28, { type: "sine", delay: 0.03, vol: 0.07 });
          break;
        case "shield":
          tone(440, 0.22, { type: "sine", endFreq: 587.33, vol: 0.055 });
          tone(659.25, 0.26, { type: "triangle", delay: 0.05, vol: 0.045 });
          break;
        case "hit":
          noiseBurst(0.12, { filterType: "lowpass", freq: 360, endFreq: 110, vol: 0.09 });
          tone(125, 0.12, { type: "triangle", endFreq: 62, vol: 0.08 });
          break;
        case "guqin":
          [0, 2, 3, 5].forEach((n, i) => playGuqinNote(PENTA[n], i * 0.11, 0.06));
          break;
        case "chess":
          noiseBurst(0.035, { freq: 3200, q: 4.5, vol: 0.07 });
          tone(1320, 0.05, { type: "sine", endFreq: 920, vol: 0.05 });
          break;
        case "fanfare":
          [0, 2, 3, 5, 8].forEach((n, i) => playGuqinNote(PENTA[n], i * 0.09, 0.065));
          break;
        case "warn":
          tone(240, 0.12, { type: "sawtooth", endFreq: 180, vol: 0.04 });
          break;
      }
    }
  };

  if (typeof root.addEventListener === "function") {
    root.addEventListener("pointerdown", () => JY.Audio.unlock(), { once: true, passive: true });
  }
})(window);
