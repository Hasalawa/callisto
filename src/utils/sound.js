/**
 * Callisto Audio System - Futuristic Holographic Glass Tap
 * 
 * 100% In-Memory Web Audio API Synthesis.
 * Designed for a tactile, aesthetic, and satisfying feel:
 * - Uplifting micro-pitch sweep (680Hz -> 1120Hz) for an active, rewarding response
 * - Crystalline glass chime overtone for futuristic high-tech elegance
 * - Warm 260Hz acoustic sub-body for physical haptic presence
 * - Zero network/HTTP requests (Completely immune to IDM and browser downloaders)
 */

let audioContext = null;
let clickBuffer = null;
let lastClickTime = 0;

/**
 * Returns or initializes the shared AudioContext lazily on user gesture.
 */
function getAudioContext() {
    if (typeof window === 'undefined') return null;

    if (!audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
            audioContext = new AudioCtx();
        }
    }

    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume().catch(() => {});
    }

    return audioContext;
}

/**
 * Synthesizes an ultra-satisfying, futuristic cyber glass/crystal tap
 * directly into an in-memory AudioBuffer (0 network latency, 0 files).
 */
function createFuturisticGlassTapBuffer(ctx) {
    const sampleRate = ctx.sampleRate || 44100;
    const duration = 0.048; // 48ms - snappy, liquid, delightful
    const numSamples = Math.floor(sampleRate * duration);
    const audioBuffer = ctx.createBuffer(1, numSamples, sampleRate);
    const channelData = audioBuffer.getChannelData(0);

    for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;

        // Smooth curved attack (1.2ms) eliminates harsh digital pops
        const attack = Math.sin(Math.min(Math.PI / 2, t / 0.0012));
        const decay = Math.exp(-t * 95);
        const env = attack * decay;

        // Uplifting frequency curve (680Hz -> 1120Hz) gives an active, rewarding feeling
        const f = 680 + 440 * (1 - Math.exp(-t * 350));

        // Layer 1: Liquid fundamental sine wave
        const tone1 = Math.sin(2 * Math.PI * f * t) * 0.65;

        // Layer 2: Crystal glass chime overtone (2.25x frequency) for holographic sparkle
        const tone2 = Math.sin(2 * Math.PI * (f * 2.25) * t) * Math.exp(-t * 160) * 0.25;

        // Layer 3: Warm sub-body (260Hz) provides tactile haptic weight and physical feel
        const lowBody = Math.sin(2 * Math.PI * 260 * t) * Math.exp(-t * 180) * 0.35;

        channelData[i] = (tone1 + tone2 + lowBody) * env;
    }

    // Normalize to -2.5dB peak (0.75) for sparkling clarity
    let max = 0;
    for (let i = 0; i < numSamples; i++) {
        if (Math.abs(channelData[i]) > max) max = Math.abs(channelData[i]);
    }
    if (max > 0) {
        for (let i = 0; i < numSamples; i++) {
            channelData[i] = (channelData[i] / max) * 0.75;
        }
    }

    return audioBuffer;
}

/**
 * Pre-warms the sound in RAM without any network calls.
 */
export function preloadClickSound() {
    try {
        const ctx = getAudioContext();
        if (ctx && !clickBuffer) {
            clickBuffer = createFuturisticGlassTapBuffer(ctx);
        }
    } catch {
        // Safe fallback
    }
}

/**
 * Plays the satisfying holographic glass tap with 0ms latency.
 */
export function playClickSound() {
    const now = Date.now();
    // Debounce micro-bounces within 25ms
    if (now - lastClickTime < 25) return;
    lastClickTime = now;

    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        if (!clickBuffer) {
            clickBuffer = createFuturisticGlassTapBuffer(ctx);
        }

        const source = ctx.createBufferSource();
        const gainNode = ctx.createGain();

        // Balanced, pleasant volume level (0.35)
        gainNode.gain.setValueAtTime(0.35, ctx.currentTime);

        source.buffer = clickBuffer;
        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.start(0);
    } catch {
        // Safe fallback
    }
}
