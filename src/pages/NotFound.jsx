import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { ParticleBackground, HackerText } from '../components/Shared';

const MAX_PATH_LENGTH = 80;

// Decorative film timecode (HH:MM:SS:FF at 24 fps). It writes straight into the DOM,
// so it never re-renders the page. Stays at zero when the visitor prefers reduced motion.
const Timecode = ({ animate }) => {
    const ref = useRef(null);
    useEffect(() => {
        if (!animate) return undefined;
        const start = performance.now();
        let frame;
        const pad = (n) => String(n).padStart(2, '0');
        const tick = (now) => {
            const total = Math.floor(((now - start) / 1000) * 24);
            const ff = total % 24;
            const s = Math.floor(total / 24) % 60;
            const m = Math.floor(total / 1440) % 60;
            const h = Math.floor(total / 86400);
            if (ref.current) ref.current.textContent = `${pad(h)}:${pad(m)}:${pad(s)}:${pad(ff)}`;
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [animate]);
    return <span ref={ref}>00:00:00:00</span>;
};

// Film grain as an inline SVG noise tile.
const GRAIN =
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const CSS = `
.nf-stage { animation: nf-drift 24s ease-in-out infinite alternate; }
@keyframes nf-drift { from { transform: scale(1); } to { transform: scale(1.045); } }

.nf-light { animation: nf-breathe 7s ease-in-out infinite; }
@keyframes nf-breathe { 0%,100% { opacity: .55; transform: translate(-50%,-50%) scale(1); } 50% { opacity: .9; transform: translate(-50%,-50%) scale(1.12); } }

/* The 404 is lit by a light that sweeps across it, then rests for a few seconds. */
.nf-404 {
    background-image: linear-gradient(100deg, #2b2b2b 0%, #2b2b2b 38%, #ffffff 50%, #2b2b2b 62%, #2b2b2b 100%);
    background-size: 300% 100%;
    background-position: 100% 0;
    -webkit-background-clip: text; background-clip: text;
    color: transparent; -webkit-text-fill-color: transparent;
    animation: nf-sweep 7s cubic-bezier(.6,.05,.3,1) 1.4s infinite;
}
@keyframes nf-sweep { 0% { background-position: 100% 0; } 35%,100% { background-position: 0% 0; } }

/* Colour fringing that splits apart in short bursts, like a failing signal. */
.nf-fringe-r, .nf-fringe-b { mix-blend-mode: screen; }
.nf-fringe-r { color: rgba(239,68,68,.75); animation: nf-glitch-r 6s steps(1) infinite 2s; }
.nf-fringe-b { color: rgba(96,165,250,.45); animation: nf-glitch-b 6s steps(1) infinite 2s; }
@keyframes nf-glitch-r {
    0%,88%,100% { transform: translate(-2px,0); clip-path: inset(0 0 0 0); }
    90% { transform: translate(-12px,2px); clip-path: inset(18% 0 58% 0); }
    92% { transform: translate(9px,-2px); clip-path: inset(62% 0 8% 0); }
    94% { transform: translate(-6px,0); clip-path: inset(36% 0 40% 0); }
    96% { transform: translate(-2px,0); clip-path: inset(0 0 0 0); }
}
@keyframes nf-glitch-b {
    0%,88%,100% { transform: translate(2px,0); clip-path: inset(0 0 0 0); }
    90% { transform: translate(11px,-2px); clip-path: inset(58% 0 20% 0); }
    92% { transform: translate(-8px,2px); clip-path: inset(10% 0 66% 0); }
    94% { transform: translate(6px,0); clip-path: inset(44% 0 30% 0); }
    96% { transform: translate(2px,0); clip-path: inset(0 0 0 0); }
}

.nf-scan { animation: nf-scan 9s linear infinite; }
@keyframes nf-scan { from { transform: translateY(-20vh); } to { transform: translateY(120vh); } }

.nf-grain { animation: nf-grain 0.9s steps(6) infinite; }
@keyframes nf-grain {
    0% { transform: translate(0,0); } 17% { transform: translate(-3%,2%); } 33% { transform: translate(2%,-3%); }
    50% { transform: translate(-2%,-1%); } 67% { transform: translate(3%,3%); } 83% { transform: translate(-1%,2%); } 100% { transform: translate(0,0); }
}
.nf-rec { animation: nf-rec 1.6s steps(1) infinite; }
@keyframes nf-rec { 0%,60% { opacity: 1; } 61%,100% { opacity: .15; } }

@media (prefers-reduced-motion: reduce) {
    .nf-stage, .nf-light, .nf-404, .nf-fringe-r, .nf-fringe-b, .nf-scan, .nf-grain, .nf-rec { animation: none !important; }
    .nf-404 { background-position: 0% 0; }
    .nf-fringe-r, .nf-fringe-b { display: none; }
}
`;

// Shown when the visitor opens an address that does not exist on this site.
// `path` is the address they typed, `onHome` takes them back to the home page.
const NotFound = ({ path = '', onHome }) => {
    const reduce = useReducedMotion();

    // Very long addresses would break the layout, so cut them.
    const shownPath = path.length > MAX_PATH_LENGTH ? `${path.slice(0, MAX_PATH_LENGTH)}...` : path;

    // Give the browser tab a clear title while this page is shown, and restore it afterwards.
    useEffect(() => {
        const previousTitle = document.title;
        document.title = 'Page not found | Callisto';
        return () => { document.title = previousTitle; };
    }, []);

    const ease = [0.22, 1, 0.36, 1];
    // One orchestrated opening: bars close in, the 404 focuses, then the text follows.
    const rise = (delay) => (reduce
        ? {}
        : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease } });

    return (
        <div className="fixed inset-0 h-[100dvh] w-screen overflow-hidden bg-[#050505] text-white font-sans selection:bg-red-600 selection:text-white">
            <style>{CSS}</style>

            <ParticleBackground />

            {/* Camera drifts slowly towards the scene */}
            <div className="nf-stage absolute inset-0 flex items-center justify-center">
                {/* Pool of red light behind the numbers */}
                <div
                    aria-hidden="true"
                    className="nf-light pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[90vmin] rounded-full"
                    style={{ background: 'radial-gradient(closest-side, rgba(220,38,38,0.32), rgba(220,38,38,0.08) 55%, transparent 75%)', filter: 'blur(30px)' }}
                />
                {/* Grid fading out towards the edges */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen"
                    style={{
                        backgroundImage: 'linear-gradient(to right, rgba(220,38,38,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(220,38,38,0.12) 1px, transparent 1px)',
                        backgroundSize: '56px 56px',
                        maskImage: 'radial-gradient(circle at center, black, transparent 72%)',
                        WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 72%)',
                    }}
                />

                <main className="relative z-10 flex w-full max-w-3xl flex-col items-center px-6 text-center">
                    {/* Big 404: decorative, the real heading is the h1 below */}
                    <motion.div
                        aria-hidden="true"
                        className="relative select-none leading-none"
                        initial={reduce ? false : { opacity: 0, scale: 1.18, filter: 'blur(18px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1.4, delay: 0.5, ease }}
                    >
                        <span className="nf-fringe-r absolute inset-0 text-[min(26vh,34vw)] font-black tracking-tighter">404</span>
                        <span className="nf-fringe-b absolute inset-0 text-[min(26vh,34vw)] font-black tracking-tighter">404</span>
                        <span className="nf-404 relative block text-[min(26vh,34vw)] font-black tracking-tighter drop-shadow-[0_0_40px_rgba(220,38,38,0.35)]">404</span>
                    </motion.div>

                    <motion.h1
                        {...rise(1.5)}
                        className="mt-[2vh] text-[clamp(1.5rem,5vh,3rem)] font-black uppercase tracking-tight"
                    >
                        Page not found
                    </motion.h1>

                    <motion.p
                        {...rise(1.7)}
                        className="mt-[1.5vh] max-w-md text-[clamp(0.85rem,2vh,1.125rem)] text-gray-400"
                    >
                        This address does not exist on this site. It may have been mistyped or moved.
                    </motion.p>

                    <motion.div {...rise(1.9)} className="mt-[4vh]">
                        <button
                            type="button"
                            onClick={onHome}
                            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-black/60 px-6 py-3 font-mono text-sm text-gray-300 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] focus:outline-none focus-visible:border-red-500 focus-visible:text-white focus-visible:ring-2 focus-visible:ring-red-500/70"
                        >
                            <ArrowLeft size={16} className="text-red-500 transition-transform group-hover:-translate-x-1 group-hover:text-white" />
                            <span className="font-bold tracking-widest">RETURN HOME</span>
                        </button>
                    </motion.div>
                </main>
            </div>

            {/* A single bright scan line passing through the frame */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-20">
                <div className="nf-scan h-px w-full bg-gradient-to-r from-transparent via-red-400/50 to-transparent shadow-[0_0_24px_6px_rgba(239,68,68,0.18)]" />
            </div>

            {/* Film grain and vignette */}
            <div
                aria-hidden="true"
                className="nf-grain pointer-events-none absolute -inset-[10%] z-30 opacity-[0.07] mix-blend-screen"
                style={{ backgroundImage: GRAIN }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-30"
                style={{ background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.85) 100%)' }}
            />

            {/* Letterbox bars close in from the edges and carry the readouts */}
            <motion.div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 z-40 flex h-[9vh] min-h-[44px] items-center justify-between bg-black px-5 font-mono text-[10px] tracking-[0.2em] text-gray-400 md:px-10 md:text-xs"
                initial={reduce ? false : { y: '-100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease }}
            >
                <span className="flex items-center gap-2 font-bold text-red-100">
                    <span className="nf-rec h-2 w-2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.9)]" />
                    <HackerText text="SIGNAL LOST" />
                </span>
                <Timecode animate={!reduce} />
            </motion.div>

            <motion.div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 z-40 flex h-[9vh] min-h-[44px] items-center justify-between gap-4 bg-black px-5 font-mono text-[10px] tracking-[0.15em] text-gray-500 md:px-10 md:text-xs"
                initial={reduce ? false : { y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease }}
            >
                <span className="min-w-0 truncate text-gray-300">
                    <span className="text-red-500">&gt; </span>GET {shownPath || '/'}
                </span>
                <span className="shrink-0">404 // ROUTE NOT FOUND</span>
            </motion.div>
        </div>
    );
};

export default NotFound;
